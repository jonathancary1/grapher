import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Account from './views/Account.vue';

const home = {
  path: '/',
  name: 'Home',
  component: Home,
};

const account = {
  props: true,
  path: '/account',
  name: 'Account',
  component: Account,
};

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [home, account],
});
