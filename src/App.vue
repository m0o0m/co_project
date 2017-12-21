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
  import './assets/scss/betting/index.scss'
//	import './assets/scss/index.scss'

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
					let NextHeight = $(window).height();
					let headerH = $(".headered_muned").outerHeight(true),
						DeliveryTime = $(".DeliveryTime").outerHeight(true);
					$(".salesCls").css({
						"height": NextHeight - headerH - DeliveryTime,
						"top": headerH + DeliveryTime
					});
					$('.lottery_Height').css({
						"min-height": NextHeight - $('.lotteryMun').height()
					});
					$(".activityList").css({"height": NextHeight});
//          $("iframe").css({
//            "height": NextHeight*0.5
//          });
//
					$('.moneyTemplateed').css({
						"height": NextHeight
					});
					$(".confirmListed").css({
						"height": NextHeight * 0.63
					})
					$(".pcdd_mian_lineHeight_04").css({
						"height": NextHeight * 0.55
					});
					$(".tempDivMargin").css({
						"height": NextHeight,
						"overflow": "hidden"
					});
					$(".pcdd_Mian_Vh").css({
						"padding-top": "5.18966rem"
					});
					$(".contentemplate").css({
						"height": NextHeight
					});
					$(".pcdd_Mian_bjpk10").css({
						"padding-top": "4.96552rem"
					});

					var headerHeight = $(".headered").outerHeight(true),
						footerHeight = $(".westernFooter").outerHeight(true);
					//开奖大厅
					// var lotteryMun = $(".lotteryMun").outerHeight(true);
					// $(".lotteryDate").css({
					// 	"height": NextHeight - lotteryMun - NextHeight * 0.05
					// });
					$(".lotteryDateed").css({
						"height": NextHeight - NextHeight * 0.15
					});
					$(".beimg_cls").css({
						"height": NextHeight - NextHeight * 0.15
					});
					$(".swimMun_top_height").css({
						"height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.06))
					});
					//马尼哈所
					$(".paiGow_mun_LHeight").css({
						"height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.13))
					});
					//云顶
					$(".cloudTop_mun_LHeight").css({
						"height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.15))
					});
					//pk牛牛
					$(".pknn_mun_LHeight").css({
						"height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.15))
					});
					//华夏牌九
					$(".paiGow_mian_hxpj").css({
						"height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.15))
					});
          //皇家二八杠
          $(".royal_mun_padder").css({
            "height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.105))
          });
					//二八杠
					$(".pcdd_Mian_Vh_pcdd").css({
						"height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.04))
					});
					$(window).resize(function () {
						that.lotteryInit(headerHeight,footerHeight);
					})
				})
			})
		},
		methods:{
		  lotteryInit(headerHeight,footerHeight){
        let NextHeight = $(window).height();
        $(".swimMun_top_height").css({
          "height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.06))
        });
        //马尼哈所
        $(".paiGow_mun_LHeight").css({
          "height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.13))
        });
        $(".paiGow_mun_RHeight").css({
          "height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.2))
        });
        //雲頂
        $(".cloudTop_mun_LHeight").css({
          "height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.15))
        });
        $(".cloudTop_mun_RHeight").css({
          "height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.3))
        });
        //pk牛牛
        $(".pknn_mun_LHeight").css({
          "height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.15))
        });
        $(".pknn_mun_RHeight").css({
          "height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.3))
        });
        //华夏牌九
        $(".paiGow_mian_hxpj").css({
          "height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.15))
        });
        //皇家二八杠
        $(".royal_mun_padder").css({
          "height": NextHeight - (headerHeight + footerHeight + (NextHeight * 0.105))
        });
			}
		}
	}
</script>

<style>
	/*.view {*/
	/*height: 100% !important;*/
	/*}*/
	.lottery_Height {
		background: url('assets/images/index/bg.png') center center no-repeat;
		background-size: cover;
	}
</style>
