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
              <input :value="password" type="password" @input="updatePassword" placeholder="Hasło">
            </div>
          </div>
          <button class="ui fluid large teal submit button" @click="login">Zaloguj się</button>          
        </div>
      </form>      
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "LoginForm",
  methods: mapActions(['login', 'updateEmail', 'updatePassword']),
  computed: mapGetters(['email', 'password'])
};
</script>

<style scoped>
  .grid {
    margin-top: 50px;
  }
  .column {
    max-width: 450px;
  }
</style>