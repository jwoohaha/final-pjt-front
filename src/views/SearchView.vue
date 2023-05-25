<template lang="">
  <div>
    <p>검색어: {{ $route.params.query }}</p>
  <MovieCarousel :movies="searchResult" :list_title="'검색 결과'"/>
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