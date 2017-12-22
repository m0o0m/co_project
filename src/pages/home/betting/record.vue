<template>
  <div class="lotteryRecord">
    <!-- <button @click="changeSelect = !changeSelect">采种选择</button> -->
    <LotterySelect v-if="changeSelect" @bettingHidden="changeSelect = false"
                   @changeLottery="initData(true)"></LotterySelect>
    <div class="backPassTitle"><p class="commonArrowsBottom displayInline" @click="selectLottery()">{{$route.query.nam
      || ''}}</p></div>
    <div class="loginIcon flt left" @click="_Util.back($router)"><a href="javascript:void(0)"></a></div>
    <div class="recordBetting">
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="busy"
           infinite-scroll-distance="50"
           infinite-scroll-immediate-check="false">
        <div class="noneDIV" v-if="betIndex === 0">
          <p><img src="../../../assets/images/noneImg.png"/></p>
          <p>暂无投注记录哦～</p>
        </div>
        <ul v-else>
          <li v-for="betR in resultList" :betId="betR.id" class="recordResult">
            <router-link :to="{name:'betRecordDetail', query:{id:betR.id}}" class="commonArrowsRight">
              <section class="displayFlex">
                <p>{{betR.lottery_name}}</p>
                <p class="flexRecord">第<span>{{betR.action_no}}</span>期</p>
                <p><span class="spanMarry">{{betR.amount}}</span></p>
              </section>
              <section class="displayFlex">
                <p class="flexRecord"><span>{{betR.action_time}}</span></p>
                <p v-if="betR.status_text != '已派奖'">{{betR.status_text}}</p>
                <p class="winCls" v-if="betR.status_text == '已派奖'">
                  <strong>赢</strong><span>{{(betR.bonus).toFixed(2)}}</span></p>
              </section>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">

	import '../../../assets/scss/default.scss';
	import LotterySelect from '../../../components/lotterySelect.vue';

	export default {
		data() {
			return {
				resultList: [],
				changeSelect: false,
				colorId: 0,
				page: 1,
				busy: false,
				recordName: '',
				betIndex: ''
			}
		},

		mounted() {
			let that = this;
			that.recordName = that.$route.query.name;
			that.initData();
			// that._Util.needClickFc('lottery_Height');
		},

		methods: {
			initData(flag) {
				let that = this;
				if (that.busy) return;

				if (flag) {
					that.resultList = [];
					that.page = 1;
				}
				that.colorId = that.$route.query.id;
				that._Util.post(that, that._Api.POST_BETTING, {lottery_id: that.colorId, page: that.page}, (data) => {
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
				});
			},

			loadMore() {
				let that = this;
				that.initData();
			},

			selectLottery() {
				let that = this;
				that.changeSelect = true;
			}

		},
		components: {
			LotterySelect
		}
	}
</script>
