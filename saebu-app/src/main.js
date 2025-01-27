import "@babel/polyfill";
import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { BootstrapVue } from "bootstrap-vue";
import VueTippy from "vue-tippy";

// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.use(VueTippy);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.prototype.$strapiendpoint =
  location.hostname === "localhost"
    ? "http://localhost:1337/"
    : "https://desolate-scrubland-69343.herokuapp.com/";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  computed: {
    isAuthenticated() {
      return this.$store.state.authenticated;
    }
  },
  render: h => h(App),
  beforeRouteEnter(to, from, next) {
    if (Object.keys(to.query).length !== 0) {
      //if the url has query (?query)
      next(vm => {
        vm.resetCode = to.query.code;
      });
    }
    next();
  }
}).$mount("#app");
