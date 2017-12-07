import http from './http'

var parseData = function (resp) {
  return resp.data
}

var namespaceApi = {
  save: function (record, opts) {
    let method = record.id ? 'PUT' : 'POST'
    let url = record.id ? '/namespaces/' + record.id : '/namespaces'
    return http(Object.assign({}, opts, { method: method, url: url, data: record })).then(parseData)
  },
  filter: function (params) {
    return http.get('/namespaces', { params: params || {} }).then(parseData)
  }
}

export default namespaceApi
