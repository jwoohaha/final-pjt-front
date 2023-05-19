<template>
  <div class="shows-list">
    <slot></slot>
    <div class="row">
      <div class="col-12">
        <div class="items d-flex flex-row">
          <MovieCard
            v-for="(movie, index) in movies"
            :key="index"
            :name="movie.title"
            :image-src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
          />
        </div>
      </div>
    </div>
    <p class="scroll-hint">Scroll for more &rarr;</p>
  </div>
</template>

<script>
  import MovieCard from '@/components/MovieCard.vue'

  export default {
    name: 'MovieCardList',
    components: {
      MovieCard
    },
    props: {
      movies: Array
    },
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    },
    computed: {
      topRatedMovies() {
        return this.$store.state.topRatedMovies
      }
    }
  }
</script>

<style scoped>
.shows-list {
  margin-bottom: calc(var(--spacing) * 3);
}
.items {
  display: flex;
  overflow-x: auto;
  padding: calc(var(--spacing) * 3) var(--spacing);
  margin-left: -8px;
}
.scroll-hint {
  text-align: right;
}
.items::-webkit-scrollbar {
  display: true;
}
</style>