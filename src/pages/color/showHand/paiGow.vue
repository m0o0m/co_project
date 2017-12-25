<template>
  <div class="showHand">
    <div class="showHandGow">
      <div class="showHandMargin">
        <div class="showHandNav" v-if="lotteryOffsColorID == 321">
          <ul class="displayFlex">
            <li v-for="(Colorful,item_index) in deafNum" :class="{'on':item_index == ColorfulID}"
                @click="ColorfulFunction(item_index)"><p>{{Colorful.name}}</p></li>
          </ul>
        </div>
        <div v-for="(Colorful,item_index) in deafNum" v-show="item_index == ColorfulID || lotteryOffsColorID == 125 || lotteryOffsColorID == 327" class="showHadPaiGow">
          <!-- <div>{{Colorful.name}}</div> -->
          <div class="showHandLottery">
            <ul v-if="lotteryOffsColorID == 125 || lotteryOffsColorID == 327">
              <li v-for="(play,index) in Colorful.played" :class="{'on': play.active}" class="showHandLi">
                <div @click="playchecked($event,play,Colorful.id,play.name,index, Colorful,'',item_index)" :class="{'on':play.active}" class="showHandList">
                  <article class="showHandArticle">
                    <section>
                      <p>
                        <img v-for="p in jsksImgList" v-if="p.k == play.name" :src="p.v" class="showHandImg" :class="{'intShowHndThree': lotteryOffsColorID == 327 && index < 4 ,'intShowHndFour': lotteryOffsColorID == 327 && index >= 4}"/>
                      </p>
                      <p class="playMarryImg" v-if="play.active && !$parent.stopBet"><img
                          src="../../../assets/images/small01.png" alt=""></p>
                    </section>
                    <section class="displayFlex">
                      <article class="shArticle shArticleFlex">
                        <p><span>{{play.name}}</span></p>
                        <p class="showHandOD"> / <span>{{computeOdds(play)}}</span></p>
                      </article>
                      <article class="shArticle shArticleColor">
                        <p><span class="smarrySpan" :class="{'visibleAmount': $parent.stopBet || play.amount > 0 }">{{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, play.amount) || 0}}</span>
                        </p>
                      </article>
                    </section>
                  </article>
                </div>
              </li>
            </ul>
            <!--整合-->
            <ul v-if="lotteryOffsColorID == 321" class="integrationShowHand">
              <li v-for="(play,index) in Colorful.played" :class="{'on': play.active}">
                <article @click="playchecked($event,play,Colorful.id,play.name,index, Colorful,'',item_index)"  :class="{'on':play.active}" class="intShowHandArticle">
                  <p><span class="intShowHandSpan">{{play.name}}</span><span>{{computeOdds(play)}}</span></p>
                  <p><span class="intShowHndCls" :class="{'visibleAmount': play.amount > 0 || $parent.stopBet}">{{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, play.amount) || 0}}</span>
                  </p>
                  <p class="playMarryImg" v-if="play.active && !$parent.stopBet"><img
                      src="../../../assets/images/small01.png" alt=""></p>
                </article>
              </li>
            </ul>
            <!--龙虎斗-->
            <div class="tigerShowHand" v-for="(Colorfuled,Colorfuled_index) in  ColorFUlillustrating" v-if="lotteryOffsColorID == 329">
              <div class="tigerShowHandTitle">{{Colorfuled.name}}</div>
              <ul class="tigerShowHandList">
                <li v-for="(play,index) in Colorfuled.played"
                    :class="{'on': play.active,'colorfuledLast':lotteryOffsColorID == 329}">
                  <article
                      @click="playchecked($event,play,Colorfuled.id,play.name,index, Colorfuled,'',Colorfuled_index)" :class="{'on':play.active}" class="tigerShowHandOdds">
                    <p><span class="intShowHandSpan">{{play.name}}</span><span>{{computeOdds(play)}}</span></p>
                    <p><span class="intShowHndCls" :class="{'visibleAmount': play.amount > 0 || $parent.stopBet}">{{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, play.amount) || 0}}</span>
                    </p>
                    <p class="playMarryImg" v-if="play.active && !$parent.stopBet"><img
                        src="../../../assets/images/small01.png" alt=""></p>
                  </article>
                </li>
              </ul>
            </div>
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
        ColorfulID: 0,
        ColorFUlillustrating: '',
        dynamicBalance: '',
        selectedAmount: 0,
        lotteryOffsColorIDs: '',
        lotteryOffsColorID: this.$parent.$refs.headerRef.lotteryTypeId,
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
          this.lotteryOffsColorID = this.$parent.$refs.headerRef.lotteryTypeId;
          if (this.lotteryOffsColorID == 125 || this.lotteryOffsColorID == 327) {
            this.jsksImgList = [];
            for (let i = 0, v; v = this.classAdata.played[this.oneCredId].item[i++];) {
              for (let j = 0, o; o = v.played[j++];) {
                console.log('o.name = ' + o.name);
                this.jsksImgList.push({
                  k: o.name,
                  v: require('../../../assets/images/showHand/' + o.id + '.png')
                });
              }
            }
          }
//	        if(this.lotteryOffsColorID == 321 ) {
//		        this.$nextTick(function () {
//			        $(".paiGow_mun_RHeight").css({
//				        "height": _NextHeight - (_headerHeight + _footerHeight + (_NextHeight*0.2))
//			        });
//		        })
//	        }
          this.ColorFUlillustrating = this.classAdata.played[this.oneCredId].item;
          return this.classAdata.played[this.oneCredId].item;
        }
      }
    },
    mounted() {
      let that = this;
      that.Colorfulplay();
      that.lotteryOffsColorID = that.$parent.$refs.headerRef.lotteryTypeId;
      console.log(that.lotteryOffsColorID);
      that.$parent.$on('resetChildData', function () {
        that.classAdata.played = JSON.parse(JSON.stringify(that.playedListCopy));
        that.playedListCopy = [];
        that.selectedBalls = [];
        that.computeOdds({odds: 0});
      });
      
      that.$parent.$on('openLotteryPcdd', (data) => {
        that.isOpenLottery = true;
        that.openLotteryResult = data;
      });
      // that._Util.setCss('.sHGow', {"min-height": 0.78}, "*");
    },
    methods: {
      //清空数据
      initData: function () {
      
      },
      ColorfulFunction(index) {
        this.ColorfulID = index;
        this.colorPlay();
      },
      colorPlay() {
        // var _NextHeight = $(window).height(),
        //   _headerHeight = $(".headered").outerHeight(true),
        //   _footerHeight = $(".westernFooter").outerHeight(true);
        // if (this.lotteryOffsColorID == 321) {
        //   this.$nextTick(function () {
        //     $(".paiGow_mun_RHeight").css({
		     //      "height": _NextHeight - (_headerHeight + _footerHeight + (_NextHeight * 0.2))
	       //    });
        //   })
        // }
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
          //    that.$router.replace({name: 'addMoney'});
          // }, 1000 * 2);
          return;
        }
        if (this.$parent.stopBet) return;
        if (this._LotteryUtil.lotteryCheckCount(this, this.selectedBalls)) return;
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
        //_this.deliverOST(e,index,item_index)
        
        setTimeout(function () {
          if (_this.lotteryOffsColorID == 329) {
            _this._Util.chip(_this, e, $('.tigerShowHand:eq(' + item_index + ') ul li:eq(' + index + ')'));
          } else {
            _this._Util.chip(_this, e, $('.showHadPaiGow:eq(' + item_index + ') .showHandLottery ul li:eq(' + index + ')'));
          }
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
      },
      deliverOST: function (e, index, iteindex) {
        let width = $(window).width();
        let thisDiv = $('.mnshDiv:eq(' + iteindex + ') ul li:eq(' + index + ')');
        let rect = e.target.getBoundingClientRect(),
          offsetX = rect.left + (width / 2.5),
          offsetY = rect.top;
        console.log(offsetX + "," + offsetY);
        let footerImg = $('.westernSectionNum p.on').find("img").attr("src"),
          footerImgPosition = $('.westernSectionNum p.on').find("img");
        let footerPlace = footerImgPosition.clone().offset({
          top: footerImgPosition.offset().top,
          left: footerImgPosition.offset().left
        }).css({
          "position": "absolute",
          "width": "1.2rem",
          "height": "1.2rem",
          "margin-left": "0.5rem",
          "z-index": "1000"
        }).appendTo($('body')).animate({
          top: offsetY + 0,
          left: offsetX + thisDiv.find('.shGow_article').width() - 30,
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
        var _NextHeight = $(window).height(),
          _headerHeight = $(".headered").outerHeight(true),
          _footerHeight = $(".westernFooter").outerHeight(true);
        this.lotteryOffsColorID = this.$parent.$refs.headerRef.lotteryTypeId;
        if (this.lotteryOffsColorID == 321) {
          this.$nextTick(function () {
            $(".paiGow_mun_RHeight").css({
              "height": _NextHeight - (_headerHeight + _footerHeight + (_NextHeight * 0.2))
            });
          })
        } else {
          this.$nextTick(function () {
            $(".paiGow_mun_LHeight").css({
              "height": _NextHeight - (_headerHeight + _footerHeight + (_NextHeight * 0.13))
            });
          })
        }
        
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
  .paiGow_article {
    position: relative;
  }
</style>