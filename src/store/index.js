import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: [],
    menus: [],
    cart: [],
    order: [],
    quantity: [],
    editFoodQuantity: [],
    myOrder: [],
    mobileFoodDitail: [],
    cashRegister: [],
    sales_list: [],
    setDate: [],
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
    },

    myOrderTotalPrice: state => {
      let list = [];
      state.myOrder.forEach(item => {
        list.push(item.menu_list)
      })

      let total = 0
      list.forEach(item => {
        item.forEach(el => {
          total += el.price * el.quantity
        })
      })
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

    SELECT_QUANTITY(state, data) {
      // state.menus.forEach(el => {
      //   if (el.id == data.id) {
      //     el.quantity = data.quantity
      //   }
      // })
      state.quantity.push(data)
    },

    DELETE_MENU(state, id) {
      state.menus = state.menus.filter(item => {
        return item.id !== id
      })
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

    CHECK_OUT(state) {
      state.cart = [];
      state.quantity = []
    },

    SET_ORDER(state, data) {
      let date = new Date();
      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2)
      let day = ("0" + (date.getDate())).slice(-2)
      let today = year + '-' + month + '-' + day


      state.order = data.filter(item => {
        return  item.display == 1 && item.date == today;
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

    GET_MY_ORDER(state, data) {
      state.myOrder = data
    },

    MOBILE_FOOD_DITAIL(state, id) {
      let list = []
      state.order.forEach(item => {
        if (item.id == id) {
          list.push(item.menu_list)
        }
      })
      state.mobileFoodDitail = list[0]
    },

    DELETE_MOBILE_FOOD_DITAIL(state) {
      state.mobileFoodDitail = [];
    },

    CASH_REGISTER(state, { user_name, id, order }) {
      let list = []
      state.order.forEach(item => {
        if (item.id == id) {
          list.push(item.menu_list)
        }
      })

      let price = 0;
      list[0].forEach(item => {
        price += (item.price * item.quantity) * 1.1
      })
      state.cashRegister = {user: user_name, totalPrice: price, order: order}
    },

    DELETE_CASH_REGISTER(state) {
      state.cashRegister = [];
    },

    SALES_LISTS(state, data) {
      state.sales_list = data;
    },

    SET_DATE(state) {
      let start = moment().startOf('months')
      let setDate = [start.format('YYYY-MM-DD')];
      let end = moment().endOf('months').format('D') -1

      for(let i = 0; i < end; i++) {
        setDate.push(start.add(1, 'days').format('YYYY-MM-DD'))
      }
      state.setDate = setDate
    },

    CHANGE_DATE(state, { value }) {
      let changeValue = moment(value)
      let start = moment(changeValue).startOf('months')
      let setDate = [start.format('YYYY-MM-DD')];
      let end = moment(changeValue).endOf('months').format('D') -1

      for(let i = 0; i < end; i++) {
        setDate.push(start.add(1, 'days').format('YYYY-MM-DD'))
      }
      state.setDate = setDate
    },

  },


  actions: {
    async login({ dispatch, commit }, uid ) {
      await axios.post('/api/v1/login', {
        uid: uid,
      })
      .then((res) => {
        commit('SET_USER', res.data.data)
      })
      .then(() => {
        dispatch('getCartItems', { user_id: this.state.user.id})
        dispatch('getMyOrder', { user_id: this.state.user.id })
        dispatch('sales_list')
      })
    },

    async getMenu({ commit }) {
      await axios.get('/api/v1/menu')
      .then(res => {
        commit('SET_MENU', res.data.data)
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

    async checkOut({ commit }, { user_id, menu_list, date, time }) {
      await axios.post('/api/v1/' + user_id + '/order', {
        user_id: user_id,
        menu_list: menu_list,
        date: date,
        time: time
      })
      .then(() => {
        axios.delete('/api/v1/cart/user/' + user_id)
        commit('CHECK_OUT');
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

    async getMyOrder({ commit }, { user_id }) {
      await axios.get('/api/v1/order/user/' + user_id)
        .then(res => {
        commit('GET_MY_ORDER', res.data.data)
      })
    },

    async sales_list({ commit }) {
      await axios.get('/api/v1/sales_list')
      .then(res => {
        commit('SALES_LISTS', res.data.data)
      })
    },

    async setSalesList({ dispatch }, {id, user_id, menu_list, display, date, time }) {
      await axios.post('/api/v1/sales_list', {
        user_id: user_id,
        menu_list: menu_list,
        date: date,
        time: time
      })
      dispatch('editShopOrder', {id, user_id, menu_list, display, date, time })
    },

  },
  modules: {
  }
})
