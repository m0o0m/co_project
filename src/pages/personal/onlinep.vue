<template>
  <div>
    <div class="onlinep_box managMementCls">
      <div class="per">
        <ul class="per_leftd">
          <a href="javascript:history.back(-1)">
            <li></li>
          </a>
          <li class="twli"><p>在线充值</p></li>
        </ul>
      </div>
      <!--<div class="per_top"></div>-->
      <div class="per_conter per_bacgsround per_bacgsround_new ">
        <div class="Bank_conter">
          <ul class="On-line">
            <li><span>真实姓名</span><p><input type="text" v-model="user.card_name" placeholder="请输入您的真实姓名"></p></li>
            <li><strong>银行卡</strong>
              <p><input type="number" oninput="value=value.replace(/\D/g,'') " v-model="user.card_no" placeholder="请输入您的银行卡卡号" ></p></li>
            <li>身份证号<p><input type="text" v-model="user.cer_number" placeholder="请输入您的有效身份证证件号" oninput="value=value.replace(/[\W]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"></p></li>
            <li>手机号码<p><input type="number" v-model="user.mobile" placeholder="请输入有效手机号码" oninput="value=value.replace(/\D/g,'') "></p></li>
            <li><a href="#" @click="isgo()">下一步</a></li>
          </ul>
          <div class="online_security"><i></i><p>账户资金安全由棋牌彩票来保障</p></div>
          <div class="warm_prompt_online">
            <p class='isp ispp'>温馨提示:</p>
            <p class='isp'>当提示“未开通认证支付”时，您可以通过以下操作解决：</p>
            <p class='isp'>1、拨打银联客服电话95516开通；</p>
            <p class='isp'>2、拨打发卡行客服电话开通；</p>
            <p class='isp'>3、下载银联钱包，注册绑定借记卡后即自动开通；</p>
            <p class='isp'>4、登录银联钱包官网</p>
            <a href="https://www.95516.com/static/union/pages/card/openFirst.html?entry=openPay"><p class='isp one-txt-cut'>https://www.95516.com/static/union/pages/card/openFirst.html?entry=openPay</p></a>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import '../../assets/scss/personal.scss';
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
      this._Util.setCss('.managMementCls',{"height": 1},"*");
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
