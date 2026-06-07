# T2SR — Site vitrine + API devis

Site vitrine statique pour **T2SR** (peinture, rénovation et travaux du bâtiment à
Savigny-le-Temple, Seine-et-Marne, Île-de-France) avec une API légère pour les
demandes de devis.

- **Frontend** : [Astro](https://docs.astro.build/) en sortie statique (`output: "static"`).
- **API** : [Hono](https://hono.dev/docs/) en TypeScript, runtime [Bun](https://bun.sh/).
- **Base de données** : SQLite (`bun:sqlite`).
- **Hébergement** : VPS Debian/Ubuntu + Nginx (statique + reverse proxy API).

Le frontend fonctionne indépendamment de l'API : le site reste consultable même si
l'API est arrêtée (seul l'envoi du formulaire nécessite l'API).

---

## Structure

```
t2sr/
├── apps/
│   ├── website/        # Astro (statique)
│   └── api/            # Hono + Bun + SQLite
├── deploy/             # Nginx, systemd, backup
├── package.json        # workspaces Bun
└── README.md
```

---

## Prérequis

- [Bun](https://bun.sh/) ≥ 1.1 (`curl -fsSL https://bun.sh/install | bash`)

---

## Démarrage local

```bash
# À la racine du dépôt
bun install

# Copier les exemples d'environnement
cp apps/api/.env.example apps/api/.env
cp apps/website/.env.example apps/website/.env
```

En local, ajuster :

- `apps/api/.env` → `WEBSITE_ORIGIN=http://localhost:4321`
- `apps/website/.env` → `PUBLIC_API_URL=http://localhost:8787`

### Lancer les deux apps

```bash
# Tout en parallèle (depuis la racine)
bun run dev

# …ou séparément
bun run dev:api       # API   → http://localhost:8787
bun run dev:website   # Site  → http://localhost:4321
```

### Scripts

Racine :

| Commande | Effet |
|---|---|
| `bun install` | Installe toutes les dépendances |
| `bun run dev` | Lance website + API |
| `bun run build` | Build statique du site (`apps/website/dist`) |
| `bun run start:api` | Démarre l'API en production |

Website (`apps/website`) :

| Commande | Effet |
|---|---|
| `bun run dev` | Serveur de dev Astro |
| `bun run build` | Build statique → `dist/` |
| `bun run preview` | Prévisualise le build |

API (`apps/api`) :

| Commande | Effet |
|---|---|
| `bun run dev` | API en mode hot reload |
| `bun run start` | API en production |
| `bun test` | Tests de validation |

---

## API

Base : `https://api.t2sr.fr` (prod) ou `http://localhost:8787` (local).

### `GET /health`

```json
{ "status": "ok", "uptime": 123.4 }
```

### `POST /api/quotes`

Accepte `multipart/form-data`. Réponses JSON :

```json
{ "success": true, "quoteId": "uuid" }
```

```json
{ "success": false, "error": "Message clair" }
```

**Champs obligatoires** : `fullName`, `phone`, `email`, `city`, `workType`,
`description`, `consent`.
**Recommandés** : `address`, `rooms` (multi), `surface`, `supportState`,
`budget`, `deadline`, `files` (≤ 5, ≤ 5 Mo, JPG/PNG/WebP).

Sécurité : CORS strict (origine = site), rate limiting par IP, limite de taille
du corps, validation serveur sur listes fermées, honeypot anti-spam, fichiers
stockés **hors** dossier public avec noms générés côté serveur, en-têtes de
sécurité. La base SQLite et le schéma sont créés automatiquement au démarrage.

### Variables d'environnement API

Voir `apps/api/.env.example`. Si `SMTP_HOST` est vide, l'envoi d'email est
désactivé (les devis restent enregistrés en base).

---

## Déploiement VPS (Debian/Ubuntu)

### 1. Installer Bun

```bash
curl -fsSL https://bun.sh/install | bash
# Recharger le shell, vérifier :
bun --version
```

### 2. Récupérer le code et installer

```bash
sudo mkdir -p /var/www/t2sr
sudo chown -R "$USER" /var/www/t2sr
git clone <repo> /var/www/t2sr   # ou rsync du projet
cd /var/www/t2sr
bun install
```

### 3. Build du site Astro

```bash
bun run build
# Résultat dans apps/website/dist/
```

Nginx sert `apps/website/dist`. Si vous préférez `/var/www/t2sr/dist` (chemin
utilisé dans l'exemple Nginx), copiez :

```bash
sudo rsync -a --delete apps/website/dist/ /var/www/t2sr/dist/
```

### 4. Configurer l'API

```bash
cd /var/www/t2sr/apps/api
cp .env.example .env
# Renseigner WEBSITE_ORIGIN=https://t2sr.fr, SMTP_*, etc.
chmod 600 .env
```

### 5. Service systemd pour l'API

```bash
sudo cp deploy/systemd/t2sr-api.service /etc/systemd/system/
# Adapter ExecStart (chemin Bun via `which bun`) et WorkingDirectory.
sudo systemctl daemon-reload
sudo systemctl enable --now t2sr-api
sudo systemctl status t2sr-api
```

### 6. Nginx

```bash
sudo cp deploy/nginx/t2sr.fr.conf      /etc/nginx/sites-available/
sudo cp deploy/nginx/api.t2sr.fr.conf  /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/t2sr.fr.conf     /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/api.t2sr.fr.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

- `t2sr.fr` → fichiers statiques (cache long sur assets, `no-cache` sur HTML, gzip).
- `api.t2sr.fr` → reverse proxy vers `127.0.0.1:8787`.

### 7. SSL Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d t2sr.fr -d www.t2sr.fr
sudo certbot --nginx -d api.t2sr.fr
```

### 8. Logs

```bash
journalctl -u t2sr-api -f        # logs API
tail -f /var/log/nginx/access.log
```

### 9. Sauvegarde SQLite

```bash
sudo cp deploy/backup-sqlite.sh /var/www/t2sr/deploy/
sudo chmod +x /var/www/t2sr/deploy/backup-sqlite.sh
# Cron quotidien (crontab -e) :
0 3 * * * /var/www/t2sr/deploy/backup-sqlite.sh >> /var/log/t2sr-backup.log 2>&1
```

---

## À compléter (données non publiques)

- Téléphone, email, adresse précise, directeur de publication, hébergeur
  (`apps/website/src/data/site.ts` et `mentions-legales`).
- Photos avant/après réelles (remplacer les placeholders de `realisations`).
- Cloudflare Turnstile (optionnel, prévu mais non activé au premier build).

Aucune certification, label, assurance, avis client ou réalisation réelle n'est
inventé : tout ce qui n'est pas connu est marqué « à compléter ».
