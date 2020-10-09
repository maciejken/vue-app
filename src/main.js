import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';
import App from './App';
import store from './store';
import router from './router';

Vue.use(VueRouter);
Vue.use(VueCookies);

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.name !== 'Login')) {
    if (!store.getters.isAuthorized) {
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
