FROM node:14-alpine3.15 as node-helper

ARG build_env=development

WORKDIR /app

RUN npm cache clean --force

COPY . .

RUN npm install

# RUN npx ng build --configuration development
RUN npx ng build --configuration production

FROM nginx:1.20 as ngx

COPY --from=node-helper /app/dist/plenary /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
