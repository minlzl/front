<template>
  <div style="margin-top: 40px">
    <div style="position: fixed;right: 80px;top: 100px;float: right">
      <el-button @click="gotoEdit">
          添加文章
      </el-button>
    </div>
    <div class="articles-area">
      <div style="height: 15px"></div>
      <el-card style="text-align: center;opacity: 0.9;margin-top: 60px">
        <div style="height: 20px"></div>
        <div v-for="article in articles" :key="article.id">
          <div style="float: left;width: 85%;height: 150px">
            <router-link class="article-link" :to="{path:'jotter/article', query:{id:article.id}}">
              <span style="font-size: 20px"><strong>{{article.articleTitle}}</strong></span>
            </router-link>
            <el-divider content-position="left">{{article.articleDate}}</el-divider>
            <router-link class="article-link" :to="{path:'jotter/article', query: {id:article.id}}">
              <p>{{article.articleAbstract}}</p>
            </router-link>
          </div>
          <el-image
            style="margin: 18px 0 0 30px;width: 100px;height: 100px"
            :src="article.articleCover"
            fit="cover"></el-image>
          <el-divider></el-divider>
        </div>
      </el-card>
    </div>
    <el-pagination
      style="margin-top: 30px;float: bottom"
      background
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'jotter',
    data() {
      return {
        articles:[],
        pageSize: 3,
        total:3
      }
    },
    mounted () {
      this.loadArticles()
    },
    methods:{
      gotoEdit() {
        this.$router.push('/editJotter')
      },
      loadArticles() {
        let that = this
        this.$axios.get('/article/'+this.pageSize+'/1').then(resp =>{
          if(resp && resp.status === 200) {
            that.articles = resp.data.content
            that.total = resp.data.totalElements
          }
        }).catch(res=>{
          window.alert("服务器错误，请联系管理员")
        })
      },
      handleCurrentChange(page) {
        let that = this
        this.$axios.get('/article/'+this.pageSize+'/'+page).then(resp=>{
          if(resp && resp.status === 200) {
            that.articles = resp.data.content
            that.total = resp.data.totalElements
          }
        }).catch(res=>{
          window.alert("服务器错误，请联系管理员")
        })
      }
    }
  }
</script>

<style scoped>
  .articles-area{
    width: 990px;
    margin-left: auto;
    margin-right: auto;
  }
  .article-link{
    text-decoration: none;
    color: #6a737d;
    text-align: left;
  }
  .article-link:hover{
    color: #409eff;
  }
  a{
    text-align: left;
  }
</style>
