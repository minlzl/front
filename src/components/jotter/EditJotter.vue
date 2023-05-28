<template>
    <div class="jotter">
      <nav-menu></nav-menu>
      <el-row style="margin: 18px 0 0 18px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <h2 style="text-align: left">编辑器</h2>
        </el-breadcrumb>
      </el-row>
      <div style="margin-top: 60px;margin-right: 20%;margin-left: 20%;opacity: 0.8">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form ref="editForm" status-icon :model="article"  label-width="40px">
              <el-form-item label="标题" prop="title">
                <el-input v-model="article.articleTitle"></el-input>
              </el-form-item>
              <el-form-item label="摘要" prop="description">
                <el-input type="textarea" v-model="article.articleAbstract" autosize></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
          </el-col>
        </el-row>
        <el-row style="width: 90%;margin: 10px auto 50px;">
          <mavon-editor v-model="article.articleContentMd"
                        style="height: 100%;"
                        ref="md"
                        @save="saveArticle"
                        @imgAdd="imgAdd">
            <button type="button" class="el-icon-document op-icon"
                    :title="'摘要/封面'" slot="left-toolbar-after"
                    @click="dialogVisible = true"></button>
          </mavon-editor>
        </el-row>
      </div>
      <div style="position: fixed;right: 70px;bottom: 80px">
        <el-button @click="save">发布</el-button>
      </div>
    </div>
</template>

<script>
  import ImgUpload from '../common/ImgUpload'
  import NavMenu from '../common/NavMenu'

  export default {
    name: 'EditJotter',
    components: {NavMenu, ImgUpload},
    data(){
      return {
        article:{},
        dialogVisible: false
      }
    },
    mounted () {
      if(this.$route.params.article) {
        this.article = this.$route.params.article
      }
    },
    methods:{
      saveArticle(value,render) {
        console.log({
          id:this.article.id,
          articleTitle: this.article.articleTitle,
          articleContentMd: value,
          articleContentHtml: render,
          articleAbstract: this.article.articleAbstract,
          articleCover: this.article.articleCover,
          articleDate: this.article.articleDate
        })

        let that = this
        this.$confirm('是否保存并发布文章？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          that.dialogVisible = false
          this.$axios.post('/save/article', {
            id:this.article.id,
            articleTitle: this.article.articleTitle,
            articleContentMd: value,
            articleContentHtml: render,
            articleAbstract: this.article.articleAbstract,
            articleCover: this.article.articleCover,
            articleDate: this.article.articleDate
          }).then(resp=>{
            if(resp && resp.status === 200) {
              this.$message({
                type:'info',
                message:'已保存成功'
              })
            }
          })
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'已取消发布'
          })
        })
      },
      uploadImg () {
        this.article.articleCover = this.$refs.imgUpload.url
        console.log(this.article.articleCover)
      },
      save() {
        // this.dialogVisible = false
        // this.$emit("save")
        this.saveArticle(this.$refs.md.d_value, this.$refs.md.d_render)
        // this.$set(this.article, "articleContentHtml", this.$refs.md.d_render); // html
        // this.$set(this.article, "articleContentMd", this.$refs.md.d_value); //md
        // console.log(this.article)
      },
      imgAdd(name, $file) {
        // 第一步.将图片上传到服务器.
        let formData = new FormData();
        formData.append('file', $file);

        this.$axios({
          url: 'http://liuzile.com:8443/api/upload',
          method: 'post',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then(resp => {
          let url = resp.data.data
          console.log(url)
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          this.$refs.md.$img2Url(name, url);
        })
      }
    }
  }
</script>

<style scoped>
  .jotter{

    /*background: url("../../assets/wj-login.png") no-repeat;*/
    /*background-position: center;*/
    background-color: #a8cff4;
    background-size: 100%;
    background-attachment: fixed;
    min-height: calc(100vh);
  }

</style>
