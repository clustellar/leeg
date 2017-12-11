import commonApi from './common'

var buildPath = function (params) {
  return ['/leegs', params.leegId, 'sessions', params.sessionId, 'games', params.gameId || ''].join('/').replace(/\/\//g, '/')
}

export default commonApi(buildPath)
