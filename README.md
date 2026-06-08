# T2SR — Site TanStack Start + API devis

Site vitrine premium pour **T2SR** : placo, peinture, décoration, installation de cuisine et rénovation en Île-de-France.

- **Frontend** : TanStack Start, React, TypeScript, Tailwind CSS, Motion for React, Base UI.
- **API** : Hono en TypeScript, runtime Bun, SQLite, upload de photos et notification email future.
- **Déploiement cible** : VPS + Nginx en reverse proxy vers le serveur TanStack Start et l’API Hono.

## Structure

```txt
t2sr/
├── apps/
│   ├── website/        # TanStack Start SSR
│   └── api/            # Hono + Bun + SQLite
├── deploy/             # Nginx, systemd, backup
└── package.json        # workspaces Bun
```

## Lancer le projet

```bash
bun install

# Terminal 1
bun run dev:api

# Terminal 2
bun run dev:website
```

En local :

```bash
cp apps/api/.env.example apps/api/.env
cp apps/website/.env.example apps/website/.env
```

Variables importantes :

- `apps/api/.env` : `WEBSITE_ORIGIN=http://localhost:4321`
- `apps/website/.env` : `VITE_PUBLIC_API_URL=http://localhost:8787`

Commandes utiles :

```bash
bun run build          # build du site TanStack Start
bun run start:website  # serveur SSR du site
bun run start:api      # API Hono
bun test --cwd apps/api
```

## Modifier les coordonnées

Les coordonnées publiques sont centralisées dans :

```txt
apps/website/src/data/site.ts
```

Compléter :

- `phone`
- `email`
- `address`
- `url` si le domaine change

Ne pas inventer de certifications, labels, assurances ou avis. Les zones marquées “À remplacer par vos vraies photos, avis ou certifications.” doivent être remplacées par des preuves réelles.

## Remplacer les images

Le site utilise actuellement des placeholders visuels CSS pour éviter les fausses photos.

Pour ajouter de vraies images :

1. placer les fichiers dans `apps/website/public/`
2. remplacer les blocs `image-placeholder` par des balises `<img>`
3. renseigner un `alt` descriptif réel pour chaque image
4. remplacer les textes placeholders sur les réalisations et avis

## Modifier textes et services

Les contenus principaux sont dans :

```txt
apps/website/src/data/services.ts
apps/website/src/data/seo.ts
apps/website/src/data/site.ts
```

Chaque page doit garder :

- un title SEO unique
- une meta description unique
- un H1 unique
- des H2/H3 structurés
- des mots-clés locaux utilisés naturellement

## Formulaire et API email

Le formulaire React valide côté front puis envoie un `multipart/form-data` vers :

```txt
POST /api/quotes
```

L’API Hono valide aussi côté serveur, stocke la demande en SQLite et prépare l’envoi email via `apps/api/src/lib/mailer.ts`.

Pour connecter l’email :

1. renseigner les variables SMTP dans `apps/api/.env`
2. vérifier `WEBSITE_ORIGIN`
3. redémarrer `t2sr-api`

Champs acceptés : nom, téléphone, email, type client, service souhaité, ville, délai, budget, message, consentement RGPD et photos optionnelles.

## Déploiement VPS

Build :

```bash
bun install
bun run build
```

Services systemd :

```bash
sudo cp deploy/systemd/t2sr-web.service /etc/systemd/system/
sudo cp deploy/systemd/t2sr-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now t2sr-web
sudo systemctl enable --now t2sr-api
```

Nginx :

```bash
sudo cp deploy/nginx/t2sr.fr.conf /etc/nginx/sites-available/
sudo cp deploy/nginx/api.t2sr.fr.conf /etc/nginx/sites-available/
sudo nginx -t && sudo systemctl reload nginx
```

Le site `t2sr.fr` proxifie vers `127.0.0.1:4321`.
L’API `api.t2sr.fr` proxifie vers `127.0.0.1:8787`.

## Sauvegarde SQLite

```bash
sudo cp deploy/backup-sqlite.sh /var/www/t2sr/deploy/
sudo chmod +x /var/www/t2sr/deploy/backup-sqlite.sh
```

Exemple cron quotidien :

```txt
0 3 * * * /var/www/t2sr/deploy/backup-sqlite.sh >> /var/log/t2sr-backup.log 2>&1
```
