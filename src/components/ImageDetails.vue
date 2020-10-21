<template>
  <div class="ImageDetails">
    <figure class="ImageDetails__fig"
      :class="imageOrientation"
    >
      <img :src="`${pathToUploads}/${filename}`" alt=""
        class="ImageDetails__img" @click="enableImageEditMode"
      >
      <caption v-if="selectedImage.caption"
        class="ImageDetails__caption"
      >
        {{selectedImage.caption}}
      </caption>
      <div class="ImageDetails__info">
        <div class="ImageDetails__info-item">
          <i class="camera icon"></i> {{selectedImage.camera}}
        </div>
        <div class="ImageDetails__info-item">
          <i class="calendar icon"></i> {{selectedImageCaptureDate}}
        </div>
        <div class="ImageDetails__info-item">
          <i class="image icon"></i> {{selectedImageDimensions}} ({{selectedImageMegabytes}} MB)
        </div>
        <div class="ImageDetails__info-item">
          <i class="map marker alternate icon"></i> {{selectedImage.location}}
        </div>
      </div>
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
      'selectedImage',
      'selectedImageCaptureDate',
      'selectedImageDimensions',
      'selectedImageMegabytes',
    ]),
    filename() {
      return this.$route.params.filename;
    },
    imageOrientation() {
      const { width, height } = this.selectedImage;
      return {
        'ImageDetails__fig--portrait': width < height,
        'ImageDetails__fig--landscape': width > height,
      };
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
    width: 100%;
    display: flex;
    justify-content: center;
    &__fig {
      max-width: 800px;
      position: relative;
      &:hover {
        .ImageDetails__caption,
        .ImageDetails__info {
          display: flex;
        }
      }
      &--portrait {
        max-width: 600px;
      }
      &--landscape {
        max-width: 800px;
      }
    }
    &__img {
      cursor: pointer;
      width: 100%;
    }
    &__caption, &__info {
      display: none;
      position: absolute;
      width: 100%;
      background-color: rgba(#fff, .9);
      align-items: center;
    }
    &__caption {
      height: 64px;
      top: 0;
      font-size: 24px;
      justify-content: center;
    }
    &__info {
      height: 128px;
      bottom: 0;
      font-size: 18px;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    &__info-item {
      width: 300px;
      display: flex;
      padding: 0 0 0 36px;
    }
  }
</style>