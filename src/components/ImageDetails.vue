<template>
  <div class="ImageDetails">
    <figure class="ImageDetails__fig">
      <img :src="`${pathToUploads}/${filename}`" alt=""
        class="ImageDetails__img" @click="enableImageEditMode"
      >
    </figure>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ImageDetails',
  props: {
    data: Object,
  },
  computed: {
    ...mapGetters([
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
    &__fig {
      max-width: 800px;
      max-height: 800px;      
    }
    &__img {
      max-width: 100%;
      height: auto;
      cursor: pointer;
    }
  }
</style>