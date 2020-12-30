import * as Cognito from './api/cognito';

export const state = {
  token: null,
};

export const mutations = {
  // eslint-disable-next-line no-shadow
  setToken(state, { token }) {
    state.token = token;
  },
};

export const actions = {
  async logIn({ commit }, { username, password }) {
    const result = await Cognito.logIn(username, password);
    const token = result.idToken.jwtToken;
    commit('setToken', { token });
  },
  async signUp(_, { username, email, password }) {
    await Cognito.signUp(username, email, password);
  },
};
