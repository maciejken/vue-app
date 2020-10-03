
import VueRouter from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import Home from './components/Home.vue';
import UploadForm from './components/UploadForm.vue';

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
    },
    {
      path: '/upload',
      name: 'Upload',
      component: UploadForm,
      meta: {
        requiresAuth: true,
      }
    },
  ]
});
