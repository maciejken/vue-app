<template>
  <div class="ui modal transition" :class="state" @click.stop>
    <slot name="header">
      <div class="header">
        Domyślny nagłówek
      </div>
    </slot>

    <slot name="body">
      <div class="content">
        Domyślna treść
      </div>
    </slot>

    <slot name="footer">
      <div class="actions">
        <div class="ui cancel button" @click="close">
          Zamknij
        </div>
        <div class="ui approve button" @click="save">
          Zapisz
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    active: Boolean,
    size: String,
  },
  computed: {
    state() {
      return {
        active: this.active,
        mini: this.size === 'mini',
        tiny: this.size === 'tiny',
        small: this.size === 'small',
        large: this.size === 'large',
      };
    },
  },
  methods: {
    save() {
      this.$emit('save');
    },
    close() {
      this.$emit('close');
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
