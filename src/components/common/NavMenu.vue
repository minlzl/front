<template>
  <el-menu
    :default-active="'/index'"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 100%;"
    class="nav">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{item.navItem}}
    </el-menu-item>
    <i class="el-icon-switch-button" v-on:click="logout" style="float:right;font-size: 40px;color: #222;padding: 10px"></i>
    <a href="#nowhere" style="color: #222222;float: right;padding: 20px">关于</a>
<!--    <i class="el-icon-menu" style="float: right;font-size: 23px;color: #222222;padding-top: 8px;margin-top: auto;margin-bottom: auto;line-height: 47px"></i>-->
<!--    <div style="float: right;margin: 10px;line-height: 41px">总访问次数: {{readerNumber}}</div>-->
<!--    <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">HelloWorld</span>-->
  </el-menu>
</template>

<script>
  export default {
    name: 'NavMenu',
    data () {
      return {
        readerNumber :0,
        navList:[
          {name: '/index',navItem: '首页'},
          {name: '/recommend',navItem: '推荐'},
          {name: '/talk',navItem: '动态'},
          {name: '/jotter',navItem: '笔记本'},
          {name: '/library',navItem: '图书馆'},
          {name: '/admin',navItem: '个人中心'}
        ]
      }
    },
    mounted () {
      // this.loadNumber();
    },
    methods: {
      logout() {
        let that = this
        this.$axios.get('/logout').then(resp => {
          if(resp&&resp.status===200) {
            that.$store.commit('logout')
            that.$router.replace('/login')
          } else {
            window.alert("退出失败");
          }
        })
      }
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  span{
    text-decoration: none;
  }
  .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }
  .nav{
    position: fixed;
    left:0px;
    top:0px;
    z-index: 99;
  }
</style>
