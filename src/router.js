
import VueRouter from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import Home from './components/Home.vue';
import UploadForm from './components/UploadForm.vue';
import ImageDetails from './components/ImageDetails.vue';

export default new VueRouter({
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
