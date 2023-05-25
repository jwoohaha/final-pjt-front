<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 p-3" v-for="movieId in movielist" :key="movieId">
          
          <div v-if="movies[movieId]">
            <img :src="`https://image.tmdb.org/t/p/original/${movies[movieId].poster_path}`" style="max-width: 200px; height: auto;">
          </div>
          
          <div class="d-flex justify-content-center align-items-center">
            
            <div class="star-rating" @click="createRating(movieId)">
              <input type="radio" :id="getStarId(movieId, 5)" :name="getStarName(movieId)" value="5" :checked="rating[movieId] === 5" @click="setRating(movieId, 5)"/>
              <label :for="getStarId(movieId, 5)" class="star">★</label>
              <input type="radio" :id="getStarId(movieId, 4)" :name="getStarName(movieId)" value="4" :checked="rating[movieId] === 4" @click="setRating(movieId, 4)"/>
              <label :for="getStarId(movieId, 4)" class="star">★</label>
              <input type="radio" :id="getStarId(movieId, 3)" :name="getStarName(movieId)" value="3" :checked="rating[movieId] === 3" @click="setRating(movieId, 3)"/>
              <label :for="getStarId(movieId, 3)" class="star">★</label>
              <input type="radio" :id="getStarId(movieId, 2)" :name="getStarName(movieId)" value="2" :checked="rating[movieId] === 2" @click="setRating(movieId, 2)"/>
              <label :for="getStarId(movieId, 2)" class="star">★</label>
              <input type="radio" :id="getStarId(movieId, 1)" :name="getStarName(movieId)" value="1" :checked="rating[movieId] === 1" @click="setRating(movieId, 1)"/>
              <label :for="getStarId(movieId, 1)" class="star">★</label>
            </div>
          
          </div>
        </div>
      </div>
    </div>
    <button @click="redirectToHome">환영합니다!</button>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'UserDataInput',
  data() {
    return {
      movies: {},
      movielist: [998, 188, 675, 410, 79, 319, 430, 571, 803, 205, 107, 869, 282, 287, 538, 97, 162, 478, 199, 182, 472, 212, 556, 258],
      rating: {} // 별점 데이터 저장
    }
  },
  created() {
    this.getMovies()
    this.getMovieDetail()
    this.getMovieArticles()
  },
  computed: {
    ratingToPercent() {
      // 별점 표시를 위한 연산
      const score = this.movie.vote_average * 10;
      return score;
    },
  },
  methods: {
    redirectToHome() {
      this.$router.push({ name: 'HomeView' });
    },
    getMovies() {
      this.movielist.forEach((movieId) => {
        axios({
          method: 'get',
          url: `${API_URL}/movies/${movieId}/`,
        })
        .then((res) => {
          this.$set(this.movies, movieId, res.data)
          // 초기 별점 데이터 설정
          this.$set(this.rating, movieId, 0)
        })
        .catch((err) => {
          console.log(err)
        })
      })
    },
    getStarId(movieId, rating) {
      return `star-${movieId}-${rating}`;
    },
    getStarName(movieId) {
      return `rating-${movieId}`;
    },
    setRating(movieId, rating) {
      this.rating[movieId] = rating;
    },
    createRating(movieId) {
      // 별점남기기
      const content = this.content;
      const rating = this.rating[movieId] * 2;
      if (rating != 0) {
        console.log('별점남기기', movieId, rating)
        axios({
          method: 'post',
          url: `${API_URL}/articles/movie_articles/${movieId}/`,
          data: { content, rating },
          headers: {
            Authorization: `Token ${this.$store.state.token}`
          }
        })
        .then(() => {
          console.log('별점 남기기 완료!')
        })
        .catch((err) => {
          // 오류 처리
          console.log(err)
        });
      }
    },
  }
}
</script>

<style>
</style>
