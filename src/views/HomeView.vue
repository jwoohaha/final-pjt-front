<template>
  <div class="home">
    <h1>MovieCardList</h1>
    <br>
    <h1>Trending</h1>
    <MovieCardList :movies="trendingMovies"/>
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
      topRatedMovies:state => state.topRatedMovies,
      trendingMovies:state => state.trendingMovies
    })
  },
  created() {
    this.getTopRatedMovies()
    this.getTrendingMovies()
  },
  methods: {
    getTopRatedMovies() {
      this.$store.dispatch('getTopRatedMovies')
    },
    getTrendingMovies() {
      this.$store.dispatch('getTrendingMovies')
    }
  }
}
</script>
