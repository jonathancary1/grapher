import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';
import 'normalize.css';
import App from './App.vue';
import router from './router';
import store from './store';
import apolloProvider from './apollo';

Vue.use(Vuelidate);
Vue.use(VueApollo);
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
