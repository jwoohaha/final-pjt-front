import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleView from '@/views/ArticleView'
import CreateView from '@/views/CreateView'
import UpdateView from '@/views/UpdateView'
import DetailView from '@/views/DetailView'
import SearchRefreshView from '@/views/SearchRefreshView'
import SearchView from '@/views/SearchView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import LogOutView from '@/views/LogOutView'
import HomeView from '@/views/HomeView'
import MovieDetailView from '@/views/MovieDetailView'
import UserDataInput from '@/views/UserDataInput'
import UserProfileView from '@/views/UserProfileView'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LogOutView',
    component: LogOutView,
  },

  {
    path: '/community',
    name: 'ArticleView',
    component: ArticleView
  },
 
  {
    path: '/create',
    name: 'CreateView',
    component: CreateView
  },
  
  {
    path: '/update/:id',
    name: 'UpdateView',
    component: UpdateView
  },

  {
    path: '/home',
    name: 'HomeView',
    component: HomeView
  },

  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },

  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },

  {
    path: '/logout',
    name: 'LogOutView',
    component: LogOutView
  },

  {
    path: '/userdatainput',
    name:'UserDataInput',
    component: UserDataInput
  },

  {
    path: '/userprofile',
    name: 'UserProfileView',
    component: UserProfileView
  },

  {
    path: '/:id',
    name: 'DetailView',
    component: DetailView,
  },

  {
    path: '/movies/:id',
    name: 'MovieDetailView',
    component: MovieDetailView,
  },
  
  {
    path: '/search/refresh/:query',
    name: 'SearchRefreshView',
    component: SearchRefreshView,
  },

  {
    path: '/search/:query',
    name: 'SearchView',
    component: SearchView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const isLogin = !!window.$cookies.isKey('auth-token')
// })

export default router
