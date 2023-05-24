<template>
  <div class="home">
    <h1>MovieCardList</h1>
    <br>
    <h1>You Might Like...</h1>
    <MovieCardList :movies="recommendedMovies"/>
    <br>
    <h1>Trending</h1>
    <MovieCardList :movies="popularMovies"/>
    <br>
    <h1>Top Rated</h1>
    <MovieCardList :movies="topRatedMovies"/>
  </div>
</template>

<script>

// @ is an alias to /src
import MovieCardList from '@/components/MovieCardList.vue'
import { mapState } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    MovieCardList,
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
