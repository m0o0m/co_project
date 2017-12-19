<template>
  <div class="moneyTemplateed">
    <div class="managMementClsTemplate">
      <div class="per">
        <ul class="per_leftd">
          <li @click="$router.go(-1);"><a href="javascript: void(0);"></a></li>
          <li><p>提现</p></li>
          <li><a href="#"></a></li>
        </ul>
      </div>
      <div class="rechargeRight" @click="$router.push({name:'moneyHistory'});" style="top:0.41379rem"><a
          href="javascript:void(0)"></a></div>
      <div class="per_top"></div>
      <div class="Withdrawals">
        <div class="bank_card bank_card_moneyCard">
          <section>
            <p>{{result.bank_name}}<span>(尾号**{{result.card_number}})</span></p>
            <p>单笔最小提现金额为¥<span>100</span></p>
          </section>
        
        </div>
        <ul class="On-line On_line_moneyCard">
          <li>提现金额<p><input v-model="bank.amount" type="text" value="" placeholder="请输入您要提现的金额"></p></li>
          <li>提现密码<p><input v-model="bank.pay_password" type="password" value="" placeholder="请输入您的提现密码"></p>
          </li>
          <li><p><span @click="forgotPwd()">忘记提现密码?</span></p></li>
          <li><a href="javascript: void(0);" @click="save()">确认提现</a></li>
        </ul>
        <div class="security"><p>账户资金安全由棋牌彩票来保障</p></div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../assets/scss/personal.scss';
  
  export default {
    data() {
      return {
        result: '',
        bank: {
          amount: '',
          pay_password: ''
        }
      }
    },
    
    mounted() {
      let that = this;
      that.init();
      that._Util.setCss('.managMementClsTemplate',{"height": 1},"*");
    },
    
    methods: {
      init() {
        let that = this;
        that._Util.post(that, that._Api.POST_PERSONAL_MEMBER_BANK, {}, (data, dataObj) => {
          if (data) {
            that.result = data;
          }
        });
      },
      save() {
        let that = this;
        if (!that.bank.amount) {
          that._Util.showAlert(that, {content: '请输入提现金额'});
          return;
        }
        if (that.bank.amount < 100) {
          that._Util.showAlert(that, {content: '最低100出款'});
          return;
        }
        if (!that.bank.pay_password) {
          that._Util.showAlert(that, {content: '请输入提现密码'});
          return;
        }
        that._Util.post(that, that._Api.POST_PERSONAL_MEMBER_CASH, {
          amount: that.bank.amount,
          pay_password: that._Util.hexMd5(that.bank.pay_password)
        }, (data) => {
          that._Util.showAlert(that, {content: '申请已提交'}, () => {
            that.$router.push({path: '/home?homeIndex=3'});
          });
        });
      },
      forgotPwd() {
        let that = this;
        that._Util.post(that, that._Api.POST_USER_INFO, {}, (data) => {
//		  data.userInfo.phone = '';
          if (data && data.userInfo) {
            that.$router.push({
              'name': 'phoneManagement',
              query: {phone: data.userInfo.phone, type: !data.userInfo.phone ? 5 : 3, nextRouteName: 'withdrawals'}
            });
          }
        });
      }
    }
  }
</script>

<style lang='scss'>

</style>
