FROM node:slim

RUN npm install express body-parser \
  rethinkdbdash thinky \
  uws primus substream primus-emit \
  passport passport-google-oauth

WORKDIR /api

COPY ./ /api

CMD node index.js

