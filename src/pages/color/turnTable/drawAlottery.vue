<template>
    <div class="contentemplate">
        <div class="top_tontentEm">
            <div class="mask"></div>
            <div class="turntable_bg"></div>
            <div class="turntable_figure"></div>
            <div class="turntable_pointer" @click="drawAlooteryFunction()"></div>
            <div v-if="!isFirst" class="number_bg">{{num}}</div>
            <div class="ball" id="ball"></div>
        </div>
        <div class="bottom_TrunTable" @click="selectionDraw"></div>
    </div>
</template>

<script>
  // import '../../../assets/scss/drawAlottery.scss'

  export default {
    props: {
      isFirst: {default: true}
    },

    data() {
      return {
        num: ''
      }
    },
    mounted() {
      let that = this;
      if (!that.isFirst) {
        setTimeout(function () {
          that.drawAlooteryFunction();
        }, 500);
      } else {
        setTimeout(function () {
          that.selectionDraw();
        }, 1000 * 2);
      }
    },
    methods: {
      drawAlooteryFunction: function () {

        if (this.isFirst) return;
        this._Util.audioPlay(this, {fileName: 'eluosi.mp3', audioPlay: true});
        //在下面我会给出角度对应的数值// 在720的基础上加一个角度，动画会更加好看些
        //转盘数字转动的角度
        let that = this;
        let nums = [0, 32, 15, 19, 4, 21, 2, 25, 17, 23, 6, 27, 13, 39, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

        let n = (720 + 9.7 * nums.indexOf(parseInt(that.$parent.$refs.headerRef.actionDataCopy[0]))) + 3;


        //这个数值一般不要改变
        let m = 720;
        $(".ball").addClass("ball_1");
        $(".ball_1").css({transform: "rotate(" + n + "deg)"});// scale(0.55)
        $(".turntable_figure").addClass("turntable_figure_1");
        $(".turntable_figure_1").css({transform: "rotate(" + m + "deg)"});
        setTimeout(function () {
          that.num = that.$parent.$refs.headerRef.actionDataCopy[0];
        }, 1000 * 5);

        setTimeout(function () {
          that._Util.audioClose(that);
          that.selectionDraw();
        }, 1000 * 8.5);
      },
      selectionDraw: function () {
        let that = this;
        $(".bottom_TrunTable").addClass("bottom_1");
        $(".top_tontentEm").addClass("top_1");
        setTimeout(function () {
          $(".contentemplate").fadeOut('fast');

          setTimeout(function () {
            that.$parent.isFirst = false;
            that.$parent.isOpenLottery = false;
          }, 600);
        }, 2000);

      },
      initData: function () {

      }
    }
  }
</script>