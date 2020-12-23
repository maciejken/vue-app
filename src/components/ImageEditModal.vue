<template>
  <div class="ImageEditModal">
    <modal :active="imageEditMode">
      <template v-slot:header>
        <div class="header">{{selectedImage.filename}}</div>
      </template>
      <template v-slot:body>
        <div class="image content ImageEditModal__body">
          <img class="image"
            :src="`${pathToUploads}/${selectedImage.filename}/thumbnail`"
            alt=""
          >
          <div class="ImageEditModal__description">
            <div class="ui form">
              <div class="field">
                <input type="text" name="caption" ref="caption"
                  :value="selectedImage.caption" @input="updateImage"
                  placeholder="Dodaj tytuł"
                  :disabled="!canEdit"
                >              
              </div>
              <div class="field">
                <textarea name="description" ref="description"
                  class="ImageEditModal__description"
                  :value="selectedImage.description" @input="updateImage"
                  placeholder="Dodaj opis"
                  :disabled="!canEdit"
                ></textarea>               
              </div>
            </div>            
          </div>

        </div>
      </template>
      <template v-slot:footer>
        <div class="actions">
          <div v-if="canEdit" class="ui approve button" @click="patchImage">
            Zapisz
          </div>
          <div class="ui cancel button" @click="disableImageEditMode">
            Zamknij
          </div>        
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Modal from './Modal.vue';
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
      'selectedKeyMap',
      'userGroupIds',
      'imageEditMode',
    ]),
    canEdit() {
      return this.userGroupIds.includes(this.selectedImage.groupId);
    },
  },
  methods: {
    ...mapActions([
      'disableImageEditMode',
      'patchImage',
      'updateSelectedImage',
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
  .ImageEditModal {
    display: flex;
    justify-content: center;
    align-items: center;

    &__body {
      width: 100%;
      display: flex;
      align-items: flex-start;
    }

    &__description {
      width: 100%;
      padding: 0 0 0 1.5em;
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