import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)
const API_URL = 'http://127.0.0.1:8000'
const TMDB_API_URL = 'https://api.themoviedb.org/3/trending/movie/week?'

export default new Vuex.Store({
  state: {
    topRatedMovies: [],
    trendingMovies: []
  },
  getters: {
  },
  mutations: {
    GET_TOP_RATED_MOVIES(state, movies) {
      state.topRatedMovies = movies
    },
    GET_TRENDING_MOVIES(state, trendingMovieList) {
      state.trendingMovies = trendingMovieList
    }
  },
  actions: {
    getTopRatedMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/rating_top20/`,
      })
        .then((res) => {
        // console.log(res, context)
          context.commit('GET_TOP_RATED_MOVIES', res.data)
        })
        .catch((err) => {
        console.log(err)
      })
    },
    getTrendingMovies(context) {
      axios({
        method: 'get',
        url: TMDB_API_URL,
        params: {
        'api_key': process.env.VUE_APP_TMDB_API_KEY
        }
      })
      .then((response) => {
        const trendingMovieList = response.data.results
        context.commit('GET_TRENDING_MOVIES', trendingMovieList)
      })
      
    },
  },
  modules: {
  }
})
