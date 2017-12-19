<template>
  <div class="feedBackMessageLists">
    <div class="messageListTitle">
      <ul class="title">
        <li @click="$router.push({name:'master'});"><a href="javascript: void(0);"></a></li>
        <li><h3>代理协议</h3></li>
      </ul>
    </div>
    <div class="agentContract">
        <p class="agentContract_tit">棋牌彩票代理协议：</p>
        <p>1、会员可点击开户返佣选择直接开户或分享开户成为棋牌彩票官方代理；</p>
        <p>2、代理享有下级用户消费带来的分红权利；</p>
        <p>3、平台按用户亏损总额的12%-35%用于代理提成；</p>
        <p>4、平台以月为结算周期，每月1日结算所有代理上月对应分红，并返佣到相应代理帐户</p>
        <p>5、无需任何投入即可快速成就代理致富梦想。</p>
        <div class="xx" >
            <p>★联盟方案</p>
            <p>★代理咨询添加   代理QQ：97911111  代理微信：qpcp10</p>
        </div>
        <div v-if="result" class="explain" style="padding: 0 !important">
            <div class="divs lines" style="margin-bottom: 0.5rem;" >
                <span class="jkl clas2" style="width: 50%;box-sizing: border-box ">当月盈亏
                      <ul class="uis uls">
                          <li v-for="v in result.commision_level_list">{{v.min_bet_money}}-{{v.max_bet_money}}</li>
                      </ul>
                        </span>
                <span class="jkl clas3" style="width: 50%; box-sizing: border-box">返佣比例
                      <ul class="uis uls">
                         <li v-for="v in result.commision_level_list">{{v.rebate_money}}%</li>
                      </ul>
                </span>
            </div>

        </div>
        <p>作为一名联盟合营伙伴，您可以利用您的资源最快赚取高额佣金，由这一秒钟开始，您将可以轻松实现成功与财富的梦想！</p>
        <p class="pb">上述“条件”是显示你发展的有效会员，每月为棋牌彩票带来的总纯利收入！</p>
        <p class="pb"> 1、每个月至少要有5个实际有效投注满1000的会员，您的分成条件才能成立！</p>
        <p class="pb">2、结算期为每月1号！您发展的会员可以在棋牌彩票app的代理后台里面可以查看会员盈亏统计，并在月末扣除会员相应的优惠和行政旨用后与您结算，结算后下月归零重新开始。</p>
        <p class="pb">3、若本月返利未达到领取资格，将会带到下一个月继续累计，直至达到返利领取资格才会派发佣金！</p>
        <p class="pb_t">★代理商-推广注意事项：</p>
        <p class="pb">禁止利用我公司平台进行刷水、套利、套佣或洗黑钱等情况发生；如若发现下线会员有刷水、套利形为，在无通知的情况下取消该会员享有的入款、活动等相应优惠，此会员也将不列入代理佣金结算范畴；</p>
        <p class="pb">以上情况如若情节严重的，将对代理商提出警告并重新资格审核，如无改善将直接终结代理合作并取消当月佣金发放；</p>
        <p class="pb">代理佣金结算时，如结算出来达到返利领取资格，则依据代理方案规定，如期发放代理佣金。</p>
        <p class="pbb">棋牌彩票保留对合作协议、合作方案的更改权及最终解释权！</p>
    </div>
  </div>
</template>

<script>
  import '../../assets/scss/personal.scss'

  export default {
    data() {
      return {
	      result: '',
      }
    },
    mounted() {
    	let that = this;
        that.init();
    },
    methods: {
      init() {
	      let that = this;
	      that._Util.post(that, that._Api.POST_PERSONAL_REBATE_LIST, {}, (data) => {
		      that.result = data;
	      });
      }
      },
      loadMore() {
        let that = this;
        that.init();
      },
    components: {}
  }
</script>

<style lang="css" rel="styleheet/css" scoped>

</style>