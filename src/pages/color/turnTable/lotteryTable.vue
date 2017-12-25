<template>
    <div class="lotteryTable">
        <section v-if="classAdata.lottery_id" class="wheelBig">
            <div class="wheelBig_deskBox">
                <div v-for="(v, vIndex) in deafNum" class="lotteryTableList boxSizing">
                    <div class="wheelBigTable" v-if="vIndex < 3">
                        <div @click="playchecked($event, v.play, v.id, v.name, vIndex, v, 'lotteryTableTop', vIndex)" class="lotteryTableTop">
                            <p>
                                {{v.play ? v.play.name + '' : ''}}<span>{{v.play ? computeOdds(v.play) : ''}}</span>
                            </p>
                            <p>
                                <!--{{v.play && v.play.amount ? _LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, v.play.amount) : ''}}-->
                                {{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, v.play.amount) || ''}}
                            </p>
                            <p class="playMarryImg" v-if="v.play.active && !$parent.stopBet"><img src="../../../assets/images/small01.png"/></p>
                        </div>
                        <ul class="lotteryTableColor">
                            <li v-for="(o,index) in v.played" v-if="index" @click="playchecked($event, o, v.id, o.name, index, v, 'lotteryTableLi',vIndex)" class="lotteryTableLi">
                                <section class="desk-section" :class="{'desk-section-color':vIndex == 0 && index == 1 || vIndex == 0 && index == 3 || vIndex == 0 && index == 5 || vIndex == 0 && index == 7 || vIndex == 0 && index == 9 || vIndex == 0 && index == 12 || vIndex == 1 && index == 0 || vIndex == 1 && index == 2 || vIndex == 1 && index == 4 || vIndex == 1 && index == 6 || vIndex == 1 && index == 7 || vIndex == 1 && index == 9 || vIndex == 1 && index == 11 || vIndex == 2 && index == 1 || vIndex == 2 && index == 3 || vIndex == 2 && index == 6 || vIndex == 2 && index == 8 || vIndex == 2 && index == 10 || vIndex == 2 && index == 12}">
                                    <p><span>{{o.name}}</span> <span>{{computeOdds(o)}}</span></p>
                                    <p>
                                        {{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, o.amount)}}
                                    </p>
                                    <p class="playMarryImg" v-if="o.active && !$parent.stopBet"><img src="../../../assets/images/small01.png"/></p>
                                </section>
                            </li>
                        </ul>
                    </div>
                    <div v-if="vIndex == 3" class="lotteryTableSp displayFlex">
                        <!--大-->
                        <div @click="playchecked($event, v.played[2], v.id, v.played[2].name, 2, v,'lotteryTableComputed')" class="lotteryTableComputed">
                            <p><strong>{{v.played[2].name}} <span>{{computeOdds(v.played[2])}}</span></strong></p>
                            <p>
                                {{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, v.played[2].amount) || ''}}
                            </p>
                            <p class="playMarryImg" v-if="v.played[2].active && !$parent.stopBet"><img src="../../../assets/images/small01.png"/></p>
                        </div>
                        <!--小-->
                        <div @click="playchecked($event, v.played[3], v.id, v.played[3].name, 3, v,'lotteryTableComputed')" class="lotteryTableComputed">
                            <p><strong>{{v.played[3].name}} <span>{{computeOdds(v.played[3])}}</span></strong></p>
                            <p>
                                {{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, v.played[3].amount) || ''}}
                            </p>
                            <p class="playMarryImg" v-if="v.played[3].active && !$parent.stopBet"><img src="../../../assets/images/small01.png"/></p>
                        </div>
                        <!--单-->
                        <div @click="playchecked($event, v.played[4], v.id, v.played[4].name, 4, v,'lotteryTableComputed')" class="lotteryTableComputed">
                            <p><strong>{{v.played[4].name}} <span>{{computeOdds(v.played[4])}}</span></strong></p>
                            <p>
                                {{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, v.played[4].amount) || ''}}
                            </p>
                            <p class="playMarryImg" v-if="v.played[4].active && !$parent.stopBet"><img src="../../../assets/images/small01.png"/></p>
                        </div>
                        <!--双-->
                        <div @click="playchecked($event, v.played[5], v.id, v.played[5].name, 5, v,'lotteryTableComputed')" class="lotteryTableComputed">
                            <p><strong>{{v.played[5].name}} <span>{{computeOdds(v.played[5])}}</span></strong></p>
                            <p>
                                {{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, v.played[5].amount) || ''}}
                            </p>
                            <p class="playMarryImg" v-if="v.played[5].active && !$parent.stopBet"><img src="../../../assets/images/small01.png"/></p>
                        </div>

                        <div class="lotteryTableSpecial">
                            <!--紅-->
                            <div @click="playchecked($event, v.played[1], v.id, v.played[1].name, 2, v,'lotterySpecialColor')" class="lotterySpecialColor">
                                <p><strong>{{v.played[1].name}} <span>{{computeOdds(v.played[1])}}</span></strong></p>
                                <p>
                                    {{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, v.played[1].amount) || ''}}
                                </p>
                                <p class="playMarryImg" v-if="v.played[1].active && !$parent.stopBet"><img src="../../../assets/images/small01.png"/></p>
                            </div>
                            <!--0-->
                            <div @click="playchecked($event, v.played[6], v.id, v.played[6].name, 6, v,'lotterySpecialColor')" class="lotterySpecialColor">
                                <p><strong>{{v.played[6].name}} <span>{{computeOdds(v.played[6])}}</span></strong></p>
                                <p>
                                    {{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, v.played[6].amount) || ''}}
                                </p>
                                <p class="playMarryImg" v-if="v.played[6].active && !$parent.stopBet"><img src="../../../assets/images/small01.png"/></p>
                            </div>
                            <!--黑-->
                            <div @click="playchecked($event, v.played[0], v.id, v.played[0].name, 2, v,'lotterySpecialColor')" class="lotterySpecialColor">
                                <p><strong>{{v.played[0].name}} <span>{{computeOdds(v.played[0])}}</span></strong></p>
                                <p>
                                    {{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, v.played[0].amount) || ''}}
                                </p>
                                <p class="playMarryImg" v-if="v.played[0].active && !$parent.stopBet"><img src="../../../assets/images/small01.png"/></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script type="text/babel">
    import $ from 'jquery'

  export default {
	props: {
	  classAdata: { default:'' },
	  oneCredId: { default:'' },
	  officialRebate: { default: '' },
	  personalRebate: { default: '' },
	  sliderValue: { default: '' },
	  marryNum: { default: 10 },
	  creditId: { default: 1 }
	},
	data () {
	  return {
		pcddDataed : [],
		poprpX : 0, //X轴
		poprpY : 0, //Y轴
		selectedBalls : [], //存放数据
		totalMoney: 0,
		playedListCopy: [],
		zodiacData: [],//十二生肖数据
		jsksImgList: [],//江苏快3
		jsksNewData: [],
        thisScrollTop: 0,
        dynamicBalance: '',
        selectedAmount: 0
	  }
	},
	computed: {
	  deafNum : function() {
		if( typeof(this.classAdata) === 'string' || typeof(this.classAdata.played) === 'undefined' ) {
		  return '玩法';
		}else{
		  if (!this.playedListCopy.length) {
			this.playedListCopy = JSON.parse(JSON.stringify(this.classAdata.played[this.oneCredId].item));
		  }

		  for (let i = 0, v; v = this.classAdata.played[this.oneCredId].item[i++];) {
		  	if (!v.play && i < 4) {
			  let vo = v.played[0];
			  v.play = vo;
//			  console.log(JSON.parse(JSON.stringify(v)));
//			  v.played.splice(vo, 1);
			}
		  }

		  return this.classAdata.played[this.oneCredId].item;
		}
	  }
	},
	mounted () {
	  var that = this;
	  that.Colorfulplay();

	  that.$parent.$on('resetChildData', function () {
		that.classAdata.played[that.oneCredId].item = JSON.parse(JSON.stringify(that.playedListCopy));
		that.playedListCopy = [];
		that.selectedBalls = [];
		that.computeOdds({odds: 0});
	  });

      $(window).scroll(function(){
        that.thisScrollTop = $(document).scrollTop();
      });
	},
	methods: {
	  //清空数据
	  initData: function() {

	  },
	  //数据解析
	  Colorfulplay: function () {
		if( typeof(this.classAdata) == 'undefined' ){
		  return
		}else{
		  return this.classAdata
		}
	  },
	  playchecked: function (e,play,playedSubtypeId,playedSubtypeName,index, colorful, domClass,vIndex) {
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
		var _this = this;
		_this.$set(play, 'amount', (play.amount || 0) + (_this.marryNum || 10));
          _this.$set(play, 'oneCredId', _this.oneCredId);
		if (!('active' in play)) {
		  _this.$set(play, 'active', true);
		}else {
		}

		if (play.active) {
		  play['cur_odds'] = _this.computeOdds(play);
		  play['play_sub_group_id'] = playedSubtypeId;
		  play['play_sub_group_name'] = playedSubtypeName;
		  play['colorfulName'] = colorful.name;
		  if (!_this._Util.checkDup(_this.selectedBalls, 'id', play.id)) {
			_this.selectedBalls.push(play);
		  }
		  _this.getTotalMoney(colorful.played);

		}else{
		  _this.selectedBalls.remove(play);
		}
		_this.notifySelectedCount();

          setTimeout(function () {
            if((playedSubtypeName == "上区") || (playedSubtypeName == "中区") || (playedSubtypeName == "下区")){
              _this._Util.chip(_this, e, $('.lotteryTableList:eq(' + vIndex + ') .wheelBigTable .lotteryTableTop'), "", parseInt(_this.thisScrollTop));
            }else if(playedSubtypeName == "大" || playedSubtypeName == "小" || playedSubtypeName == "单" || playedSubtypeName == "双") {
              let playName = "";
              switch (playedSubtypeName) {
                case "大":
                  playName = 0;
                  break;
                case "小":
                  playName = 1;
                  break;
                case "单":
                  playName = 2;
                  break;
                case "双":
                  playName = 3;
                  break;
              }
              _this._Util.chip(_this, e, $('.lotteryTableComputed:eq(' + playName + ')'), "", parseInt(_this.thisScrollTop));
            }else if(playedSubtypeName == "红" || playedSubtypeName == "0" || playedSubtypeName == "黑"){
              let playName = "";
              switch (playedSubtypeName) {
                case "红":
                  playName = 0;
                  break;
                case "0":
                  playName = 1;
                  break;
                case "黑":
                  playName = 2;
                  break;
              }
              _this._Util.chip(_this, e, $('.lotterySpecialColor:eq(' + playName + ')'), "", parseInt(_this.thisScrollTop));
            }else{
                _this._Util.chip(_this, e, $('.lotteryTableList:eq(' + vIndex + ') .wheelBigTable ul li:eq(' + (index-1) + ')') , "", parseInt(_this.thisScrollTop));
              }

          }, 10);

//        setTimeout(function(){
//          $(".pcdd_mun_list ul li").eq(index).removeClass("on");
//          $('.westernFooter_bottom section').eq(1).find('p.on .maryCls').css({
//            "top":"20px",
//            "left":"20px"
//          });
//          var sectionVal = parseFloat($(".pcdd_mun_list ul li").eq(index).find('.smarrySpan').text());
//          if (!('active' in play)) {
//            // play['active'] = true
//            play.active = true;
//            play.amount = sectionVal;
//            //_this.$set(play, 'active', true);
////            _this.$set(play, 'amount', sectionVal);
//          }else {
//            //play.active = !play.active
//          }
//          // if($(".pcdd_mun_list ul li").eq(index).hasClass('on')) {
//          //   $(".pcdd_mun_list ul li").eq(index).removeClass("on");
//          // }else{
//          //   $(".pcdd_mun_list ul li").eq(index).addClass("on");
//          // }
//          if (play.active) {
//            play['cur_odds'] = that.computeOdds(play);
//            play['play_sub_group_id'] = playedSubtypeId
//            play['play_sub_group_name'] = playedSubtypeName;
//            _this.selectedBalls.push(play)
//          }else{
//            _this.selectedBalls.remove(play);
//          }
//          _this   .notifySelectedCount();
//          //$('.playMarryImg').eq(index).trigger('click');
//        },550);
		// var appendHref = require('../../../assets/images/marry_10.png');
		// var appendiMG = '<img src= ' + appendHref + ' class="maryCls"/>';
		// $('.westernFooter_bottom section').eq(1).find('p.on').append(appendiMG);
	  },
	  getAllSelectedBalls() {
		return this.selectedBalls
	  },
	  notifySelectedCount : function() {
		this.$emit('stakeCountChanged',this.selectedBalls.length);
	  },
	  //触发事件
	  triggerEvent : function(e) {

	  },
	  //点击号码选中状态
	  playClickChecked: function() {

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

            for (let i = 0, v; v = o.played[i++];) {
              if (i !== 1) {
                that.totalMoney += (v.amount || 0);
              }
            }
          }
        }

		that.$parent.$refs.headerRef.getHistoryBetMoney(that.totalMoney);
	  }
	},

	watch: {
	  'oneCredId' () {
		this.jsksImgList = [];
		this.jsksNewData = [];
        this.selectedBalls = [];
	  },

        'sliderValue'() {
            for (let i = 0, v; v = this.selectedBalls[i++];) {
                v.cur_odds = this.computeOdds(v);
            }
        }
	}
  }
</script>
