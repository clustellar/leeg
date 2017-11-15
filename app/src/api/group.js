import http from './http'

var parseData = function (resp) {
  return resp.data
}

var groupApi = {
  save: function (record, opts) {
    let method = record.name ? 'PUT' : 'POST'
    let url = record.name ? '/groups/' + record.name : '/groups'
    return http(Object.assign({}, opts, { method: method, url: url, data: record })).then(parseData)
  },
  filter: function (params) {
    return http.get('/groups', { params: params || {} }).then(parseData)
  }
}

export default groupApi
