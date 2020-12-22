<template>
  <modal @close="hideSettings" :active="settingsEditMode" size="tiny">
    <template v-slot:header>
      <div class="header">
        <label for="keymap">Wybierz mapowanie klawiatury</label>
      </div>
    </template>
    <template v-slot:body>
      <div class="content">
        <div class="ui form">
          <div class="ui inline fields">
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="keymap" id="dvorakToPuk" @input="selectKeymap">
                <label for="dvorakToPuk" class="SettingsModal__label">Dvorak - PUK</label>
              </div>              
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="keymap" id="qwertyToPuk" @input="selectKeymap">
                <label for="qwertyToPuk" class="SettingsModal__label">QWERTY - PUK</label>
              </div>              
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <label class="SettingsModal__label">
                  <input type="radio" name="keymap" @input="selectKeymap">
                  Brak
                </label>             
              </div>              
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="actions">
        <div class="ui cancel button" @click="hideSettings">Zamknij</div>        
      </div>
    </template>
  </modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Modal from './Modal.vue';

export default {
  name: 'SettingsModal',
  components: {
    Modal,
  },
  computed: {
    ...mapGetters(['settingsEditMode']),
  },
  methods: {
    ...mapActions(['hideSettings', 'selectKeymap']),
  },
}
</script>

<style lang="scss" scoped>
  .SettingsModal {
    .ui.radio.checkbox {
      cursor: pointer;
    }

    .ui.radio.checkbox label, .ui.radio.checkbox+label {
      cursor: pointer;
    }
  }
</style>