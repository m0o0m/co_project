<template>
    <div class="loginLi displayFlex" :class="{'withdrawPassword':$route.query.type == 3||$route.query.type == 5}">
        <p>验证码</p>
        <p>
            <input type="text" v-model="code" placeholder="请输入6位短信验证码">
            <span @click="getCode()" class="verificationCode" >{{newEntityText}}</span>
        </p>
    </div>
</template>
<script type="text/babel">
  export default {
    props: {
      phone: {default: ''}
    },

	data() {
	  return {
		code: '',
		timeOut: 60,
		smsFlag: false,
		newEntityText: '获取验证码'
	  }
	},

	mounted() {
	  let that = this;
	  that.init();
	},

	methods: {
	  init() {

	  },

      getCode() {
	    let that = this;
		if (that.smsFlag) return;

	    if (!that.phone) {
	      that._Util.showAlert(that, {content: '请输入手机号'});
	      return;
        }

	    that.smsFlag = true;
        that._Util.post(that, that._Api.POST_COMMON_GET_CAPTCHA, {
		  phone: that.phone,
          type: that.$route.query.type
        }, (data) => {
          that._Util.showAlert(that, {content: '验证码已发送'});
		  let time = setInterval(function () {
			if (that.timeOut === 1) {
			  that.newEntityText = '发送验证码';
			  that.timeOut = 60;
			  that.smsFlag = false;
			  clearInterval(time);
			} else {
              that.newEntityText = (that.timeOut--) + 's后获取';
			}
		  }, 1000);
		});

      }

	},


	components: {}
  }
</script>
