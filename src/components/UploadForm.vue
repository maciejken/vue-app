<template>
  <div class="UploadForm">
    <form class="box" enctype="multipart/form-data"
      @submit.prevent="submitFiles"
    >
      <div class="UploadForm__input">
        <input class="box__file" type="file" name="imageUpload" id="files"
          data-multiple-caption="{count} files selected" multiple
          ref="filesInput" @change="handleFileUploads"
        />
        <label for="file"><span class="box__dragndrop">Drag and drop files here</span></label>
        <button class="box__button" type="submit">Wyślij</button>
      </div>
      <div class="box__uploading">Uploading…</div>
      <div class="box__success">Done!</div>
      <div class="box__error">Error! <span></span>.</div>
    </form>  
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "UploadForm",
  components: {},
  data: () => ({
    files: '',
  }),
  methods: {
    ...mapActions(['uploadImages']),
    handleFileUploads() {
      this.files = this.$refs.filesInput.files;
    },
    async submitFiles() {
      const formData = new FormData();

      for (let i = 0; i < this.files.length; i++) {
        formData.append('imageUpload', this.files[i]);
      }
      
      await this.uploadImages(formData);
    },
  },
}
</script>

<style lang="scss" scoped>
  .UploadForm {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    &__input {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 200px;
      height: 200px;
    }
  }
.box__dragndrop,
.box__uploading,
.box__success,
.box__error {
  display: none;
}
</style>
