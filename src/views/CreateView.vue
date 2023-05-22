<!-- views/CreateView.vue -->

<template>
  <div>
    <h1>영화 감상 평 남기기</h1>
    <form @submit.prevent="createArticle">
      <label for="title">영화 제목 : </label>
      <input type="text" id="title" v-model.trim="title"><br>
      <label for="content">내용 : </label>
      <textarea id="content" cols="30" rows="10" v-model="content"></textarea><br>
      <label for="rating">평점 : </label>
      <input type="number">
      <input type="submit" id="submit">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CreateView',
  data() {
    return {
      title: null,
      content: null,
    }
  },
  watch: {
    title(query) {
      this.searchMovie(query)
    }
  },
  methods: {
    createArticle() {
      const title = this.title
      const content = this.content
      const rating = this.rating

      if (!title) {
        alert('제목 입력해주세요')
        return
      } else if (!content){
        alert('내용 입력해주세요')
        return
      }

      axios({
        method: 'post',
        url: `${API_URL}/articles/`,
        data: { title, content, rating},
        headers: {
          'Authorization': `Token ${this.$store.state.token}`
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error)
      });
    },
    searchMovie(query) {
      let encodedQuery = encodeURIComponent(query)
      axios({
        method: 'GET',
        url: `${API_URL}/movies/${encodedQuery}/`,
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style>

</style>
