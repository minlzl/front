<template>
    <div class="main">
      <nav-menu></nav-menu>
      <router-view ></router-view>
    </div>
</template>

<script>
  import NavMenu from './common/NavMenu'
  export default {
    name: 'Home',
    components: {NavMenu}
  }
</script>

<style scoped>
  .main{
    /*background: url("../assets/wj-login.png") no-repeat;*/
    /*background-position: center;*/
    background-color: #a8cff4;
    background-size: 100%;
    background-attachment: fixed;
    min-height: calc(100vh - 60px);
  }
</style>
