<template>
  <div class="pcdd_box tempDivMargin">
    <div class='pcdd'>
      <div class="pcdd_Mian pcdd_Mian_Vh"
           :class="{'happlyCls':creditId == 3, 'cqsscCls': creditId == 6, 'jndCls': creditId == 2,'pcdd_main_height':creditId == 1 && oneCredId != 1}"
           v-if="creditId != 5 && creditId != 4">
        <div class="pcdd_mian_line pcdd_mian_line_ytt" :class="{'jndCls_Line': creditId == 2}">
          <div class="pcdd_mian_lineHeight pcdd_mian_lineHeight_04">
            <div class="pcdd_mianHead">
              <div class="pcdd_mun pcdd_bjpk_mun" v-for="(Colorful,item_index) in deafNum"
                   :class="{'pcdd_mun_pcdd': creditId == 1 || creditId == 2 || creditId == 3 , 'pcdd_num_cqssc': creditId == 6 ,'pcdd_num_istlan': creditId == 6 && $parent.$refs.headerRef.lotteryTypeId == '67','pcdd_num_cqssc_cls': creditId == 6}">
                <div class="pcdd_mun_title">{{Colorful.name}}</div>
                <div class="pcdd_mun_list pcdd_mun_list_bjpk10">
                  <ul :class="{'pcdd_mun_pcddUl': creditId == 2, 'pcdd_mun_xgxlhcUl': creditId == 3 ,'pcdd_mun_cqsscUl': creditId == 6}">
                    <li v-for="(play,index) in Colorful.played" :class="{'on': play.active}">
                      <article class="play_article play_clsWidth"
                               @click="playchecked($event,play,Colorful.id,play.name,index, Colorful,'',item_index)"
                               :class="{'on':play.active}">
                        <section class="indexDisplay" :class="{'jndCls_Display':creditId == 2}">
                          <p :class="{'clsName':creditId == 2,'cqsscCls_Display':creditId == 6}"
                             v-if="creditId != 3 && oneCredId != 2 || creditId == 3 && oneCredId != 2 || creditId == 3 && item_index == 1 || creditId == 6">
                            {{play.name}}</p>
                          <!--../../../assets/images/Zodiac/zodiac01.png-->
                          <p v-if="creditId == 3 && oneCredId == 2 && item_index == 0"><img
                              :src="zodiacData[index]"/></p>
                          <p class="indexFiex" :class="{'cqsscClsP_Display':creditId == 6}">
                            / {{computeOdds(play)}}</p>
                        </section>
                        <section><span
                            class="smarrySpan">{{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, play.amount)}}</span>
                        </section>
                        <section class="playMarryImg conImg"
                                 v-if="play.active && !$parent.stopBet">
                          <img src="../../../assets/images/small01.png" alt="">
                        </section>
                      </article>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="pcdd_mian_padding"></div>
        </div>
      </div>
      <!--北京pk10-->
      <div class="pcdd_Mian pcdd_Mian_bjpk10" v-show="creditId == 5">
        <div class="bjpk_mian">
          <div class="bjpk_mian_padding">
            <div class="bjpk_mun pcdd_bjpk_mun" v-for="(Colorful,item_index) in deafNum">
              <div class="bjpk_mun_title">{{Colorful.name}}</div>
              <div class="bjpk_mun_text bjpk_mun_text_div pcdd_mun_list_bjpk10">
                <ul>
                  <li v-for="(play,index) in Colorful.played" :class="{'on': play.active}">
                    <article class="playbjpk10_article play_clsWidth"
                             @click="playchecked($event,play,Colorful.id,play.name,index, Colorful, 'playbjpk10_article',item_index)"
                             :class="{'on':play.active}">
                      <section class="indexDisplay">
                        <p>{{play.name}}</p>
                        <p class="indexFiex"> / <span>{{computeOdds(play)}}</span></p>
                      </section>
                      <section><span
                          class="smarrySpan">{{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, play.amount)}}</span>
                      </section>
                      <!--@click="triggerEvent($event)"-->
                      <section class="playMarryImg conImg"
                               v-if="play.active && !$parent.stopBet">
                        <img src="../../../assets/images/small01.png" alt="">
                      </section>
                    </article>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="creditId == 4" class="pcdd_Mian shaiCls pcdd_Mian_Vh">
        <div v-if="lotteryOffsColorID == 20" class="pcdd_mian_line">
          <div class="pcdd_mian_lineHeight">
            <div v-for="(Colorful,item_index) in deafNum"
                 :class="{'pcdd_mun_dx': $parent.$refs.headerRef.lotteryTypeId == 20}"
                 class="pcdd_mun pcdd_muns">
                <div :class="jsksDivCss[item_index]">
                <ul class="lotteryUl">
                  <li v-if="$parent.$refs.headerRef.lotteryTypeId == 20" v-for="(play,index) in Colorful.played"
                      :class="{'on': play.active}" id="dxgbstyle">
                    <article
                        @click="playchecked($event,play,Colorful.id,play.name,index, Colorful, 'play_article_ks',item_index)"
                        class="play_article_ks" :class="{'on':play.active}">
                      <div style="overflow: visible">
                        <section class="tit-t" style="overflow: visible">
                          <p v-if="play.name == '全骰' || play.name == '大' || play.name == '小'">
                            {{play.name}}
                          </p>
                          <p class="tt-p1">
                            <img v-for="p in jsksImgList" v-if="p.k == play.name"
                                 :src="p.v"/>
                          </p>
                          <p v-if="lotteryOffsColorID != 20">{{play.name}}</p>
                          <p class="tt-p3">/ {{computeOdds(play)}}</p>
                          <p class="playMarryImg jsksImg" :class="{'bigs': index == 0 }"
                             v-if="play.active && !$parent.stopBet"><img src="../../../assets/images/small01.png"
                                                                         alt=""></p>
                        </section>
                      </div>
                      <div class="tit-t2" style=" margin-top: 0.45rem">
                        <p class="playfeet"><span
                            class="smarrySpan" style="font-size: 0.55rem;">{{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, play.amount)}}</span>
                        </p>
                        <!--<p class="playImg" v-if="play.active && !$parent.stopBet"><img src=""/></p>-->
                      </div>
                    </article>
                  </li>
                </ul>
              </div>
            </div>
          
          </div>
        </div>
        
        <div v-else class="pcdd_mian_line">
          <div class="pcdd_mian_lineHeight">
            <div v-for="(Colorful,item_index) in deafNum" :class="{'pcdd_mun_dx': $parent.$refs.headerRef.lotteryTypeId == 20}"
                 class="pcdd_mun pcdd_munss">
              <!--<div class="pcdd_mun_title">{{Colorful.name}}</div>-->
              <div class="pcdd_mun_list">
                <ul class="lotteryUls">
                  <li v-for="(play,index) in Colorful.played" :class="{'on': play.active}"
                      id="cdpstyle">
                    <article
                        @click="playchecked($event,play,Colorful.id,play.name,index, Colorful, 'play_article_ks',item_index)"
                        class="play_article_ks"
                        :class="{'on':play.active}">
                      <div style="overflow: visible">
                        <section class="tit-t">
                          <p class="tt-p1">
                            <img v-for="p in jsksImgList"
                                 v-if="p.k == ($parent.$refs.headerRef.lotteryTypeId == 22 ? 'ds' : '') + play.name"
                                 :class="{jsk_point:$parent.$refs.headerRef.lotteryTypeId != 22}"
                                 :src="p.v"/>
                          </p>
                          <p class="tt-p2" v-if="creditId == 4 && $parent.$refs.headerRef.lotteryTypeId != 20">
                            {{play.name}}</p>
                          <p class="tt-p3"> / {{computeOdds(play)}}</p>
                        </section>
                      </div>
                      <div class="tit-t2">
                        <p class="playfeet">
                          <span>{{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, play.amount)}}</span>
                        </p>
                        <p class="playMarryImg common" v-if="play.active && !$parent.stopBet"><img
                            src="../../../assets/images/small01.png" alt=""></p>
                      </div>
                    </article>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="paiGow_padding"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  
  export default {
    name: 'pcdd',
    props: {
      classAdata: {default: ''},
      oneCredId: {default: ''},
      officialRebate: {default: ''},
      personalRebate: {default: ''},
      sliderValue: {default: ''},
      marryNum: {default: 10},
      creditId: {default: 1},
      whetherNumber: {default: 0}
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
        jsksDivCss: ['jsksDivCss1', 'jsksDivCss2', 'jsksDivCss3', 'jsksDivCss4', 'jsksDivCss5'],
        whetherNumberPcdd: 0,
        balls: [],
        speed: 2,
        // 当前投注坐标
        target: {x: 0, y: 0},
        dynamicBalance: '',
        selectedAmount: 0,
	      lotteryOffsColorID:0
      }
    },
    computed: {
      deafNum: function () {
        if (typeof(this.classAdata) == 'string' || typeof(this.classAdata.played) == 'undefined') {
          return '玩法'
        } else {
          if (!this.playedListCopy.length) {
            this.playedListCopy = JSON.parse(JSON.stringify(this.classAdata.played));
          }
          this.whetherNumberPcdd = this.whetherNumber;
          //十二生肖
          if (this.creditId == 3 && this.oneCredId == 2) {
            this.zodiacData = [];
            var dataCls = this.classAdata.played[2].item[0]
            var len = dataCls.played.length,
              str = "";
            for (var i = 0; i < len; i++) {
              var name = dataCls.played[i].name;
              switch (name) {
                case '鼠':
                  str = require('../../../assets/images/Zodiac/zodiac01.png');
                  break;
                case '牛':
                  str = require('../../../assets/images/Zodiac/zodiac02.png');
                  break;
                case '虎':
                  str = require('../../../assets/images/Zodiac/zodiac03.png');
                  break;
                case '兔':
                  str = require('../../../assets/images/Zodiac/zodiac04.png');
                  break;
                case '龙':
                  str = require('../../../assets/images/Zodiac/zodiac05.png');
                  break;
                case '蛇':
                  str = require('../../../assets/images/Zodiac/zodiac06.png');
                  break;
                case '马':
                  str = require('../../../assets/images/Zodiac/zodiac07.png');
                  break;
                case '羊':
                  str = require('../../../assets/images/Zodiac/zodiac08.png');
                  break;
                case '猴':
                  str = require('../../../assets/images/Zodiac/zodiac09.png');
                  break;
                case '鸡':
                  str = require('../../../assets/images/Zodiac/zodiac10.png');
                  break;
                case '狗':
                  str = require('../../../assets/images/Zodiac/zodiac11.png');
                  break;
                case '猪':
                  str = require('../../../assets/images/Zodiac/zodiac12.png');
                  break;
              }
              this.zodiacData.push(str);
            }
          }
          
          //江苏快3
          if (this.creditId === 4 && !this.jsksNewData.length) {
            this.jsksImgList = [];
            this.jsksNewData = [];
	          this.lotteryOffsColorID = this.$parent.$refs.headerRef.lotteryTypeId ;
            if (!this.oneCredId && parseInt(this.$parent.$refs.headerRef.lotteryTypeId) === 20) {
              this.jsksNewData.push(JSON.parse(JSON.stringify(this.classAdata.played[0].item[1])));
              this.jsksNewData.push(JSON.parse(JSON.stringify(this.classAdata.played[0].item[0])));
              
              var tempObj = this.jsksNewData[1];
              for (var i = 0, v; v = tempObj.played[i++];) {
                if (v.name === '大' || v.name === '小') {
                  this.jsksNewData.push({
                    id: tempObj.id,
                    name: tempObj.name,
                    played: [v]
                  });
                  i--;
                  tempObj.played.splice(i, 1);
                }
              }
            } else {
              
              this.jsksNewData = this.jsksNewData.concat(this.classAdata.played[this.oneCredId].item);
            }
            // if(parseInt(this.$parent.$refs.headerRef.lotteryTypeId) !== 20){
            var kName = parseInt(this.$parent.$refs.headerRef.lotteryTypeId) === 22 ? 'ds' : '';
            console.log('kName = ', kName)
            for (var i = 0, v; v = this.jsksNewData[i++];) {
              for (var j = 0, o; o = v.played[j++];) {
                if (o.name === '小' || o.name === '大' || o.name === '全骰') continue;
                this.jsksImgList.push({
                  k: kName + o.name,
                  v: require('../../../assets/images/jsks/' + kName + o.name + '.png')
                });
              }
            }
            // }

//            this.playedListCopy = JSON.parse(JSON.stringify(this.jsksNewData));
          }
          return this.creditId === 4 && !this.oneCredId ? this.jsksNewData : this.classAdata.played[this.oneCredId].item;
        }
      }
    },
    mounted() {
      var that = this;
	    console.log(that.oneCredId);
	    console.log(that.oneCredId);
	    console.log(that.oneCredId);
      that.Colorfulplay();
	    this.lotteryOffsColorID = this.$parent.$refs.headerRef.lotteryTypeId ;
      that.$parent.$on('resetChildData', function () {
        that.classAdata.played = JSON.parse(JSON.stringify(that.playedListCopy));
        that.playedListCopy = [];
        that.selectedBalls = [];
        that.jsksNewData = [];
        that.computeOdds({odds: 0});
      });
      
//      $(".pcdd_Mian").css({
//        "min-height": $(window).height() * 0.78,
//        "padding-bottom": $(window).height() * 0.16,
//      })
      that._Util.setCss('.pcdd_Mian',{"min-height": 0.78,"padding-bottom":0.16},"*");
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
      playchecked: function (e, play, playedSubtypeId, playedSubtypeName, index, colorful, articleName, iteindex) {
        e.stopPropagation();
        let that = this;
	      if (that._LotteryUtil.pauseSell(that, that.$parent.classAdata.status)) return;
        this.selectedAmount = parseInt($(".westernSectionNum p.on").attr("data-marry"));
        this.dynamicBalance = this.$parent.$refs.headerRef.balanceAmount;
        if (this._Util.isLogin() && parseInt(this.selectedAmount) > this.dynamicBalance) {
          this._LotteryUtil.creditLow(this);
          // this._Util.showAlert(this, {content: "余额不足，请充值"});
          // setTimeout(function () {
	       //    that.$router.push({name: 'addMoney'});
          // }, 1000 * 2);
          return;
        }
       if (this.$parent.stopBet) return;
        if (this._LotteryUtil.lotteryCheckCount(this, this.selectedBalls)) return;
        var _this = this;
        _this.$set(play, 'amount', (play.amount || 0) + (_this.marryNum || 10));
        _this.$set(play, 'oneCredId', _this.oneCredId);
        if (!('active' in play)) {
          _this.$set(play, 'active', true);
        } else {
        }
        if (play.active) {
          play['cur_odds'] = _this.computeOdds(play);
          play['play_sub_group_id'] = playedSubtypeId
          play['play_sub_group_name'] = playedSubtypeName;
          play['colorfulName'] = colorful.name;
          if (!_this._Util.checkDup(_this.selectedBalls, 'id', play.id)) {
            _this.selectedBalls.push(play);
          }
          //_this.selectedBalls.push(play)
          _this.getTotalMoney(colorful.played);
          
        } else {
          _this.selectedBalls.remove(play);
        }
        _this.notifySelectedCount();
        setTimeout(function () {
          let className = '';
          if (_this.creditId === 4) {
            if (_this.lotteryOffsColorID != 20) {
              _this._Util.chip(_this, e, $('.pcdd_munss:eq(' + iteindex + ') ul.lotteryUls li:eq(' + index + ')'));
            } else {
              _this._Util.chip(_this, e, $('.pcdd_muns:eq(' + iteindex + ') ul.lotteryUl li:eq(' + index + ')'));
            }
          } else {
            _this._Util.chip(_this, e, $('.pcdd_bjpk_mun:eq(' + iteindex + ') .pcdd_mun_list_bjpk10 ul li:eq(' + index + ')'));
          }
        }, 10);
        // this.deliverOST(e,index,iteindex);
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
        var odds = ((((parseFloat(ball.odds_base) - parseFloat(ball.odds)) / this.officialRebate * this.personalRebate + parseFloat(ball.odds) - (parseFloat(ball.odds_base) - parseFloat(ball.odds)) * this.sliderValue / this.officialRebate) / parseFloat(ball.odds_base)) * ball.odds_base).toFixed(3);
        /*var odds = (((parseFloat(ball.odds) - parseFloat(ball.odds_base)) / this.officialRebate * this.personalRebate + parseFloat(ball.odds_base) - (parseFloat(ball.odds) - parseFloat(ball.odds_base)) * this.sliderValue / this.officialRebate) / parseFloat(ball.odds)) * ball.odds */
        //return Math.floor(odds*1000)/1000
        return odds
      },
      
      getTotalMoney: function (playedList) {
        let that = this;
        that.totalMoney = 0;
        
        let arr = that.creditId === 4 && (this.oneCredId !== -1) ? that.jsksNewData : that.classAdata.played[that.oneCredId].item;
        for (let i = 0, v; v = arr[i++];) {
          for (let j = 0, o; o = v.played[j++];) {
            that.totalMoney += (o.amount || 0);
          }
        }

        that.$parent.$refs.headerRef.getHistoryBetMoney(that.totalMoney);
      },
    },

    watch: {
      'oneCredId'() {
        this.jsksImgList = [];
        this.jsksNewData = [];
        this.selectedBalls = [];
	      this.lotteryOffsColorID = this.$parent.$refs.headerRef.lotteryTypeId ;
        if (this.creditId === 1 || this.creditId === 2) {
          this.classAdata.played = JSON.parse(JSON.stringify(this.playedListCopy));
        }
      },
      'whetherNumber'() {
        console.log('this.whetherNumber = ' + this.whetherNumber)
        this.whetherNumberPcdd = this.whetherNumber;
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
  /*.pcdd_box{*/
  /*overflow-y: scroll;*/
  /*}*/
  .pcdd_main_height {
    padding-bottom: 0 !important;
  }

</style>
