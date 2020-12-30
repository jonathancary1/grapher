import Home from './views/home/Home.vue';
import Account from './views/account/Account.vue';

export const home = {
  path: '/',
  name: 'Home',
  component: Home,
};

export const account = {
  path: '/account',
  name: 'Account',
  component: Account,
};
