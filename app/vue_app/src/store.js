// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null, // This will store the user session information
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    loginUser({ commit }, user) {
      // You can perform any authentication logic here
      // For simplicity, we are directly setting the user in the store
      commit('setUser', user);
    },
    logoutUser({ commit }) {
      // Log out the user by setting the user to null
      commit('setUser', null);
    },
  },
  getters: {
    isLoggedIn: state => !!state.user,
  },
});
