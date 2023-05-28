<template>
  <div style="background-color: #a8cff4;min-height: calc(100vh - 60px);">
    <nav-menu>
    </nav-menu>
    <div style="margin-top: 60px">
      <div style="height: 20px"></div>
      <div style="width: 540px;margin-left: auto;margin-right: auto;margin-top: 40px;">
        <el-header>
          <h2>发布动态</h2>
        </el-header>
        <el-main>
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
          <div style="float: left;margin-top: 20px">
            <el-upload
              ref="upload"
              action="http://liuzile.com:8443/api/upload"
              list-type="picture-card"
              with-credentials
              multiple
              :limit="9"
              :on-preview="handlePictureCardPreview"
              :on-exceed="handleExceed"
              :on-success="handleSuccess"
              :on-remove="handleRemove">
              <i class="el-icon-plus" style="font-size:20px">图片上传</i>
            </el-upload>
<!--            <el-dialog :visible.sync="dialogVisible">-->
<!--              <img width="100%" :src="dialogImageUrl" alt="">-->
<!--            </el-dialog>-->
          </div>
<!--          <img-upload></img-upload>-->
          <div style="clear: both"></div>
          <div style="margin-top: 40px">
            <el-button type="info" @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </el-main>
      </div>
    </div>
  </div>
</template>

<script>
  import NavMenu from '../common/NavMenu'
  import ImgUpload from '../common/ImgUpload'
  export default {
    name: 'addTalk',
    components: {ImgUpload, NavMenu},
    data() {
      return {
        textarea: '',
        talk:{},
        dialogImageUrl: '',
        dialogVisible: false,
        urls:[]
      }
    },
    methods:{
      cancel(){
        this.$router.push('/talk')
      },
      submit(){
        let that = this
        this.$refs.upload.submit();
        console.log(this.urls.length)
        this.$axios.post('/subTalks',{
          content: this.textarea,
          imgs:this.urls
        }).then(resp => {
          that.$router.replace('/talk')
        }).catch(res=>{
          window.alert("服务器错误，请联系管理员")
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess (response, file, fileList) {
        console.log(response, file, fileList)
        this.urls.push(response.data)
        // // console.log(this.url)
        // this.$emit('onUpload')
        // this.$message.warning('上传成功')
        // window.alert('上传成功')
      },
      handleExceed() {
        this.$message.error("超过上传个数")
      }
    }
  }
</script>

<style scoped>

</style>
