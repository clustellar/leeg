import axios from 'axios'
import primus from './primus'

var parseData = function (resp) {
  return resp.data
}

var api = axios.create({
  baseURL: process.env.API || 'http://localhost/',
  timeout: 10000
})

var userApi = {
  me: function () {
    return api.get('/me').then(parseData)
  }
}

export default {
  user: userApi,
  primus: primus
}
