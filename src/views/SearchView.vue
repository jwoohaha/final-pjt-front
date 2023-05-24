<template lang="">
  <div>
    <p>검색어: {{ $route.params.query }}</p>
    <div class="items d-flex flex-row">
      <MovieCard
        v-for="movie in searchResult"
        :key="movie.id"
        :name="movie.title"
        :movie="movie"
        :image-src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
      />
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'SearchView',
  components: {
    MovieCard
  },
  data() {
    return{
      searchResult: null,
      query: this.$route.params.query,
    }
  },
  created() {
    this.getSearchData(this.query)
  },
  methods: {
    getSearchData(query) {
      // query를 제목에 포함하는 영화 정보를 받아오는 api 호출
      // const query = this.$route.params.query
      let encodedQuery = encodeURIComponent(query)
      axios({
        method: 'GET',
        url: `${API_URL}/movies/${encodedQuery}/`,
      })
      .then((res) => {
        this.searchResult = res.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
  },
}
</script>
<style lang="">
  
</style>