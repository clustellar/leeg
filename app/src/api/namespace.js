import http from './http'

var parseData = function (resp) {
  return resp.data
}

var namespaceApi = {
  save: function (record, opts) {
    let method = record.name ? 'PUT' : 'POST'
    return http(Object.assign({}, opts, { method: method, url: '/namespaces', data: record })).then(parseData)
  },
  filter: function (params) {
    return http.get('/namespaces', { params: params || {} }).then(parseData)
  }
}

export default namespaceApi
