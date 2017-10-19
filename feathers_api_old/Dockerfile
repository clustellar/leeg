FROM node:alpine

RUN npm install --production feathers feathers-socketio express primus socket.io 

WORKDIR /api

COPY ./ /api

CMD npm start

