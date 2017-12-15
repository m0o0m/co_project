<template>
  <div class="managMementCls">
    <div class="per">
      <ul class="per_leftd">
        <li @click="$router.go(-1);"><a href="javascript: void(0);"></a></li>
        <li><p style="color:#FFDC99 ">银行卡管理</p></li>
      </ul>
    </div>
    <div class="per_pass2 add">
      <div class="monum">
        <p>真实姓名</p>
        <p><input type="text" v-model="real_name" placeholder="请输入您的真实姓名"></p>
      </div>
      <div class="monum " id="monum">
        <p class="blank"></p>
        <p id="remind">为了您的提现资产安全，请填写真实姓名</p>
      </div>
      <div class="monum">
        <p>银行卡号</p>
        <p><input type="number" v-model="card_number" placeholder="请输入银行卡号" pattern="^[0-9]*$"></p>
      </div>
      <div class="monum">
        <p>选择银行</p>
        <p @click="show = true" style=" position: relative;">
          <input type="text" v-model="bank.name" disabled>
          <span id="istoright"></span>
        </p>
      </div>
      <div @click="save()" class="loginBtn">确定添加</div>

    </div>

    <BankChange v-if="result.length" :show="show" :items="result"></BankChange>
  </div>
</template>
<script>
	import '../../assets/scss/personal.scss';
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
			$(".managMementCls").css({
				"height": $(window).height()
			})
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
