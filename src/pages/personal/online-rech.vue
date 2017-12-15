<template>
  <div class="online_rech_box managMementCls">
    <div class="pers">
      <ul class="per_leftd">
        <li @click="$router.go(-1);"><a href="javascript: void(0);"></a></li>
        <li><p style="color:#FFDC99">线&nbsp;下&nbsp;转&nbsp;帐</p></li>
      </ul>
    </div>
    <div class="per_top"></div>
    <div class="per_conters">
      <div class="on-line_bank_Admination">
        <section>
          <!-- <p><img :src="imgdata">{{result.name}} <span @click="copyInfo('cardUserName')">复制</span> -->
          <!-- <p><img style="float:left;width:auto;":src="imgdata">{{result.name}} -->
          <!-- <input  @click="copyInfo('cardUserName')" value="复制" type="text"> -->
          <!-- <span @click="copyInfo('cardUserName')">复制</span> -->
          <!-- <input id="cardUserName" v-model="result.user_name" readonly="readonly" type="text"> -->
          <!-- </p> -->
          <!-- {{result.user_name}}{{result.card_no}} -->
          <!-- <p><input id="cardNo" v-model="result.card_no" type="text" readonly="readonly">
          <span @click="copyInfo('cardNo')">复制</span></p> -->

          <p>
            <img style="float:left;width:auto;" :src="imgdata">{{result.name}}
            <span @click="copyInfo('target')" id="copy_btn" data-clipboard-action="copy"
                  data-clipboard-target="#target">复制</span>
            <span id="target">{{result.user_name}}</span>
          </p>
          <p>
            <span @click="copyInfos('cardNo')" id="copy_btns" data-clipboard-action="copy"
                  data-clipboard-target="#cardNo">复制</span>
            <span id="cardNo">{{result.card_no}}</span>
          </p>
        </section>
      </div>
      <div class="WeChat_Transfer">
        <ul class="WeChat__accounts">
          <li>订单编号<p><span>{{result.order_id}}</span></p></li>
          <li>充值金额<p><span>{{result.amount}}元</span></p>
            <p>最小金额：¥{{result.min_value || 0}} 最大金额：¥{{result.max_value || 0}}</p>
          </li>
          <li><span>选择通道</span>
            <p>
              <select v-model="channelId" @change="changeChannel()">
                <option v-for="(v, index) in result.card_type_list"
                        :value="v.id">{{v.name}}
                </option>
              </select>
            </p>
          </li>
          <li><span>开户姓名</span>
            <p>
              <input v-model="bank.card_name" type="text" name="" placeholder="请输入开户人姓名">
            </p></li>
          <li v-if="!showBankAdd"><span>所属分行</span>
            <p>
              <input v-model="bank.branch_name" type="text" name="" placeholder="请输入所属分行">
            </p></li>
          <li @click="save()"><a href="javascript: void(0);">立即支付</a></li>
        </ul>
        <!--<div class="security"><p>账户资金安全由棋牌彩票来保障</p></div>-->
      </div>


    </div>

  </div>
</template>

<script>
	import '../../assets/scss/personal.scss';
	import '../../assets/js/clipboard.min';
	export default {
		data() {
			return {
				result: {},
				channelId: 0,
				showBankAdd: false,
				bank: {},
				imgdata: ''
			}
		},

		mounted() {
			this.init();
			$(".managMementCls").css({
				"height": $(window).height()
			})
		},

		methods: {
			init() {
				let that = this;
				that._Util.post(that, that._Api.POST_PAY_QRCODE, {
					amount: that.$route.query.amount,
					payment_type_id: that.$route.query.id
				}, (data) => {
					that.result = data;
					that.imgdata = require('../../assets/images/bankLogo/' + that.result.pic_name + '.png');
					that.channelId = data.card_type_list[0].id;
					that.changeChannel();
				});
			},

			changeChannel() {
				let that = this;
				for (let i = 0, v; v = that.result.card_type_list[i++];) {
					if (that.channelId === v.id) {
						that.showBankAdd = !v.is_use_branch;
						break;
					}
				}
			},

			save() {
				let that = this;

				if (that.result.amount < that.result.min_value) {
					that._Util.showAlert(that, {content: '最小充值金额' + that.result.min_value + '元'});
					return;
				}

				if (that.result.amount > that.result.max_value) {
					that._Util.showAlert(that, {content: '最大充值金额' + that.result.max_value + '元'});
					return;
				}


				that._Util.post(that, that._Api.POST_PAY_LINE, {
					recharge_id: that.result.recharge_id,
					card_type_id: that.channelId,
					branch_name: that.bank.branch_name,
					card_name: that.bank.card_name
				}, (data) => {
					that._Util.showAlert(that, {content: '您的存款申请已提交'});
					setTimeout(function () {
						that.$router.replace({name: 'addMoney'});
					}, 2000)
				});
			},

			copyInfo(id) {
				// let Url2 = document.getElementById(id);
				// Url2.select(); // 选择对象
				// document.execCommand('Copy'); // 执行浏览器复制命令
				// this._Util.showAlert(this, {content: '复制成功'});



				var targetText = $(id).text();
				var clipboard = new Clipboard('#copy_btn');
				clipboard.on('success', function (e) {
					console.info('Action:', e.action);
					console.info('Text:', e.text);
					console.info('Trigger:', e.trigger);

					// alert("复制成功");

					e.clearSelection();

				});
				this._Util.showAlert(this, {content: '复制成功'});
			},


			copyInfos(id) {
				var targetText = $(id).text();
				var clipboard = new Clipboard('#copy_btns');
				clipboard.on('success', function (e) {
					console.info('Action:', e.action);
					console.info('Text:', e.text);
					console.info('Trigger:', e.trigger);
					// this._Util.showAlert(this, {content: '复制成功'});
					// alert("复制成功");
					e.clearSelection();
				});
				this._Util.showAlert(this, {content: '复制成功'});

			}
		}
	}
</script>

<style lang='scss'>
</style>
