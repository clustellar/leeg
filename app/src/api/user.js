import http from './http'

var parseData = function (resp) {
  return resp.data
}

var userApi = {
  me: function (token) {
    return http.get('/users/me', { params: { token: token } }).then(parseData)
  },
  save: function (record, opts) {
    return http(Object.assign({}, opts, { method: 'PUT', url: '/users', data: record })).then(parseData)
  },
  filter: function (params) {
    return http.get('/groups', { params: params || {} }).then(parseData)
  }
}

export default userApi
