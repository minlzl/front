import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Appindex from '../components/home/Appindex'
import Home from '../components/Home'
import LibraryIndex from '../components/library/LibraryIndex'
import Jotter from '../components/jotter/jotter'
import Book from '../components/library/Book'
import Register from '../components/Register'
import EditJotter from '../components/jotter/EditJotter'
import ArticleDetail from '../components/jotter/ArticleDetail'
import Talk from '../components/talks/talk'
import Admin from '../components/admin/adminIndex'
import AddTalk from '../components/talks/addTalk'
import SignalTalk from '../components/talks/signalTalk'
import Recommend from '../components/recommend/Recommend'
import ChangeName from '../components/admin/ChangeName'
import ChangeImage from '../components/admin/ChangeImage'
import TalkAdmin from '../components/admin/TalkAdmin'
import JotterAdmin from '../components/admin/JotterAdmin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/book',
      component: Book
    },
    {
      path: '/editJotter',
      component: EditJotter,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/addTalk',
      component: AddTalk,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/signalTalk',
      component: SignalTalk,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/home',
      component: Home,
      redirect: '/index',
      meta:{
        requireAuth: true
      },
      children: [
        {
          path: '/index',
          component:Appindex,
          meta:{
            requireAuth: true
          }
        },
        {
          path: '/library',
          component: LibraryIndex,
          meta:{
            requireAuth: true
          }
        },
        {
          path: '/jotter',
          component: Jotter,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/jotter/article',
          component: ArticleDetail
        },
        {
          path: '/talk',
          component: Talk,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin',
          component: Admin,
          redirect: '/admin/changeName',
          meta: {
            requireAuth: true
          },
          children:[
            {
              path: '/admin/changeName',
              component: ChangeName,
              meta:{
                requireAuth: true
              }
            },
            {
              path: '/admin/changeImage',
              component: ChangeImage,
              meta: {
                requireAuth: true
              }
            },
            {
              path: '/admin/talkAdmin',
              component: TalkAdmin,
              meta: {
                requireAuth: true
              }
            },
            {
              path: '/admin/jotterAdmin',
              component: JotterAdmin,
              meta: {
                requireAuth: true
              }
            }
          ]
        },
        {
          path: '/recommend',
          component: Recommend,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})
