<template>
  <div class="wrapper">
    <div class="d-flex justify-content-between">
        <h1>영화 감상평 목록</h1>
        <router-link :to="{ name: 'CreateView' }">
          <button class="btn btn-success">감상평 작성</button>
        </router-link>
    </div>
    <hr>
    <ArticleList />
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'

export default {
  name: 'ArticleView',
  components: {
    ArticleList,
  },
  computed:{
    isLogin() {
      return this.$store.getters.isLogin // 로그인 여부
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      if (this.isLogin) {
        this.$store.dispatch('getArticles')
      } else {
        alert('로그인이 필요한 페이지입니다...')
        this.$router.push({ name: 'LogInView' })
      }
    }
  }
}
</script>

<style>
.wrapper{
  color:white;
  text-align: left
}
</style>
