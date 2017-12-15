<template>
    <div class="context" id="context">
        <button id="btn">BUTTON</button>
    </div>
</template>
<script type="text/babel">
  //  import '../../../assets/scss/drawLotteryCqssc.scss'
  import poker from '../../../assets/js/openLottery/poker'

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
      this.pokerObj = poker.pokerInit();
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

