<template>
  <div class="westernPage">
    <div v-if="itemWesternPageData.length" class="westernPage_mian">
        <article class="westernPage_article">
          <section v-for="(num,index) in itemWesternPageData[0].played"
                   @click="playchecked($event,num,itemWesternPageData[0].id,num.name,index, itemWesternPageData[0])"
                   :class="{'on':num.active}"
                   class="wester_article" >
            <div class="westernpage_num" style="overflow: visible;height:1.8rem;">
              <p><span>{{num.name}}</span></p>
              <p><span>/{{computeOdds(num)}}</span></p>
              <p><span>
                {{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, num.amount)}}
              </span></p>
              <p class="playMarryImg "  :class="{'on':index == 2 || index == 3}" v-if="num.active && !$parent.stopBet"><img src="../../../assets/images/small01.png"/></p>
            </div>
          </section>
        </article>
        <div class="westernPage_div">
          <article class="westernpage_divMun">
            <section v-for="(wester, index) in itemWesternPageData[0].playedOne"
                     @click="playchecked($event,wester,itemWesternPageData[0].id,wester.name,index, itemWesternPageData[0], true)"
                     class="indexJust" >
              <div class="westernpage_num " style="overflow: visible;height:1.8rem;">
                <p><span>{{wester.name}}</span></p>
                <p><span>/{{computeOdds(wester)}}</span></p>
                <p><span>
                  {{_LotteryUtil.showAmount($parent.classAdata.status, $parent.stopBet, wester.amount)}}
                </span></p>
                <p class="playMarryImg nums"  :class="{'ors':index>3,'evens': index==1 || index==3 }" v-if="wester.active && !$parent.stopBet"><img src="../../../assets/images/small01.png"/></p>
              </div>
            </section>
        </article>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import $ from 'jquery'
  export default {
    name: 'westernPage',
    props: {
      classAdata: { default: {} },
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
        itemWesternPageData: [],
        westernPagedata: [
          // {num: "4-1", odds: "231.981", marry: "0"},
          // {num: "1-2", odds: "231.981", marry: "0"},
          // {num: "3-4", odds: "231.981", marry: "0"},
          // {num: "2-3", odds: "231.981", marry: "0"}
        ],
        westernJstdata: [
          // {num: "1", odds: "231.981", marry: "0"},
          // {num: "2", odds: "231.981", marry: "0"},
          // {num: "3", odds: "231.981", marry: "0"},
          // {num: "4", odds: "231.981", marry: "0"},
          // {num: "单", odds: "231.981", marry: "0"},
          // {num: "双", odds: "231.981", marry: "0"}
        ],
        thisScrollTop: 0,
        dynamicBalance: '',
        selectedAmount: 0
      }
    },
    computed: {

    },
    mounted () {
      var that = this;
      //that.deafNum();
      that.Colorfulplay();
      that.$parent.$on('resetChildData', function () {
        that.itemWesternPageData = JSON.parse(JSON.stringify(that.playedListCopy));
//        that.playedListCopy = [];
        that.selectedBalls = [];
        that.computeOdds({odds: 0});
      });
        $(window).scroll(function(){
            that.thisScrollTop = $(document).scrollTop();
        });
    },
    watch: {
      'classAdata'() {
        let that = this;
        setTimeout(function () {
          that.deafNum();
        }, 100);
      },

      'sliderValue'() {
        for (let i = 0, v; v = this.selectedBalls[i++];) {
          v.cur_odds = this.computeOdds(v);
        }
      }
    },
    methods: {
      deafNum : function() {
        if( typeof(this.classAdata) == 'string' || typeof(this.classAdata.played) == 'undefined' ) {
          return '玩法'
        }else{
          //西部番摊
          this.westernPagedata = [];
          this.westernJstdata = [];
          let playData = this.classAdata.played[this.oneCredId].item[0],
              playLen = playData.played.length;
          for ( var i = 0; i < playLen; i++ ) {
            let playName = playData.played[i].name;
            switch (playName) {
              case '1':
              case '2':
              case '3':
              case '4':
              let caseSwt = {id:playData.played[i].id,name:playName,odds:playData.played[i].odds,odds_base:playData.played[i].odds_base,marry:'0.00'};
              this.westernJstdata.push(caseSwt);
              break;
              case '1-2':
              case '2-3':
              case '3-4':
              case '4-1':
              let caseStr = {id:playData.played[i].id,name:playName,odds:playData.played[i].odds,odds_base:playData.played[i].odds_base,marry:'0.00'}
              this.westernPagedata.push(caseStr);
              break;
            }
            if ( playName == '单' || playName == '双' ) {
              let caseSwt = {id:playData.played[i].id,name:playName,odds:playData.played[i].odds,odds_base:playData.played[i].odds_base,marry:'0.00'};
              this.westernJstdata.push(caseSwt);
            }
          }
          //数据循环
          this.westernJstdata.push(this.westernJstdata[0]);
          this.westernJstdata.push(this.westernJstdata[1]);
          this.westernJstdata.splice(this.westernJstdata[0],1);
          this.westernJstdata.splice(this.westernJstdata[1],1);

          this.westernPagedata.unshift(this.westernPagedata[this.westernPagedata.length - 1]);
          this.westernPagedata.pop();

          //数据结构
          let westernDataed = {
            id: playData.id,
            name: playData.name,
            played: this.westernPagedata,
            playedOne: this.westernJstdata
          }
          this.itemWesternPageData.push(westernDataed);

          if (!this.playedListCopy.length) {
            this.playedListCopy = JSON.parse(JSON.stringify(this.itemWesternPageData));
          }

          return this.itemWesternPageData
        }
      },
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
      playchecked: function (e,play,playedSubtypeId,playedSubtypeName,index, colorful, flag) {
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
//        if (this.$parent.stopBet || this.classAdata.status == '0') return;
        if (this._LotteryUtil.lotteryCheckCount(this,this.selectedBalls)) return;
        var _this = this;
        _this.$set(play, 'amount', (play.amount || 0) + (_this.marryNum || 10));
          _this.$set(play, 'oneCredId', _this.oneCredId);
//        var sectionVal = parseFloat($(".pcdd_mun_list ul li").eq(index).find('.smarrySpan').text());
        if (!('active' in play)) {
          // play['active'] = true
//          play.active = true;
//          play.amount = sectionVal;
          _this.$set(play, 'active', true);
//            _this.$set(play, 'amount', sectionVal);
        }else {
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
          console.log(JSON.parse(JSON.stringify(colorful)));
          _this.getTotalMoney(!flag ? colorful.played : colorful.playedOne);

        }else{
          _this.selectedBalls.remove(play);
        }
        _this.notifySelectedCount();

          setTimeout(function () {
         if( playedSubtypeName == '双' || playedSubtypeName == '单' || playedSubtypeName == '1' || playedSubtypeName == '2' || playedSubtypeName == '3' || playedSubtypeName == '4'){
//console.log(12)
             _this._Util.chip(_this, e, $(' .westernPage_div article section:eq(' + index + ')'), "", parseInt(_this.thisScrollTop));
//
         }else {
             _this._Util.chip(_this, e, $('.westernPage_mian article section:eq(' + index + ')'), "", parseInt(_this.thisScrollTop));
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
        // var appendHref = require('../static/images/marry_10.png');
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
          for (let v of that.itemWesternPageData[0].played) {
            that.totalMoney += (v.amount || 0);
          }

        for (let v of that.itemWesternPageData[0].playedOne) {
          that.totalMoney += (v.amount || 0);
        }
          that.$parent.$refs.headerRef.getHistoryBetMoney(that.totalMoney);
//        var that = this;
//        that.totalMoney = 0;
//        for (var i = 0, v; v = playedList[i++];) {
//          that.totalMoney += (v.amount || 0);
//        }
//
//		that.$parent.$refs.headerRef.getHistoryBetMoney(that.totalMoney);
      }
    }
  }
</script>
