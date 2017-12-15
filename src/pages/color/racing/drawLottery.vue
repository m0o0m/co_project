<template>
    <div id="contentMark" class="contentMark">
        <!--<button id="btn">BUTTON</button>-->
        <!--<button @click="start()">BUTTON</button>-->
    </div>
</template>
<script type="text/babel">
  import racing from '../../../assets/js/openLottery/racing/anim.horse'

  export default {
    props: {
      openLotteryResult: {default: ''}
    },

    data() {
      return {
        fallObj: {}
      }
    },

    mounted() {
      let that = this;
      that.fallObj = racing.fallMan({
        el: document.getElementById('contentMark'),	//动画节点，动画容器添加到哪里
        close: function () {
          that._Util.audioClose(that);
          that.$parent.isOpenLottery = false;
        }
      });

      setTimeout(function () {
        that._Util.audioPlay(that, {fileName: 'saima.mp3', audioPlay: true});
        that.start();
      }, 3000);
    },
    methods: {
      start() {
        let that = this;
        setTimeout(function () {
          let arr = JSON.parse(JSON.stringify(that.$parent.$refs.headerRef.actionDataCopy));
          let newArr = [];
          for (let v of arr) {
            newArr.push(parseInt(v));
          }

          for (let i = 1; i < 13; i++) {
            if (newArr.indexOf(i) === -1) {
              newArr.push(i);
            }
          }

          racing.fallRun(that.fallObj, newArr, () => {
            setTimeout(function () {
              that.$parent.isOpenLottery = false;
            }, 1000 * 4);
          });
        }, 300)
      }
    },
    components: {}
  }
</script>

<style type="text/css">
    .contentMark {
        width: 100%;
        height: 100%;
        z-index: 9999;
        position: absolute;
        top:0;
    }
</style>

