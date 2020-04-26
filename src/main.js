import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import store from './store';
import LoginForm from './components/LoginForm';
import Home from './components/Home';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginForm,
      meta: {
        requiresAuth: false
      }
    }
  ]
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
