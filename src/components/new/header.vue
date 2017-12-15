<template>
    <div>
        <div>
            <header class="desk-header">
                <a href="#" class="desk-header-back">&lt;</a>
                <a href="#" class="desk-header-tips">规则</a>
                <h2>俄罗斯大转盘</h2>
                <img src="../../assets/images/turnTable/top.png" alt="" title=""/>
                <aside class="desk-header-info">
                    <div class="desk-header-img">
                        <img src="../../assets/images/turnTable/img.png" alt="" title=""/>
                    </div>
                    <span>已投 ￥</span>
                    <strong>{{totalMoney}}</strong>
                </aside>
                <aside class="desk-header-right">
                    <span>{{classAdata.action_no}}期开奖结果</span>
                    <p><em v-for="action in classAdata.action_data">{{action}}</em></p>
                </aside>
            </header>
        </div>

        <div class="desk-time">
            距第{{classAdata.next_action_no}}期截止：<time>{{countDownStr}}</time>
        </div>

    </div>
</template>
<script type="text/babel">
  export default {
	props : {
	  classAdata: { default: '' },
	  icon: { default: '' },
	  totalMoney: { default: 0 },
	  countDownStr: {default: '00:00:00'},
	  creditId: { default: 1 }
	},

	data() {
	  return {
		title: '',
		HeaderData : [],//Head数据
		delImg: require('../../assets/images/iconbtn2x.png'),
		numIndex: 0,
		navData: [
		  //  {name:"特码",numTrue: false},
		  //  {name:"双面",numTrue: false}
		],
		navId: 0,//一级id
		PopupupID: 0,//彩种框
		defalen: 0,
		ZodiacIcon: '',
		diceData: []
	  }
	},

	computed : {
	  deafNum : function() {
		if( typeof(this.classAdata) === 'string' || typeof(this.classAdata.played) === 'undefined' ) {
		  return '玩法';
		}else{
		  return this.classAdata.played[this.navId];
		}
	  }
	},

	mounted() {
	  this.initData();
	  this.deafNumFirst();
	},

	methods: {
	  deafNumFirst : function() {
		if( !this.classAdata || (this.classAdata.played && !this.classAdata.played.length) ) {
		  return ''
		}else{
		  this.navData = [];
		  this.defalen = this.classAdata.played.length;
		  for( var i = 0; i < this.defalen; i++ ) {
			let defaData = this.classAdata.played[i].name;
			let defaJson = {name:defaData,numTrue: false};
			this.navData.push(defaJson);
		  }
		}
	  },

	  //初始化
	  initData: function() {
		this.navId = 0;
		this.PopupupID = 0;
	  },

	  lottery_nameClick: function() {
		this.PopupupID = 1;
	  },

	  delHidden: function() {
		this.PopupupID = 0;
	  },

	  eventOpt: function(index) {
		this.numIndex = index;
		this.navId = index;
		this.PopupupID = 0;
		this.$emit('menuClicked',{navOneID:this.navId});
	  }

	},

	watch : {
	  'classAdata' (newData) {
		this.deafNumFirst();
	  }
	},

	components: {}
  }
</script>
