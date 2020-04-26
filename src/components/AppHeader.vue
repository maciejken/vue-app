<template>
  <div class="ui secondary pointing menu">
    <a href="#" class="active item">
      Galeria
    </a>
    <a href="#" class="item">Dodaj obraz</a>
    <div v-if="isLoggedIn" class="right menu">
      <a href="#" class="item" @click="logout">
        <i class="sign-out icon"></i>Wyloguj się
      </a>
    </div>
 </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AppHeader',
  methods: mapActions(['logout']),
  computed: mapGetters(['isLoggedIn']),
};
</script>