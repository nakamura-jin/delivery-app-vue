import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: [],
    menus: [],
    user_list: []
  },


  mutations: {
    SET_USER(state, data) {
      state.user = data;
    },
    LOGOUT(state) {
      state.user = [];
    },
    SET_MENU(state, data) {
      state.menus = data;
    },
    SELECT_MENU(state, tag) {
      state.menus = tag;
    },
    SELECT_QUANTITY(state, data) {
      state.menus.forEach(el => {
        if (el.id === data.id) {
          el.quantity = data.quantity
        }
      })
    },
    DELETE_MENU(state, id) {
      state.menus = state.menus.filter(item => {
        return item.id !== id
      })
    },
    USER_LIST(state, data) {
      return state.user_list = data;
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
    async getMenu({ commit }) {
      await axios.get('/api/v1/menu')
      .then(res => {
        commit('SET_MENU', res.data.data)
      })
    },
    async userList({ commit }) {
      await axios.get('/api/v1/user')
      .then(res => {
        commit('USER_LIST', res.data.data)
      })
    }
  },
  modules: {
  }
})
