<template>
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <form class="ui large form">
        <div class="ui segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input :value="email" type="email" @input="email = $event.target.value"
                placeholder="Adres e-mail">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input :value="password" type="password" @input="password = $event.target.value"
                placeholder="Hasło">
            </div>
          </div>
          <button type="button"
            class="ui fluid large teal submit button"
            @click="login(`${email}:${password}`)">Zaloguj</button>          
        </div>
      </form>      
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "LoginForm",
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    ...mapActions(['login']),
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
</style>
