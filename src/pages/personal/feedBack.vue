<template>
  <div class="moneyTemplateed">
    <div class="per pers">
      <ul class="per_number goleff">
        <li @click="$router.go(-1);"><a href="javascript: void(0);"></a></li>
        <li class="messageList"><a href="/lottery/personal/feedBack/feedBackMessageList"></a></li>
      </ul>
    </div>
    <div class="Bank_top ides"><p>宝贵意见</p></div>
    <div class="Bank_number istop managMementCls">
      <div class="Opinion_feedback mart">
        <p><textarea name="a" v-model="feedStr" maxlength="1000"></textarea></p>
      </div>
      
      <div @click="save()" class="over"><a href="javascript: void(0);">提交</a></div>
    </div>
  </div>
</template>
<script type="text/babel">
  import '../../assets/scss/personal.scss'
  import '../../assets/css/Popup.css'
  
  export default {
    data() {
      return {
        feedStr: ''
      }
    },
    
    mounted() {
      let that = this;
      that._Util.setCss('.managMementCls',{"height": 1},"*");
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

<style lang="scss" scoped>
  /*body {*/
  /*overflow: hidden;*/
  /*}*/
  /*.view {*/
  /*height: 100%;*/
  /*}*/
</style>
