<template>
  <div class="ui middle aligned center aligned grid">
    <div class="column">      
      <form class="ui large form">
        <div class="ui segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input :value="username" type="email" @input="updateUsername"
                placeholder="Adres e-mail">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input :value="password" type="password" @input="updatePassword"
                placeholder="Hasło  ( 8 - 24 znaków )">
            </div>
          </div>
          <button type="button"
            class="ui fluid large teal submit button"
            :disabled="!isUsernameValid || !isPasswordValid || authError"
            @click="login({ username, password })">Zaloguj
          </button>          
        </div>
      </form>
      <transition name="fade">
        <div v-if="authError" class="ui negative message">
          <i class="ban icon"></i>{{authError.message}}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "LoginForm",
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    ...mapActions(['login', 'clearAuthError']),
    updateUsername(evt) {
      this.username = evt.target.value;
      this.clearAuthError();
    },
    updatePassword(evt) {
      this.password = evt.target.value;
      this.clearAuthError();
    },
  },
  computed: {
    ...mapGetters(['authError']),
    isUsernameValid() {
      const EmailRegex = /^[a-zA-Z0-9_.+-]{3,20}@[a-zA-Z0-9-]{3,10}\.[a-zA-Z0-9-.]{2,10}$/;
      return EmailRegex.test(this.username);
    },
    isPasswordValid() {
      const PasswordRegex = /^[A-Za-z0-9]{8,24}$/;
      return PasswordRegex.test(this.password);
    },
  },
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
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
