<template>
  <div class="home">
    <div class="backdrop">
      <div class="backdrop-img">
        <img :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`" alt="">
      </div>
      <div class="backdrop-text">
        <h1>{{movie.title}}</h1>
        <p>{{ movie.overview }}</p>
      </div>
    </div>
    <br>
    <MovieCarousel :movies="popularMovies" :list_title="'인기영화'"/>
    <MovieCarousel :movies="recommendedMovies" :list_title="'개인별 추천 영화'"/>
    <MovieCarousel :movies="topRatedMovies" :list_title="'평점이 높은 영화'"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieCarousel from '@/components/MovieCarousel.vue'
import { mapState } from 'vuex'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'HomeView',
  components: {
    MovieCarousel
  },
  data() {
    return {
      movie: null,
    }
  },
  computed: {
    ...mapState({
      recommendedMovies:state => state.recommendedMovies,
      popularMovies:state => state.popularMovies,
      topRatedMovies:state => state.topRatedMovies,
    })
  },
  created() {
    this.getRecommendedMovies()
    this.getPopularMovies()
    this.getTopRatedMovies()
    this.getMovieOfTheDay()
  },
  methods: {
    getRecommendedMovies() {
      this.$store.dispatch('getRecommendedMovies')
    },
    getPopularMovies() {
      this.$store.dispatch('getPopularMovies')
    },
    getTopRatedMovies() {
      this.$store.dispatch('getTopRatedMovies')
    },
    getMovieOfTheDay() {
      const randomNum = Math.floor(Math.random() * 10) + 1
      axios({
        method: 'get',
        url: `${API_URL}/movies/${ randomNum }/`,
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
  }
}
</script>

<style scoped>
.home {
  background-color: rgb(38, 42, 86);
  color: white; /* 텍스트 색상을 흰색으로 설정 */
}

.backdrop {
  width: 100%;
  margin: 10px auto;
  position: relative;
}

.backdrop img {
  width: 100%;
  height: auto;
}

.backdrop-text{
  position: absolute;
  top: 60%;
  left: 25%;
  transform: translate(-20%, -50%);
  width: 100%;
  color: white;
  text-align: left;
}

.backdrop-text p {
  width: 30%;
}
</style>