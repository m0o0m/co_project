<template>
  <div class="bettingIndex">
    <div class="bettingCommonA">
      <div class="bettingTitle"><p class="commonArrowsBottom">投注记录</p></div>
      <div class="betRecord_top">
        <ul class="displayFlex">
          <li v-for="(bet,index) in bettingNav" :class="{'on':index == navIndex}"
              @click="bettingClick(index)"><a href="javascript:void(0)">{{bet}}</a></li>
        </ul>
      </div>
    </div>
    <div class="bettingRecord">
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
            <li v-for="betR in resultList" :betId="betR.id" @click="toDetail(betR)" class="needsclick">
              <!--<router-link :to="{name:'betRecordDetail', query:{id:betR.id}}">-->
              <a href="javascript:void(0)" class="betting_record_list">
                <div class="record_list_right">
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
                  <p>{{betR.played_name}}</p>
                  <p v-if="betR.action_data">-</p>
                  <p>{{betR.action_data}}</p>
                  <p>{{betR.odds}}</p>
                </section>
                <section>
                  <p><span>{{betR.action_time}}</span></p>
                </section>

              </a>
              <!--</router-link>-->
            </li>
          </ul>
        </div>
      </mt-loadmore>
      <img src="../../../assets/images/icon_back.png" class="SecondaryNav" @click="changeSelect = !changeSelect"/>
      <LotterySelect @bettingHidden="bettingHiddened" v-if="changeSelect"></LotterySelect>
    </div>
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
				betIndex: ''
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
				this.page = 1;
				this.resultList = [];
				this.initData();
			},
			initData() {
				let that = this;

				if (that.busy) return;

				that.busy = true;
				that._Util.post(that, that._Api.POST_BETTING, {
					status: that.apiID,
					page: that.page
				}, (data) => {
					that.resultList = that.resultList.concat(data.data || []);
					that.busy = false;
					if (that.resultList.length === 0) {
						that.betIndex = 0;
					} else {
						that.betIndex = 1;
					}
					if (data.data.length) {
						that.page++;
					}

					if (that.page === data.last_page && !data.data.length) {
						that._Util.showAlert(that, {content: '已经没有更多数据了'});
					}
				}, '', true);
			},
			bettingHiddened() {
				this.changeSelect = false;
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
			}
		}
	}
</script>

<style lang="scss">
  @function rem($px,$designWidth:375){
  @return $px*450/$designWidth/29 + rem;
  }
  #bettinged {
    width: 100%;
    height: 100%;
    background: url('../../../assets/images/index/bg.png') top center no-repeat;
    background-size: 100% auto;
  }

  .bettingMian {
    /*max-width: rem(640);*/
    height: 100%;
    background: url('../../../assets/images/betRecord/bg.png') top center no-repeat;
    background-size: 100% auto;
  }
  /*投注记录迭代样式*/
  .betting_record_list .record_list_right{
    float: right;
    font-size: rem(14); color: #FFDC99; line-height: rem(24);
    text-align: right;
  }
  .betting_record_list p{
    color: #FFDC99;
    font-size: rem(14);
  }
  .betting_record_list section:nth-child(2) p{
    float: left; color: #FFDC99; line-height: rem(24);
  }
  .betting_record_list section:nth-child(2) p:nth-child(2){
    font-size: rem(10);  line-height: rem(24); margin-left: rem(10);
  }
  .betting_record_list section:nth-child(3) p{
    float: left;
  }
  .betting_record_list section:nth-child(3) p:nth-child(2){
    margin: 0 rem(10);
  }
  .betting_record_list section:nth-child(3) p:nth-child(4){
    margin-left:rem(30);
  }
  .betting_record_list section:last-child p{
    font-size: rem(10);
  }
</style>
