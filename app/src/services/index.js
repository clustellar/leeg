import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'

const socket = io('http://localhost:3030')

export const app = feathers().configure(socketio(socket))
export const messageService = app.service('messages')
