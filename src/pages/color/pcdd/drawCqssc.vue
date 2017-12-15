<template>
    <div class="content">

        <div class="boo">
            <div class="bomb">
                <div class="shuzi"></div>
                <div class="loadEffect"><span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span></div>
            </div>
            <div class="fireworks">
                <div class="bg_1"></div>
                <div class="bg_2"></div>
                <div class="bg_3"></div>
            </div>
        </div>
        <div class="conter">
            <div @click="close()" class="close"></div>
            <!--关闭按钮-->
            <div class="icon">
                <div class="icon_bg"></div>
            </div>
            <div class="Period">
                第{{$parent.$refs.headerRef.actionResultCopy.number}}期
                开奖结果{{($parent.$refs.headerRef.actionDataCopy.toString()).replace(/,/g, '')}}
            </div>
            <div class="No_1 No isoverf"><span></span></div>
            <div class="No_2 No isoverf"><span></span></div>
            <div class="No_3 No isoverf"><span></span></div>
            <div class="No_4 No isoverf"><span></span></div>
            <div class="No_5 No isoverf"><span></span></div>
        </div>
        <div class="skip">跳过</div>

    </div>
</template>
<script type="text/babel">
  import '../../../assets/scss/drawLotteryCqssc.scss'

  export default {
    props: {
      openLotteryResult: {default: ''}
    },

    data() {
      return {
        resultPic: [],
        i: 0
      }
    },

    mounted() {
      let that = this;
      that.countdown();
      //中奖号码
      for (let i = 0, v; v = that.$parent.$refs.headerRef.actionDataCopy[i++];) {
        $(".No_" + i + " span").css({
          "background": "url(" + require('../../../assets/images/openLottery/cqssc/egg_n' + v + '.png') + ")",
          "background-size": "cover"
        });
      }

    },
    methods: {
      drawMethodsFun: function () {

      },

      close: function () {
        let that = this;
        $(".conter").addClass("conter_1");
        setTimeout(function () {
          $(".content").fadeOut('fast');
          setTimeout(function () {
            that.$parent.isOpenLottery = false;
          }, 1000);
        }, 600);
      },

      countdown() {
        let that = this;
        that._Util.audioPlay(that, {fileName: 'zhadan.mp3', audioPlay: true});
        setTimeout(function () {
          $(".shuzi").css({
            "background": 'url(' + require('../../../assets/images/openLottery/cqssc/02.png') + ')',
            "background-size": "cover"
          });
        }, 900);
        setTimeout(function () {
          $(".shuzi").css({
            "background": 'url(' + require('../../../assets/images/openLottery/cqssc/01.png') + ')',
            "background-size": "cover"
          });
        }, 1800);
        setTimeout(function () {
          $(".boo").addClass("shake");
          $(".fireworks").addClass("play");
        }, 2700);
        setTimeout(function () {
          $(".bomb").css("opacity", "0");
        }, 3500);
        if (that.i == "0") {
          setTimeout(function () {
            $(".conter").addClass("conter_t");
          }, 3800);
          setTimeout(function () {
            $(".No_1").addClass("No_x");
          }, 4000);
          setTimeout(function () {
            $(".No_2").addClass("No_x");
          }, 4100);
          setTimeout(function () {
            $(".No_3").addClass("No_x");
          }, 4200);
          setTimeout(function () {
            $(".No_4").addClass("No_x");
          }, 4300);
          setTimeout(function () {
            $(".No_5").addClass("No_x");
          }, 4400);
          setTimeout(function () {
            $(".No_1 span").addClass("img_1");
            $(".No_2 span").addClass("img_2");
            $(".No_3 span").addClass("img_3");
            $(".No_4 span").addClass("img_4");
            $(".No_5 span").addClass("img_5");
            setTimeout(function () {
              that._Util.audioClose(that);
              that.close();
            }, 1000 * 4);
          }, 4600);
          setTimeout(function () {
            $(".No").bind("webkitAnimationEnd", function () {
              $(".No").removeClass("No_x");
              $(".No").addClass("shangxia");
            });
          }, 4200);
        }
      }

    },
    components: {}
  }
</script>

