<template>
  <div>
    <h1>프로필 사진 선택</h1>
    <div class="image-list">
      <div v-for="image in images" :key="image.id" class="image-item">
        <img :src="getImagePath(image.filename)" :alt="image.name" class="image" @click="updateImg(image)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectImageView',
  data() {
    return {
      images: [
        { id: 1, name: '1.png', filename: '1.png' },
        { id: 2, name: '2.png', filename: '2.png' },
      ],
      selectedImage: null
    }
  },
  methods: {
    updateImg(image) { 
      const img = image 

      const payload = {
        img
      }
      console.log(img)
      this.$store.dispatch('updateImg', payload)

    },
    getImagePath(filename) {
      return require(`@/assets/${filename}`)
    }
  }
}
</script>

<style scoped>
.image-list {
  display: flex;
  flex-wrap: wrap;
}

.image-item {
  margin: 10px;
  cursor: pointer;
}

.image {
  width: 200px; 
  height: auto; 
}
</style>
