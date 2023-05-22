<template>
  <div>
    <h5>{{ article.content }}</h5>
    <p>평점: {{ article.rating }}</p>
    <p>작성자: {{ article.username }}</p>
    <router-link :to="{
      name: 'DetailView',
      params: { id: article.id }}">
      [DETAIL]
    </router-link>
    <p v-if="this.$store.state.username === this.article.username">
      <button @click="updateArticle">수정</button>
      <button @click="deleteArticle">삭제</button>
    </p>
    <hr>
  </div>
</template>

<script>
import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ArticleListItem',
  props: {
    article: Object,
  },
  methods: {
    updateArticle() {
      // 수정 버튼이 클릭되었을 때 실행될 로직을 작성하세요.
    },
    deleteArticle() {
      const articleId = this.article.id; // 삭제할 게시글의 ID
      axios.delete(`${API_URL}/articles/${articleId}/`)
        .then(() => {
          // 게시글이 삭제되었으므로, 화면을 갱신하여 삭제된 게시글이 표시되지 않도록 합니다.
          // this.$emit('articleDeleted', articleId);
          alert('게시글이 삭제됩니다');
        })
        .catch((error) => {
          console.log(error)
          alert('게시글 삭제 중에 오류가 발생했습니다.');
        });
    }
  }
}
</script>

<style>

</style>