<template>
    <el-container >
      <div style="height: 20px"></div>
      <el-aside style="width: 200px ; margin-top: 20px">
        <switch></switch>
        <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>
      </el-aside>
      <el-main style="opacity: 0.9">
        <books class="books-area" ref="booksArea"></books>
      </el-main>
    </el-container>
</template>

<script>
  import SideMenu from './SideMenu'
  import Books from '../common/Books'
  export default {
    name: 'LibraryIndex',
    components: {Books, SideMenu},
    methods:{
      listByCategory() {
        var that = this;
        var cid = this.$refs.sideMenu.cid;
        var url = 'categories/' + cid + '/books';
        this.$axios.get(url).then(resp=>{
          if(resp && resp.status === 200) {
            that.$refs.booksArea.books = resp.data
          }
        })
      }
    }
  }
</script>

<style scoped>
  .books-area{
    width: 990px;
    margin-left: auto;
    margin-right: auto;
  }
  .el-container{
    height: auto;
  }
</style>
