import axios from 'axios'
import store from '@/store'
import { GlobalTypes } from '@/store/mutation-types'

var api = axios.create({
  baseURL: process.env.API || window.location.origin.replace(window.location.port, '3030'),
  timeout: 10000,
  headers: {
    'X-Auth-Token': store.getters[GlobalTypes.sessionToken]
  }
})

export default api
