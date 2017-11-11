import axios from 'axios'

var api = axios.create({
  baseURL: process.env.API || window.location.origin.replace(window.location.port, '3030'),
  timeout: 10000
})

export default api
