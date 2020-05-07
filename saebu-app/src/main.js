import '@babel/polyfill'
import Vue from "vue";
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'bootstrap'


var host = location.hostname;
if (host == "localhost") {
   Vue.prototype.$mongoresturl = "http://localhost:8088/mongorestphp/";
}
else {
  Vue.prototype.$mongoresturl = "https://saebu.nl/mongorest/";
}


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  computed: {
    isAuthenticated() {
      return this.$store.state.authenticated;
    }
  },
  render: h => h(App)
}).$mount("#app");
