<template>
  <div id="app">
    <nav>
      <img src="./assets/logo.png" class="logo" />
      <router-link :to="{ name: 'HomeView' }">홈</router-link> | 
      <router-link :to="{ name: 'ArticleView' }">커뮤니티</router-link> | 
      <span v-show="this.$store.getters.isLogin">
        <router-link :to="{ name: 'LogOutView' }">로그아웃</router-link>
      </span>
      <span v-show="!$store.getters.isLogin">
        <router-link :to="{ name: 'SignUpView' }">회원가입</router-link> | 
        <router-link :to="{ name: 'LogInView' }">로그인</router-link>
      </span>
    </nav>
    <router-view/>
  </div>
</template>

<script>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
