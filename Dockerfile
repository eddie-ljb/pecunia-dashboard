# Stage 1: Angular bauen
FROM node:20-alpine AS build

WORKDIR /app

# Dependencies zuerst kopieren (Cache für schnellere Builds)
COPY package.json package-lock.json* ./
RUN npm ci

# Restlichen Code kopieren und bauen
COPY . .
RUN npm run build

# Stage 2: Mit Nginx ausliefern
FROM nginx:1.25-alpine

# Optional: eigene Nginx-Konfiguration für SPA-Routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Angular-Build ins Nginx-HTML-Verzeichnis kopieren
# Passe "pecunia-dashboard" an deinen tatsächlichen Dist-Ordnernamen an
COPY --from=build /dist/pecunia-dashboard/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
