<template>
    <!-- <div id="isapp"> -->
    <div class="RechargeCls abgtops">
        <div class="commonNavBar positionFixed">
          <div class="backPassTitle"><p>充值中心</p></div>
          <div class="loginIcon arrowLeft flt" @click="$router.push({name:'home'});"><a href="javascript:void(0)"></a></div>
          <div class="loginIcon arrowRight time" @click="$router.push({name:'moneyHis'});"><a href="javascript:void(0)"></a></div>
        </div>
        <div class="rechargeList">
            <div class="RechargeBr">
              <div class="rechargeBalance"><p>账户余额<span>¥{{result.amount}}</span></p></div>
              <ul class="RechargeRMB">
                    <li @click="selectMoney(100)" :class="{'borders':this.money==100,}">
                        <section>
                            <p><img :src="addMoneyDate[0].img"/></p>
                            <p><span>¥100</span></p>
                        </section>
                    </li>
                    <li @click="selectMoney(300)" :class="{'borders':this.money==300,}">
                        <section>
                            <p><img :src="addMoneyDate[1].img"/></p>
                            <p><span>¥300</span></p>
                        </section>
                    </li>
                    <li @click="selectMoney(500)" :class="{'borders':this.money==500,}">
                        <section>
                            <p><img :src="addMoneyDate[2].img"/></p>
                            <p><span>¥500</span></p>
                        </section>
                    </li>
                    <li @click="selectMoney(1000)" class="red_RMB " :class="{'borders':this.money==1000,}">
                        <section>
                            <p><img :src="addMoneyDate[3].img"/></p>
                            <p><span>¥1000</span></p>
                        </section>
                    </li>
                    <li @click="selectMoney(3000)" class="red_RMB" :class="{'borders':this.money==3000,}">
                        <section>
                            <p><img :src="addMoneyDate[4].img"/></p>
                            <p><span>¥3000</span></p>
                        </section>
                    </li>
                    <li @click="selectMoney(5000)" class="red_RMB" :class="{'borders':this.money==5000,}">
                        <section>
                            <p><img :src="addMoneyDate[5].img"/></p>
                            <p><span>¥5000</span></p>
                        </section>
                    </li>
                    <li @click="selectMoney(8000)" class="red_dell" :class="{'borders':this.money==8000,}">
                        <section>
                            <p><img :src="addMoneyDate[6].img"/></p>
                            <p><span>¥8000</span></p>
                        </section>
                    </li>
                    <li @click="selectMoney(10000)" class="red_ma" :class="{'borders':this.money==10000,}">
                        <section>
                            <p><img :src="addMoneyDate[7].img"/></p>
                            <p><span>¥10000</span></p>
                        </section>
                    </li>
                    <li @click="selectMoney(oldNum)" :class="{'borders':this.money==oldNum,}">
                        <section>
                            <input type="tel" placeholder="其它金额" v-model="inpNum" class="placeMarry"
                                   @keyup="KeyUpVal(inpNum)" id="" onkeyup="this.value=this.value.replace(/\D/g,'')"
                                   onafterpaste="this.value=this.value.replace(/\D/g,'')" maxlength="7"/>
                        </section>
                    </li>
                </ul>
            </div>
            <div class="RechargeOpi">
                <div class="RechargeOpiMian">
                  <div class="RechargeOpiTitle">支付方式</div>
                  <ul>
                        <li class="" v-for="(v, index) in result.pay_type_list" @click="passgewayServer(v)">
                            <p class="zhi commonArrowsRight">
                              <i :class="{'qqpay': v.pic_name === 'qq.png','alipay': v.pic_name === 'alipay.png', 'weixin': v.pic_name === 'weixin.png','unionpay': v.pic_name === 'unionpay.png','bankcard': v.pic_name === 'bankcard.png'}">
                              </i>
                                <span></span>{{v.name}}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '充值中心',
        result: {},
        money: 100,
        oldNum: '',
        addMoneyDate: [
          {img: require('../../assets/images/marry_100.png')},
          {img: require('../../assets/images/marry_300.png')},
          {img: require('../../assets/images/marry_500.png')},
          {img: require('../../assets/images/marry_1000.png')},
          {img: require('../../assets/images/marry_3000.png')},
          {img: require('../../assets/images/marry_5000.png')},
          {img: require('../../assets/images/marry_8000.png')},
          {img: require('../../assets/images/marry_10000.png')}
        ]
      }
    },

    mounted() {
      this.init();
    },

    methods: {
      init() {
        let that = this;
        that._Util.post(that, that._Api.POST_PAY_TYPE, {}, (data) => {
          that.result = data;
        });
      },
      KeyUpVal(v) {
        this.money = v;
      },
      toPay(v) {
        let that = this;
        if (!that.money) {
          that._Util.showAlert(that, {content: '请选择金额'});
          return false;
        }
        let query = {
          id: v.id,
          amount: that.money,
          title: v.name
        };
        if (v.name === '微信' || v.name === '支付宝' || v.id === 5) {
          that.$router.push({name: 'weixinRech', query: query});
        } else if (v.name === '银行卡转账') {
          that.$router.push({name: 'onlineRech', query: query});
        } else if (v.name === '在线支付') {
          that.$router.push({name: 'onlineRechName', query: query});
        }
      },
      passgewayServer(v){
        let that = this;
        that._Util.post(that, that._Api.POST_PAY_TYPE_DETAIL, {
          payment_type_id: v.id,
          amount: this.money
        }, (data) => {

//          data.pay_list[1].pay_type_list = [];
//          data.pay_list[1].pay_type_list = [];


            if(data && data.pay_list && data.pay_list.length
              && !data.pay_list[0].pay_type_list.length && !data.pay_list[1].pay_type_list.length){
              that._Util.showAlert(that,{content: "通道已经关闭"});
            }else{
              that.toPay(v)
            }
        });
      },

      selectMoney(num) {
        this.money = num;
        console.log(num)
      },
    },
    computed: {
      inpNum: {
        get: function () {
          return this.oldNum;
        },
        set: function (newValue) {
          this.oldNum = newValue.replace(/[^\d]/g, '');
          newValue = parseInt(newValue) === 0 ? '' : newValue;
          if(!newValue) {
            this.oldNum = "";
          }else {
            this.oldNum = newValue.replace(/[^\d]/g, '');
          }
          return this.oldNum;
        }
      }
    }
  }
</script>

<style lang='scss'>
</style>
