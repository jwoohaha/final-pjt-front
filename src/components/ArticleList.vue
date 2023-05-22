<template>
  <div class="article-list">
    <ArticleListItem 
    v-for="article in articles" :key="article.id" :article="article"
    @deleteArticle="getArticles"
    />
  </div>
</template>

<script>
import ArticleListItem from '@/components/ArticleListItem'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ArticleList',
  components: {
    ArticleListItem,
  },
  data() {
    return {
      articles: null,
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      axios({
        method: 'get',
        url: `${API_URL}/articles/`,
      })
      .then((res) => {
        this.articles = res.data
      })
      .catch(() => {
        // 아티클이 없다면 (404)
        this.articles = []
      })
    },
  }
}
</script>

<style>
.article-list {
  text-align: start;
}
</style>
