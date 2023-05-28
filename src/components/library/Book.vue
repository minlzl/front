<template>
  <div>
    <NavMenu></NavMenu>
<!--    <span>{{id}}</span> /-->
<!--    <span>{{book.date}}</span> /-->
<!--    <span>{{book.press}}</span>-->
  </div>
</template>

<script>
  import NavMenu from '../common/NavMenu'
  export default {
    name: 'Book',
    components: {NavMenu},
    data() {
      return {
        id:'',
        book:{}
      }
    },
    mounted () {
      this.id=this.$route.query.id;
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
