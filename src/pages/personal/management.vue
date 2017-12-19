<template>
  <div class="managMementCls">
    <div class="per lisbg">
      <ul class="per_leftd ">
        <li @click="$router.go(-1);"></li>
        <li><p style="color:#FFDC99 ">{{$route.query.title || '手机号管理'}}</p></li>
      </ul>
    </div>
    <div v-if="!$route.query.phone" class="per_conter cons1">
      <div class="monum">
        <p>手机号</p>
        <p><input type="number" v-model="phone" placeholder="请输入11位手机号码" pattern="^[0-9]*$"></p>
      </div>
      <Captcha ref="captchaRef" :phone="phone"></Captcha>
      <div @click="save()" class="loginBtns1">完成</div>
    </div>
    
    <div v-if="$route.query.phone && ($route.query.type == 1 || $route.query.type == 5)" class="per_conter cons2"
         strle="display:none">
      <p class="per-p1 p11">手机号<span>{{_Util.formatPhone($route.query.phone || '')}}</span></p>
      <p class="per-p2">您的手机号已经绑定，无需重复绑定，如需帮助，请联系客服</p>
      <p class="per-p3"><a href="javascript:void(0)" @click="customerServer">联系客服</a></p>
    </div>
    <div v-if="$route.query.phone && ($route.query.type == 2 || $route.query.type == 3)"
         class="per_conter per_conterstop cons3" strle="display:none;">
      <div class="monum">
        <p>手机号</p>
        <p>
          <input type="text" :value="_Util.formatPhone($route.query.phone || '')" readonly
                 style="border: none; background: transparent; font-size: 0.85rem; color: #FFDC99; font-family: Arial; text-indent: 0;">
        </p>
      </div>
      <Captcha ref="captchaRef" :phone="$route.query.phone || ''"></Captcha>
      <div @click="cashNext()" class="loginBtn">下一步</div>
      <div class="management_line">温馨提示：如需帮助，请联系<a href="javascript:void(0)" @click="loginService()">在线客服</a></div>
    </div>
  </div>
</template>

<script>
  import '../../assets/scss/personal.scss';
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
