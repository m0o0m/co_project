<template>
   
    <div id="bgimg">
			 <!-- <button @click="changeSelect = !changeSelect">采种选择</button> -->
				<LotterySelect v-if="changeSelect"></LotterySelect>
          <div class="tit"> 
						<span class="rig"></span> 
					  <span class="titimg">重庆时时彩<img src="../../../assets/images/bTArrow.png" alt=""></span>
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

import '../../../assets/scss/record.scss';
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
