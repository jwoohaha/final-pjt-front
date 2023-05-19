<template>
  <div>
    <h5>{{ article.id }}</h5>
    <p>작성자: {{ article.username }}</p>
    <p>{{ article.title }}</p>
    <router-link :to="{
      name: 'DetailView',
      params: { id: article.id }}">
      [DETAIL]
    </router-link>
    <!-- <p v-if="this.$store.state.loginuser === article.username ">수정</p> -->
    <hr>
  </div>
</template>

<script>
export default {
  name: 'ArticleListItem',
  props: {
    article: Object,
  },

}
</script>

<style>

</style>
