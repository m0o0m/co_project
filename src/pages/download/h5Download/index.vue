<template>
  <div class="h5Download">
    <div v-if="isImgRead" class="windowsBack">
      <div class="dynamic">
        <div class="logo"><img src="../../../assets/images/download/h5Download/logo.png"/></div>
        <div class="dynamicImg"><img src="../../../assets/images/download/h5Download/qpcpImg.png"/></div>
        <div class="dynamicText"><img src="../../../assets/images/download/h5Download/banner_text.png"/></div>
        <div class="WeChat">
          <div class="weChat_left"><img src="../../../assets/images/download/h5Download/rwm_pc_gw.png"/>
            <div class="qrcode" id="qrcode"></div>
          </div>
          <div v-if="!isBrowserShow" class="weChat_rights">
            <!--<p><i></i><a href="javascript:void(0)">领取礼金</a></p>-->
            <!--<p><i></i><a href="https://qpcp9.com?code=22356" target="_blank">立即下载</a></p>-->
            <!--<p><i></i><a href="javascript:void(0)">访问主页</a></p>-->
            <!--<a href="javascript:void(0);"  target="_blank"><div class="weChat_rights_step2"></div></a>-->
            <a class="weChat_rights_stepD" @click="download()" href="javascript:void(0);" target="_blank">
              <div class="weChat_rights_step weChat_rights_step4"></div>
            </a>
            <a href="javascript:void(0);" @click.stop="toHome()" target="_blank">
              <div class="weChat_rights_step weChat_rights_step3"></div>
            </a>
            
            <!--<div class="weChat_rights_step2"><a href="#"  target="_blank"></a></div>-->
          </div>
        </div>
        <div class="dynamicIp">
          <div>
            <img src="../../../assets/images/download/h5Download/iphone.png"/>
          </div>
          <div class="dynamicIp2">
            <img src="../../../assets/images/download/h5Download/iphoneText.png"/>
          </div>
          <div class="dynamicIp3">
            <p><i></i>官方QQ：&nbsp;97966666</p>
            <p><i></i>官方微信：&nbsp;97966666</p>
          </div>
        </div>
      
      </div>
    </div>
    <div v-if="isImgRead" class="indexLine"></div>
    <div v-if="isImgRead" class="ChessBack">
      <div v-if="isImgRead" class="chessBack_title">棋牌彩票特色</div>
      <div class="chessBack_img"><img src="../../../assets/images/download/h5Download/qpcpTs2.png"/></div>
      <div class="chessBack_text"><img src="../../../assets/images/download/h5Download/qpcpTsTest.png"/></div>
    </div>
    <div v-if="isImgRead" class="indexLine"></div>
    <div v-show="isImgRead" class="introductionText">
      <div class="introductionTextMi">
        <aside>棋牌彩票简介</aside>
        <section>
          <p>
            棋牌彩票是由国家福利彩票跟国家棋牌中心合作推出的创新型彩票App，共同打造高质量游戏平台。连续荣获首张国家彩票网上销售证书和首张国家棋牌网上销售证书。与国家彩票同步开奖。我们一切彩票营业行为皆遵守国内政府彩票条约。我们在越来越热的网络彩票市场中，不断的求新求变，寻找最新的创意，秉持最好的服务。以带给客户高质量的服务、产品、娱乐、是我们的企业永恒宗旨。</p>
        </section>
      </div>
    </div>
    <div v-if="isBrowserShow" class="introductionFooter">
      <div class="introductionFooterMi">
        <div class="introductionFooter_logo"><img src="../../../assets/images/download/h5Download/footerLogo.png"/>
        </div>
        <div v-if="isImgRead" class="introductionFooter_enter">
          <section>
            <p>联系方式</p>
            <p>北京棋牌彩票网络科技有限公司</p>
            <p><span>97966666</span></p>
            <p><span>97966666</span></p>
          </section>
        </div>
        <div v-if="isImgRead" class="introductionFooter_float">
          <section>
            <p>更高效 更快捷 更专业</p>
            <p>因为专注所以专业</p>
            <p>棋牌彩票为了您的满意一直努力着！</p>
            <p>北京棋牌彩票网络科技&copy;<span>1997-2017</span></p>
            <p>沪ICP备17049649号</p>
          </section>
        </div>
      </div>
    </div>
    <div class="introductionFooterIp">
      <div class="introductionFooterIpMi">
        <div v-if="!isBrowserShow" class="introductionFooterIp_logo"><img
            src="../../../assets/images/download/h5Download/Group.png"/>
          <p style="color: rgba(255,255,255,.3); font-size: 0.5rem; text-align: center;line-height: 1rem; ">沪ICP备17049649号</p>
        </div>
        <div v-if="isBrowserShow" class="introductionFooterIp_logo"><img
            src="../../../assets/images/download/h5Download/footerLogo.png"/></div>
        <div v-if="isImgRead && isBrowserShow" class="introductionFooterIp_enter">
          <section>
            <p>北京棋牌彩票网络科技有限公司</p>
            <p>联系方式
            <p class="qq"><span>97966666</span></p>
            <p class="wx"><span>97966666</span></p>
            </p>
            <p>棋牌彩票为了您的满意一直努力着！</p>
            <p>北京棋牌彩票网络科技&copy;<span>1997-2017</span></p>
          </section>
        </div>
        <div v-if="isImgRead && isBrowserShow" class="introductionFooterIp_enter">
          <section>
            <p>更高效 更快捷 更专业</p>
            <p>因为专注所以专业</p>
          </section>
        </div>
      </div>
    </div>
    <!--微信-->
    <div class="tempBack" v-if="isImgRead && isWeiXin()">
      <article class="tempB_mun">
        <figure><img src="../../../assets/images/jiantou2x.png"/></figure>
        <aside>点击右上角分享按钮，然后选择在"浏览器中打开"</aside>
        <section>
          <p><img src="../../../assets/images/1.png" class="assetsCls"/>点击右上角···图标</p>
          <p><img src="../../../assets/images/2.png" class="assetsCls"/>选择<img src="../../../assets/images/s2x.png"
                                                                               class="sxCls"/>在浏览器中打开</p>
          <p><img src="../../../assets/images/3.png" class="assetsCls"/>在打开的页面中下载</p>
        </section>
        <div class="tempB_img"><img src="../../../assets/images/Bitmap2x.png" class="bitmaps"/></div>
      </article>
    </div>
    <!--安装步骤 弹出框 pc-->
    <div v-if="false" class="InstallationSteps">
      <article class="InstallationArticle">
        <aside>IOS安装教程</aside>
        <section class="InstallationSection">
          <figure><img src="../../../assets/images/download/h5Download/bz01.png"/>
            <figcaption>第一步</figcaption>
          </figure>
          <figure><img src="../../../assets/images/download/h5Download/bz02.png"/>
            <figcaption>第二步</figcaption>
          </figure>
          <figure><img src="../../../assets/images/download/h5Download/bz03.png"/>
            <figcaption>第三步</figcaption>
          </figure>
          <figure><img src="../../../assets/images/download/h5Download/bz04.png"/>
            <figcaption>第四步</figcaption>
          </figure>
          <figure><img src="../../../assets/images/download/h5Download/bz05.png"/>
            <figcaption>第五步</figcaption>
          </figure>
        </section>
        <a href="javascript:void(0)" class="close"><img src="../../../assets/images/download/h5Download/del.png"/></a>
      </article>
    </div>
    <!--安装步骤 弹出框 app-->
    <div v-if="false" class="InstallationStepsApp">
      <article class="InstallationArticle">
        <aside>
          IOS安装教程
        </aside>
        <section class="InstallationSection">
          <figure><img src="../../../assets/images/download/h5Download/bz01.png"/>
            <figcaption>第一步</figcaption>
          </figure>
          <figure><img src="../../../assets/images/download/h5Download/bz02.png"/>
            <figcaption>第二步</figcaption>
          </figure>
          <figure><img src="../../../assets/images/download/h5Download/bz03.png"/>
            <figcaption>第三步</figcaption>
          </figure>
          <figure><img src="../../../assets/images/download/h5Download/bz04.png"/>
            <figcaption>第四步</figcaption>
          </figure>
          <figure><img src="../../../assets/images/download/h5Download/bz05.png"/>
            <figcaption>第五步</figcaption>
          </figure>
        </section>
        <a href="javascript:void(0)" class="close"><img src="../../../assets/images/download/h5Download/del.png"/></a>
      </article>
    </div>
  </div>
</template>

<script>
  //  import "../../../assets/scss/download/h5Download/index.scss";
  //    import "../../../assets/scss/download/h5Download/index_pc.scss";
  import $ from "jquery"
  //  import "../../../assets/js/qrcode/qrcode";
  
  export default {
    data() {
      return {
        isBrowserShow: false,
        isImgRead: false,
        isTextShow: false,
      }
    },
    created() {
      this.init();
    },
    mounted() {
      let that = this;
      $(window).resize(function () {
//        that.areaSize();
        console.log("sdad:");
        that.init();
        
      });
      $("img").on("load", () => {
        that.isImgRead = true;
        that.$nextTick(function () {
          require ('../../../assets/js/qrcode/jquery.qrcode.min.js');
          this._qrcode();
        });
      });


//      that.areaSize();
    },
    methods: {
      init() {
        let that = this;
        
        let browser = that._Util.browser();
        if (browser.versions.mobile) {
          import("../../../assets/scss/download/h5Download/index.scss");
          that.isBrowserShow = false;
        } else {
          import("../../../assets/scss/download/h5Download/index_pc.scss");
          that.isBrowserShow = true;
          
        }
        if (that.isImgRead) {
          setTimeout(function () {
            that.isTextShow = true;
          }, 500);
        }
        
        /*     console.log("qrcode:",$('.qrcode'));
             var getQrcode = 'https://m.qpcp9.com/lottery/invite';
             $('.qrcode').qrcode(getQrcode);
             console.log('qrcode', $('.qrcode').qrcode(getQrcode));*/
      },
      _qrcode () {
        var getQrcode = 'http://m.qpcp.me/lottery/invite';
        $("#qrcode").qrcode({
          text: getQrcode,
          width:$("#qrcode").width(),
          height:$("#qrcode").height()
        });
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
      download() {
        //判断是否android端
        let browser = this._Util.browser();
        let codeVal = sessionStorage.getItem('openAccountCode');
        if (browser.versions.android) {
          if (browser.versions.weixin || browser.versions.qq) {
            let that = this;
            that.trues = true;
            return;
          }
//					alert("is android");
          //跳转Android的下载地址
//          location.href = "https://download.qpcp10.com/android/qpcp.apk";
          let codeText = "";
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
        
      },
      isWeiXin() {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger' || (ua.match(/QQ/i) == "qq" && ((ua.indexOf(' qq') > -1)))) {
          return true;
        } else {
          return false;
        }
      },
    },
    watch: {},
    components: {}
  }

</script>

<style lang="css" rel="styleheet/css">
  .h5Download {
    font-family: Arial;
    background: rgb(9, 8, 51);
  }
  
  img {
    width: 100%;
    height: auto;
  }
  
  div {
    height: auto;
    overflow: hidden;
  }
  
  .logo {
    margin: 0 auto;
    position: relative;
  }
  
  .dynamic > div {
    padding-bottom: 0;
  }
  
  .dynamicImg {
    margin: 0 auto;
  }
  
  .dynamicText {
    margin: 0 auto;
    position: relative;
  }
  
  .WeChat {
    margin: 0 auto;
    margin-bottom: 1%;
  }
  
  .WeChat .weChat_left {
    width: 40%;
    margin: 0 auto;
    position: relative;
  }
  
  .WeChat .weChat_left .qrcode {
    position: absolute;
    left: 6.7%;
    top: 6.7%;
    /*background: url("../../../assets/images/download/h5Download/rwm_formal.png") no-repeat;*/
    /*background-size: cover;*/
  }
  
  .WeChat .weChat_rights div {
    width: 100%;
    background: url("../../../assets/images/download/h5Download/go_down.png") no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }
  
  .WeChat .weChat_rights div.weChat_rights_step2 {
    background: url("../../../assets/images/download/h5Download/go_have.png") no-repeat;
    background-size: 100% 100%;
  }
  
  .WeChat .weChat_rights div.weChat_rights_step3 {
    background: url("../../../assets/images/download/h5Download/go_i.png") no-repeat;
    background-size: 100% 100%;
  }
  
  .dynamicIp {
    margin: 0 auto;
    position: relative;
  }
  
  .dynamicIp .dynamicIp2 {
    position: absolute;
    top: 50%;
  }
  
  .dynamicIp3 {
    position: absolute;
    text-align: center;
    top: 66%;
  }
  
  .dynamicIp3 p {
    font-family: Arial;
    color: #FFFFFF;
    display: inline-block;
  }
  
  .dynamicIp3 p i {
    display: inline-block;
    background: url("../../../assets/images/download/h5Download/qqCopy@2x.png") no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  
  .dynamicIp3 p:nth-child(2) i {
    display: inline-block;
    background: url("../../../assets/images/download/h5Download/weixinCopy@2x.png") no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  
  .ChessBack {
    width: 100%;
    background: url('../../../assets/images/download/h5Download/pc_2.jpg') bottom center no-repeat;
    background-size: 100% 100%;
  }
  
  .chessBack_title {
    color: #FFFFFF;
    text-align: center;
  }
  
  .chessBack_img {
    margin: 0 auto;
  }
  
  .chessBack_text {
    margin: 0 auto;
  }
  
  .introductionText {
    background: #090833 url('../../../assets/images/download/h5Download/05.png') bottom center no-repeat;
    background-size: 25% auto;
    padding-bottom: 6%;
  }
  
  .introductionTextMi {
    margin: 0 auto;
  }
  
  .introductionTextMi aside {
    color: #FFFFFF;
    text-align: center;
  }
  
  .introductionTextMi section {
    color: #FFFFFF;
    text-align: justify;
  }
  
  .InstallationStepsApp {
    display: none;
  }
  
  #cnzz_stat_icon_1271231563,
  #cnzz_stat_icon_1271258064{
    /* position: fixed;
     bottom: 0;*/
    float: left;
  }
  
  #cnzz_stat_icon_1271231563 img {
    width: 20px;
    height: 20px;
  }
  
  #cnzz_stat_icon_1271258064 img {
    width: 20px;
    height: 20px;
  }
</style>