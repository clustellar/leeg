import { UserTypes } from '../mutation-types'
import api from '@/api'
import store from '@/store'

const state = {
  all: []
}

// getters
const getters = {
  [UserTypes.all]: state => state.all,
  [UserTypes.filter]: state => (name) => {
    return state.all.find(user => user.name === name)
  }
}

// actions
const actions = {
  [UserTypes.filter] ({ commit }, opts) {
    api.primus.on('user:feed', (feed) => {
      console.log('USER CHANGE: ', feed)
      console.log(store)
    })

    api.user.filter(opts).then(resp => commit(UserTypes.add, resp))
  },
  [UserTypes.save] ({ commit }, record) {
    return api.user.save(record).then(resp => commit(UserTypes.add, resp))
  },
  [UserTypes.add] ({ commit }) {
    // services.userService.on('created', function (user) {
    //   commit(UserTypes.add, user)
    // })
  },
  [UserTypes.remove] ({ commit }) {
    // services.userService.on('removed', function (user) {
    //   commit(UserTypes.remove, user)
    // })
  },
  [UserTypes.clear] ({ commit }) {
    commit(UserTypes.clear)
  }
}

// mutations must be synchronous
const mutations = {
  [UserTypes.add] (state, resp) {
    let keys = state.all.map((user) => user.name) // for uniqueness check

    if (typeof resp.forEach === 'function') {
      resp.forEach(user => {
        let i = keys.indexOf(user.name)
        i === -1 ? state.all.push(user) : state.all.splice(i, 1, user)
      })
    } else if (resp.name) {
      let i = keys.indexOf(resp.name)
      i === -1 ? state.all.push(resp) : state.all.splice(i, 1, resp)
    }
  },
  [UserTypes.remove] (state, user) {
    let index = state.all.indexOf(user)
    state.all.splice(index, 1)
  },
  [UserTypes.clear] (state, idx) {
    state.all = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
