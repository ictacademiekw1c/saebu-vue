import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    jwt: "",
    userLoggedin: { username: "Anda Siapa?" }
  },
  getters: {
    userNow: state => {
      return state.userLoggedin.username;
    }
  },
  mutations: {
    changeUserState(state) {
      state.authenticated = false;
      state.jwt = "";
      state.userLoggedin = { id: null, username: "Anda Siapa?" };
    }
  },
  actions: {}
});
