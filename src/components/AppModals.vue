<template>
  <div class="ui dimmer modals transition" :class="state" @click.stop="hideModals">
    <SettingsModal />
    <ImageEditModal />
    <ImageDeleteModal />       
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ImageEditModal from './ImageEditModal.vue';
import ImageDeleteModal from './ImageDeleteModal.vue';
import SettingsModal from './SettingsModal.vue';

export default {
  name: 'AppModals',
  components: {
    ImageEditModal,
    ImageDeleteModal,
    SettingsModal,
  },
  computed: {
    ...mapGetters([
      'imageEditMode',
      'imageDeleteMode',
      'settingsEditMode',
    ]),
    state() {
      return {
        active: this.active,
      };
    },
    active() {
      return this.settingsEditMode || this.imageEditMode || this.imageDeleteMode;
    },
  },
  methods: {
    ...mapActions(['hideModals']),
  },
}
</script>
<style lang="scss" scoped>

</style>
