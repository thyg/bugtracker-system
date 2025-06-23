FROM nginx:alpine

# Créer le répertoire de destination
RUN mkdir -p /usr/share/nginx/html

# Copier le contenu web s'il existe, sinon créer une page par défaut
RUN echo '<h1>BugTracker Frontend</h1><p>En cours de développement...</p>' > /usr/share/nginx/html/index.html

# Copier la configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]