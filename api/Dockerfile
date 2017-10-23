FROM node:slim

RUN npm install express body-parser cors \
  rethinkdbdash thinky \
  uws primus substream primus-emit \
  passport passport-google-oauth passport-jwt

WORKDIR /api

COPY ./ /api

CMD node index.js

