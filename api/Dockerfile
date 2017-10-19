FROM node:alpine

RUN npm install express @horizon/server

WORKDIR /api

COPY ./ /api

CMD node index.js

