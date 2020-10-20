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
        Aparat: {{selectedImage.camera}} //
        Data: {{selectedImageCaptureDate}} //
        Rozmiar: {{selectedImageDimensions}} ({{selectedImageMegabytes}} MB)
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
        'ImageDetails__img--portrait': width < height,
        'ImageDetails__img--landscape': width > height,
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
          display: block;
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
      height: 64px;
      width: 100%;
      background-color: rgba(#fff, .8);
      line-height: 64px;
      text-align: center;
    }
    &__caption {
      top: 0;
      font-size: 24px;
    }
    &__info {
      bottom: 0;
      font-size: 18px;
    }
  }
</style>