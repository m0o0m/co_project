<template>
  <div class="phoneManagMement">
    <div class="commonNavBar positionFixed">
      <div class="backPassTitle"><p>{{$route.query.title || '手机号管理'}}</p></div>
      <div class="loginIcon left flt" @click="$router.go(-1)"><a href="javascript:void(0)"></a></div>
    </div>
    <div v-if="!$route.query.phone" class="phoneManagMementContent">
      <div class="loginLi displayFlex withdrawPassword">
        <p>手机号</p>
        <p><input type="number" v-model="phone" placeholder="请输入11位手机号码" pattern="^[0-9]*$"></p>
      </div>
      <Captcha ref="captchaRef" :phone="phone"></Captcha>
      <div @click="save()" class="loginHostBtn finishBtn"><a href="javascript:void(0);">完成</a></div>
    </div>
    
    <div v-if="$route.query.phone && ($route.query.type == 1 || $route.query.type == 5)" class="phoneManagMementContent">
      <p class="phoneNum">手机号<span>{{_Util.formatPhone($route.query.phone || '')}}</span></p>
      <p class="warmPromptCustom ">您的手机号已经绑定，无需重复绑定，如需帮助，请联系客服</p>
      <p class="loginHostBtn finishBtn"><a href="javascript:void(0)" @click="customerServer">联系客服</a></p>
    </div>
    <div v-if="$route.query.phone && ($route.query.type == 2 || $route.query.type == 3)" class="phoneManagMementContent">
      <div class="loginLi displayFlex">
        <p>手机号</p>
        <p class="hasPhoneNumber">
          <input type="text" :value="_Util.formatPhone($route.query.phone || '')" readonly></p>
      </div>
      <Captcha ref="captchaRef" :phone="$route.query.phone || ''"></Captcha>
      <div @click="cashNext()" class="loginHostBtn finishBtn"><a href="javascript:void(0);">下一步</a></div>
      <div class="warmPrompt">温馨提示：如需帮助，请联系<a href="javascript:void(0)" @click="loginService()">在线客服</a></div>
    </div>
  </div>
</template>

<script>
//  import '../../assets/scss/personal.scss';
  import Captcha from '../../components/captcha.vue'
  
  export default {
    data() {
      return {
        phone: '',
        code: ''
      }
    },
    mounted() {
      this._Util.setCss('.managMementCls',{"height": 1},"*");
    },
    methods: {
      save() {
        let that = this;
        
        if (!that.$refs.captchaRef.code) {
          that._Util.showAlert(that, {content: '验证码不能为空'});
          return;
        }
        
        that._Util.post(that, that._Api.POST_COMMON_BIND_PHONE, {
          phone: that.phone,
          code: that.$refs.captchaRef.code
        }, (data, dataObj) => {
          if (that.$route.query.nextRouteName) {
            that.$router.replace({
              name: that.$route.query.nextRouteName,
              query: {phone: that.phone, code: that.$refs.captchaRef.code}
            });
          } else {
            that.$router.replace({path: that.$route.query.fullPath});
          }
        });
      },
      
      cashNext() {
        let that = this;
        that._Util.post(that, that._Api.POST_COMMON_VALIDATE_CODE, {
          phone: that.$route.query.phone,
          code: that.$refs.captchaRef.code,
          type: "3"
        }, (data, dataObj) => {
          that.$router.replace({
            name: 'withdrawals',
            query: {phone: that.$route.query.phone, code: that.$refs.captchaRef.code, type: that.$route.query.type}
          });
        });
      },
      customerServer() {
        let that = this;
        that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
          window.location.href = data.value;
        })
      },
      loginService() {
        let that = this;
        that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
          window.location.href = data.value;
        })
      }
    },
    
    components: {
      Captcha
    }
  }
</script>

<style lang='scss'>
</style>
