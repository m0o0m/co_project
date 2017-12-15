<template>
   
    <div id="bgimg">
			 <!-- <button @click="changeSelect = !changeSelect">采种选择</button> -->
				<LotterySelect v-if="changeSelect"></LotterySelect>
          <div class="tit"> 
						<span class="rig"></span> 
					  <span class="titimg">投注详情</span>
					</div>
				  <div class="category">
						<img src="../../../assets/images/color/color02.png" alt="">
							<p class="colors">重庆时时彩 <span class="datas">第1234567891期</span> </p>
							<p class="state">已中奖 <span>赢取￥10.00</span> </p>
					</div>	
				  <div class="betRecord_bd">
						<p class="tt">订单详情</p>
					 <ul>
              <li>&nbsp;&nbsp;&nbsp;订单号<span>201733653235653</span></li>
							<li>投注金额<span>201733653235653</span></li>
							<li>投注注数<span>201733653235653</span></li>
							<li>投注返点<span>201733653235653</span></li>
							<li>投注赔率<span>201733653235653</span></li>
							<li>投注时间<span>201733653235653</span></li>
							<li>是否中奖<span>201733653235653</span></li>
							<li>玩法名称<span>201733653235653</span></li>
							<li>投注号码<span>201733653235653</span></li>
					 </ul>
				  </div>
					<div class="result">
	           <p class="tt">开奖结果</p>
						 <div class="rest-bg">
							 <ul>
								 <li ><span class="span1">1</span></li>
								 <li><span>6</span></li>
								 <li><span>8</span></li>
								 <li><span>3</span></li>
								 <li><span>7</span></li>
							 </ul>
						 </div>
						 <div class="rest-ft">
                 <ul class="ft-tit">
									 <li class="lis1">总和</li>
								   <li class="lis2">龙虎</li>
								 </ul>
                 <ul class="ft-body">
									  <li class="lis1">16</li>
										<li>大</li>
										<li>双</li>
										<li class="sou">龙</li>
								 </ul>
						 </div>
					</div>
							 <button class="agin">再来一注</button>
    </div>
</template>
<script type="text/babel">
import '../../../assets/scss/details.scss';
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

	}
  }
</script>
