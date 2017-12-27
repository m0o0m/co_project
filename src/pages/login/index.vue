<template>
  <div class="loginIndex">
    <div class="loginPad">
      <div class="commonNavBar">
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
          <li class="loginLi displayFlex">
            <p>密码</p>
            <p>
              <input v-model="user.password" type="password" placeholder="请输入6～12位数字或字母" maxlength="12"/>
            </p>
          </li>
        </ul>
      </div>
      <div class="forgetPaw"><a href="javascript:void(0)" @click="foregister()">忘记密码?</a></div>
      <div class="loginHostBtn" @click="login()"><a href="javascript:void(0)">登录</a></div>
      <div class="loginText">还没有账号，<a href="javascript:void(0)" @click="register()">立即注册</a>&nbsp;&nbsp;<a href="javascript:void(0)" @click="testPlay()">免费试玩</a></div>
      <!--<div class="loginText" style="display: inline; text-align: right;"></div>-->
    </div>
  </div>
</template>
<script>
  // import '../../assets/scss/login.scss';

  import MD5 from '../../assets/js/ciphertext'
  import $ from 'jquery'
  
  export default {
    data() {
      return {
        user: {
          username: '',
          password: ''
        },
	      loginTitle: require('../../assets/images/login/logo.png')
      };
    },
    mounted() {
      this._Util.setCss('.login_box', {"height": 1}, "*");
    },
    methods: {
      login() {
        // alert(12)
        let that = this;
        
        if (that.user.username == "" || that.user.password == "") {
          that._Util.showAlert(that, {content: '账号密码不能为空'});
          return;
        }
        that._Util.post(that, that._Api.POST_LOGIN, {
          username: that.user.username,
          password: that._Util.hexMd5(that.user.password)
        }, (data) => {
//					data.is_test_player = true;
          that._Util.setStorage('userInfo', data, true);
          
          that._Util.setLocalStorage('legouUser', {
            username: that.user.username,
            password: that._Util.hexMd5(that.user.password)
          });
          localStorage.setItem('sectionLogin', data.id);
          that._Util.setStorage('isLogin', true, true);
          if (window.frames.length !== parent.frames.length) {
            window.parent.document.getElementById('closeFrame').click();
          } else {
//						that.$router.replace({name: 'personal'});
//                      console.log( '213',that.$route.query.fullPath )
            if (that.$route.query.fullPath) {
              
              that.$router.replace({path: that.$route.query.fullPath});
            } else {
//                        this.$router.go(-1);
              that.$router.replace({name: 'personal'});
            }
          }
        });
      },
      
      register() {
        this.$router.replace({name: 'register'});
      },
      
      foregister() {
        this.$router.replace({name: 'back-pass'});
      },
      
      wxLogin() {
        location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx97f1dacb35f8701b&redirect_uri=' + escape(location.href) + '&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect'
      },
      
      back() {
        if (window.frames.length !== parent.frames.length) {
          window.parent.document.getElementById('closeFrame').click();
        } else {
          if (this.$route.query.fullPath) {
            this.$router.replace({path: this.$route.query.fullPath});
          } else {
            let routeName = sessionStorage.getItem('beforeLoginRouteName');
            if (routeName && routeName === 'index' || routeName === 'home' || routeName === 'betting' || routeName === 'addMoney' || routeName === 'personal') {
              if (routeName === 'home') {
                location.href = "/home?homeIndex=0";
              } else {
                this.$router.replace({name: 'home'});
              }
              
            } else {
              this.$router.go(-1);
            }
          }
        }
      },
      loginService() {
        let that = this;
        that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
          window.location.href = data.value;
        })
      },

	    testPlay() {
      	let that = this;
      	that._Util.post(that, that._Api.POST_TEST_PLAY_LOGIN, {}, (data) => {
		      that._Util.setStorage('userInfo', data, true);
		      that.$router.replace({name: 'home'});
	      });
	    }
    }
  }
</script>

<style lang="scss">
  .login_box {
    overflow-y: scroll;
  }
  
  .isflA {
    font-family: PingFangSC-Regular;
    font-size: 0.57931rem;
    color: #FFDC99;
    letter-spacing: 0;
    line-height: 0.57931rem;
    float: left;
    margin-top: 0.82759rem;
  }
</style>