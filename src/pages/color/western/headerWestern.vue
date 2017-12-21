<template>
  <div class="headered">
    <div class="headered_mianed">
      <div class="headered_muned">
        <article class="headerTop">
          <section @click="back()"></section>
          <section><p @click="lottery_nameClick" :class="{'backTransparent': tokenId001 == 0}">{{classAdata.lottery_name}} <span v-if="!exportId">{{deafNum.name}}</span></p></section>
          <!--<section><a href="javascript: void(0);" @click="ruleClick()">规则</a></section>-->
          <section>
            <a href="javascript:void(0)" class="increaseEd" @click="increaseId = !increaseId ? 1 : 0" style="font-size: 1.2rem;">+</a>
          </section>
        </article>
        <div class="DeliveryAmout" v-show="creditId != 5">
          <div class="DeliveryMian">
            <div @click="openFrm(2, true)" :class="{'DeliveryClas':creditId == 4}" class="DeliveryAmouted">
              <!--已投:￥<span v-html="totalMoney"></span>-->
              <section>
                <p>已投￥<span v-html="totalMoney || 0"></span></p>
              </section>
              <section><p>余额:<span>{{balanceAmount < 0 ? 0 : balanceAmount == '' ? 0 : balanceAmount}}</span></p></section>
            </div>
            <div class="Deliverycircular"><img :src="icon" style="width: 100%;"/></div>
          </div>
          <div @click.stop="openFrm(4)" class="DeliveryMun">
            <!--<router-link :to="{name: 'theLotteryDetails', query: {id: classAdata.lottery_id, name: classAdata.lottery_name}}">-->
                <a href="javascript:void(0)">
                <section><p><span>{{classAdata.action_no}}</span>期开奖结果</p></section>
                <section class="pcddlottery">
                  <p v-for="action in classAdata.action_data">{{action}}</p>
                </section>

             </a>
            <!--</router-link>-->
          </div>
        </div>
        <div v-if="classAdata.status == '0' || classAdata.status == '-1'" class="DeliveryTime">
          <p v-if="classAdata.status == '0'">{{classAdata.kj_cycle}}</p>
          <p v-else>暂停销售</p>
        </div>
        <div v-else-if="!$parent.stopBet" class="DeliveryTime">
          距第<span>{{classAdata.next_action_no}}</span>期投注截止：<time>{{countDownStr}}</time>
        </div>
        <div v-else-if="$parent.stopBet" class="DeliveryTime">
          封盘时间：<time>{{countDownStr}}</time>
        </div>
      </div>
    </div>

    <div class="Popup_up indexJust" v-if="PopupupID == 1">
      <div class="popup_upMian">
        <div class="popup_ulTitle">选择玩法</div>
        <ul>
          <li v-for="(navd,index) in navData" :class="{'on':numIndex == index}" @click="eventOpt(index)">{{navd.name}}</li>
        </ul>
        <div class="delPopup" @click="delHidden">
          <img :src="delImg"/>
        </div>
      </div>
    </div>
    <OpenFrame :popupVisible="showOpenFrame" :showFrmBack="showFrmBack" @update:popupVisible="val => showOpenFrame = val" :toUrl="toUrl"></OpenFrame>
    <div class="dropDowmClsBack" v-if="increaseId == 1" @click="increaseId = 0"></div>
    <div class="dropDowmCls" v-if="increaseId == 1">
      <ul>
          <li><a href="javascript:void(0)" @click="openFrm(3)"><p>玩法介绍</p></a></li>
          <li><a href="javascript:void(0)" @click="openFrm(2)"><p>投注记录</p></a></li>
        <li><a href="javascript:void(0)" @click="openFrm(1)"><p>客服</p></a></li>
        <li><a href="javascript:void(0)" @click="openFrm(6)"><p>走势图</p></a></li>
      </ul>
    </div>
  </div>
</template>
<script type="text/babel">
  import $ from 'jquery'
  import OpenFrame from '../../../components/openFrame.vue'
  export default {
    name: 'headered',
    props : {
      classAdata: { default: '' },
      icon: { default: '' },
   // totalMoney: { default: 0 },
      countDownStr: {default: '00:00:00'},
      creditId: { default: 1 },
      balanceMarry: { default: 0 }
    },
    computed : {
      deafNum : function() {
        if( typeof(this.classAdata) == 'string' || typeof(this.classAdata.played) == 'undefined' ) {
          return '玩法'
        }else{
          if(this.classAdata.played.length <= 1){
              this.tokenId001 = 0;
          }else {
              this.tokenId001 = 1;
          }
          this.exportId = this.classAdata.played.length  === 1 ? true : false;
          return this.classAdata.played[this.navId]
        }
      }
    },
    data () {
        return {
           title: '',
           HeaderData : [],//Head数据
           delImg: require('../../../assets/images/iconbtn2x.png'),
           numIndex: 0,
           navData: [
            //  {name:"特码",numTrue: false},
            //  {name:"双面",numTrue: false}
           ],
           navId: 0,//一级id
           PopupupID: 0,//彩种框
           defalen: 0,
           ZodiacIcon: '',
           diceData: [],
           tokenId001:"",
            increaseId: 0,
            showOpenFrame: false,
            showFrmBack: false,
            toUrl: '',
		  actionDataCopy: '',
		  actionNoCopy: '',
          actionResultCopy: {},
		  totalMoney: 0,
          ruleArr: {
                1: 'pcdd',
                2: 'jna28',
                3: 'xgxlhc',
                4: 'jsks',
                5: 'bjpk10',
                6: 'cqssc',
                12: 'xglhc',
                13: 'elslp',
                14: 'jzdsm',
                15: 'mnlsh',
                16: 'ydzjh',
                17: 'sglnc',
                18: 'pknn',
                19: 'hxpj',
                20: 'hjebg',
                21: 'xbft',
                22: 'mnlsh',
                23: 'gd11x5',
                24: 'dj1_5fc',

            },
          timeInterval: '',
          balanceAmount: 0,
          exportId: false,
          reservePrice: 0,
          initializationPrice: 0,
          retainData: 0,
          headerMarry: 0
        }
    },
    watch : {
      'classAdata' (newData) {
          this.deafNumFirst();
		this.actionDataCopy = JSON.parse(JSON.stringify(this.classAdata.action_data));
		this.actionNoCopy = JSON.parse(JSON.stringify(this.classAdata.action_no));
		this.getLotteryData();
		this.getHistoryBetMoney();
      },
      'balanceMarry'(){
          // this.balanceAmount = this.balanceMarry;
        this.balanceAmount = this.balanceMarry - parseFloat(this.retainData);
        this.headerMarry = JSON.parse(JSON.stringify(this.balanceMarry));
        this.retainData = this.totalMoney;
      },

      '$parent.stopBet'(val) {
        this.totalMoney = val ? 0 : this.getHistoryBetMoney();
      }
    },
    mounted () {
      this.initData();
      this.deafNumFirst();
      this.balanceAmount = this.balanceMarry;
      this.headerMarry = JSON.parse(JSON.stringify(this.balanceMarry || 0));
      this.$router.beforeEach ((route, redirect, next) => {
        clearInterval(this.timeInterval);
        clearInterval(this.$parent.interValObj);
        next();
      });
      this.countDownTimeout();
    },
    methods: {
      countDownTimeout () {
        let that = this,
          tH = 1000;
        let countTimeOut = setInterval(function(){
          if(that.countDownStr == '00:00:00'){
            that.$parent.requestLotteryDetail();
          }else{
            clearInterval(countTimeOut);
          }
        },tH);
      },
	  getHistoryBetMoney(money) {
        this.reservePrice = parseFloat(this.$parent.$refs.confirmPageRef.totalPrice);
		this.totalMoney = (money || 0) + this._LotteryUtil.getHistoryBetMoney(this, this.creditId, this.classAdata.next_action_no);
        this.balanceAmount = !money ? this.balanceAmount : (parseFloat(this.balanceAmount) - parseFloat(this.$parent.$refs.pcddref.selectedAmount)).toFixed(2);
	  },
      getHistoryBet(){
        if(this._LotteryUtil.JudgeLogin() === false) return;
        this.balanceAmount = (this.headerMarry - parseFloat(this.$parent.$refs.confirmPageRef.totalPrice)).toFixed(2);
      },
      balanceHods() {
//                let that = this;
//                that._Util.post(that, that._Api.POST_USER_WAVE, {}, (data) => {
//                    that.balanceMarry = data.userInfo.amount;
//                })
      },
	  getLotteryData() {
		let that = this;
		  if (that.classAdata.status !== 0) {
			  that.timeInterval = setInterval(function () {
				  if (parseInt(that.classAdata.next_action_no) - parseInt(that.actionNoCopy) > 1) {
					  that._Util.post(that, that._Api.POST_LOTTERY_RECTOR_DETAIL, {id: that.creditId}, (data) => {
						  that.actionResultCopy = JSON.parse(JSON.stringify(data));
						  that.actionDataCopy = data.data;
						  that.actionNoCopy = data.number;

						  if ((parseInt(that.classAdata.next_action_no) - parseInt(that.actionNoCopy)) === 1) {
							  that.$parent.isOpenLottery = true;
						  }
					  }, () => {}, true);
				  } else {
					  clearInterval(that.timeInterval);
				  }
			  }, 1000 * 30);
		  }
	  },

      openFrm(type, isCheckMoney) {
        let that = this;

        if (isCheckMoney && !that._LotteryUtil.getHistoryBetMoney(that, that.creditId, that.classAdata.next_action_no)) return;

        if (type === 1) {
            that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
//              that.toUrl = data.value;
              window.location = data.value;
              that.showFrmBack = true;
              that.showOpenFrame = true;
            })
          } else {
            switch (type) {
              case 2:
                that._Util.post(that, that._Api.POST_USER_INFO, {}, (data) => {
                  if (data && data.userInfo){
                    that.toUrl = that._Api.LOCAL_HOST + 'lottery/betting/record?id=' + that.creditId + '&nam=' + that.classAdata.lottery_name;
                  }
                }, () => {
                  that.toUrl = that._Api.LOCAL_HOST + 'lottery/login'
                });
                break;
              case 3:
                if (!that.ruleArr[that.creditId]) {
                  that._Util.showAlert(that, {content: '暂无玩法介绍'});
                  return;
                }
//                that.toUrl = that._Api.LOCAL_HOST + 'lottery/rule/' + that.ruleArr[that.creditId];
                that.toUrl = that._Api.LOCAL_HOST + 'lottery/rule?lotteryid=' + that.creditId+'&terminal=1';
                break;
              case 4:
                that.toUrl = that._Api.LOCAL_HOST + 'lottery/theLottery/theLotteryDetails?id=' + that.classAdata.lottery_id + '&name=' + that.classAdata.lottery_name;
                break;
	            case 6:
		            that.toUrl = that._Api.LOCAL_HOST + 'lottery/trendChart/lineChart?lotteryId=' + that.classAdata.lottery_id + '&terminal=1';
		            break;
              default:

                break;
            }

//              return;
            that.showFrmBack = false;
            that.showOpenFrame = true;
          }
          that.increaseId = 0;
        },
      deafNumFirst : function() {
        if( !this.classAdata || (this.classAdata.played && !this.classAdata.played.length) ) {
          return ''
        }else{
          this.navData = [];
          this.defalen = this.classAdata.played.length;
          for( var i = 0; i < this.defalen; i++ ) {
            let defaData = this.classAdata.played[i].name;
            let defaJson = {name:defaData,numTrue: false};
            this.navData.push(defaJson);
          }
        }
      },
      //初始化
      initData: function() {
        this.navId = 0;
        this.PopupupID = 0;
      },
      lottery_nameClick: function() {
        if(this.classAdata.played.length <= 1){
            return;
        }else{
            this.PopupupID = 1;
        }
      },
      delHidden: function() {
        this.PopupupID = 0;
      },
      eventOpt: function(index) {

        this.numIndex = index;
        this.navId = index;
        this.PopupupID = 0;
        this.getHistoryBetMoney();
        this.$emit('menuClicked',{navOneID:this.navId});
      },
	openColor() {
		let that = this;

		that._Util.post(that, that._Api.POST_LOTTERY_RECTOR_DETAIL, {id: that.creditId}, (data) => {
      console.log(data)
		  return;
		  if (parseInt(data.number) < parseInt(data.next_action_no) && data.next_action_no === that.classAdata.next_action_no) {
      this.$parent.$emit('openLottery', data);
		  }
        });

      },
      ruleClick () {
        var credRule = "";
        switch ( parseInt(this.creditId) ) {
          case 1:
          credRule = "rulePcdd";
          break;
          case 2:
          credRule = "ruleJnd";
          break;
          case 3:
          credRule = "ruleXylhc";
          break;
          case 4:
          credRule = "ruleJsks";
          break;
          case 5:
          credRule = "ruleBjpk";
          break;
          case 6:
          credRule = "ruleCqssc";
          break;
          case 13:
          credRule = "ruleElslp";
          break;
          case 14:
          credRule = "ruleJzdsm";
          break;
          case 15:
          credRule = "ruleMnlsh";
          break;
          case 16:
          credRule = "ruleYdzjh";
          break;
          case 17:
          credRule = "ruleSgl";
          break;
          case 18:
          credRule = "rulePknn";
          break;
          case 19:
          credRule = "ruleHxpj";
          break;
          case 20:
          credRule = "ruleHjebg";
          break;
          case 21:
          credRule = "ruleXbft";
          break;
          case 22:
          credRule = "ruleYszb";
          break;
        }
        this.$router.push({'name' : credRule});
 },

      back() {
        if (window.frames.length != parent.frames.length) {
          window.parent.document.getElementById('closeFrame').click();
        } else {
          this.$router.go(-1);
        }
      }
    },
      components : {
          OpenFrame
      }
  }

</script>
<style lang='scss'>

</style>
