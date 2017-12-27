<template>
  <div class="loginPassManagement">
    <div class="commonNavBar positionFixed">
      <div class="backPassTitle"><p>登陆密码管理</p></div>
      <div class="loginIcon arrowLeft flt" @click="$router.go(-1)"><a href="javascript:void(0)"></a></div>
    </div>
    <div class="loginPassManageContent" id="bgg">
      <div class="loginLi displayFlex">
        <p>原密码</p>
        <p>
          <input type="password" v-model="old_password" placeholder="请输入6～12位数字或字母" maxlength="12">
        </p>
      </div>
      <div class="loginLi displayFlex">
        <p>设置密码</p>
        <p>
          <input type="password" v-model="password" placeholder="请输入6～12位数字或字母" maxlength="12">
        </p>
      </div>
      <div class="loginLi displayFlex">
        <p>确认密码</p>
        <p>
          <input type="password" v-model="password1" placeholder="请再次输入您的密码" maxlength="12">
        </p>
      </div>
      <div @click="save()" class="loginHostBtn confirmBtn completeBtn"><a href="javascript:void(0);">完成</a></div>
    </div>
  </div>
</template>
<script>
//  import '../../assets/scss/personal.scss';
  
  export default {
    data() {
      return {
        old_password: '',
        password: '',
        password1: ''
      }
    },
    
    mounted() {
      this._Util.setCss('.managMementCls',{"height": 1},"*");
    },
    
    methods: {
      init() {
      
      },
      save() {
        let that = this;
        let reg = /^[0-9a-zA-z]{6,12}$/;
        if (!reg.test(that.old_password) || !reg.test(that.old_password)) {
          that._Util.showAlert(that, {content: '[密码]请输入6～12位数字及字母'});
          return;
        }
        if (!that.old_password) {
          that._Util.showAlert(that, {content: '原密码不能为空'});
          return;
        }
        if (!that.password || !that.password1) {
          that._Util.showAlert(that, {content: '新密码不能为空'});
          return;
        }
        if (that.password !== that.password1) {
          that._Util.showAlert(that, {content: '两次输入的密码不一致'});
          return;
        }
        that._Util.post(that, that._Api.POST_USER_UPD_PWD, {
          old_password: that._Util.hexMd5(that.old_password),
          password: that._Util.hexMd5(that.password)
        }, (data, dataObj) => {
          if (dataObj.code === 0) {
            //alert(dataObj.msg);
            that._Util.showAlert(that, {content: dataObj.msg}, () => {
              that.$router.replace({path: '/home?homeIndex=3'});
            });
//		    that.$router.replace({name: 'personal'});
          }
        });
      }
    }
  }
</script>

<style lang='scss'>
</style>
