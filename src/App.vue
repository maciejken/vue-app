<template>
  <div>
    <AppHeader />
    <router-view></router-view>
  </div>
  
</template>

<script>
import router from './router';
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  router,
  components: {
    AppHeader,
  },
};
</script>

<style scoped>

</style>