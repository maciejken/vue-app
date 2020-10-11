import VueRouter from 'vue-router';
import store from './store';
import { getAuthSeconds } from './cookie';
import LoginForm from './components/LoginForm.vue';
import Home from './components/Home.vue';
import UploadForm from './components/UploadForm.vue';
import ImageDetails from './components/ImageDetails.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginForm,
    },
    {
      path: '/',
      redirect: '/images',
    },
    {
      path: '/images',
      name: 'Home',
      component: Home,
    },
    {
      path: '/images/:filename',
      name: 'ImageDetails',
      component: ImageDetails,
    },
    {
      path: '/upload',
      name: 'Upload',
      component: UploadForm,
    },
  ]
});

router.beforeEach((to, from, next) => {
  const login = to.matched.some(r => r.name === 'Login');
  if (login) {
    next();
  } else if (!store.getters.isAuthorized) {
    const seconds = getAuthSeconds();
    if (seconds) {
      store.dispatch('authorize', seconds);
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
