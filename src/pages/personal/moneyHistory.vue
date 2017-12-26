<template>
  <div id="moneyHisTemplate" class="moneyHisTemplate">
      <div class="commonNavBar positionFixed">
        <div class="backPassTitle"><p>提现记录</p></div>
        <div class="loginIcon left flt" @click="$router.go(-1)"><a href="javascript:void(0)"></a></div>
      </div>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="50"
         infinite-scroll-immediate-check="false"
         class="moneyHistoryBody">
      <div class="noneDIV" v-if="isEmpty">
        <p><img src="../../assets/images/noneImg.png"/></p>
        <p>暂无提现记录哦～</p>
      </div>
      <ul v-else>
        <li v-for="(v, index) in resultList" class="moneyHistoryLI">
          <div class="moneyMian moneyHistoryList">
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
      <div class="warmReminder">
        温馨提示：如有疑问，请联系 <a href="javascript:void(0)" @click="CustomerFunction">在线客服</a>
      </div>
    </div>
  </div>
</template>

<script>
//  import '../../assets/scss/personal.scss';
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
//      that._Util.setCss('.moneyHisTemplate',{"height": 1},"*");
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
	        if (data.data=='' ) {
		        that._Util.showAlert(that, {content: '已经没有更多数据了'});
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
</style>
