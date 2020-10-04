import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import store from './store';
import router from './router';

Vue.use(VueRouter);

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
