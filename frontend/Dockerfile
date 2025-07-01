# === ÉTAPE 1: Build de l'application Next.js avec NPM ===
FROM node:18-alpine AS builder
WORKDIR /app

# On copie package.json ET package-lock.json
COPY package*.json ./

# On installe les dépendances avec npm
RUN npm install

# On copie le reste du code source
COPY . .

# On déclare la variable d'environnement pour l'URL de l'API
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# On lance le build de production avec npm
RUN npm run build

# === ÉTAPE 2: Servir l'application avec le serveur Next.js ===
FROM node:18-alpine

WORKDIR /app

# On copie les fichiers nécessaires depuis l'étape de build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
#COPY --from=builder /app/next.config.js ./

# On expose le port sur lequel Next.js écoute (par défaut 3000)
EXPOSE 3000

# La commande pour démarrer le serveur de production Next.js
CMD ["npm", "start"]