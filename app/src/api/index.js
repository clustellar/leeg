import http from './http'
import primus from './primus'
import userApi from './user'
import namespaceApi from './namespace'
import proxy from './proxy'

export default {
  user: userApi,
  namespace: namespaceApi,
  http: http,
  proxy: proxy,
  primus: primus()
}
