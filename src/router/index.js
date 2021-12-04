import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/auth/Register.vue'
import Login from '../views/auth/Login.vue'
import Thanks from '../views/auth/Thanks.vue'
import Top from '../views/Top.vue'
import Menu from '../views/menu/Menu.vue'
import Create from '../views/menu/Create.vue'
import CreatedMenu from '../views/menu/CreatedMenu.vue'
import EditMenu from '../views/menu/EditMenu.vue'
import UpdatedMenu from '../views/menu/UpdatedMenu.vue'
import User from '../views/user/User.vue'
import EditUser from '../views/user/EditUser.vue'
import Cart from '../views/cart/Cart.vue'
import CheckOut from '../views/cart/CheckOut.vue'
import Order from '../views/order/Order.vue'
import UpdatedOrder from '../views/order/UpdatedOrder.vue'
import PasswordReset from '../views/auth/PasswordReset.vue'
import SendPasswordResetMail from '../views/auth/SendPasswordResetMail.vue'
import Setting from '../views/user/Setting.vue'
import BuyingHistory from '../views/user/BuyingHistory.vue'
import SalesLists from '../views/salesLists/SalesLists.vue'
import ListDitail from '../views/salesLists/ListDitail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks
  },
  {
    path: '/top',
    name: 'Top',
    component: Top
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/menu_create',
    name: 'Create',
    component: Create
  },
  {
    path: '/created_menu',
    name: 'CreatedMenu',
    component: CreatedMenu
  },
  {
    path: '/edit_menu',
    name: 'EditMenu',
    component: EditMenu,
    props: true
  },
  {
    path: '/updated_menu',
    name: 'UpdatedMenu',
    component: UpdatedMenu
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/edit_user',
    name: 'EditUser',
    component: EditUser
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/checkout',
    name: 'CheckOut',
    component: CheckOut
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/updated_order',
    name: 'UpdatedOrder',
    component: UpdatedOrder
  },
  {
    path: '/password_reset',
    name: 'PasswordReset',
    component: PasswordReset
  },
  {
    path: '/send_mail',
    name: 'SendPasswordResetMail',
    component: SendPasswordResetMail
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/buying_history',
    name: 'BuyingHistory',
    component: BuyingHistory
  },
  {
    path: '/sales_lists',
    name: 'SalesLists',
    component: SalesLists
  },
  {
    path: '/list_ditail',
    name: 'ListDitail',
    component: ListDitail,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
