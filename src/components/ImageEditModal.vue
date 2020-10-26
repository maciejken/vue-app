<template>
  <div class="ImageDetailsEditor">
    <modal @close="disableImageEditMode" @save="patchImage">
      <template v-slot:body>
        <form class="ImageDetailsEditor__form">
          <div class="ImageDetailsEditor__content">
            <div class="ImageDetailsEditor__thumbnail">
              <img  class="ImageDetailsEditor__img"
                :src="`${pathToUploads}/${selectedImage.filename}/thumbnail`"
                alt=""
              >
            </div>
            <div class="ImageDetailsEditor__details">
              <div class="ImageDetailsEditor__filename">
                {{selectedImage.filename}} ({{selectedImageMegabytes}} MB)       
              </div>
              <input type="location" name="location" ref="location"
                class="ImageDetailsEditor__input ImageDetailsEditor__location"
                :value="selectedImage.location" @input="updateImage"
                placeholder="Dodaj miejsce"
              >
              <input type="text" name="caption" ref="caption"
                class="ImageDetailsEditor__input ImageDetailsEditor__caption"
                :value="selectedImage.caption" @input="updateImage"
                placeholder="Dodaj tytuł"
              >
              <textarea name="description" ref="description"
                class="ImageDetailsEditor__input ImageDetailsEditor__description"
                :value="selectedImage.description" @input="updateImage"
                placeholder="Dodaj opis"
              ></textarea>        
            </div>        
          </div>
        </form>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Modal from './Modal';
import mapInput from '../utils/map-input';

export default {
  name: 'ImageDetailsEditor',
  components: {
    Modal,
  },
  computed: {
    ...mapGetters([
      'pathToUploads',
      'selectedImage',
      'selectedImageMegabytes',
      'selectedKeyMap'
    ]),
  },
  methods: {
    ...mapActions([
      'disableImageEditMode',
      'patchImage',
      'updateSelectedImage',
      'updateImageLocationDateTime',
    ]),
    async updateImage({ target }) {
      const { name, selectionEnd, value } = target;
      const currentValue = this.selectedImage[name] || '';
      const keyMap = this.selectedKeyMap;
      await this.updateSelectedImage({
        ...this.selectedImage,
        [name]: mapInput({ currentValue, value, keyMap })
      });
      this.$refs[name].selectionEnd = selectionEnd;
    },
  },
}
</script>

<style lang="scss" scoped>
  .ImageDetailsEditor {
    display: flex;
    justify-content: center;
    align-items: center;

    &__form {
      width: 640px;
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

    &__input {
      height: 28px;
    }

    &__location {
      width: 100%;
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

  @media only screen and (max-width: 640px) {
    .ImageDetailsEditor {
      &__content {
        flex-direction: column;
        align-items: center;
      }
      &__filename {
        text-align: center;
      }
    }
  }
</style>