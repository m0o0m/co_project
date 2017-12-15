<template>
  <div class="login_box">
    <div class="login ispad ">
      <a href="javascript: void(0);" @click="back()"><img class="imgs"
                                                          src="../../assets/images/numberimg/icon_back@2x.png" alt=""></a>
      <a href="javascript: void(0)" class="void_img" @click="loginService"><img
              src="../../assets/images/numberimg/icon_right.png" alt=""/></a>
      <div class="loginMian censs">
        <article class="login_article">
          <section class="loginFlexs">
            <p>用户名</p>
            <input v-model="user.username" type="text" placeholder="请输入用户名" maxlength="12" id="username"/>
          </section>
          <section class="loginFlexs">
            <p>密码</p>
            <p><input v-model="user.password" type="password" placeholder="请输入6～12位数字或字母" maxlength="12"/></p>
          </section>

          <p><a href="javascript:void(0)" class="for forgotER" @click="foregister()"> 忘记密码？</a></p>
          <a href="javascript:void(0)" class="as">
            <div @click="login()" class="loginBtn">登录</div>
          </a>
          <p class="ft">还没有账号，</p>
            <a class="isflA" href="javascript: void(0);" @click="register()">立即注册</a>
          <!--<div @click="wxLogin()" class="wxLogin">
              <section class="wxLogin_title"><p>第三方登录</p></section>
              <section class="wxLogin_section">
                  <img src="../../assets/images/wechat2x.png"/>
              </section>
          </div>-->
        </article>
      </div>
    </div>
  </div>

</template>
<script>
	import '../../assets/scss/login.scss';
	import MD5 from '../../assets/js/ciphertext'
	import $ from 'jquery'

	export default {
		data() {
			return {
				user: {
					username: '',
					password: '',
				},
			};
		},
    mounted(){
			$(".login_box").css({
				"height": $(window).height(),
      });
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
                    if (routeName && routeName === 'index' || routeName === 'home' ||routeName === 'betting' || routeName === 'addMoney' || routeName === 'personal') {
                      if(routeName === 'home'){
                        location.href = "/home?homeIndex=0";
                      }else{
                        this.$router.replace({name: 'home'});
                      }
                     
                    } else {
                      this.$router.go(-1);
                    }
                  }
				}
			},
			loginService () {
				let that = this;
				that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
					window.location.href = data.value;
				})
			}
		}
	}
</script>

<style lang="scss">
  .login_box{
    overflow-y: scroll;
  }
    .isflA {
        font-family: PingFangSC-Regular;
        font-size: 0.57931rem;
        color: #FFDC99;
        letter-spacing: 0;
        line-height: 0.57931rem;
        float: left;
        margin-top:0.82759rem;
    }
</style>