import axios from 'axios'
import store from '@/store'
import { GlobalTypes } from '@/store/mutation-types'

window.store = store

var baseURL = (process.env.API || window.location.origin.replace(window.location.port, '3030')) + '/proxy'

var proxy = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'X-Auth-Token': store.getters[GlobalTypes.sessionToken]
  }
})

export default proxy
