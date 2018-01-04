<template>
  <div class="bettingIndex">
    <div class="bettingCommonA">
      <div class="bettingTitle"><p class="commonArrowsBottom jltz" @click="changeSelect = !changeSelect">投注记录</p></div>
      <div class="betRecord_top">
        <ul class="displayFlex">
          <li v-for="(bet,index) in bettingNav" :class="{'on':index == navIndex}"
              @click="bettingClick(index)"><a href="javascript:void(0)">{{bet}}</a></li>
        </ul>
      </div>
    </div>
    <div class="bettingRecord">
      <!--@top-status-change="handleTopChange"-->
      <mt-loadmore ref="loadMore" :top-method="loadTop" :bottom-all-loaded="busy">
        <div class="bettingVod">
          <div class="noneDIV" v-if="betIndex === 0">
            <p><img src="../../../assets/images/noneImg.png"/></p>
            <p>暂无投注记录哦～</p>
          </div>
          <ul v-else
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="busy"
              infinite-scroll-distance="50"
              infinite-scroll-immediate-check="false">
            <li v-for="betR in resultList" :betId="betR.id" @click="toDetail(betR)" class="">
              <!--<router-link :to="{name:'betRecordDetail', query:{id:betR.id}}">-->
              <a href="javascript:void(0)" class="bettingRecordList">
                <div class="bettingRecordRight">
                  <p ><span class="spanMarry">{{betR.amount}}</span></p>
                  <p v-if="betR.status_text != '已派奖'">{{betR.status_text}}</p>
                  <p class="winCls" v-if="betR.status_text == '已派奖'">
                    <strong>赢</strong><span>{{betR.bonus.toFixed(2)}}</span></p>
                </div>
                <section>
                  <p>{{betR.lottery_name}}</p>
                  <p>第<span>{{betR.action_no}}</span>期</p>
                </section>
                <section>
                  <p>{{betR.played_name}}<span v-if="betR.action_data" class="spanArial">-</span><span class="spanArial">{{betR.action_data}}</span><span class="spanArial">赔率：{{betR.odds}}</span><span class="spanArial">{{betR.action_time}}</span></p>
                </section>
              </a>
              <!--</router-link>-->
            </li>
          </ul>
        </div>
      </mt-loadmore>
    </div>
    <LotterySelect @bettingHidden="bettingHiddened" v-if="changeSelect"></LotterySelect>
  </div>
</template>
<script type="text/babel">
	import LotterySelect from '../../../components/lotterySelect';
	//  import HomeFooter from '../../../components/HomeFooter'
	export default {
		data() {
			return {
				resultList: [],
				changeSelect: false,
				bettingNav: ['全部', '已中奖', '未中奖', '待开奖'],
				navIndex: 0,
				apiID: 0,
				page: 1,
				busy: false,
				betIndex: '',
				 topNavFlg: true
			}
		},

		mounted() {
			let that = this;
			if (that.$route.query.homeIndex == 2) {
				this.initData();
			}
      that._Util.setCss('.betRecord_bd',{"height": (10/14),"padding-bottom": 0.1},"*");
			that._Util.needClickFc('bettingRecord');
		},

		methods: {
			toDetail(v) {
				this.$router.push({name: 'betRecordDetail', query: {id: v.id}});
			},

			initParams() {
				this.busy = false;
				this.page = 1;
				this.resultList = [];
			},
			loadTop() {
				this.initParams();
				this.initData();
				this.$refs.loadmore.onTopLoaded();
			},


			bettingClick: function (index) {
				if (this.navIndex === index) return;
				if (!this.topNavFlg)  return;
				this.navIndex = index;
				switch (index) {
					case 0:
						this.apiID = 0;
						break;
					case 1:
						this.apiID = 5;
						break;
					case 2:
						this.apiID = 4;
						break;
					case 3:
						this.apiID = 2;
						break;
				}
				this.busy = false;
				this.page = 0;
				this.resultList = [];
			},
			initData() {
				let that = this;

				if (that.busy) return;
        if (!this.topNavFlg) return;
				that.busy = true;
				this.topNavFlg = false;
				that._Util.post(that, that._Api.POST_BETTING, {
					status: that.apiID,
					page: that.page
				}, (data) => {
					that.resultList = that.resultList.concat(data.data || []);
					that.busy = false;
					this.topNavFlg = true;
					if (that.resultList.length === 0) {
						that.betIndex = 0;
					} else {
						that.betIndex = 1;
					}
					if (that.page === data.last_page ) {
						that.busy = true;
						that._Util.showAlert(that, {content: '已经没有更多数据了'});
					}
					if (that.page !== data.last_page && data.data.length) {
						that.page++;
					}
				}, '', true);
			},
			bettingHiddened() {
				this.changeSelect = false;
			},

			handleTopChange(status) {
				this.topStatus = status;
			},

			loadMore() {
				let that = this;
				that.initData();
			}
		},
		components: {
			LotterySelect,
//	  HomeFoter: HomeFooter
		},

		watch: {
			'$route'() {
				if (this.$route.query.homeIndex == 2) {
					this.busy = false;
					this.page = 1;
					this.resultList = [];
					this.initData();
				}
			},
			'navIndex' () {
				this.page = 0;
				this.resultList = [];
				this.initData();
      }
		}
	}
</script>

<style lang="scss">

</style>
