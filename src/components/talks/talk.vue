<template>
  <div class="main" >
    <div style="margin-top: 60px">
      <div style="height: 20px"></div>
      <div v-for="(talkVo,index) in talkVos" :key="talkVo.talk.talk_id" style="opacity:0.8">
        <div >
          <el-card  id="talk" style="width: 700px;margin-left: auto;margin-right: auto;margin-top: 30px;background-color: #f4f5f7">
            <el-avatar :size="50" :src="talkVo.imageLocation" style="float: left;margin-left: -15px"></el-avatar>
            <div style="text-align: left;margin-left: 40px;font-size: 28px;margin-top: 5px;">
              {{talkVo.userName}}
            </div>
            <div style="text-align: left;margin-left: 40px;font-size: 6px">
              {{talkVo.talk.publish_data}}
            </div>
            <div>
              <el-button @click="addFollow(talkVo.talk.user_id)" v-if="!show[index] && !self[index]" style="float: right;margin-right: 20px; margin-top: -40px;color: white;background-color: #3a8ee6">关注</el-button>
              <el-button @click="subFollow(talkVo.talk.user_id)" v-if="show[index] && !self[index]" style="float: right;margin-right: 20px; margin-top: -40px">已关注</el-button>
              <el-button @click="deleteTalk(talkVo.talk.talk_id)" v-if="self[index]" style="float: right;margin-right: 20px; margin-top: -40px" type="text">删除</el-button>
            </div>
            <div style="clear: both"></div>
            <div @click="toSignalTalk(talkVo.talk)" class="content" style="margin-top:5px;text-align:left;margin-left: 45px; white-space: pre-wrap;cursor: pointer">{{talkVo.talk.content}}</div>
            <div style="">
              <el-row :gutter="20">
                <div v-for="it in talkVo.imgs" :key="it" style="margin-left: 45px;margin-right: 45px;margin-top: 20px">
                  <el-col :span="8">
                    <el-image
                      :src="it"
                    fit="contain"
                    style="height: 128px;">
                    </el-image>
                  </el-col>
                </div>
              </el-row>
            </div>
            <div style="margin-top: 20px">
              <el-button icon="el-icon-star-off" @click="changeLove(index)" v-if="!off[index]" style="float: right;margin-bottom: 20px" type="text">
                {{talkVo.talk.love_number}}
              </el-button>
              <el-button icon="el-icon-star-on" @click="changeLove(index)" v-if="off[index]" style="float: right;color: #fc5050;margin-bottom: 20px" type="text">
                {{talkVo.talk.love_number}}
              </el-button>
              <el-button @click="toSignalTalk(talkVo.talk)" icon="el-icon-s-comment" style="float: right;margin-bottom: 20px;margin-right: 30px">
                {{talkVo.talk.comment_number}}
              </el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div style="height: 50px">
    </div>
    <div style="position: fixed;right: 80px;top: 100px;float: right" >
      <el-button @click="addTalk" >
        <div>发布动态</div>
      </el-button>
    </div>
  </div>
</template>

<script>
  import store from '../../store'

  export default {
    name: 'talk',
    data() {
      return {
        talks:[],
        off:[],
        loved:[],
        show:[],
        follow:[],
        talkVos:[],
        self:[],
        currentPage:1,
        pageSize: 3,
        bottom: false,
        imgUrls:[
          "https://img1.imgtp.com/2023/05/23/xVoBRKtX.jpg",
          "http://liuzile.com:8443/api/file/e9two76p.png",
          // "https://img1.imgtp.com/2023/05/23/Gy1p5LXQ.png",
          // "https://img1.imgtp.com/2023/05/23/eiTNTQQq.png",
          // "https://img1.imgtp.com/2023/05/23/Z2306Nif.png",
          // "https://img1.imgtp.com/2023/05/23/Yyb5jQdI.png",
          "https://img1.imgtp.com/2023/05/23/g4MxPeLb.jpg"]
      }
    },
    created () {
      window.addEventListener('scroll', this.lazyLoading);
    },
    destroyed () {
      window.removeEventListener('scroll', this.lazyLoading)
    },
    mounted () {
      this.currentPage = 1
      this.bottom = false
      this.loadLove()
      this.loadFollow()
      this.loadTalkVos()
    },
    methods:{
      addTalk(){
        this.$router.push('/addTalk')
      },
      loadLove(){
        let that = this
        this.$axios.get('/getLove').then(resp=>{
          that.loved = resp.data.data
        }).catch(res=>{
          alert('服务器错误，请联系管理员')
        })
      },
      loadFollow() {
        let that = this
        this.$axios.get('/getFollow').then(resp => {
          that.follow = resp.data.data
        }).catch(res => {
          // console.log(res)
        })
      },
      loadTalks() {
        let that = this
        this.$axios.get('/getTalks').then(resp=>{
          // console.log(resp.data)
          for(let i=0;i<resp.data.data.length;i++) {
            let number = Date.parse(resp.data.data[i].publish_data)
            let d = new Date(number)
            resp.data.data[i].publish_data = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()
          }
          that.talks=resp.data.data
          for(let i = 0; i < that.talks.length; i++) {
            let id = that.talks[i].talk_id
            if(that.loved.indexOf(id) !== -1) {
              that.off.push(true)
            }else {
              that.off.push(false)
            }
          }
          that.show = []
          this.self = []
          for (let i = 0; i < that.talks.length; i++) {
            let id = that.talks[i].user_id
            // console.log(id)
            if (that.follow.indexOf(id) !== -1) {
              that.show.push(true)
            } else {
              that.show.push(false)
            }
            console.log(that.show)
          }
        }).catch(res=>{
          window.alert("服务器错误，请联系管理员140")
        })
      },
      loadTalkVos() {
        this.$axios.get('/getTalkVos',{
          params:{
            currentPage:this.currentPage,
            pageSize:this.pageSize
          }
        }).then(
          resp=>{
          console.log(resp.data.data)
          let temp = resp.data.data
          for (let i = 0; i < temp.length; i++) {
            let number = Date.parse(temp[i].talk.publish_data)
            let d = new Date(number)
            temp[i].talk.publish_data = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()
          }
          this.talkVos = temp;
          for (let i = 0; i < this.talkVos.length; i++) {
            this.talks.push(this.talkVos[i].talk)
            let id = this.talkVos[i].talk.talk_id
            if (this.loved.indexOf(id) !== -1) {
              this.off.push(true)
            } else {
              this.off.push(false)
            }
          }
          this.show = []
          this.self = []
          for (let i = 0; i < this.talkVos.length; i++) {
            let id = this.talkVos[i].talk.user_id
            if (this.follow.indexOf(id) !== -1) {
              this.show.push(true)
            } else {
              this.show.push(false)
            }
            if (this.talkVos[i].userName !== this.$store.state.user.username) {
              this.self.push(false)
            } else {
              this.self.push(true)
            }
          }
          console.log(this.show)
        }).catch(res=>{
          window.alert(res)
        })
      },
      changeLove(a) {
        let change=!this.off[a]
        let that = this
        if(change) {
          this.talks[a].love_number++
          this.$axios.get('/addLove',{
            params:{
              id: that.talks[a].talk_id
            }
          })
        } else {
          this.talks[a].love_number--
          this.$axios.get('/subLove',{
            params:{
              id: that.talks[a].talk_id
            }
          })
        }
        this.$set(this.off, a, change)
      },
      toSignalTalk(talk) {
        this.$router.push({
          path :'/signalTalk',
          query:{id :talk.talk_id}
        })
      },
      addFollow(id) {
        let that = this
        this.follow.splice(this.follow.indexOf(id), 1)
        for (let i = 0; i < that.talks.length; i++) {
          let tid = that.talks[i].user_id
          if (tid === id) {
            this.$set(this.show, i, true)
          }
        }
        this.$axios.get('/addFollow/' + id).then(resp=>{
          this.$message({
            type:'info',
            message:'关注成功'
          })
        }).catch(res=>{
          window.alert("服务器错误，请联系管理员215")
        })
      },
      subFollow(id) {
        let that = this
        this.$axios.post('/subFollow/' + id).then(resp=>{
          this.follow.splice(this.follow.indexOf(id), 1)
          for (let i = 0; i < that.talks.length; i++) {
            let tid = that.talks[i].user_id
            if (tid === id) {
              this.$set(this.show, i, false)
            }
          }
          this.$message({
            type:'info',
            message:'取关成功'
          })
        }).catch(res=>{
          window.alert("服务器错误，请联系管理员223")
        })
      },
      deleteTalk(id) {
        this.$axios.get('/deleteById',{
          params:{
            id : id
          }
        }).then(resp=>{
          this.$message.success("删除成功")
          this.loadTalkVos()
        }).catch(res=>{
          console.log(res)
        })
      },
      lazyLoading () {
        if (this.bottom) {
          return
        }
        // 滚动到底部，再加载的处理事件
        // 获取 可视区高度`、`滚动高度`、`页面高度`
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight;
        if (scrollTop + clientHeight >= scrollHeight) { // 滚动到底部，逻辑代码
          this.currentPage += 1
          this.$axios.get('/getTalkVos',{
            params:{
              currentPage:this.currentPage,
              pageSize:this.pageSize
            }
          }).then(resp=>{
            if (resp.data.data.length === 0) {
              this.bottom = true
              return
            }
              let temp = resp.data.data
              for (let i = 0; i < temp.length; i++) {
                let number = Date.parse(temp[i].talk.publish_data)
                let d = new Date(number)
                temp[i].talk.publish_data = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()
              }
              temp.forEach(item=>{
                this.talkVos.push(item)
              })
              console.log(this.talkVos)
              for (let i = 0; i < this.talkVos.length; i++) {
                this.talks.push(this.talkVos[i].talk)
                let id = this.talkVos[i].talk.talk_id
                if (this.loved.indexOf(id) !== -1) {
                  this.off.push(true)
                } else {
                  this.off.push(false)
                }
              }
              this.show = []
              this.self = []
              for (let i = 0; i < this.talkVos.length; i++) {
                let id = this.talkVos[i].talk.user_id
                if (this.follow.indexOf(id) !== -1) {
                  this.show.push(true)
                } else {
                  this.show.push(false)
                }
                if (this.talkVos[i].userName !== this.$store.state.user.username) {
                  this.self.push(false)
                } else {
                  this.self.push(true)
                }
              }
              console.log(this.show)
            }).catch(res=>{
            window.alert(res)
          })
        }
      }
    }
  }
</script>

<style scoped>
  #talk{
    /*background: url("../../assets/liuzile.jpg");*/
    /*!*background-size: 100%;*!*/
    /*background-attachment: fixed;*/
    /*width: 100%;*/
  }
  /deep/ .el-icon-mygood{
    background: url('../../icon/good.svg') no-repeat;
    font-size: 16px;
    background-size: cover;
  }
  /deep/ .el-icon-mygood :before{
    content: "替";
    font-size: 16px;
    visibility: hidden;
  }
  .el-icon-my-bad{
    background: url('../../icon/bad.svg') no-repeat;
    font-size: 16px;
    background-size: cover;
  }
</style>
