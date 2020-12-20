import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Secure from "./views/Secure.vue";
import Siapa from "./views/Siapa.vue";
import Daftar from "./views/Daftar.vue";

import VueMeta from "vue-meta";
import store from "./store";


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
      path: "/daftar",
      name: "Daftar",
      component: Daftar
    },
    {
      path: "/tree",
      name: "tree",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Tree.vue")
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
      component: Secure,
      beforeEnter(to,from, next) {
        if (store.state.authenticated) {
            console.log('Ingelogd toch?');
            next();
        } else {
          next('/login');
        }
      }
    }
  ]
});
