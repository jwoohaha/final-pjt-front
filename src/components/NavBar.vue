<template>
  <div>
    <nav class="navbar fixed-top">
      <img src="@/assets/logo.png" class="logo" />
      <div class="nav-links">
        <router-link :to="{ name: 'HomeView' }">홈</router-link> | 
        <router-link :to="{ name: 'ArticleView' }">커뮤니티</router-link> | 
        <input type="text" id="title" v-model.trim="query"
          @keyup.enter.prevent="search"> | 
        <p v-if="this.$store.getters.isLogin">
          <router-link :to="{ name: 'UserProfileView' }">사용자 프로필</router-link> | 
          <router-link :to="{ name: 'LogOutView' }">로그아웃</router-link>
        </p>
        <p v-else>
          <router-link :to="{ name: 'SignUpView' }">회원가입</router-link> | 
          <router-link :to="{ name: 'LogInView' }">로그인</router-link>
        </p>
      </div>
    </nav>

    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>


export default {
  name: 'NavBar',
  data() {
    return {
      query: null,
    }
  },
  methods: {
    search() {
      this.$router.push(`/search/${this.query}`)
    }
  }
}

</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
}

.logo {
  height: 30px;
  width: 30px;
  margin-right: 10px;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-links p {
  margin: 0;
}

.nav-links a {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 10px;
}

.nav-links a.router-link-exact-active {
  color: #42b983;
}

.main-content {
  margin-top: 70px; /* navbar의 높이에 따라 조절 */
  padding: 30px;
}
</style>