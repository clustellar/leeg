import { GroupTypes } from '../mutation-types'
import api from '@/api'
import store from '@/store'

const state = {
  all: []
}

// getters
const getters = {
  [GroupTypes.all]: state => state.all,
  [GroupTypes.filter]: state => (name) => {
    return state.all.find(group => group.name === name)
  }
}

// actions
const actions = {
  [GroupTypes.filter] ({ commit }, opts) {
    api.primus.on('group:feed', (feed) => {
      console.log('GROUP CHANGE: ', feed)
      console.log(store)
    })

    api.group.filter(opts).then(resp => commit(GroupTypes.add, resp))
  },
  [GroupTypes.save] ({ commit }, record) {
    return api.group.save(record).then(resp => commit(GroupTypes.add, resp))
  },
  [GroupTypes.add] ({ commit }) {
    // services.groupService.on('created', function (group) {
    //   commit(GroupTypes.add, group)
    // })
  },
  [GroupTypes.remove] ({ commit }) {
    // services.groupService.on('removed', function (group) {
    //   commit(GroupTypes.remove, group)
    // })
  },
  [GroupTypes.clear] ({ commit }) {
    commit(GroupTypes.clear)
  }
}

// mutations must be synchronous
const mutations = {
  [GroupTypes.add] (state, resp) {
    let keys = state.all.map((group) => group.name) // for uniqueness check

    if (typeof resp.forEach === 'function') {
      resp.forEach(group => {
        let i = keys.indexOf(group.name)
        i === -1 ? state.all.push(group) : state.all.splice(i, 1, group)
      })
    } else if (resp.name) {
      let i = keys.indexOf(resp.name)
      i === -1 ? state.all.push(resp) : state.all.splice(i, 1, resp)
    }
  },
  [GroupTypes.remove] (state, group) {
    let index = state.all.indexOf(group)
    state.all.splice(index, 1)
  },
  [GroupTypes.clear] (state, idx) {
    state.all = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
