<template>
  <div>
    <AppHeader />
    <router-view></router-view>
    <SettingsModal v-if="showSettings" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import router from './router';
import AppHeader from './components/AppHeader.vue';
import SettingsModal from './components/SettingsModal.vue';

export default {
  name: 'App',
  router,
  components: {
    AppHeader,
    SettingsModal,
  },
  computed: {
    ...mapGetters(['showSettings']),
  },
};
</script>

<style scoped>

</style>