<template>
    <div>
        <Index v-show="!footerIndex"></Index>

        <Lottery-record v-show="footerIndex === 1"></Lottery-record>

        <Bet-record v-show="footerIndex === 2"></Bet-record>

        <Member-center v-show="footerIndex === 3"></Member-center>

        <Home-footer :homeIndex.sync="footerIndex"></Home-footer>

    </div>
</template>
<script type="text/babel">
  import HomeFooter from '../components/HomeFooterNew.vue';
  import Index from './indexNew.vue';
  import LotteryRecord from './home/theLottery/index.vue';
  import BetRecord from './home/betting/index.vue'
  import MemberCenter from './personal/index';


  export default {
    data() {
      return {
        footerIndex: parseInt(this.$route.query.homeIndex || 0)
      }
    },

    mounted() {
      let that = this;
      that.init();
    },

    methods: {
      init() {

      }

    },

    components: {
      HomeFooter,
      Index,
      LotteryRecord,
      BetRecord,
      MemberCenter
    }
  }
</script>
