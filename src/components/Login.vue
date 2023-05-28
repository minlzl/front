<template>
<!--    <el-card>-->
<!--      用户名:<input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>-->
<!--      <br><br>-->
<!--      密码:<input type="password" v-model="loginForm.password" placeholder="请输入密码"/>-->
<!--      <br><br>-->
<!--      <button v-on:click="login">登录</button>-->
<!--    </el-card>-->
  <body id="poster">
    <el-form class="login-container" label-position="left" label-width="0px" >
      <h3 class="login-tital">用户登录</h3>
      <el-form-item >
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" ></el-input>
      </el-form-item>
      <el-form-item >
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button class="but" type="primary" style="width: 40%; border: none" v-on:click="login">
          登录
        </el-button>
        <el-button class="but" type="primary" style="width: 40%; border: none" v-on:click="register">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </body>

</template>

<script>
  /* eslint-disable */
  export default {
    name: 'Login',
    data(){
      return {
        loginForm:{
          username: 'liuzile',
          password: '444'
        },
        responseResult: [],
      }
    },
    methods:{
      login(){
        if(this.loginForm.username.trim() === ''||this.loginForm.password.trim() === '') {
          window.alert("请填写相关信息")
          return
        }
        let _this = this
        this.$axios.post('/login',{
          username: this.loginForm.username,
          password: this.loginForm.password
        }).then(successResponse=>{
          if(successResponse.data.code === 200){
            // this.$router.replace({path:'index'})
            _this.$store.commit('login',_this.loginForm)
            let path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/home': path})
          }else {
            window.alert("账户不存在或密码错误")
          }

        }).catch(failResponse=>{
          window.alert("服务器错误，请联系管理员" +
            "" +
            "")
        })
      },
      register(){
        this.$router.push('register')
      }
    }
  }
</script>

<style scoped>
  .login-container{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login-tital{
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login-button{
    width: 100%;
    background: #505458;
    border: none;
  }
  .but{
    background: #505458;
  }
  .but:hover {
    background: #3a8ee6;
  }
  #poster{
    /*background: url("../assets/wj-login.png") no-repeat;*/
    background-color: #a8cff4;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }

</style>
