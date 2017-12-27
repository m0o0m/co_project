<template>
  <div class="onlineRechBox">
    <div class="commonNavBar positionFixed">
      <div class="backPassTitle"><p>线下充值</p></div>
      <div class="loginIcon arrowLeft flt" @click="$router.push({name:'addMoney'});"><a href="javascript:void(0)"></a></div>
    </div>
    <div class="onlineRechBody">
      <div class="onlineRechBodyTop">
        <section>
          <p>
            <img :src="imgdata">{{result.name}}
          <span @click="copyUrl( 'target' )" class="copy_btns" data-clipboard-action="copy" data-clipboard-target="#target">复制</span>

          <span id="target">{{result.user_name}}</span>
          </p>
          <p>
            <span @click="copyUrl( 'cardNo' )" class="copy_btns" data-clipboard-action="copy" data-clipboard-target="#cardNo">复制</span>
            <span id="cardNo">{{result.card_no}}</span>
          </p>
        </section>
      </div>
      <div class="onlineRechBodyBottom">
        <ul class="onlineRechUL">
          <li><p>订单编号<span>{{result.order_id}}</span></p></li>
          <li><p>充值金额<span>{{result.amount}}元</span></p>
            <p>最小金额：¥{{result.min_value || 0}} 最大金额：¥{{result.max_value || 0}}</p>
          </li>
          <li class="displayFlex loginLi commonArrowsRight onlineRechPadding"><p>选择通道</p>
            <p>
              <select v-model="channelId" @change="changeChannel()">
                <option v-for="(v, index) in result.card_type_list"
                        :value="v.id">{{v.name}}
                </option>
              </select>
            </p>
          </li>
          <li class="displayFlex loginLi"><p>开户姓名</p>
            <p>
              <input v-model="bank.card_name" type="text" name="" placeholder="请输入开户人姓名">
            </p></li>
          <li class="displayFlex loginLi" v-if="!showBankAdd"><p>所属分行</p>
            <p>
              <input v-model="bank.branch_name" type="text" name="" placeholder="请输入所属分行">
            </p></li>
          <li class="loginHostBtn confirmBtn" @click="save()"><a href="javascript: void(0);">立即支付</a></li>
        </ul>
        <!--<div class="security"><p>账户资金安全由棋牌彩票来保障</p></div>-->
      </div>


    </div>

  </div>
</template>

<script>
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
		}
	}
</script>

<style lang='scss'>
</style>
