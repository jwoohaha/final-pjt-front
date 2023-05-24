<template>
  <div class="user-profile">
    <h1 class="title">사용자 프로필</h1>
    <div class="profile-info">
      <p><span class="label">아이디:</span> {{ username }}</p>
      <p><span class="label">닉네임:</span> {{ nickname }}</p>
      <p><span class="label">자기소개:</span> {{ profile }}</p>
      <img :src="getProfileImagePath" :alt="this.$store.state.username" class="profile-image">
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
      profile: null
    }
  },
  computed: {
    getProfileImagePath() {
      const selectedImage = this.$store.state.selectedImage
      if (selectedImage) {
        return require(`@/assets/${selectedImage.filename}`)
      } else {
        return require('@/assets/logo.png')
      }
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
.user-profile {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.profile-info {
  margin-bottom: 20px;
}

.profile-image {
  width: 200px; 
  height: 200px;
  object-fit: cover; /* 이미지 비율 유지 */
  object-position: left; /* 이미지를 왼쪽으로 정렬 */
}

.label {
  font-weight: bold;
  margin-right: 5px;
}

.update-button {
  padding: 10px 20px;
  background-color: #4287f5;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.update-button:hover {
  background-color: #357ae8;
}

</style>