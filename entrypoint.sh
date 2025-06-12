#!/bin/sh

# Espera o PostgreSQL ficar disponível para rodar as migrations
echo "Aguardando banco ficar disponível..."
while ! nc -z postgres 5432; do
  sleep 1
done

# Roda as migrations
echo "Rodando migrations..."
npx prisma migrate deploy

# Inicia o app
echo "Iniciando aplicação..."
exec "$@"