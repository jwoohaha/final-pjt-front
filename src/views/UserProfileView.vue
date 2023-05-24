<template>
  <div>
    <p>사용자의 아이디: {{ username }} </p>
    <p>사용자의 닉네임: {{ nickname }}</p>
    <p>자기소개: {{ profile }}</p>

    <button @click="updateUser">회원정보 수정</button>
  </div>
</template>

<script>
import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000';

export default {
  name: 'UserProfileView',
  data() {
    return {
      username: null,
      nickname: null,
      profile: null
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    updateUser() {
      this.$router.push({ name: 'UpdateUserView' });
    },
    getProfile(){
      axios({
        method: 'get',
        url: `${API_URL}/accounts/test/update/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
      .then((response) => {
        this.username = response.data.username;
        this.nickname = response.data.nickname;
        this.profile = response.data.profile;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>

<style>
</style>