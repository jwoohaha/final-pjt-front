<template>
  <div class="home">
    <h1>Home</h1>
    <br>
    <MovieCarousel :movies="recommendedMovies" :list_title="'개인별 추천 영화'"/>
    <MovieCarousel :movies="popularMovies" :list_title="'인기영화'"/>
    <MovieCarousel :movies="topRatedMovies" :list_title="'평점이 높은 영화'"/>
  </div>
</template>

<script>

// @ is an alias to /src
import MovieCarousel from '@/components/MovieCarousel.vue'
import { mapState } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    MovieCarousel
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
  }
}
</script>
