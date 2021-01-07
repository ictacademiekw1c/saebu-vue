import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Secure from "./views/Secure.vue";
import Siapa from "./views/Siapa.vue";
import Selamat from "./views/Selamat.vue";
import Daftar from "./views/Daftar.vue";
import Tahun from "./views/Tahun.vue";

import VueMeta from "vue-meta";
import store from "./store";

Vue.use(Router);
Vue.use(VueMeta, {
  keyName: "metaInfo",
  attribute: "data-vue-meta",
  ssrAttribute: "data-vue-meta-server-rendered",
  tagIDKeyName: "vmid",
  refreshOnceOnNavigation: true
});

let router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/selamat",
      name: "Selamat",
      component: Selamat,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/daftar",
      name: "Daftar",
      component: Daftar,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/tahun",
      name: "Tahun",
      component: Tahun,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/tree",
      name: "tree",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Tree.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/logout",
      name: "logout",
      beforeEnter: (to, from, next) => {
        store.state.authenticated = false;
        store.state.jwt = "";
        store.state.userLoggedIn = null;
        next({ path: "/login" });
      }
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
      meta: {
        requiresAuth: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  //if (to.matched.some(record => record.meta.requiresAuth)) {
  if (to.meta.requiresAuth && !store.state.authenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
