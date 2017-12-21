<template>
  <div class="annDetail">
      <div class="commonNavBar positionFixed">
        <div class="loginTitle"><p>公告详情</p></div>
        <div class="loginIcon left" @click="$router.go(-1);"><a href="javascript:void(0)"></a></div>
      </div>
      <div class="annDetailsMian">
        <div class="annDetailDate annDetailDateDetail">
          <div class="annDetailTitle">
            <p>{{result.title}}</p>
            <p><span>{{result.create_time}}</span></p>
          </div>
          <!--v-html="result.content"-->
          <div v-html="result.content" class="annDetailContentText"></div>
        </div>
      </div>
  </div>
</template>

<script>
//  import '../../assets/scss/default.scss';
//  import '../../assets/scss/personal.scss';
  
  
  export default {
    data() {
      return {
        result: {}
      }
    },
    mounted() {
//      this._Util.setCss('.annDetailDateDetail', {"height": (10 / 12)}, "*");
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
