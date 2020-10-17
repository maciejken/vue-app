<template>
  <modal @close="hideSettings">
    <template v-slot:header>
      <div class="SettingsModal__header">
        Wybierz mapowanie klawiatury
      </div>
    </template>
    <template v-slot:body>
      <form>
        <label class="SettingsModal__label">
          <input type="radio" name="keymap" id="dvorakToPuk" @input="selectKeymap">
          Dvorak - PUK
        </label>
        <label class="SettingsModal__label">
          <input type="radio" name="keymap" id="qwertyToPuk" @input="selectKeymap">
          QWERTY - PUK
        </label>
        <label class="SettingsModal__label">
          <input type="radio" name="keymap" @input="selectKeymap">
          Brak
        </label>
      </form>
    </template>
    <template v-slot:footer>
      <div></div>
    </template>
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import Modal from './Modal';

export default {
  name: 'SettingsModal',
  components: {
    Modal,
  },
  methods: {
    ...mapActions(['hideSettings', 'selectKeymap']),
  },
}
</script>

<style lang="scss" scoped>
  .SettingsModal {
    &__header {
      font-size: 18px;
    }
    &__label {
      display: block;
      cursor: pointer;
      margin: 5px 0;
    }
  }
</style>