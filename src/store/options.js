import * as Cognito from '../aws/cognito';

export default {
  state: {
    token: null,
  },
  mutations: {
    setToken(state, { token }) {
      state.token = token;
    },
  },
  actions: {
    async logIn({ commit }, { username, password }) {
      const result = await Cognito.logIn(username, password);
      const token = result.idToken.jwtToken;
      commit('setToken', { token });
    },
    async signUp(_, { username, email, password }) {
      await Cognito.signUp(username, email, password);
    },
  },
};
