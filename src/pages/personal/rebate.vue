<template>
  <div class="rebate">
    <div class="commonNavBar positionFixed">
      <div class="backPassTitle"><p>开户返佣</p></div>
      <div class="loginIcon arrowLeft flt" @click="$router.go(-1)"><a href="javascript:void(0)"></a></div>
    </div>
    <div class="rebateContent">
      <div class="perRebate adds">
        <div class="perRebateSubnav">
          <div id="subnav" class="clearfix">
            <span @click="type = 0" :class="{on: type == 0}">直接开户</span>
            <span @click="type = 1" :class="{on: type == 1}">分享开户</span>
          </div>
        </div>
       
        <div v-if="!type" class="rebateUser">
          <div>
            <div class="loginLi displayFlex">
              <p>用户名</p>
              <p>
                <input type="text" v-model="user.username" placeholder="请输入6～12位数字或字母">
              </p>
            </div>
            <div class="loginLi displayFlex">
              <p>密码</p>
              <p>
                <input type="password" v-model="user.password" placeholder="请输入6～12位数字或字母">
              </p>
            </div>
            <div class="loginLi displayFlex">
              <p>确认密码</p>
              <p>
                <input type="password" v-model="passwordTemp" placeholder="请再次输入您的密码">
                <!--确认密码右侧的小叉<span style="float:right; color:#666;position: absolute; right:0.5rem;"></span>-->
              </p>
            </div>
            <div @click="save()" class="loginHostBtn confirmBtn"><a href="javascript:void(0);">确定</a></div>
            <div v-if="result" class="explain">
              <p class="mo-p1">{{result.commision_info.title}}：</p>
              <p class="mo-p2">{{result.commision_info.content}}</p>
              <div class="divs svid clearfix">
                <span class="jkl clas1">级别
                  <ul class="uis">
                    <li v-for="v in result.commision_level_list">{{v.level}}</li>
                  </ul>
                </span>
                <span class="jkl clas2">当月盈亏
                    <ul class="uis">
                      <li v-for="v in result.commision_level_list">{{v.min_bet_money}}-{{v.max_bet_money}}</li>
                    </ul>
                  </span>
                <span class="jkl clas3">返佣比例
                    <ul class="uis">
                      <li v-for="v in result.commision_level_list">{{v.rebate_money}}%</li>
                    </ul>
                  </span>
              </div>
        
            </div>
          </div>
        </div>
        <div v-show="type" class="rebateOpenTab">
          <ul class="share">
            <li>你分享的ID：<span>{{shareResult.share_code}}</span></li>
            <li class="lis2">
              <img :src="shareResult.qrcode_pic" alt="">
            </li>
            <li><p>用户注册时填写此介绍人ID</p>
              <p>即可成为您的下线</p>
            </li>
          </ul>
          <div class="copy">
            <!-- <input id="codeUrl" type="text" v-model="shareResult.share_url"> -->
            <span id="codeUrls" class="one-txt-cut">{{shareResult.share_url}}</span>
            <p @click="copyUrl( 'codeUrls' )" class="copy_btns" id="copy_btns" data-clipboard-action="copy"
               data-clipboard-target="#codeUrls">复制</p>
          </div>
          <div class=" adopt">通过以上链接或扫二维码注册的用户</div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
  //  import '../../assets/scss/personal.scss';
  import MD5 from '../../assets/js/ciphertext';
  
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
        },
        fullHeight: window.screen.availHeight + "px",
      }
    },
    mounted() {
      this.init();
      window.addEventListener('resize', this.handleResize);
//      this._Util.setCss('.rebateContent',{"height": 1},"*");
//      this._Util.setCss('.perRebate',{"height": 1},"*");
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
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
      
      handleResize(event) {
        this.fullHeight = window.screen.availHeight + "px";
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
        that._Util.post(that, that._Api.POST_REGISTER, {
          username: that.user.username,
          password: that._Util.hexMd5(that.user.password)
        }, (data) => {
          that._Util.showAlert(that, {content: '添加成功'});
          
          that.passwordTemp = '';
          that.user.username = '';
          that.user.password = '';
          
          //that.$router.replace({name: 'personal'});
        });
        
      },
      
      copyUrl(id) {
        let co = require('../../assets/js/clipboard.min')
        var targetText = $('#' + id + '').text();
        var clipboard = new co('.copy_btns');
        console.log(clipboard)
        clipboard.on('success', function (e) {
          console.info('Action:', e.action);
          console.info('Text:', e.text);
          console.info('Trigger:', e.trigger);
          e.clearSelection();
        });
        this._Util.showAlert(this, {content: '复制成功'});
      }
    }
  }
</script>

<style lang='scss'>
</style>
