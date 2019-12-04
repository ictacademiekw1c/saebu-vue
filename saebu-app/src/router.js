import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Secure from "./views/Secure.vue";
import Siapa from "./views/Siapa.vue";
import VueMeta from 'vue-meta';


Vue.use(Router);
Vue.use(VueMeta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-server-rendered',
  tagIDKeyName: 'vmid',
  refreshOnceOnNavigation: true
});

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/wiebenje",
      name: "siapakau",
      component: Siapa
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue")
    },
    {
            path: "/secure",
            name: "secure",
            component: Secure
    }
  ]
});
