<!-- views/CreateView.vue -->

<template>
  <div>
    <h1>영화 감상 평 남기기</h1>
    <form @submit.prevent="createArticle">
      <label for="title">영화 제목 : </label>
      <input type="text" id="title" v-model.trim="title"><br>
      <label for="content">내용 : </label>
      <textarea id="content" cols="30" rows="10" v-model="content"></textarea><br>
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
  methods: {
    createArticle() {
      const title = this.title
      const content = this.content

      if (!title) {
        alert('제목 입력해주세요')
        return
      } else if (!content){
        alert('내용 입력해주세요')
        return
      }
      console.log(this.$store.state.token)
      // axios({
      //   method: 'post',
      //   url: `${API_URL}/articles/`,
      //   data: this.$store.state.articles[0],
      //   headers: {
      //     Authorization: `Token ${this.$store.state.token}`
      //   }
      // })
      // .then((res) => {
      //   console.log(res)
      //   this.$router.push({name: 'ArticleView'})
      // })
      // .catch((err) => {
      //   console.log(err)
      // })
      // let data = this.$store.state.articles[0]
      let data = {
        title: this.title,
        content: this.content
      };
      axios.post(`${API_URL}/articles/`, data, {
        headers: {
          'Authorization': `Token ${this.$store.state.token}`
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style>

</style>
