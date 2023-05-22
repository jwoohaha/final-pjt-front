<template>
  <div v-if="user" class="mt-15vh text-center">
    <h1>{{ user.nickname }} 님</h1>
    <v-divider class="my-5 user-detail-divider"></v-divider>
    <h2>{{ numOfFollowers }} followers</h2>
    <h2>ID: {{ user.username }}</h2>
    <h2>nickname: {{ user.nickname }}</h2>
    <h2>가입일자: {{ dateJoined }}</h2>
    <h2>마지막 로그인: {{ lastLogin }}</h2>
    <v-btn @click="moveToLink(passwordChangeRoute)" class="font-weight-bold">비밀번호 변경</v-btn>
    <v-btn @click="deleteUser" color="red darken-3" class="ml-5 font-weight-bold">계정삭제</v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "UserDetail",
  props: {
    user: Object
  },
  methods: {
    ...mapActions('accounts', ['deleteUser']),
    ...mapActions('navbar', ['moveToLink']),
    changeDateForm(date) {
      const year = date.slice(0, 4);
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      return `${year}년 ${month}월 ${day}일`;
    }
  },
};
</script>