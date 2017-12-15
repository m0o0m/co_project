<template>
    <div class="login ispad">
        <!-- 未完待续 -->
        <!--<div class="per">-->
        <!--<ul class="per_pass">-->
        <!--<a href="javascript:history.back(-1)"><li></li></a>-->
        <!--<li><p style="color:#FFDC99 ">忘记-->
        <!--密&nbsp;码</p></li>-->
        <!--</ul>-->
        <!--</div> -->
        <a href="javascript: void(0);" @click="$router.go(-1)"><img class="imgs" style="top: 0.4rem;"
                                                                    src="../../assets/images/numberimg/icon_back@2x.png"
                                                                    alt=""></a>
        <div class="backPass_title">忘记密码</div>
        <div class="per_pass2 bggs" id="bgg" v-if=" showXy == '1'">
            <div class="monum"><p>用户名</p>
                <p><input v-model="user.username" type="text" placeholder="请输入您的用户名"></p></div>
            <!-- <div class="monum"><p>手机号码</p><p><input type="text" v-model="user.phone" placeholder="请输入手机号码"></p></div> -->
            <!-- <div class="monum"><p>&nbsp;&nbsp;&nbsp;验证码</p><p><input id="style"  v-model="user.code"  type="text" placeholder="请输入验证码"><input @click="getyzm()" v-model="newEntityText"  type="button" id="yzmStyle"></p></div> -->
            <div class="loginBtn" @click="pass11()">下一步</div>
            <div class="backPassCls"><p>温馨提示：如需帮助，请联系在线客服<a href="javascript:void(0)" @click="inlineCustomer">在线客服</a>
            </p></div>
        </div>
        <div class="per_pass2 bggs" id="bgg" v-if=" showXy == '2'">
            <!-- <div class="monum"><p>&nbsp;&nbsp;&nbsp;用户名</p> <p><input  v-model="user.username" type="text" placeholder="请输入您的用户名"></p></div> -->
            <div class="monum isphp"><p>手机号码</p>
                <p>{{isphone}}</p></div>
            <div class="monum"><p>&nbsp;&nbsp;&nbsp;验证码</p>
                <p style="position: relative;"><input id="style" v-model="user.code" type="text" placeholder="请输入验证码" style="width: 100%;"/><input @click="getyzm()"
                                                                                                 v-model="newEntityText"
                                                                                                 type="button"
                                                                                                 id="yzmStyle" style="background: #E4D3AA; color: #333333; width: auto; display: inline-block; padding: 0 0.3rem; position: absolute; right: 0; top: 0;"></p>
            </div>
            <div class="loginBtn" @click="pass()">下一步</div>
        </div>
        <div class="per_pass2 bggs" id="bgg" v-if=" showXy == '3'">
            <div class="monum"><p>设置密码</p>
                <p><input type="password" v-model="user.password" placeholder="请输入6～12位数字或字母" maxlength="12" onkeyup="value=value.replace(/[\W]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"></p></div>
            <div class="monum"><p>确认密码</p>
                <p><input type="password" v-model="user.password2" placeholder="请再次输入您的密码" onkeyup="value=value.replace(/[\W]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"></p></div>
            <div class="loginBtn" @click="ispass()">完成</div>
        </div>
    </div>
</template>
<script>
  import '../../assets/scss/personal.scss';
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
      $(".login").css({
        "height": $(window).height()
      })
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
