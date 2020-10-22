<template>
  <div class="AppHeader">
    <div class="ui secondary pointing menu">
      <div v-if="isAuthorized" class="AppHeader__left left menu">
        <router-link to="/uploads" class="item" active-class="active">
          <i class="images icon"></i>
          <span class="AppHeader__item-label">Galeria</span>
        </router-link>
        <router-link to="/upload-files" class="item" active-class="active">
          <i class="upload icon"></i>
          <span class="AppHeader__item-label">Dodaj obrazy</span>
        </router-link>
      </div>
      <div v-if="isAuthorized" class="AppHeader__right right menu">
        <div class="AppHeader__settings item" @click="showSettings">
          <i class="AppHeader__cog cog icon"></i>
          <span class="AppHeader__item-label">Ustawienia</span>
        </div>
        <div class="AppHeader__timer item" @click="reauth()"
          :class="{ 'AppHeader__timer--blinking': secondsLeft < 60 }"
        >
          <i class="AppHeader__hourglass hourglass icon"
            :class="hourglassClass"
          ></i>
          {{timeLeft}}
        </div>
        <a class="item" @click="logout">
          <i class="sign-out icon"></i>
          <span class="AppHeader__item-label">Wyjdź</span>
        </a>
      </div>
      <div v-else class="AppHeader__right right menu">
        <router-link to="/login" class="item" active-class="active">
          <i class="sign-in icon"></i>
          <div class="AppHeader__item-label">Logowanie</div>
        </router-link>
        <router-link to="/sign-up" class="item" active-class="active">
          <i class="user plus icon"></i>
          <div class="AppHeader__item-label">Rejestracja</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AppHeader',
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
      };
    }
  },
  methods: { 
    ...mapActions([
      'authorize',
      'reauth',
      'logout',
      'showSettings',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .AppHeader {
    &__right, &__left {
      display: flex;
      align-items: center;
    }

    &__settings {
      cursor: pointer;
    }

    &__timer {
      display: flex;
      align-items: baseline;
      padding: 3px;
      cursor: pointer;

      &--blinking {
        color: darken(red, 10%);
        animation: pulse 1s infinite;
      }

      @keyframes pulse {
        0% {
          background-color: rgba(darken(red, 10%), .7);
          color: #fff;
        }
        50% {
          background-color: #fff;
          color: darken(red, 10%);
        }
        100% {
          background-color: rgba(darken(red, 10%), .7);
          color: #fff;
        }
      }
    }
  }

  @media only screen and (max-width: 640px) {
    .AppHeader {
      &__item-label {
        display: none;
      }
    }
  }
</style>