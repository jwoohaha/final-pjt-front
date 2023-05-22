<template>
    <div>
      <p>사용자의 아이디: {{ user.username }}</p>
      <p>사용자의 닉네임: {{ user.nickname }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          username: '',
          nickname: ''
        }
      };
    },
    created() {
      this.fetchCurrentUser();
    },
    methods: {
    fetchCurrentUser() {
     axios.get('/myapi/current-user/')
      .then(response => {
        this.user.username = response.data.username;
        this.user.nickname = response.data.nickname;
      })
      .catch(error => {
        console.error(error);
      });
  }
}
  };
  </script>
  
  <style>
  </style>