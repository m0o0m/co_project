<template>
  <div class="download">
    <!--中间下载内容区-->
    <div class="download_content_box">
      <div class="download_content">
        <div @click.stop="toHome()" class="continue indexJust">
          <div>
            <i></i>
            <p>继续访问</p>
          </div>
        </div>
        <div @click="download()" class="client_download indexJust">
          <div>
            <p>
              <i></i>
              <i></i>
            </p>
            <p>客户端下载</p>
          </div>
        </div>
      </div>
    </div>
    <div class="tempBack" v-if="trues">
      <article class="tempB_mun">
        <figure><img src="../../assets/images/jiantou2x.png"/></figure>
        <aside>点击右上角分享按钮，然后选择在"浏览器中打开"</aside>
        <section>
          <p><img src="../../assets/images/1.png" class="assetsCls"/>点击右上角···图标</p>
          <p><img src="../../assets/images/2.png" class="assetsCls"/>选择<img src="../../assets/images/s2x.png"
                                                                            class="sxCls"/>在浏览器中打开</p>
          <p><img src="../../assets/images/3.png" class="assetsCls"/>在打开的页面中下载</p>
        </section>
        <div class="tempB_img"><img src="../../assets/images/Bitmap2x.png" class="bitmaps"/></div>
      </article>
    </div>
    <!--底部-->
    <div class="download_footer">
      <div class="contact_way">
        <div class="wechart indexJust">
          <div>
            <div>
              <i></i>
              <span>官方微信</span>
            </div>
            <h4>97966666</h4>
          </div>
        </div>
        <div class="qq indexJust">
          <div>
            <div>
              <i></i>
              <span>官方QQ</span>
            </div>
            <h4>97966666</h4>
          </div>
        </div>
      </div>
      <p>@棋牌彩票销售有限公司
        <a v-if="beianDomain" href="http://www.miitbeian.gov.cn/"
           target="_blank" style="display: block; color: #FFDC99; font-size: 0.5rem">{{beian[beianDomain]}}</a></p>
      <!--<p><a href="http://www.miitbeian.gov.cn/" target="_blank">沪ICP备17047497</a></p>-->
    </div>
  </div>

</template>

<script type="text/babel">
  import '../../assets/scss/download.scss'
  import '../../assets/css/style.css'
  import $ from 'jquery'
  
  export default {
    data() {
      return {
        beian: {
          qpcp: '沪ICP备17049649号',
          qpcp0: '沪ICP备17047497号',
          qpcp1: '沪ICP备17043726号',
          qpcp3: '沪ICP备17043726号',
          qpcp4: '沪ICP备17043726号',
          qpcp5: '沪ICP备17043726号',
          qpcp6: '沪ICP备17043726号',
          qpcp7: '沪ICP备17043726号',
          qpcp8: '沪ICP备17043726号',
          qpcp9: '沪ICP备17047497号',
          qpcp66: '沪ICP备17047497号',
          qpcp88: '沪ICP备17047497号'
        },
        beianDomain: '',
        isQpcp9: window.location.host.indexOf('qpcp9') !== -1,
        isQpcp: window.location.host.indexOf('qpcp') !== -1,
        trues: false,
      }
    },
    mounted() {
      $(".download").css({
        "position": "relative",
        "height": $(window).height()
      })
      
      if (this.$route.query.code) {
        sessionStorage.setItem('openAccountCode', this.$route.query.code);
      }
      this.getDomain();
    },
    methods: {
      getDomain(str) {
        let domain = str || document.domain;
        if (domain.indexOf('m.') !== -1) {
          this.beianDomain = domain.match(/m.(\S*).com/)[1];
        }
      },
      
      toHome() {
        let domin = window.location.host;
        let code = this.$route.query.code;
        if (domin.indexOf('qpcp') !== -1 && domin.indexOf('qpcp9') === -1) {
          let url = 'https://m.qpcp9.com/home';
          if (code) {
            url += '?code=' + code;
          }
          window.location.href = url;
        } else {
          if (domin.indexOf('qpcp68') !== -1
            && domin.indexOf('192') === -1
            && domin.indexOf('git') === -1
            && domin.indexOf('localhost') === -1) {
            let url = 'https://m.qpcp9.com/home';
            if (code) {
              url += '?code=' + code;
            }
            window.location.href = url;
          } else {
            this.$router.push({name: 'home', query: {code: this.$route.query.code}});
          }
        }
      },
      
      
      browser() {
        //判断访问终端
        var browser = {
          versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
              trident: u.indexOf('Trident') > -1, //IE内核
              presto: u.indexOf('Presto') > -1, //opera内核
              webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
              gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
              mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
              ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
              android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
              iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
              iPad: u.indexOf('iPad') > -1, //是否iPad
              webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
              weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
              qq: u.match(/\sQQ/i) == "qq" //是否QQ
            };
          }(),
          language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }
        return browser;
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
      download() {
        //判断是否android端
        var browser = this.browser();
        var codeVal = sessionStorage.getItem('openAccountCode');
        if (browser.versions.android) {
          if (browser.versions.weixin || browser.versions.qq) {
            let that = this;
            that.trues = true;
            return;
          }
//					alert("is android");
          //跳转Android的下载地址
//          location.href = "https://download.qpcp10.com/android/qpcp.apk";
          var codeText = "";
          if (!codeVal) {
            false;
          } else {
            codeText = codeVal.code;
          }
          var that = this,
            params = {
              type: "android",
              code: codeText
              
            };
          that._Util.post(that, that._Api.POST_APP_CLIENT, params, (data) => {
            location.href = data.url;
          });
          //location.href = "https://res.yfunion.com/android/qpcp_v1.0.0.apk";
//          location.href = "https://yfunion.com/android/qpcp_v1.0.0.apk";
        }
        //判断是否ios端
        if (browser.versions.ios) {
//					alert("is ios");

//          this.$router.push({name: 'iosH5Download'});
          //跳转iOS的下载地址
          
          if (browser.versions.weixin || browser.versions.qq) {
            let that = this;
            that.trues = true;
            return;
          }

//	        if () {
//		        let that = this;alert(23);
//		        that.trues = true;
//		        return;
//	        }
          if (!this.$route.query.code) {
            location.href = 'https://m.qpcp9.com/lottery/iosDownload';
//                location.href = 'http://192.168.1.116:8088/lottery/iosDownload';
          } else {
//              location.href = 'http://192.168.1.116:8088/lottery/iosDownload?code='+codeVal.code+'';
            location.href = 'https://m.qpcp9.com/lottery/iosDownload?code=' + this.$route.query.code + '';
          }
        }
        //微信
        
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
    background: url("../../assets/images/iosDownload/bg_ios_download.png") center center no-repeat;
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
    border: rem(2) solid #F0DDAE;
    background-color: #21102C;
    border-radius: rem(4);
    padding: rem(10) rem(16) rem(21);
  
  .add {
    margin-top: rem(12);
  
  a {
    display: block;
    height: rem(34);
    box-shadow: inset 0 0 rem(3) 0 #FFF6CF;
    border-radius: rem(4);
    font-family: Arial;
    font-size: rem(14);
    color: #65431D;
    background-color: #fff;
    letter-spacing: rem(3);
    line-height: rem(34);
    background-image: radial-gradient(96% -10%, #B79F71 0%, #E4D3AA 63%, #E4D7B5 100%);
    background-image: -webkit-radial-gradient(96% -10%, #B79F71 0%, #E4D3AA 63%, #E4D7B5 100%);
    background-image: -o-radial-gradient(96% -10%, #B79F71 0%, #E4D3AA 63%, #E4D7B5 100%);
    background-image: -mz-radial-gradient(96% -10%, #B79F71 0%, #E4D3AA 63%, #E4D7B5 100%);
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
  
  &
  :first-child {
    width: rem(21);
    height: rem(25);
    background: url('../../assets/images/iosDownload/iphone@2x.png') center center no-repeat;
    background-size: cover;
  }
  
  }
  }
  }
  
  .iosdownload_content .steps {
    width: 100%;
    background: #21102C;
    border-radius: rem(5);
    text-align: center;
    border: rem(2) solid #F0DDAE;
    margin-top: rem(11);
  
  span {
    font-family: Arial;
    font-size: rem(14);
    color: #FFDC99;
    display: inline-block;
    letter-spacing: rem(3);
    
    vertical-align: middle;
  
  &
  :first-child {
    background: url('../../assets/images/iosDownload/steps.png') center center no-repeat;
    background-size: cover;
    width: rem(32);
    height: rem(8);
    
  }
  
  &
  :last-child {
    height: rem(52);
    line-height: rem(52);
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
  
  .tempBack {
    position: fixed;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    z-index: 99999;
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
<style lang="scss" scoped>
  div {
    overflow: visible;
    box-sizing: border-box;
  }
</style>