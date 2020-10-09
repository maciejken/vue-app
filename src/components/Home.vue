<template>
  <div class="Home">
    <div class="Home__images">
      <router-link
        v-for="img of images"
        :key="`thumbnail-${img.filename}`"
        :to="`/images/${img.filename}`"
      >
        <Thumbnail
          :data="img"
          @click="selectImage(img)"
        />        
      </router-link>

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Thumbnail from './Thumbnail.vue';

export default {
  name: "Home",
  components: {
    Thumbnail,
  },
  computed: {
    ...mapGetters(['images', 'imagesError', 'isAuthorized']),
  },
  methods: {
    ...mapActions([
      'fetchImages',
      'authorize',
      'logout',
      'selectImage'
    ]),
    checkAccess() {
      const cookie = this.$cookies.get('authorized');
      if (cookie) {
        this.authorize();
      } else {
        this.logout();
      }
    },
  },
  created() {
    this.checkAccess();
    this.fetchImages();
  },
};
</script>

<style scoped lang="scss">
  .Home {
    &__images {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
    }
  }
</style>
