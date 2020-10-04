<template>
  <div class="Home">
    <AppHeader />
    <div class="Home__images">
      <img class="Home__thumbnail"
        v-for="image of images"
        :key="`image-${image.filename}`"
        :src="`${pathToThumbnails}/${image.filename}`"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import AppHeader from './AppHeader';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "Home",
  components: {
    AppHeader
  },
  computed: {
    ...mapGetters(['images', 'imagesError']),
    pathToThumbnails() {
      return `${process.env.VUE_APP_API_URL}/uploads/thumbnails`;
    },
  },
  created() {
    this.fetchImages();
  },
  methods: {
    ...mapActions(['fetchImages']),
  },
};
</script>

<style scoped lang="scss">
  .Home {
    &__images {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__thumbnail {
      width: 100px;
    } 
  }
</style>
