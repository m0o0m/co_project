<template>
  <div class="feedBack">
    <div class="commonNavBar positionFixed">
      <div class="backPassTitle"><p>宝贵意见</p></div>
      <div class="loginIcon arrowLeft flt" @click="$router.go(-1)"><a href="javascript:void(0)"></a></div>
      <div class="loginIcon arrowRight mes"><a href="/lottery/personal/feedBack/feedBackMessageList"></a></div>
    </div>
    <div class="feedBackContent">
      <div class="OpinionFeedback">
        <p><textarea  name="a" v-model="feedStr" maxlength="1000" placeholder="最少输入20个字符"></textarea></p>
      </div>
      <div @click="save()" class="loginHostBtn submitBtn"><a href="javascript: void(0);">提交</a></div>
    </div>
  </div>
</template>
<script type="text/babel">
//  import '../../assets/scss/personal.scss'
//  import '../../assets/css/Popup.css'
  
  export default {
    data() {
      return {
        feedStr: ''
      }
    },
    
    mounted() {
      let that = this;
      that.init();
    },
    
    methods: {
      init() {
      
      },
      
      save() {
        let that = this;
        if (!that.feedStr) {
          that._Util.showAlert(that, {content: '请填写反馈'});
          return;
        }
        
//        if (that.feedStr.length < 20) {
//          that._Util.showAlert(that, {content: '至少输入20个字'});
//          return;
//        }
        that._Util.post(that, that._Api.POST_FEED_BACK, {
          content: that.feedStr
        }, (data) => {
          that._Util.showAlert(that, {content: '提交成功'}, () => {
            that.$router.replace({path: '/home?homeIndex=3'});
          });
        });
      }
      
    },
    
    
    components: {}
  }
</script>

<style lang="scss">
</style>
