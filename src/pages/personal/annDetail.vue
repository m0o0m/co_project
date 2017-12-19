<template>
  <div class="moneyTemplateed">
    <div class="lotteryMian">
      <div class="bgimg_title">
        公告详情
        <img src="../../assets/images/icon_back2x.png" @click="$router.go(-1)"/>
      </div>
      <div class="theDetails_mian">
        <div class="lotteryDate lotteryDateed_detail">
          <div class="lotteryData_titleed">
            <p>{{result.title}}</p>
            <p><span>{{result.create_time}}</span></p>
          </div>
          <!--v-html="result.content"-->
          <div v-html="result.content" class="lotteryData_content_text">
          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../assets/scss/default.scss';
  import '../../assets/scss/personal.scss';
  
  
  export default {
    data() {
      return {
        result: {}
      }
    },
    mounted() {
      this._Util.setCss('.lotteryDateed_detail', {"height": (10 / 12)}, "*");
      this.init();
    },
    methods: {
      init() {
        let that = this;
        
        that._Util.post(that, that._Api.POST_PERSONAL_ANN_DETAIL, {id: that.$route.query.id}, (data) => {
          that.result = data;
        })
      }
    }
  }
</script>
