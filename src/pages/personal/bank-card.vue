<template>
  <div class="moneyTemplateed">
    <div class="template_card template_card_bank" style="background: transparent">
      <div class="per">
        <ul class="per_leftd">
          <li @click="$router.go(-1);"></li>
          <li><p style="color:#FFDC99 ">银行卡管理</p></li>
        </ul>
      </div>
      
      <div v-if="result.card_number" class="per_cardss toppss">
        <div class="bank_Admination ttops" id="ttops">
          <section>
            <p style="padding-left: 0.2rem; background: none;">
            <span
                style="background: #ffffff; border: 0.1rem solid #ffffff; width: 0.75rem; height: 0.75rem; display: inline-block; border-radius: 50%; position: relative; top: 0.2rem; left: -0.2rem;"><img
                :src="bankLogo"/></span>{{result.bank_name}}
            </p>
            <p><span>****</span><span>****</span><span>****</span><span
                style="font-family: Arial;">{{result.card_number}}</span></p>
          </section>
        </div>
      </div>
      <div class="add_bank_card_box">
        
        <!--<div @click="addCard()" class="bank_Admination ttops" id="ttops">-->
        <!--<section>-->
        <!--<p>尚未添加银行卡</p>-->
        <!--<p><span>+点击添加</span></p>-->
        <!--</section>-->
        <!--</div>-->
        <div class="bank_Admin_card" @click="addCard()">
          <section>
            <p></p>
            <p>添加银行卡</p>
          </section>
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
        bankLogo: ''
      }
    },
    
    mounted() {
      this._Util.setCss('.template_card_bank',{"height": 1},"*");
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
