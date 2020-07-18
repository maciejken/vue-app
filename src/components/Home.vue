<template>
  <div>
    <AppHeader />
    <img :src="image" alt="" width="500">
  </div>
</template>

<script>
import api from '../api/images';
import AppHeader from './AppHeader';
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  components: {
    AppHeader
  },
  data: () => {
    return {
      image: null,
    };
  },
  computed: {
    ...mapGetters(['authToken']),
  },
  mounted() {
    api.getImage('IMG_20191213_215802.jpg', { token: this.authToken })
    .then(img => {
      this.image = img.data;
    });
  },
};
</script>