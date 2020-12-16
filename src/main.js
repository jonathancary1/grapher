import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';
import App from './App.vue';
import Account from './views/Account.vue';
import Home from './views/Home.vue';
import 'normalize.css';

Vue.use(Vuelidate);
Vue.use(VueRouter);

const home = {
  path: '/',
  name: 'Home',
  component: Home
};

const account = {
  path: '/account',
  name: 'Account',
  component: Account
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [home, account]
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
