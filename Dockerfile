# ---- Stage 1: Build Angular ----
FROM node:20 AS build
WORKDIR /workspace

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
ARG APP_NAME=pecunia_dashboard
RUN npm run build "$APP_NAME" --configuration=production
# Robust: finde das richtige Output-Verzeichnis (browser/ vs. flat) und sammle Artefakte in __html
RUN set -eux; \
    mkdir -p /workspace/__html; \
    if [ -d "dist/apps/${APP_NAME}/browser" ]; then \
      cp -r "dist/apps/${APP_NAME}/browser/." /workspace/__html/; \
    elif [ -f "dist/apps/${APP_NAME}/index.html" ]; then \
      cp -r "dist/apps/${APP_NAME}/." /workspace/__html/; \
    else \
      echo "❌ Konnte kein index.html finden unter dist/apps/${APP_NAME}/(browser/)?"; \
      ls -R "dist/apps/${APP_NAME}" || true; \
      exit 1; \
    fi

# ---- Stage 2: Nginx Static Server ----
FROM nginx:stable-alpine

# Verhindert die Nginx-Willkommensseite
RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Kopiere die zuvor gesammelten Artefakte
COPY --from=build /workspace/__html/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
