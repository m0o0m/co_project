<template>
    <div class="ColorLotteryMuned">
        <div class="ColorLottery_mianTop"><img :src="ColorImgTop"/></div>
        <div class="ColorLottery_mian">
            <div class="ColorLottery_mcontent" v-for="(lotData,index) in deafNum">
                <div class="ColorLottery_mcTitle"><p>{{lotData.name}}</p></div>
                <div class="ColorLottery_mslist">
                    <ul :class="{'ColorLotCs': lotteryOffsColorID == '202' || lotteryOffsColorID == '213'}">
                        <li v-for="(lData,lData_index) in lotData.played">
                            <article @click="playchecked($event, lData, lotData.id, lData.name, index, lotData, 'ColorLot_article', lData_index)"
                                     class="ColorLot_article">
                                <section>
                                    <p><span>{{lData.name}}</span> / {{computeOdds(lData)}}</p>
                                    <p style="color: #666;" :class="{'amount':lData.amount > 0 || $parent.stopBet}">
                                        {{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, lData.amount) || '0'}}
                                    </p>
                                    <p class="playMarryImg" v-if="lData.active && !$parent.stopBet">  <img src="../../../assets/images/small01.png" alt=""></p>

                                </section>
                            </article>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="ColorLottery_mianBottom"><img :src="ColorImgBottom"/></div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    props: {
        classAdata: { default:'' },
        oneCredId: { default: 0 },
        officialRebate: {default: ''},
        personalRebate: {default: ''},
        sliderValue: {default: ''},
	  marryNum: {default: 10}
    },
    data() {
        return {
            ColorImgTop: require('../../../assets/images/theColor/Group2xTop.png'),
            ColorImgBottom: require('../../../assets/images/theColor/Group2xBottm.png'),
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
		  selectedBalls: [],
		  totalMoney: 0,
          thisScrollTop: 0,
          dynamicBalance: '',
          selectedAmount: 0,
            lotteryOffsColorID: ""
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
    },
    methods: {
	  playchecked: function (e, play, playedSubtypeId, playedSubtypeName, index, colorful, className, lData_index) {
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
		  if (!_this._Util.checkDup(_this.selectedBalls, 'id', play.id)) {
			_this.selectedBalls.push(play);
		  }
		  _this.getTotalMoney(colorful.played);

		} else {
		  _this.selectedBalls.remove(play);
		}
		_this.notifySelectedCount();

		setTimeout( function(){
              _this._Util.chip(_this, e, $('.ColorLottery_mcontent:eq(' + index + ') .ColorLottery_mslist ul li:eq(' + lData_index + ')'),"",parseInt(_this.thisScrollTop));

          }, 10 );

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
        'oneCredId'() {
          this.selectedBalls = [];
            this.classAdata.played = JSON.parse(JSON.stringify(this.playedListCopy));
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