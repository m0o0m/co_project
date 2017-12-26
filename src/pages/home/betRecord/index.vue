<template>
  <div id="bgimg">
    <button @click="changeSelect = !changeSelect">采种选择</button>
    <LotterySelect v-if="changeSelect"></LotterySelect>
    <span class="rig"></span>
    <div class="betRecord_top">
      <ul>
        <li><a class="on" href="#">全部</a></li>
        <li><a href="#">已中奖</a></li>
        <li><a href="#">未中奖</a></li>
        <li><a href="#">待中奖</a></li>
      </ul>
    </div>
    <div class="betRecord_bd">
      <ul>
        <li><a href="#">
          <div class="bd-left">
            <p class="left-tit">济州岛赛马<span>&nbsp; &nbsp; 第123654985期</span></p>
            <p class="left-data">2017-08-08&nbsp; &nbsp;13:23:25</p>
          </div>
          <div class="bd-right">
            <p class="p1">10.00</p>
            <p class="p2">&gt;</p>
            <p class="p3">未中奖</p>
          </div>
        </a>
        </li>
        <li><a href="#">
          <div class="bd-left">
            <p class="left-tit">济州岛赛马<span>&nbsp; &nbsp; 第123654985期</span></p>
            <p class="left-data">2017-08-08&nbsp; &nbsp;13:23:25</p>
          </div>
          <div class="bd-right">
            <p class="p1">10.00</p>
            <p class="p2">&gt;</p>
            <p class="p3">未中奖</p>
          </div>
        </a>
        </li>
        <li><a href="#">
          <div class="bd-left">
            <p class="left-tit">济州岛赛马<span>&nbsp; &nbsp; 第123654985期</span></p>
            <p class="left-data">2017-08-08&nbsp; &nbsp;13:23:25</p>
          </div>
          <div class="bd-right">
            <p class="p1">10.00</p>
            <p class="p2">&gt;</p>
            <p class="p3">未中奖</p>
          </div>
        </a>
        </li>
        <li><a href="#">
          <div class="bd-left">
            <p class="left-tit">济州岛赛马<span>&nbsp; &nbsp; 第123654985期</span></p>
            <p class="left-data">2017-08-08&nbsp; &nbsp;13:23:25</p>
          </div>
          <div class="bd-right">
            <p class="p1">10.00</p>
            <p class="p2">&gt;</p>
            <p class="p3">未中奖</p>
          </div>
        </a>
        </li>
        <li><a href="#">
          <div class="bd-left">
            <p class="left-tit">济州岛赛马<span>&nbsp; &nbsp; 第123654985期</span></p>
            <p class="left-data">2017-08-08&nbsp; &nbsp;13:23:25</p>
          </div>
          <div class="bd-right">
            <p class="p1">10.00</p>
            <p class="p2">&gt;</p>
            <p class="p3">未中奖</p>
          </div>
        </a>
        </li>
        <li><a href="#">
          <div class="bd-left">
            <p class="left-tit">济州岛赛马<span>&nbsp; &nbsp; 第123654985期</span></p>
            <p class="left-data">2017-08-08&nbsp; &nbsp;13:23:25</p>
          </div>
          <div class="bd-right">
            <p class="p1">10.00</p>
            <p class="p2">&gt;</p>
            <p class="p3">未中奖</p>
          </div>
        </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/babel">
  import LotterySelect from '../../../components/lotterySelect';
  
  export default {
    data() {
      return {
        resultList: [],
        changeSelect: false
      }
    },
    
    mounted() {
      let that = this;
      that.initData();
    },
    
    methods: {
      initData() {
        let that = this;
        that._Util.post(that, that._Api.POST_HOME, {}, (data) => {
          that.resultList = data;
        });
      }
      
    },
    
    
    components: {
      LotterySelect
    }
  }
</script>
