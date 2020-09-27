<template>
  <div class="Home">
    <AppHeader />
    <div class="Home__images">
      <img class="Home__thumbnail"
        v-for="t of thumbnails"
        :key="`thumbnail-${t.filename}`"
        :src="`${pathToThumbnails}/${t.filename}`"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import api from '../api/images';
import AppHeader from './AppHeader';
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  components: {
    AppHeader
  },
  data: () => ({
    thumbnails: [],
  }),
  computed: {
    ...mapGetters(['accessToken']),
    pathToThumbnails() {
      return `${process.env.VUE_APP_API_URL}/uploads/thumbnails`;
    },
  },
  async mounted() {
    const images = await api.getImages({ accessToken: this.accessToken });
    this.thumbnails = images.data;
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
