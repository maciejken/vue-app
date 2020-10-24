import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import images from './modules/images';
import settings from './modules/settings';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    images,
    settings,
    users,
  }
});
