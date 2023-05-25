<template lang="">
  <div id="wrapper">
    <div id="search-result">
      <MovieCarousel v-if="movies" :movies="searchMovieResult" :list_title="'영화 검색 결과'"/>
      <div class="d-flex p-5">
        <div v-for="(user, idx) in searchUserResult" :key="idx" class="px-5">
          <div class="d-flex">
          <router-link :to="{ name: 'UserProfileView', params: { username: user.username }}"
            class="no-underline text-white">
              <img :src="getProfileImagePath(parseInt(user.profile_img))" style="width: 200px">
              <div class="p-5">
                <p>{{ user.username }}</p>
              </div>
            </router-link>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCarousel from '@/components/MovieCarousel.vue'
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'SearchView',
  components: {
    MovieCarousel
  },
  data() {
    return{
      searchMovieResult: null,
      searchUserResult: null,
      query: this.$route.params.query,
      profile_img: null,
      images: []
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
    this.getSearchMovieData(this.query)
    this.getSearchUserData(this.query)
  },
  methods: {
    getSearchMovieData(query) {
      // query를 제목에 포함하는 영화 정보를 받아오는 api 호출
      // const query = this.$route.params.query
      let encodedQuery = encodeURIComponent(query)
      axios({
        method: 'GET',
        url: `${API_URL}/movies/${encodedQuery}/`,
      })
      .then((res) => {
        this.searchMovieResult = res.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getSearchUserData(query) {
      let encodedQuery = encodeURIComponent(query)
      axios({
        method: 'GET',
        url: `${API_URL}/accounts/api/${encodedQuery}/`,
      })
      .then((res) => {
        console.log(res.data)
        this.searchUserResult = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getProfileImagePath(imageId) {
      console.log(imageId)
      const image = this.images.find((img) => img.id === imageId);
      if (image) {
        return require(`@/assets/${image.filename}`);
      } else {
        return require('@/assets/logo.png');
      }
    }
  },
}
</script>
<style>
#wrapper {
  height: 1000px;
}

.no-underline {
  text-decoration: none;
}
</style>