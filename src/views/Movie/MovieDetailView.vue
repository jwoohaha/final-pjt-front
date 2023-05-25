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
        <div class="star-ratings">
          <div 
            class="star-ratings-fill space-x-2 text-lg"
            :style="{ width: ratingToPercent + '%' }"
          >
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <div class="star-ratings-base space-x-2 text-lg">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
        </div>
        <p>장르 : {{ movie?.genres }}</p>
        <p>{{ movie?.overview }}</p>
      </div>
    </div>

    <div class="article-list">
      <h3>감상평 남기기</h3>
      <div class="star-rating space-x-4">
        <input type="radio" id="5-stars" name="rating" value="5" v-model="rating"/>
        <label for="5-stars" class="star pr-4">★</label>
        <input type="radio" id="4-stars" name="rating" value="4" v-model="rating"/>
        <label for="4-stars" class="star">★</label>
        <input type="radio" id="3-stars" name="rating" value="3" v-model="rating"/>
        <label for="3-stars" class="star">★</label>
        <input type="radio" id="2-stars" name="rating" value="2" v-model="rating"/>
        <label for="2-stars" class="star">★</label>
        <input type="radio" id="1-star" name="rating" value="1" v-model="rating" />
        <label for="1-star" class="star">★</label>
      </div>
      <div class="article-create">
        <form @submit.prevent="createArticle">
          <textarea id="content" cols="100" rows="3" v-model="content"></textarea><br>
          <input type="submit" id="submit">
        </form>
      </div>
      <h3>감상평 목록</h3>
      <ArticleListItem 
        v-for="article in articles" :key="article.id" :article="article" 
        @deleteArticle="getMovieArticles"
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
      content: null,
      rating: null,
    }
  },
  created() {
    this.getMovieDetail()
    this.getMovieArticles()
  },
  computed: {
    ratingToPercent() {
      // 별점 표시를 위한 연산
      const score = this.movie.vote_average * 10;
      return score;
    },
    flag() {
      // 이미 감상평을 남겼는지 확인
      if (this.articles){
        for (const article of this.articles) {
          if (article.username === this.$store.state.username) {
            return true
          }
        }
      }
      return false
    }
  },
  methods: {
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${ this.$route.params.id }/`,
      })
      .then((res) => {
        this.movie = res.data
        if (res.data.overview.length > 150) {
          this.summary = res.data.overview.substring(0, 150) + '...'
        } else {
          this.summary = res.data.overview
        }
        let genres = ''
        for (let genre of res.data.genres){
          genres += genre.name + ' '
        }
        this.movie.genres = genres
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getMovieArticles() {
      axios({
        method: 'GET',
        url: `${API_URL}/articles/movie_articles/${ this.$route.params.id }/`,
        headers: {
          'Authorization': `Token ${this.$store.state.token}`
        }
      })
      .then((res) => {
        this.articles = res.data
      })
      .catch(() => {
        // 아티클이 없다면 (404)
        this.articles = []
      })
    },
    createArticle() {
      // 감상평을 작성
      const content = this.content
      const rating = this.rating * 2

      if (this.flag) {
        alert('이미 평을 작성하셨네요!')
        return
      }
      if (!this.$store.state.isLogin){
        alert('비회원은 작성할 수 없습니다. 로그인 해주세요!')
        this.$router.push({ name: 'LogInView' })
      }
      axios({
        method: 'post',
        url: `${API_URL}/articles/movie_articles/${ this.$route.params.id }/`,
        data: { content, rating },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
      .then(() => {
        this.getMovieArticles()
      })
      .catch((err) => {
        console.log(err)
      })
    },
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
  transform: translate(-20%, -50%);
  width: 100%;
  color: white;
  text-align: left;
}

.backdrop-text > p {
  width: 30%;
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

.star-rating {
  display: flex;
  flex-direction: row-reverse;
  font-size: 2.25rem;
  line-height: 2.5rem;
  justify-content: space-around;
  padding: 0 0.2em;
  text-align: center;
  width: 5em;
}
 
.star-rating input {
  display: none;
}
 
.star-rating label {
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 2.3px;
  -webkit-text-stroke-color: #2b2a29;
  cursor: pointer;
}
 
.star-rating :checked ~ label {
  -webkit-text-fill-color: gold;
}
 
.star-rating label:hover,
.star-rating label:hover ~ label {
  -webkit-text-fill-color: #fff58c;
}

.star-ratings {
  color: #aaa9a9; 
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: #2b2a29;
}
 
.star-ratings-fill {
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: gold;
}
 
.star-ratings-base {
  z-index: 0;
  padding: 0;
}
</style>