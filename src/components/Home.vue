<template>
  <div class="Home">
    <div class="Home__images">
      <router-link
        v-for="img of uploadedImages"
        :key="`thumbnail-${img.filename}`"
        :to="`/uploads/${img.filename}`"
      >
        <Thumbnail
          :data="img"
          @click.native="selectImage(img)"
          @editImage="handleEditImage"
        />        
      </router-link>
    </div>
    <ImageDetailsEditor v-if="imageEditModeEnabled" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Thumbnail from './Thumbnail.vue';
import ImageDetailsEditor from './ImageDetailsEditor.vue';

export default {
  name: "Home",
  components: {
    Thumbnail,
    ImageDetailsEditor,
  },
  computed: {
    ...mapGetters([
      'uploadedImages',
      'imagesError',
      'isAuthorized',
      'imageEditModeEnabled',
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
    ]),
    handleEditImage(image) {
      this.selectImage(image);
      this.enableImageEditMode();
    },
  },
  created() {
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
