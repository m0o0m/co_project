<template>
    <div class="FooterCls positionFixed">
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
	data() {
	  return {
		FoterData: [
		  {name: '首页', rel: 'index'},
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
	},
	methods: {
	  navFunction(index) {
		this.foterNum = index;
		let url = '';
		let that = this;
		switch (index) {
		  case 0:
			url = 'index';
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
            that._Util.post(that, that._Api.POST_USER_WAVE, {}, (data) => {
                //that.balanceMarry = data.userInfo.amount;
                that.$router.push({name:"addMoney"})
            }, '', true)
      }
	}
  }
</script>