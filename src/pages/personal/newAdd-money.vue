<template>
    <div class="RechargeCls abgtops">
        <div class="commonNavBar positionFixed">
          <div class="backPassTitle"><p>充值中心</p></div>
          <div class="loginIcon arrowLeft flt" @click="$router.push({name:'home'});"><a href="javascript:void(0)"></a></div>
          <div class="loginIcon arrowRight time" @click="$router.push({name:'moneyHis'});"><a href="javascript:void(0)"></a></div>
        </div>
        <div class="rechargeListNew">
          <div class="RechargeBrNew">
            <div class="rechargeBalanceNew">
              <p>账户余额
                <span>
                   <span>¥</span>

                  {{result.userAmount}}
                </span>
              </p>
            </div>
            <ul class="RechargeNewRMB clearfix">
                    <li @click="selectMoney(oldNum)" :class="{'borders':this.money==oldNum,}">
                        <div ><b>充值金额：¥</b>
                          <input type="tel" placeholder="请输入带小数点金额，成功率更高" v-model="inpNum" class="placeMarry"
                                 @keyup="KeyUpVal(inpNum)" id="" onkeyup="this.value=this.value.replace(/\D/g,'')"
                                 onafterpaste="this.value=this.value.replace(/\D/g,'')" maxlength="7"/>
                        </div>
                    </li>
                    <li v-for="(v, index) in result.customAmountList" @click="selectMoney(v,index)"  :class="{'borders':money == v}">
                            <p><span>¥{{v}}</span></p>
                    </li>
                </ul>
          </div>
          <div class="RechargeOpiNew">
            <div class="RechargeOpiTitleNew">支付方式</div>
            <ul class="RechargeOpiNewNav clearfix">
              <li class="" v-for="(v, index) in result.paymentList" @click="passgewayServer(v.item,index)" :class=" {'on':index == onindex}">
                  <p>{{v.name}} </p>
              </li>
            </ul>
            <div class="RechargeOpiNewTab">
              <ul>
                <li v-for="(vSon, index) in EBank"  class=" commonArrowsRightList clearfix" @click=" toPay(vSon)">
                  <div class="">
                    <p class="newTabLeft"><img src="../../assets/images/numberimg/z04.png" alt="">{{vSon.name}}</p>
                    <p class="newTabRight">单笔金额¥{{vSon.min_value}}～¥{{vSon.max_value}}</p>
                  </div>
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
        money: 49,
        oldNum: '',
        onindex:0,
        EBank:[],
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
          that.EBank= data.paymentList[this.onindex].item;
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
        if (that.onindex == 0) {
	        that.$router.push({name: 'onlineRech', query: query});
//	        that.$router.push({name: 'onlineRechName', query: query});
        } else if (that.onindex == 1) {
        } else if (that.onindex == 2) {
	        that.$router.push({name: 'weixinRech', query: query});
        }
      },
      passgewayServer(v,index){
        let that = this;
        that.onindex = index;
        that.EBank=v;
      },
      selectMoney(num) {
        this.money = num;
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
