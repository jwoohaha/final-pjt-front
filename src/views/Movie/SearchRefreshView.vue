<template lang="">
  <div>
    
  </div>
</template>
<script>
export default {
  name: 'SearchRefreshView',
  methods: {
    search() {
      this.$router.push(`/search/${this.$route.params.query}`)
    }
  },
  created() {
    this.search()
  }
}

</script>
<style lang="">
  
</style>