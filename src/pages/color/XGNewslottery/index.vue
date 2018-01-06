<template>
    <div class="theColor">
        <Headered
        :icon="icon"
        :classAdata="classAdata"
        :countDownStr="countDownStr"
        :creditId="creditId"
        :balanceMarry="balanceMarry"
        @menuClicked="onMenuClicked"
        ref="headerRef"
        ></Headered>
        <LotteryColor
        :classAdata="classAdata"
        :oneCredId="oneCredId"
        :creditId="creditId"
        :officialRebate="officialRebate"
        :personalRebate="personalRebate"
        :sliderValue="sliderValue"
        :marryNum="marryNum"
        ref="pcddref"
        ></LotteryColor>
        <Footered
        :personalRebate="personalRebate"
        :curtwoIndex="oneCredId"
        :GdlotteryDataArr="GdlotteryDataArr"
        :creditId="creditId"
        @sliderValue="onSliderChanged"
        @confirmBtnClicked="makeOrder"
        :whetherNumber="whetherNumber"
        ref="footerRef"
        ></Footered>
        <ConfirmPage
        :countDownStr="countDownStr"
        :nextNoisser="nextNoisser"
        :classAdata="classAdata"
        :creditId="creditId"
        @saveOrderSuccess="saveOrderSuccess"
        ref="confirmPageRef"
        ></ConfirmPage>
    </div>
</template>

<script>
import $ from 'jquery'
import '../../../assets/scss/newsColor.scss'
import Headered from '../../../components/newsHeader.vue'
import LotteryColor from './lotteryColor.vue'
import Footered from '../../../components/newsFooter.vue'
import ConfirmPage from '../../../components/confirmBet.vue'
export default {
    data() {
        return {
            icon: require('../../../assets/images/index/icon/3.png'),
            classAdata: "",
            creditId: 3,
            nextNoisser: "",
            Noisser: "",
            GdlotteryDataArr: "",
            officialRebate: "",
            personalRebate: "",
            stopBetCountDownSecond: '',
            countDownSecond: '',
            countDownStr: '',
            stopBet: false,
            oneCredId: 0,
            sliderValue: 0,
		    marryNum: 100,
            balanceMarry: '',
            whetherNumber: 0,
            cycleStop: ''
        }
    },
    mounted () {
	  let that = this;
	  that.initData();

	  this.$on('resetData', function (data) {
		if (data) {
		  this.$emit('resetChildData');
		  this.$refs.headerRef.getHistoryBetMoney();
		  this.marryNum = 100;
		  this.sliderValue = 0;
		}
	  });

	  this.$on('marryNum', function (data) {
		this.marryNum = data || 0;
	  });

      this._Util.visibilityChange(this, this.creditId);
    },
    methods : {
        initData() {
            let that = this;
            that._Util.post(that, that._Api.POST_LOTTERY_DETAIL, {id: that.creditId}, (data) => {
                that.classAdata = data;
	            if (that.$refs.headerRef) that.$refs.headerRef.retainData = 0;
                //获取彩种id
                that.creditId = that.classAdata.lottery_id;
                //获取下一期和这期期号
                that.nextNoisser = that.classAdata.next_action_no;
                that.Noisser = that.classAdata.action_no;
                //余额
                that.balanceMarry = that.classAdata.amount;
                //数据
                that.GdlotteryDataArr = that.classAdata.played;
                //赔率和返点
                that.officialRebate = data.officialRabate;
		        that.personalRebate = data.rabate;
                //倒计时
                that.stopBetCountDownSecond = data.stop_count_down;
		        that.countDownSecond = data.count_down;
                that.whetherNumber = that.classAdata.status;
                if(that.classAdata.kj_cycle){
                    that.cycleStop = that.classAdata.kj_cycle;
                }
               // that.countDownSecond = 35;
               // that.stopBetCountDownSecond = 5;

            if(parseInt(that.classAdata.status) !== 0 && parseInt(that.classAdata.status) !== -1){
                that.startCountDown();
            }
            })
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
		  this.ThisgameplayName = '特码'
		  let order = {
			play_name: balls[i].play_sub_group_name,// 玩法名称
			played_id: balls[i].id, // id
			group_id: balls[i].play_sub_group_id, // 二级玩法组id
			rebate: this.sliderValue, // 返点
			odds: balls[i].cur_odds, // 赔率
			mode: 1, // 模式 (信用玩法：默认1；官方玩法：2；0.2；0.02；0.002)
			multiple: balls[i].amount == 0? parseFloat(this.multipleValue).toFixed(2) : balls[i].amount,
			data: balls[i].name,// 球号
			num: 1, // 注数
			colorfulName: balls[i].colorfulName,
              oneCredId:  balls[i].oneCredId
			// 快速模式下的每注金额为multipleValue, 自主模式下的每注金额为ball[i].amount
			// amount: balls[i].amount == 0? parseFloat(this.multipleValue).toFixed(2) : balls[i].amount
		  }
		  console.log(order);
		  this.$refs.confirmPageRef.addOrder(order)
		  this.$refs.confirmPageRef.gameIdEmit(this.creditId);
		}
		//this.showConfirmPage()
	  },

	  saveOrderSuccess: function () {
		this.$refs.footerRef.resetData(true);
	  },

        onMenuClicked(value) {
            this.oneCredId = value.navOneID;
        },
        onSliderChanged(value) {
            this.sliderValue = value;
        },
        startCountDown: function () {
	        let that = this;
	        window.clearInterval(that.interValObj);
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
                this.countDownStr = this._Util.formatTime(this.stopBetCountDownSecond,this.countDownSecond + 1,this.stopBet);
            } else {
              this.countDownStr = this._Util.formatTime(-1, 0, this.stopBet);
                window.clearInterval(this.interValObj)
                this.initData();
              this.stopBet = false;
              if (this.$refs.confirmPageRef) {
                this.$refs.confirmPageRef.timeEndClearData();
              }
              this.$refs.pcddref.HalfIndex = 0;
            }
            if (this.stopBetCountDownSecond > 0) {
                this.stopBetCountDownSecond -= 1
            } else if (this.stopBetCountDownSecond == 0) {
	            if (this.classAdata.status !== 0 && this.classAdata.status !== -1) {
		            this._Util.showAlert(this, {
			            content: '已封盘'
		            });

	            }
              let thatBalance =  this.$refs.headerRef;
              thatBalance.balanceAmount = (thatBalance.headerMarry - parseFloat(this.$refs.confirmPageRef.totalPrice)).toFixed(2);
                this.stopBetCountDownSecond = -1
                this.stopBet = true
//                if (this.$refs.confirmPageRef) {
//                    this.$refs.confirmPageRef.timeEndClearData();
//                }
            }
        },
        stopBetVund () {
            return this.stopBet
        },

      emptyNull() {
        if (this.$refs.confirmPageRef) {
          this.$refs.confirmPageRef.clearOrder();
          this.$refs.confirmPageRef.sectionClick();
        }
      }

    },
    components : {
        Headered,
        Footered,
        LotteryColor,
	  ConfirmPage
    }
}
</script>

<style lang="scss">
    .theColor {
        background: rgb(44,28,15);
    }
</style>