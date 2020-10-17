<template>
  <div>
    <AppHeader />
    <router-view></router-view>
    <SettingsModal v-if="showSettings" />
    <ImageEditModal v-if="imageEditModeEnabled" />
    <ImageDeleteModal v-if="imageDeleteModeEnabled" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import router from './router';
import AppHeader from './components/AppHeader.vue';
import SettingsModal from './components/SettingsModal.vue';
import ImageEditModal from './components/ImageEditModal';
import ImageDeleteModal from './components/ImageDeleteModal';

export default {
  name: 'App',
  router,
  components: {
    AppHeader,
    ImageEditModal,
    ImageDeleteModal,
    SettingsModal,
  },
  computed: {
    ...mapGetters([
      'imageEditModeEnabled',
      'imageDeleteModeEnabled',
      'showSettings'
    ]),
  },
};
</script>

<style scoped>

</style>