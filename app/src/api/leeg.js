import http from './http'

var parseData = function (resp) {
  return resp.data
}

var leegApi = {
  save: function (record, opts) {
    let method = record.id ? 'PUT' : 'POST'
    let url = record.id ? '/leegs/' + record.id : '/leegs'
    console.log('API:Leeg:save -> ', url)
    return http(Object.assign({}, opts, { method: method, url: url, data: record })).then(parseData)
  },
  filter: function (params) {
    console.log('API:Leeg -> ', params)
    return http.get('/leegs', { params: params || {} }).then(parseData)
  },
  logo: function (params) {
    console.log('API:Logo -> ', params)
    return http.get('/leegs/logos', { params: params || {} }).then(parseData)
  }
}

export default leegApi
