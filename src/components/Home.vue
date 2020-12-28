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
          v-if="img.filename"
          :data="img"
          @editImage="editImage"
          @deleteImage="deleteImages"
        />        
      </router-link>
    </div>
    <div v-if="showBulkActions" class="Home__actions actions">
      <div class="ui approve button"
        @click="deleteImages">
        Usuń zaznaczone
      </div>
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
      'imagesChecked',
      'imagesError',
      'isAuthorized',
    ]),
    showBulkActions() {
      return this.imagesChecked.length > 1;
    },
  },
  methods: {
    ...mapActions([
      'fetchImages',
      'nextPage',
      'previousPage',
      'authorize',
      'logout',
      'enableImageEditMode',
      'enableImageDeleteMode',
    ]),
    editImage() {
      this.enableImageEditMode();
    },
    deleteImages() {
      this.enableImageDeleteMode();
    },
  },
  beforeMount() {
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
    &__actions {
      margin: 1em 0 0 1em;
    }
  }
</style>
