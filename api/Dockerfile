FROM node:slim

RUN npm install express body-parser cors \
  express-session connect-redis \
  jsonwebtoken uuid \
  rethinkdbdash thinky \
  uws primus substream primus-emit \
  passport passport-google-oauth passport-jwt

WORKDIR /api

COPY ./ /api

CMD node index.js

