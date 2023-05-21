FROM node:19.6.1

ARG PORT
ENV PORT=${PORT}

WORKDIR /app
EXPOSE ${PORT}/tcp

CMD npx vite --host --port ${PORT}