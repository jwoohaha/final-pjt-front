import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/Movie/HomeView'
import SearchView from '@/views/Movie/SearchView'
import SearchRefreshView from '@/views/Movie/SearchRefreshView'
import MovieDetailView from '@/views/Movie/MovieDetailView'
import ArticleView from '@/views/Article/ArticleView'
import CreateView from '@/views/Article/CreateView'
import UpdateView from '@/views/Article/UpdateView'
import SignUpView from '@/views/Account/SignUpView'
import LogInView from '@/views/Account/LogInView'
import LogOutView from '@/views/Account/LogOutView'
import UserDataInput from '@/views/Account/UserDataInput'
import UserProfileView from '@/views/Account/UserProfileView'
import UpdateUserView from '@/views/Account/UpdateUserView'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'HomeView',
    component: HomeView
  },
  
  {
    path: '/search/:query',
    name: 'SearchView',
    component: SearchView,
  },

  {
    path: '/search/refresh/:query',
    name: 'SearchRefreshView',
    component: SearchRefreshView,
  },
  
  {
    path: '/movies/:id',
    name: 'MovieDetailView',
    component: MovieDetailView,
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
    path: '/userprofile/:username',
    name: 'UserProfileView',
    component: UserProfileView
  },

  {
    path: '/updateuser',
    name: 'UpdateUserView',
    component: UpdateUserView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
