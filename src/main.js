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


new Vue({
  router,
  store,
  vuetify,
  // axios,
  firebase,
  render: h => h(App)
}).$mount('#app')

