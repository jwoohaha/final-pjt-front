<template>
  <div class="page">
    <h1>회원가입 페이지</h1>
    <div>
      <br><br>
      <form @submit.prevent="signUp" class="signup-form">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">#</span>
          <input type="text" id="username" v-model="username" class="form-control" placeholder="아이디">
        </div>
        <div class="input-group mt-2 mb-3">
          <span class="input-group-text" id="basic-addon1">$</span>
          <input type="password" id="password1" v-model="password1" class="form-control" placeholder="패스워드">
        </div>
        <div class="input-group mt-2 mb-3">
          <span class="input-group-text" id="basic-addon1">$</span>
          <input type="password" id="password2" v-model="password2" class="form-control" placeholder="패스워드 확인">
        </div>
        <button type="submit" class="btn btn-success">회원가입</button>
      </form>
    </div>
    <div class="filler"></div>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
    }
  },
  methods: {
    signUp() {
      // console.log('signup')
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2
      // const nickname = this.nickname
      // console.log('여기는 가입페이지', nickname)

      const payload = {
        username, password1, password2
      }

      this.$store.dispatch('signUp', payload)

    }
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

.signup-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 50%;
}

.form-group {
  margin-bottom: 30px;
}

.filler {
  background-color: rgb(38, 42, 86);
  flex-grow: 1;
}
</style>
