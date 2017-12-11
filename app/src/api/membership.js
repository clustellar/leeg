import http from './http'

var parseData = function (resp) {
  return resp.data
}

var membershipApi = {
  save: function (record, opts) {
    let method = record.id ? 'PUT' : 'POST'
    let url = '/leegs/' + record.leegId + '/sessions/' + record.sessionId + (record.id ? '/memberships/' + record.id : '/memberships')
    console.log('API:Sesson:save -> ', url)
    return http(Object.assign({}, opts, { method: method, url: url, data: record })).then(parseData)
  },
  filter: function (leegId, sessionId, params) {
    console.log('API:Participation -> ', leegId, sessionId, params)
    return http.get('/leegs/' + leegId + '/sessions/' + sessionId + '/memberships', { params: params || {} }).then(parseData)
  }
}

export default membershipApi
