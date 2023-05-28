<template >
    <div id="hhh" style="margin-top: 60px">
      <div style="height: 20px;"></div>
      <el-card style="text-align: left;width: 990px;margin: 35px auto 0 auto;opacity: 0.8">
        <div>
          <span style="font-size: 20px"><strong>{{article.articleTitle}}</strong></span>
            <el-divider content-position="left">{{article.articleDate}}</el-divider>
            <div class="markdown-body">
              <div v-html="article.articleContentHtml"></div>
            </div>
        </div>
      </el-card>
      <div style="position: fixed;bottom: 100px;right: 80px">
        <a href="#hhh">
          <el-button>
            返回顶部
          </el-button>
        </a>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'ArticleDetail',
    data(){
      return {
        article:[]
      }
    },
    mounted () {
      this.loadArticle()
    },
    methods:{
      loadArticle() {
        let that = this;
        this.$axios.get('/article/'+this.$route.query.id).then(resp=>{
          if(resp && resp.status ===200) {
            that.article=resp.data
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../styles/markdown.css";
</style>
