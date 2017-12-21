<style>
    .swim {
        height: 100%;
        width: 100%;
        /* margin: 280px auto; */
        background: rgb(13,55,114);
    }

    .swim_div {
        background: #b72936;
    }

    .jkl {
        width: 33.333%;
        text-align: center;
        float: left;
        background: #b72936;
    }

    .swim_ul {
        border: 1px solid #000;
        background: #b72936;
        border-right: none;
    }

    .swim_ul li {
        border-bottom: 1px solid #000;
        text-align: left;
		position: relative;
    }
	.swim_ul li .playMarryImg {
		width: 0.82759rem; position: absolute; top: 0.2rem; right: 0;
	}

    .swim_ul li:last-child {
        border-bottom: none;
    }
</style>

<template>
    <div class='swim moneyTemplateed'>
        <div class="swimMian">
			<div class="swimTitle swimTitleed">
				<p v-for="swimt in swimTitleData">{{swimt}}</p>
			</div>
			<div class="swimMun swimMun_top_height">
				<div class="swimMdiv">
					<div v-for="(Colorful,item_index) in deafNum" class="jkl">
						<!-- <p class="swimjkl">{{!item_index ? '金牌' : item_index == 1 ? '银牌' : '铜牌'}}</p> -->
						<ul class="swim_ul">
							<li v-for="(play,index) in Colorful.played"
								@click="playchecked($event,play,Colorful.id,play.name,index, Colorful, 0, item_index)"
								:class="{'on':play.active}"
								class="paiGow_article">
								<p><span>{{play.name}}</span> / <span>{{computeOdds(play)}}</span></p>
								<p><span><span class="smarrySpan">{{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, play.amount)}}</span></span></p>
								<p class="playMarryImg" v-if="play.active && !$parent.stopBet"><img src="../../../assets/images/small01.png"/></p>
							</li>
						</ul>
					</div>
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
				swimTitleData: ['冠军','亚军','季军'],
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
			playchecked: function (e, play, playedSubtypeId, playedSubtypeName, index, colorful, type, item_index) {
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
				//_this.deliverOST(e,index,item_index);
                setTimeout(function () {
                    _this._Util.chip(_this, e, $('.jkl:eq(' + item_index + ') ul li:eq(' + index + ')'));
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
//				let that = this;
//				that.totalMoney = 0;
//				for (let i = 0, v; v = playedList[i++];) {
//					that.totalMoney += (v.amount || 0);
//				}
//
//			  that.$parent.$refs.headerRef.getHistoryBetMoney(that.totalMoney);
			},
			deliverOST : function(e,index,iteindex) {
				let width = $(window).width();
				let thisDiv = $('.jkl:eq(' + iteindex + ') ul li:eq(' + index + ')');
				let rect = e.target.getBoundingClientRect(),
					offsetX = rect.left+(width/3.5),
					offsetY = rect.top;
					console.log(offsetX+","+offsetY);
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
				left: offsetX + thisDiv.find('.paiGow_article').width()- 30 ,
				width: "1.2rem",
				height: "1.2rem"
				}, 500, function () {
				thisDiv.find(".playMarryImg").html('');
				thisDiv.find(".playMarryImg").append('<img src="' + footerImg + '" alt="" title="">');
				$(this).detach();
				});
			}
		},

		watch: {
			'oneCredId'() {
				this.jsksImgList = [];
				this.jsksNewData = [];
              this.selectedBalls = [];
				this.classAdata.played = JSON.parse(JSON.stringify(this.playedListCopy));
				$('.playMarryImg').each(function(){
					$(this).html('');
				})
			},

			'sliderValue'() {
			    for (let i = 0, v; v = this.selectedBalls[i++];) {
			        v.cur_odds = this.computeOdds(v);
				}
 			}

		}
	}
</script>
