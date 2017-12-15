<template>
  <div>
    <div class="managMementCls">
      <div class="per">
        <ul class="per_leftd">
          <li class="onel" @click="isgo()"><a href="javascript: void(0);"></a></li>
          <li><p>{{$route.query.title}}充值</p></li>
        </ul>
      </div>
      <div class="per_top"></div>
      <div v-if="result.order_id" class="per_conter weixin_rech_box"
           style="display: flex;flex-direction: column ">
        
        <ul class="WeChat_up rech_up">
          <li @click="selectTab(0)" :class="{ 'ons': selectTabIndex == 0 }">{{$route.query.title}}线上支付</li>
          <li @click="selectTab(1)" :class="{ 'ons': selectTabIndex == 1 }">{{$route.query.title}}线下转账</li>
        </ul>
        
        <div v-if="!showCode" style="height: 100%;overflow: auto">
          <div class="WeChat_Transfer WeChat_box">
            <ul class="WeChat__accounts">
              <li>订单号<p><span>{{result.order_id}}</span></p>
              <li>充值金额<p><span>{{result.amount}}元</span></p>
                <p>最小金额：¥{{channel.min_value}} 最大金额：¥{{channel.max_value}}</p>
              </li>
              <li class="select_channel">选择通道
                <p>
                  <select v-model="channelId" @change="selectChannel(channelId)">
                    <!---->
                    <option v-for="(v, index) in result.pay_list[selectTabIndex].pay_type_list" :class="'channel'+v.id" :value="v.id" :data-max-value="v.max_value" :data-min-value="v.min_value">{{v.name}}</option>
                  </select>
                </p>
              </li>
              <li class="immediate_payment" @click="toPay(1)"><a
                  href="javascript: void(0);">{{payname}}</a></li>
            </ul>
            <div class="online_security"><i></i>
              <p>账户资金安全由棋牌彩票来保障</p></div>
          </div>
        </div>
        <div v-if="showCode" style="height: 100%;overflow: auto">
          <!-- //微信线下转账 -->
          <div class="open_tab" style="overflow: auto ; height:100%;">
            <ul class="weixin_reach_share share especially_remind">
              <li>{{$route.query.title}}扫一扫转账</li>
              <li>
                <img :src="channelPayResult.code_img_url" alt="">
              </li>
              <li>
                <p>请长按保存二维码</p>
              </li>
              <li>
                <p>特别提醒：会员扫码支付时，务必填写备注您的会员账号， 请各位会员相互配合，谢谢大家的支持！</p>
              </li>
            </ul>
            <!-- <div class="copy">保存到手机</div> -->
            <div class='payResult'>
              <div v-if="channelPayResult.user_name">
                <div>
                  <p class='isp ispp'>转账资料</p>
                  <!--<div v-if="$route.query.id != 5" class="copy">收款人<span>{{channelPayResult.user_name}}</span></div>-->
                  <div class="weixin_reach_copy">&nbsp;&nbsp;&nbsp;订单号<span>{{channelPayResult.order_id}}</span>
                  </div>
                  <div class="weixin_reach_copy">充值金额<span>{{channelPayResult.amount}}</span>元</div>
                  <div class="weixin_reach_copy">交易订单号
                    <input type="text" v-if="$route.query.title=='QQ钱包'" v-model="thirdOrderNo"
                           placeholder="请填写交易订单的后六位" oninput="value=value.replace(/[\W]/g,'')"
                           onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"/>
                    <input type="text" v-if="$route.query.title!='QQ钱包'" v-model="thirdOrderNo" placeholder="请填写交易订单号"
                           oninput="value=value.replace(/[\W]/g,'')"
                           onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"/>
                  </div>
                </div>
                <div class="messages">为了能更快速到账，请前往{{$route.query.title}}复制交易订单号</div>
              </div>
              <a class="isfirstp"
                 v-if="$route.query.id == 5||$route.query.id == 4||$route.query.id == 3 && selectTabIndex == 1"
                 v-model="thirdOrderNo"
                 @click="alreadyOffline()" href="javascript: void(0);">已支付</a>
            </div>
            
            <!--<a class="isfirstp" v-model="thirdOrderNo"-->
            <!--@click="alreadyOffline()" href="javascript: void(0);">已支付</a>-->
            <div class="warm_prompt">
              <p class='isp ispp'>温馨提示</p>
              <p class='isp'>
                1.可长按二维码保存至手机；支付方式：打开{{$route.query.title}}>打开扫一扫>选择右上角"相册">选择二维码>点击立即付款>支付成功。</p>
              <p class='isp'> 2.可使用另一部手机的{{$route.query.title}}扫一扫功能，扫描上方二维码;直接进行支付。</p>
              <p v-if="!selectTabIndex" class='isp'> 3.线上充值无需提交订单，支付成功后10秒到账；</p>
              <p class='isp'> {{!selectTabIndex ? 4 : 3}}.如充值未及时到账，请联系 <a href="javascript: void(0);" @click="toCustomerService()">在线客服</a></p>
            </div>
            
            <!-- <div class=" adopt">通过以上链接或扫二维码注册的用户</div> -->
          
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import '../../assets/scss/personal.scss';

  
  export default {
    data() {
      return {
        result: {},
        channelPayResult: {},
        channelId: 0,
        channel: {},
        showCode: false,
        selectTabIndex: 0,
        thirdOrderNo: '',
        payname: '立即支付',
        paytype: 0,
      }
    },
    
    mounted() {
      this.init();
      $(".managMementCls").css({
        "height": $(window).height()
      })
    },
    updated() {
      if (!this.paytype) {
        $(".payResult").hide();
      }
    },
    methods: {
      isgo() {
        let that = this;
        if (that.showCode == true) {
          that.showCode = false;
          $(".WeChat_up").show();
        } else {
          that.$router.replace({name: 'addMoney'});
        }
      },
      init() {
        let that = this;
        that._Util.post(that, that._Api.POST_PAY_TYPE_DETAIL, {
          payment_type_id: that.$route.query.id,
          amount: that.$route.query.amount
        }, (data) => {
          if (!data) return;
//          data.pay_list[1].pay_type_list = [];
          
          that.result = data;
          let payList = data.pay_list;
          
          for (let i = 0, v; v = payList[i++];) {
            if (v.pay_type_list && v.pay_type_list.length) {
              
              that.channel = JSON.parse(JSON.stringify(v.pay_type_list[0]));
              that.channelId = that.channel.id;
              that.selectTab(i - 1);
              break;
            }
          }


//          if (data && data.pay_list && data.pay_list.length) {
//            that.channel = data.pay_list[that.selectTabIndex].pay_type_list[0];
//            that.channelId = that.channel.id;
//          }
        });
      },
      selectChannel(channelId) {
        let that = this;
        that.channel.min_value = $(".select_channel select").find('.channel'+channelId).data("minValue");
        that.channel.max_value = $(".select_channel select").find('.channel'+channelId).data("maxValue");
      },
      toPay() {
        let that = this;
        let params = {
          amount: that.result.amount,
          payment_id: that.channelId
        };
        
        if (that.channel.showType === 'line') {
          params.order_id = that.result.order_id;
        }
        
        that._Util.post(that, that._Api.POST_PAY_QRCODE, params, (data) => {
          that.showCode = true;
          data.code_img_url = data.qrcode ? data.qrcode : data.code_img_url;
          that.channelPayResult = data;
          $(".WeChat_up").hide();
        });
        
      },
      
      alreadyOffline() {
        let that = this;
        /*if (!that.thirdOrderNo || that.thirdOrderNo.length < 6) {
          that._Util.showAlert(that, {content: '请填写商户订单的后六位'});
          return;
        }*/
        
        that._Util.post(that, that._Api.POST_PAY_ALREADY_OFFLINE, {
          recharge_id: that.channelPayResult.recharge_id,
          third_order_no: that.thirdOrderNo
        }, (data) => {
          that._Util.showAlert(that, {content: '该订单已提交'});
          $(".WeChat_up").show();
          that.showCode = false;
        });
      },
      
      optionValuefor() {
        this.init();
      },
      
      selectTab(index) {
        let that = this;
        let data = that.result.pay_list[index].pay_type_list[0];
        if (data) {
          that.channel = JSON.parse(JSON.stringify(data));
//          console.log("sss:",data);
//          that.channel = data;
          that.selectTabIndex = index;
          that.channelId = that.channel.id;
          that.showCode = false;
          if (index) {
            this.payname = "下一步";
            this.paytype = index;
          } else {
            this.payname = "立即支付";
            this.paytype = index;
          }
        } else {
          console.log(123);
          that._Util.showAlert(that, {content: '支付方式已关闭'});
        }
      },

	    toCustomerService() {
		    let that = this;
		    that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
			    window.location.href = data.value;
		    })
	    }
    }
  }
</script>

<style lang='scss'>
  /*body, html {*/
  /*height: 100%;*/
  /*overflow-y: scroll;*/
  /*}*/
  
  /*#app {*/
  /*height: 100%;*/
  /*}*/
  
  /*.view {*/
  /*height: 100%;*/
  /*}*/
</style>
