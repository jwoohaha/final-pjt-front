<template>
  <div>
    <h1>MovieDetail</h1>
    <div class="wrapper">
      <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`">
      <div class="content">
        <p>제목 : {{ movie?.title }}</p>
        <p>내용 : {{ movie?.overview }}</p>
        <p>유명도 : {{ movie?.popularity }}</p>
        <p>장르 : {{ movie?.genres }}</p>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MovieDetailView',
  data() {
    return {
      movie: null
    }
  },
  created() {
    this.getMovieDetail()
  },
  methods: {
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${ this.$route.params.id }/`,
      })
      .then((res) => {
        console.log(res)
        this.movie = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
img {
  width: 40%;
  height: auto;
}
.wrapper {
  display: flex;
  justify-content: space-between;
}
</style>