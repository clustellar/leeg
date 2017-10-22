import { GlobalTypes, MessageTypes } from '../mutation-types'
import store from '@/store'

let gapi = window.gapi // require('@/assets/gapi.platform.js')
let auth2 = null

gapi.load('auth2', function () {
  auth2 = gapi.auth2.init({
    client_id: '761319481081-qdhsn5m2llie9qa6rtaf1an0vgpqlg92.apps.googleusercontent.com',
    scope: 'profile email'
  })

  auth2.isSignedIn.listen(function (val) {
    if (!val) {
      store.dispatch(MessageTypes.add, {
        title: 'Signed Out!',
        klass: 'notification is-info'
      })
      store.dispatch(GlobalTypes.signedout)
    } else {
      if (auth2) {
        store.dispatch(GlobalTypes.signin, auth2.currentUser)
      }
    }
  })

  auth2.currentUser.listen(function (user) {
    store.dispatch(GlobalTypes.signin, user)
  })

  if (auth2.isSignedIn.get() === true) {
    auth2.signIn()
  }
})

const state = {
  currentUser: null,
  fullscreen: false,
  filter: null
}

// getters
const getters = {
  [GlobalTypes.currentUser]: state => state.currentUser,
  [GlobalTypes.fullscreen]: state => state.fullscreen,
  [GlobalTypes.filter]: state => state.filter
}

// actions
const actions = {
  [GlobalTypes.fullscreen] ({ commit }) {
    commit(GlobalTypes.fullscreen)
  },
  [GlobalTypes.filter] ({ commit }, filter) {
    commit(GlobalTypes.filter, filter)
  },
  [GlobalTypes.signin] ({ commit }, user) {
    if (user && user.getBasicProfile) {
      let profile = user.getBasicProfile()
      if (profile) {
        commit(GlobalTypes.signin, {
          id: profile.getId(),
          name: profile.getName(),
          photo: profile.getImageUrl(),
          email: profile.getEmail()
        })
      }
    }
  },
  [GlobalTypes.signout] ({ commit }) {
    commit(GlobalTypes.signout)
  },
  [GlobalTypes.signedout] ({ commit }) {
    commit(GlobalTypes.signedout)
  }
}

// mutations must be synchronous
const mutations = {
  [GlobalTypes.fullscreen] (state) {
    state.fullscreen = !state.fullscreen
  },
  [GlobalTypes.filter] (state, filter) {
    state.filter = filter
  },
  [GlobalTypes.signin] (state, user) {
    state.currentUser = user
  },
  [GlobalTypes.signout] (state) {
    if (auth2) {
      auth2.signOut()
    }
  },
  [GlobalTypes.signedout] (state) {
    state.currentUser = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
