<template>
  <div class="iosdownload">

    <div class="iosdownload_box">
      <div class="iosdownload_content">
        <div class="logo">
          <img src="../../assets/images/iosDownload/Rectangle@2x.png" alt="">
          <!--<h3>棋牌彩票</h3>-->
        </div>
        <div class="add_download">
          <div class="title">
            <span></span>
            <span></span>
          </div>
          <div class="add" v-for="(down,down_index) in downloadText" @click="downloadMost(down_index)">
            <a :href="addDownUrl">{{down.text}}</a>
          </div>
        </div>
        <div class="steps" id="install_step" @click="show_steps" v-show="step">
          <span></span>
          <span>安装步骤</span>
        </div>
        <div class="footer">
          <p>正式版-1.04(Build 1.04)-30115.25KB<br/>
            更新于：2018-01-03 22:00</p>
        </div>
      </div>
    </div>
    <div class="install_steps" id="install_steps">
      <div class="steps">
        <div class="swiper-container">
          <mt-swipe :auto="0" :continuous="false" :defaultIndex="0" :prevent="true" :speed="200">
            <mt-swipe-item v-for="(value, index) in swiperimgarr" :key="index">
              <img :src="value" alt="">
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
      <div class="close" @click="close_steps"></div>
    </div>
    <div class="guidance_box" v-if="isWeiXin()">
      <!--<div class="top">-->
      <!--<a href="javascript:void (0);">-->
      <!--<div class="back"></div>-->
      <!--</a>-->
      <!--<a href="javascript:void (0);">-->
      <!--<div class="more">-->
      <!--<i></i>-->
      <!--<i></i>-->
      <!--<i></i>-->
      <!--</div>-->
      <!--</a>-->
      <!--<div class="title">棋牌彩票下载</div>-->
      <!--</div>-->
      <!--<div class="content"></div>-->
      <div class="close" @click="close_guidance"></div>
    </div>

    <!--微信-->
    <div class="tempBack" v-if="isWeiXin()">
      <article class="tempB_mun">
        <figure><img src="../../assets/images/jiantou2x.png"/></figure>
        <aside>点击右上角分享按钮，然后选择在"浏览器中打开"</aside>
        <section v-if="!_Util.browser().versions.android" >
          <p><img src="../../assets/images/1.png" class="assetsCls"/>点击右上角···图标</p>
          <p><img src="../../assets/images/2.png" class="assetsCls"/>选择<img src="../../assets/images/s2x.png" class="sxCls"/>在浏览器中打开</p>
          <p><img src="../../assets/images/3.png" class="assetsCls"/>在打开的页面中下载</p>
        </section>
        <section v-if="_Util.browser().versions.android" >
          <p style="vertical-align:middle;"><img src="../../assets/images/1.png" class="assetsCls"/>点击右上角 <img style="width: 0.2rem ;height: 0.8rem;margin: 0 0.1rem;display: inline-block;position: relative;top:0.2rem;" src="../../assets/images/s4x.png" alt=""> 图标</p>
          <p><img src="../../assets/images/2.png" class="assetsCls"/>选择
            <img  src="../../assets/images/s3x.png"class="sxCls"/>在浏览器中打开</p>
          <p><img src="../../assets/images/3.png" class="assetsCls"/>在打开的页面中下载</p>
        </section>
        <div v-if="!_Util.browser().versions.android" class="tempB_img"><img src="../../assets/images/Bitmap2x.png" class="bitmaps"/></div>
      </article>
    </div>
    <!--360-->
    <div class="tempBack" v-if="browserThe()">
      <article class="tempB_mun">
        <figure><img src="../../assets/images/jiantou2x.png"/></figure>
        <!--<aside>点击右上角分享按钮，然后选择在"浏览器中打开"</aside>-->
        <section style="margin-top:0.8rem;">
          <p><img src="../../assets/images/1.png" class="assetsCls"/>请复制该链接</p>
          <p><img src="../../assets/images/2.png" class="assetsCls"/>回到桌面打开手机自带浏览器<img
              src="../../assets/images/s2x.png" class="sxCls"/></p>
          <p><img src="../../assets/images/3.png" class="assetsCls"/>粘贴该网址点击下载</p>
        </section>
        <!--<div class="tempB_img"><img src="../../assets/images/Bitmap2x.png" class="bitmaps"/></div>-->
      </article>
    </div>
  </div>
</template>

<script>


	export default {
		data() {
			return {
				swiperimgarr: [
					require("../../assets/images/iosH5download/downloadpage2.png"),
					require("../../assets/images/iosH5download/downloadpage3.png"),
					require("../../assets/images/iosH5download/downloadpage4.png"),
					require("../../assets/images/iosH5download/downloadpage5.png"),
					require("../../assets/images/iosH5download/downloadpage6.png"),
					require("../../assets/images/iosH5download/downloadpage7.png")],
				addDownUrl: "javascript:void(0)",
				localCode: 0,
				localTerm: '',
				downloadText: [
					{
						text: '下载地址1'
					},
					{
						text: '下载地址2'
					},
					{
						text: '下载地址3'
					}
				],
				HideId: 0,
				step: false
			}
		},
		mounted() {
      this._Util.setCss('.tempBack ,.install_steps',{"height": 1},"*");
      this._Util.setCss('.iosdownload',{"height": 0.9},"*");
			this.iosH5Downquest();
		},
		methods: {
			close_steps() {
				$("#install_steps").hide();
			},
			show_steps() {
				$("#install_steps").show();
			},
			close_guidance() {
				$(".tempBack").hide();
				$('.guidance_box').hide();
			},
			isWeiXin() {
				var ua = window.navigator.userAgent.toLowerCase();
				//ua.match(/QQ/i) == " qq"
				if (ua.match(/MicroMessenger/i) == 'micromessenger' || (ua.match(/QQ/i) == "qq" && navigator.userAgent.indexOf('QQBrowser') == -1)) {
					return true;
				} else {
					return false;
				}
			},
			GetRequest() {
				var url = location.search; //获取url中"?"符后的字串
				var theRequest = new Object();
				var strs = "";
				if (url.indexOf("?") != -1) {
					var str = url.substr(1);
					strs = str.split("&");
					for (var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
					}
				}
				return theRequest;
			},
			downloadMost(index) {
				var that = this;
				if(that.HideId === 1) return that._Util.showAlert(that, {content: '正在下载，请耐心等待'});
				that.HideId = 1;
				that.downloadText[index].text = '下载中...';
			},
			iosH5Downquest() {
				var that = this;
				that.addDownUrl = "javascript:void(0)";
				that.localCode = that.$route.query.code*1 || 1;
				let terminalIos = that._Util.browser();
				if (terminalIos.versions.android) {
					that.localTerm = "android";
					that.step = false;
				} else if(terminalIos.versions.ios) {
					that.localTerm = "ios";
					that.step = true;
				};
				let params = {
					type: that.localTerm,
					code: that.localCode
				};
				that._Util.post(that, that._Api.POST_APP_CLIENT, params, (data) => {
					that.addDownUrl = data.url;
//                window.location.href=data.url
				});
				// if (terminalIos.versions.ios) {
				//
				// }
//           this.addDownUrl = "javascript:void(0)";
//           var codeVal = sessionStorage.getItem('openAccountCode');
//             var codeText = "";
//             if(!codeVal) {
//                 false;
//             }else{
//                 codeText = codeVal.code;
//             }
//             var that = this,
//                 params = {
//                     type: "ios",
//                     code: that.$route.query.code || 1
//
//                 };
//             that._Util.post(that, that._Api.POST_APP_CLIENT, params, (data) => {
//                 that.addDownUrl = data.url;
// //                window.location.href=data.url
//             });
			},
			browserThe() {
				var OsObject = navigator.userAgent;
				var ua = window.navigator.userAgent.toLowerCase();
				let _terminalIos = this._Util.browser();
				if(_terminalIos.versions.android) return;
				if (OsObject.indexOf("UCBrowser") != -1 || OsObject.toLowerCase().indexOf('baidu') > 0 || navigator.userAgent.indexOf('QQBrowser') !== -1) {
					return true;
				} else {
					if ((window.navigator.mimeTypes[40] || !window.navigator.mimeTypes.length) && ua.match(/MicroMessenger/i) != 'micromessenger' && ua.match(/QQ/i) != "qq" && OsObject.toLowerCase().indexOf("safari") < 0) {
						return true;
					} else {
						return false;
					}
				}


			}
		},
		components: {}
	}
</script>

<style lang="scss" rel="styleheet/css">

  @function rem($px,$designWidth:375) {
    @return $px*450/$designWidth/29 + rem;
  }

  .iosdownload_box {
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
    /*box-sizing: border-box;*/
  }

  .iosdownload {
    background: url("../../assets/images/download/h5Download/head_bg.png") center center no-repeat;
    background-size: cover;
    height: 100%;
  }

  /*引导页样式*/
  .guidance_box {
    /*display: none;*/
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .guidance_box .top {
    background-color: #000;
    width: 100%;
    height: rem(44);
    overflow: hidden;
  }

  .guidance_box .top .back {
    width: rem(30);
    height: rem(30);
    background: url('../../assets/images/iosH5download/left_arrow@2x.png') center center no-repeat;
    background-size: cover;
    background-size: rem(30);
    margin: rem(9) 0 0 0;
    float: left;
  }

  .guidance_box .top .more {
    float: right;
    width: rem(30);
    height: rem(20);
    margin: rem(16) rem(16) 0 0;
    vertical-align: top;
  }

  .guidance_box .top .more i {
    display: inline-block;
    width: rem(5);
    height: rem(5);
    border-radius: 50%;
    background-color: #fff;
    vertical-align: top;
  }

  .guidance_box .top .title {
    overflow: hidden;
    color: #fff;
    font-size: rem(16);
    text-align: center;
    line-height: rem(44);
  }

  .guidance_box .content {
    width: 100%;
    height: 100%;
    background: url('../../assets/images/iosDownload/page-1.png') center center no-repeat;
    background-size: cover;
  }

  .guidance_box .close {
    background: url("../../assets/images/iosH5download/emptyIcon.png") center center no-repeat;
    background-size: cover;
    width: rem(30);
    height: rem(30);
    position: absolute;
    left: rem(15);
    top: rem(15);
    z-index: 5;
  }

  .iosdownload {
    padding-top: rem(42);
  }

  .iosdownload_content {
    width: rem(189);
    margin: 0 auto;
    text-align: center;
    /*height: 100px;*/
    /*background-color: #0B2668;*/
    .logo {
      width: 100%;
      img {
        width: rem(110);
        height: rem(110);
        margin: 0 auto;
      }
      h3 {
        font-family: Arial;
        font-size: rem(18);
        color: #FFDC99;
        margin-top: rem(9);
        margin-bottom: rem(30);
      }
    }
  }

  .iosdownload_content .add_download {
    border: rem(1) solid transparent;
    /*background-color: #21102C;*/
    border-radius: rem(4);
    padding: rem(10) rem(0) rem(21);
    .add {
      margin-top: rem(12);
      a {
        display: block;
        height: rem(34);
        box-shadow: inset 0 0 rem(3) 0 #FFF6CF;
        border-radius: rem(17);
        font-family: Arial;
        font-size: rem(14);
        color: #65431D;
        background-color: #fff;
        letter-spacing: rem(3);
        line-height: rem(34);
        background-image: radial-gradient(#B79F71 0%, #E4D3AA 63%, #E4D7B5 100%);
        background-image: -webkit-radial-gradient(96% -10%, #B79F71 0%, #E4D3AA 63%, #E4D7B5 100%);
        background-image: -moz-radial-gradient(96% -10%, #B79F71 0%, #E4D3AA 63%, #E4D7B5 100%);
        background-image: -ms-radial-gradient(96% -10%, #B79F71 0%, #E4D3AA 63%, #E4D7B5 100%);
        background-image: -o-radial-gradient(96% -10%, #B79F71 0%, #E4D3AA 63%, #E4D7B5 100%);
      }
    }
    .title {
      span {
        display: inline-block;
        font-family: Arial;
        font-size: rem(14);
        color: #FFDC99;
        letter-spacing: rem(3);
        line-height: rem(14);
        vertical-align: middle;
        &:first-child {
          width: rem(21);
          height: rem(25);
          background: url('../../assets/images/iosDownload/iphone@2x.png') center center no-repeat;
          background-size: cover;
        }
        &:last-child {
          width: rem(21);
          height: rem(25);
          background: url('../../assets/images/iosDownload/android.png') center center no-repeat;
          background-size: cover;
        }
      }
    }
  }

  .iosdownload_content .steps {
    background: #21102C;
    border-radius: rem(18);
    text-align: center;
    border: rem(1) solid #F0DDAE;
    margin-top: rem(11);

    span {
      font-family: Arial;
      font-size: rem(14);
      color: #FFDC99;
      display: inline-block;
      letter-spacing: rem(3);

      vertical-align: middle;
      &:first-child {
        background: url('../../assets/images/iosDownload/steps.png') center center no-repeat;
        background-size: cover;
        width: rem(32);
        height: rem(8);

      }
      &:last-child {
        height: rem(36);
        line-height: rem(36);
      }
    }

  }

  .footer {
    margin-top: rem(37);
    padding-bottom: rem(50);
    p {
      font-family: Arial;
      font-size: rem(12);
      color: #FFDC99;
      line-height: rem(20);
    }
  }

  .install_steps {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    background-color: rgba(0, 0, 0, .7);
    padding: rem(32);
    overflow: hidden;
    z-index: 4;
  }

  .steps {
    overflow: hidden;
    height: 100%;
  }

  .install_steps .close {
    width: rem(30);
    height: rem(30);
    position: fixed;
    top: rem(10);
    right: rem(10);
    background: url("../../assets/images/iosH5download/emptyIcon.png") center center no-repeat;
    background-size: cover;
  }

  .swiper-container {
    width: 82%;
    height: 100%;
  }

  .pagination-bullet {
    width: rem(8);
    height: rem(8);
    margin: 0 rem(5);
    display: inline-block;
    border-radius: 100%;
    opacity: 0.8;
    background: #fff;
  }

  .mint-swipe-indicator {
    width: rem(8);
    height: rem(8);
    border-radius: 100%;
    opacity: 0.8;
    margin: 0 rem(5);
    background: #fff;
  }

  .mint-swipe-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  .mint-swipe-indicator.is-active {
    opacity: 1;
    background: #ff0000;
  }

  .tempBack {
    position: fixed;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    z-index: 3;
  }

  .tempB_mun {
    width: 80%;
    margin: rem(15) auto;
    figure {
      text-align: right;
      img {
        width: rem(75);
        display: inline-block;
      }
    }
    aside {
      font-size: rem(22);
      color: #FFC71C;
      line-height: rem(30);
    }
    section {
      .assetsCls {
        width: rem(24);
        height: rem(24);
        display: inline-block;
        position: relative;
        top: rem(6);
        margin-right: rem(10);
      }
      p {
        font-size: rem(16);
        color: #FFFFFF;
        width: 100%;
        line-height: rem(30);
        margin: rem(10) 0;
      }
      .sxCls {
        width: rem(31);
        height: rem(31);
        display: inline-block;
        position: relative;
        top: rem(10);
        margin: 0 rem(10);
      }
    }
  }

  .tempB_img {
    width: 90%;
    margin: 0px auto;
    text-align: right;
    margin-top: rem(30);
    img {
      display: inline-block;
    }
  }
</style>