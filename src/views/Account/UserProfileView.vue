<template>
  <div>
    <div class="user-profile">
      <h1 class="title">사용자 프로필</h1>
      <div class="profile-image-container">
        <img :src="getProfileImagePath(parseInt(profile_img))" :alt="username" class="profile-image">
      </div>
      <div class="profile-info">
        <h1 class="info-item"><span class="label">아이디:</span> {{ username }}</h1>
        <h1 class="info-item"><span class="label">닉네임:</span> {{ nickname }}</h1>
        <h1 class="info-item"><span class="label">자기소개:</span> {{ profile }}</h1>
      </div>
      <button v-if="this.$store.state.username===username" @click="updateUser" class="update-button">회원정보 수정</button>
      <button v-if="this.$store.state.username!=username" @click="mixedRecommend" class="recommend-button">영화 추천</button>
    </div>

    <div>
      <MovieCarousel :movies="recommendedMovies" :list_title="'추천 영화'"/>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';
import MovieCarousel from '@/components/MovieCarousel.vue';
const API_URL = 'http://127.0.0.1:8000';

export default {
  name: 'UserProfileView',
  components: {
    MovieCarousel
  },
  data() {
    return {
      username: this.$route.params.username,
      nickname: null,
      images: [], // 초기에는 빈 배열로 시작
      profile: null,
      profile_img: null,
      recommendedMovies: null,
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
    this.getProfile()
    this.mixedRecommend()
  },
  methods: {
    updateUser() {
      this.$router.push({ name: 'UpdateUserView' });
    },
    mixedRecommend() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/recommend/${this.$store.state.username}/${this.username}/`,
      })
      .then((res) => {
        console.log(res)
        this.recommendedMovies = res.data
      })
      .catch((error) => {
        console.log(error);
      });
    },
    getProfile() {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/api/update/${this.username}/`,

      })
      .then((response) => {
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
        return require('@/assets/base.png');
      }
    }
  }
}
</script>

<style scoped>

.profile-image-container {
  float: left; /* 이미지를 왼쪽으로 위치시킴 */
  margin-right: 20px; /* 이미지와 다른 내용 사이의 간격을 조절 */
}
.profile-image {
  width: 250px; /* 원하는 너비로 설정 */
  height: 250px; /* 원하는 높이로 설정 */
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.info-item {
  text-align: left;
  margin: 10px 0;
}
</style>