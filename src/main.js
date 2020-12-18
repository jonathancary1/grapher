import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';
import 'normalize.css';
import router from './router.js';
import apolloProvider from './apollo.js';
import App from './App.vue';

Vue.use(Vuelidate);
Vue.use(VueApollo);
Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue(
  { router, apolloProvider, render: h => h(App) }
).$mount('#app');
