import Vue from "vue";
import Router from "vue-router";

import store from "../store";
window.store = store;

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: () => import("@/pages/Index/template.vue")
    },
    {
      path: "/login",
      component: () => import("@/pages/Login/template.vue")
    },
    {
      path: "/detail/:blogId",
      component: () => import("@/pages/Detail/template.vue")
    },
    {
      path: "/edit/:blogId",
      component: () => import("@/pages/Edit/template.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/create",
      component: () => import("@/pages/Create/template.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/user/:userId",
      component: () => import("@/pages/User/template.vue")
    },
    {
      path: "/my",
      component: () => import("@/pages/My/template.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/register",
      component: () => import("@/pages/Register/template.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch("checkLogin").then(isLogin => {
      if (!isLogin) {
        next({
          path: "/login",
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
