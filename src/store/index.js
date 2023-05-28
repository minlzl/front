import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('user'||'[]') == null ? '': JSON.parse(window.localStorage.getItem('user'||'[]')).username
    }
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user',JSON.stringify({username : user.username}))
    },
    rename (state, username) {
      window.localStorage.setItem('user', JSON.stringify({username: username}))
    },
    logout (state) {
      state.user = []
      window.localStorage.removeItem('user')
    }
  }
})
