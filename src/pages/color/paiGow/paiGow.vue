<template>
  <div class='pcdd'>
    <div class="paiGow hxpjGow hxpjGow_paiGow paiGow_sHGow">
      <div class="paiGow_mian_top" style="left: 0;"><img src="../../../assets/images/paiGow/bck/bg01.png"/></div>
      <div class="paiGow_mian paiGow_mian_hxpj">
        <div>
          <div class=" paiGow_mun_paiGows " v-for="(Colorful,item_index) in deafNum" v-if="lotteryOffsColorID != 137">
            <!-- <div>{{Colorful.name}}</div> -->
            <div class="paiGow_mun paiGow_mun_paiGow " :class="{'pknn_mun_LHeight': oneCredId != 4 }">
              
              <ul>
                <li v-for="(play,index) in Colorful.played" :class="{'on': play.active}">
                  <article @click="playchecked($event,play,Colorful.id,play.name,index, Colorful,'',item_index)"
                           :class="{'on':play.active}"
                           class="paiGow_article paiGow_article_play indexDisplay">
                    <section>
                      <p>
                        <img v-for="p in jsksImgList" v-if="p.k == play.name" :src="p.v"/>
                      </p>
                      <!--../../../assets/images/Zodiac/zodiac01.png-->
                      <!-- <p><img :src="zodiacData[index]"/></p> -->
                    </section>
                    <section class="indexFiex" style="overflow: visible">
                      <p>{{play.name}}</p>
                      <p> / {{computeOdds(play)}}</p>
                      <p><span class="smarrySpan">{{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, play.amount)}}</span></p>
                      <p class="playMarryImg" v-if="play.active && !$parent.stopBet"><img
                          src="../../../assets/images/small01.png"/></p>
                    </section>
                    <!--@click="triggerEvent($event)"-->
                  </article>
                </li>
              </ul>
            </div>
          </div>
          <div class="paiGow_munFirst" v-if="lotteryOffsColorID == 137">
            <section class="paiGow_munFirst_section"><img :src="thebankerFun[0]"/></section>
            <section>
              <article class="paiFirst_Figrue"><img :src="thebankerFun[3]"/></article>
              <article class="paiFirst_article" v-for="(play,index) in deafNum[1].played"
                       @click="playchecked($event,play,deafNum[1].id,play.name,index, deafNum[1], true)"
                       :class="{'on': play.active}">
                <p>{{play.name}}</p>
                <p> / {{computeOdds(play)}}</p>
                <p>
                  <span class="smarrySpan">{{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, play.amount)}}</span>
                </p>
                <p class="playMarryImg" v-if="play.active && !$parent.stopBet"><img
                    src="../../../assets/images/small01.png"/></p>
              </article>
            </section>
            <section :class="{'ispas': lotteryOffsColorID == '137'}" style="position: absolute; bottom: 1rem; padding: 0;">
              <article class="paiFirst_Figrue"><img :src="thebankerFun[2]"/></article>
              <article class="paiFirst_article" v-for="(play,index) in deafNum[2].played"
                       @click="playchecked($event,play,deafNum[2].id,play.name,index, deafNum[2], true)"
                       :class="{'on': play.active}">
                <p>{{play.name}}</p>
                <p> / {{computeOdds(play)}}</p>
                <p>
                  <span class="smarrySpan">{{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, play.amount)}}</span>
                </p>
                <p class="playMarryImg" v-if="play.active && !$parent.stopBet"><img
                    src="../../../assets/images/small01.png"/></p>
              </article>
            </section>
            <section>
              <article class="paiFirst_Figrue"><img :src="thebankerFun[1]"/></article>
              <article class="paiFirst_article" v-for="(play,index) in deafNum[0].played"
                       @click="playchecked($event,play,deafNum[0].id,play.name,index, deafNum[0], true)"
                       :class="{'on': play.active}">
                <p>{{play.name}}</p>
                <p> / {{computeOdds(play)}}</p>
                <p>
                  <span class="smarrySpan">{{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, play.amount)}}</span>
                </p>
                <p class="playMarryImg" v-if="play.active && !$parent.stopBet"><img
                    src="../../../assets/images/small01.png"/></p>
              </article>
            </section>
          </div>
        </div>
      </div>
      <div class="paiGow_mian_top" style="left: 0;"><img src="../../../assets/images/paiGow/bck/bg03.png"/></div>
    </div>
    <!--<div class="paiGow_padding"></div>-->
  </div>

</template>
<script type="text/babel">
  import $ from 'jquery'
  
  export default {
    name: 'paiGow',
    props: {
      classAdata: {default: ''},
      oneCredId: {default: ''},
      officialRebate: {default: ''},
      personalRebate: {default: ''},
      sliderValue: {default: ''},
      marryNum: {default: 10},
      creditId: {default: 1},
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
        dynamicBalance: '',
        selectedAmount: 0,
        lotteryOffsColorID:0,
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
          if (this.lotteryOffsColorID != '137') {
            this.jsksImgList = [];
            
            for (let i = 0, v; v = this.classAdata.played[this.oneCredId].item[i++];) {
              for (let j = 0, o; o = v.played[j++];) {
                this.jsksImgList.push({
                  k: o.name,
                  v: require('../../../assets/images/paiGow/' + o.id + '.png')
                });
              }
            }
          }
          if (this.lotteryOffsColorID == '137') {
            this.$nextTick(function () {
              $(".paiGow_munFirst").css({
                "height": $(window).height() * 0.47
              })
            })
          }
          return this.classAdata.played[this.oneCredId].item;
        }
      }
    },
    mounted() {
      var heighr = ($(window).height());
      var heighrs = heighr * 0.88;
      this.lotteryOffsColorID = this.$parent.$refs.headerRef.lotteryTypeId;
      console.log("this.lotteryOffsColorID:",this.lotteryOffsColorID);
      $('.hxpjGow_paiGow').css({
        "min-height": $(window).height() * 0.78,
//      "padding-top": $(window).height()*0.22
      });
      $(".pknn_mun_LHeight").css({
        "height": $(window).height() * 0.49,
      });
      let that = this;
      that.Colorfulplay();
      
      that.$parent.$on('resetChildData', function () {
        that.classAdata.played = JSON.parse(JSON.stringify(that.playedListCopy));
        that.playedListCopy = [];
        that.selectedBalls = [];
        that.computeOdds({odds: 0});
      });
    },
    updated(){
      $(".pknn_mun_LHeight").css({
        "height": $(window).height() * 0.50,
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
	      let that = this;
	      if (that._LotteryUtil.pauseSell(that, that.$parent.classAdata.status)) return;
        this.selectedAmount = parseInt($(".westernSectionNum p.on").attr("data-marry"));
        this.dynamicBalance = this.$parent.$refs.headerRef.balanceAmount;
	      if (this._Util.isLogin() && parseInt(this.selectedAmount) > this.dynamicBalance) {
              this._LotteryUtil.creditLow(this);
		      // this._Util.showAlert(this, {content: "余额不足，请充值"});
		      // setTimeout(function () {
			   //    that.$router.replace({name: 'addMoney'});
		      // }, 1000 * 2);
		      return;
	      }
       if (this.$parent.stopBet) return;
        if (this._LotteryUtil.lotteryCheckCount(this, this.selectedBalls)) return;
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
          if (_this.lotteryOffsColorID == '137') {
            let tianmenId = playedSubtypeName == '比庄大' ? 0 : 1;
            let tianId = playedSubtypeId == '139' ? 1 : (playedSubtypeId == '138' ? 2 : 3);
            console.log(tianmenId)
            _this._Util.chip(_this, e, $('.paiGow_munFirst section:eq(' + tianId + ') .paiFirst_article:eq(' + tianmenId + ')'));
            
          } else {
            _this._Util.chip(_this, e, $('.paiGow_mun_paiGows:eq(' + item_index + ') .paiGow_mun_paiGow ul li:eq(' + index + ')'));
            
          }
        }, 10);

//        setTimeout(function(){
//          $(".pcdd_mun_list ul li").eq(index).removeClass("on");
//          $('.westernFooter_bottom section').eq(1).find('p.on .maryCls').css({
//            "top":"20px",
//            "left":"20px"
//          });
//          let sectionVal = parseFloat($(".pcdd_mun_list ul li").eq(index).find('.smarrySpan').text());
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
        // let appendHref = require('../../../assets/images/marry_10.png');
        // let appendiMG = '<img src= ' + appendHref + ' class="maryCls"/>';
        // $('.westernFooter_bottom section').eq(1).find('p.on').append(appendiMG);
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
        //return Math.floor(odds * 1000) / 1000
        
      },
      
      getTotalMoney: function (playedList) {
        let that = this;
        that.totalMoney = 0;
//        for (let i = 0, v; v = playedList[i++];) {
//          that.totalMoney += (v.amount || 0);
//        }
        
        let arr = that.classAdata.played[that.oneCredId].item;
        for (let i = 0, v; v = arr[i++];) {
          for (let j = 0, o; o = v.played[j++];) {
            that.totalMoney += (o.amount || 0);
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
        this.lotteryOffsColorID = this.$parent.$refs.headerRef.lotteryTypeId;
        if (this.lotteryOffsColorID == '137') {
          this.$nextTick(function () {
            $(".paiGow_munFirst").css({
              "height": $(window).height() * 0.47
            })
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

