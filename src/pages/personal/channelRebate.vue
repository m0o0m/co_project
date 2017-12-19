<template>
  <div>
    <div class="per">
      <ul class="per_leftd">
        <li @click="$router.go(-1);"><a href="javascript: void(0);"></a></li>
        <li><p style="color:#FFDC99;margin-top:0rem;">开&nbsp;户&nbsp;返&nbsp;佣</p></li>
        <!-- <p class="subnav" style="color:#FFDC99;margin-top:0rem;"><span>直接开户</span> <span>分享开户</span></p>    -->
      </ul>
    </div>
    <div class="per_conter">
      <div id="subnav" style="color:#FFDC99;">
        <span @click="type = 0" :class="{on: type == 0}">直接开户</span>
        <span @click="type = 1" :class="{on: type == 1}">分享开户</span></div>
      <div v-if="!type">
        <div class="monum">
          <p>&nbsp;&nbsp;&nbsp;用户名</p>
          <p>
            <input type="text" v-model="user.username" placeholder="请输入6～12位数字或字母">
          </p>
        </div>
        <div class="monum">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密码</p>
          <p>
            <input type="text" v-model="user.password" placeholder="请输入6～12位数字或字母">
          </p>
        </div>
        <div class="monum">
          <p>确认密码</p>
          <p style=" position: relative;">
            <input type="text" v-model="passwordTemp" placeholder="请再次输入您的密码">
            <span style="float:right; color:#666;position: absolute; right:0.5rem;"></span>
          </p>
        </div>
        <div @click="save()" class="loginBtn">确定添加</div>
        
        <div v-if="result" class="explain">
          <p class="mo-p1">{{result.commision_info.title}}：</p>
          <p class="mo-p2">{{result.commision_info.content}}</p>
          <div class="divs">
                        <span class="jkl clas1">级别
                            <ul class="uis">
                                <li v-for="v in result.commision_level_list">{{v.level}}</li>
                            </ul>
                        </span>
            <span class="jkl clas2">用户注数
                                <ul class="uis">
                                    <li v-for="v in result.commision_level_list">{{v.min_bet_money}}-{{v.max_bet_money}}</li>
                                </ul>
                        </span>
            <span class="jkl clas3">佣金
                            <ul class="uis">
                                <li v-for="v in result.commision_level_list">{{v.rebate_money}}</li>
                            </ul>
                        </span>
          </div>
        
        </div>
      </div>
      
      
      <div v-show="type" class="open_tab">
        <ul class="share">
          <li>你分享的ID：<span>{{shareResult.share_code}}</span></li>
          <li>
            <img :src="shareResult.qrcode_pic" alt="">
          </li>
          <li><p>用户注册时填写此介绍人ID</p>
            <p>即可成为您的下线</p>
          </li>
        </ul>
        <div class="copy">
          <input id="codeUrl" type="text" v-model="shareResult.share_url">
          <p @click="copyUrl()" style="float: right;">复制</p>
        </div>
        <div class=" adopt">通过以上链接或扫二维码注册的用户</div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../assets/scss/personal.scss';
  import '../../assets/js/clipboard.min';
  
  export default {
    data() {
      return {
        result: '',
        shareResult: '',
        type: 0,
        passwordTemp: '',
        user: {
          username: '',
          password: ''
        }
      }
    },
    
    mounted() {
      this.init();
    },
    
    methods: {
      init() {
        let that = this;
        that._Util.post(that, that._Api.POST_PERSONAL_REBATE_LIST, {}, (data) => {
          that.result = data;
        });
        
        that._Util.post(that, that._Api.POST_PERSONAL_REBATE_SHARE, {}, (data) => {
          that.shareResult = data;
        });
      },
      
      save() {
        let that = this;
        let reg = /^[0-9a-zA-z]{6,12}$/;
        
        if (!that.user.username) {
          that._Util.showAlert(that, {content: '用户名不能为空'});
          return;
        }
        
        if (!reg.test(that.user.username)) {
          that._Util.showAlert(that, {content: '[用户名]请输入6～12位数字及字母'});
          return;
        }
        
        if (!that.user.password) {
          that._Util.showAlert(that, {content: '密码不能为空'});
          return;
        }
        
        if (!reg.test(that.user.password)) {
          that._Util.showAlert(that, {content: '[密码]请输入6～12位数字及字母'});
          return;
        }
        
        if (that.user.password !== that.passwordTemp) {
          that._Util.showAlert(that, {content: '输入的密码不一致'});
          return;
        }
        that._Util.post(that, that._Api.POST_REGISTER, that.user, (data) => {
          that.$router.replace({path: '/home?homeIndex=3'});
        });
        
      },
      
      copyUrl() {
        let Url2 = document.getElementById("codeUrl");
        Url2.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        this._Util.showAlert(this, {content: '复制成功'});
      }
    }
  }
</script>

<style lang='scss'>
</style>
