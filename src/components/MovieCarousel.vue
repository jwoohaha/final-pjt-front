<template>
  <div class="total-carousel-container mb-4">
    <h1 class="d-flex carousel-explanation ms-5 mb-4">{{list_title}}</h1>

    <carousel :per-page="4" :paginationEnabled="true">
      <slide v-for="(movie, index) in movies" :key="index">
        <router-link :to="{
          name: 'MovieDetailView',
          params: { id: movie.id }}">
          <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" 
            alt="poster" class="mx-5 w-75 rounded">
        </router-link>
      </slide>
    </carousel>
    
  </div>
</template>


<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: "MovieCarousel",
  components: {
    Carousel,
    Slide,
  },
  props: {
    list_title: String,
    movies: Array
  },
}
</script>


<style scoped>

.total-carousel-container {
  padding: 20px;
  background-color: rgba(1, 1, 1, 0.4);
}

.carousel-explanation {
  font-size: 24px;
}

</style>