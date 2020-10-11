import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import store from './store';
import router from './router';

Vue.use(VueRouter);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
