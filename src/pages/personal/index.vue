<template>
  <div class="personal ">
        <div class="commonNavBar positionFixed">
          <div class="backPassTitle"><p>个人中心</p></div>
          <div class="loginIcon arrowLeft flt individual" @click="$router.push({name:'announcement'});"><a href="javascript:void(0)"></a></div>
          <div class="loginIcon arrowRight " @click="loginService"><a href="javascript:void(0)"></a></div>
        </div>
        <div class="personalMian">
          <div class="personalMianTit">
            <div class="personalNews">
              <section class="one">
                <input v-if="!userInfo.is_test_player" id="fileInp" ref="picInpRef"  type="file" @change="picChange()"
                       class="inputFile"
                       accept="image/jpeg,image/png,image/bmp,image/gif">
                <div><img :src="headImg" alt=""></div>

              </section><div class="outerRing"></div>
              <section>
                <!--| {{_Util.formatPhone(result.phone || '')}}-->
                <p><span style="font-family: Arial;">{{result.username}}</span></p>
                <p>余额: <span class="cors" v-html="'￥' + (result.amount || '')"></span></p>
                <!--<p>积分: <span v-html="result.points || ''"></span></p>-->
              </section>
            </div>
            <div class="personalList">
              <section @click="toCash()">
                <a class="aisa" href="javascript:void(0)"><p>快捷提现</p></a>
              </section>
              <section>
                <router-link :to="{name: 'assetsDetail'}" >
                  <a class="aisa" href="javascript:void(0)"><p>资金明细</p></a>
                </router-link>
              </section>
            </div>
          </div>
          <div class="personalListNavMGer">
            <div class="personalListNavTC">
              <div class="personalListNav ">
                <!--<mt-loadmore-->
                    <!--ref="loadmore"-->
                    <!--:top-method="loadTop">-->
                  <ul class="personalListUl">
                    <li v-if="!userInfo.is_test_player"  @click="toPhoneManager()">
                      <a href="javascript:void(0)">
                        <p>手机号管理<i class="commonArrowsRight"></i> </p>
                      </a>
                    </li>
                    <li v-if="!userInfo.is_test_player">
                      <router-link :to="{name: 'loginPass'}">
                        <a href="javascript:void(0)">
                          <p>登录密码管理 <i class="commonArrowsRight"></i></p>
                        </a>
                      </router-link>
                    </li>
                    <li v-if="!userInfo.is_test_player"@click="toCashManager()">
                      <a href="javascript:void(0)">
                        <p>提现密码管理<i class="commonArrowsRight"></i></p>
                      </a>
                    </li>
                    <li v-if="!userInfo.is_test_player"  @click="cardManager()">
                      <a href="javascript:void(0)">
                        <p>银行卡管理<i class="commonArrowsRight"></i></p>
                      </a>
                    </li>
                    <li v-if="!userInfo.is_test_player" >
                      <router-link :to="{name: 'rebate'}">
                        <a href="javascript:void(0)">
                          <p>开户返佣<i class="commonArrowsRight"></i></p>
                        </a>
                      </router-link>
                    </li>
                    <li  v-if="!userInfo.is_test_player && showAgent === 1">
                      <router-link :to="{name: 'master'}">
                        <a href="javascript:void(0)">
                          <p>代理后台<i class="commonArrowsRight"></i></p>
                        </a>
                      </router-link>
                    </li>
                    <li class=" feedbackMessage" @click="saveTime">
                      <router-link :to="{name: 'feedBack'}">
                          <p>宝贵意见<i class="commonArrowsRight"></i></p>
                          <i class="isHasNews" v-if="isHasNews">new</i>
                      </router-link>
                    </li>
                    <li>
                      <router-link :to="{name: 'aboutUs'}">
                        <a href="javascript:void(0)">
                          <p>关于我们<i class="commonArrowsRight"></i></p>
                        </a>
                      </router-link>
                    </li>
                  </ul>
                  <div @click="loginOut()" class="loadMoreTC">
                    <a class="isbgco" href="javascript:void(0)">退出登录</a>
                  </div>
                <!--</mt-loadmore>-->
              </div>

            </div>
          </div>
        </div>
      <!--<HomeFoter></HomeFoter>-->
  </div>

</template>
<script type="text/babel">
  import '../../assets/scss/default.scss'
//  import '../../assets/scss/personal.scss';
  import HomeFooter from '../../components/HomeFooter'
  
  export default {
    data() {
      return {
        result: {},
        footerRouterName: {},
        busy: false,
        isHasNews:false,
        feedback_time:0,
	      headImg: require('../../assets/images/numberimg/tou.png'),
	      userInfo: this._Util.getStorage('userInfo', true),
	      showAgent:0
      }
    },
    
    mounted() {
      let that = this;
//    || == '/lottery/personal/index'
      console.log('that.$route.fullPath :',that.$route.fullPath );
      if (that.$route.query.homeIndex == 3 || that.$route.fullPath == '/lottery/personal/index' ) {
           that.init();
      }
//      that._Util.setCss('.windowSize',{"height": 1},"*");
      
      document.getElementsByClassName('personalListNav')[0].addEventListener('touchstart', function (event) {
        event.target.classList.add('needsclick');
      })
    },
    
    methods: {
      init() {
        let that = this;
        let nowtime = parseInt(localStorage.getItem("feedback_time")||0);
        console.log("sssss:",nowtime);
        if (that.busy) return;
        that.busy = true;
        that._Util.post(that, that._Api.POST_USER_INFO, {
          feedback_time: nowtime,
        }, (data) => {
          that.busy = false;
          if (data.userInfo) {
//		    data.userInfo.is_bind_bank_card = 0;
            that.result = data.userInfo;
            that.isHasNews = data.userInfo.is_show_feedback_icon;
            that.showAgent = data.userInfo.is_show_agent;
//			that.result.phone = '';
            that.headImg = data.userInfo.photo;
          }
        }, '', true);
      },
      saveTime(){
        localStorage.setItem("feedback_time",parseInt(Date.parse(new Date())/1000));
      },
      loadTop() {
        this.init();
        this.$refs.loadmore.onTopLoaded();
      },
      
      toPhoneManager() {
        this.$router.push({
          name: 'phoneManagement',
          query: {phone: this.result.phone, fullPath: this.$route.fullPath, type: 5}
        });
      },
      
      toCash() {
        let that = this;
        if (that.userInfo.is_test_player) {
	        that._Util.showAlert(that, {content: '试玩账号无法使用此功能'});
        	return;
        }

        if (!that.result.phone) {
          that._Util.showAlert(that, {content: '请绑定手机后设置支付密码'});
          that.$router.push({name: 'phoneManagement', query: {fullPath: that.$route.fullPath, type: 5}});
        } else {
          if (!that.result.is_bind_bank_card) {
            that.$router.push({name: 'addCard'});
          } else {
            if (!that.result.is_set_pay_pass) {
              this.$router.push({
                name: 'phoneManagement',
                query: {
                  nextRouteName: 'withdrawals',
                  phone: this.result.phone,
                  title: '提现密码',
                  type: 3
                }
              });
            } else {
              this.$router.push({name: 'cash'});
            }
          }
        }
      },
      
      toCashManager() {
        if (!this.result.phone) {
          this._Util.showAlert(this, {content: '请绑定手机后设置支付密码'});
          this.$router.push({name: 'phoneManagement', query: {fullPath: this.$route.fullPath}});
        } else {
          this.$router.push({
            name: 'phoneManagement',
            query: {
              nextRouteName: 'withdrawals',
              phone: this.result.phone,
              title: '提现密码',
              type: 3
            }
          })
        }
      },
      
      cardManager() {
        let that = this;
        
        if (!that.result.is_bind_bank_card) {
          that.$router.push({name: 'bankCard'});
        } else {
          that.$router.push({name: 'bankCard'});
        }
        
      },
      
      loginOut() {
        let that = this;
        that._Util.post(that, that._Api.POST_PERSONAL_LOGIN_OUT, {}, () => {
          that._Util.setLocalStorage('legouUser', '');
          that._Util.setStorage('isLogin', false, true);
          that.$router.replace({name: 'login'});
          localStorage.setItem('sectionLogin','')
        });
      },
      
      loginService() {
        let that = this;
        that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
          console.log(data);
          window.location.href = data.value;
        })
      },

	    picChange() {
		    let that = this;
		    let oFile = that.$refs.picInpRef.files[0];

		    console.log('size: ' + oFile.size / 1024);
		    if (oFile.size / 1024 > 2049) {
			    let oReader = new FileReader();
			    oReader.readAsDataURL(oFile);
			    oReader.onload = function (e) {
				    let _this = this;
				    let img = new Image();
				    img.src = _this.result;

				    if (img.complete) {
					    callback();
				    } else {
					    img.onload = callback;
				    }

				    function callback() {
					    let baseStr = that.compressPic(img, oFile.type);

					    let text = window.atob(baseStr.split(',')[1]);
					    let buffer = new Uint8Array(text.length);

					    for (let i = 0; i < text.length; i++) {
						    buffer[i] = text.charCodeAt(i);
					    }

					    let blob = that.getBlob([buffer], oFile.type);
					    console.log('compress size: ' + blob.size / 1024);
					    upload(blob);
				    }
			    };
		    } else {
			    upload(oFile);
		    }



		    function upload(photo) {
			    let frmData = new FormData();
			    frmData.append('photo', photo);
			      // frmData.append('bind_account', 1);
			    console.log(photo.size / 1024);
			    that._Util.openLoading(that);
			    $.ajax({
				    url: that._Api.POST_USER_HEAD_IMG,
				    type: 'post',
				    data: frmData,
				    dataType: 'json',
				    contentType: false,
				    processData: false,
				    success: function (data) {
					    that._Util.closeLoading(that);
					    console.log(data);
					    if (data.code === 0) {
						    that.headImg = data.data.photo;
						    that._Util.showAlert(that, {content: data.msg});
					    } else {
						    that._Util.showAlert(that, {content: data.msg});
					    }
				    },
				    error: function (XMLHttpRequest) {
					    that._Util.closeLoading(that);
					    console.log(XMLHttpRequest);
				    }
			    });
		    }
	    },

	    getBlob(buffer, format) {
		    try {
			    return new Blob(buffer, {type: format});
		    } catch (e) {
			    let bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
			    buffer.forEach(function(buf) {
				    bb.append(buf);
			    });
			    return bb.getBlob(format);
		    }
	    },

	    compressPic(img, fileType) {
		    let canvas = document.createElement("canvas");
		    let ctx = canvas.getContext('2d')

		    //    瓦片canvas
		    let tCanvas = document.createElement("canvas");
		    let tctx = tCanvas.getContext("2d");

		    let initSize = img.src.length;
		    let width = img.width;
		    let height = img.height;

		    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
		    let ratio;
		    if ((ratio = width * height / 5000000)>1) {
			    ratio = Math.sqrt(ratio);
			    width /= ratio;
			    height /= ratio;
		    }else {
			    ratio = 1;
		    }

		    canvas.width = width;
		    canvas.height = height;

//        铺底色
		    ctx.fillStyle = "#fff";
		    ctx.fillRect(0, 0, canvas.width, canvas.height);

		    //如果图片像素大于100万则使用瓦片绘制
		    let count;
		    if ((count = width * height / 1000000) > 1) {
			    count = ~~(Math.sqrt(count)+1); //计算要分成多少块瓦片

//            计算每块瓦片的宽和高
			    let nw = ~~(width / count);
			    let nh = ~~(height / count);

			    tCanvas.width = nw;
			    tCanvas.height = nh;

			    for (let i = 0; i < count; i++) {
				    for (let j = 0; j < count; j++) {
					    tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

					    ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
				    }
			    }
		    } else {
			    ctx.drawImage(img, 0, 0, width, height);
		    }

		    //进行最小压缩
		    let ndata = canvas.toDataURL('image/jpeg', 0.95);

		    console.log('压缩前：' + initSize / 1024);
		    console.log('压缩后：' + ndata.length / 1024);
		    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");

		    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

		    return ndata;
	    }
    },
    
    components: {
      HomeFoter: HomeFooter
    },
    
    watch: {
      '$route'() {
        if (this.$route.query.homeIndex == 3 || this.$route.fullPath == '/lottery/personal/index'  ) {
          this.init();
        }
      }
    }
  }
</script>

<style lang="scss">
  /*.personalTemp {*/
    /*height: 100%;*/
    /*background: url('../../assets/images/numberimg/Mask.png') center center no-repeat;*/
    /*background-size: cover;*/
  /*}*/
  /**/
  /*.personalMian {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*background: url('../../assets/images/numberimg/bancon.png') top center no-repeat;*/
  /*}*/
  /**/
  .loadMoreTC {
    margin-bottom: 2.5rem;
  }

  .inputFile {

	  width: 100%;

	  height: 100%;

	  cursor: pointer;

	  font-size: 30px;

	  outline: medium none;

	  position: absolute;

	  filter:alpha(opacity=0);

	  -moz-opacity:0;

	  opacity:0;

	  left:0px;

	  top: 0px;

  }
</style>