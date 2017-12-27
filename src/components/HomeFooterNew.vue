<template>
    <div class="FooterCls">
        <nav>
            <li v-for="(foter,index) in FoterData" :class="{'on':foterNum == index}" @click="navFunction(index)">
                <!--<router-link :to="{name:foter.rel}">-->
                <a href="javascript:void(0)">
                    <section>
                        <p></p>
                        <p>{{foter.name}}</p>
                    </section>
                </a>
                <!--</router-link>-->
            </li>
            <li>
                <!--<router-link :to="{name:TopData}">-->
                    <img :src="foterWater" @click="topUpFooter"/>
                <!--</router-link>-->
            </li>
        </nav>
    </div>
</template>

<script>
  export default {
    props: {
      homeIndex: {
        default() {
          return 0;
        }
      }
    },
	data() {
	  return {
		FoterData: [
		  {name: '首页', rel: 'home'},
		  {name: '开奖信息', rel: 'theLottery'},
		  {name: '投注记录', rel: 'betting'},
		  {name: '我的', rel: 'personal'}
		],
		TopData: 'addMoney',
		foterNum: 0,
		foterWater: require('../assets/images/index/footerColor04.png'),
		relidentifying: ''
	  }
	},
	mounted() {

		if (this.$route.query.code) {
			sessionStorage.setItem('openAccountCode', this.$route.query.code);
		}

      if (this.$route.query.homeIndex) {
        this.foterNum = parseInt(this.$route.query.homeIndex);
      } else {
        this.relidentifying = this.$route.name;
        if (this.relidentifying == 'theLottery') {
          this.foterNum = 1;
        } else if (this.relidentifying == 'betting') {
          this.foterNum = 2;
        } else if (this.relidentifying == 'personal') {
          this.foterNum = 3;
        } else {
          this.foterNum = 0;
        }
      }

      this.getUser();
	},
	methods: {
      getUser() {
        let that = this;
        that._Util.setStorage('isLogin', !!false, true);
        that._Util.post(that, that._Api.POST_USER_WAVE, {}, (data) => {
        	console.log(data);
	        that._Util.setStorage('userInfo', data || {}, true);
          that._Util.setStorage('isLogin', !!data, true);
        }, '', true, true);
      },


	  navFunction(index) {
	    let that = this;
	    if (index === 2 || index === 3) {
	      let isLogin = that._Util.getStorage('isLogin', true);
	      if (isLogin === 'true') {
            this.foterNum = index;
            that.$emit('update:homeIndex', index);
            that.$router.replace({query: {homeIndex: index, code: this.$route.query.code}});
          } else {
	        that._Util.showAlert(that, {content: '请登录'}, () => {
	        	let url = '/home?homeIndex=' + that.foterNum;
	        	if (this.$route.query.code) {
			        url += '&code=' + this.$route.query.code;
		        }
              that.$router.push({name: 'login', query: {fullPath: url}});
            });
          }
        } else {
          this.foterNum = index;
          that.$emit('update:homeIndex', index);
          that.$router.replace({query: {homeIndex: index, code: this.$route.query.code}});
        }

	    return;


		let url = '';
		switch (index) {
		  case 0:
			url = 'home';
			break;
		  case 1:
			url = 'theLottery';
			break;
		  case 2:
			url = 'betting';
			break;
		  case 3:
			url = 'personal';
			break;
		}

		let localHost = window.location.host;

		if (localHost.indexOf('localhost') !== -1 || localHost.indexOf('192') !== -1) {
		  if (index === 2 || index === 3) {
            that._Util.post(that, that._Api.POST_USER_WAVE, {}, () => {
	            that._Util.setStorage('userInfo', data, true);
              that.$router.push({'name': url});
            }, '', true);
          } else {
            that.$router.push({'name': url});
          }
		} else {
		  let legouUser = this._Util.getLocalStorage('legouUser');
//		  if (!legouUser && (index === 2 || index === 3)) {
		  if (index === 2 || index === 3) {
            that._Util.post(that, that._Api.POST_USER_WAVE, {}, () => {
	            that._Util.setStorage('userInfo', data, true);
              that.$router.push({'name': url});
            }, '', true);
		  } else {
			//window.location.href = url;
              this.$router.push({'name': url});
		  }
        }
      },
      topUpFooter(){
        let that = this;
        let isLogin = that._Util.getStorage('isLogin', true);

        if (isLogin === 'true') {
	        if (that._Util.getUserInfo().is_test_player) {
		        that._Util.showAlert(that, {content: '试玩账号无法使用此功能'});
		        return;
	        }

          that.$router.push({name:"addMoney"})
        } else {
          that._Util.showAlert(that, {content: '请登录'}, () => {
	          let url = '/home?homeIndex=' + that.foterNum;
	          if (this.$route.query.code) {
		          url += '&code=' + this.$route.query.code;
	          }
	          that.$router.push({name: 'login', query: {fullPath: url}});
          });
        }
      }
	}
  }
</script>