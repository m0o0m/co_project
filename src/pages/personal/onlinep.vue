<template>
  <div>
    <div class="onLineBox">
      <div class="commonNavBar positionFixed">
        <div class="backPassTitle"><p>在线充值</p></div>
        <div class="loginIcon arrowLeft flt" @click="$router.push({name:'addMoney'});"><a href="javascript:void(0)"></a></div>
      </div>
      <div class="onLineBoxBody ">
        <div>
          <ul class="OnLine">
            <li class="displayFlex loginLi"><p>真实姓名</p><p><input type="text" v-model="user.card_name" placeholder="请输入您的真实姓名"></p></li>
            <li class="displayFlex loginLi"><p>银行卡</p>
              <p><input type="number" oninput="value=value.replace(/\D/g,'') " v-model="user.card_no" placeholder="请输入您的银行卡卡号" ></p></li>
            <li class="displayFlex loginLi"><p>身份证号</p><p><input type="text" v-model="user.cer_number" placeholder="请输入您的有效身份证证件号" oninput="value=value.replace(/[\W]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"></p></li>
            <li class="displayFlex loginLi"><p>手机号码</p><p><input type="number" v-model="user.mobile" placeholder="请输入有效手机号码" oninput="value=value.replace(/\D/g,'') "></p></li>
            <li class="loginHostBtn confirmBtn"><a href="#" @click="isgo()">下一步</a></li>
          </ul>
          <div class="onlineSecurity"><i></i><p>账户资金安全由棋牌彩票来保障</p></div>
          <div class="warmPromptOnline">
            <p>温馨提示:</p>
            <p>当提示“未开通认证支付”时，您可以通过以下操作解决：</p>
            <p>1、拨打银联客服电话95516开通；</p>
            <p>2、拨打发卡行客服电话开通；</p>
            <p>3、下载银联钱包，注册绑定借记卡后即自动开通；</p>
            <p>4、登录银联钱包官网</p>
            <a href="https://www.95516.com/static/union/pages/card/openFirst.html?entry=openPay">
              <p class='one-txt-cut'>https://www.95516.com/static/union/pages/card/openFirst.html?entry=openPay</p>
            </a>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import $ from "jquery"
	export default {
		data(){
			return {
				user: {
					amount: "",
					payment_type_id: "2",
					card_name: "",
					card_no: "",
					cer_number: "",
					mobile: "",
					app_sign: ""
				}
			}
		},
		mounted () {
//      this._Util.setCss('.managMementCls',{"height": 1},"*");
		},
		methods: {
			isgo () {
				let that = this;
				let amount = that.$route.query.amount;
				that.user.amount = amount;
				if (that.user.card_name == "") {
					that._Util.showAlert(that, {content: '用户名不能为空'});
					return;
				}
				if (that.user.card_no == "") {
					that._Util.showAlert(that, {content: '银行卡号不能为空'});
					return;
				}
				if (that.user.cer_number == "") {
					that._Util.showAlert(that, {content: '身份证号码不能为空'});
					return;
				}
				if (that.user.mobile == "") {
					that._Util.showAlert(that, {content: '手机号码不能为空'});
					return;
				}
				that._Util.post(that, that._Api.POST_PAY_QRCODE, that.user, (data) => {
					that._Util.showConfirm(that, {
						title: '请输入交易验证码',
						content: that.user.mobile,
						placeholder: '请输入口令',
						showText: true
					}, (inputText, callback) => {
						console.log(inputText);
						that._Util.post(that, that._Api.POST_PAY_MOBO, {yzm: inputText, pay_id: data.pay_id}, (data) => {
							callback && callback();
						});
					});
				});
			}


		}
	}
</script>

<style lang='scss'>



</style>
