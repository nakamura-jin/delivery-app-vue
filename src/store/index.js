import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: [],
    menus: []
  },


  mutations: {
    SET_USER(state, data) {
      state.user = data;
    },
    LOGOUT(state) {
      state.user = [];
    },
    SET_MENU(state, data) {
      state.menus = data
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
    },
    async menu({ commit }) {
      await axios.get('/api/v1/menu')
      .then(res => {
        commit('SET_MENU', res.data.data)
      })
    }
  },
  modules: {
  }
})
