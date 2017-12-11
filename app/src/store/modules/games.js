import { GameTypes } from '../mutation-types'
import api from '@/api'

const state = {
  all: []
}

// getters
const getters = {
  [GameTypes.all]: state => state.all,
  [GameTypes.filter]: state => (leegId, sessionId) => {
    return state.all.filter(game => game.sessionId === sessionId)
  },
  [GameTypes.find]: state => (id) => {
    return state.all.find(game => game.id === id)
  }
}

// actions
const actions = {
  [GameTypes.filter] ({ commit }, leegId, sessionId, opts) {
    api.primus.on('game:feed', (feed) => {
      console.log('Game CHANGE: ', feed)
    })

    api.game.filter(leegId, sessionId, opts).then(resp => commit(GameTypes.add, resp))
  },
  [GameTypes.save] ({ commit }, leegId, sessionId, record) {
    return api.game.save(leegId, sessionId, record).then(resp => commit(GameTypes.add, resp))
  },
  [GameTypes.add] ({ commit }) {
    // services.gameService.on('created', function (game) {
    //   commit(GameTypes.add, game)
    // })
  },
  [GameTypes.remove] ({ commit }) {
    // services.gameService.on('removed', function (game) {
    //   commit(GameTypes.remove, game)
    // })
  },
  [GameTypes.clear] ({ commit }) {
    commit(GameTypes.clear)
  }
}

// mutations must be synchronous
const mutations = {
  [GameTypes.add] (state, resp) {
    let keys = state.all.map((game) => game.id) // for uniqueness check

    if (typeof resp.forEach === 'function') {
      resp.forEach(game => {
        let i = keys.indexOf(game.id)
        i === -1 ? state.all.push(game) : state.all.splice(i, 1, game)
      })
    } else if (resp.id) {
      let i = keys.indexOf(resp.id)
      i === -1 ? state.all.push(resp) : state.all.splice(i, 1, resp)
    }
  },
  [GameTypes.remove] (state, game) {
    let index = state.all.indexOf(game)
    state.all.splice(index, 1)
  },
  [GameTypes.clear] (state, idx) {
    state.all = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
