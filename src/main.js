import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from './plugins/firebase'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate';
import * as originalRules from 'vee-validate/dist/rules';
import ja from 'vee-validate/dist/locale/ja.json';
import './plugins/axios'
import VueEcho from 'vue-echo-laravel';
import Pusher from 'pusher-js'
import Echo from 'laravel-echo';

// 全てのルールをインポート
let rule;
for (rule in originalRules) {
  extend(rule, {
    ...originalRules[rule],
  });
}

// 日本語に設定
localize('ja', ja);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);


Vue.config.productionTip = false


const EchoInstance = new Echo({
  authModule: false,
  broadcaster: "pusher",
  cluster: "ap3",
  connectOnLogin: true,
  disconnectOnLogout: true,
  forceTLS: true,
  key: "edf3938b4e2d4a86998a",
  plugins: null
})

Vue.use(VueEcho, EchoInstance);



new Vue({
  router,
  store,
  vuetify,
  firebase,
  Pusher,
  render: h => h(App)
}).$mount('#app')

