<template>
  <div class="wrapper">

    <div class="backdrop">
      <div class="backdrop-img">
        <img :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`" alt="">
      </div>
      <div class="backdrop-text">
        <h1>{{movie.title}}</h1>
        <p>{{ summary }}</p>
      </div>
    </div>

    <div class="detail">
      <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`">
      <div class="content">
        <h1>{{ movie?.title }}</h1>
        <p>개봉일: {{ movie?.release_date }}</p>
        <p>평점: {{ movie?.vote_average }}</p>
        <p>장르 : {{ movie?.genres }}</p>
        <p>{{ movie?.overview }}</p>
      </div>
    </div>

    <div class="article-list">
      <h3>Article List</h3>
      <ArticleListItem 
        v-for="article in articles" :key="article.id" :article="article"
      />
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import ArticleListItem from '@/components/ArticleListItem.vue'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MovieDetailView',
  components: {
    ArticleListItem,
  },
  data() {
    return {
      movie: null,
      summary: null,
      articles: null,
    }
  },
  created() {
    this.getMovieDetail()
    this.getMovieArticles()
  },
  methods: {
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${ this.$route.params.id }/`,
      })
      .then((res) => {
        this.movie = res.data
        if (res.data.overview.length > 200) {
          this.summary = res.data.overview.substring(0, 200) + '...'
        }
        let genres = ''
        for (let genre of res.data.genres){
          genres += genre.name + ' '
        }
        console.log(genres)
        this.movie.genres = genres
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getMovieArticles() {
      console.log(this.$route.params.id)
      axios({
        method: 'get',
        url: `${API_URL}/articles/movie_articles/${ this.$route.params.id }/`,
      })
      .then((res) => {
        console.log(res.data)
        this.articles = res.data
      })
    }
  }
}
</script>

<style>
.wrapper {
  margin: 10px;
  padding: 20px;
}

.backdrop {
  width: 100%;
  margin: 10px auto;
  position: relative;
}

.backdrop img {
  width: 100%;
  height: auto;
}

.backdrop-text{
  position: absolute;
  top: 60%;
  left: 25%;
  transform: translate(-50%, -50%);
  width: 30%;
  color: white;
  text-align: left;
}

.detail {
  display: flex;
  justify-content: space-between;
}

.detail img {
  width: 40%;
  height: auto;
}

.content {
  margin: 10px;
  padding: 10px;
  text-align: left;
  font-size: 1.5em;
}
</style>