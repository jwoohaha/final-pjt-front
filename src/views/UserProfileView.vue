<template>
  <div>
    <p>사용자의 아이디: {{ username }} </p>
    <p>사용자의 토큰: {{ token }}</p>
  </div>
</template>

<script>
// import axios from 'axios';
import { mapState } from 'vuex';

export default {
  computed: {
  ...mapState(['username', 'token'])

  },    
};
</script>

<style>
</style>