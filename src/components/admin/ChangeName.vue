<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="原昵称：">
        <div style="float: left">{{$store.state.user.username}}</div>
      </el-form-item>
      <el-form-item label="修改后昵称：">
        <el-input v-model="name" style="width: 200px;margin-left: -200px "></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" style="float: left">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'ChangeName',
    data() {
      return {
        name:''
      }
    },
    methods:{
      submit() {
        if (this.name.trim() === ''){
          this.$message.warning('不能为空')
          return
        }
        this.$axios.post('/changeName',{
          name: this.name
        }).then(resp=>{
          if (resp.data.code === 400) {
            this.$message.error("昵称已存在,修改失败")
            return
          }
          this.$message.warning("修改成功")
          this.$store.commit('rename', resp.data.data)
        }).catch(res=>{
          window.alert(res)
        })
      }
    }
  }
</script>

<style scoped>

</style>
