<template>
  <div>
    <h1>{{ this.$store.state.username }}님의 회원정보 수정 페이지</h1>
    <form @submit.prevent="updateUser">
      <label for="nickname">nickname: </label>
      <input type="text" id="nickname" v-model="nickname"><br>

      <label for="profile">comments:</label>
      <textarea id="profile" v-model="profile"></textarea><br>

      <div class="image-list">
        <div v-for="image in images" :key="image.id" class="image-item" :class="getImageClass(image.id)">
          <img :src="getImagePath(image.filename)" :alt="image.name" class="image" @click="updateImg(image.id)">
        </div>
      </div>
      <input type="submit" value="수정하기">
    </form>
  </div>
</template>

<script>
import axios from "axios"
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'UpdateUserView',
  data() {
    return {
      nickname: null,
      profile: null,
      images: [], // 초기에는 빈 배열로 시작
      selectedImageId: null
    }
  },
  mounted() {
    // 이미지를 동적으로 추가
    for (let i = 1; i <= 8; i++) {
      const image = {
        id: i,
        name: `${i}.png`,
        filename: `${i}.png`
      };
      this.images.push(image);
    }
  },
  created() {
    this.getUserDetail();
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
    },
    getImageClass(imageId) {
      return this.selectedImageId === imageId ? 'selected' : '';
    },
    getUserDetail() {
      console.log(this.$store.state.username)
      axios({
        method: 'GET',
        url: `${API_URL}/accounts/api/update/${this.$store.state.username}`,
      })
      .then((res) => {
        console.log(res.data)
        this.nickname = res.data.nickname
        this.profile = res.data.profile
      })
      .catch((err) => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>
.image-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.image-item {
  margin: 10px;
  cursor: pointer;
  flex-basis: 20%; /* 이미지 아이템의 너비를 20%로 설정하여 한 줄에 5개의 이미지가 보이도록 합니다. */
  aspect-ratio: 1/1;
}

.image {
  width: 90%;
  height: 90%;
  object-fit: cover;
}

.selected {
  border: 2px solid blue;
  /* 원하는 스타일을 추가로 설정할 수 있습니다. */
}
</style>
