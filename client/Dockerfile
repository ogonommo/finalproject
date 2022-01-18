FROM node:16.13-alpine as nodeimage
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.21.5-alpine
EXPOSE 3000
COPY --from=nodeimage /app/build /usr/share/nginx/html