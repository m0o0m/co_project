<style>
  /*.mint-loadmore-top {*/
  /*margin-top: -10px;*/
  /*}*/
</style>
<template>
  <div class="window_size">
    <div class="personalTemp">
      <div class="personalMians bgimgs">
        <div class="personalAgs istttop">
          <img class="imgs1" src="../../assets/images/numberimg/contop.png" alt="">
        </div>
        <div @click="$router.push({name: 'annList'})" class="personal_left"><img
            src="../../assets/images/numberimg/left.png" alt=""/></div>
        <div class="personal_right" @click="loginService"><img src="../../assets/images/numberimg/kf.png"
                                                               alt=""></div>
        <div class="personal_mian topm">
          <div class="personal_news">
            <section><img src="../../assets/images/numberimg/tou.png" alt=""></section>
            <section>
              <!--| {{_Util.formatPhone(result.phone || '')}}-->
              <p><span style="font-family: Arial;">{{result.username}}</span></p>
              <p>余额: <span class="cors" v-html="'￥' + (result.amount || '')"></span></p>
              <!--<p>积分: <span v-html="result.points || ''"></span></p>-->
            </section>
          </div>
          <div class="personal_list">
            <section @click="toCash()">
              <a class="aisa" href="javascript:void(0)"><p>快捷提现</p></a>
            </section>
            <section>
              <router-link :to="{name: 'assetsDetail'}" style="background:none">
                <a class="aisa" href="javascript:void(0)"><p>资金明细</p></a>
              </router-link>
            </section>
          </div>
          <div class="personal_listNav_mGer">
            <div class="personal_listNav_tc">
              <div class="personal_listNav ">
                <mt-loadmore
                    ref="loadmore"
                    :top-method="loadTop">
                  <ul>
                    <li class="islis" @click="toPhoneManager()">
                      <a href="javascript:void(0)">
                        <p>手机号管理</p>
                      </a>
                    </li>
                    <li class="islis">
                      <router-link :to="{name: 'loginPass'}">
                        <a href="javascript:void(0)">
                          <p>登录密码管理</p>
                        </a>
                      </router-link>
                    </li>
                    <li class="islis" @click="toCashManager()">
                      <a href="javascript:void(0)">
                        <p>提现密码管理</p>
                      </a>
                    </li>
                    <li class="islis" @click="cardManager()">
                      <a href="javascript:void(0)">
                        <p>银行卡管理</p>
                      </a>
                    </li>
                    <li class="islis">
                      <router-link :to="{name: 'rebate'}">
                        <a href="javascript:void(0)">
                          <p>开户返佣</p>
                        </a>
                      </router-link>
                    </li>
                    <li class="islis">
                      <router-link :to="{name: 'master'}">
                        <a href="javascript:void(0)">
                          <p>师徒关系</p>
                        </a>
                      </router-link>
                    </li>
                    <li class="islis feedback_message" @click="saveTime">
                      <router-link :to="{name: 'feedBack'}">
                          <p>宝贵意见</p>
                          <i v-if="isHasNews"></i>
                      </router-link>
                    </li>
                    <li class="islis">
                      <router-link :to="{name: 'aboutUs'}">
                        <a href="javascript:void(0)">
                          <p>关于我们</p>
                        </a>
                      </router-link>
                    </li>
                  </ul>
                  <div @click="loginOut()" class="loadMoreTC">
                    <a class="isbgco" href="javascript:void(0)">退出登录</a>
                  </div>
                </mt-loadmore>
              </div>
            
            </div>
          </div>
        </div>
      </div>
      <HomeFoter></HomeFoter>
    </div>
  </div>

</template>
<script type="text/babel">
  import '../../assets/scss/default.scss'
  import '../../assets/scss/personal.scss';
  import HomeFooter from '../../components/HomeFooter'
  
  export default {
    data() {
      return {
        result: {},
        footerRouterName: {},
        busy: false,
        isHasNews:false,
        feedback_time:0,
      }
    },
    
    mounted() {
      let that = this;
      
      if (that.$route.query.homeIndex == 3) {
        that.init();
      }
      $(".window_size").css({
        "height": $(window).height()
      })
      
      document.getElementsByClassName('personal_listNav')[0].addEventListener('touchstart', function (event) {
        event.target.classList.add('needsclick');
      })
    },
    
    methods: {
      init() {
        let that = this;
        let nowtime = parseInt(localStorage.getItem("feedback_time")||0);
        console.log("sssss:",nowtime);
        if (that.busy) return;
        that.busy = true;
        that._Util.post(that, that._Api.POST_USER_INFO, {
          feedback_time: nowtime,
        }, (data) => {
          that.busy = false;
          if (data.userInfo) {
//		    data.userInfo.is_bind_bank_card = 0;
            that.result = data.userInfo;
            that.isHasNews = data.userInfo.is_show_feedback_icon;
//			that.result.phone = '';
          }
        }, '', true);
      },
      saveTime(){
        localStorage.setItem("feedback_time",parseInt(Date.parse(new Date())/1000));
      },
      loadTop() {
        this.init();
        this.$refs.loadmore.onTopLoaded();
      },
      
      toPhoneManager() {
        this.$router.push({
          name: 'phoneManagement',
          query: {phone: this.result.phone, fullPath: this.$route.fullPath, type: 5}
        });
      },
      
      toCash() {
        let that = this;
        if (!that.result.phone) {
          that._Util.showAlert(that, {content: '请绑定手机后设置支付密码'});
          that.$router.push({name: 'phoneManagement', query: {fullPath: that.$route.fullPath, type: 5}});
        } else {
          if (!that.result.is_bind_bank_card) {
            that.$router.push({name: 'addCard'});
          } else {
            if (!that.result.is_set_pay_pass) {
              this.$router.push({
                name: 'phoneManagement',
                query: {
                  nextRouteName: 'withdrawals',
                  phone: this.result.phone,
                  title: '提现密码',
                  type: 3
                }
              });
            } else {
              this.$router.push({name: 'cash'});
            }
          }
        }
      },
      
      toCashManager() {
        if (!this.result.phone) {
          this._Util.showAlert(this, {content: '请绑定手机后设置支付密码'});
          this.$router.push({name: 'phoneManagement', query: {fullPath: this.$route.fullPath}});
        } else {
          this.$router.push({
            name: 'phoneManagement',
            query: {
              nextRouteName: 'withdrawals',
              phone: this.result.phone,
              title: '提现密码',
              type: 3
            }
          })
        }
      },
      
      cardManager() {
        let that = this;
        
        if (!that.result.is_bind_bank_card) {
          that.$router.push({name: 'bankCard'});
        } else {
          that.$router.push({name: 'bankCard'});
        }
        
      },
      
      loginOut() {
        let that = this;
        that._Util.post(that, that._Api.POST_PERSONAL_LOGIN_OUT, {}, () => {
          that._Util.setLocalStorage('legouUser', '');
          that._Util.setStorage('isLogin', false, true);
          that.$router.replace({name: 'login'});
          localStorage.setItem('sectionLogin','')
        });
      },
      
      loginService() {
        let that = this;
        that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
          console.log(data);
          window.location.href = data.value;
        })
      }
    },
    
    components: {
      HomeFoter: HomeFooter
    },
    
    watch: {
      '$route'() {
        if (this.$route.query.homeIndex == 3) {
          this.init();
        }
      }
    }
  }
</script>

<style lang="scss">
  .personalTemp {
    height: 100%;
    background: url('../../assets/images/numberimg/Mask.png') center center no-repeat;
    background-size: cover;
  }
  
  .personalMian {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: url('../../assets/images/numberimg/bancon.png') top center no-repeat;
  }
  
  .loadMoreTC {
    margin-bottom: 2.5rem;
  }
</style>