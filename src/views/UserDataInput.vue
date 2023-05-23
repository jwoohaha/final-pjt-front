<template>
  <div>
    <h1>관람한 영화에 자기만의 점수를 매겨주세요.</h1>
    <div v-for="movieId in movielist" :key="movieId">
      <div v-if="movies[movieId]">
        <img :src="`https://image.tmdb.org/t/p/original/${movies[movieId].poster_path}`" style="max-width: 300px; height: auto;">
        <h2>{{ movies[movieId].title }}</h2>
        <p>{{ movies[movieId].overview }}</p>
      </div>
      <div class="article-list">
        <h3>별점 남기기</h3>
        <div class="star-rating space-x-4">
          <input type="radio" :id="getStarId(movieId, 5)" :name="getStarName(movieId)" value="5" :checked="rating[movieId] === 5" @click="setRating(movieId, 5)"/>
          <label :for="getStarId(movieId, 5)" class="star pr-4">★</label>
          <input type="radio" :id="getStarId(movieId, 4)" :name="getStarName(movieId)" value="4" :checked="rating[movieId] === 4" @click="setRating(movieId, 4)"/>
          <label :for="getStarId(movieId, 4)" class="star">★</label>
          <input type="radio" :id="getStarId(movieId, 3)" :name="getStarName(movieId)" value="3" :checked="rating[movieId] === 3" @click="setRating(movieId, 3)"/>
          <label :for="getStarId(movieId, 3)" class="star">★</label>
          <input type="radio" :id="getStarId(movieId, 2)" :name="getStarName(movieId)" value="2" :checked="rating[movieId] === 2" @click="setRating(movieId, 2)"/>
          <label :for="getStarId(movieId, 2)" class="star">★</label>
          <input type="radio" :id="getStarId(movieId, 1)" :name="getStarName(movieId)" value="1" :checked="rating[movieId] === 1" @click="setRating(movieId, 1)"/>
          <label :for="getStarId(movieId, 1)" class="star">★</label>
        </div>
        <div class="article-create">
          <form @submit.prevent="createArticle(movieId)">
            <input type="submit" id="submit">
          </form>
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
      movielist: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
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
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${ this.$route.params.id }/`,
      })
      .then((res) => {
        this.movie = res.data
        if (res.data.overview.length > 150) {
          this.summary = res.data.overview.substring(0, 150) + '...'
        } else {
          this.summary = res.data.overview
        }
        let genres = ''
        for (let genre of res.data.genres){
          genres += genre.name + ' '
        }
        this.movie.genres = genres
      })
      .catch((err) => {
        console.log(err)
      })
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
    createArticle(movieId) {
      // 감상평을 작성
      const content = this.content;
      const rating = this.rating[movieId] * 2;
      axios({
        method: 'post',
        url: `${API_URL}/articles/movie_articles/${movieId}/`,
        data: { content, rating },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then(() => {
          this.getMovieArticles();
        })
        .catch(() => {
          // 오류 처리
        });
    },


    // createArticle() {
    //   // 감상평을 작성
    //   const content = null
    //   const rating = this.rating[this.$route.params.id] * 2
    //   axios({
    //     method: 'post',
    //     url: `${API_URL}/articles/movie_articles/${ this.$route.params.id }/`,
    //     data: { content, rating },
    //     headers: {
    //       Authorization: `Token ${this.$store.state.token}`
    //     }
    //   })
    //   .then(() => {
    //     this.getMovieArticles()
    //   })
    //   .catch(() => {
    //   })
    // },
  }
}
</script>

<style>
/* 스타일은 이전과 동일하게 유지 */
</style>
