<template>
  <div style="width: 500px;margin-top: 60px;margin-left: auto;margin-right: auto;">
    <div style="height: 20px"></div>
    <Side></Side>
    <router-view/>
  </div>
</template>

<script>
  import ImgUpload from '../common/ImgUpload'
  import myUpload from 'vue-image-crop-upload/upload-2.vue'
  import Side from './Side'
  export default {
    name: 'adminIndex',
    components: {Side, ImgUpload, myUpload},
    data () {
      return {
        formLabelWidth: '120px',
        url:'',
        show: false,
        params: {
        },
        headers: {
        },
        imgDataUrl: ''
      }
    },
    methods :{
      uploadImg () {
        this.url = this.$refs.imgUpload.url
      },
      getFollow() {
        this.$axios.get('/getFollow').then(resp=>{
          console.log(resp.data.data)
        }).catch(res=>{
          console.log('wrong')
        })
      },
      toggleShow() {
        this.show = !this.show;
      },
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl, field){
        console.log('-------- crop success --------');
        this.imgDataUrl = imgDataUrl;
        let datax = this.base64Tofile(imgDataUrl, field + ".png")
        let d = new FormData();
        d.append('img', datax)
        // let config = {headers : {'Con' : 'multipart/form-data'}}
        this.$axios.post('/covers',d)
          .then(resp=>{
            this.url = resp.data.data
            this.$message.warning('上传成功')
        }).catch(res=>{
          console.log(res)
          this.$message.warning('上传失败')
        })
      },
      /**
       * upload success
       *
       * [param] jsonData   服务器返回数据，已进行json转码
       * [param] field
       */
      cropUploadSuccess(jsonData, field){
        console.log('-------- upload success --------');
        console.log(jsonData);
        console.log('field: ' + field);
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field){
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      },
      base64Tofile(base64Str, fileName) {
        let arr = base64Str.split(','),
          mime = arr[0].match(/:(.*?);/)[1], //base64解析出来的图片类型
          bstr = atob(arr[1]), //对base64串进行操作，去掉url头，并转换为byte   atob为window内置方法
          len = bstr.length,
          ab = new ArrayBuffer(len), //将ASCII码小于0的转换为大于0
          u8arr = new Uint8Array(ab); //
        while (len--) {
          u8arr[len] = bstr.charCodeAt(len)
        }
        // 创建新的 File 对象实例[utf-8内容，文件名称或者路径，[可选参数，type：文件中的内容mime类型]]
        return new File([u8arr], fileName, {
          type: mime
        })
      }
    }
  }
</script>

<style scoped>

</style>
