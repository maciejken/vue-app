<template>
  <div class="minimal pushable dimmable" :class="dimmed">
    <div class="ui top fixed inverted main menu">
      <div class="ui container">
        <a class="launch icon item" @click="showSidebar">
          <i class="content icon"></i>
        </a>
        <a v-if="isAuthorized" class="item" @click="reauth()"
          :class="timer"
        >
          <i class="hourglass icon"
            :class="hourglass"
          ></i>
          {{timeLeft}}
      </a>
      </div>
    </div>
    <div class="ui inverted vertical overlay sidebar menu left animating" :class="sidebar">
      <router-link v-if="isAuthorized" to="/uploads"
        class="item" active-class="active" @click.native="hideSidebar"
      >
        <i class="images icon"></i>Galeria
      </router-link>
      <router-link v-if="isAuthorized" to="/upload-form"
        class="item" active-class="active" @click.native="hideSidebar"
      >
        <i class="upload icon"></i>Dodaj obrazy
      </router-link>
      <a v-if="isAuthorized" class="item" @click="showSettings">
        <i class="cog icon"></i>Ustawienia
      </a>
      <a v-if="isAuthorized" class="item" @click="logout">
        <i class="sign-out icon"></i>Wyjdź
      </a>
      <router-link v-if="!isAuthorized" to="/login"
        class="item" active-class="active" @click.native="hideSidebar"
      >
        <i class="sign-in icon"></i>Logowanie
      </router-link>
      <router-link v-if="!isAuthorized" to="/sign-up"
        class="item" active-class="active" @click.native="hideSidebar"
      >
        <i class="user plus icon"></i>Rejestracja
      </router-link>
    </div>
    <div class="pusher" :class="pusher" @click="hideSidebar">
      <div class="App__main full height">
        <router-view></router-view>        
      </div>
    </div>
    <AppModals class="App__modals" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import router from './router';
import AppModals from './components/AppModals.vue';

export default {
  name: 'App',
  router,
  components: {
    AppModals,
  },
  computed: {
    ...mapGetters([
      'isAuthorized',
      'imageEditMode',
      'imageDeleteMode',
      'settingsEditMode',
      'secondsLeft',
      'timeLeft',
      'sidebarVisible',
    ]),
    path() {
      return this.$route.path;
    },
    hourglass() {
      return {
        start: this.secondsLeft >= 600,
        half: this.secondsLeft >= 120 && this.secondsLeft < 600,
        end: this.secondsLeft < 120,
      };
    },
    sidebar() {
      return {
        visible: this.sidebarVisible,
      };
    },
    timer() {
      return {
        'App__timer--blinking': this.secondsLeft < 60,
      };
    },
    pusher() {
      return {
        dimmed: this.sidebarVisible,
      };
    },
    dimmed() {
      return {
        dimmed: this.imageEditMode
          || this.imageDeleteMode
          || this.settingsEditMode,
      };
    },
  },
  methods: {
    ...mapActions([
      'authorize',
      'reauth',
      'logout',
      'showSettings',
      'showSidebar',
      'hideSidebar',
    ]),
  }
};
</script>

<style scoped lang="scss">
 .App {
    $color-warning: lighten( orange, 10%);
    &__main {
      padding: 40px 0 0 0;
    }
    &__timer {
      display: flex;
      align-items: baseline;
      padding: 3px;
      cursor: pointer;

      &--blinking {
        color: $color-warning;
        animation: pulse 1s infinite;
      }

      @keyframes pulse {
        0% {
          box-shadow: inset 0 0 15px $color-warning;
          background-color: inherit;
          color: $color-warning;
        }
        50% {
          box-shadow: 0 0 10px $color-warning;
          background-color: $color-warning;
          color: #000;
        }
        100% {
          box-shadow: inset 0 0 5px $color-warning;
          background-color: inherit;
          color: $color-warning;
        }
      }
    }
 }
</style>