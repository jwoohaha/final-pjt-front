<template>
  <div class="page">
    <h1>로그인 페이지</h1>
    <br><br>
    <div>
      <form @submit.prevent="login" class="login-form">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">#</span>
          <input type="text" id="username" v-model="username" class="form-control" placeholder="아이디">
        </div>
        <div class="input-group mt-2 mb-3">
          <span class="input-group-text" id="basic-addon1">$</span>
          <input type="password" id="password" v-model="password" class="form-control" placeholder="패스워드">
        </div>
        <button type="submit" class="btn btn-success m-1">로그인</button>
      </form>
    </div>
    <div class="filler"></div>
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

.form-group {
  margin-bottom: 30px;
}

label {
  display: inline-block;
  width: 240px;
}


</style>