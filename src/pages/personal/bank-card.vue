<template>
  <div class="templateCardBank">
      <div class="commonNavBar positionFixed">
        <div class="backPassTitle"><p>银行卡管理</p></div>
        <div class="loginIcon left flt "   @click="$router.push({name:'personal'});"><a href="javascript:void(0)"></a></div>
      </div>
      
      <div v-if="result.card_number" class="perCards">
        <div class="bankAdmination" id="top">
          <section>
            <p>
            <span>
              <img :src="bankLogo"/></span>{{result.bank_name}}
            </p>
            <p><span>****</span><span>****</span><span>****</span>
              <span>{{result.card_number}}</span>
            </p>
          </section>
        </div>
      </div>
      <div v-else class="addBankCardBox">
        <div class="bankAdminCard" @click="addCard()">
          <section>
            <p></p>
            <p>添加银行卡</p>
          </section>
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
        bankLogo: ''
      }
    },
    
    mounted() {
      this._Util.setCss('.templateCardBank',{"height": 1},"*");
      this.init();
    },
    
    methods: {
      init() {
        let that = this;
        that._Util.post(that, that._Api.POST_PERSONAL_MEMBER_BANK, {}, (data) => {
//          data.card_number = '';
          that.result = data;
          if (data.bank_id) {
            that.bankLogo = require('../../assets/images/bankLogo/' + data.bank_id + '.png');
          }
        });
      },
      
      addCard() {
        this.$router.replace({name: 'addCard'});
      }
    }
  }
</script>

<style lang='scss'>

</style>
