<template>
  <div class="ui secondary pointing menu">
    <div class="left menu">
      <router-link to="/" class="item" :class="{ active: path === '/' }">
        Galeria
      </router-link>
      <router-link to="/upload" class="item" :class="{ active: path === '/upload' }">
        Dodaj obraz
      </router-link>      
    </div>
    <div class="right menu">
      <a class="item" @click="logout">
        <i class="sign-out icon"></i>Wyjdź
      </a>
    </div>
 </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AppHeader',
  methods: mapActions(['logout']),
  computed: {
    ...mapGetters(['isLoggedIn']),
    path() {
      return this.$route.path;
    },
  },
};
</script>