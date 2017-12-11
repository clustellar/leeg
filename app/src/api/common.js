import http from './http'

var parseData = function (resp) {
  return resp.data
}

var commonApi = function (buildPath) {
  return {
    save: function (record, opts) {
      let method = record.id ? 'PUT' : 'POST'
      return http(Object.assign({}, opts, { method: method, url: buildPath(record, opts), data: record })).then(parseData)
    },
    filter: function (params, opts) {
      return http.get(buildPath(params), opts || {}).then(parseData)
    }
  }
}

export default commonApi
