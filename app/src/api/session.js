// import http from './http'

// var parseData = function (resp) {
//   return resp.data
// }

// var sessionApi = {
//   save: function (record, opts) {
//     let method = record.id ? 'PUT' : 'POST'
//     let url = '/leegs/' + record.leegId + (record.id ? '/sessions/' + record.id : '/sessions')
//     console.log('API:Sesson:save -> ', url)
//     return http(Object.assign({}, opts, { method: method, url: url, data: record })).then(parseData)
//   },
//   filter: function (leegId, params) {
//     console.log('API:Session -> ', leegId, params)
//     return http.get('/leegs/' + leegId + '/sessions', { params: params || {} }).then(parseData)
//   }
// }

// export default sessionApi

import commonApi from './common'

var buildPath = function (params) {
  return ['/leegs', params.leegId, 'sessions', params.sessionId || ''].join('/').replace(/\/\//g, '/')
}

export default commonApi(buildPath)
