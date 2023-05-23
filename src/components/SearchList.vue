<template lang="">
  <div id="search-result">
    <p 
      v-for="(movie, idx) in searchResult" :key="idx"
      @click="selectMovie"
    > {{ movie.title }} </p>
  </div>
</template>
<script>
export default {
  methods: {
    selectMovie() {
      console.log(this)
      this.title = this.movie.title
      this.movieId = this.movie.id
      this.searchResult = null
      console.log(this.title, this.movieId, this.searchResult)
    },
  }

}
</script>
<style lang="">
  
</style>