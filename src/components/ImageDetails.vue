<template>
  <div class="ImageDetails">
    <img :src="`${pathToUploads}/${filename}`" alt=""
      class="ImageDetails__img" @click="enableImageEditMode"
    >
    <ImageDetailsEditor v-if="imageEditModeEnabled" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ImageDetailsEditor from './ImageDetailsEditor.vue';

export default {
  name: 'ImageDetails',
  components: {
    ImageDetailsEditor,
  },
  props: {
    data: Object,
  },
  computed: {
    ...mapGetters([
      'imageEditModeEnabled',
      'pathToUploads',
      'selectedImage'
    ]),
    filename() {
      return this.$route.params.filename;
    },
  },
  methods: {
    ...mapActions([
      'fetchImage',
      'enableImageEditMode',
    ]),
  },
  beforeMount() {
    if (!this.selectedImage.filename) {
      this.fetchImage(this.filename);
    }
  }
}
</script>

<style lang="scss" scoped>
  .ImageDetails {
    display: flex;
    justify-content: center;
    &__img {
      max-height: 90vh;
      cursor: pointer;
    }
  }
</style>