<template>
  <div>
  </div>
</template>

<script>
export default {
   name: 'LogoutView',

   methods: {
    logout(){
      this.$store.commit('LOGOUT')
      window.localStorage.removeItem('vuex')
      this.$router.push({ name: 'HomeView' })
    }
   },
   created() {
    this.logout()
   },
}
</script>

<style>

</style>