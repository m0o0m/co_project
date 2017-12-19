<template>
  <div id="moneyHisTemplate" class="moneyHisTemplate">
    <div class="bgimg_title">
      <p>
        提现记录
      </p>
      <img src="../../assets/images/icon_back2x.png" @click="_Util.back($router)"/>
    </div>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="50"
         infinite-scroll-immediate-check="false"
         class="betRecord_bd betRecord_bd_record">
      <div class="noneDIV" v-if="isEmpty">
        <p><img src="../../assets/images/noneImg.png"/></p>
        <p>暂无提现记录哦～</p>
      </div>
      <ul v-else>
        <!--<li v-for="(v, index) in resultList">-->
        <!--<a href="javascript:void(0)">-->
        <!--<section>-->
        <!--<p>{{v.status_text}}</p>-->
        <!--<p><span class="spanMarry">{{v.amount}}</span></p>-->
        <!--</section>-->
        <!--<section>-->
        <!--<p><span>{{v.time}}</span></p>-->
        <!--&lt;!&ndash;<p>{{v.status_text}}</p>&ndash;&gt;-->
        <!--</section>-->
        <!--</a>-->
        <!--</li>-->
        
        <li v-for="(v, index) in resultList">
          <div class="moneyMian moneyHistory">
            <div class="moneyLeft"
                 :class="{'moneyRed': v.status == '3','moneyYellow': v.status == '2', 'moneyGray': v.status == '1'}"></div>
            <div class="moneyRight ">
              <article class="money_article">
                <p>{{v.status_text}}</p>
                <p><span>{{v.time}}</span></p>
                <p v-if="v.status == '3'">失败原因：<span>{{v.note}}</span></p>
                <div class="moneyMarry"><span>{{v.amount}}</span></div>
              </article>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="warm_reminder">
      温馨提示：如有疑问，请联系 <a href="javascript:void(0)" @click="CustomerFunction">在线客服</a>
    </div>
  </div>
</template>

<script>
  import '../../assets/scss/personal.scss';
  import LotterySelect from '../../components/lotterySelect.vue';
  
  export default {
    data() {
      return {
        isEmpty: false,
        params: {
          page: 1
        },
        resultList: [],
        busy: false
      }
    },
    
    mounted() {
      let that = this;
      that.init();
      that._Util.setCss('.moneyHisTemplate',{"height": 1},"*");
      that._Util.needClickFc('moneyHisTemplate');
    },
    
    methods: {
      init() {
        let that = this;
        if (that.busy) return;
        
        that._Util.post(that, that._Api.POST_PERSONAL_MEMBER_HISTORY, that.params, (data) => {
          that.busy = false;
          if (data && data.data && data.data.length) {
            that.resultList = that.resultList.concat(data.data || []);
            that.params.page++;
          }
          
          that.isEmpty = !that.resultList.length;
        });
      },
      loadMore() {
        let that = this;
        that.init();
      },
      CustomerFunction: function () {
        let that = this;
        that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
          window.location.href = data.value;
        })
      },
    },
    components: {
      LotterySelect
    }
  }
</script>

<style lang='scss'>
  .moneyHisTemplate {
    background: url('../../assets/images/index/bg.png') center center no-repeat;
    background-size: cover;
  }
</style>
