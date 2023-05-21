import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '../router'


const API_URL = 'http://127.0.0.1:8000'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    articles: [
    ],
    token: null,
    // isLogin: false,
    topRatedMovies: [],
    popularMovies: []
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    }
  },
  mutations: {
    GET_TOP_RATED_MOVIES(state, topRatedMovieList) {
      state.topRatedMovies = topRatedMovieList
    },
    GET_POPULAR_MOVIES(state, popularMovieList) {
      state.popularMovies = popularMovieList
    },
    GET_ARTICLES(state, articles) {
      state.articles = articles
    },
    // signup & login -> 완료하면 토큰 발급
    SAVE_TOKEN(state, token) {
      state.token = token
      state.isLogin = true
      router.push({name : 'ArticleView'}) // store/index.js $router 접근 불가 -> import를 해야함
    },
    LOGOUT(state) {
      state.token = null
      state.isLogin = false
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
    getPopularMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/popular/`,
      })
      .then((res) => {
        const popularMovieList = res.data
        context.commit('GET_POPULAR_MOVIES', popularMovieList)
      })
      
    },
    getArticles(context) {
      axios({
        method: 'get',
        url: `${API_URL}/articles/`,
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
        .then((res) => {
          context.commit('GET_ARTICLES', res.data)
        })
        .catch((err) => {
        console.log(err)
      })
    },
    signUp(context, payload) {
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2

      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username, password1, password2
        }
      })
        .then((res) => {
          context.commit('SAVE_TOKEN', res.data.key)
        })
        .catch((err) => {
        console.log(err)
      })
    },
    login(context, payload) {
      const username = payload.username
      const password = payload.password

      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
        .then((res) => {
        context.commit('SAVE_TOKEN', res.data.key)
        })
      .catch(() => {
        alert('올바른 아이디와 비밀번호를 입력하세요...')
        // 가능하면 password 지워주기
      })
    },
  },
  modules: {
  }
})
