import VueRouter from 'vue-router';
import store from './store';
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
      redirect: '/uploads',
    },
    {
      path: '/uploads',
      name: 'Home',
      component: Home,
    },
    {
      path: '/uploads/:filename',
      name: 'ImageDetails',
      component: ImageDetails,
    },
    {
      path: '/upload-files',
      name: 'Upload',
      component: UploadForm,
    },
  ]
});

router.beforeEach(async (to, from, next) => {
  const login = to.matched.some(r => r.name === 'Login');
  if (login) {
    next();
  } else if (!store.getters.isAuthorized) {
    const expires = await store.dispatch('authorize');
    if (expires) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
