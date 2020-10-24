<template>
  <UserForm :signUp="false" />
</template>

<script>
import UserForm from './UserForm.vue';

export default {
  name: 'LoginForm',
  components: {
    UserForm,
  },
}
</script>