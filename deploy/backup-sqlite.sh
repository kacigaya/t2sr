#!/usr/bin/env bash
# Sauvegarde de la base SQLite T2SR.
# Utilise la commande .backup pour une copie cohérente (WAL safe).
# Cron suggéré (tous les jours à 3h):
#   0 3 * * * /var/www/t2sr/deploy/backup-sqlite.sh >> /var/log/t2sr-backup.log 2>&1
set -euo pipefail

DB_PATH="${DB_PATH:-/var/www/t2sr/api/data/t2sr.sqlite}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/t2sr}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"

mkdir -p "$BACKUP_DIR"
STAMP="$(date +%Y%m%d-%H%M%S)"
DEST="$BACKUP_DIR/t2sr-$STAMP.sqlite"

# Copie cohérente via sqlite3 (installer: apt install sqlite3).
sqlite3 "$DB_PATH" ".backup '$DEST'"
gzip -f "$DEST"

# Rotation: supprime les sauvegardes plus vieilles que RETENTION_DAYS.
find "$BACKUP_DIR" -name 't2sr-*.sqlite.gz' -mtime "+$RETENTION_DAYS" -delete

echo "[backup] $DEST.gz créé."
