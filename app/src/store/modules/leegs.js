import { LeegTypes } from '../mutation-types'
import api from '@/api'
import store from '@/store'

const state = {
  all: [],
  logos: {}
}

// getters
const getters = {
  [LeegTypes.all]: state => state.all,
  [LeegTypes.logos]: state => state.logos,
  [LeegTypes.filter]: state => (id) => {
    return state.all.filter(leeg => leeg.id === id)
  },
  [LeegTypes.find]: state => (id) => {
    return state.all.find(leeg => leeg.id === id)
  },
  [LeegTypes.logo]: state => (id) => {
    return state.logos[id]
  }
}

// actions
const actions = {
  [LeegTypes.filter] ({ commit }, opts) {
    api.primus.on('leeg:feed', (feed) => {
      console.log('LEEG CHANGE: ', feed)
      console.log(store)
    })

    api.leeg.filter(opts).then(resp => commit(LeegTypes.add, resp))
  },
  [LeegTypes.logo] ({ commit }, opts) {
    api.leeg.logo(opts).then(resp => commit(LeegTypes.logo, resp))
  },
  [LeegTypes.save] ({ commit }, record) {
    return api.leeg.save(record).then(resp => commit(LeegTypes.add, resp))
  },
  [LeegTypes.add] ({ commit }) {
    // services.leegService.on('created', function (leeg) {
    //   commit(LeegTypes.add, leeg)
    // })
  },
  [LeegTypes.remove] ({ commit }) {
    // services.leegService.on('removed', function (leeg) {
    //   commit(LeegTypes.remove, leeg)
    // })
  },
  [LeegTypes.clear] ({ commit }) {
    commit(LeegTypes.clear)
  }
}

// mutations must be synchronous
const mutations = {
  [LeegTypes.add] (state, resp) {
    let keys = state.all.map((leeg) => leeg.id) // for uniqueness check

    if (typeof resp.forEach === 'function') {
      resp.forEach(leeg => {
        let i = keys.indexOf(leeg.id)
        i === -1 ? state.all.push(leeg) : state.all.splice(i, 1, leeg)
      })
    } else if (resp.id) {
      let i = keys.indexOf(resp.id)
      i === -1 ? state.all.push(resp) : state.all.splice(i, 1, resp)
    }
  },
  [LeegTypes.logo] (state, logos) {
    logos.forEach(function (logo) {
      let obj = {}
      obj[logo.id] = logo.logo
      state.logos = Object.assign({}, state.logos, obj)
    })
  },
  [LeegTypes.remove] (state, leeg) {
    let index = state.all.indexOf(leeg)
    state.all.splice(index, 1)
  },
  [LeegTypes.clear] (state, idx) {
    state.all = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
