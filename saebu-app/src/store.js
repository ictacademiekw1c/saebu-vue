import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAccount: "Anonymous",
    authenticated: false,
    jwt: ""
  },
  mutations: {},
  actions: {}
});
