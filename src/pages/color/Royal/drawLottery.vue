<template>
    <div class="box" id="ves">
        <button class="btn" id="btn" style="display: none;">BUTTON</button>
    </div>
</template>
<script type="text/babel">
  //  import '../../../assets/scss/drawLotteryCqssc.scss'
  import poker from '../../../assets/js/openLottery/hj28/mahjong'

  export default {
    props: {
      openLotteryResult: {default: ''}
    },

    data() {
      return {
        resultPic: [],
        pokerObj: {}
      }
    },

    mounted() {
      let that = this;
      this.pokerObj = poker.pokerInit({
        el: document.getElementById('ves')
      });
      setTimeout(function () {
        poker.pokerRun(that.pokerObj, that.$parent.$refs.headerRef.actionDataCopy,
          that.$parent.$refs.headerRef.actionResultCopy.extfield, () => {
            setTimeout(function () {
              that.$parent.isOpenLottery = false;
            }, 600);
          });
      });
    },
    methods: {},
    components: {}
  }
</script>

<style>
    .box {
        width: 100%;
        height: 100%;
    }

    .btn {
        position: fixed;
        z-index: 100;
    }
</style>

