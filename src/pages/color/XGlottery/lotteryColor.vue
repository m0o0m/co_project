<template>
    <div class="ColorLotteryMuned ColorLotteryMuned12">
      <div class="colorLotteryMargin">
        <div class="XGLottery_list" v-if="lotteryOffsColorID == '225'">
          <ul>
            <li v-for="(lotData,nav_index) in deafNum" :class="{'on':nav_index == navIndex}" @click="Navigation(lotData, nav_index)"><p>{{lotData.name}}</p></li>
          </ul>
        </div>
        <div class="ColorLottery_mian ColorLottery_mian12" :class="{'ColorLot_mian12':lotteryOffsColorID == '225'}">
          <div class="ColorLottery_mcontent ColorLottery_mcontent12" v-for="(lotData,index) in deafNum" :class="{'colorClsLottery': lotteryOffsColorID == '225' , 'colorClsOneLottery': navIndex == index}" v-if="lotteryOffsColorID != '249' || lotteryOffsColorID == '249' && index == 0">
            <!--<div class="ColorLottery_mcTitle ColorLottery_mcTitle12"><p>{{lotData.name}}</p></div>-->
            <div class="HalfwaveCls" v-if="lotteryOffsColorID == '243'">
              <ul>
                <li v-for="(Half,half_index) in Halfwave" :class="{'on':half_index == HalfIndex}" @click="HalfwaveFun(half_index)"><p>{{Half}}</p></li>
              </ul>
            </div>
            <div class="ColorLottery_mslist12 ColorLotterys">
              <ul :class="{'colorzodiac':lotteryOffsColorID == '239' || lotteryOffsColorID == '241' || lotteryOffsColorID == '243' || lotteryOffsColorID == '245','colorzodiac04': lotteryOffsColorID == '243'}" v-if="lotteryOffsColorID != '249'">

                <li v-for="(lData,lData_index) in (items.length ? items : lotData.played)" :class="{'liLotERY':lotteryOffsColorID == '243', 'liLotERY00':lData_index < 4 && HalfIndex == 0,'liLotERY00jia':lData_index < 8 && lData_index > 3 && HalfIndex == 0 && lotteryOffsColorID == '247','liLotERY01':lData_index >= 4 && lData_index < 8 && HalfIndex == 1, 'liLotERY02':lData_index >= 8 && HalfIndex == 2}" >
                  <!--<li v-for="(lData,lData_index) in items">-->
                  <article @click="playchecked($event, lData, items.length ? groupId : lotData.id, lData.name, index, lotData, 'ColorLot_article', lData_index)" class="ColorLot_article">
                    <section :class="{'ColorLot_Colorsection': lotteryOffsColorID == '243'}">
                      <p><span v-if="lotteryOffsColorID != '239' && lotteryOffsColorID != '241'">{{lData.name}}</span><span v-if="lotteryOffsColorID == '239' || lotteryOffsColorID == '241'" class="colorZodatr"><img :src="lData.zodiacImg"/></span> / {{computeOdds(lData)}}</p>
                      <p :class="{'amount':lData.amount > 0 || $parent.stopBet ,'Colorsection': lotteryOffsColorID == '243'}">
                        {{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, lData.amount) || '0'}}
                      </p>
                      <p class="playMarryImg imggs " :class="{'zodiaoClss':lotteryOffsColorID == '239' || lotteryOffsColorID == '241' || lotteryOffsColorID == '245','zodiaoCls05s':lotteryOffsColorID == '243' }" v-if="lData.active && !$parent.stopBet">
                        <!--<img src="../../../assets/images/small01.png"/>-->
                        <img v-if="!lData.active" src="../../../assets/images/small01.png"/>
                        <img v-if="lData.active" :src="require('../../../assets/images/marry_' + ((lData.chip === 10 || lData.chip === 5000) ? lData.chip + '_f' : lData.chip) + '.png')"/>

                      </p>

                      <!--半波-->
                      <div class="zodiaoCls05" v-if="lotteryOffsColorID == '243'">
                        <span v-for="data in lData.zodiacArr" :class="{'red':lData_index < 4,'green':lData_index >= 4 && lData_index <= 7, 'blue': lData_index >= 8 && lData_index <= 11}">{{data}}</span>
                      </div>
                    </section>
                    <!--生肖 一肖-->
                    <div class="zodiaoCls" v-if="lotteryOffsColorID == '239' || lotteryOffsColorID == '241'">
                      <p v-for="data in lData.zodiacArr" :class="{'green':data=='22' || data=='21' || data=='33' || data=='32' || data=='44' || data=='43' || data=='06' || data=='05' || data=='17' || data=='16' || data=='28' || data=='27' || data=='39' || data=='38' || data=='49' || data=='11','blue': data=='10' || data=='09' || data=='20' || data=='31' || data=='42' || data=='41' || data=='04' || data=='03' || data=='15' || data=='14' || data=='26' || data=='25' || data=='37' || data=='36' || data=='48' || data=='47'}">{{data}}</p>
                    </div>
                    <!--尾数-->
                    <div class="zodiaoCls" v-if="lotteryOffsColorID == '245'">
                      <p v-for="data in lData.zodiacArr" :class="{'green':data=='11' || data=='21' || data=='22' || data=='32' || data=='33' || data=='43' || data=='44' || data=='05' || data=='06' || data=='16' || data=='17' || data=='27' || data=='28' || data=='38' || data=='39' || data=='49','blue': data=='10' || data=='20' || data=='31' || data=='41' || data=='42' || data=='03' || data=='04' || data=='14' || data=='15' || data=='25' || data=='26' || data=='36' || data=='37' || data=='47' || data=='48' || data=='09'}">{{data}}</p>
                    </div>

                  </article>
                </li>
              </ul>
              <ul class="XGlI" v-else>
                <!--龙虎斗-->
                <li v-for="(lustrating,lus_indexs) in lotteryilustrating">
                  <article class="ColorLot_article_illustrating">
                    <section class="colorLot_title">{{lustrating.name}}</section>
                    <section>
                      <article class="colorLot_articleP" v-for="(lus, lus_index) in lustrating.played"
                               @click="playchecked($event, lus, lustrating.id, lus.name, index, lustrating, 'colorLot_articleP', lus_indexs,lus_index)">
                        <p>{{lus.name}}/<span>{{computeOdds(lus)}}</span></p>
                        <p :class="{'amount': lus.amount > 0 || $parent.stopBet}">
                          {{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, lus.amount) || 0}}
                        </p>
                        <p class="playMarryImg imggs playMarryImg_lhd"  v-if="lus.active && !$parent.stopBet"><img src="../../../assets/images/small01.png"/></p>

                      </article>
                    </section>
                  </article>
                </li>
              </ul>
            </div>
          </div>

        </div>
        <!--<div class="ColorLottery_mianBottom"><img :src="ColorImgBottom"/></div>-->
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    props: {
        classAdata: { default:'' },
        oneCredId: { default: 0 },
        creditId: { default: '' },
        officialRebate: {default: ''},
        personalRebate: {default: ''},
        sliderValue: {default: ''},
	  marryNum: {default: 10}
    },
    data() {
        return {
            ColorImgTop: require('../../../assets/images/theColor/bg_xglottery00.png'),
            ColorImgBottom: require('../../../assets/images/theColor/Group2xBottm.png'),
            ColorImgIcon: require('../../../assets/images/theColor/GDicon.png'),
            ColorImgRight: require('../../../assets/images/theColor/bg_right_lottery.png'),
            lotteryColorData : [
                {
                    title:"第一球",
                    data: [
                        {name: "0", odds: "12.348", marry: ""},{name: "1", odds: "12.348", marry: ""},{name: "2", odds: "12.348", marry: ""},{name: "3", odds: "12.348", marry: ""},{name: "4", odds: "12.348", marry: ""},{name: "5", odds: "12.348", marry: ""},{name: "6", odds: "12.348", marry: ""},{name: "7", odds: "12.348", marry: ""},{name: "8", odds: "12.348", marry: ""},{name: "9", odds: "12.348", marry: ""},{name: "10", odds: "12.348", marry: ""}
                    ]
                },
                {
                    title:"第二球",
                    data: [
                        {name: "0", odds: "12.348", marry: ""},{name: "1", odds: "12.348", marry: ""},{name: "2", odds: "12.348", marry: ""},{name: "3", odds: "12.348", marry: ""},{name: "4", odds: "12.348", marry: ""},{name: "5", odds: "12.348", marry: ""},{name: "6", odds: "12.348", marry: ""},{name: "7", odds: "12.348", marry: ""}
                    ]
                }
            ],
            playedListCopy: [],
            navIndex: 0,
            lotteryColorNav: [
                {name: "红波", lotTrue: true},
                {name: "绿波", lotTrue: false},
                {name: "蓝波", lotTrue: false}
            ],
            lotteryilustrating : '',
            selectedBalls: [],
            totalMoney: 0,
            items: [],
            Halfwave: ['红波','绿波','蓝波'],
            HalfIndex: 0,
          groupId: 0,
          GroupTotalData: '',
          thisScrollTop: '',
          dynamicBalance: '',
          selectedAmount: 0,
            lotteryOffsColorID: ''
		}
    },
    computed: {
        deafNum() {
            if( typeof(this.classAdata) == "string" || typeof(this.classAdata.played) == 'undefined' ) {
                return '玩法';
            }else {
                this.lotteryOffsColorID = this.$parent.$refs.headerRef.lotteryTypeId;
                if(!this.playedListCopy.length) {
                    this.playedListCopy = JSON.parse(JSON.stringify(this.classAdata.played));
                }
                let zodiacIndex = this.classAdata.played[this.oneCredId].item[0].played;
                let zodiacDev = zodiacIndex.length,
                    zodiacStr = "";
                if(this.creditId == '12' && (this.lotteryOffsColorID == '239' || this.lotteryOffsColorID == '241')){
                    for( var i = 0; i < zodiacDev; i++ ) {
                        switch (zodiacIndex[i].name) {
                            case '鼠':
                                zodiacStr = require('../../../assets/images/theColor/zodiac01.png');
                                break;
                            case '牛':
                                zodiacStr = require('../../../assets/images/theColor/zodiac02.png');
                                break;
                            case '虎':
                                zodiacStr = require('../../../assets/images/theColor/zodiac03.png');
                                break;
                            case '兔':
                                zodiacStr = require('../../../assets/images/theColor/zodiac04.png');
                                break;
                            case '龙':
                                zodiacStr = require('../../../assets/images/theColor/zodiac05.png');
                                break;
                            case '蛇':
                                zodiacStr = require('../../../assets/images/theColor/zodiac06.png');
                                break;
                            case '马':
                                zodiacStr = require('../../../assets/images/theColor/zodiac07.png');
                                break;
                            case '羊':
                                zodiacStr = require('../../../assets/images/theColor/zodiac08.png');
                                break;
                            case '猴':
                                zodiacStr = require('../../../assets/images/theColor/zodiac09.png');
                                break;
                            case '鸡':
                                zodiacStr = require('../../../assets/images/theColor/zodiac10.png');
                                break;
                            case '狗':
                                zodiacStr = require('../../../assets/images/theColor/zodiac11.png');
                                break;
                            case '猪':
                                zodiacStr = require('../../../assets/images/theColor/zodiac12.png');
                                break;
                        }
                        zodiacIndex[i].zodiacImg = zodiacStr;
                        zodiacIndex[i].zodiacArr = zodiacIndex[i].num.split(',');
                    }
                }
                if(this.creditId == '12' && (this.lotteryOffsColorID == '243' || this.lotteryOffsColorID == '245')){
                    for( var i = 0; i < zodiacDev; i++ ) {
                        zodiacIndex[i].zodiacArr = zodiacIndex[i].num.split(',');
                    }
                }
                if(this.creditId == '12' && this.lotteryOffsColorID == '249'){
                    this.lotteryilustrating = this.classAdata.played[this.oneCredId].item;
                }


                if (this.lotteryOffsColorID == '225') {
//				  this.classAdata.played[this.oneCredId].item[5].played[0].name = 1123
				  this.items = this.classAdata.played[this.oneCredId].item[this.navIndex].played;
                } else {
                  this.items = [];
                }

                if (this.lotteryOffsColorID == '249') {
                  this.GroupTotalData = this.classAdata.played[this.oneCredId].item;
                }
                return this.classAdata.played[this.oneCredId].item;
            }
        }
    },
    mounted() {
	  let that = this;
	  that.$parent.$on('resetChildData', function () {
		that.classAdata.played = JSON.parse(JSON.stringify(that.playedListCopy));
		that.playedListCopy = [];
		that.selectedBalls = [];
		that.computeOdds({odds: 0});
	  });
      $(window).scroll(function(){
        that.thisScrollTop = $(document).scrollTop();
      });
        that.lotteryOffsColorID = that.$parent.$refs.headerRef.lotteryTypeId;
    },
    methods: {
	  playchecked: function (e, play, playedSubtypeId, playedSubtypeName, index, colorful, className, lData_index,lus_index) {
		e.stopPropagation();
        this.selectedAmount = parseInt($(".westernSectionNum p.on").attr("data-marry"));
        this.dynamicBalance = this.$parent.$refs.headerRef.balanceAmount;
		  let that = this;
		  if (that._LotteryUtil.pauseSell(that, that.$parent.classAdata.status)) return;
		  if (!that._Util.getUserInfo().is_test_player && this._Util.isLogin() && parseInt(this.selectedAmount) > this.dynamicBalance) {
              this._LotteryUtil.creditLow(this);
			  // this._Util.showAlert(this, {content: "余额不足，请充值"});
			  // setTimeout(function () {
				//   that.$router.replace({name: 'addMoney'});
			  // }, 1000 * 2);
			  return;
		  }
		if (this.$parent.stopBet) return;
          if (this._LotteryUtil.lotteryCheckCount(this,this.selectedBalls)) return;
		//获取内容位置
		let height = $(window).height();
		let width = $(window).width();
		let faterLfet = document.getElementsByClassName(className)[index].offsetLeft;
		let faterTop = document.getElementsByClassName(className)[index].offsetTop;
		let play_articleHeight = ($('.' + className).outerHeight(true)) + 32,
			play_articleWidth = $('.' + className).outerWidth(true);
		$('.westernFooter_bottom section').eq(1).find('p.on .maryCls').animate({
		  top: 188 || -(height - faterTop - play_articleHeight),
		  left: 30 || faterLfet - play_articleWidth
		}, 500);
		let _this = this;
		_this.$set(play, 'amount', (play.amount || 0) + (_this.marryNum || 10));
          _this.$set(play, 'oneCredId', _this.oneCredId);
		if (!('active' in play)) {
		  _this.$set(play, 'active', true);
		}
		if (play.active) {
		  play['cur_odds'] = _this.computeOdds(play);
		  play['play_sub_group_id'] = playedSubtypeId
		  play['play_sub_group_name'] = playedSubtypeName;
		  play['colorfulName'] = colorful.name;
          play['chip'] =_this.$parent.marryNum;
		  if (!_this._Util.checkDup(_this.selectedBalls, 'id', play.id)) {
			_this.selectedBalls.push(play);
		  }
		  _this.getTotalMoney(colorful.played);

		} else {
		  _this.selectedBalls.remove(play);
		}
		_this.notifySelectedCount();
		//this.deliverOST(e, index, lData_index);
          setTimeout(function () {
            if (_this.lotteryOffsColorID == '249'){
              _this._Util.chip(_this, e, $('.ColorLottery_mcontent12:eq(' + index + ') .ColorLotterys ul li:eq(' + lData_index + ') .colorLot_articleP:eq('+lus_index+')'),"",parseInt(_this.thisScrollTop));

            }else {
              _this._Util.chip(_this, e, $('.ColorLottery_mcontent12:eq(' + index + ') .ColorLottery_mslist12 ul li:eq(' + lData_index + ')'),"",parseInt(_this.thisScrollTop));
            }
          }, 10);
	  },

        Navigation(data, index) {
            this.navIndex = index;
            this.items = data.played;
          this.groupId = data.id;
        },
        //算赔率
        computeOdds: function (ball) {
            if (ball.odds_base == 0 || ball.odds == 0) {
                return 0
            }
            // 结果取两位 4舍5入
            let odds = ((((parseFloat(ball.odds_base) - parseFloat(ball.odds)) / this.officialRebate * this.personalRebate + parseFloat(ball.odds) - (parseFloat(ball.odds_base) - parseFloat(ball.odds)) * this.sliderValue / this.officialRebate) / parseFloat(ball.odds_base)) * ball.odds_base).toFixed(3);
            return odds
        },

	  getTotalMoney: function (playedList) {
		var that = this;
		that.totalMoney = 0;
		for (let v of that.classAdata.played) {
		  for (let o of v.item) {
			if (o.play) {
			  that.totalMoney += (o.play.amount || 0);
			}
			for (let n of o.played) {
			  that.totalMoney += (n.amount || 0);
			}
		  }
		}

		that.$parent.$refs.headerRef.getHistoryBetMoney(that.totalMoney);
	  },

	  notifySelectedCount: function () {
		this.$emit('stakeCountChanged', this.selectedBalls.length);
	  },

	  getAllSelectedBalls() {
		return this.selectedBalls
	  },
      HalfwaveFun(index) {
	      this.HalfIndex = index;
      },

	  deliverOST : function(e,index,iteindex) {
		let thisDiv = $('.pcdd_bjpk_mun:eq(' + iteindex + ') .pcdd_mun_list_bjpk10 ul li:eq(' + index + ')');
		let rect = e.target.getBoundingClientRect(),
			offsetX = rect.left,
			offsetY = rect.top;
		let footerImg = $('.westernSectionNum p.on').find("img").attr("src"),
			footerImgPosition = $('.westernSectionNum p.on').find("img");
		let footerPlace = footerImgPosition.clone().offset({
		  top: footerImgPosition.offset().top,
		  left: footerImgPosition.offset().left
		}).css({
		  "position":"absolute",
		  "width":"1.2rem",
		  "height":"1.2rem",
		  "margin-left": "0.5rem",
		  "z-index":"1000"
		}).appendTo($('body')).animate({
		  top: offsetY + 0,
		  left: offsetX + thisDiv.find('.play_clsWidth').width() - 30,
		  width: "1.2rem",
		  height: "1.2rem"
		}, 300, function () {
		  thisDiv.find(".playMarryImg").html('');
		  thisDiv.find(".playMarryImg").append('<img src="' + footerImg + '" alt="" title="">');
		  $(this).detach();
		});
	  }
    },
    watch: {
        'oneCredId'(val) {
          this.selectedBalls = [];
            this.classAdata.played = JSON.parse(JSON.stringify(this.playedListCopy));
          if (val === 1) {
            this.groupId = this.classAdata.played[this.oneCredId].item[0].id;
          }
            this.lotteryOffsColorID = this.$parent.$refs.headerRef.lotteryTypeId;
        },

        'sliderValue'() {
            for (let i = 0, v; v = this.selectedBalls[i++];) {
                v.cur_odds = this.computeOdds(v);
            }
        }
    }
}
</script>

<style lang="scss">

</style>