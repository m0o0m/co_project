<template>
    <div>
        <div v-if="creditId == 16" class="contentStud">
            <div class="region">
                <div class="icon">
                    <div class="yuan1"></div>
                    <div class="yuan2"></div>
                    <div class="yuan3"></div>
                </div>
                <div @click="close()" class="close"></div>
                <div class="Period">
                    第{{$parent.$refs.headerRef.actionResultCopy.number}}期
                    开奖结果 {{$parent.$refs.headerRef.actionResultCopy.end_color}}
                </div>
                <div class="poker_one poker_cloudTop">
                    <div class="poker_number">
                        <img :src="resultImg[0]" alt="">
                    </div>
                </div>
                <div class="poker_two poker_cloudTop">
                    <div class="poker_number">
                        <img :src="resultImg[1]" alt="">
                    </div>
                </div>
                <div class="poker_three poker_cloudTop">
                    <div class="poker_number">
                        <img :src="resultImg[2]" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="creditId == 18" class="contentStud">
            <div class="region">
                <div class="icon">
                    <div class="yuan1"></div>
                    <div class="yuan2"></div>
                    <div class="yuan3"></div>
                </div>
                <div @click="close()" class="close"></div>
                <div class="Period">
                    第{{$parent.$refs.headerRef.actionResultCopy.number}}期
                    开奖结果 {{$parent.$refs.headerRef.actionResultCopy.end_color}}
                </div>
                <div class="poker_one poker">
                    <div class="poker_bg"></div>
                    <div class="poker_number">
                        <!--<img :src="resultImg[0]" alt="">-->
                    </div>
                </div>
                <div class="poker_two poker">
                    <div class="poker_bg"></div>
                    <div class="poker_number">
                        <!--<img :src="resultImg[1]" alt="">-->
                    </div>
                </div>
                <div class="poker_three poker">
                    <div class="poker_bg"></div>
                    <div class="poker_number">
                        <!--<img :src="resultImg[2]" alt="">-->
                    </div>
                </div>
                <div class="poker_four poker">
                    <div class="poker_bg"></div>
                    <div class="poker_number">
                        <!--<img :src="resultImg[3]" alt="">-->
                    </div>
                </div>
                <div class="poker_five poker">
                    <div class="poker_bg"></div>
                    <div class="poker_number">
                        <!--<img :src="resultImg[4]" alt="">-->
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="creditId == 15" class="contentStud">
            <div class="region">
                <div class="icon">
                    <div class="yuan1"></div>
                    <div class="yuan2"></div>
                    <div class="yuan3"></div>
                </div>
                <div @click="close()" class="close"></div>
                <div class="Period">
                    第{{$parent.$refs.headerRef.actionResultCopy.number}}期
                    开奖结果 {{$parent.$refs.headerRef.actionResultCopy.end_color}}
                </div>
                <div class="poker_one poker_showHand">
                    <div class="poker_bg"></div>
                    <div class="poker_number">
                        <!--<img :src="resultImg[0]" alt="">-->
                    </div>
                </div>
                <div class="poker_two poker_showHand">
                    <div class="poker_bg"></div>
                    <div class="poker_number">
                        <!--<img :src="resultImg[1]" alt="">-->
                    </div>
                </div>
                <div class="poker_three poker_showHand">
                    <div class="poker_bg"></div>
                    <div class="poker_number">
                        <!--<img :src="resultImg[2]" alt="">-->
                    </div>
                </div>
                <div class="poker_four poker_showHand">
                    <div class="poker_bg"></div>
                    <div class="poker_number">
                        <!--<img :src="resultImg[3]" alt="">-->
                    </div>
                </div>
                <div class="poker_five poker_showHand">
                    <div class="poker_bg"></div>
                    <div class="poker_number">
                        <!--<img :src="resultImg[4]" alt="">-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
  import '../assets/scss/drawAlottery.scss'
  export default {
	props: {
	  openLotteryResult: { default: '' },
	  creditId: { default: '' }
	},

	data() {
	  return {
        resultImg: []
	  }
	},

	mounted() {
	  let that = this;
//动画入场效果
      $(".region").addClass("region_t");

      that._Util.audioPlay(that, {fileName: 'puke.mp3', audioPlay: true});

      if (that.creditId === 16) {
        setTimeout(function () {
          $(".poker_one").addClass("poker_one_l");
        }, 100);
        setTimeout(function () {
          $(".poker_two").addClass("poker_two_l");
        }, 250);
        setTimeout(function () {
          $(".poker_three").addClass("poker_three_l");
        }, 400);
      } else if (that.creditId === 18) {
        setTimeout(function () {
          $(".poker_one").addClass("hover");
          $(".poker_one .poker_bg").addClass("isgun");
        }, 100);
        setTimeout(function () {
          $(".poker_two").addClass("hover");
          $(".poker_two .poker_bg").addClass("isgun");
        }, 180);
        setTimeout(function () {
          $(".poker_three").addClass("hover");
          $(".poker_three .poker_bg").addClass("isgun");
        }, 260);
        setTimeout(function () {
          $(".poker_four").addClass("hover");
          $(".poker_four .poker_bg").addClass("isgun");
        }, 340);
        setTimeout(function () {
          $(".poker_five").addClass("hover");
          $(".poker_five .poker_bg").addClass("isgun");
        }, 520);
      } else {
        setTimeout(function () {
            $(".poker_one .poker_bg").addClass("isgun");
          $(".poker_showHand").addClass("poker_one_sh_l");
        }, 100);
        setTimeout(function () {
          $(".poker_showHand:not(.poker_one)").addClass("poker_two_sh_l");
        }, 200);
        setTimeout(function () {
          $(".poker_three,.poker_four,.poker_five").addClass("poker_three_sh_l");
          $(".poker_two .poker_bg").addClass("isgun");
        }, 300);
        setTimeout(function () {
          $(".poker_five,.poker_four").addClass("poker_four_sh_l");
          $(".poker_three .poker_bg").addClass("isgun");
        }, 400);
        setTimeout(function () {
          $(".poker_five").addClass("poker_five_sh_l");
          $(".poker_four .poker_bg").addClass("isgun");
        }, 500);
        setTimeout(function () {
          $(".poker_five").addClass("hover");
//          $('.poker_bg').css({'transform': 'rotateY(180deg)', '-moz-transform': 'rotateY(180deg)'});
//          $('.poker_five').css({transform: 'rotateY(180deg)'});
        //    $(".poker_five .poker_bg").addClass("isgun");
        }, 900);
         setTimeout(function () {
          $(".poker_five").addClass("hover");
//          $('.poker_bg').css({'transform': 'rotateY(180deg)', '-moz-transform': 'rotateY(180deg)'});
//          $('.poker_five').css({transform: 'rotateY(180deg)'});
           $(".poker_five .poker_bg").addClass("isgun");
        }, 1200);
      }


      //	延迟显示中奖号码
      let bigArr = ['0', '10', '11', '12', '13', '23', '24', '25', '26', '36', '37', '38', '39', '49', '50', '51'];
      for (let num of that.$parent.$refs.headerRef.actionDataCopy) {
        let fileName = bigArr.indexOf(num) !== -1 ? 'big_' + num : num;
        that.resultImg.push(require('../assets/images/showHand/sola/' + fileName + '.png'));
      }

      $(".poker_one .poker_number").css({'background': 'url(' + that.resultImg[0] + ')', "background-size": "cover"});
      $(".poker_two .poker_number").css({'background': 'url(' + that.resultImg[1] + ')', "background-size": "cover"});
      $(".poker_three .poker_number").css({'background': 'url(' + that.resultImg[2] + ')', "background-size": "cover"});
      $(".poker_four .poker_number").css({'background': 'url(' + that.resultImg[3] + ')', "background-size": "cover"});
      $(".poker_five .poker_number").css({'background': 'url(' + that.resultImg[4] + ')', "background-size": "cover"});

      setTimeout(function () {
        that.close();
      }, 1000 * 4);
	  that.initData();
	},

	methods: {
	  initData() {

      },

      close() {
        let that = this;
        $(".region").addClass("region_1");
//        $(".contentStud").addClass("conter_1");
        setTimeout(function () {
          that._Util.audioClose(that);
          $(".contentStud").fadeOut('fast');
          setTimeout(function () {
            that.$parent.isOpenLottery = false;
          }, 1000);
        }, 600);
      }

	},


	components: {}
  }
</script>

<style>
    .region_1 {
        top: 6%;
        left: 30%;
        transform: scale(0.2);
        opacity: 0;
        transition: 1.2s;
    }
</style>