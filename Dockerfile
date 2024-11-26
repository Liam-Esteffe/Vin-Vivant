# Étape 1 : Build de l'application
FROM node:18 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json depuis le répertoire racine du projet
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source depuis la racine du projet
COPY . .

# Build de l'application pour la production
RUN npm run build --prod

# Étape 2 : Servir avec Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers de build dans Nginx
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html/browser

# Exposer le port 80
EXPOSE 3000

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
