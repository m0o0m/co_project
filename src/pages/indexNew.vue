<template>
  <div class="indexMian" :class="{'indexBack' :resouseIndex == '1'}">
    <div slot="content">
      <div class="advertisement" v-if="marvellous === 0">
        <div class="adverted">
          <section>
            <img :src="downloadImg" alt="">
          </section>
          <section>
            <p>更多精彩尽在APP</p>
            <p>一键下载方便快捷易投注</p>
          </section>
          <section @click="terminalMarv">
            <a href="javascript:void(0)">下载</a>
          </section>
          <section @click="marvellousMarv"></section>
        </div>
      </div>
      <mt-swipe :auto="4000" @change="swipeChange" style="height: 6.8rem; padding-top: 2.48276rem;">
	      <mt-swipe-item v-if="showSwipeDefault">
		      <!--<a :href="item.hrefUrl"><img :src="item.picUrl"></a>-->
		      <a href="javascript: void(0);"><img src="../../static/banner/homeBanner.jpg"></a>
	      </mt-swipe-item>
        <mt-swipe-item v-for="(v, index) in bannerItems" :key="v.id">
          <!--<a :href="item.hrefUrl"><img :src="item.picUrl"></a>-->
          <a href="javascript: void(0);" @click.stop="openFrm(v)"><img :src="v.picUrl"></a>
        </mt-swipe-item>
      </mt-swipe>
      <!--<div class="slide-wrapper" style="height: 7.2rem;">
        <div class="slide-content">
          <slider ref="slide">
            <div v-for="item in bannerItems">
              &lt;!&ndash;<a :href="item.linkUrl">&ndash;&gt;
              <a href="javascript:void(0)">
                <img :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
      </div>-->
    </div>
    <!--<mt-swipe :auto="4000" style="height: 7.2rem;">-->
    <!--<mt-swipe-item v-for="item in bannerItems"><a :href="item.linkUrl"><img :src="item.picUrl"></a></mt-swipe-item>-->
    <!--</mt-swipe>-->
    <div class="rollNews">
      <div class="indexlottery">
        <ul>
          <li v-for="winning in resoutData.winningList">
            恭喜：用户<span>{{winning.username}}</span> 【{{winning.lottery_name}}】中奖
            <span>{{winning.amount}}</span> 元
          </li>
        </ul>
      </div>
      <div class="rollCuost">
        <a href="javascript:void(0)" @click="CustomerFunction"><img src="../assets/images/kefu.png"/></a>
      </div>
    </div>
    <div class="NavColor">
      <div class="NavColorMn">
        <ul>
          <li v-for="(navR,index) in navColor" :class="{'on':resouseIndex == index}"
              @click="navColorFunction(index)"></li>
        </ul>
      </div>
    </div>
    <div class="colorList">
      <!--彩票玩法-->
      <div class="colorListMian" v-show="resouseIndex == '0'">
        <ul>
          <li v-for="(color,index) in lotteryMenu.list.lottery_play">
            <a href="javascript:void(0)" @click="lettryGame(index,color.id)">
              <section>
                <figure><img :src="lotteryGame[1].lottery[index]"/></figure>
              </section>
              <section>{{color.name}}</section>
            </a>
          </li>
        </ul>
      </div>
      <!--棋牌玩法-->
      <div class="colorListMian" v-show="resouseIndex == '1'">
        <ul>
          <li v-for="(color,index) in lotteryMenu.list.chess_play">
            <a href="javascript:void(0)" @click="chessGame(index,color.id)">
              <section>
                <figure><img :src="lotteryGame[0].chess[index]"/></figure>
              </section>
              <section>{{color.name}}</section>
            </a>
          </li>
        </ul>
      </div>
      <!--首页公告弹出框-->
      <div class="indexNotice" v-if="indexNoticeIndex == '0'">
        <article class="indexNotice_mian">
          <section>
            <aside>{{indexNotice[0].title}}</aside>
            <article class="indexNotice_article" v-html="indexNotice[0].content">

            </article>
            <a href="javascript:void(0)" @click="indexNoticeIndex = 1"><img
                src="../assets/images/noticeDel.png"/></a>
          </section>
        </article>
      </div>
    </div>

    <OpenFrame :popupVisible="showOpenFrame" :showFrmBack="showFrmBack"
               @update:popupVisible="val => showOpenFrame = val" :toUrl="toUrl"></OpenFrame>
  </div>
</template>
<script type="text/babel">
	import HomeFooter from '../components/HomeFooterNew.vue'
	import OpenFrame from '../components/openFrame.vue'
	import '../assets/scss/default.scss'

	export default {
		name: 'indexMian',
		data() {
			return {
				showSwipeDefault: true,
				lotteryMenu: require('./lotteryMenu.json'),
				resoutData: '', //初始化数据
				resoutJson: [],
				downloadImg: require('../assets/images/iosDownload/Rectangle@2x.png'),
				indexBanner: [
					{
						img: require('../assets/images/index/banner/banner.png'),
						hrf: '#'
					}
				],
				//彩票玩法数据
				lotteryGame: [
					{
						chess: [],
						chessRef: []
					},
					{
						lottery: [],
						lotteryRef: []
					}
				],
				navColor: [
					{text: '彩票玩法'},
					{text: '棋牌玩法'}
				],
				resouseIndex: 0,
				auto: 3000,
				bannerItems: [],
				indexNotice: '',
				indexNoticeIndex: '',
				navIndexSet: '',
				showOpenFrame: false,
				showFrmBack: false,
				toUrl: '',
				marvellous: 0
			}
		},
		components: {
			OpenFrame
		},
		mounted() {
			this.initData();
//      this._Util.showConfirm(this, {content: "瞧一瞧，看一看，新鲜出炉"});
			$('.indexMian').css({
				'height': $(window).height()
			});
			//首頁
			let IndexName = this.$route.name;
			this.indexNoticeIndex = sessionStorage.getItem('indexId');
			this.navIndexSet = sessionStorage.getItem('setId');
			if (this.indexNoticeIndex == null) {
				sessionStorage.setItem('indexId', 1);
			} else {
				false;
			}
			if (this.navIndexSet == null) {
				false;
			} else {
				this.resouseIndex = sessionStorage.getItem('setId');
			}
			let IndexID = sessionStorage.getItem('indexId');
			if (IndexName == "index" && IndexID == '1') {
				this.indexNoticeIndex = 0;
				sessionStorage.setItem('indexId', 0);
			} else {
				this.indexNoticeIndex = '';
			}

			let getIndexRequestCode = this.GetRequest(),
				theRequestCode = getIndexRequestCode.code;

			if (!theRequestCode) {
				false;
			} else {
				localStorage.setItem("theRequestCode", theRequestCode);
			}
		},

		methods: {
			GetRequest() {
				let url = location.search;
				let theRequest = new Object();
				if (url.indexOf("?") != -1) {
					let str = url.substr(1);
					let strs = str.split("&");
					for (let i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
					}
				}
				return theRequest;
			},
			initData: function () {
				var that = this;
				that.getLotteryLocalData();
//      alert(that._Api.POST_HOME);
				that._Util.post(that, that._Api.POST_HOME, {}, (data) => {
					that.resoutData = data;
					// if ( typeof(that.resoutData.lotteryList.unofficial) == "undefined" || that.resoutData.lotteryList.unofficial == "" )//   return;
					// }
					//彩票数据
//					let lotteryEd = that.resoutData.lotteryList.unofficial.lottery_play,
//						lotteryStr = "",
//						lotteryHref = "";
//					for (var i = 0; i < lotteryEd.length; i++) {
//						lotteryStr = require('../assets/images/index/icon/' + lotteryEd[i].id + '.png');
//						if (lotteryEd[i].id <= '6' && lotteryEd[i].id != 3) {
//							lotteryHref = '/lottery/pcdd/index?game=' + lotteryEd[i].id + '';
//						} else {
//							switch (parseInt(lotteryEd[i].id)) {
//								case 3:
//									lotteryHref = 'XGNewslottery';
//									break;
//								case 12:
//									lotteryHref = 'XGlottery';
//									break;
//								case 23:
//									lotteryHref = 'theColorGD';
//									break;
//								case 24:
//									lotteryHref = 'theColor';
//									break;
//							}
//						}
//
//						that.lotteryGame[1].lottery.push(lotteryStr);
//						that.lotteryGame[1].lotteryRef.push(lotteryHref);
//					}
//					//棋牌彩票
//					let chessEd = that.resoutData.lotteryList.unofficial.chess_play,
//						chessStr = "",
//						chessHref = "";
//					for (var i = 0; i < chessEd.length; i++) {
//						chessStr = require('../assets/images/index/icon/' + chessEd[i].id + '.png');
//						switch (parseInt(chessEd[i].id)) {
//							case 13:
//								chessHref = 'turnTable';
//								break;
//							case 14:
//								chessHref = 'racing';
//								break;
//							case 15:
//								chessHref = 'showHand';
//								break;
//							case 16:
//								chessHref = 'cloudTop';
//								break;
//							case 17:
//								chessHref = 'farm';
//								break;
//							case 18:
//								chessHref = 'pknn';
//								break;
//							case 19:
//								chessHref = 'paiGow';
//								break;
//							case 20:
//								chessHref = 'Royal';
//								break;
//							case 21:
//								chessHref = 'western';
//								break;
//							case 22:
//								chessHref = 'swim';
//								break;
//						}
//						that.lotteryGame[0].chess.push(chessStr);
//						that.lotteryGame[0].chessRef.push(chessHref);
//					}
					//banner图
					let lotterybannerEd = that.resoutData.banner_list,
						lotteryBannerLen = lotterybannerEd.length;
					for (var i = 0; i < lotteryBannerLen; i++) {
						var lotStr = {
							linkUrl: '#',
							picUrl: lotterybannerEd[i].path,
							hrefUrl: lotterybannerEd[i].url + "&terminal=1",
							id: i
						};
						//var lotStr = {title:"",style: {background: 'url(' + lotterybannerEd[i].path + ')'}};
						that.bannerItems.push(lotStr);
					}
					//弹框
					that.indexNotice = that.resoutData.boxNoticeList;
					if (that.indexNotice.length === 0) {
						that.indexNoticeIndex = 1;
					}
					this.wufengFunction();
					//alert(JSON.parse(JSON.stringify(that.resoutData.lotteryList.unofficial.chess_play || '')))
				}, () => {
				}, true);
			},

//            swipeBanner(index) {
//			    window.location = this.bannerItems[index].hrefUrl;
//            },

			getLotteryLocalData() {
				let that = this;
				let lotteryEd = that.lotteryMenu.list.lottery_play,
					lotteryStr = "",
					lotteryHref = "";
				for (var i = 0; i < lotteryEd.length; i++) {
					lotteryStr = require('../assets/images/index/icon/' + lotteryEd[i].id + '.png');
					if (lotteryEd[i].id <= '6' && lotteryEd[i].id != 3) {
						lotteryHref = '/lottery/pcdd/index?game=' + lotteryEd[i].id + '';
					} else {
						switch (parseInt(lotteryEd[i].id)) {
							case 3:
								lotteryHref = 'XGNewslottery';
								break;
							case 12:
								lotteryHref = 'XGlottery';
								break;
							case 23:
								lotteryHref = 'theColorGD';
								break;
							case 24:
								lotteryHref = 'theColor';
								break;
						}
					}

					that.lotteryGame[1].lottery.push(lotteryStr);
					that.lotteryGame[1].lotteryRef.push(lotteryHref);
				}
				//棋牌彩票
				let chessEd = that.lotteryMenu.list.chess_play,
					chessStr = "",
					chessHref = "";
				for (var i = 0; i < chessEd.length; i++) {
					chessStr = require('../assets/images/index/icon/' + chessEd[i].id + '.png');
					switch (parseInt(chessEd[i].id)) {
						case 13:
							chessHref = 'turnTable';
							break;
						case 14:
							chessHref = 'racing';
							break;
						case 15:
							chessHref = 'showHand';
							break;
						case 16:
							chessHref = 'cloudTop';
							break;
						case 17:
							chessHref = 'farm';
							break;
						case 18:
							chessHref = 'pknn';
							break;
						case 19:
							chessHref = 'paiGow';
							break;
						case 20:
							chessHref = 'Royal';
							break;
						case 21:
							chessHref = 'western';
							break;
						case 22:
							chessHref = 'swim';
							break;
					}
					that.lotteryGame[0].chess.push(chessStr);
					that.lotteryGame[0].chessRef.push(chessHref);
				}
			},

			lettryGame: function (index, id) {
				var that = this;
				if (id <= 6 && id != 3) {
					that.$router.push({name: 'pcdd', query: {game: id}});
					//window.location.href = that.lotteryGame[1].lotteryRef[index];
				} else {
					that.$router.push({'name': that.lotteryGame[1].lotteryRef[index]});
				}
				/*that._Util.post(that, that._Api.POST_LOTTERY_RECTOR_DETAIL, {id: id}, (data) => {
				  var statusIndex = data.status;
					if (statusIndex == '0') {
						that._Util.showAlert(that, {content: data.kj_cycle});
					} else {
						if (id <= 6 && id != 3) {
							that.$router.push({name: 'pcdd', query: {game: id}});
							//window.location.href = that.lotteryGame[1].lotteryRef[index];
						} else {
							that.$router.push({'name': that.lotteryGame[1].lotteryRef[index]});
						}

					}
				});*/
			},
			marvellousMarv: function () {
				let that = this;
				that.marvellous = 1;
				$(".mint-swipe").animate({paddingTop: "0"}, 500);
			},
			terminalMarv: function() {
				var that = this;
        let terminal = that._Util.browser();
        if (terminal.versions.android) {
        	console.log('android')
        } else if (browser.versions.ios) {
        	console.log('ios');
        }
      },
			CustomerFunction: function () {
				let that = this;
				that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
					window.location.href = data.value;
				})
			},
			chessGame: function (index, id) {
				var that = this;
				that._Util.post(that, that._Api.POST_LOTTERY_RECTOR_DETAIL, {id: id}, (data) => {
					var statusIndex = data.status;
					if (statusIndex == '0') {
						that._Util.showAlert(that, {content: data.kj_cycle});
					} else {
						this.$router.push({'name': this.lotteryGame[0].chessRef[index]});
					}
				});

			},
			navColorFunction: function (index) {
				this.resouseIndex = index;
				sessionStorage.setItem('setId', index);
			},
			wufengFunction: function () {
				var _this = this;
				var lotteryDiv = $('.indexlottery');
				var timer = null;
				lotteryDiv.mouseover(function () {
					clearInterval(timer);
				}).mouseout(function () {
					timer = setInterval(function () {
						_this.scroll(lotteryDiv);
					}, 3000);
				}).trigger("mouseout");
			},

			openFrm(v) {
				let that = this;
				console.log(JSON.parse(JSON.stringify(v)));
				that.toUrl = v.hrefUrl;
				that.showFrmBack = false;
				that.showOpenFrame = true;
			},

			scroll: function (obj) {
				var oLi = obj.find("ul:first");
				var lineHeight = oLi.find("li:first").height();
				oLi.animate({
						"margin-top": -lineHeight + "px"
					},
					500,
					function () {
						oLi.css({
							"margin-top": "0px"
						}).find("li:first").appendTo(oLi);
					})
			},

			swipeChange(index) {
				if (index === 1) {
					this.showSwipeDefault = false;
				}
			}
		}
	}
</script>

<style lang="scss">
  #app {
    background: transparent;
  }

  .slide-wrapper {
    position: relative;
    width: 100%;
    height: rem(1 50);
    overflow: hidden;

    .slide-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

  }


</style>