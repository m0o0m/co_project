<template>
  <div v-if="isShow" class="lotterySelect positionFixed">
    <article class="lotteryArticle indexJust">
      <section>
        <img src="../assets/images/del.png" class="lotteryClose" @click="resultHidden"/>
        <aside>全部彩种</aside>
        <ul>
          <li v-for="(result,index) in resultList" @click="resultClcik(index)" class="boxSizing" :class="{'on': index === resultIndex}"><a href="javascript:void(0)">{{result.name}}</a>
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>
<script type="text/babel">

	export default {
		data() {
			return {
				resultList: [],
				isShow: true,
				resultIndex: -1
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
