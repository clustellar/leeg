import http from './http'
import primus from './primus'
import userApi from './user'
import groupApi from './group'
import namespaceApi from './namespace'
import leegApi from './leeg'
import sessionApi from './session'
import gameApi from './game'
import membershipApi from './membership'
import proxy from './proxy'

export default {
  user: userApi,
  group: groupApi,
  namespace: namespaceApi,
  leeg: leegApi,
  session: sessionApi,
  game: gameApi,
  membership: membershipApi,
  http: http,
  proxy: proxy,
  primus: primus()
}
