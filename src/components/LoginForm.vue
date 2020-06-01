<template>

  <div class="ui middle aligned center aligned grid">
    <div class="column">      
      <form class="ui large form">
        <div class="ui segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input :value="email" type="email" @input="updateEmail" placeholder="Adres e-mail">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input :value="password" type="password" @input="updatePassword" placeholder="Hasło  ( 8 - 24 znaków )">
            </div>
          </div>
          <button type="button" class="ui fluid large teal submit button" @click="login" :disabled="!isEmailValid || !isPasswordValid || isAccessDenied">Zaloguj</button>
        </div>
      </form>
      <transition name="fade">
        <div v-if="isAccessDenied" class="ui negative message">
          <i class="ban icon"></i>Brak dostępu!
        </div>
      </transition>
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "LoginForm",
  methods: mapActions(['login', 'updateEmail', 'updatePassword']),
  computed: mapGetters(['email', 'password', 'isAccessDenied', 'isEmailValid', 'isPasswordValid']),
};
</script>

<style scoped>
  .grid {
    margin-top: 50px;
  }
  .column {
    max-width: 450px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>