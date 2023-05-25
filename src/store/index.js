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
    isLogin: false,
    // username: '',
    topRatedMovies: [],
    popularMovies: [],
    username: null,
    nickname: null,
    userId: null,

  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
  },
  mutations: {
    GET_RECOMMENDED_MOVIES(state, recommendedMovieList) {
      state.recommendedMovies = recommendedMovieList
    },
    GET_TOP_RATED_MOVIES(state, topRatedMovieList) {
      state.topRatedMovies = topRatedMovieList
    },
    GET_POPULAR_MOVIES(state, popularMovieList) {
      state.popularMovies = popularMovieList
    },
    GET_ARTICLES(state, articles) {
      state.articles = articles
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      state.isLogin = true
      router.push({name : 'ArticleView'}) // store/index.js $router 접근 불가 -> import를 해야함
    },
    LOGIN(state, data){
      state.username = data[0]
      state.userId = data[1]
    },
    LOGOUT(state) {
      state.token = null
      state.isLogin = false
      state.username = null
      state.nickname = null
    },
  },
  actions: {
    getRecommendedMovies(context) {
      const userId = this.state.userId
      console.log(userId)
      axios({
        method: 'get',
        url: `${API_URL}/movies/recommend/${userId}/`,
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
        .then((res) => {
        // console.log(res, context)
          context.commit('GET_RECOMMENDED_MOVIES', res.data)
        })
        .catch((err) => {
        console.log(err)
      })
    },
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
      let userId = null

      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username, password1, password2, 
        }
      })
      .then((res) => {
        context.commit('SAVE_TOKEN', res.data.key)
        router.push({name : 'UserDataInput'}) 
        axios({
          method: 'GET',
          url: `${API_URL}/accounts/test/get_user_id/`,
          headers: {
            Authorization: `Token ${ context.state.token }`
          }
        })
        .then((res) => {
          userId = res.data.user_id
          console.log('userid', userId)
          context.commit('LOGIN', [username, userId]);
        })
      })
      .catch(() => {
      alert('사용할 수 없는 아이디입니다.')
    })
    },
    login(context, payload) {
      const username = payload.username
      const password = payload.password
      let userId = null

      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
      .then((res) => {
        context.commit('SAVE_TOKEN', res.data.key);
        axios({
          method: 'GET',
          url: `${API_URL}/accounts/test/get_user_id/`,
          headers: {
            Authorization: `Token ${ context.state.token }`
          }
        })
        .then((res) => {
          userId = res.data.user_id
          console.log('userid', userId)
          context.commit('LOGIN', [username, userId]);
        })
      })
      .catch(() => {
        alert('올바른 아이디와 비밀번호를 입력하세요...')
        // 가능하면 password 지워주기
      })
    },
    updateUser(context, payload) {
      const username = context.state.username
      const nickname = payload.nickname
      const profile = payload.profile
      const profile_img = payload.profile_img
      console.log('여기는 store', username, nickname, profile_img)
      axios({
        method: 'put',
        url: `${API_URL}/accounts/test/update/${username}/`,
        data: {
          username, nickname, profile, profile_img
        },
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
      .then(() => {
        router.push({name : 'UserProfileView', params: {username: context.state.username}})
      })
      .catch((err) => {
        console.log(err)
      })
    },
  },
  modules: {
  }
})