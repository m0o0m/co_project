<template>
  <div class="loginIndex">
    <div class="loginPad">
      <div class="commonNavBar positionFixed">
        <div class="loginTitle"><p><img :src='loginTitle'/></p></div>
        <div class="loginIcon left" @click="back()"><a href="javascript:void(0)"></a></div>
        <div class="loginIcon right"  @click="loginService"><a href="javascript:void(0)"></a></div>
      </div>
      <div class="loginName">
        <ul>
          <li class="loginLi displayFlex">
            <p>用户名</p>
            <p><input v-model="user.username" type="text" placeholder="请输入用户名" maxlength="12" id="username"/></p>
          </li>
        </ul>
      </div>
      <div class="loginHostBtn" @click="pass11()"><a href="javascript:void(0)">下一步</a></div>
      <div class="loginText">温馨提示：如需帮助，请联系在线客服<a href="javascript:void(0)" @click="inlineCustomer">在线客服</a></div>
      <!--验证手机号码-->
      <div class="verificationCall" v-if="showXy == '2'">
        <div class="loginName">
          <ul>
            <li class="loginLi displayFlex">
              <p>手机号码</p>
              <p class="Mobile">{{isphone}}</p>
            </li>
            <li class="loginLi displayFlex">
              <p>验证码</p>
              <p class="relatively">
                <input v-model="user.code" type="text" placeholder="请输入用户名" maxlength="12"/><input @click="getyzm()" v-model="newEntityText" type="button" id="sendCode"></p>
            </li>
          </ul>
        </div>
        <div class="loginHostBtn" @click="pass11()"><a href="javascript:void(0)">下一步</a></div>
      </div>
      <!--设置密码-->
      <div class="setUpPaw" v-if="showXy == '3'">
        <div class="loginName">
          <ul>
            <li class="loginLi displayFlex">
              <p>设置密码</p>
              <p><input v-model="user.password" type="password" placeholder="请输入6～12位数字或字母" maxlength="12" onkeyup="value=value.replace(/[\W]/g,'') "  onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"/></p>
            </li>
            <li class="loginLi displayFlex">
              <p>确认密码</p>
              <p>
                <input v-model="user.password2" type="password" placeholder="请输入6～12位数字或字母" maxlength="12" onkeyup="value=value.replace(/[\W]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"/>
              </p>
            </li>
          </ul>
        </div>
        <div class="loginHostBtn" @click="ispass()"><a href="javascript:void(0)">完成</a></div>
      </div>
    </div>
  </div>
</template>
<script>
  // import '../../assets/scss/personal.scss';
  import MD5 from '../../assets/js/ciphertext'
  //  import captcha from '../../components/captcha';
  export default {
    data() {
      return {
        user: {
          username: '',
          password: '',
          password2: '',
          phone: '',
          code: '',
          type: 4,
        },
        flg: false,
        showXy: 1,
        newEntityText: '获取验证码',
        countdown: 60,
        isphone: ''
      }
    },
    mounted() {
      this._Util.setCss('.login',{"height": 1},"*");
    },
    methods: {
      pass11() {
        let that = this;
        if (that.user.username == "") {
          that._Util.showAlert(that, {content: '用户名不能为空'});
          return;
        }
        //验证验证码
        that._Util.post(that, that._Api.POST_COMMON_GET_USERNAMES, that.user, (data) => {
          that.isphone = data.phone;
          if (!that.isphone) {
            that._Util.showAlert(that, {content: '您的账号尚未绑定手机号，如需帮助，请联系在线客服'});
          } else {
            that.showXy = 2
          }
          
          //   that.user.phone= data.phone;
        });
        
      },
      pass() {
        let that = this;
        // if ( that.user.username == "" ) {
        //   that._Util.showAlert(that, {content: '用户名不能为空'});
        //     return;
        // }
        // if ( that.user.phone == "" || that.user.phone.length != "11" ) {
        //   that._Util.showAlert(that, {content: '手机号码为11位数'});
        //     return;
        // }
        if (that.user.code == "") {
          that._Util.showAlert(that, {content: '验证码不能为空'});
          return;
        }
        //验证验证码
        //  that._Util.post(that, that._Api.POST_COMMON_VALIDATE_CODE, that.user, (data) => {
        that.showXy = 3
        // });
        
      },
      ispass() {
        let that = this;
        if (that.user.password == "" || that.user.password2 == "") {
          that._Util.showAlert(that, {content: '请输入密码'});
          return;
        }
        if (that.user.password != that.user.password2) {
          that._Util.showAlert(that, {content: '请输入相同密码'});
          return;
        }
        that.user.password = MD5.hex_md5(that.user.password);
        that.user.password2 = MD5.hex_md5(that.user.password2);
        that._Util.post(that, that._Api.POST_FORGIT, that.user, (data) => {
          that._Util.showAlert(that, {content: '设置密码成功'});
          that.$router.replace({name: 'home'});
        });
      },
      
      getyzm() {
        let that = this;
        
        // if ( that.user.username == "" ) {
        //   that._Util.showAlert(that, {content: '用户名不能为空'});
        //     return;
        // }
        // if ( that.user.phone == "" || that.user.phone.length != "11" ) {
        //   that._Util.showAlert(that, {content: '手机号码为11位数'});
        //     return;
        // }
//        that.settime(that);
        
        if (that.flg) return;
        
        that.flg = true;
        
        that._Util.post(that, that._Api.POST_COMMON_GET_CAPTCHAPASSW, that.user, (data) => {
          let time = setInterval(function () {
            if (that.countdown === 0) {
              that.newEntityText = '发送验证码';
              that.countdown = 60;
              that.flg = false;
              clearInterval(time);
            } else {
              that.newEntityText = (that.countdown--) + 's后重新发送';
            }
          }, 1000);
          
        });
      },
      inlineCustomer() {
        let that = this;
        that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
          window.location.href = data.value;
        })
      }
    },
    components: {
      // captcha
    }
  }

</script>

<style lang='scss'>
  #style {
    width: 65%;
    border-right: none;
    float: left;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  #yzmStyle {
    float: left;
    width: 34%;
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-right: 0.3rem;
    font-size: 0.5rem;
    color: #888;
  }

</style>
