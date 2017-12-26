<template>
	<div id="app">
		<!--<transition name="fade">-->
			<router-view class="view"></router-view>
		<!--</transition>-->
	</div>
</template>

<script type="text/babel">
	import './assets/css/style.css'
	// import './assets/css/main.css'
	// import './assets/scss/pcddpage.scss'
	// import './assets/css/Popup.css'
	// import './assets/font/iconfont.css';

	import './assets/scss/common/default/index.scss'
	import './assets/scss/home/index.scss'
	import './assets/scss/hall/index.scss'
	import './assets/scss/rechargeCenter/index.scss'
	import './assets/scss/betting/index.scss'
	import './assets/scss/personal/index.scss'
  /*规则*/
  import './assets/scss/rules/index.scss'
  /*开奖大厅*/
  import './assets/scss/common/theLottery/index.scss'
  /*登录*/
	import './assets/scss/login/login.scss'
  /*投注记录*/
  import './assets/scss/common/betting/index.scss'
  /*棋牌彩种*/
  import './assets/scss/common/lottery/index.scss'
	/*农场*/
	import './assets/scss/common/lottery/farm/index.scss'
	/*西部番摊*/
	import './assets/scss/common/lottery/western/index.scss'
  /*牌九*/
	import './assets/scss/common/lottery/paiGow/index.scss'
	
	require('./assets/js/jquery.fly.min');

	export default {
		name: 'app',
		mounted() {
			let that = this;
			let legouUser = that._Util.getLocalStorage('legouUser');

			if (legouUser) {
//		that._Util.post(that, that._Api.POST_LOGIN, {
//		  username: legouUser.username,
//		  password: legouUser.password
//		}, (data) => {}, () => {}, true);
			}

			that.$router.afterEach((to, from) => {
				that.$nextTick(function () {

				})
			})
		},
		methods:{

		}
	}
</script>

<style>
</style>
