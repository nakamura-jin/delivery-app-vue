import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: [],
    menus: [],
    user_list: [],
    cart: []
  },

  getters: {
    cartItemCount: state => {
      return state.cart.length
    },

    totalCartPrice: state => {

      let total = 0
      state.cart.forEach(item => {
        total += item.menu_price * item.quantity
      });

      return total * 1.1
    }
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
    },

    SET_CART(state, cartItem) {
      state.cart = cartItem;
    },

    ADD_TO_CART(state, { user_id, menu_id, quantity }) {

      let menuInCart = state.cart.find(item => {
        return item.menu_id === menu_id
      });

      if (menuInCart) {
        menuInCart.quantity += quantity;
        return
      }
      state.cart.push({
        user_id,
        menu_id,
        quantity,
      });
    },

    REMOVE_FROM_CART(state, cart_id) {
      state.cart = state.cart.filter(item => {
        return item.id !== cart_id
      })
    },

  },


  actions: {
    async login({ dispatch, commit }, email) {
      await axios.post('/api/v1/login', {
        email: email,
      })
      .then((res) => {
        commit('SET_USER', res.data.data)
      })
        .then(() => {
        dispatch('getCartItems', { user_id: this.state.user.id})
      })
    },

    async getMenu({ commit }) {
      await axios.get('/api/v1/menu')
      .then(res => {
        commit('SET_MENU', res.data.data)
      })
    },

    async userList({ commit }) {
      await axios.get('/api/v1/user_list')
      .then(res => {
        commit('USER_LIST', res.data.data)
      })
    },

    async getCartItems({ commit }, {user_id}) {
      await axios.get('/api/v1/' + user_id + '/cart')
      .then(res => {
        commit('SET_CART', res.data.data);
      })
    },

    async addMenuToCart({ commit }, {user_id, menu_id, quantity}) {
      await axios.post('/api/v1/cart', {
        user_id: user_id,
        menu_id: menu_id,
        quantity: quantity
      })
      commit('ADD_TO_CART', {user_id, menu_id, quantity} )
    },

    async removeCart({ commit }, { cart_id }) {
      commit('REMOVE_FROM_CART', cart_id);
      await axios.delete('/api/v1/cart/' + cart_id)
    },
  },
  modules: {
  }
})
