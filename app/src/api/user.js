import http from './http'

var parseData = function (resp) {
  return resp.data
}

var userApi = {
  me: function (token) {
    return http.get('/users/me', { params: { token: token } }).then(parseData)
  }
}

export default userApi
