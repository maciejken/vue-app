<template>
  <div class="ImageDetails">
    <img :src="`${pathToUploads}/${filename}`" alt=""
      class="ImageDetails__img"
    >
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ImageDetails',
  data: () => ({

  }),
  props: {
    data: Object,
  },
  computed: {
    ...mapGetters(['pathToUploads','selectedImage']),
    filename() {
      return this.$route.params.filename;
    },
  },
  methods: {
    ...mapActions(['fetchImage']),
  },
  beforeMount() {
    if (!this.selectedImage) {
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
    }
  }
</style>