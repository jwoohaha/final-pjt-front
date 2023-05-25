<template>
  <div>
    <nav class="navbar fixed-top">
      <router-link :to="{ name: 'HomeView' }">
        <img src="@/assets/logo.png" class="logo"/>
      </router-link>
      <div class="left-links">
        <router-link :to="{ name: 'HomeView' }" class="no-underline">홈</router-link>
        <router-link :to="{ name: 'ArticleView' }" class="no-underline">커뮤니티</router-link>
      </div>
      
      
      
      <div class="right-links">
        <div class="account">
          <p v-if="this.$store.getters.isLogin">
            <router-link 
              :to="{ name: 'UserProfileView', params: {username: this.$store.state.username} } "
              class="no-underline">프로필</router-link>
            <router-link :to="{ name: 'LogOutView' }" class="no-underline">로그아웃</router-link>
          </p>
          <p v-else>
            <router-link :to="{ name: 'SignUpView' }" class="no-underline">회원가입</router-link>
            <router-link :to="{ name: 'LogInView' }" class="no-underline">로그인</router-link>
          </p>
        </div>
          <input v-show="searchActive" type="text" id="title" v-model.trim="query" @keyup.enter.prevent="searchRefresh" />
          <img src="@/assets/close.png" @click="toggleSearch" class="close-icon"/>
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
      searchActive: false,
    }
  },
  methods: {
    // 동일 페이지 새로고침 문제 해결
    // navbar -> searchRefresh -> search
    searchRefresh() {
      this.$router.push(`/search/refresh/${this.query}`)
      this.query = null
    },
    toggleSearch() {
      if (this.searchActive === true) {
        this.searchActive = false
      } else {
        this.searchActive = true
      }
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
  height: 100px;
  width: 200px;
  margin-right: 10px;
  margin-left: 20px;
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
  font-size: 20px;
  font-family: 'Dovemayo_wild';
  font-weight: normal;
  font-style: normal;
}

.left-links a.router-link-exact-active {
  color: lightgreen;
}

.right-links {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.right-links p {
  margin: 0;
  margin-right: 20px;
}

.right-links a {
  color: #ffffff;
  margin-right: 10px;
  font-size: 20px;
  font-family: 'Dovemayo_wild';
  font-weight: normal;
  font-style: normal;
}

.right-links a.router-link-exact-active {
  color: lightgreen;
}

.right-links input {
  margin-right: 10px;
}

.close-icon {
  height: 30px;
  width: 30px;
  margin-left: auto;
  margin-right: 30px;
  cursor: pointer;
}

.main-content {
  margin-top: 100px;
  padding: 30px;
}

.no-underline {
  text-decoration: none;
}
</style>
