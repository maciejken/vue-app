<template>
  <div class="AppHeader">
    <div class="ui secondary pointing menu">
      <div class="AppHeader__right left menu">
        <router-link to="/uploads" class="item" active-class="active">
          Galeria
        </router-link>
        <router-link v-if="isAuthorized" to="/upload-files" class="item" active-class="active">
          Dodaj obrazy
        </router-link>
      </div>
      <div v-if="isAuthorized" class="AppHeader__left right menu">
        <div class="AppHeader__timer" @click="reauth()">
          <i class="AppHeader__hourglass hourglass icon"
            :class="hourglassClass"
          ></i>
          {{timeLeft}}
        </div>
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
  methods: { 
    ...mapActions(['authorize', 'reauth', 'logout']),
  },
  computed: {
    ...mapGetters(['hourglass', 'isAuthorized', 'timeLeft']),
    path() {
      return this.$route.path;
    },
    hourglassClass() {
      return {
        start: this.hourglass === 'start',
        half: this.hourglass === 'half',
        end: this.hourglass === 'end',
      };
    }
  },
};
</script>

<style lang="scss" scoped>
  .AppHeader {
    margin-bottom: 10px;
    &__hourglass {
      height: 20px;
    }
    &__timer {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
</style>