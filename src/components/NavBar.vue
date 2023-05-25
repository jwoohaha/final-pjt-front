<template>
  <div>
    <nav class="navbar fixed-top">
      <img src="@/assets/logo.png" class="logo" />
      <div class="nav-links">
        <div class="left-links">
          <router-link :to="{ name: 'HomeView' }">홈</router-link>
          <router-link :to="{ name: 'ArticleView' }">커뮤니티</router-link>

          <p v-if="this.$store.getters.isLogin">
            <router-link :to="{ name: 'UserProfileView', params: {username: this.$store.state.username} }">사용자 프로필</router-link>
            <router-link :to="{ name: 'LogOutView' }">로그아웃</router-link>
          </p>
          <p v-else>
            <router-link :to="{ name: 'SignUpView' }">회원가입</router-link>
            <router-link :to="{ name: 'LogInView' }">로그인</router-link>
          </p>
        </div>
        <div class="right-links">
          <input type="text" id="title" v-model.trim="query" @keyup.enter.prevent="searchRefresh" />
          <img src="@/assets/close.png" class="close-icon" />
        </div>
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
    // 동일 페이지 새로고침 문제 해결
    // navbar -> searchRefresh -> search
    searchRefresh() {
      this.$router.push(`/search/refresh/${this.query}`)
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
  background-color: #000000;
  height: 100px;
}

.logo {
  height: 80px;
  width: 160px;
  margin-right: 10px;
}

.nav-links {
  display: flex;
  align-items: center;
}

.left-links {
  display: flex;
  align-items: center;
  margin-right: auto;
}

.left-links p {
  margin: 0;
  margin-right: 20px;
}

.left-links a {
  color: #ffffff;
  margin-right: 10px;
  font-size: 30px;
  font-family: 'Dovemayo_wild';
  font-weight: normal;
  font-style: normal;
}

.left-links a.router-link-exact-active {
  color: #B8621B;
}

.right-links {
  display: flex;
  align-items: center;
}

.right-links input {
  margin-right: 10px;
}

.close-icon {
  height: 60px;
  width: 60px;
  margin-left: auto;
  margin-right: 30px;
  cursor: pointer;
}

.main-content {
  margin-top: 100px;
  padding: 30px;
}
</style>
