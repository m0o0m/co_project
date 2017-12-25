<template>
  <div v-if="classAdata.lottery_id" class="farmVue">
    <section class="farmGame">
      <div class="farmGameBox">
        <div class="farmGameAnimation clearfix">
          <div id="machine1" class="slotMachine">
            <div v-for="gameImg in gameImgData1" class="machineItem"><img :src="gameImg.url" :title="gameImg.name"/></div>
          </div>
          <div id="machine2" class="slotMachine">
            <div v-for="gameImg in gameImgData2" class="machineItem"><img :src="gameImg.url" :title="gameImg.name"/></div>
          </div>
          <div id="machine3" class="slotMachine">
            <div v-for="gameImg in gameImgData3" class="machineItem"><img :src="gameImg.url" :title="gameImg.name"/></div>
          </div>
        </div>
        <div class="farmGameInfo">
          <ul class="farmGameInfoTitle clearfix">
            <li v-for="(nav, index) in deafNum" @click="selectNav(nav, index)" :class="{'on':index == nav_ndex}" class="floatLeft">{{nav.name}}</li>
          </ul>
          <div class="gamCls">
            <ul class="clearfix">
              <li v-for="(v, index) in items"
                  @click="playchecked($event, v, Colorful.id, v.name, index, Colorful)" :class="{'on':v.active,floatLeft:true}">
                <article class="gameArticle clearfix">
                  <section v-if="v.img" class="gameArtSection floatLeft"><img :src="v.img"/>
                  </section>
                  <section class="floatLeft gameArticleText">
                    <p>{{v.name}}<span>/{{computeOdds(v)}}</span></p>
                    <p :class="{'wheres':v.name == '小型水果' || v.name == '大型水果' || v.name == '中型水果' || v.name == '蔬菜' || v.name == '动物','colorRed':true}" >{{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, v.amount)}}</p>
                    <p class="playMarryImg imggs " v-if="v.active && !$parent.stopBet">
                      <img v-if="!v.active" src="../../../assets/images/small01.png"/>
                      <img v-if="v.active" :src="require('../../../assets/images/marry_' + ((v.chip === 10 || v.chip === 5000) ? v.chip + '_f' : v.chip) + '.png')"/>
                    </p>
                  </section>
                </article>
              </li>
            </ul>
          </div>
        </div>
        <!--<div class="gam-box-change">
          &lt;!&ndash; <div class="gam-progressbar" value="0"><em style="width:0%;"><span class="isbackimg"><b>0%</b></span></em></div> &ndash;&gt;
          &lt;!&ndash;<a href="javascript:;" class="gam-progressbar-cut"><img src="../../../assets/images/farm/bg/btn-cut.png" alt="" title="" /></a>&ndash;&gt;
          &lt;!&ndash;<a href="javascript:;" class="gam-progressbar-add"><img src="../../../assets/images/farm/bg/btn-add.png" alt="" title="" /></a>&ndash;&gt;

          <div class="gambox-fdiv">
            <span class="gam-box-name">返点</span>
            <div class="gam-progressbar-cut" @click="iscut"></div>
            <div class="gam-progressbar-line">
              <p><span class="isbackimg">{{sliderValue}}%</span></p>
            </div>
            <div class="gam-progressbar-add" @click="isadd"></div>
          </div>
        </div>-->
      </div>
    </section>
  </div>
</template>

<script type="text/babel">
	//	import '../../../assets/js/rem.js';
	import '../../../assets/js/openLottery/farm/slotmachine.js';
	import $ from "jquery";
	export default {
		props: {
			classAdata: {default: ''},
			oneCredId: {default: ''},
			officialRebate: {default: ''},
			personalRebate: {default: ''},
			// sliderValue: {default: ''},
			marryNum: {default: 10},
			creditId: {default: 1},
			imgJson: {default: {}}
		},

		data() {
			return {
				gameImgData: [
					{name: "菠萝", url: require('../../../assets/images/farm/0.png')},
					{name: "草莓", url: require('../../../assets/images/farm/9.png')},
					{name: "冬瓜", url: require('../../../assets/images/farm/15.png')},
					{name: "番茄", url: require('../../../assets/images/farm/10.png')},
					{name: "柑橘", url: require('../../../assets/images/farm/14.png')},
					{name: "家犬", url: require('../../../assets/images/farm/19.png')},
					{name: "梨子", url: require('../../../assets/images/farm/11.png')},
					{name: "荔枝", url: require('../../../assets/images/farm/7.png')},
					{name: "榴莲", url: require('../../../assets/images/farm/3.png')},
					{name: "萝卜", url: require('../../../assets/images/farm/16.png')},
					{name: "奶牛", url: require('../../../assets/images/farm/20.png')},
					{name: "南瓜", url: require('../../../assets/images/farm/17.png')},
					{name: "苹果", url: require('../../../assets/images/farm/12.png')},
					{name: "葡萄", url: require('../../../assets/images/farm/6.png')},
					{name: "茄子", url: require('../../../assets/images/farm/18.png')},
					{name: "桃子", url: require('../../../assets/images/farm/13.png')},
					{name: "西瓜", url: require('../../../assets/images/farm/1.png')},
					{name: "椰子", url: require('../../../assets/images/farm/2.png')},
					{name: "樱桃", url: require('../../../assets/images/farm/8.png')},
					{name: "柚子", url: require('../../../assets/images/farm/4.png')},
				],
				gameImgData1: [],
				gameImgData2: [],
				gameImgData3: [],
				gameCreener: -1,
				gameNavTitle: ['大型水果', '中型水果', '小型水果', '蔬菜', '动物'],
				gameNavContent: [
					{
						name: '大型水果',
						data: [
							{
								img: require('../../../assets/images/farm/1.png'),
								name: '西瓜',
								odds: '223.231',
								marry: '0.00'
							},
							{
								img: require('../../../assets/images/farm/1.png'),
								name: '西瓜',
								odds: '223.231',
								marry: '0.00'
							},
							{
								img: require('../../../assets/images/farm/1.png'),
								name: '西瓜',
								odds: '223.231',
								marry: '0.00'
							},
							{
								img: require('../../../assets/images/farm/1.png'),
								name: '西瓜',
								odds: '223.231',
								marry: '0.00'
							},
							{
								img: require('../../../assets/images/farm/1.png'),
								name: '西瓜',
								odds: '223.231',
								marry: '0.00'
							}, {
								img: '',
								name: '西瓜',
								odds: '223.231',
								marry: '0.00'
							}
						]
					},

				],
				items: [],
				Colorful: {},
				poprpX: 0, //X轴
				poprpY: 0, //Y轴
				selectedBalls: [], //存放数据
				totalMoney: 0,
				playedListCopy: [],
				sliderValue: 0,
				one: 0,
				two: 0,
				three: 0,
				resultIndex: 0,
				nav_ndex: 0,
				machine1: null,
				machine2: null,
				machine3: null,
                thisScrollTop: 0,
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
						this.selectNav(this.classAdata.played[this.oneCredId].item[0]);
					}

					return this.classAdata.played[this.oneCredId].item;
				}
			}
		},

		mounted() {
			let that = this;

			that.$parent.$on('resetChildData', function () {
				that.classAdata.played = JSON.parse(JSON.stringify(that.playedListCopy));
				that.selectNav(that.classAdata.played[that.oneCredId].item[0]);
//		that.playedListCopy = [];
//		that.selectedBalls = [];
//		that.computeOdds({odds: 0});
			});
            $(window).scroll(function(){
                that.thisScrollTop = $(document).scrollTop();
            });
			setTimeout(function () {
				$('.gam-progressbar-add').click(function () {
					if ($('.gam-progressbar').attr('value') < 10) {
						$(this).siblings('.gam-progressbar').attr('value', (parseInt($(this).siblings('.gam-progressbar').attr('value')) + 1));
						$(".gam-progressbar b").html($('.gam-progressbar').attr('value') + "0%");
						$(".gam-progressbar em").css("width", $('.gam-progressbar').attr('value') + "0%");
					}
//		  $(this).find("img").attr("src", "static/images/btn-add-active.png");
					setInterval(function () {
						$('.gam-progressbar-add').find("img").attr("src", "static/images/btn-add.png");
					}, 200);
				});
				$('.gam-progressbar-cut').click(function () {
					if ($('.gam-progressbar').attr('value') > 0) {
						$(this).siblings('.gam-progressbar').attr('value', (parseInt($(this).siblings('.gam-progressbar').attr('value')) - 1));
						if ($('.gam-progressbar').attr('value') == 0) {
							$(".gam-progressbar b").html($('.gam-progressbar').attr('value') + "%");
						} else {
							$(".gam-progressbar b").html($('.gam-progressbar').attr('value') + "0%");
						}
						$(".gam-progressbar em").css("width", $('.gam-progressbar').attr('value') + "0%");
					}
					$(this).find("img").attr("src", "static/images/btn-cut-active.png");
					setInterval(function () {
						$('.gam-progressbar-cut').find("img").attr("src", "static/images/btn-cut.png");
					}, 200);
				});
			}, 2000);

			that.randomSortImg();

			setTimeout(function () {
//		console.log(JSON.parse(JSON.stringify(that.classAdata.played[that.oneCredId].item)));
				//that.start();
			}, 2000);
		},
		updated(){
			$("ul.farmGameInfoTitle li").eq(this.nav_index).addClass("on");
		},
		methods: {
			randomSortImg() {
				let that = this;
				let randomSort = (a, b) => {
					return Math.random() > 0.5 ? -1 : 1;
				};

				that.gameImgData1 = JSON.parse(JSON.stringify(that.gameImgData)).sort(randomSort);
				that.gameImgData2 = JSON.parse(JSON.stringify(that.gameImgData)).sort(randomSort);
				that.gameImgData3 = JSON.parse(JSON.stringify(that.gameImgData)).sort(randomSort);
			},


			selectNav(nav, index) {
				this.Colorful = nav;
				this.items = nav.played;
				$("ul.farmGameInfoTitle li").removeClass("on");
				$("ul.farmGameInfoTitle li").eq(index).addClass("on");
				this.nav_index = index;
				for (let v of this.items) {
					console.log('this._Util.getValueByKey(this.imgJson.imgList, v.name, \'picName\') = ' + this._Util.getValueByKey(this.imgJson.imgList, v.name, 'picName'))
					if (v.name !== '大型水果' && v.name !== '中型水果' && v.name !== '小型水果' && v.name !== '蔬菜' && v.name !== '动物') {
						v.img = require('../../../assets/images/farm/' + this._Util.getValueByKey(this.imgJson.imgList, v.name, 'picName') + '.png');
					}
				}
			},
			//增加返点
			isadd () {
				if ((this.sliderValue ) < 8) {
					let that = this;
					that.sliderValue = that.sliderValue + 1;
					var iswid = $('.gam-progressbar-line').width() / 8;
					var iswida = $('.gam-progressbar-line').width() / 16;
					$('.isbackimg').css("left", parseFloat(that.sliderValue * (iswid - 2)));
					if (that.sliderValue == 8) {
						$('.isbackimg').css("left", parseFloat($('.gam-progressbar-line').width() - iswida))
					}
				}
			},
			//减少返点
			iscut () {
				if ((this.sliderValue ) > 0) {
					let that = this;
					that.sliderValue = that.sliderValue - 1;
					var iswid = $('.gam-progressbar-line').width() / 8;
					var iswida = $('.gam-progressbar-line').width() / 16;
					$('.isbackimg').css("left", parseFloat(that.sliderValue * (iswid)));
					if (that.sliderValue == 0) {
						$('.isbackimg').css("left", parseFloat(0 - iswida))
					}
				}
			},
			//数据解析
			Colorfulplay: function () {
				if (typeof(this.classAdata) == 'undefined') {
					return
				} else {
					return this.classAdata
				}
			},

			playchecked: function (e, play, playedSubtypeId, playedSubtypeName, index, colorful, type) {
				e.stopPropagation();
				let that = this;

				if (that._LotteryUtil.pauseSell(that, that.$parent.classAdata.status)) return;
                this.selectedAmount = parseInt($(".westernSectionNum p.on").attr("data-marry"));
                this.dynamicBalance = this.$parent.$refs.headerRef.balanceAmount;
				if (!that._Util.getUserInfo().is_test_player && this._Util.isLogin() && parseInt(this.selectedAmount) > this.dynamicBalance) {
                    this._LotteryUtil.creditLow(this);
					// this._Util.showAlert(this, {content: "余额不足，请充值"});
					// setTimeout(function () {
					// 	that.$router.replace({name: 'addMoney'});
					// }, 1000 * 2);
					return;
				}
				if (this.$parent.stopBet) return;
				if (this._LotteryUtil.lotteryCheckCount(this, this.selectedBalls)) return;
				//获取内容位置
				let height = $(window).height();
				let width = $(window).width();
				let faterLfet = document.getElementsByClassName('gameArticle')[index].offsetLeft;
				let faterTop = document.getElementsByClassName('gameArticle')[index].offsetTop;
				let play_articleHeight = ($('.gameArticle').outerHeight(true)) + 32,
					play_articleWidth = $('.gameArticle').outerWidth(true);
				$('.westernFooter_bottom section').eq(1).find('p.on .maryCls').animate({
					top: 188 || -(height - faterTop - play_articleHeight),
					left: 30 || faterLfet - play_articleWidth
				}, 500);
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
//		 if($(".pcdd_mun_list ul li").eq(index).hasClass('on')) {
//		   $(".pcdd_mun_list ul li").eq(index).removeClass("on");
//		 }else{
//		   $(".pcdd_mun_list ul li").eq(index).addClass("on");
//		 }
				if (play.active) {
					play['cur_odds'] = _this.computeOdds(play);
					play['play_sub_group_id'] = playedSubtypeId
					play['play_sub_group_name'] = playedSubtypeName;
					play['colorfulName'] = colorful.name;
                  play['chip'] =_this.$parent.marryNum;
					if (!_this._Util.checkDup(_this.selectedBalls, 'id', play.id)) {
						_this.selectedBalls.push(play);
					}
//		  _this.getTotalMoney(colorful.played);
					_this.getTotalMoney2();

				} else {
					_this.selectedBalls.remove(play);
				}
				_this.notifySelectedCount();

                setTimeout(function () {
//                      if( _this.nav_ndex == 0  ){

//                    console.log( playedSubtypeName )
                          _this._Util.chip(_this, e, $('.gamCls ul li:eq(' + index + ')'),"",parseInt(_this.thisScrollTop));

//                      }

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
				let that = this;
				that.totalMoney = 0;
				for (let i = 0, v; v = playedList[i++];) {
					that.totalMoney += (v.amount || 0);
				}

				that.$parent.$refs.headerRef.getHistoryBetMoney(that.totalMoney);
			},

			getTotalMoney2: function () {
				let that = this;
				that.totalMoney = 0;
				for (let i = 0, v; v = this.classAdata.played[this.oneCredId].item[i++];) {
					for (let o of v.played) {
						that.totalMoney += (o.amount || 0);
					}
				}

				that.$parent.$refs.headerRef.getHistoryBetMoney(that.totalMoney);
			},
			onComplete: function (first, two, three) {
        $(".slotMachineContainer").css({'margin-top':-$("#machine1 div").eq(1).height()});
				$("#machine1 div").eq(1).css({'margin-bottom': "0"});
				$("#machine2 div").eq(1).css({'margin-bottom': "0"});
				$("#machine3 div").eq(1).css({'margin-bottom': "0"});
				$("#machine1 div").eq(3).css({'margin-bottom': "0.24241rem"}).find("img").css({'width':"1.7rem"});
				$("#machine2 div").eq(3).css({'margin-bottom': "0.24241rem"}).find("img").css({'width':"1.7rem"});
				$("#machine3 div").eq(3).css({'margin-bottom': "0.24241rem"}).find("img").css({'width':"1.7rem"});
    
				$("#machine1 div").eq(2).css({'margin-bottom': "0.24241rem"}).find("img").css({opacity: ".6"});
				$("#machine1 div").eq(4).find("img").css({opacity: "0.6"});
				$("#machine2 div").eq(2).css({'margin-bottom': "0.24241rem"}).find("img").css({opacity: "0.6"});
				$("#machine2 div").eq(4).find("img").css({opacity: "0.6"});
				$("#machine3 div").eq(2).css({'margin-bottom': "0.24241rem"}).find("img").css({opacity: "0.6"});
				$("#machine3 div").eq(4).find("img").css({opacity: "0.6"});
			},
			//获取数据结果中对应的下标周围的一条数据
			match(list){
				console.log(1111111, this.$parent.$refs.headerRef.actionResultCopy);
				let result = [];
				for (let i = 0, v; v = list[i++];) {
					console.log(this.$parent.$refs.headerRef.actionResultCopy.extfield1);
					if (this.$parent.$refs.headerRef.actionResultCopy.extfield1 === v.name) {
						this.resultIndex = i - 1;
						break;
					}
				}
				if (this.resultIndex == list.length - 1) {
					result = result.concat(list.slice(this.resultIndex - 1))
					result.push(list[0]);
					console.log('match-result:', result);
				} else if (this.resultIndex == 0) {
					result = result.concat(list.slice(0, 2))
					result.unshift(list[list.length - 1]);

				} else {
					result = list.slice(this.resultIndex - 1, this.resultIndex + 2);
				}
				console.log("resultIndex:", this.resultIndex);
				return result;
			},
			farm_animate_init(){
				let that = this;

				let resultData1 = that.match(that.gameImgData1);
				let resultData2 = that.match(that.gameImgData2);
				let resultData3 = that.match(that.gameImgData3);
				for (let i = 0; i < 3; i++) {
					that.$set(that.gameImgData1, i, resultData1[i]);
					that.$set(that.gameImgData2, i, resultData2[i]);
					that.$set(that.gameImgData3, i, resultData3[i]);
				}

			},
			start: function () {
        $(".slotMachineContainer").css({'margin-top':-$("#machine1 div").eq(1).height()});
				$(".slotMachineContainer div").attr("style", "");
				$(".slotMachineContainer img").attr("style", "");
				let that = this;
				that.farm_animate_init();
//				console.log("result1:", that.match(that.gameImgData1));
//				console.log("result2:", that.match(that.gameImgData2));
//				console.log("result3:", that.match(that.gameImgData3));
				that.machine1 = $("#machine1").slotMachine({
					active: 0, //默认第一个
					delay: 200,
					randomize: function (activeElementIndex) {
						return that.one;
					}
				});

				that.machine2 = $("#machine2").slotMachine({
					active: 0,//默认第二个
					delay: 200,
					randomize: function (activeElementIndex) {
						return that.two;
					}
				});

				that.machine3 = $("#machine3").slotMachine({
					active: 0,//默认第三个
					delay: 200,
					randomize: function (activeElementIndex) {
						return that.three;
					}
				});
				that.machine1.shuffle(39, this.onComplete);//旋转5次
				that.machine2.shuffle(39, this.onComplete);//旋转5次
				that.machine3.shuffle(39, this.onComplete);//旋转5次
				that._Util.audioPlay(that, {fileName: 'nongchang.mp3', audioPlay: true});
				setTimeout(function () {
					that._Util.audioClose(that);
				},5000);

			}
		},

		watch: {
			'sliderValue'() {
				for (let i = 0, v; v = this.selectedBalls[i++];) {
					v.cur_odds = this.computeOdds(v);
				}
			},
			'$parent.isOpenLottery'(val) {
				let that = this;
				if (!val) return;
				setTimeout(function () {
					that.start();
				}, 1000);
			}

		}
	}
</script>

<style>
  .playMarryImg {
    position: relative;
    opacity:1 !important;
  }
  .playMarryImg.imggs img{
    display: inline-block;
    position: absolute;
    right:0.2rem;
    bottom: 0rem;
    width: 0.8rem;
    height:0.8rem;
  }
  p.wheres {
    width: 100% ;
  }
</style>