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
        <div class="AppHeader__timer" @click="reauth()"
          :class="{ 'AppHeader__timer--blinking': secondsLeft < 60 }"
        >
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
    ...mapGetters(['isAuthorized', 'secondsLeft', 'timeLeft']),
    path() {
      return this.$route.path;
    },
    hourglassClass() {
      return {
        start: this.secondsLeft >= 600,
        half: this.secondsLeft >= 120 && this.secondsLeft < 600,
        end: this.secondsLeft < 120,
        'AppHeader__hourglass--blinking': this.secondsLeft < 60
      };
    }
  },
};
</script>

<style lang="scss" scoped>
  .AppHeader {
    margin-bottom: 10px;

    &__right, &__left {
      display: flex;
      align-items: center;
    }

    &__hourglass {
      height: 20px;

      &--blinking {
        animation: blink .5s infinite;
      }

      @keyframes blink {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(.9);
        }
        100% {
          transform: scale(1);
        }
      }
    }

    &__timer {
      display: flex;
      align-items: baseline;
      padding: 3px;
      cursor: pointer;

      &--blinking {
        color: darken(red, 10%);
        animation: pulse .5s infinite;
      }

      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(darken(red, 10%), 0.7);
        }
        50% {
          box-shadow: 0 0 0 5px rgba(darken(red, 10%), 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(darken(red, 10%), 0);
        }
      }
    }
  }
</style>