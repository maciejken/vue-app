<template>
  <UserForm :signUp="true" />
</template>

<script>
import UserForm from './UserForm.vue';

export default {
  name: 'SignUpForm',
  components: {
    UserForm,
  },
}
</script>
