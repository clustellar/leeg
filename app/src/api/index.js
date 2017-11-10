import axios from 'axios'
import primus from './primus'

var parseData = function (resp) {
  return resp.data
}

var api = axios.create({
  baseURL: process.env.API || window.location.origin.replace(window.location.port, '3030'),
  timeout: 10000
})

var userApi = {
  me: function (token) {
    return api.get('/users/me', { params: { token: token } }).then(parseData)
  }
}

export default {
  user: userApi,
  primus: primus()
}
