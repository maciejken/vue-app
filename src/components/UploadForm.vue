<template>
  <div class="UploadForm">
    <form class="box" enctype="multipart/form-data"
      @submit.prevent="submitFiles"
    >
      <div class="UploadForm__input">
        <input class="UploadForm__files" type="file" name="imageUpload" id="files"
          data-multiple-caption="Wybrano plików: {count}" multiple
          ref="filesInput" @change="handleFileUploads"
        />
        <label for="file"><span class="box__dragndrop">Drag and drop files here</span></label>
        <button class="UploadForm__submit" type="submit"
          :disabled="!okToUpload"
        >
          Wyślij
        </button>
        <label class="UploadForm__public">
          <input type="checkbox"
            class="UploadForm__checkbox"
            v-model="isPublic"
          >Zapisz w katalogu publicznym
        </label>
      </div>
      <div class="box__uploading">Uploading…</div>
      <div class="box__success">Done!</div>
      <div class="box__error">Error! <span></span>.</div>
    </form>  
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "UploadForm",
  components: {},
  data: () => ({
    files: '',
  }),
  computed: {
    ...mapGetters(['isPublicUpload', 'selectedGroupId', 'userGroups']),
    isPublic: {
      get() {
        return this.isPublicUpload;
      },
      set(isPublic) {
        this.updatePublicUpload(isPublic);
      },
    },
    okToUpload() {
      // TODO: check if user is admin for public uploads
      return this.selectedGroupId || this.isPublicUpload;
    },
  },
  methods: {
    ...mapActions(['fetchUserGroups', 'updatePublicUpload', 'uploadImages']),
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
  beforeMount() {
    this.fetchUserGroups();
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
      width: 16em;
    }
    &__files, &__submit {
      margin: 0 0 1em 0;
    }
    &__public {
      display: flex;
      align-items: center;
    }
    &__checkbox {
      margin: 0 0.5em 0 0;
    }
  }
.box__dragndrop,
.box__uploading,
.box__success,
.box__error {
  display: none;
}
</style>
