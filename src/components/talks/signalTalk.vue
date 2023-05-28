<template>
    <div class="content">
      <nav-menu></nav-menu>
      <div style="margin-top: 60px">
        <div style="height: 20px;"></div>
        <el-card  style="width: 600px;margin-left: auto;margin-right: auto;margin-top: 30px;background-color: #f4f5f7;opacity: 0.9">
          <el-avatar :size="50" :src="talkVo.imageLocation" style="float: left;margin-left: -15px"></el-avatar>
          <div style="text-align: left;margin-left: 40px;font-size: 28px;margin-top: 5px;">
            {{talkVo.userName}}
          </div>
          <div style="text-align: left;margin-left: 30px;font-size: 6px">
            {{talkVo.talk.publish_data}}
          </div>
          <div class="contentMain" style="margin-top:5px;text-align:left;margin-left: 40px; white-space: pre-wrap;">{{talkVo.talk.content}}</div>
          <el-button @click="getComment(talkVo.talk.talk_id)" icon="el-icon-s-comment" style="margin-top: 50px;margin-right: -400px;margin-bottom: 20px">
            {{talkVo.talk.comment_number}}
          </el-button>
        </el-card>
        <el-card style="height:100%; width: 600px;margin-left: auto;margin-right: auto;margin-top: 10px;background-color: #f4f5f7;opacity: 0.9">
          <el-input  v-model="input" placeholder="请输入评论" @keyup.enter.native="subComment" type="textarea" :autosize="{minRows: 2}"></el-input>
          <el-button style="margin-left: 450px;margin-top: 20px" @click="subComment" >发表评论</el-button>
          <el-divider></el-divider>
          <div v-for="(commentVo, index) in comments" :key="commentVo.comment.id" style="opacity:0.9">
            <el-avatar :size="40" :src="commentVo.imageLocation" style="float: left;"></el-avatar>
            <div style="text-align: left;margin-left: 45px;font-size: 16px">
              {{commentVo.userName}}
            </div>
            <div style="float: right;font-size: 12px">
              # {{comments.length-index}}
            </div>
            <el-button icon="el-icon-chat-line-square" size="mini" style="float: right;margin-top: -4px;margin-right: 8px" @click="show = true, replyId = index">回复</el-button>
            <div style="text-align: left;margin-left: 50px;font-size: 2px">
              {{time(commentVo.comment.pubtime)}}
            </div>
            <br/>
            <div style="text-align: left;margin-left: 50px">
              {{commentVo.comment.content}}
            </div>
            <div v-for="(reply) in commentVo.replies" :key="reply.id" >
              {{reply.content}}
            </div>
            <el-divider></el-divider>
          </div>
        </el-card>
        <el-dialog
          title="发表回复"
          :visible.sync = "show"
          width="30%"
        >
          <el-form @submit.native.prevent>
            <el-form-item label="评论">
              <el-input v-model="replyContent" style="width: 300px;float: left" ></el-input>
            </el-form-item>
          </el-form>
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="subReply">确 定</el-button>
        </el-dialog>
      </div>
    </div>
</template>

<script>
  import NavMenu from '../common/NavMenu'
  export default {
    name: 'signalTalk',
    components: {NavMenu},
    data(){
      return {
        talk:'',
        talkVo:'',
        input:'',
        comments:[],
        id:'',
        show:false,
        replyId:0,
        replyContent:''
      }
    },
    methods:{
      getTalk(id) {
        const that = this
        this.$axios.get('/gatTalk',{
          params:{
            id:id
          }
        }).then(resp => {
          // that.talk = resp.data.data
          let number = Date.parse(resp.data.data.publish_data)
          let d = new Date(number)
          let data = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()
          resp.data.data.publish_data = data
          that.talk=resp.data.data
        }).catch(res=>{
          alert("服务器错误")
        })
      },
      getTalkVo(id) {
        if (id === undefined) {
          return
        }
        this.$axios.get('/getTalkVo', {
          params:{
            id:id
          }
        }).then(resp=>{
          let talkVo = resp.data.data
          console.log(talkVo)
          let number = Date.parse(talkVo.talk.publish_data)
          let d = new Date(number)
          talkVo.talk.publish_data = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()
          this.talkVo = talkVo
          this.talk = talkVo.talk
        }).catch(res=>{
          window.alert(res)
        })
      },
      getComment(id) {
        if (id === undefined) {
          return
        }
        const that = this
        this.$axios.get('/comments?id='+id).then(resp=>{
          that.comments = resp.data.data
          console.log(that.comments)
        }).catch(fail=>{
          window.alert("服务器错误，请联系管理员")
        })
      },
      subComment() {
        if (this.input.trim() === "") {
          this.$message.warning("评论失败，内容不能为空")
          return
        }
        this.$axios.post('/subComment',{
          talk_id:this.talk.talk_id,
          content:this.input,
          to_id:this.talk.user_id
        }).then(resp=>{
          console.log(resp)
          if(resp && resp.status === 200) {
            this.comments.unshift(resp.data.data)
            this.$message({
              type:'info',
              message:'评论成功'
            })
          }
          this.$axios.get('/addCommentNumber/'+this.talk.talk_id).then(resp=>{
          this.talk.comment_number = this.talk.comment_number + 1
            this.input = ""
          }).catch(()=>{
            window.alert('wrong')
          })
          console.log(this.comments)
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'评论失败'
          })
        })
      },
      time (pubtime) {
        let number = Date.parse(pubtime)
        let d = new Date(number)
        let data = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()
        // console.log(data)
        return data
      },
      subReply() {
        this.show = false
        if (this.comment === {}) {
          return
        }
        this.$axios.post('/subReply',{
          content: this.replyContent,
          id:this.comments[this.replyId].comment.from_id,
          commentId:this.comments[this.replyId].comment.id
        }).then(resp=>{
          if (resp.data.code === 200) {
            this.comments[this.replyId].replies.unshift(resp.data.data)
          } else {
            window.alert(resp)
          }
        }).catch(res=>{
          window.alert(res)
        })
      }
    },
    mounted () {
      // this.getTalk(this.$route.query.id)
      this.getTalkVo(this.$route.query.id)
      this.getComment(this.$route.query.id)
    }
  }
</script>

<style scoped>
  .content{

    background: url("../../assets/lalala.jpg") no-repeat;
    background-position: center;
    background-color: #a8cff4;
    background-size: 100%;
    background-attachment: fixed;
    min-height: calc(100vh - 60px);
  }
</style>
