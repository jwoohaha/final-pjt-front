<template>
  <div>
    <h1>{{ this.$store.state.username }}님의 회원정보 수정 페이지</h1>
    <form @submit.prevent="updateUser">

      <label for="nickname">nickname : </label>
      <input type="text" id="nickname" v-model="nickname"><br>

      <label for="profile">comments : </label>
      <textarea id="profile" v-model="profile"></textarea><br>

      <!-- <label for="profile_img">profile picture: </label>
      <input type="file" id="profile_img" @change="handleFileUpload"><br> -->
      
      <input type="submit" value="수정하기">
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateUserView',
  data() {
    return {
      nickname: null,
      profile: null,
      // profile_img: null
    }
  },
  methods: {
    updateUser() {
      const nickname = this.nickname
      const profile = this.profile

      const payload = {
       nickname, profile
      }
      
      this.$store.dispatch('updateUser', payload)

    }
  }
}
</script>