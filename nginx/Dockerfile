# On part de l'image Nginx officielle
FROM nginx:alpine

# On installe les outils nécessaires pour le script (netcat)
RUN apk add --no-cache netcat-openbsd

# On copie notre fichier de configuration Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# On copie notre script d'attente
COPY scripts/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# On ne lance pas Nginx directement, on lance notre script qui lancera Nginx
#CMD ["/usr/local/bin/wait-for-it.sh", "service-traitement", "8082", "--", "nginx", "-g", "daemon off;"]
CMD ["nginx", "-g", "daemon off;"]