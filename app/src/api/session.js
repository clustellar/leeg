import http from './http'

var parseData = function (resp) {
  return resp.data
}

var sessionApi = {
  save: function (leegName, record, opts) {
    let method = record.id ? 'PUT' : 'POST'
    let url = '/leegs/' + leegName + (record.id ? '/sessions/' + record.id : '/sessions')
    return http(Object.assign({}, opts, { method: method, url: url, data: record })).then(parseData)
  },
  filter: function (leegId, params) {
    return http.get('/leegs/' + leegId + '/sessions', { params: params || {} }).then(parseData)
  }
}

export default sessionApi
