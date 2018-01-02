<template>
  <div class="indexRoulette">
    <Headered
        :classAdata="classAdata"
        :icon="icon"
        :creditId="creditId"
        :countDownStr="countDownStr"
        :totalMoney="totalMoney"
        :imgJson="{}"
        @menuClicked="onMenuClicked"
        :balanceMarry="balanceMarry"
        ref="headerRef"></Headered>

    <LotteryTable
        :classAdata="classAdata"
        :oneCredId="oneCredId"
        :creditId="creditId"
        :officialRebate="officialRebate"
        :personalRebate="personalRebate"
        :sliderValue="sliderValue"
        :marryNum="marryNum"
        :imgJson="{}"
        ref="pcddref"
    ></LotteryTable>

    <Footered
    :personalRebate="personalRebate"
    :curtwoIndex="oneCredId"
    :GdlotteryDataArr="GdlotteryDataArr"
    :creditId="creditId"
    :whetherNumber="whetherNumber"
    @sliderValue="onSliderChanged"
    @confirmBtnClicked="makeOrder"
    ref="footerRef"></Footered>

    <ConfirmPage
    :countDownStr="countDownStr"
    :nextNoisser="nextNoisser"
    :classAdata="classAdata"
    :creditId="creditId"
    @saveOrderSuccess="saveOrderSuccess"
    ref="confirmPageRef"
    ></ConfirmPage>

    <DrawAlottery v-if="isOpenLottery" :isFirst="isFirst"></DrawAlottery>

    <!--是否清空-->
    <div class="emptyBack" v-if="PopupTrue == true">
      <div class="emptyMun indexJust">
        <div class="emptyData">
          <section>
            <p>温馨提示</p>
            <p>你确定要清空投注记录吗？</p>
          </section>
          <ul class="indexDisplay">
            <li @click="emptyHidden">
              <div class="indexcancel indexcancel_qx">取消</div>
            </li>
            <li @click="emptyNull">
              <div class="indexcancel">确定</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import '../../../assets/scss/common/lottery/turnTable/index.scss';
	import Headered from '../../../components/header.vue'
	import Footered from '../../../components/footer.vue'
	import ConfirmPage from '../../../components/confirmBet.vue'
	import LotteryTable from './lotteryTable.vue'
	import DrawAlottery from './drawAlottery.vue'

	export default {
		data() {
			return {
				classAdata: '',//一级数据
				creditId: 13,//彩种ID
				icon: require('../../../assets/images/index/icon/13.png'),//彩种图标
				rule: '',//彩种规则
				stopBetCountDownSecond: '',
				countDownSecond: '',
				countDownStr: '',
				stopBet: false,
				oneCredId: 0,
				GdlotteryDataArr: '',//数据
				officialRebate: '',//官方返点
				personalRebate: '',//个人返点
				sliderValue: 0, //返点
				nextNoisser: 0,//下一期期号
				Noisser: 0,//期号
				PopupTrue: false,
				ThisgameplayName: '',
				marryNum: 100, //footer选择数
				totalMoney: 0,//总额
				isOpenLottery: true,
				openLotteryResult: '',
				isFirst: true,
				balanceMarry: '',
				whetherNumber: 0,
				cycleStop: ''
			}
		},

		mounted() {

			let that = this;
//	  that._Util.remScript();

			that.isFirst = true;
			that.initData();

			let urlGameId = this.$route.query.game;
			if (!urlGameId) {
				console.log('game id undefined! useage: "?game=1"')
			} else {
				this.gameId = urlGameId
			}

			this.$on('marryNum', function (data) {
				this.marryNum = data || 0;
			});

			this.$on('totalMoney', function (data) {
				this.totalMoney = data || 0;
			});

			this.$on('resetData', function (data) {
				if (data) {
					this.$emit('resetChildData');
					this.$refs.headerRef.getHistoryBetMoney();
					this.marryNum = 100;
					this.sliderValue = 0;
				}
			});

			that._Util.visibilityChange(that, 13);
		},

		methods: {
			initData() {

				let that = this;
				that._Util.post(that, that._Api.POST_LOTTERY_DETAIL, {id: 13}, (data) => {
					that.classAdata = data;
					that.$refs.headerRef.retainData = 0;
					that.creditId = data.lottery_id;
					//下一期和这期期号
					that.nextNoisser = that.classAdata.next_action_no;
					that.Noisser = that.classAdata.action_no;
					// 数据
					that.GdlotteryDataArr = that.classAdata.played;
					//余额
					that.balanceMarry = that.classAdata.amount;
					// 赔率和返点
					that.officialRebate = data.officialRabate;
					that.personalRebate = data.rabate;
					//倒计时
					that.stopBetCountDownSecond = data.stop_count_down;
					that.countDownSecond = data.count_down;
					that.whetherNumber = that.classAdata.status;
					if (that.classAdata.kj_cycle) {
						that.cycleStop = that.classAdata.kj_cycle;
					}

//            that.stopBetCountDownSecond = data.stop_count_down;
//            that.countDownSecond = data.count_down;

//		  that.stopBetCountDownSecond = 3;
//		  that.countDownSecond = 33;

//          that.stopBetCountDownSecond = 5
//          that.countDownSecond = 35;

					if (parseInt(that.classAdata.status) !== 0 && parseInt(that.classAdata.status) !== -1) {
						that.startCountDown();
					}
				});
			},

			saveOrderSuccess: function () {
				this.$refs.footerRef.resetData(true);
			},


			makeOrder: function () {
				let balls = this.$refs.pcddref.getAllSelectedBalls()
				if (!balls.length && (!this.$refs.confirmPageRef.orders.length || !this._Util.checkDup(this.$refs.confirmPageRef.orders, 'oneCredId', this.oneCredId))) {
					this._Util.showAlert(this, {
						content: '请选择号码'
					});
//          this.alertArt('请选择号码');
					return false;
				}

				if (!balls.length && this.$refs.confirmPageRef.orders.length) {
					this.$refs.confirmPageRef.bankId = true;
					return;
				}

				for (let i = 0; i < balls.length; i++) {
					// if (balls[i].amount == 0 && this.multipleValue == 0) {
					//   this.alertArt('请输入金额')
					//   return
					// }
					this.ThisgameplayName = '特码';
					let order = {
						play_name: balls[i].play_sub_group_name,// 玩法名称
						played_id: balls[i].id, // id
						group_id: balls[i].play_sub_group_id, // 二级玩法组id
						rebate: this.sliderValue, // 返点
						odds: balls[i].cur_odds, // 赔率
						mode: 1, // 模式 (信用玩法：默认1；官方玩法：2；0.2；0.02；0.002)
						multiple: balls[i].amount == 0 ? parseFloat(this.multipleValue).toFixed(2) : balls[i].amount,
						data: balls[i].name,// 球号
						num: 1, // 注数
						colorfulName: balls[i].colorfulName,
						oneCredId: balls[i].oneCredId
						// 快速模式下的每注金额为multipleValue, 自主模式下的每注金额为ball[i].amount
						// amount: balls[i].amount == 0? parseFloat(this.multipleValue).toFixed(2) : balls[i].amount
					}
					this.$refs.confirmPageRef.addOrder(order)
					this.$refs.confirmPageRef.gameIdEmit(this.creditId);

					this._LotteryUtil.isBetEnd(this, this.stopBetCountDownSecond);
				}
				//this.showConfirmPage()
			},

			onMenuClicked: function (value) {
				this.oneCredId = value.navOneID;
			},

			onSliderChanged: function (value) {
				this.sliderValue = value;
			},

			startCountDown: function () {
				let that = this;
				that.stopBet = that.stopBetCountDownSecond < 0;
				if (that.countDownSecond > 0) {
//					this.interValObj = window.setInterval(
//						function () {
//							this.countDown()
//						}.bind(this), 1000)

					that.interValObj = setInterval(that.countDown, 1000);
				}
			},

			countDown: function () {
				if (this.countDownSecond > 0) {
					this.countDownSecond -= 1;
					this.countDownStr = this._Util.formatTime(this.stopBetCountDownSecond, this.countDownSecond + 1, this.stopBet);
				} else {
					this.countDownStr = this._Util.formatTime(-1, 0, this.stopBet);
					window.clearInterval(this.interValObj)
					this.initData();
					this.stopBet = false;
					if (this.$refs.confirmPageRef) {
						this.$refs.confirmPageRef.timeEndClearData();
					}
//		  this.requestLotteryDetail()
					// this.orderWhether()
				}
				if (this.stopBetCountDownSecond > 0) {
					this.stopBetCountDownSecond -= 1
				} else if (this.stopBetCountDownSecond == 0) {
//		  this.alertArt('当期投注时间结束')
					if (this.classAdata.status !== 0 && this.classAdata.status !== -1) {
						this._Util.showAlert(this, {
							content: '当期投注时间结束'
						});
					}
					let thatBalance = this.$refs.headerRef;
					if (thatBalance) {
						thatBalance.balanceAmount = (thatBalance.headerMarry - parseFloat(this.$refs.confirmPageRef.totalPrice)).toFixed(2);
					}
					this.stopBetCountDownSecond = -1
					this.stopBet = true
					if (this.$refs.confirmPageRef) {
						this.$refs.confirmPageRef.timeEndClearData();
					}
				}
			},

			emptyHidden: function () {
				this.PopupTrue = false;
			},
			emptyNull: function () {
				this.PopupTrue = false;
				if (this.$refs.confirmPageRef) {
					this.$refs.confirmPageRef.clearOrder();
					this.$refs.confirmPageRef.sectionClick();
				}
				//this.saveOrderSuccess();
			},
			PopupTrueFun: function () {
				this.PopupTrue = true;
			},
			//模拟弹出框
//      alertArt: function (val) {
//        $('.Popup').fadeIn('fast');
//        $('.Popup_text_wz').text(val);
//        setTimeout(function () {
//          $('.Popup').fadeOut('fast');
//        }, 3000)
//      },
			stopBetVund() {
				return this.stopBet
			}
		},

		components: {
			Headered,
			Footered,
			LotteryTable,
			ConfirmPage,
			DrawAlottery
		}
	}
</script>

<style lang="scss">

</style>