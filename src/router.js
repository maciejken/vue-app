
import VueRouter from 'vue-router';
import LoginForm from './components/LoginForm';
import Home from './components/Home';

export default new VueRouter({
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
