# ---- Stage 1: Build Angular (ng) ----
FROM node:20-alpine AS build
WORKDIR /app

# Nur die Package-Dateien für besseren Cache
COPY package.json package-lock.json* ./
RUN npm ci

# Restlichen Code kopieren
COPY . .

# Angular-Build (ggf. --configuration=production anpassen)
RUN npm run build

# ---- Stage 1.5: Build-Output normalisieren ----
# Angenommen dein Angular-App-Name im dist-Ordner ist "pecunia-dashboard"
# -> es gibt entweder dist/pecunia-dashboard oder dist/pecunia-dashboard/browser
ARG APP_DIST_NAME=pecunia-dashboard

RUN set -eux; \
  mkdir -p /app/__html; \
  if [ -d "dist/${APP_DIST_NAME}/browser" ]; then \
    # Angular 17+/18 Standard mit browser/-Ordner
    cp -r "dist/${APP_DIST_NAME}/browser/." /app/__html/; \
  elif [ -f "dist/${APP_DIST_NAME}/index.html" ]; then \
    # Älterer/angepasster Output ohne browser/-Ordner
    cp -r "dist/${APP_DIST_NAME}/." /app/__html/; \
  else \
    echo "❌ Konnte kein index.html finden unter dist/${APP_DIST_NAME} (browser/?)"; \
    ls -R dist || true; \
    exit 1; \
  fi

# ---- Stage 2: Nginx Static Server ----
FROM nginx:1.25-alpine

# Default-Nginx-Seite entfernen
RUN rm -rf /usr/share/nginx/html/*

# Eigene Nginx-Konfiguration (falls vorhanden)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Gebaute Angular-Dateien aus der Build-Stage kopieren
COPY --from=build /app/__html/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
