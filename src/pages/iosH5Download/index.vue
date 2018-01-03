<template>
  <div class="iosH5Download">
    <div class="top">
      <a href="javascript:void (0);">
        <div class="back"></div>
      </a>
      <a href="javascript:void (0);">
        <div class="more">
          <i></i>
          <i></i>
          <i></i>
        </div>
      </a>
      <div class="title">棋牌彩票下载</div>
    </div>
    <div class="content_box">
      <div class="download">
        <div>
          <div class="content">
            <div class="logo ">
              <img src="../../assets/images/iosH5download/Rectangle@2x.png" alt="">
            </div>
            <div class="message">
              <div class="container">
                <h3>棋牌彩票</h3>
                <p>正式版-1.04（Build 1.04）-30115.25KB<br>
                  更新于：2018-1-03 22:00</p>
                <a href="itms-services://?action=download-manifest&url=https://download.qpcp10.com/ios/qpcp.plist"
                   class="download indexJust">下载安装</a>
                <a id="install_step" @click="show_steps">安装步骤</a>
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


        </div>
      </div>
    </div>

  </div>
</template>

<script>
	import "../../assets/css/style.css";

	import $ from "jquery";

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

			}
		},
		mounted() {
		},
		methods: {
			close_steps() {
				$("#install_steps").hide();
			},
			show_steps() {
				$("#install_steps").show();
			}

		},
		components: {}
	}
</script>

<style lang="scss" rel="styleheet/scss">
  @function rem($px,$designWidth:375) {
  @return $px*450/$designWidth/29 + rem;
  }
  html, body {
    height: 100%;
  }

  #app, .view {
    height: 100%;
  }

  .iosH5Download {
    background-color: #fff;
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
    box-sizing: border-box;
  }

  .content_box {
    padding: rem(144) rem(75) 0;
    background: url("../../assets/images/iosH5download/bg_l.png") left top no-repeat, url("../../assets/images/iosH5download/bg_r.png") right top no-repeat;
    background-size: rem(68) rem(282);
  }

  .download {
    height: 100%;
  }

  .top {
    background-color: #ff0000;
    width: 100%;
    height: rem(44);
    overflow: hidden;
  }

  .top .back {
    width: rem(30);
    height: rem(30);
    background: url('../../assets/images/iosH5download/left_arrow@2x.png') center center no-repeat;
    background-size: cover;
    background-size: rem(30);
    margin: rem(9) 0 0 0;
    float: left;
  }

  .top .more {
    float: right;
    width: rem(30);
    height: rem(20);
    margin: rem(16) rem(16) 0 0;
    vertical-align: top;
  }

  .top .more i {
    display: inline-block;
    width: rem(5);
    height: rem(5);
    border-radius: 50%;
    background-color: #fff;
    vertical-align: top;
  }

  .top .title {
    overflow: hidden;
    color: #fff;
    font-size: rem(16);
    text-align: center;
    line-height: rem(44);
  }

  .logo {
    overflow: hidden;
  }

  .logo img {
    width: rem(110);
    height: rem(110);
    display: block;
    margin: 0 auto;
    margin-bottom: rem(26);
    background: url('../../assets/images/iosH5download/Rectangle@1x.png') center no-repeat;
    background-size: 100%;
  }

  .container {
    text-align: center;
    margin: 0 auto;
  }

  .message h3 {
    font-weight: 700;
    margin: 0;
    padding: 0;
    margin-bottom: rem(24);
    font-family: Arial;
    font-size: rem(16);
    color: #505556;
    letter-spacing: 0;
  }

  .message p {
    font-family: 微软雅黑;
    font-size: rem(12);
    color: #A9B1B3;
    letter-spacing: 0;
    padding: rem(20) rem(12);
    border-top: rem(1) solid #A9B1B3;
  }

  .container a {
    border: rem(1) solid #A9B1B3;
    border-radius: rem(42);
    width: rem(183);
    height: rem(42);
    display: block;
    margin: 0 auto;
    line-height: rem(42);
    margin-bottom: rem(20);
    margin-top: rem(5);
    font-family: 微软雅黑;
    font-size: rem(14);
    color: #868C8E;
    letter-spacing: 0;
  }

  .container a:last-child {
    color: #F8B420;
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
    width: 100%;
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

</style>