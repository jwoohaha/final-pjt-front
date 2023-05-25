<template>
  <div class="word_color p-4">
    <h1>{{ article.movie_title }}</h1>
    <div class="star-ratings">
      <div class="star-ratings-fill space-x-2 text-lg" :style="{ width: ratingToPercent + '%' }">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
      <div class="star-ratings-base space-x-2 text-lg">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
    </div>
    <br>
    <h5>{{ article.content }}</h5>
    <br>
    <div>
      <p>작성자: {{ article.username }}</p>
      <p>작성시간: {{ formatDateTime(article.created_at) }}</p>
      <p>수정시간: {{ formatDateTime(article.updated_at) }}</p>
    </div>  
    <div v-if="this.$store.state.username === this.article.username">
      <button class="action-button btn btn-success" @click="goToUpdateView">수정</button>
      <button class="action-button btn btn-danger" @click="deleteArticle">삭제</button>
    </div>
    <hr>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ArticleListItem',
  props: {
    article: Object,
  },
  computed: {
    ratingToPercent() {
      // 별점 표시를 위한 연산
      return this.article.rating * 10
    },
  },
  methods: {
    goToUpdateView() {
      this.$router.push({ name: 'UpdateView', params: { id: this.article.id }})
    },
    deleteArticle() {
      const articleId = this.article.id; // 삭제할 게시글의 ID
      axios({
        method: 'DELETE',
        url: `${API_URL}/articles/${articleId}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
      .then(() => {
        // 게시글이 삭제되었으므로, 화면을 갱신하여 삭제된 게시글이 표시되지 않도록 합니다.
        this.$emit('deleteArticle');
      })
      .catch((error) => {
        console.log(error)
        alert('게시글 삭제 중에 오류가 발생했습니다.');
      });
    },
    formatDateTime(dateTime) {
      return moment(dateTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style>
.star-ratings {
  color: #ffffff; 
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: #2b2a29;
}
 
.star-ratings-fill {
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: gold;
}
 
.star-ratings-base {
  z-index: 0;
  padding: 0;
}

.action-button {
  margin-right: 10px;
}

.word_color{
  color:#ffffff;
}
</style>
