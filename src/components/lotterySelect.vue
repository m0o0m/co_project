<template>
    <div id="imgs" v-if="isShow" class="lotterySelect">
        <article class="imgs_article indexJust">
            <section>
                <p class="close" style="background: none;"><span><img src="../assets/images/del.png" @click="resultHidden"/></span></p>
                <p>全部彩种</p>
                <ul>
                    <li v-for="(result,index) in resultList" @click="resultClcik(index)"><a href="javascript:void(0)">{{result.name}}</a>
                    </li>
                </ul>
            </section>
        </article>
    </div>
</template>
<script type="text/babel">
  import '../assets/scss/lotterySelect.scss';

  export default {
	data() {
	  return {
		resultList: [],
		isShow: true
	  }
	},

	mounted() {
	  let that = this;
	  that.initData();
	},

	methods: {
	  initData() {
		let that = this;
		that._Util.post(that, that._Api.POST_COLOR_LIST, {}, (data) => {
		  //传统彩票
		  var traditional_lottery = data.lottery_list.lottery_play,
			  traditional_chess = data.lottery_list.chess_play,
			  traditional_len = traditional_lottery.length,
			  traditional_chessLen = traditional_chess.length,
			  traditional_str = "",
			  traditional_name = "";
		  for (var i = 0; i < traditional_len; i++) {
			traditional_str = {id: traditional_lottery[i].id, name: traditional_lottery[i].name, hrf: 'betRecord'}
			that.resultList.push(traditional_str);
		  }
		  for (var i = 0; i < traditional_chessLen; i++) {
			traditional_str = {id: traditional_chess[i].id, name: traditional_chess[i].name, hrf: 'betRecord'}
			that.resultList.push(traditional_str);
		  }
		});
	  },
	  resultClcik(index) {
		this.$router.push({
		  name: this.resultList[index].hrf,
		  query: {'id': this.resultList[index].id, 'nam': this.resultList[index].name}
		});

		if (this.$route.name === 'betRecord') {
		  this.$emit('changeLottery');
		  this.resultHidden();
		}
	  },
	  resultHidden() {
		this.$emit('bettingHidden');
	  }

	},
	components: {}
  }
</script>
