<template>
  <div class="minimal pushable">
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
      <router-link v-if="isAuthorized" to="/upload-files"
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
      <div class="full height">
        <router-view></router-view>
        <SettingsModal v-if="editSettingsMode" />
        <ImageEditModal v-if="editImageMode" />
        <ImageDeleteModal v-if="deleteImageMode" />         
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import router from './router';
import SettingsModal from './components/SettingsModal.vue';
import ImageEditModal from './components/ImageEditModal';
import ImageDeleteModal from './components/ImageDeleteModal';

export default {
  name: 'App',
  router,
  components: {
    ImageEditModal,
    ImageDeleteModal,
    SettingsModal,
  },
  computed: {
    ...mapGetters([
      'isAuthorized',
      'editImageMode',
      'deleteImageMode',
      'editSettingsMode',
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
</style>