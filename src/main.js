import Vue from 'vue';
import Vuex from 'vuex';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';
import ApolloClient from 'apollo-boost';
import 'normalize.css';
import App from './App.vue';
import { home, account } from './routes';
import { state, mutations, actions } from './store';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  actions,
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: 'https://grapher.caryjonathan.com/api/graphql',
  }),
});

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [home, account],
});

Vue.config.productionTip = false;

const plugins = { store, apolloProvider, router };
const vm = new Vue({ ...plugins, render: (h) => h(App) });
vm.$mount('#app');
