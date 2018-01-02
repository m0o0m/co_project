<template>
    <div class="content">
        <div class="conter istou">
            <div class="close" @click="drawClick"></div>
            <!--关闭按钮-->
            <div class="icon">
                <div class="icon_bg"></div>
            </div>
            <div class="Period">
                <!--第{{$parent.$refs.headerRef.actionResultCopy.number}}期-->
                <!--开奖结果{{result}}-->
            </div>
            <div class="game isplays">
                <div class="wrap">
                    <div class="cube cube_1">
                        <div class="front"></div>
                        <div class="back"></div>
                        <div class="top"></div>
                        <div class="bottom"></div>
                        <div class="left"></div>
                        <div class="right"></div>
                    </div>
                    <div class="cube cube_2">
                        <div class="front"></div>
                        <div class="back"></div>
                        <div class="top"></div>
                        <div class="bottom"></div>
                        <div class="left"></div>
                        <div class="right"></div>
                    </div>
                    <div class="cube cube_3">
                        <div class="front"></div>
                        <div class="back"></div>
                        <div class="top"></div>
                        <div class="bottom"></div>
                        <div class="left"></div>
                        <div class="right"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
  import '../../../assets/scss/drawAlottery.scss'

  export default {
    props: {},

    data() {
      return {
        resultPic: [{
          key: 1,
          name: 'one'
        }, {
          key: 2,
          name: 'two'
        }, {
          key: 3,
          name: 'three'
        }, {
          key: 4,
          name: 'four'
        }, {
          key: 5,
          name: 'five'
        }, {
          key: 6,
          name: 'six'
        }],
        result: ''
      }
    },

    mounted() {
      this.drawMethodsFun();
    },
    methods: {
      drawMethodsFun: function () {
        let that = this;
        that._Util.audioPlay(that, {fileName: 'jiangsu.mp3', audioPlay: true});

        $(".conter").addClass("conter_t");
        // 中奖号码对应的属性  从左到右分别是：1、2、3号骰子
        //替换addClass后（）中的数字，数字分别为：one two three four five six

        setTimeout(function () {
          $(".cube_1").addClass(that.matchDice(that.$parent.$refs.headerRef.actionDataCopy[0]));
          $(".cube_2").addClass(that.matchDice(that.$parent.$refs.headerRef.actionDataCopy[1]));
          $(".cube_3").addClass(that.matchDice(that.$parent.$refs.headerRef.actionDataCopy[2]));
          that._Util.audioClose(that);

          setTimeout(function () {
            that.result = (that.$parent.$refs.headerRef.actionDataCopy.toString()).replace(/,/g, '')
          }, 1000 * 3);
          setTimeout(function () {
            that.drawClick();
          }, 1000 * 4);
        }, 2000);
      },
      drawClick: function () {
        let that = this;
        $(".conter").addClass("conter_1");

        setTimeout(function () {
          $(".content").fadeOut('fast');
          setTimeout(function () {
            that.$parent.isOpenLottery = false;
          }, 1000);
        }, 600);
      },

      matchDice(num) {
        let name = '';
        for (let i = 0, v; v = this.resultPic[i++];) {
          if (num == v.key) {
            name = v.name;
//            name = 'five';
            break;
          }
        }
        return name;
      }
    },
    components: {}
  }
</script>

