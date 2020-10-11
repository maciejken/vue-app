<template>
  <div class="ImageDetailsEditor">
    <form class="ImageDetailsEditor__form" @submit.prevent="patchImage">
      <div class="ImageDetailsEditor__content">
        <div class="ImageDetailsEditor__thumbnail">
          <img  class="ImageDetailsEditor__img"
            :src="`${pathToUploads}/${selectedImage.filename}/thumbnail`"
            alt=""
          >
        </div>
        <div class="ImageDetailsEditor__details">
          <div class="ImageDetailsEditor__filename">
            {{selectedImage.filename}}         
          </div>
          <div class="ImageDetailsEditor__location">
            <input type="datetime-local" class="ImageDetailsEditor__location-datetime"
              :value="selectedImage.locationDateTime" @input="updateImageLocationDateTime"
            >
            <input type="location" class="ImageDetailsEditor__location-name"
              :value="selectedImage.location" @input="updateImageLocation"
            >
          </div>
          <input type="text" class="ImageDetailsEditor__caption"
            :value="selectedImage.caption" @input="updateImageCaption"
          >
          <textarea class="ImageDetailsEditor__description"
            :value="selectedImage.description" @input="updateImageDescription"
          ></textarea>        
        </div>        
      </div>
      <div class="ImageDetailsEditor__buttons">
        <button class="ImageDetailsEditor__btn"
          @click.prevent="disableImageEditMode"
        >Zamknij</button>
        <button type="submit" class="ImageDetailsEditor__btn">Zapisz</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['pathToUploads', 'selectedImage']),
  },
  methods: {
    ...mapActions([
      'disableImageEditMode',
      'patchImage',
      'updateImageCaption',
      'updateImageLocation',
      'updateImageLocationDateTime',
      'updateImageDescription',
    ]),
  },
}
</script>

<style lang="scss" scoped>
  .ImageDetailsEditor {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(#fff, .75);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &__form {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: space-around;
    }

    &__content {
      display: flex;
      justify-content: space-between;
    }

    &__thumbnail {
      width: 240px;
    }

    &__img {
      width: 100%;
    }

    &__details {
      padding: 0 0 0 10px;
      width: 400px;
      height: 240px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__filename {
      font-size: 18px;
    }

    &__location {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    &__location-datetime {
      width: 200px;
    }

    &__location-name {
      width: 180px;
    }

    &__description {
      height: 140px;
    }

    &__buttons {
      display: flex;
      justify-content: flex-end;
    }

    &__btn {
      margin: 0 0 0 10px;
    }
  }
</style>