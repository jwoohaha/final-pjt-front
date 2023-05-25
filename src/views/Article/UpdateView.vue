<template lang="">
  <div>
    <h1 class="mb-3">영화 감상평 수정</h1>
    <div class="row">
      <div class="col-md-6 mx-auto">
        <form @submit.prevent="updateArticle">
          <div class="form-group bg- p-3">
            <h3 class="mb-4 text-success">{{article.movie_title}}</h3>
            <textarea class="form-control" id="content" cols="100" rows="10" v-model="content" placeholder="감상평"></textarea><br>
            <div class="star-rating space-x-4 mx-auto">
              <input type="radio" id="5-stars" name="rating" value="5" v-model="rating"/>
              <label for="5-stars" class="star pr-4">★</label>
              <input type="radio" id="4-stars" name="rating" value="4" v-model="rating"/>
              <label for="4-stars" class="star">★</label>
              <input type="radio" id="3-stars" name="rating" value="3" v-model="rating"/>
              <label for="3-stars" class="star">★</label>
              <input type="radio" id="2-stars" name="rating" value="2" v-model="rating"/>
              <label for="2-stars" class="star">★</label>
              <input type="radio" id="1-star" name="rating" value="1" v-model="rating" />
              <label for="1-star" class="star">★</label>
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
            
          </div>
        </form>
  
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'UpdateView',
  data() {
    return {
      article: null,
      content: null,
      rating: null,
    }
  },
  created() {
    this.getArticleDetail()
  },
  methods: {
    getArticleDetail() {
      console.log(this.$route.params.id)
      axios({
        method: 'GET',
        url: `${API_URL}/articles/${ this.$route.params.id }/`,
      })
      .then((res) => {
        console.log(res.data)
        this.article = res.data
        this.content = res.data.content
      })
      .catch((err) => {
        console.log(err)
      })
    },
    updateArticle() {
      // 감상평 수정
      const content = this.content
      const rating = this.rating * 2
  
      axios({
        method: 'PUT',
        url: `${API_URL}/articles/${ this.$route.params.id }/`,
        data: { content, rating },
        headers: {
          'Authorization': `Token ${this.$store.state.token}`
        }
      })
      .then((res) => {
        console.log(res)
        if (res.status === 205) {
          alert("이미 해당 영화의 감상평을 남기셨어요!")
        }
        this.$router.push({ name: 'ArticleView' })
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }
}
</script>

<style>
.page {
  background-color: rgb(38, 42, 86);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding-top: 50px;
}
</style>