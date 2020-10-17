<template>
  <div class="Home">
    <div class="Home__navigation">
      <i class="Home__previous chevron circle left icon" @click="previousPage"></i>
      <i class="Home__next chevron circle right icon" @click="nextPage"></i>
    </div>
    <div class="Home__images">
      <router-link
        v-for="img of uploadedImages"
        :key="`thumbnail-${img.filename}`"
        :to="`/uploads/${img.filename}`"
      >
        <Thumbnail
          :data="img"
          @click.native="selectImage(img)"
          @editImage="editImage"
          @deleteImage="deleteImage"
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
    ...mapGetters([
      'uploadedImages',
      'imagesError',
      'isAuthorized',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchImages',
      'nextPage',
      'previousPage',
      'authorize',
      'logout',
      'selectImage',
      'enableImageEditMode',
      'enableImageDeleteMode',
    ]),
    editImage(image) {
      this.selectImage(image);
      this.enableImageEditMode();
    },
    deleteImage(image) {
      this.selectImage(image);
      this.enableImageDeleteMode();
    },
  },
  created() {
    this.fetchImages();
  },
};
</script>

<style scoped lang="scss">
  .Home {
    &__navigation {
      display: flex;
      justify-content: center;
      margin: 15px;
      font-size: 24px;
    }
    &__previous, &__next {
      cursor: pointer;
    }
    &__previous {
      margin-right: 12px;
    }
    &__next {
      margin-left: 12px;
    }
    &__images {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
    }
  }
</style>
