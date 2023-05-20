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
    <!-- <p v-if="'student1' === article.username ">수정</p> -->
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
