<template>
  <div class="ui middle aligned center aligned grid">
    <div class="column">      
      <form class="ui large form" @submit.prevent="handleSubmit">
        <div class="ui segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text"
                v-model="username"
                placeholder="Nazwa użytkownika"
                @keydown="handleKeyDown"
                ref="usernameInput"
              />
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password"
                v-model="password"
                placeholder="Hasło  ( 8 - 24 znaków )"
                @keydown="handleKeyDown"
              >
            </div>
          </div>
          <div class="field" v-if="signUp">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password"
                v-model="repeatPassword"
                placeholder="Powtórz hasło"
                @keydown="handleKeyDown"
              >
            </div>
          </div>
          <button type="submit" class="ui fluid large teal submit button"
            :disabled="!isFormValid || accessError">
            {{ signUp ? 'Wyślij' : 'Zaloguj' }}
          </button>          
        </div>
      </form>
      <transition name="fade">
        <div v-if="accessError" class="ui negative message">
          <i class="ban icon"></i>{{accessError.message}}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "UserForm",
  data: () => ({
    username: null,
    password: null,
    repeatPassword: null,
  }),
  props: {
    signUp: Boolean,
  },
  computed: {
    ...mapGetters(['accessError']),
    isUsernameValid() {
      const UsernameRegex = /^[a-z0-9]{3,24}$/;
      return UsernameRegex.test(this.username);
    },
    isPasswordValid() {
      const PasswordRegex = /^[A-Za-z0-9.,;:!?@#$%^&*]{8,24}$/;
      return PasswordRegex.test(this.password);
    },
    isRepeatPasswordValid() {
      return !this.signUp || this.repeatPassword === this.password;
    },
    isFormValid() {
      return this.isUsernameValid && this.isPasswordValid && this.isRepeatPasswordValid;
    },
  },
  methods: {
    ...mapActions([
      'login',
      'createUser',
      'clearAccessError', 
    ]),
    handleKeyDown(evt) {
      if (evt.keyCode !== 13) {
        this.accessError && this.isFormValid && this.clearAccessError();
      }
    },
    handleSubmit() {
      const { username, password } = this;
      if (this.signUp) {
        this.isFormValid && !this.accessError && this.createUser({ username, password });
      } else {
        this.isFormValid && !this.accessError && this.login({ username, password });
      }
    },
  },
  mounted() {
    this.$refs.usernameInput.focus();
  },
  destroyed() {
    this.clearAccessError();
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
