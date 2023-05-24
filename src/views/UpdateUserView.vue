<template>
  <div>
    <h1>{{ this.$store.state.username }}님의 회원정보 수정 페이지</h1>
    <form @submit.prevent="updateUser">
      <label for="nickname">nickname:</label>
      <input type="text" id="nickname" v-model="nickname"><br>

      <label for="profile">comments:</label>
      <textarea id="profile" v-model="profile"></textarea><br>

      <input type="submit" value="수정하기">
      <div class="image-list">
        <div v-for="image in images" :key="image.id" class="image-item">
          <img :src="getImagePath(image.filename)" :alt="image.name" class="image" @click="updateImg(image.id)">
        </div>
      </div>
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
      images: [
        { id: 1, name: '1.png', filename: '1.png' },
        { id: 2, name: '2.png', filename: '2.png' },
      ],
      selectedImageId: null // 이미지의 ID를 저장할 변수
    }
  },
  methods: {
    updateUser() {
      const nickname = this.nickname
      const profile = this.profile
      const profile_img = this.selectedImageId // 이미지의 ID를 저장
      
      console.log('커맨트, img번호 :', profile, profile_img)

      const payload = {
        nickname, profile, profile_img
      }
      
      this.$store.dispatch('updateUser', payload)
    },
    getImagePath(filename) {
      return require(`@/assets/${filename}`)
    },
    updateImg(imageId) { // 이미지의 ID를 전달받음
      this.selectedImageId = imageId // 이미지의 ID를 저장
    }
  }
}
</script>

<style scoped>
.image-list {
  display: flex;
  flex-wrap: wrap;
}

.image-item {
  margin: 10px;
  cursor: pointer;
}

.image {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
