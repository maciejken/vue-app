<template>
  <modal :active="imageDeleteMode" size="tiny">
    <template v-slot:header>
      <div class="header">
        Potwierdź usunięcie plików
      </div>
    </template>
    <template v-slot:body>
      <div class="content">
        Czy na pewno usunąć następujące pliki?
        <ol class="ImageDeleteModal__files-list">
        <li v-for="filename in imagesChecked"
          :key="`file-${filename}`"
          class="ImageDeleteModal__filename">
          {{filename}}
        </li>
      </ol>
      </div>

    </template>
    <template v-slot:footer>
      <div class="actions">
        <div class="ui approve button"
          @click="deleteImages">
          Tak
        </div>
        <div class="ui cancel button"
          @click="disableImageDeleteMode">
          Nie
        </div>        
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
    ...mapGetters(['imageDeleteMode', 'imagesChecked']),
  },
  methods: {
    ...mapActions(['deleteImages', 'disableImageDeleteMode']),
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