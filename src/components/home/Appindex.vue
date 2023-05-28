<template>
    <div id="content">
      <div>
        <div style="width: 20px"></div>
        <el-input v-model="search" placeholder="find the world" @keyup.enter.native="submit" style="margin-top: 10px;box-shadow: 0 0 0 1px rgb(0 0 0 / 5%), 0 2px 4px 1px rgb(0 0 0 / 9%);opacity:0.8">
        </el-input>
        <el-button type="primary" icon="el-icon-search" style="float: right;margin-right: -120px;margin-top: 10px" @click="onSearch">搜索</el-button>
        <div style="clear: both"></div>
      </div>
      <div style="width: 1200px;margin-left: -300px;margin-right:-300px;margin-top:30px" v-for="i in 6" :key="i">
        <el-card id="card" style="height: 202.5px;width: 360px;float: left;margin-left: 30px;margin-top: 50px;" >
          <a href="http://www.bilibili.com" target="_blank">
            <el-image :src="url[i - 1]" ></el-image>
<!--            <el-image src = 'https://s3.bmp.ovh/imgs/2022/02/76f0a4b8d95442f1.jpg' fit="fill"/>-->
          </a>
        </el-card>
      </div>
<!--      <div style="clear: both">-->
<!--      </div>-->
    </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'Appindex',
    data() {
      return {
        talks:[],
        off:[],
        loved:[],
        search:'',
        url:[
          "https://img1.imgtp.com/2023/05/23/xVoBRKtX.jpg",
          "https://img1.imgtp.com/2023/05/23/Gy1p5LXQ.png",
          "https://img1.imgtp.com/2023/05/23/eiTNTQQq.png",
          "https://img1.imgtp.com/2023/05/23/Z2306Nif.png",
          "https://img1.imgtp.com/2023/05/23/Yyb5jQdI.png",
          "https://img1.imgtp.com/2023/05/23/g4MxPeLb.jpg"
        ]
      }
    },
    methods:{
      onSearch() {
        window.open('https://cn.bing.com/search?q='+this.search,'_blank');
      }
    }
  }
</script>

<style scoped>
  #content{
    width: 600px;
    /*border: 1px black solid;*/
    margin-right: auto;
    margin-left: auto;
    margin-top: 60px;
  }
  #card:hover{
    box-shadow: 0 0 0 3px rgb(0 0 1 / 5%), 0 2px 4px 10px rgb(0 0 0 / 16%);
  }
  /deep/ .el-card__body {
    padding: 0;
  }
  /deep/ .el-card {
    border: 0;
  }
</style>
