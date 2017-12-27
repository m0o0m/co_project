<template>
  <div class="loginIndex">
    <div class="loginPad">
      <div class="commonNavBar positionFixed">
        <div class="loginTitle"><p><img :src='loginTitle'/></p></div>
        <div class="loginIcon arrowLeft" @click="_Util.back($router)"><a href="javascript:void(0)"></a></div>
        <div class="loginIcon arrowRight"  @click="loginService"><a href="javascript:void(0)"></a></div>
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
              <input v-model="user.password" type="password" placeholder="请输入6～12位数字或字母" onkeyup="value=value.replace(/[\W]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" maxlength="12"/>
            </p>
          </li>
          <li class="loginLi displayFlex">
            <p>确认密码</p>
            <p>
              <input v-model="user.password2" type="password" placeholder="请再次输入密码" onkeyup="value=value.replace(/[\W]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" maxlength="12"/>
            </p>
          </li>
        </ul>
      </div>
      <div class="agreementRegister">
        <p>
          <i class="on">✓</i>我同意<a href="javascript: void(0)" @click="showXy = true">《棋牌彩票平台用户协议》</a>所述
        </p>
      </div>
      <div class="loginHostBtn" @click="immediateRegistration()"><a href="javascript:void(0)">立即注册</a></div>
      <!--v-show="showXy"-->
      <div class="agreement" v-show="showXy">
        <div class="agreementTitle">用户协议</div>
        <!--<div class="agrArrow"></div>-->
        <div class="agreementContent">
          <div class="agreementLogin">
            <p class="agrTitle">用户隐私权保护和个人信息利用政策</p>
            <p class="agrtime">2017-08-08 13:23:15</p>
            <p>1.使用本公司APP的客户，请留意你所在的国家或居住地的相关法律规定，如有疑问应就相关问题，寻求当地法律意见。</p>
            <p>2.若发生遭骇客入侵破坏行为或不可抗拒之灾害导致APP故障或资料损坏、资料丢失等情况，我们将以本公司之后备资料為最后处理依据；为确保各方利益，请各会员投注后列印资料。本平台不会接受没有列印资料的投诉。</p>
            <p>3.为避免纠纷，各会员在投注之后，务必进入下注状况检查及列印资料。若发现任何异常，请立即与代理商联系查证，一切投注将以本公司资料库的资料为准，不得异议。如出现特殊网络情况或线路不稳定导致不能下注或下注失败。本公司概不负责。</p>
            <p>4.单一注单最高派彩上限为一百万。</p>
            <p>5.开奖结果以官方公布的结果为准。</p>
            <p>6.我们将竭力提供准确而可靠的开奖统计等资料，但并不保证资料绝对无误，统计资料只供参考，并非是对客户行为的指引，本平台也不接受关于统计数据产生错误而引起的相关投诉。</p>
            <p>7.本平台拥有一切判决及注消任何涉嫌以非正常方式下注之权利，在进行更深入调查期间将停止发放与其有关之任何彩金。客户有责任确保自己的帐户及密码保密，如果客户怀疑自己的资料被盗用，应立即通知本公司，并须更改其个人详细资料。所有被盗用帐号之损失将由客户自行负责。在某种特殊情况下，客人之信用额可能会出现透支。 </p>
            <p>我了解以及同意下注列明的协定和规则。　</p>
            <p>棋牌彩票</p>
            <div class="loginHostBtn loginHostBtn" @click="showXy = false"><a href="javascript:void(0)">确定</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	import '../../assets/scss/login/login.scss';
  export default {
    data() {
      return {
        user: {
          username: '',
          password: '',
          password2: '',
          proxy_code: ''
        },
        showXy: false,
        istrues: true,
        referrerFlag: JSON.parse(JSON.stringify(sessionStorage.getItem('openAccountCode') || '')),
	      loginTitle: require('../../assets/images/login/logo.png')
      }
    },
    mounted() {
      this.user.proxy_code = !sessionStorage.getItem('openAccountCode') || sessionStorage.getItem('openAccountCode') == 'undefined' ? '' : sessionStorage.getItem('openAccountCode');
    },
    methods: {
      immediateRegistration() {
        let that = this;
        let reg = /^[^\u4e00-\u9fa5]{0,}$/;
        if (that.user.username == "" || that.user.password == "" || that.user.password2 == "") {
          that._Util.showAlert(that, {content: '账号密码不能为空'});
          return;
        }
        
        if (!reg.test(that.user.username)) {
          that._Util.showAlert(that, {content: '用户名不能包含中文'});
          return;
        }
        
        if (that.user.password !== that.user.password2) {
          that._Util.showAlert(that, {content: '两次输入密码不相同'});
          return;
        }
        
        if (that.istrues != true) {
          that._Util.showAlert(that, {content: '请同意协议内容'});
          return;
        }
        
        let params = {
          username: that.user.username,
          password: that._Util.hexMd5(that.user.password),
          password2: that._Util.hexMd5(that.user.password2)
        };

//        if (sessionStorage.getItem('openAccountCode')) {
//          params.proxy_code = sessionStorage.getItem('openAccountCode');
//        }else {
//          params.proxy_code = "";
//        }
        if (that.user.proxy_code) {
          params.proxy_code = that.user.proxy_code;
        }
        
        that._Util.post(that, that._Api.POST_REGISTER, params, (data) => {
          sessionStorage.setItem('openAccountCode', '');
          that._Util.setStorage('isLogin', true, true);
          that.$router.replace({name: 'home'});
        });
      },
      istrue() {
        let that = this;
        if (that.istrues == true) {
          that.istrues = false;
        } else {
          that.istrues = true;
        }
      },
	    loginService() {
		    let that = this;
		    that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
			    window.location.href = data.value;
		    })
	    }
    }
  }
</script>

<style>


</style>