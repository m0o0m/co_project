<template>
  <div>
    <div class="headered">
      <div :class="{'headered_mianed_bjpx10':creditId == 5}" class="headered_mianed">
        <div class="headered_muned">
          <article class="headerTop">
            <section @click="back()"></section>
            <section><p @click="lottery_nameClick" :class="{'backTransparent': tokenId001 == 0}">
              {{classAdata.lottery_name}} <span v-if="!exportId">{{deafNum.name}}</span></p></section>
            <!--<section><a href="javascript: void(0);" @click="ruleClick()">规则</a></section>-->
            <section>
              <!--<a href="javascript:void(0)" class="increaseEd"-->
              <!--@click="$parent.isOpenLottery = true && openColor()">+</a>-->
              <a href="javascript:void(0)" class="increaseEd" style="font-size: 1.2rem;"
                 @click="increaseId = !increaseId ? 1 : 0">+</a>
            </section>
          </article>
          <div class="DeliveryAmout" v-show=" creditId != 5 " style="position: relative; top: -0.2rem;">
            <div class="DeliveryMian">
              <div @click="openFrm(2, true)"
                   :class="{'DeliveryHjrbg':creditId == 20,'DeliveryPKnn':creditId == 18,'DeliveryYdzjh':creditId == 16, 'DeliveryMnsh':creditId == 15, 'DeliverySyzb':creditId == 22 || creditId == 14, 'DeliveryClas':creditId == 4, 'DeliverFarm':creditId == 17, 'DeliveryPaiGows': creditId == 20}"
                   class="DeliveryHeaderAmouted">

                <!--<p>已投￥<span v-html="totalMoney"></span></p>-->
                <section><p>已投￥<span v-html="totalMoney || 0"></span></p></section>
                <section><p>余额:<span>{{balanceAmount < 0 ? 0 : balanceAmount == '' ? 0 : balanceAmount}}</span></p></section>
              </div>
              <div class="Deliverycircular" :class="{'DeliveryClaslared':creditId == 4}"><img :src="icon"
                                                                                              style="width: 110%; height: auto;"/>
              </div>
            </div>
            <div @click.stop="openFrm(4)" class="DeliveryMun">
              <!--<router-link :to="{name: 'theLotteryDetails', query: {id: classAdata.lottery_id, name: classAdata.lottery_name}}">-->
              <section><p><span>{{actionNoCopy}}</span>期开奖结果</p></section>
              <!--pc蛋蛋 加拿大幸运28-->
              <section class="pcddHeaderlottery" v-if="creditId == 1 || creditId == 2">
                <!--<p v-for="(action,action_index) in actionDataCopy"-->
                <!--:class="{'red':classAdata.end_color=='red' && creditId <= 2 && action_index >= 3,'green':classAdata.end_color=='green' && creditId <= 2 && action_index >= 3,'blue':classAdata.end_color=='blue' && creditId <= 2 && action_index >= 3,'gray':classAdata.end_color=='gray' && creditId <= 2 && action_index >= 3}">-->
                <!--{{action}}</p>-->
                <p v-for="(action,action_index) in actionDataCopy"
                   :class="{'red':actionResultCopy.end_color=='red' && action_index >= 3,'green':actionResultCopy.end_color=='green' && action_index >= 3,'blue':actionResultCopy.end_color=='blue' && action_index >= 3,'gray':actionResultCopy.end_color=='gray' && action_index >= 3}">
                  {{action}}</p>
              </section>
              <!--香港六合彩-->
              <section class="pcddlottery happlyLottery" v-if="creditId == 3">
                <p><img :src="ZodiacIcon"/></p>
                <p v-for="action in actionDataCopy">{{action}}</p>
              </section>
              <!--江苏快三-->
              <section class="pcddlottery jsk3Lottery" v-if="creditId == 4">
                <p v-for="dice in diceData"><img :src="dice"/></p>
              </section>
              <!--重庆时时彩-->
              <section class="pcddlottery cqsscLottery" v-if="creditId == 6">
                <article class="cqsscNumber">
                  <p v-for="action in actionDataCopy">{{action}}</p>
                </article>
              </section>
              <!--华夏牌九-->
              <section class="pcddlottery hxpjLottery" v-if="creditId == 19">
                <article class="hxpjArticle">
                  <section class="bankerLeft"><img src="../assets/images/zIcon.png"/></section>
                  <section class="bankerNum">
                    <p v-for="dirImg in dircePJ"><img :src="dirImg"/></p>
                  </section>
                </article>
              </section>
              <!--皇家二八杠-->
              <section class="pcddlottery hjrbgLottery" v-if="creditId == 20">
                <article class="hxpjArticle hxpjArticleHuang">
                  <section class="bankerLeft"><img src="../assets/images/zrbIcon.png"/></section>
                  <section class="bankerNum">
                    <p v-for="dirImg in dirceRBG"><img :src="dirImg"/></p>
                  </section>
                </article>
              </section>
              <!--俄罗斯轮盘-->
              <section class="elszpManFet" v-if="creditId == 13">
                <article class="elszpNumber">
                  <p v-for="action in actionDataCopy"><span>{{action}}</span></p>
                </article>
              </section>
              <!--云顶炸金花-->
              <section class="pcddlottery hjrbgLottery"
                       v-if="creditId == 15 ||  creditId == 16 || creditId == 18">
                <article
                        :class="{'mnshImged':creditId == 15,'ydzjhImged':creditId == 16, 'pknnImged':creditId == 18}"
                        class="hxpjArticle">
                  <section class="bankerNum">
                    <p v-for="dirImg in dirceShowHand"><img :src="dirImg"/></p>
                  </section>
                </article>
              </section>
              <!--神勇争霸-->
              <section class="pcddlottery cqsscLottery syzbLotteryed"
                       v-if="creditId == 14">
                <article class="cqsscNumber">
                  <p v-for="action in actionDataCopy"><span>{{action}}</span></p>
                </article>
              </section>
              <!--神勇争霸-->
              <section class="pcddlottery cqsscLottery syzbLotteryed22"
                       v-if="creditId == 22">
                <article class="cqsscNumber" style="border: 1px solid transparent;">
                  <p v-for="action in actionDataCopy"><span>{{action}}</span></p>
                </article>
              </section>
              <!--苏格兰农场-->
              <section class="pcddLottery sglncLotteryed" v-if="creditId == 17">
                <article class="sglncNumber">
                  <p>{{actionResultCopy.extfield}}</p>
                  <p><img v-if="farmImg" :src="farmImg"/></p>
                </article>
              </section>
              <!--</router-link>-->
            </div>
          </div>
          <!--北京pk10-->
          <div class="DeliveryAmout" v-show="creditId == 5" style="position: relative; top: -0.2rem;">
            <div class="DeliveryMian">
              <div class="DeliveryHeaderAmouted DeliveryAmoutedBjPk10">
                <section>
                  <p>已投:¥<span v-html="totalMoney"></span></p>
                </section>
                <section><p>余额:¥<span>{{balanceAmount < 0 ? 0 : balanceAmount == '' ? 0 : balanceAmount}}</span></p></section>
              </div>
              <div class="Deliverycircular"><img :src="icon"/></div>
            </div>
            <div class="DeliveryMun">
              <router-link
                      :to="{name: 'theLotteryDetails', query: {id: classAdata.lottery_id, name: classAdata.lottery_name}}">
                <a href="javascript:void(0)">
                  <section><p><span>{{actionNoCopy}}</span>期开奖结果</p></section>
                  <section class="pcddlottery DeliveryMunBjpk10">
                    <p v-for="(action,index) in actionDataCopy" v-if="index < 3">{{action}}</p>
                    <p style="float: right"><img src="../assets/images/head_pk10_back01.png"/></p>
                  </section>

                </a>
              </router-link>
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
      </div>

      <div class="Popup_up indexJust" v-if="PopupupID == 1">
        <div :class="{'popup_upMian_bjpk10': creditId == 5,}" class="popup_upMian">
          <div :class="{'popup_bjpk10_box':creditId == 5}">
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
    <div class="dropDowmClsBack" v-if="increaseId == 1" @click="increaseId = 0"></div>
    <div class="dropDowmCls" v-if="increaseId == 1">
      <ul>
        <li><a href="javascript:void(0)" @click="openFrm(3)"><p>玩法介绍</p></a></li>
        <li><a href="javascript:void(0)" @click="openFrm(2)"><p>投注记录</p></a></li>
        <li><a href="javascript:void(0)" @click="openFrm(1)"><p>客服</p></a></li>
        <li><a href="javascript:void(0)" v-if="creditId != 17 && creditId != 19 && creditId != 20" @click="openFrm(6)"><p>走势图</p></a></li>
      </ul>
    </div>
    <!--暂停销售 图片展示-->
    <!--<div class="salesCls indexJust" v-if="$parent.whetherNumber == 0">-->
      <!--<p><img :src="suspensionImg"/></p>-->
    <!--</div>-->
  </div>
</template>

<script type="text/babel">

	import OpenFrame from './openFrame.vue'

	export default {
		name: 'headered',
		props: {
			classAdata: {default: ''},
			icon: {default: ''},
			countDownStr: {default: '00:00:00'},
			creditId: {default: 1},
			imgJson: {
				required: false,
				default: {}
			},
			balanceMarry: {default: ''}
		},
		computed: {
			deafNum: function () {
				if (typeof(this.classAdata) == 'string' || typeof(this.classAdata.played) == 'undefined') {
					return '玩法'
				} else {
					if (this.classAdata.played.length <= 1) {
						this.tokenId001 = 0;
					} else {
						this.tokenId001 = 1;
					}
					//十二生肖
					if (this.creditId == 3) {
						var name = this.classAdata.extfield;
						switch (name) {
							case '鼠':
								this.ZodiacIcon = require('../assets/images/Zodiac/zodiac001.png');
								break;
							case '牛':
								this.ZodiacIcon = require('../assets/images/Zodiac/zodiac002.png');
								break;
							case '虎':
								this.ZodiacIcon = require('../assets/images/Zodiac/zodiac003.png');
								break;
							case '兔':
								this.ZodiacIcon = require('../assets/images/Zodiac/zodiac004.png');
								break;
							case '龙':
								this.ZodiacIcon = require('../assets/images/Zodiac/zodiac005.png');
								break;
							case '蛇':
								this.ZodiacIcon = require('../assets/images/Zodiac/zodiac006.png');
								break;
							case '马':
								this.ZodiacIcon = require('../assets/images/Zodiac/zodiac007.png');
								break;
							case '羊':
								this.ZodiacIcon = require('../assets/images/Zodiac/zodiac008.png');
								break;
							case '猴':
								this.ZodiacIcon = require('../assets/images/Zodiac/zodiac009.png');
								break;
							case '鸡':
								this.ZodiacIcon = require('../assets/images/Zodiac/zodiac010.png');
								break;
							case '狗':
								this.ZodiacIcon = require('../assets/images/Zodiac/zodiac011.png');
								break;
							case '猪':
								this.ZodiacIcon = require('../assets/images/Zodiac/zodiac012.png');
								break;
						}
					}
					if (this.creditId == 4) {
						this.diceData = [];
						var num = this.actionDataCopy,
							credlen = num.length,
							credStr = "";
						for (var i = 0; i < credlen; i++) {
							var numEq = num[i];
							switch (parseInt(numEq)) {
								case 1:
									credStr = require('../assets/images/index/die/1.png');
									break;
								case 2:
									credStr = require('../assets/images/index/die/2.png');
									break;
								case 3:
									credStr = require('../assets/images/index/die/3.png');
									break;
								case 4:
									credStr = require('../assets/images/index/die/4.png');
									break;
								case 5:
									credStr = require('../assets/images/index/die/5.png');
									break;
								case 6:
									credStr = require('../assets/images/index/die/6.png');
									break;
							}
							this.diceData.push(credStr);
						}
					}
					if (this.creditId == 19) {
						this.dircePJ = [];
						var num = this.actionDataCopy,
							credlen = num.length;
						for (var i = 0; i < 2; i++) {
							var numEq = num[i];
							var credStr = require('../assets/images/paiGow/gzIcon/' + numEq + '.png');
							this.dircePJ.push(credStr);
						}
					}
					if (this.creditId == 20) {
						this.dirceRBG = [];
						var num = this.actionDataCopy,
							credlen = num.length;
						for (var i = 0; i < 2; i++) {
							var numEq = num[i];
							var credStr = require('../assets/images/Royal/img/' + numEq + '.png');
							this.dirceRBG.push(credStr);
						}
					}

					if (this.creditId === 15 || this.creditId === 16 || this.creditId === 18) {
						this.dirceShowHand = [];
						let num = this.actionDataCopy,
							credlen = num.length;
						for (let i = 0; i < num.length; i++) {

							let credStr = require('../assets/images/showHand/sola/' + num[i] + '.png');
							this.dirceShowHand.push(credStr);
						}
					}

					if (this.creditId === 17) {
						this.farmImg = require('../assets/images/farm/' + this._Util.getValueByKey(this.imgJson.imgList, this.classAdata.extfield1, 'picName') + '.png');
					}

					this.exportId = this.classAdata.played.length === 1 ? true : false;
					return this.classAdata.played[this.navId]
				}
			}
		},
		data() {
			return {
				showFrmBack: false,
				toUrl: '',
				showOpenFrame: false,
				increaseId: 0,
				title: '',
				HeaderData: [],//Head数据
				delImg: require('../assets/images/iconbtn2x.png'),
                suspensionImg: require('../assets/images/salesZTXS.png'),
                numIndex: 0,
				navData: [
					//  {name:"特码",numTrue: false},
					//  {name:"双面",numTrue: false}
				],
				navId: 0,//一级id
				PopupupID: 0,//彩种框
				defalen: 0,
				ZodiacIcon: '',
				farmImg: '',
				diceData: [],
				dircePJ: [],
				dirceRBG: [],
				dirceShowHand: [],
				timeInterval: '',
				actionDataCopy: '',
				actionNoCopy: '',
				actionResultCopy: {},
				totalMoney: 0,
				tokenId001: "",
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
//                balanceMarry: '',
				exportId: false,
				balanceAmount: '',
                reservePrice: 0,
                initializationPrice: 0,
                lotteryTypeId: 0,
                retainData: 0,
                headerMarry: 0
            }
		},
		watch: {
			'classAdata'() {
				this.deafNumFirst();
				this.actionResultCopy = JSON.parse(JSON.stringify(this.classAdata));
				this.actionDataCopy = JSON.parse(JSON.stringify(this.classAdata.action_data));
				this.actionNoCopy = JSON.parse(JSON.stringify(this.classAdata.action_no));
				this.getLotteryData();
				this.getHistoryBetMoney();
				if(this.classAdata){
                    this.lotteryTypeId = this.classAdata.played[0].id;
                }else {
				    return;
                }
			},
			'balanceMarry'() {
                this.balanceAmount = this.balanceMarry - parseFloat(this.retainData);
              this.headerMarry = JSON.parse(JSON.stringify(this.balanceMarry));
              this.retainData = this.totalMoney;

			},

			'$parent.stopBet'(val) {
                this.totalMoney = val ? 0 : this.getHistoryBetMoney();
				// this.retainData = val ? 0 : this.retainData;
			}
		},
		mounted() {
			let that = this;
			that.deafNumFirst();
			that.balanceHods();
			that.balanceAmount = that.balanceMarry;
			that.headerMarry = JSON.parse(JSON.stringify(that.balanceMarry || 0));
			that.initData();
			that.$router.beforeEach((route, redirect, next) => {
				clearInterval(this.timeInterval);
				clearInterval(this.$parent.interValObj);
				next();
			});
			if(that.classAdata){
                that.lotteryTypeId = that.classAdata.played[0].id;
            }
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
			balanceHods() {
               // let that = this;
               // that._Util.post(that, that._Api.POST_USER_WAVE, {}, (data) => {
               //     that.balanceMarry = data.userInfo.amount;
               // })
			},
			openFrm(type, isCheckMoney) {
				let that = this;
				if (isCheckMoney && !that._LotteryUtil.getHistoryBetMoney(that, that.creditId, that.classAdata.next_action_no)) return;
				if (type === 1) {
					that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
//				that.toUrl = data.value;
						window.location = data.value;
//						that.showFrmBack = true;
//						that.showOpenFrame = true;
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
							that.toUrl = that._Api.LOCAL_HOST + 'lottery/rule?lotteryid=' + that.creditId + '&terminal=1';
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
				this.totalMoney = ((money || 0) + this._LotteryUtil.getHistoryBetMoney(this, this.creditId, this.classAdata.next_action_no) + this.reservePrice).toFixed(2);
              this.balanceAmount = !money ? parseFloat(this.balanceAmount) : (parseFloat(this.balanceAmount) - parseFloat(this.$parent.$refs.pcddref.selectedAmount)).toFixed(2);
            },

            getHistoryBet(){
		      // if(this._LotteryUtil.JudgeLogin() === false) return;
              this.balanceAmount = (this.headerMarry - parseFloat(this.$parent.$refs.confirmPageRef.totalPrice)).toFixed(2);
            },

			//修改位置
			latestData() {
				let that = this;
				that.intervalTime = setInterval(function () {
					that._Util.post(that, that._Api.POST_LOTTERY_RECTOR_DETAIL, {id: that.creditId}, (data) => {

					})
				})
			},
			getLotteryData() {
				let that = this;
				if (that.$parent.classAdata.status !== 0 && that.$parent.classAdata.status !== -1) {
					that.timeInterval = setInterval(function () {
						if (parseInt(that.classAdata.next_action_no) - parseInt(that.actionNoCopy) > 1) {
							that._Util.post(that, that._Api.POST_LOTTERY_RECTOR_DETAIL, {id: that.creditId}, (data) => {
								that.actionResultCopy = JSON.parse(JSON.stringify(data));
								that.actionDataCopy = data.data;
								that.actionNoCopy = data.number;
								if (that.creditId === 17) {
									that.farmImg = require('../assets/images/farm/' + that._Util.getValueByKey(that.imgJson.imgList, data.extfield1, 'picName') + '.png');
								}
								if ((parseInt(that.classAdata.next_action_no) - parseInt(that.actionNoCopy)) === 1 && that.creditId !== 3) {
									that.$parent.isOpenLottery = true;
								}
							}, () => {
							}, true);
						} else {
							clearInterval(that.timeInterval);
						}
					}, 1000 * 30);
				}
			},

			deafNumFirst: function () {
				if (!this.classAdata || (this.classAdata.played && !this.classAdata.played.length)) {
					return ''
				} else {
					this.navData = [];
					this.defalen = this.classAdata.played.length;
					for (var i = 0; i < this.defalen; i++) {
						let defaData = this.classAdata.played[i].name;
						let defaDataId = this.classAdata.played[i].id;
                        let defaJson = {name: defaData, id: defaDataId, numTrue: false};
						this.navData.push(defaJson);
					}
                }
			},
			//初始化
			initData: function () {
				this.navId = 0;
				this.PopupupID = 0;
			},

			lottery_nameClick: function () {
				if (this.classAdata.played.length <= 1) {
					return;
				} else {
					this.PopupupID = 1;
					$(".Popup_up").css({
						"height": $(window).height()
					});
				}

			},
			delHidden: function () {
				this.PopupupID = 0;
			},
			eventOpt: function (index,id) {
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

			openColor() {
				let that = this;

				that._Util.post(that, that._Api.POST_LOTTERY_RECTOR_DETAIL, {id: that.creditId}, (data) => {
					this.$parent.$emit('openLottery', data);

				});

			},
			ruleClick() {
				var credRule = "";
				switch (parseInt(this.creditId)) {
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
				this.$router.push({'name': credRule});
			},

			back() {
				if (window.frames.length != parent.frames.length) {
					window.parent.document.getElementById('closeFrame').click();
				} else {
					this.$router.go(-1);
				}
			}
		},

		components: {
			OpenFrame
		}
	}

</script>
