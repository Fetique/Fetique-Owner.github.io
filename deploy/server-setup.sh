#!/usr/bin/env bash
# Разовая настройка VPS Timeweb для fetique.com.
# На сервере работает Pulse (pulse.service, /opt/pulse, sites-enabled/pulse) — его не трогаем:
# отдельный пользователь, отдельные каталоги, отдельный конфиг nginx и отдельный сертификат.
# Конфиг называется zz-fetique, чтобы грузиться после pulse и не становиться
# сервером по умолчанию для портов 80/443 (иначе он перехватит icar1y.ru и т. п.).
set -euo pipefail

DEPLOY_USER=fetique-deploy
SITE_ROOT=/var/www/fetique
ACME_ROOT=/var/www/fetique-acme
DEPLOY_PUBKEY="$1"
NGINX_CONF="$2"

id "$DEPLOY_USER" >/dev/null 2>&1 || useradd --create-home --shell /bin/bash "$DEPLOY_USER"
passwd -l "$DEPLOY_USER" >/dev/null

install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 755 "$SITE_ROOT"
install -d -o root -g root -m 755 "$ACME_ROOT"
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 700 "/home/$DEPLOY_USER/.ssh"

# Ключ выкладки может только синхронизировать файлы внутри $SITE_ROOT (rrsync), без shell.
echo "command=\"/usr/bin/rrsync $SITE_ROOT\",restrict $DEPLOY_PUBKEY" > "/home/$DEPLOY_USER/.ssh/authorized_keys"
chown "$DEPLOY_USER:$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh/authorized_keys"
chmod 600 "/home/$DEPLOY_USER/.ssh/authorized_keys"

install -o root -g root -m 644 "$NGINX_CONF" /etc/nginx/sites-available/zz-fetique
ln -sfn /etc/nginx/sites-available/zz-fetique /etc/nginx/sites-enabled/zz-fetique

if nginx -t; then
  systemctl reload nginx
else
  rm -f /etc/nginx/sites-enabled/zz-fetique
  echo "nginx -t failed, fetique config disabled" >&2
  exit 1
fi
