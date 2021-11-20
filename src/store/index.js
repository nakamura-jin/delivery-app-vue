import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: [],
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data;
    },
    LOGOUT(state) {
      state.user = [];
    }
  },
  actions: {
    async login({ commit }, email) {
      await axios.post('/api/v1/login', {
        email: email,
      })
      .then((res) => {
        commit('SET_USER', res.data.data)
      })
    }
  },
  modules: {
  }
})
