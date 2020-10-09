<template>
  <div class="AppHeader">
    <div class="ui secondary pointing menu">
      <div class="AppHeader__right left menu">
        <router-link to="/images" class="item" active-class="active">
          Galeria
        </router-link>
        <router-link v-if="isAuthorized" to="/upload" class="item" active-class="active">
          Dodaj obrazy
        </router-link>
      </div>
      <div v-if="isAuthorized" class="AppHeader__left right menu">
        <div class="AppHeader__timer">{{timeLeft}}</div>
        <a class="item" @click="logout">
          <i class="sign-out icon"></i>Wyjdź
        </a>
      </div>
    </div>    
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AppHeader',
  methods: mapActions(['logout']),
  computed: {
    ...mapGetters(['isAuthorized', 'timeLeft']),
    path() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
  .AppHeader {
    margin-bottom: 10px;
    &__timer {
      display: flex;
      align-items: center;
    }
  }
</style>