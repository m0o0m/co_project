<template>
  <div class="theLotteryMa">
    <div class="theLotteryBabel">
      <div class="theLotteryMaTitle positionFixed">
        <ul class="theLotteryMaTitleSwim displayFlex">
          <li v-for="swim in swimTitleData">{{swim}}</li>
        </ul>
      </div>
      <div class="theLotterySwim displayFlex">
        <div class="theLotteryColorFul" v-for="(Colorful,item_index) in deafNum">
          <ul class="theLotterySwimUl theLotterySwimUlColor">
            <li v-for="(play,index) in Colorful.played"
                @click="playchecked($event,play,Colorful.id,play.name,index, Colorful, 0, item_index)"
                :class="{'on':play.active}"
                class="theLotterySwimArticle">
              <p><span>{{play.name}}</span> / <span>{{computeOdds(play)}}</span></p>
              <p><span><span class="smarrySpan">{{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, play.amount)}}</span></span></p>
              <p class="playMarryImg" v-if="play.active && !$parent.stopBet"><img src="../../../assets/images/small01.png"/></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
	import $ from 'jquery'

	export default {
		props: {
			classAdata: {default: ''},
			oneCredId: {default: ''},
			officialRebate: {default: ''},
			personalRebate: {default: ''},
			sliderValue: {default: ''},
			marryNum: {default: 10},
			creditId: {default: 1}
		},
		data() {
			return {
				pcddDataed: [],
				poprpX: 0, //X轴
				poprpY: 0, //Y轴
				selectedBalls: [], //存放数据
				totalMoney: 0,
				playedListCopy: [],
				zodiacData: [],//十二生肖数据
				jsksImgList: [],//江苏快3
				jsksNewData: [],
				thebankerFun: [require('../../../assets/images/men01.png'), require('../../../assets/images/men02.png'), require('../../../assets/images/men03.png'), require('../../../assets/images/men04.png')],
				swimTitleData: ['金牌','银牌','铜牌'],
              	dynamicBalance: '',
              	selectedAmount: 0
			}
		},

		computed: {
			deafNum: function () {
				if (typeof(this.classAdata) === 'string' || typeof(this.classAdata.played) === 'undefined') {
					return '玩法';
				} else {
					if (!this.playedListCopy.length) {
						this.playedListCopy = JSON.parse(JSON.stringify(this.classAdata.played));
					}

//          if (this.oneCredId !== 2) {
//            this.jsksImgList = [];
//
//            for (let i = 0, v; v = this.classAdata.played[this.oneCredId].item[i++];) {
//              for (let j = 0, o; o = v.played[j++];) {
//                this.jsksImgList.push({
//                  k: o.name,
//                  v: require('../../../assets/images/pknn/' + o.name + '.png')
//                });
//              }
//            }
//          }

					return this.classAdata.played[this.oneCredId].item;
				}
			}
		},
		mounted() {
			let that = this;
			that.Colorfulplay();

			that.$parent.$on('resetChildData', function () {
				that.classAdata.played = JSON.parse(JSON.stringify(that.playedListCopy));
				that.playedListCopy = [];
				that.selectedBalls = [];
				that.computeOdds({odds: 0});
			});
		},
		methods: {
			//清空数据
			initData: function () {

			},
			//数据解析
			Colorfulplay: function () {
				if (typeof(this.classAdata) == 'undefined') {
					return
				} else {
					return this.classAdata
				}
			},
			playchecked: function (e, play, playedSubtypeId, playedSubtypeName, index, colorful, type, itemIndex) {
				e.stopPropagation();
              this.selectedAmount = parseInt($(".westernSectionNum p.on").attr("data-marry"));
              this.dynamicBalance = this.$parent.$refs.headerRef.balanceAmount;
				let that = this;
				if (that._LotteryUtil.pauseSell(that, that.$parent.classAdata.status)) return;
				if (!that._Util.getUserInfo().is_test_player && this._Util.isLogin() && parseInt(this.selectedAmount) > this.dynamicBalance) {
                    this._LotteryUtil.creditLow(this);
					// this._Util.showAlert(this, {content: "余额不足，请充值"});
					// setTimeout(function () {
					// 	that.$router.replace({name: 'addMoney'});
					// }, 1000 * 2);
					return;
				}
              if (this.$parent.stopBet) return;
                if (this._LotteryUtil.lotteryCheckCount(this,this.selectedBalls)) return;
				//获取内容位置
				let height = $(window).height();
				let width = $(window).width();
//				let faterLfet = document.getElementsByClassName(!type ? "paiGow_article" : 'paiFirst_article')[index].offsetLeft;
//				let faterTop = document.getElementsByClassName(!type ? "paiGow_article" : 'paiFirst_article')[index].offsetTop;
//				let play_articleHeight = ($('.' + !type ? "paiGow_article" : 'paiFirst_article').outerHeight(true)) + 32,
//					play_articleWidth = $('.' + !type ? "paiGow_article" : 'paiFirst_article').outerWidth(true);
//				$('.westernFooter_bottom section').eq(1).find('p.on .maryCls').animate({
//					top: 188 || -(height - faterTop - play_articleHeight),
//					left: 30 || faterLfet - play_articleWidth
//				}, 500);
//        $(".pcdd_mun_list ul li").eq(index).addClass("on");
				let _this = this;
				_this.$set(play, 'amount', (play.amount || 0) + (_this.marryNum || 10));
                _this.$set(play, 'oneCredId', _this.oneCredId);
//        let sectionVal = parseFloat($(".pcdd_mun_list ul li").eq(index).find('.smarrySpan').text());
				if (!('active' in play)) {
					// play['active'] = true
//          play.active = true;
//          play.amount = sectionVal;
					_this.$set(play, 'active', true);
//            _this.$set(play, 'amount', sectionVal);
				} else {
					//play.active = !play.active
				}
				// if($(".pcdd_mun_list ul li").eq(index).hasClass('on')) {
				//   $(".pcdd_mun_list ul li").eq(index).removeClass("on");
				// }else{
				//   $(".pcdd_mun_list ul li").eq(index).addClass("on");
				// }
				if (play.active) {
					play['cur_odds'] = _this.computeOdds(play);
					play['play_sub_group_id'] = playedSubtypeId
					play['play_sub_group_name'] = playedSubtypeName;
					play['colorfulName'] = colorful.name;
				  if (!_this._Util.checkDup(_this.selectedBalls, 'id', play.id)) {
					_this.selectedBalls.push(play);
				  }
					_this.getTotalMoney(colorful.played);

				} else {
					_this.selectedBalls.remove(play);
				}
				_this.notifySelectedCount();
              setTimeout(function () {
                _this._Util.chip(_this, e, $('.theLotteryColorFul:eq(' + itemIndex + ') ul li:eq(' + index + ')'));
              }, 10);
			},
			getAllSelectedBalls() {
				return this.selectedBalls
			},
			notifySelectedCount: function () {
				this.$emit('stakeCountChanged', this.selectedBalls.length);
			},
			//触发事件
			triggerEvent: function (e) {

			},
			//点击号码选中状态
			playClickChecked: function () {

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
			}
		},

		watch: {
			'oneCredId'() {
				this.jsksImgList = [];
				this.jsksNewData = [];
              this.selectedBalls = [];
				this.classAdata.played = JSON.parse(JSON.stringify(this.playedListCopy));
			},

            'sliderValue'() {
                for (let i = 0, v; v = this.selectedBalls[i++];) {
                    v.cur_odds = this.computeOdds(v);
                }
            }
		}
	}
</script>

<style>
	.swim {
		height: 100%;
		width: 100%;
		background: url("../../../assets/images/swim/bg/bg.png") center top no-repeat; background-size: 100% auto;
	}

	.swim_div {
		background: #b72936;
		color:#000;
	}
	.swimTitle p{
		color:#000;
	}
	.swimTitle {
		background:  #DCB976 ;

	}
	.swimMdiv {
		box-sizing: border-box;
		display: flex;
		margin-bottom:20px;
	}
	.jkl {
		flex:1;
		box-sizing: border-box;
		text-align: center;
		float: left;
		background:  #DCB976 ;
		margin-bottom:50px;
	}
	.swim_ul {
		background:  none ;
	}
	.swim_ul li {
		/* border-bottom: 1px solid #000; */
		/* border-right: 1px solid #000; */
		text-align: left;
		color:#000;
	}


	.swimMdiv div.jkl:nth-child(2) .swim_ul li {
		border-right: 1px solid #000;
		border-left: 1px solid #000;
		border-bottom: 1px solid #000;
	}
	.swimMdiv div.jkl:nth-child(1) .swim_ul li {
		border:none;
		border-bottom: 1px solid #000;
	}
	.swimMdiv div.jkl:nth-child(3) .swim_ul li {
		border:none;
		border-bottom: 1px solid #000;
	}

</style>