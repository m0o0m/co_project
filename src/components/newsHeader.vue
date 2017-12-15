<template>
  <div>
    <div class="headered">
      <div class="headered_mianed">
        <div class="headered_muned">
          <article class="headerTop">
            <section @click="back()"></section>
            <section>
              <p @click="lottery_nameClick">{{Headertitle}} {{deafNum.name}}</p>
            </section>
            <section>
              <a href="javascript:void(0)" class="increaseEd" @click="increaseId = !increaseId ? 1 : 0"
                 style="font-size: 1.2rem;">+</a>
            </section>
          </article>
          <div class="DeliveryAmout">
            <div class="DeliveryMian">
              <div @click="openFrm(2, true)" class="theColorCls"
                   :class="{'theColorCls23':creditId == 23, 'theColorCls12':creditId == 12 || creditId == 3}">
                <!--<p>已投￥<span v-html="totalMoney"></span></p>-->
                <section><p>已投￥<span>{{totalMoney || 0}}</span></p></section>
                <section><p>余额:<span>{{balanceAmount < 0 ? 0 : balanceAmount == '' ? 0 : balanceAmount}}</span></p></section>
              </div>
              <div class="Deliverycircular">
                <img :src="icon" style="width: 120%; height: auto;"/>
              </div>
            </div>
            <div @click.stop="openFrm(4)" class="DeliveryMun">
              <a href="javascript:void(0)">
                <section><p><span>{{actionNoCopy}}</span>期开奖结果</p></section>
                <section class="pcddHeaderlottery theColorSr" :class="{'theCorLot':creditId == '12' || creditId == '3','GDtheColorLot': creditId == '23' || creditId
                            == '24'}">
                  <p v-for="(lot,lot_index) in actionDataCopy"
                     :class="{'green': zodiacAnimalColor[lot_index] == 'green','blue': zodiacAnimalColor[lot_index] == 'blue'}">
                    {{lot}}
                    <span class="zodiacAnimal">{{zodiacAnimal[lot_index]}}</span>
                  </p>
                </section>
              </a>
            </div>
          </div>
        </div>

        <div v-if="classAdata.status == '0' || classAdata.status == '-1'" class="DeliveryTime">
          <p v-if="classAdata.status == '0'">{{classAdata.kj_cycle}}</p>
          <p v-else>暂停销售</p>
        </div>
        <div v-else-if="!$parent.stopBet" class="DeliveryTime">
          距第<span>{{classAdata.next_action_no}}</span>期投注截止：
          <time>{{countDownStr}}</time>
        </div>
        <div v-else-if="$parent.stopBet" class="DeliveryTime">
          封盘时间：
          <time>{{countDownStr}}</time>
        </div>
        <div class="dropDowmClsBack" v-if="increaseId == 1" @click="increaseId = 0"></div>
        <div class="dropDowmCls" v-if="increaseId == 1">
          <ul>
            <li><a href="javascript:void(0)" @click="openFrm(3)"><p>玩法介绍</p></a></li>
            <li><a href="javascript:void(0)" @click="openFrm(2)"><p>投注记录</p></a></li>
            <li><a href="javascript:void(0)" @click="openFrm(1)"><p>客服</p></a></li>
	        <li><a href="javascript:void(0)" v-if="creditId != 17 && creditId != 19 && creditId != 20" @click="openFrm(6)"><p>走势图</p></a></li>
          </ul>
        </div>
        
        <div class="Popup_up indexJust" v-if="PopupupID == 1">
          <div class="popup_upMian">
            <div class="popup_ulTitle">选择玩法</div>
            <ul>
              <li v-for="(navd,index) in navData" :class="{'on':numIndex == index}" @click="eventOpt(index,navd.id)">
                {{navd.name}}
              </li>
            </ul>
            <div class="delPopup" @click="delHidden">
              <img :src="delImg"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <OpenFrame :popupVisible="showOpenFrame" :showFrmBack="showFrmBack"
               @update:popupVisible="val => showOpenFrame = val" :toUrl="toUrl"></OpenFrame>
  </div>
</template>

<script>
  import OpenFrame from './openFrame.vue'
  
  export default {
    name: 'headered',
    props: {
      icon: {default: ''},
      classAdata: {default: ''},
          // totalMoney: { default: 0 },
      countDownStr: {default: ''},
      creditId: {default: ''},
      balanceMarry: {default: ''}
    },
    data() {
      return {
        toUrl: '',
        showOpenFrame: false,
        showFrmBack: false,
        increaseId: 0,
        Headertitle: '',
        navId: 0,
        navData: [],//导航列表
        defalen: '',
        PopupupID: 0,
        delImg: require('../assets/images/iconbtn2x.png'),
        numIndex: 0,
        actionNoCopy: "", //本期期号
        actionDataCopy: "",
        zodiacAnimal: "",
        zodiacAnimalColor: "",
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
          24: 'dj1_5fc'
        },
//        balanceMarry: '',
        timeInterval: '',
        balanceAmount: '',
        reservePrice: 0,
        initializationPrice: 0,
        lotteryTypeId: 0,
        retainData: 0,
        headerMarry: 0
      }
    },
    computed: {
      deafNum() {
        if (typeof(this.classAdata) == "string" || typeof(this.classAdata.played) == 'undefined') {
          return '玩法';
        } else {
          this.Headertitle = this.classAdata.lottery_name;
          this.navData = [];
          this.defalen = this.classAdata.played.length;
          for (var i = 0; i < this.defalen; i++) {
            let defaData = this.classAdata.played[i].name,
                defaDataId = this.classAdata.played[i].id,
              defaJson = {name: defaData, id: defaDataId, numTrue: false};
            this.navData.push(defaJson);
          }
          return this.classAdata.played[this.navId]
        }
      }
    },
    mounted() {
//	  this.getHistoryRecord();
      this.balanceHods();
      this.balanceAmount = this.balanceMarry;
      this.headerMarry = JSON.parse(JSON.stringify(this.balanceMarry || 0));
      this.$router.beforeEach((route, redirect, next) => {
        clearInterval(this.timeInterval);
        clearInterval(this.$parent.interValObj);
        next();
      });
      this.countDownTimeout();
      if(this.classAdata){
          this.lotteryTypeId = this.classAdata.played[0].id;
      }
    },
    
    methods: {
      countDownTimeout() {
        let that = this,
          tH = 1000;
        let countTimeOut = setInterval(function () {
          if (that.countDownStr == '00:00:00') {
            that.$parent.requestLotteryDetail();
          } else {
            clearInterval(countTimeOut);
          }
        }, tH);
      },
      balanceHods() {
//            let that = this;
//            that._Util.post(that, that._Api.POST_USER_WAVE, {}, (data) => {
//                that.balanceMarry = data.userInfo.amount;
//            })
      },
      openFrm(type, isCheckMoney) {
        let that = this;
        
        if (isCheckMoney && !that._LotteryUtil.getHistoryBetMoney(that, that.creditId, that.classAdata.next_action_no)) return;
        
        if (type === 1) {
          that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
//            that.toUrl = data.value;
            window.location = data.value;
//            that.showFrmBack = true;
//            that.showOpenFrame = true;
          })
        } else {
          switch (type) {
            case 2:
              that._Util.post(that, that._Api.POST_USER_INFO, {}, (data) => {
                if (data && data.userInfo) {
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
//              that.toUrl = that._Api.LOCAL_HOST + 'lottery/rule/' + that.ruleArr[that.creditId];
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
      
      getHistoryBetMoney(money) {
        this.reservePrice = parseFloat(this.$parent.$refs.confirmPageRef.totalPrice);
        this.totalMoney = (money || 0) + this._LotteryUtil.getHistoryBetMoney(this, this.creditId, this.classAdata.next_action_no);
        this.balanceAmount = !money ? this.balanceAmount : (parseFloat(this.balanceAmount) - parseFloat(this.$parent.$refs.colorLottery.selectedAmount)).toFixed(2);
      },
      getHistoryBet(){
        //if(this._LotteryUtil.JudgeLogin() === false) return;
        this.balanceAmount = (this.headerMarry - parseFloat(this.$parent.$refs.confirmPageRef.totalPrice)).toFixed(2);
      },
      increaseClick() {
        this.increaseId = this.increaseId == 0 ? 1 : 0;
      },
      delHidden() {
        this.PopupupID = 0;
      },
      lottery_nameClick() {
        this.PopupupID = 1;
      },
      dropDowmClsBack() {
        this.increaseId = 0;
      },
      eventOpt(index,id) {
        this.balanceAmount = parseFloat(this.balanceAmount) + parseFloat(this.totalMoney) - parseFloat(this.retainData);
        this.numIndex = index;
        this.navId = index;
        this.lotteryTypeId = id;
        this.PopupupID = 0;
        this.getHistoryBetMoney();
        $(".Popup_up").css({
          "height": $(window).height()
        });
        this.$emit('menuClicked', {navOneID: this.navId});
      },
      
      getLotteryData() {
        let that = this;
        if (that.$parent.classAdata.status !== 0 && that.$parent.classAdata.status !== -1) {
	        that.timeInterval = setInterval(function () {
		        if (parseInt(that.classAdata.next_action_no) - parseInt(that.actionNoCopy) > 1) {
			        that._Util.post(that, that._Api.POST_LOTTERY_RECTOR_DETAIL, {id: that.creditId}, (data) => {
				        that.actionDataCopy = data.data;
				        that.actionNoCopy = data.number;
				        that.zodiacAnimal = data.extfield ? data.extfield.split(',') : '';
				        that.zodiacAnimalColor = data.end_color ? data.end_color.split(',') : '';
			        }, () => {
			        }, true);
		        } else {
			        clearInterval(that.timeInterval);
		        }
	        }, 1000 * 30);
        }
      },
      
      back() {
        if (window.frames.length != parent.frames.length) {
          window.parent.document.getElementById('closeFrame').click();
        } else {
          this.$router.go(-1);
        }
      }
    },
    watch: {
      'classAdata'() {
        this.actionNoCopy = JSON.parse(JSON.stringify(this.classAdata.action_no));
        this.actionDataCopy = JSON.parse(JSON.stringify(this.classAdata.action_data));
        if (this.classAdata.colors) {
          this.zodiacAnimalColor = JSON.parse(JSON.stringify(this.classAdata.colors));
        }
        
        if (this.classAdata.animals) {
          this.zodiacAnimal = JSON.parse(JSON.stringify(this.classAdata.animals));
        }
        this.getLotteryData();
        this.getHistoryBetMoney();
        if(this.classAdata){
            this.lotteryTypeId = this.classAdata.played[0].id;
        }else{
          return;
        }
      },
      'balanceMarry'() {
        // this.balanceAmount = this.balanceMarry;
        this.balanceAmount = this.balanceMarry - parseFloat(this.retainData);
        this.headerMarry = JSON.parse(JSON.stringify(this.balanceMarry));
        this.retainData = this.totalMoney;
      },
      
      '$parent.stopBet'(val) {
        this.totalMoney = val ? 0 : this.getHistoryBetMoney();
      }
    },
    
    components: {
      OpenFrame
    }
  }
</script>