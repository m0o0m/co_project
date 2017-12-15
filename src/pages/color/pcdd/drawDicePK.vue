<template>
    <div id="contentMark" class="contentMark">
        <button id="btn" style="display: none;">BUTTON</button>
        <button @click="start()" style="display: none;">BUTTON</button>
    </div>
</template>
<script type="text/babel">
  import racing from '../../../assets/js/openLottery/pk10/anim_racing'

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
          that._Util.audioClose();
          setTimeout(function () {
            that.$parent.isOpenLottery = false;
          }, 300);
        }
      });

      setTimeout(function () {
        that.start();
        that._Util.audioPlay(that, {fileName: 'bjpk10.mp3', audioPlay: true});
      }, 1500);
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
          racing.fallRun(that.fallObj, newArr, () => {
//			that.$parent.$emit('closeDraw');
            setTimeout(function () {
              that._Util.audioClose(that);
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
    }
</style>

