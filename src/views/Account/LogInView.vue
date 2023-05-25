<template>
  <div class="page">
    <h1>로그인 페이지</h1>
    <div class="centered-content">
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username">아이디 :</label>
          <input type="text" id="username" v-model="username">
        </div>

        <div class="form-group">
          <label for="password">비밀번호 :</label>
          <input type="password" id="password" v-model="password">
        </div>

        <input type="submit" value="logIn">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogInView',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    login() {
      const username = this.username
      const password = this.password

      const payload = {
        username, password
      }
      this.$store.dispatch('login', payload)

    },
  }
}
</script>

<style>
.page {
  background-color: rgb(38, 42, 86);
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
}

.form-group {
  margin-bottom: 30px;
}

label {
  display: inline-block;
  width: 240px;
}


</style>