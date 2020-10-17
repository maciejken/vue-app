<template>
  <modal @close="disableImageDeleteMode">
    <template v-slot:header>
      <div  class="ImageDeleteModal__header">
        Potwierdź usunięcie pliku
      </div>
    </template>
    <template v-slot:body>
      <div class="ImageDeleteModal__body">
        Czy na pewno usunąć plik {{ selectedImage.filename }}?
      </div>
    </template>
    <template v-slot:footer>
      <div class="ImageDeleteModal__footer">
        <button class="ImageDeleteModal__confirm"
          @click="deleteImage(selectedImage.filename)">
          Tak
        </button>
        <button class="ImageDeleteModal__cancel"
          @click="disableImageDeleteMode">
          Nie
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Modal from './Modal.vue';

export default {
  name: 'ImageDeleteModal',
  components: {
    Modal,
  },
  computed: {
    ...mapGetters(['selectedImage']),
  },
  methods: {
    ...mapActions(['deleteImage', 'disableImageDeleteMode']),
  },
}
</script>

<style lang="scss" scoped>
  .ImageDeleteModal {
    &__footer {
      display: flex;
      justify-content: flex-end;
    }
    &__confirm, &__cancel {
      margin-left: 10px;
      padding: 0 20px;
    }
  }
</style>