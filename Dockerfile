FROM node:16-alpine as dev

WORKDIR /app

FROM node:16-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:alpine as prod

WORKDIR /app

COPY default.conf /etc/nginx/conf.d/

COPY --from=build /app/build/ /app

CMD ["nginx", "-g", "daemon off;"]

