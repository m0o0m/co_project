<template>
  <div class="moneyTemplateed">
    <div class="divapp">
      <div class="per">
        <ul class="per_leftd golef">
          <li @click="$router.go(-1);"><a href="javascript: void(0);"></a></li>
          <li class="islit"><p>关于我们</p></li>
        </ul>
      </div>
      <div class="per_top"></div>
      <div class="aboutUs_img_back000123">
        <div class="aboutUs_img">
          <div class="aboutUs_img_mian">
            <div class="aboutUs_images"><img :src="aboutImg"/></div>
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
                    <p @click="copyInfos('cardNo1')" id="copy_btns" data-clipboard-action="copy"
                       data-clipboard-target="#cardNo1">复制</p>
                  </li>
                  <li>
                    <p>
                      客服QQ <span id="cardNo2">97966666</span>
                    </p>
                    <p @click="copyInfos('cardNo2')" id="copy_btns" data-clipboard-action="copy"
                       data-clipboard-target="#cardNo2">复制</p>
                  </li>
                  <li>
                    <p>
                      客服微信 <span id="cardNo3">97966666</span>
                    </p>
                    <p @click="copyInfos('cardNo3')" id="copy_btns" data-clipboard-action="copy"
                       data-clipboard-target="#cardNo3">复制</p>
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
  import '../../assets/scss/personal.scss';
  import '../../assets/css/Popup.css';
  import '../../assets/js/clipboard.min';
  
  export default {
    data() {
      return {
        aboutImg: require('../../assets/images/numberimg/appc.png')
      }
    },
    mounted() {
      this._Util.setCss('.aboutUs_img_back000123',{"height": 1},"*");
    },
    methods: {
      copyInfos(id) {
        var targetText = $(id).text();
        var clipboard = new Clipboard('#copy_btns');
        clipboard.on('success', function (e) {
          console.info('Action:', e.action);
          console.info('Text:', e.text);
          console.info('Trigger:', e.trigger);
          e.clearSelection();
        });
        this._Util.showAlert(this, {content: '复制成功'});
        
        
      }
    }
    
  }
</script>
<style lang='scss'>
  /*body,html {*/
  /*height: 100%;overflow: hidden;*/
  /*}*/
  
  /*.view {*/
  /*height: 100%;*/
  /*}*/
  
  .indexJust {
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    box-pack: center;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    box-align: center;
    -webkit-box-align: center;
    -moz-box-align: center;
    -ms-flex-align: center;
  }
  
  .aboutUs_img_back000123 {
    background: url('../../assets/images/numberimg/bei.png') center 1.5rem no-repeat;
    background-size: 95% auto;
  }
  
  .aboutUs_img_back000123 {
    height: 100%;
  }
  
  .aboutUs_img {
    height: 100%;
    padding-top: 20%;
  }
  
  .aboutUs_images {
    text-align: center;
  }
  
  .aboutUs_images img {
    width: 80%;
    display: inline-block;
  }
  
  .aboutUs_Version {
    font-size: 0.5rem;
    color: #ffffff;
    text-align: center;
    line-height: 1rem;
    padding: 5% 0;
    padding-top: 0;
  
  p:first-of-type {
    font-size: 0.65rem;
  }
  
  }
  
  .aboutUs_version_list {
    width: 90%;
    margin: 0 auto;
    margin-top: 0.5rem;
  
  ul {
  
  li {
    display: flex;
    -webkit-display: flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    padding: 0.3rem;
    background: rgba(0, 0, 0, 0.2);
    margin: 0.2rem 0;
  
  p:first-of-type {
    flex: 1;
    text-align: left;
    font-size: 0.6rem;
    color: #FFDC99;
    background: url('../../assets/images/aboutIcon01.png') left center no-repeat;
    background-size: 0.9rem auto;
    padding-left: 1.1rem;
  
  span {
    font-size: 0.5rem;
    font-family: arial;
    margin-left: 0.1rem;
    color: #ffffff;
  }
  
  }
  p:last-of-type {
    border: 1px solid #FFDC99;
    min-width: 2rem;
    display: inline-block;
    border-radius: 0.1rem;
    color: #FFDC99;
  }
  
  }
  li:nth-child(2) {
  
  p:first-of-type {
    background: url('../../assets/images/aboutIcon02.png') left center no-repeat;
    background-size: 0.9rem auto;
  }
  
  }
  li:nth-child(3) {
  
  p:first-of-type {
    background: url('../../assets/images/aboutIcon03.png') left center no-repeat;
    background-size: 0.9rem auto;
  }
  
  }
  }
  }
  
  .aboutUs_version_mun {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  
  .about_version_WXimg {
    width: 3.2rem;
    height: 3.2rem;
    background: #f2f2f2;
    margin: 0.65rem auto;
  }
  
  .about_version_texted {
    width: 70%;
    font-size: 0.45rem;
    margin: 0 auto;
    line-height: 0.8rem;
  
  p:last-child {
    margin-bottom: 0.5rem;
  }
  
  p:first-of-type {
    font-size: 0.5rem;
    margin-bottom: 0.2rem;
  }
  
  span {
    font-family: arial;
  }
  
  }
</style>
