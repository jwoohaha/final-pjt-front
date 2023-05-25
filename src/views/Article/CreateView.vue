<!-- views/CreateView.vue -->

<template>
  <div>
    <h1>영화 감상평 남기기</h1>
    <form @submit.prevent="createArticle">
      <label for="title">영화 제목 : </label>
      <input type="text" id="title" v-model.trim="title">
      <br>
      <div id="search-result">
        <p 
          v-for="(movie, idx) in searchResult" :key="idx"
          @click="selectMovie(movie)"
        > {{ movie.title }} </p>
      </div>

      <textarea id="content" cols="100" rows="10" v-model="content"></textarea><br>
      <div class="star-rating space-x-4 mx-auto">
        <input type="radio" id="5-stars" name="rating" value="5" v-model="rating"/>
        <label for="5-stars" class="star pr-4">★</label>
        <input type="radio" id="4-stars" name="rating" value="4" v-model="rating"/>
        <label for="4-stars" class="star">★</label>
        <input type="radio" id="3-stars" name="rating" value="3" v-model="rating"/>
        <label for="3-stars" class="star">★</label>
        <input type="radio" id="2-stars" name="rating" value="2" v-model="rating"/>
        <label for="2-stars" class="star">★</label>
        <input type="radio" id="1-star" name="rating" value="1" v-model="rating" />
        <label for="1-star" class="star">★</label>
      </div>
      <input type="submit" id="submit">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CreateView',
  data() {
    return {
      title: null,
      movieId: null,
      content: null,
      searchResult: null,
      rating: 0,
      searchFlag: true
    }
  },
  watch: {
    title(query) {
      this.searchMovie(query)
    }
  },
  methods: {
    searchMovie(query) {
      // 영화 제목을 한 글자씩 입력할 때마다 해당 문자열을 제목에 포함하는 영화 정보를 받아오는 api 호출
      if (this.searchFlag) {
        let encodedQuery = encodeURIComponent(query)
        axios({
          method: 'GET',
          url: `${API_URL}/movies/${encodedQuery}/`,
        })
        .then((res) => {
          console.log(res.data)
          this.searchResult = res.data
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
    selectMovie(movie) {
      // 검색 결과 클릭 시 해당 영화 선택
      this.title = movie.title
      this.movieId = movie.id
      this.searchFlag = false  // 선택 후 탐색 중단
      this.searchResult = []  // 검색 결과 초기화
    },
    createArticle() {
      // 감상평 남기기
      const content = this.content
      const rating = this.rating
  
      axios({
        method: 'POST',
        url: `${API_URL}/articles/movie_articles/${ this.movieId }/`,
        data: { content, rating },
        headers: {
          'Authorization': `Token ${this.$store.state.token}`
        }
      })
      .then((res) => {
        console.log(res)
        if (res.status === 205) {
          alert("이미 해당 영화의 감상평을 남기셨어요!")
        }
        this.$router.push({ name: 'ArticleView' })
      })
      .catch((err) => {
        console.log(err)
      });
    },
  }
}
</script>

<style>
h1, label {
  color: white;
}

.star-rating {
  display: flex;
  flex-direction: row-reverse;
  font-size: 2.25rem;
  line-height: 2.5rem;
  justify-content: space-around;
  padding: 0 0.2em;
  text-align: center;
  width: 5em;
}

 
.star-rating input {
  display: none;
}
 
.star-rating label {
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 2.3px;
  -webkit-text-stroke-color: #2b2a29;
  cursor: pointer;
}
 
.star-rating :checked ~ label {
  -webkit-text-fill-color: gold;
}
 
.star-rating label:hover,
.star-rating label:hover ~ label {
  -webkit-text-fill-color: #fff58c;
}
</style>
