# Hakibets Ui

## Overview

This project is a Vue.js application built with Vite and managed with pnpm. This document provides the steps and configurations necessary to deploy the application to a production environment.

---

## Prerequisites

Before starting the deployment, ensure that the following are installed on the server:

- **Node.js** (version 16 or later is recommended)
- **pnpm** (version 7 or later)
- **Vite** (installed as part of the project dependencies)
- A web server (e.g., **Nginx** or **Apache**) to serve the static files in the `dist` folder

---

## 1. Project Setup

```bash
git clone git@gitlab.com:hakibets/siakabet-ui.git

cd siakabet-ui
```

## 2. Install dependancies

```bash
pnpm install
```

## 3. Configure Environment Variables

> Since vite environment variables are statically replaced at build time (check [vite environment variables](https://vite.dev/guide/env-and-mode.html#env-variables)), we have to do a bit of a hack to enable us have a runtime configurable image that we can run on many environments.(Please check [Stack overflow issue](https://stackoverflow.com/a/57928031))

The approach is to make use of the environment variables with constants (dummy values) to build it for production, then replace those constants in the image using a custom entrypoint script. The solution goes like this.

The .env.production file with dumy values is already included in the root of the project(note that this file is not git ignored). This will just get compiled and bundled similar to development mode.

```
VITE_MATCHES_URL = VITE_MATCHES_URL
VITE_INSTANT_URL = VITE_INSTANT_URL
VITE_AUTH_URL = VITE_AUTH_URL
VITE_BET_URL = VITE_BET_URL
VITE_CASINO_URL = VITE_CASINO_URL
VITE_AVIATOR_GAME_ID = VITE_AVIATOR_GAME_ID
VITE_AVIATRIX_GAME_ID = VITE_AVIATRIX_GAME_ID
VITE_JETX_GAME_ID = VITE_JETX_GAME_ID
VITE_PAYBILL_NO = VITE_PAYBILL_NO
VITE_LIVE_POLL_INTERVAL = VITE_LIVE_POLL_INTERVAL
```

In the Dockerfile, add an entrypoint that can read those constants and replace them with real environment variable values.

An example Dockerfile looks like this (this is pretty standard)

```
FROM node:10.16.3-alpine as builder

RUN mkdir /app
WORKDIR /app

COPY package\*.json /app/
RUN npm install

COPY . /app/

RUN npm run build --prod

FROM nginx:1.17.3-alpine

# add init script

COPY ./docker/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/ .

COPY ./docker/entrypoint.sh /entrypoint.sh

# expose internal port:80 and run init.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
```

Then create a ./docker/entrypoint.sh file as below.

```!/bin/sh

ROOT_DIR=/usr/share/nginx/html

# Replace env vars in JavaScript files

echo "Replacing env constants in JS"
for file in $ROOT*DIR/js/app.*.js\_ $ROOT_DIR/index.html $ROOT_DIR/precache-manifest\*.js;
do
echo "Processing $file ...";
  sed -i 's|VITE_MATCHES_URL|'${VITE_MATCHES_URL}'|g' $file
  sed -i 's|VITE_INSTANT_URL|'${VITE_INSTANT_URL}'|g' $file
  sed -i 's|VITE_AUTH_URL|'${VITE_AUTH_URL}'|g' $file
  sed -i 's|VITE_BET_URL|'${VITE_BET_URL}'|g' $file
  sed -i 's|VITE_CASINO_URL|'${VITE_CASINO_URL}'|g' $file
  sed -i 's|VITE_AVIATOR_GAME_ID|'${VITE_AVIATOR_GAME_ID}'|g' $file
  sed -i 's|VITE_JETX_GAME_ID|'${VITE_JETX_GAME_ID}'|g' $file
  sed -i 's|VITE_PAYBILL_NO|'${VITE_PAYBILL_NO}'|g' $file
  sed -i 's|VITE_LIVE_POLL_INTERVAL|'${VITE_LIVE_POLL_INTERVAL}'|g' $file
done

echo "Starting Nginx"
nginx -g 'daemon off;'
```

## 4. Building the Project

To build the project for production, run:

```bash
pnpm run build
```

This command generates static files in the dist directory.

## 5. Deploying the Build

1. Copy Files to the Server
   Transfer the contents of the dist directory to the server's web root (e.g., /var/www/project-name).
   eg.

```bash
scp -r dist/* user@server:/var/www/project-name
```

2. Set Up the Web Server
   Configure the web server (e.g., Nginx) to serve the static files.

Example Nginx Configuration:

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/project-name;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

3. Restart the Web Server
   After updating the configuration, restart the web server:

```bash
sudo systemctl restart nginx
```
# code1
# siaka
# naibet
