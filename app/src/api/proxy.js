import axios from 'axios'

var baseURL = (process.env.API || window.location.origin.replace(window.location.port, '3030')) + '/proxy'

var proxy = axios.create({
  baseURL: baseURL,
  timeout: 10000
})

export default proxy
