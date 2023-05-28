// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


// axios.defaults.baseURL = 'http://121.36.23.219:8443/api'
axios.defaults.baseURL = 'http://liuzile.com:8443/api'
axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(mavonEditor)

router.beforeEach((to,form,next) => {
    if(to.path === '/login' && form.path !== '/register') {
      axios.get('/authentication').then(resp =>{
        console.log(resp.data)
        if(resp.data && store.state.user.username) {
          console.log(25)
          next({
            path:'home',
            query:{
              redirect: to.fullPath
            }
          })
        }
        else
          console.log(34)
          next()
      })
    }
    if(to.meta.requireAuth) {
      if(store.state.user.username) {
        axios.get('/authentication').then(resp => {
          if(resp.data) {
            console.log(to.path)
            console.log(resp.data)
            next()
          }
          else {
            window.alert(store.state.user.username)
            next({
              path:"login",
              query:{
                redirect: to.fullPath
              }
            })
          }
        })
      } else {
        console.log(57)
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})
