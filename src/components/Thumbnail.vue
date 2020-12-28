<template>
  <div class="Thumbnail" @mouseenter="active = true" @mouseleave="active = false">
    <img v-if="thumbnail" class="Thumbnail__img"
      :src="thumbnail"
      :alt="data.caption"
    />
    <div v-if="active || check" class="Thumbnail__checkbox">
      <i v-if="canEdit"
        class="Thumbnail__check-icon square outline icon"
        :class="{ check }"
        @click.prevent="toggleImageChecked(data.filename)"
      ></i>
    </div>
    <div v-if="active" class="Thumbnail__toolbar">
      <span class="Thumbnail__filename">{{data.filename | truncate(maxFilenameLength)}}</span>
      <div v-if="canEdit" class="Thumbnail__actions">
        <i class="Thumbnail__action edit icon"
          @click.prevent="editImage"
        ></i>
        <i class="Thumbnail__action trash alternate icon"
          @click.prevent="deleteImage"
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
  }),
  props: {
    data: Object,
  },
  computed: {
    ...mapGetters(['imagesChecked', 'pathToUploads', 'userId']),
    canEdit() {
      return this.userId === this.data.userId;
    },
    check() {
      return this.imagesChecked.includes(this.data.filename);
    },
    maxFilenameLength() {
      let maxLength;
      if (this.canEdit) {
        maxLength = 16;
      } else {
        maxLength = 25;
      }
      return maxLength;
    },
    thumbnail() {
      return this.data.filename ? `${this.pathToUploads}/${this.data.filename}/thumbnail` : null;
    },
  },
  methods: {
    ...mapActions(['checkImages', 'selectImage', 'toggleImageChecked']),
    editImage() {
      this.selectImage(this.data);
      this.$emit('editImage', this.data);
    },
    deleteImage() {
      this.checkImages([this.data.filename]);
      this.$emit('deleteImage');
    },
  },
  filters: {
    truncate(s, maxLength) {
      return s.length > maxLength ? `${s.slice(0, maxLength)}...` : s;
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