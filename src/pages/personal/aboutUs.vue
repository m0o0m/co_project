<template>
  <div id="aboutUs">
    <div class="divapp">
      <div class="commonNavBar positionFixed">
        <div class="loginTitle"><p><img :src='loginTitle'/></p></div>
        <div class="loginIcon left" @click="$router.go(-1);"><a href="javascript:void(0)"></a></div>
        <div class="loginIcon right"  @click="loginService"><a href="javascript:void(0)"></a></div>
      </div>
      <div class="per_top"></div>
      <div class="aboutUs_img_back000123">
        <div class="aboutUs_img">
          <div class="aboutUs_img_mian">
            <div class="aboutUs_Version">
              <div class="aboutUs_version_bb">
                <p>棋牌彩票</p>
                <p>版本号: v1.0.3</p>
              </div>
              <div class="aboutUs_version_list">
                <ul>
                  <li>
                    <p>
                      平台官网 <span id="cardNo1">www.qpcp.com</span>
                    </p>
                    <p @click="copyUrl( 'cardNo1' )" class="copy_btns"  data-clipboard-action="copy"
                       data-clipboard-target="#cardNo1" style="float: right;">复制</p>
                  </li>
                  <li>
                    <p>
                      客服QQ <span id="cardNo2">97966666</span>
                    </p>
                    <p @click="copyUrl( 'cardNo2' )" class="copy_btns" data-clipboard-action="copy"
                       data-clipboard-target="#cardNo2" style="float: right;">复制</p>
                  </li>
                  <li>
                    <p>
                      客服微信 <span id="cardNo3">97966666</span>
                    </p>
                    <p @click="copyUrl( 'cardNo3' )" class="copy_btns" data-clipboard-action="copy"
                       data-clipboard-target="#cardNo3" style="float: right;">复制</p>
                  </li>
                </ul>
              </div>
              <div class="aboutUs_version_mun">
                <div class="about_version_WXimg"><img src="../../assets/images/rwm@2x.png"/></div>
                <div class="about_version_texted">
                  <p><span>2011-2017</span> ©棋牌彩票</p>
                  <p>提醒：购买彩票有风险，在线投注需谨慎，不向未满<span>18</span>周岁的少年出售彩票!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
//  import '../../assets/scss/personal.scss';
//  import '../../assets/css/Popup.css';
  import '../../assets/js/clipboard.min';
  
  export default {
    data() {
      return {
        loginTitle: require('../../assets/images/login/logo.png')
      }
    },
    mounted() {
      this._Util.setCss('#aboutUs',{"height": 1},"*");
    },
    methods: {
	    copyUrl(id) {
		    let co = require('../../assets/js/clipboard.min')
		    var targetText = $('#' + id + '').text();
		    var clipboard = new co('.copy_btns');
		    console.log(clipboard)
		    clipboard.on('success', function (e) {
			    console.info('Action:', e.action);
			    console.info('Text:', e.text);
			    console.info('Trigger:', e.trigger);
			    e.clearSelection();
		    });
		    this._Util.showAlert(this, {content: '复制成功'});
	    },
      loginService() {
        let that = this;
        that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
          window.location.href = data.value;
        })
      }
    }
    
  }
</script>
<style lang='scss'>
</style>
