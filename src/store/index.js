import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: [],
    menus: [],
    user_list: [],
    cart: [],
    order: [],
    editFoodQuantity: []
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

    CHECK_OUT(state, user_id) {
      state.cart = state.cart.filter(el => {
        return el.id !== user_id
      })
    },

    SET_ORDER(state, data) {
      let date = new Date();
      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2)
      let day = ("0" + (date.getDate())).slice(-2)
      let today = year + '-' + month + '-' + day


      state.order = data.filter(item => {
        return item.display == 1 && item.date == today;
        // return item.date == today
      });
    },

    SET_EDIT_MENU_LIST(state, setList) {
      return state.editFoodQuantity = setList
    },

    CHANGE_COOKED(state, { id, cooked }) {
      state.order.forEach(el => {
        if (el.id == id) {
          el.cooked = cooked
        }
      })
    },

    EDIT_FOOD_QUANTITY(state, data) {
      state.editFoodQuantity.forEach(item => {
        if (item.id == data.id) {
          item.quantity = data.quantity
        }
      })
    },

    DELETE_ORDER_FOOD(state, { data, id, menu_id }) {
      // let date = new Date();
      // let year = date.getFullYear();
      // let month = ("0" + (date.getMonth() + 1)).slice(-2)
      // let day = ("0" + (date.getDate())).slice(-2)
      // let today = year + '-' + month + '-' + day

      // let setDate = ''
      data.forEach(item => {
        if(item.id == id) {
          // setDate =  item.date
        }
      })

      let editOrder = [];
      state.order.forEach(item => {
        if (item.id == id) {
          item.menu_list.forEach(el => {
            if (el.id !== menu_id) {
              editOrder.push(el)
            }
          })
        }
      })

      state.order = state.order.forEach(item => {
        if (item.id == id) {
          item.menu_list = editOrder
        }
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

    async checkOut({ commit }, { user_id, menu_list, date, time, cart_id }) {
      await axios.post('/api/v1/' + user_id + '/order', {
        user_id: user_id,
        menu_list: menu_list,
        date: date,
        time: time
      })
      .then(() => {
        axios.delete('/api/v1/cart/' + cart_id)
        commit('CHECK_OUT', user_id);
      })
    },

    async getOrder({ commit }) {
      await axios.get('/api/v1/order')
      .then((res) => {
        commit('SET_ORDER', res.data.data);
      })
    },

    async editShopOrder({ dispatch }, { id, user_id, menu_list, display, date, time }) {
      await axios.put('/api/v1/order/' + id, {
        user_id: user_id,
        menu_list: menu_list,
        display: display,
        date: date,
        time: time
      })
      dispatch('getOrder')
    },

    async cooked({ commit }, {id, cooked}) {
      await axios.put('/api/v1/order/cooked/' + id,
        { cooked: cooked }
      ).then(
        commit('CHANGE_COOKED', { id, cooked })
      )
    },

    async orderMenuListDelete({ dispatch, commit }, { id, menu_id, quantity }) {
      await axios.put('/api/v1/order/list/' + id, {
        id: id,
        menu_id: menu_id,
        quantity: quantity
      })
      this.axios.get('/api/v1/order')
        .then(res => {
          let data = res.data
          commit('DELETE_ORDER_FOOD', { data, id, menu_id })
          dispatch('getOrder')
      })
    },
  },
  modules: {
  }
})
