<template>
  <div class="user-profile">
    <h1 class="title">사용자 프로필</h1>
    <div class="profile-info">
      <p><span class="label">아이디:</span> {{ username }}</p>
      <p><span class="label">닉네임:</span> {{ nickname }}</p>
      <p><span class="label">자기소개:</span> {{ profile }}</p>
      <img :src="getProfileImagePath(parseInt(profile_img))" :alt="username" class="profile-image">
    </div>
    <button @click="updateUser" class="update-button">회원정보 수정</button>
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
      images: [
        { id: 1, name: '1.png', filename: '1.png' },
        { id: 2, name: '2.png', filename: '2.png' },
      ],
      profile: null,
      profile_img: null
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    updateUser() {
      this.$router.push({ name: 'UpdateUserView' });
    },
    getProfile() {
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
          this.profile_img = response.data.profile_img;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProfileImagePath(imageId) {
      const image = this.images.find((img) => img.id === imageId);
      if (image) {
        return require(`@/assets/${image.filename}`);
      } else {
        return require('@/assets/logo.png');
      }
    }
  }
}
</script>
