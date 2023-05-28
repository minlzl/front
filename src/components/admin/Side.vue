<template>
    <div
      style="margin-left: -200px;width: 120px;float: left;height: 0">
      <el-menu
        :default-active="'/admin/changeName'"
        router
        background-color="white"
        text-color="#222">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" >
          {{item.navItem}}
        </el-menu-item>
      </el-menu>
    </div>
</template>

<script>
  export default {
    name: 'Side',
    data() {
      return{
        navList:[
          {name: '/admin/changeName',navItem: '修改昵称'},
          {name: '/admin/changeImage',navItem: '修改头像'},
          {name: '/admin/talkAdmin',navItem: '动态管理'},
          {name: '/admin/jotterAdmin',navItem: '笔记本管理'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
