import feathers from 'feathers/client'
import hooks from 'feathers-hooks'
import auth from 'feathers-authentication-client'
import localStorage from 'localstorage-memory'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'

const socket = io('http://localhost:3030')

export const app = feathers()
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth({ storage: localStorage }))
export const messageService = app.service('messages')

window.app = app // testing
