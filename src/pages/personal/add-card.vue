<template>
  <div class="addCard">
    <div class="commonNavBar positionFixed">
      <div class="backPassTitle"><p>银行卡管理</p></div>
      <div class="loginIcon arrowLeft flt" @click="$router.go(-1)"><a href="javascript:void(0)"></a></div>
    </div>
    <div class="addCardContent">
      <div class="addCardContentBox">
        <div class="loginLi displayFlex">
          <p>真实姓名</p>
          <p><input type="text" v-model="real_name" placeholder="请输入您的真实姓名"></p>
        </div>
        <div class="weChatLi displayFlex remind" id="monum">
          <p></p>
          <p id="remind">为了您的提现资产安全，请填写真实姓名</p>
        </div>
        <div class="loginLi displayFlex">
          <p>银行卡号</p>
          <p><input type="number" v-model="card_number" placeholder="请输入银行卡号" pattern="^[0-9]*$"></p>
        </div>
        <div class="loginLi displayFlex">
          <p>选择银行</p>
          <p @click="show = true" class="selectBank">
            <input type="text" v-model="bank.name" disabled>
            <i class="commonArrows commonArrowsRight"></i>
          </p>
        </div>
        <div @click="save()" class="loginHostBtn finshBtn"><a href="javascript:void(0);">确定添加</a></div>
      </div>
    </div>

    <BankChange v-if="result.length" :show="show" :items="result"></BankChange>
  </div>
</template>
<script>
	// import '../../assets/scss/personal.scss';
	import BankChange from '../../components/bankChange.vue';

	export default {
		data() {
			return {
				result: [],
				show: false,
				bank: {},
				real_name: '',
				card_number: ''
			}
		},

		mounted() {
			let that = this;
			that.init();
      this._Util.setCss('.managMementCls',{"height": 1},"*");
			that.$on('pickerCancel', () => {
				that.show = false;
			});

			that.$on('pickerOk', (data) => {
				that.bank = data.province;
				that.show = false;
			})


		},

		methods: {
			init() {
				let that = this;
				that._Util.post(that, that._Api.POST_PERSONAL_MEMBER_BANK_SELECT, {}, (data) => {
					that.result = data;
				});
			},

			save() {
				let that = this;
				if (!that.real_name) {
					alert('请填写用户名');
					return;
				}

				if (!that.card_number) {
					alert('请填写银行卡号');
					return;
				}

				if (!that.bank.id) {
					alert('请选择银行');
					return;
				}


				that._Util.post(that, that._Api.POST_PERSONAL_MEMBER_BANK_BIND, {
					real_name: that.real_name,
					card_number: that.card_number,
					bank_id: that.bank.id
				}, (data) => {
					that.$router.replace({path: '/home?homeIndex=3'});
				});
			}
		},

		components: {
			BankChange
		}
	}
</script>

<style lang='scss'>
  /*body {*/
  /*overflow: hidden;*/
  /*}*/
  /*.view {*/
  /*height: 100%;*/
  /*}*/
</style>
