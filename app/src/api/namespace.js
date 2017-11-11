import http from './http'

var parseData = function (resp) {
  return resp.data
}

var namespaceApi = {
  findAll: function (token) {
    return http.get('/namespaces').then(parseData)
  }
}

export default namespaceApi
