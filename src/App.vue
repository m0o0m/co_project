<template>
	<div id="app">
		<!--<transition name="fade">-->
			<router-view class="view"></router-view>
		<!--</transition>-->
	</div>
</template>

<script type="text/babel">
	import './assets/css/style.css'
	import './assets/scss/common/default/index.scss'
  import './assets/scss/common/lottery/common.scss'
  /*充值中心*/
	import './assets/scss/rechargeCenter/index.scss'
	import './assets/scss/personal/index.scss'
  /*开奖大厅*/
  import './assets/scss/common/theLottery/index.scss'
	/*投注记录*/
  import './assets/scss/common/betting/index.scss'
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
