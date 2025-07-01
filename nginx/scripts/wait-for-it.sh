#!/bin/sh
# wait-for-it.sh - Version améliorée qui accepte le port
set -e

HOST="$1"
PORT="$2"
shift 2
CMD="$@"

# Boucle jusqu'à ce que l'hôte et le port soient accessibles
until nc -z "$HOST" "$PORT"; do
  >&2 echo "Service $HOST:$PORT is unavailable - sleeping"
  sleep 1
done

>&2 echo "Service $HOST:$PORT is up - executing command"
exec $CMD