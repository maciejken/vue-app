<template>
  <div class="ImageDetails">
    <figure class="ImageDetails__fig"
      :class="imageOrientation"
    >
      <img v-if="selectedImage.filename"
        :src="`${pathToUploads}/${selectedImage.filename}`"
        :alt="selectedImage.caption"
        class="ImageDetails__img"
        @click="enableImageEditMode"
      >
      <caption v-if="selectedImage.caption"
        class="ImageDetails__caption"
      >
        {{selectedImage.caption}}
      </caption>
      <div class="ImageDetails__info">
        <div class="ImageDetails__detail">
          <i class="image icon"></i> Rozmiar pliku: {{imageFileSize}} MB
        </div>
        <div v-if="imageWidth" class="ImageDetails__detail">
          <i class="image icon"></i> Rozdzielczość: {{imageWidth}} x {{imageHeight}}
        </div>
        <div v-if="imageCamera" class="ImageDetails__detail">
          <i class="camera icon"></i> {{imageCamera}}
        </div>
        <div v-if="imageCreatedAt" class="ImageDetails__detail">
          <i class="calendar icon"></i> {{imageCreatedAt}}
        </div>
        <div v-if="imageLocation" class="ImageDetails__detail">
          <a
            :href="`https://google.com/maps/place/${imageLocation}`"
            target="_blank"
          >
            <i class="map marker alternate icon"></i> {{imageLocation}}
          </a>
        </div>
      </div>
    </figure>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ImageDetail } from '../constants';

export default {
  name: 'ImageDetails',
  props: {
    data: Object,
  },
  computed: {
    ...mapGetters([
      'pathToUploads',
      'selectedImage',
      'selectedImageDetails',
    ]),
    filename() {
      return this.selectedImage.filename;
    },
    imageWidth() {
      return this.getImageDetail(ImageDetail.width);
    },
    imageHeight() {
      return this.getImageDetail(ImageDetail.height);
    },
    imageOrientation() {
      return {
        'ImageDetails__fig--portrait': this.imageWidth < this.imageHeight,
        'ImageDetails__fig--landscape': this.imageWidth > this.imageHeight,
      };
    },
    imageCreatedAt() {
      const { createdAt } = this.selectedImage;
      return createdAt && new Date(createdAt).toLocaleString('pl');
    },
    imageLocation() {
      return this.getImageDetail(ImageDetail.location);
    },
    imageCamera() {
      return this.getImageDetail(ImageDetail.camera);
    },
    imageFileSize() {
      const size = this.getImageDetail(ImageDetail.size);
      return Math.round(10 * size/(1024 * 1024))/10;
    },
  },
  methods: {
    ...mapActions([
      'fetchImage',
      'enableImageEditMode',
    ]),
    getImageDetail(name) {
      return this.selectedImageDetails.find(d => d.name === name)?.content;
    },
  },
  beforeMount() {
    this.fetchImage(this.$route.params.filename);
  },
}
</script>

<style lang="scss" scoped>
  .ImageDetails {
    width: 100%;
    display: flex;
    justify-content: center;
    &__fig {
      margin: 0;
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
      justify-content: flex-start;
    }
    &__detail {
      display: flex;
      padding: 0 0 0 36px;
    }
  }
</style>