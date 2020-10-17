<template>
  <div class="Thumbnail" @mouseenter="active = true" @mouseleave="active = false">
    <img class="Thumbnail__img"
      :src="`${pathToUploads}/${data.filename}/thumbnail`"
      alt=""
    />
    <div v-if="active || check" class="Thumbnail__checkbox">
      <i class="Thumbnail__check-icon square outline icon" :class="{ check }"
        @click.prevent="check = !check"
      ></i>
    </div>
    <div v-if="active" class="Thumbnail__toolbar">
      <span class="Thumbnail__filename">{{data.filename | truncate}}</span>
      <div class="Thumbnail__actions">
        <i class="Thumbnail__action edit icon"
          @click.prevent="editData"
        ></i>
        <i class="Thumbnail__action trash alternate icon"
          @click.prevent="deleteAndRefresh"
        ></i>        
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "Thumbnail",
  data: () => ({
    active: false,
    check: false,
  }),
  props: {
    data: Object,
  },
  computed: {
    ...mapGetters(['pathToUploads']),
  },
  methods: {
    ...mapActions(['deleteImage', 'fetchImages']),
    async deleteAndRefresh() {
      await this.deleteImage(this.data.filename);
      this.fetchImages();
    },
    editData() {
      this.$emit('editImage', this.data);
    },
  },
  filters: {
    truncate(s) {
      return s.length > 15 ? `${s.slice(0, 15)}...` : s;
    },
  },

}
</script>

<style lang="scss" scoped>
  .Thumbnail {
    width: 200px;
    height: 200px;
    margin: 2px;
    cursor: pointer;
    color: #000;
    position: relative;
    z-index: 0;
    &__img {
      width: 100%;
    }
    &__checkbox {
      position: absolute;
      top: 2px;
      right: 2px;
      background-color: #fff;
      height: 17px;
      cursor: pointer;
    }
    &__check-icon {
      font-size: 20px;
      margin: 0;
      width: auto;
      height: auto;
      line-height: 18px;
    }
    &__toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      z-index: 1;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 30px;
      background-color: rgba(#fff, .9);
      cursor: default;
    }
    &__filename {
      padding-left: .25em;
    }
    &__action {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }
</style>