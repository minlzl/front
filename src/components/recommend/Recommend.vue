<template>
    <div style="margin-top: 60px;">
      <div style="margin-top: 20px">
        <div style="height: 20px"></div>
        <div v-for="(talkVo,index) in talkVos" :key="talkVo.talk.talk_id" style="opacity:0.8">
          <div>
            <el-card  style="width: 700px;margin-left: auto;margin-right: auto;margin-top: 30px;background-color: #f4f5f7">
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
                <el-button icon="el-icon-star-off" @click="changeLove(index)" v-if="!off[index]" style="float: right;margin-bottom: 20px" circle>
                  {{talkVo.talk.love_number}}
                </el-button>
                <el-button icon="el-icon-star-on" @click="changeLove(index)" v-if="off[index]" style="float: right;color: #fc5050;margin-bottom: 20px" circle>
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
    </div>
</template>

<script>
  export default {
    name: 'Recommend',
    data() {
      return {
        talks:[],
        off:[],
        loved:[],
        show:[],
        follow:[],
        talkVos:[],
        self:[]
      }
    },
    mounted () {
      this.loadLove()
      this.loadFollow()
      // this.loadTalks()
      this.loadTalkVos()
    },
    methods: {
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
          console.log(res)
        })
      },
      loadTalks() {
        let that = this
        this.$axios.get('/getRecommend').then(resp=>{
          for(let i=0;i<resp.data.data.length;i++) {
            let number = Date.parse(resp.data.data[i].publish_data)
            let d = new Date(number)
            resp.data.data[i].publish_data = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()
          }
          that.talks=resp.data.data
          for(let i=0;i<that.talks.length;i++) {
            // that.off.push(false)
            let id = that.talks[i].talk_id
            if(that.loved.indexOf(id) !== -1) {
              that.off.push(true)
            }else {
              that.off.push(false)
            }
          }
          that.show = []
          for (let i = 0; i < that.talks.length; i++) {
            let id = that.talks[i].user_id
            console.log(id)
            if (that.follow.indexOf(id) !== -1) {
              that.show.push(true)
            } else {
              that.show.push(false)
            }
          }
        }).catch(res=>{
          window.alert("服务器错误，请联系管理员")
        })
      },
      loadTalkVos() {
        this.$axios.get('/getRecommend').then(resp=>{
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
          // console.log(123)
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
        }).catch(res=>{
          window.alert("服务器错误，请联系管理员171")
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
          console.log(res)
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
          console.log('wrong')
        })
      },
      toSignalTalk(talk) {
        this.$router.push({
          path :'/signalTalk',
          query:{id :talk.talk_id}
        })
      }
    }
  }
</script>

<style scoped>

</style>
