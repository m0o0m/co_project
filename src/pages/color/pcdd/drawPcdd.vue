<template>
    <div class="contentPcdd">
        <div class="inhao">
            <div class="icon_bg"></div>
            <!-- 第一个号码-->
            <div class="first">
                <div class="egg_box"></div>
                <div class="egg">
                    <div class="egg_top"></div>
                    <div class="egg_bottom"></div>
                    <div class="egg_bottom_bg"></div>
                    <div class="egg_number">
                        <img :src="resultPic[0]" alt="">
                    </div>
                    <div class="egg_normal"></div>
                </div>
            </div>
            <!-- 第二个号码 -->
            <div class="second">
                <div class="egg_box"></div>
                <div class="egg">
                    <div class="egg_top"></div>
                    <div class="egg_bottom"></div>
                    <div class="egg_bottom_bg"></div>
                    <div class="egg_number">
                        <img :src="resultPic[1]" alt="">
                    </div>
                    <div class="egg_normal"></div>
                </div>
            </div>
            <!-- 第三个号码 -->
            <div class="third">
                <div class="egg_box"></div>
                <div class="egg">
                    <div class="egg_top"></div>
                    <div class="egg_bottom"></div>
                    <div class="egg_bottom_bg"></div>
                    <div class="egg_number">
                        <img :src="resultPic[2]" alt="">
                    </div>
                    <div class="egg_normal"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
  import '../../../assets/scss/drawAlottery.scss'

  export default {
	props: {
    },

	data() {
	  return {
		resultPic: []
	  }
	},

	mounted() {
      let that = this;
      that._Util.audioPlay(that, {fileName: 'pcegg.mp3', audioPlay: true});

      for (let i = 0, v; v = that.$parent.$refs.headerRef.actionDataCopy[i++];) {
        if (i === 4) break;
        that.resultPic.push(require('../../../assets/images/pcdd/drawAlottery/egg_n' + v + '.png'));
      }
      $(".egg").addClass("rebber");

      setTimeout(function () {
        $(".egg").removeClass("rebber");
      }, 500);

      setTimeout(function () {
        $(".egg").addClass("rebber");
      }, 1000);

      setTimeout(function () {
        $(".egg").removeClass("rebber");
      }, 1500);

      setTimeout(function () {
        $(".egg").addClass("rebber");
      }, 2000);


      setTimeout(function () {
        setTimeout(function () {
          $(".egg_normal").addClass("egg_normal_clear");
        }, 1000);
        setTimeout(function () {
          $(".egg_top").addClass("egg_top_clear");
        }, 1500);
        setTimeout(function () {
          $(".egg_number").addClass("tada");
        }, 2000);
        setTimeout(function () {
          $(".first .egg_number").addClass("first_egg_number");
          $(".second .egg_number").addClass("second_egg_number");
          $(".third .egg_number").addClass("third_egg_number");
          $(".egg_box").addClass("clear");
          $(".egg_bottom").addClass("clear");
          $(".egg_bottom_bg").addClass("clear");
        }, 3000);
        setTimeout(function () {
          $(".first .egg_number").addClass("clear");
          $(".second .egg_number").addClass("clear");
          $(".third .egg_number").addClass("clear");
          that._Util.audioClose(that);
          that.$parent.isOpenLottery = false;
        }, 4000);
      }, 1500);
	},

	methods: {},

	components: {}
  }
</script>

