<template>
  <div class="indexHeight">
    <Headered
    :classAdata="classAdata"
    :icon="icon"
    :creditId="creditId"
    :countDownStr="countDownStr"
    :totalMoney="totalMoney"
    :imgJson="{}"
    @menuClicked="onMenuClicked"
    :balanceMarry="balanceMarry"
    ref="headerRef"
    ></Headered>
    <Pcdd
    :classAdata="classAdata"
    :oneCredId="oneCredId"
    :creditId="creditId"
    :officialRebate="officialRebate"
    :personalRebate="personalRebate"
    :sliderValue="sliderValue"
    :marryNum="marryNum"
    :whetherNumber="whetherNumber"
    ref="pcddref"
    ></Pcdd>
    <Footered
    :personalRebate="personalRebate"
    :curtwoIndex="oneCredId"
    :GdlotteryDataArr="GdlotteryDataArr"
    :creditId="creditId"
    @sliderValue="onSliderChanged"
    @confirmBtnClicked="makeOrder"
    :imgJson="{}"
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
    <!--模拟弹出框-->
    <div class="Popup">
      <div class="Popup_text indexJust">
        <div class="Popup_text_wz">模拟弹出框</div>
      </div>
    </div>
    <!--是否清空-->
    <div class="emptyBack" v-if="PopupTrue == true">
        <div class="emptyMun indexJust">
          <div class="emptyData">
            <section>
              <p>温馨提示</p>
              <p>你确定要清空投注记录吗？</p>
            </section>
            <ul class="indexDisplay">
              <li @click="emptyHidden"><div class="indexcancel indexcancel_qx">取消</div></li>
              <li @click="emptyNull"><div class="indexcancel indexcancel_qd">确定</div></li>
            </ul>
          </div>
        </div>
    </div>

    <DrawPcdd v-if="isOpenLottery && creditId == 1"></DrawPcdd>
    <!--加拿大幸运28-->
    <DrawCanada v-else-if="isOpenLottery && creditId == 2"></DrawCanada>
    <!--快乐六合彩-->
    <DrawMarksix v-else-if="isOpenLottery && creditId == 3"></DrawMarksix>
    <!--江苏快三-->
    <DrawDice v-else-if="isOpenLottery && creditId == 4"></DrawDice>
    <!--北京pk10-->
    <DrawDicePK v-else-if="isOpenLottery && creditId == 5"></DrawDicePK>
    <!--重庆时时彩-->
    <DrawCqssc v-else-if="isOpenLottery && creditId == 6"></DrawCqssc>
  </div>
</template>

<script type="text/babel">
  import '../../../assets/scss/common/lottery/pcdd/index.scss';
  import Headered from '../../../components/header.vue'
  import Footered from '../../../components/footer.vue'
  import ConfirmPage from '../../../components/confirmBet.vue'
  import Pcdd from './pcdd.vue'
  import DrawPcdd from './drawPcdd.vue'
  /*快乐六合彩*/
  import DrawMarksix from './drawMarksix.vue'
  /*江苏快三*/
  import DrawDice from './drawDice.vue'
  /*北京pk10*/
  import DrawDicePK from './drawDicePK.vue'
  import DrawCanada from './drawCanada.vue'
  /*重庆时时彩*/
  import DrawCqssc from './drawCqssc.vue'

  export default {
    name: 'pcddIndex',
    data () {
      return {
        firstLoad: true,
        classAdata: '',//一级数据
        creditId: 1,//彩种ID
        icon: '',//彩种图标
        rule: '',//彩种规则
        stopBetCountDownSecond:'',
        countDownSecond:'',
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
        ThisgameplayName : '',
        marryNum: 100, //footer选择数
        totalMoney: 0,//总额,
		isOpenLottery: false,
		openLotteryResult: '',
        whetherNumber : 0,
        balanceMarry: 0,
        EffectTrue: false,
        cycleStop: ''
      }
    },
    components : {
      Headered,
      Footered,
      Pcdd,
      ConfirmPage,
	  DrawPcdd,
      DrawCanada,
      DrawDice,
      DrawMarksix,
      DrawDicePK,
      DrawCqssc
//    Headered : require('components/header.vue'),
//    Pcdd : require('./pcdd.vue'),
//    Footered : require('components/footer.vue'),
//    ComfirmPage : require('./confirm_page.vue'),
//    FooteredPK10 : require('components/footerPk10.vue')
    },
    mounted () {
      var urlGameId = this.$route.query.game;
      if (urlGameId == undefined) {
        //this.alertArt('game id undefined! useage: "?game=8"')
        console.log('game id undefined! useage: "?game=1"')
      } else {
        this.gameId = urlGameId
      }
      this.requestLotteryDetail();

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

      let that = this;

	    that.$on('closeDraw', () => {
		    that.isOpenLottery = false;
      });

	  //that.effectTime();

      that._Util.visibilityChange(that, that.$route.query.game);
    },
    methods : {
      saveOrderSuccess: function () {
        this.$refs.footerRef.resetData(true);
      },

//      effectTime () {
//        let that = this;
//        document.addEventListener("visibilitychange", function (e) {
//          if(!e.path[0].hidden){
//            that.requestLotteryDetail();
//          }else{
//            false
//          }
//        }, false);
//      },

      requestLotteryDetail: function() {
        var that = this;
        var startTime = new Date();
        that._Util.post(that, that._Api.POST_LOTTERY_DETAIL, {id: that.gameId}, (data) => {
        	that.classAdata = data;
          that.$refs.headerRef.retainData = 0;
          //是否暂停销售
          that.creditId = that.classAdata.lottery_id;
          that.whetherNumber = that.classAdata.status;
          if(that.classAdata.kj_cycle){
            that.cycleStop = that.classAdata.kj_cycle;
          }
//          if( that.whetherNumber == '0' ){
//            that.alertArt('暂停销售');
//          }
          switch(data.lottery_id){
            case 1:
              that.icon =  require('../../../assets/images/index/icon/1.png')
              that.urlData = 'pcdd_rule.html';
              break;
            case 2:
              that.icon =  require('../../../assets/images/index/icon/2.png')
              that.urlData = 'jnd_rule.html';
              break;
            case 3:
              that.icon =  require('../../../assets/images/index/icon/3.png')
              that.urlData = 'jsk_rule.html';
              break;
            case 4:
              that.icon =  require('../../../assets/images/index/icon/4.png')
              that.urlData = '_rule.html';
              break;
            case 5:
              that.icon =  require('../../../assets/images/index/icon/5.png')
              that.urlData = 'pcdd_rule.html';
              break;
            case 6:
              that.icon =  require('../../../assets/images/index/icon/6.png')
              that.urlData = 'pcdd_rule.html';
              break;
          }
            //余额
            that.balanceMarry = that.classAdata.amount;

          //下一期和这期期号
          that.nextNoisser = that.classAdata.next_action_no;
          that.Noisser = that.classAdata.action_no;
          // 数据
          that.GdlotteryDataArr = that.classAdata.played;
          // 赔率和返点
          that.officialRebate = data.officialRabate;
          that.personalRebate = data.rabate;
          //倒计时
          that.stopBetCountDownSecond = data.stop_count_down;
          that.countDownSecond = data.count_down;
         // that.countDownSecond = 35;
         // that.stopBetCountDownSecond = 3;
            if(parseInt(that.classAdata.status) !== 0 && parseInt(that.classAdata.status) !== -1){
                that.startCountDown();
            }
		      that._LotteryUtil.isBetEnd(that, that.stopBetCountDownSecond);

          if (that.firstLoad && (that.gameId == 1 || that.gameId == 2)) {
			that.firstLoad = false;
            // setTimeout(function () {
			 //  that.$refs.headerRef.eventOpt(0);
            // }, 100);
		  }
        },() => {}, this.$refs.confirmPageRef.bankId);

      },
      onSliderChanged: function (value) {
        this.sliderValue = value;
      },
      onMenuClicked: function (value) {
        this.oneCredId = value.navOneID;
        console.log('this.oneCredId = ' + this.oneCredId)
      },
      makeOrder: function () {
        var balls = this.$refs.pcddref.getAllSelectedBalls()
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

        for (var i = 0; i < balls.length; i++) {
          // if (balls[i].amount == 0 && this.multipleValue == 0) {
          //   this.alertArt('请输入金额')
          //   return
          // }
          this.ThisgameplayName = '特码'
          var order = {
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
          this.$refs.confirmPageRef.addOrder(order);
          this.$refs.confirmPageRef.gameIdEmit(this.creditId);
//          sessionStorage.setItem('historyurl',JSON.stringify({'url':url,"status":1,"order":order}));
        }
        //this.showConfirmPage()
      },
      startCountDown: function () {
		this.stopBet = this.stopBetCountDownSecond < 0;
        if (this.countDownSecond > 0) {
          this.interValObj = window.setInterval(
            function () { this.countDown() }.bind(this), 1000)
        }
      },
        countDown: function () {
            if (this.countDownSecond > 0) {
                this.countDownSecond -= 1;
                this.countDownStr = this._Util.formatTime(this.stopBetCountDownSecond,this.countDownSecond,this.stopBet);
            } else {
              this.countDownStr = this._Util.formatTime(-1, 0, this.stopBet);
                window.clearInterval(this.interValObj);
                this.requestLotteryDetail();
                this.stopBet = false;
                if (this.$refs.confirmPageRef) {
                    this.$refs.confirmPageRef.timeEndClearData();
                }
                // this.orderWhether()
            }
            if (this.stopBetCountDownSecond > 0) {
                this.stopBetCountDownSecond -= 1
            } else if (this.stopBetCountDownSecond == 0) {
//          this.alertArt('当期投注时间结束')
	            if (this.classAdata.status !== 0 && this.classAdata.status !== -1) {
		            this._Util.showAlert(this, {
			            content: '已封盘'
		            });
		            console.log('this.$parent.$refs.confirmPageRef.totalPrice',this.$refs.confirmPageRef.totalPrice)
	            }
                let thatBalance =  this.$refs.headerRef;
                thatBalance.balanceAmount = (thatBalance.headerMarry - parseFloat(this.$refs.confirmPageRef.totalPrice)).toFixed(2);
                this.stopBetCountDownSecond = -1;
                this.stopBet = true;
                if (this.$refs.confirmPageRef) {
                    this.$refs.confirmPageRef.timeEndClearData();
                }

            }
        },
      emptyHidden : function() {
        this.PopupTrue = false;
      },
      emptyNull : function() {
        this.PopupTrue = false;
		if (this.$refs.confirmPageRef) {
		  this.$refs.confirmPageRef.clearOrder();
		  this.$refs.confirmPageRef.sectionClick();
		}
        //this.saveOrderSuccess();
      },
      PopupTrueFun : function() {
        this.PopupTrue = true;
      },
      //模拟弹出框
      alertArt: function (val) {
        $('.Popup').fadeIn('fast');
        $('.Popup_text_wz').text(val);
        setTimeout(function(){
          $('.Popup').fadeOut('fast');
        },3000)
      },
      stopBetVund () {
          return this.stopBet
      }
    }
  }

</script>
