<template>
  <router-link :to="{
    name: 'MovieDetailView',
    params: { id: movie.id }}">
    <div class="movie-card">
      <img :src="imageSrc"/>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'MovieCard',
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
    props: {
      imageSrc: String,
      movie: Object
    }
  }
</script>

<style scoped>
.movie-card {
  min-width: 140px;
  max-width: 140px;
  height: 197px;
  margin-right: var(--spacing);
  position: relative;
}
.movie-card img {
  /* Absolute for the popout effect on hover */
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  transition: transform 0.2s;
}
.movie-card:hover {
  cursor: pointer;
  z-index: 100;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
.movie-card:hover img {
  transform: scale(1.1);
}
@media screen and (min-width: 900px) {
  .movie-card {
    min-width: 200px;
    max-width: 200px;
    height: 280px;
  }
}
</style>