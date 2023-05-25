<template>
  <div>
    <h1>영화 감상평 목록</h1>
    <hr>
    <ArticleList />
    <router-link :to="{ name: 'CreateView' }">새 감상평 작성</router-link>
    <hr>
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

</style>
