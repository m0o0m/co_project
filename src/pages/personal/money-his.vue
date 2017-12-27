<template>
  <div id="moneyHisTemplate" class="moneyHisTemplate">
    <div class="commonNavBar positionFixed">
      <div class="backPassTitle"><p>充值记录</p></div>
      <div class="loginIcon left flt" @click="$router.go(-1)"><a href="javascript:void(0)"></a></div>
    </div>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="50"
         infinite-scroll-immediate-check="false"
         class="moneyHistoryBody">
      <div class="noneDIV" v-if="betIndex === 0">
        <p><img src="../../assets/images/noneImg.png"/></p>
        <p>暂无投注记录哦～</p>
      </div>
      <ul v-else>
        <li v-for="(money,index) in moneyExport" class="moneyHistoryLI">
          <div class="moneyMian moneyHistoryList">
            <div class="moneyLeft"
                 :class="{'moneyRed': money.status == '2','moneyYellow': money.status == '1', 'moneyGray': money.status == '0' || money.status == '3'}"></div>
            <div class="moneyRight">
              <article class="money_article">
                <p>{{money.status_text}}&nbsp;-&nbsp;{{money.payment_name}}</p>
                <p><span>{{money.time}}</span></p>
                <div class="moneyMarry"><span>{{money.amount}}</span></div>
              </article>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//  import '../../assets/scss/personal.scss';
  import LotterySelect from '../../components/lotterySelect.vue';
  
  export default {
    data() {
      return {
        betIndex: '',
        moneyExport: [],
        busy: false,
        params: {
          page: 1
        }
      }
    },
    computed: {},
    mounted() {
      this.rechargeRecord();
      this._Util.setCss('.moneyHisTemplate',{"height": 1},"*");
      this._Util.needClickFc('moneyHisTemplate');
    },
    methods: {
      rechargeRecord() {
        let that = this;
        
        if (!that.busy) {
          that.busy = true;
          that._Util.post(that, that._Api.POST_RECHARGE_RECORD, that.params, (data) => {
            that.busy = false;
            if (data && data.data && data.data.length) {
              that.moneyExport = that.moneyExport.concat(data.data || []);
              that.params.page++;
            }
          });
        }
      },
      loadMore() {
        this.rechargeRecord();
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
