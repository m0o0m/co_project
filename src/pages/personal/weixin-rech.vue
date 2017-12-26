<template>
  <div>
    <div class="weixinReach">
      <div class="commonNavBar positionFixed">
        <div class="backPassTitle"><p>{{$route.query.title}}充值</p></div>
        <div class="loginIcon left flt" @click="$router.go(-1)"><a href="javascript:void(0)"></a></div>
      </div>
      <div v-if="result.order_id" class="per_conter weixinReachBox">
        <ul class="WeChatUp rechUp">
          <li @click="selectTab(0)" :class="{ 'ons': selectTabIndex == 0 }">{{$route.query.title}}线上支付</li>
          <li @click="selectTab(1)" :class="{ 'ons': selectTabIndex == 1 }">{{$route.query.title}}线下转账</li>
        </ul>
        
        <div v-if="!showCode" class="weixinReachContent">
          <div class="weChatTransfer">
            <ul class="weChatAccounts">
              <li class="weChatLi displayFlex"><p>订单号</p><p><span>{{result.order_id}}</span></p>
              <li class="weChatLi displayFlex"><p>充值金额</p><p><span>{{result.amount}}元</span></p>
              </li>
              <li class="weChatLi displayFlex remark">
                <p></p>
                <p>最小金额：¥{{channel.min_value}} 最大金额：¥{{channel.max_value}}</p>
              </li>
              <li class="loginLi displayFlex selectChannel">
                <p>选择通道</p>
                <p>
                  <select v-model="channelId" @change="selectChannel(channelId)">
                    <!---->
                    <option v-for="(v, index) in result.pay_list[selectTabIndex].pay_type_list" :class="'channel'+v.id" :value="v.id" :data-max-value="v.max_value" :data-min-value="v.min_value">{{v.name}}</option>
                  </select>
                  <i class="commonArrows commonArrowsRight"></i>
                </p>
              </li>
              <li class="loginHostBtn immediatePayBtn" @click="toPay(1)"><a
                  href="javascript: void(0);">{{payname}}</a></li>
            </ul>
            <div class="onlineSecurity"><i></i>
              <p>账户资金安全由棋牌彩票来保障</p></div>
          </div>
        </div>
        <div v-if="showCode"  class="weixinReachContent">
          <!-- //微信线下转账 -->
          <div class="weixinReachopenTab">
            <ul class="weixinReachShare">
              <li>{{$route.query.title}}扫一扫转账</li>
              <li>
                <img :src="channelPayResult.code_img_url" alt="">
              </li>
              <li>
                <p>请长按保存二维码</p>
              </li>
              <li class="specialRemind">
                <p>特别提醒：会员扫码支付时，务必填写备注您的会员账号， 请各位会员相互配合，谢谢大家的支持！</p>
              </li>
            </ul>
            <!-- <div class="copy">保存到手机</div> -->
            <div class='payResult'>
              <div v-if="channelPayResult.user_name">
                <div class="transferInfo">
                  <p>转账资料</p>
                  <!--<div v-if="$route.query.id != 5" class="copy">收款人<span>{{channelPayResult.user_name}}</span></div>-->
                  <div class="weChatLi displayFlex"><p>订单号</p><p><span>{{channelPayResult.order_id}}</span></p>
                  </div>
                  <div class="weChatLi displayFlex"><p>充值金额</p><p><span>{{channelPayResult.amount}}</span>元</p></div>
                  <div class="loginLi displayFlex">
                    <p>交易订单号</p>
                    <p><input type="text" v-if="$route.query.title=='QQ钱包'" v-model="thirdOrderNo"
                              placeholder="请填写交易订单的后六位" oninput="value=value.replace(/[\W]/g,'')"
                              onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"/>
                      <input type="text" v-if="$route.query.title!='QQ钱包'" v-model="thirdOrderNo" placeholder="请填写交易订单号"
                             oninput="value=value.replace(/[\W]/g,'')"
                             onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"/></p>
                  </div>
                </div>
                <div class="messages">为了能更快速到账，请前往{{$route.query.title}}复制交易订单号</div>
              </div>
              <div class="loginHostBtn immediatePayBtn">
                <a class="isfirstp"
                   v-if="$route.query.id == 5||$route.query.id == 4||$route.query.id == 3 && selectTabIndex == 1"
                   v-model="thirdOrderNo"
                   @click="alreadyOffline()" href="javascript: void(0);">已支付</a>
              </div>
            </div>
            
            <!--<a class="isfirstp" v-model="thirdOrderNo"-->
            <!--@click="alreadyOffline()" href="javascript: void(0);">已支付</a>-->
            <div class="warmPrompt">
              <p>温馨提示</p>
              <p>
                1.可长按二维码保存至手机；支付方式：打开{{$route.query.title}}>打开扫一扫>选择右上角"相册">选择二维码>点击立即付款>支付成功。</p>
              <p> 2.可使用另一部手机的{{$route.query.title}}扫一扫功能，扫描上方二维码;直接进行支付。</p>
              <p v-if="!selectTabIndex"> 3.线上充值无需提交订单，支付成功后10秒到账；</p>
              <p> {{!selectTabIndex ? 4 : 3}}.如充值未及时到账，请联系 <a href="javascript: void(0);" @click="toCustomerService()">在线客服</a></p>
            </div>
            
            <!-- <div class=" adopt">通过以上链接或扫二维码注册的用户</div> -->
          
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
//  import '../../assets/scss/personal.scss';

  
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
//      this._Util.setCss('.managMementCls',{"height": 1},"*");
      
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
          $(".WeChatUp").show();
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
        that.channel.min_value = $(".selectChannel select").find('.channel'+channelId).data("minValue");
        that.channel.max_value = $(".selectChannel select").find('.channel'+channelId).data("maxValue");
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
          $(".WeChatUp").hide();
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
          $(".WeChatUp").show();
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

</style>
