FROM node:19.6.1 as build

WORKDIR /app
COPY ./ /app
RUN npm run build-only



FROM busybox:1.36.1 as prod

ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}/tcp

WORKDIR /var/www/app
COPY --from=build /app/dist /var/www/app

CMD busybox httpd -f -v -p ${PORT}



FROM node:19.6.1 as dev

ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}/tcp

WORKDIR /app

CMD npx vite --host --port ${PORT}