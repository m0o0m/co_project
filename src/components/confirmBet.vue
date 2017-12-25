<template>
  <div class="confirmPage positionFixed" v-show="bankId">
    <div class="confirmPageBack positionFixed">
      <article class="confirmTitle">
        <section @click="sectionClick" class="lotteryArrowsLeft"></section>
        <section>{{titleText}}</section>
      </article>
      <div v-if="!$parent.stopBet" class="DeliveryTime">
        距第<span>{{nextNoisser}}</span>期投注截止：
        <time>{{countDownStr}}</time>
      </div>
      <div v-else-if="$parent.stopBet" class="DeliveryTime">
        封盘时间：
        <time>{{countDownStr}}</time>
      </div>
    </div>
    <!--
    :class="{'confirmClsxG':creditId == 3,
                'confirmCls_cqssc': creditId == 6,
                'confirmydzjhCls': creditId == 12 || creditId == 16 || creditId == 23 || creditId == 24,
                'confirmymnsh': creditId == 12 || creditId == 17,
                'confirmEls': creditId == 13,
                'confirmJzd': creditId == 14,
                'confirmMnh': creditId == 15,
                'confirmpknnCls': creditId == 18,
                'confirmyhjebg': creditId == 20,
                'confirmSyzbCls': creditId == 22,
                'bg_jsks_confirmCls': creditId == 4,
                'confirmCls_bjpk10': creditId == 5,
               }"
    -->
    <div class="confirmBetCls">
      <div class="confirmBetClsMain">
        <div>
          <div class="confirmClsTop"></div>
          <div class="confirmBetClsBreak">
            <div class="confirmsTitle displayFlex">
              <p v-for="confirmT in confirmTitles">{{confirmT}}</p>
              <p></p>
            </div>
            <div class="confirmListed">
              <ul>
                <li v-for="(order,index) in orders" class="displayFlex">
                  <p><span class="spanArial">{{order.colorfulName}}:{{order.data}}</span></p>
                  <p><span class="spanArial">{{order.odds}}</span></p>
                  <p><span class="spanArial">¥{{order.multiple}}</span></p>
                  <p><a href="javascript:void(0)" @click="deleteOrder(index)"><img :src="iconDel"/></a></p>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="confirmFromDiv positionFixed">
      <article class="confirmFormArt displayFlex">
        <section @click="displayVisible"><a href="javascript:void(0)">清空</a></section>
        <section>
          <p>共<span>{{totalStakeNum}}</span>注</p>
          <p><span>{{totalPrice}}</span>元</p>
        </section>
        <section @click="placeOrder"><a href="javascript:void(0)">确定投注</a></section>
      </article>
    </div>
  </div>
</template>

<script type="text/babel">
	//  import OpenFrame from './openFrame.vue'

	export default {
		name: "confirmPage",
		props: {
			countDownStr: {default: ''},
			nextNoisser: {default: ''},
			classAdata: {default: ''},
			creditId: {default: ''}
		},
		data() {
			return {
				title: "PC蛋蛋",
				confirmTitles: ["玩法", "赔率", "金额"],
				confirmLists: [
					{num: "4-1", odds: "24.666", marry: "1100"},
					{num: "2-3", odds: "24.666", marry: "1100"},
					{num: "2", odds: "24.666", marry: "1100"},
					{num: "3-4", odds: "24.666", marry: "1100"},
					{num: "4", odds: "24.666", marry: "1100"},
					{num: "2-1", odds: "24.666", marry: "1100"},
				],
				emptyIcon: require('../assets/images/emptyIcon.png'),
				bankId: false,
				orders: [
          // {
	         //  colorfulName: '俄羅斯輪盤',
	         //  data: 1,
           //  odds: 0.2568,
	         //  multiple: 1000
          // },
					// {
					// 	colorfulName: '俄羅斯輪盤',
					// 	data: 1,
					// 	odds: 0.2568,
					// 	multiple: 1000
					// },
					// {
					// 	colorfulName: '俄羅斯輪盤',
					// 	data: 1,
					// 	odds: 0.2568,
					// 	multiple: 1000
					// },
					// {
					// 	colorfulName: '俄羅斯輪盤',
					// 	data: 1,
					// 	odds: 0.2568,
					// 	multiple: 1000
					// },
					// {
					// 	colorfulName: '俄羅斯輪盤',
					// 	data: 1,
					// 	odds: 0.2568,
					// 	multiple: 1000
					// },
					// {
					// 	colorfulName: '俄羅斯輪盤',
					// 	data: 1,
					// 	odds: 0.2568,
					// 	multiple: 1000
					// }
        ],
				comfirmPageId: 0,
				dataComID: 0,
				showOpenFrame: false,

			}
		},
		computed: {
			totalStakeNum: function () {
				var count = 0
				for (var i = 0; i < this.orders.length; i++) {
					count += parseInt(this.orders[i].num)
				}
				return count
			},
			//计算总价格
			totalPrice: function () {
				var price = 0
				for (var i = 0; i < this.orders.length; i++) {
					if ('multiple' in this.orders[i]) { // 信用玩法
						price += parseFloat(this.orders[i].multiple)
					}
				}
				return price.toFixed(2)
			},
			//del图标转换
			iconDel: function () {
				if (this.creditId == 3) {
					this.emptyIcon = require('../assets/images/X@3x.png');
				}
				return this.emptyIcon
			},
			//titile
			titleText: function () {
				this.title = this.classAdata.lottery_name;
				return this.title
			}
		},
		mounted() {
			// this._Util.setCss('.confirmListed',{"height": 0.78},"*");
		},
		methods: {
			init() {
				this.bankId = false;
				this.orders = [];
				this.comfirmPageId = 0;
			},

			sectionClick: function () {
				if (!this.bankId) {
					return;
				}
//        this.orders = [];
				this.$emit('saveOrderSuccess')
				this.bankId = false;
				//this.$parent.$refs.headerRef.totalMoney = this.totalPrice;
				let thisParentHeader = this.$parent.$refs.headerRef;
				thisParentHeader.balanceAmount = (parseFloat(thisParentHeader.headerMarry) - parseFloat(this.$parent.$refs.confirmPageRef.totalPrice)).toFixed(2);
				console.log('thisParentHeader.balanceAmount', thisParentHeader.balanceAmount)
			},
			onBackBtnClicked: function () {
				this.$emit('backFromConfirmPage', '')
			},
			arrEmpartyData: function () {
				this.$emit('menuEmatyVisible', '')
			},
			gameIdEmit: function (gamid) {
				//return gamid
				this.comfirmPageId = gamid;
			},
			placeOrder: function () {
				let that = this;

				let url = location.href;
				sessionStorage.setItem('historyurl', JSON.stringify({'url': url, "status": 1}));

				if (this.$parent.stopBet) {
					this._Util.showAlert(this, {content: '已封盘'});
					return;
				}
				if (this._LotteryUtil.lotteryCheckCount(this, this.orders, true)) return;


				if (that._Util.getUserInfo().is_test_player && this._Util.isLogin() && parseInt(that.$parent.$refs.pcddref.selectedAmount) > that.$parent.$refs.pcddref.dynamicBalance) {
					that._Util.showAlert(that, {content: '余额不足，请注册正式账号进行游戏'}, () => {
						that.$router.push({name: 'register'});
						return;

						that.$parent.$refs.headerRef.toUrl = that._Api.LOCAL_HOST + 'lottery/login/register';
						that.$parent.$refs.headerRef.showOpenFrame = true;
						that.$parent.$refs.headerRef.showFrmBack = false;
					});
					return;
				}

				var orderData = {
					id: this.creditId,
					no: this.nextNoisser,
					total_num: this.totalStakeNum,
					total_amount: this.totalPrice,
					item: this.orders
				};
				that._Util.post(that, that._Api.POST_COLOR_SUBMINT, orderData, (data) => {
					that._Util.showAlert(that, {content: '投注成功'});
					that.$parent.$refs.headerRef.balanceAmount = data.amount;
					that.$parent.$refs.headerRef.retainData = that.totalPrice;
					let parentMarry = that.$parent.$refs.headerRef.headerMarry;
					that.$parent.$refs.headerRef.headerMarry = (parentMarry - parseFloat(that.totalPrice)).toFixed(2);
					console.log('that.$parent.$refs.headerRef.headerMarry', that.$parent.$refs.headerRef.headerMarry)
					setTimeout(function () {
						that._LotteryUtil.setHistoryBetMoney(that, that.creditId, that.nextNoisser, that.totalPrice);
						that.init();
						that.$parent.$refs.headerRef.balanceHods();
						that.$emit('saveOrderSuccess');
					}, 1500);
				}, (data) => {
					console.log(data);
					if (parseInt(data.code) === 10002) {
						that._Util.showConfirm(that, {content: data.msg}, (action) => {
							if (action) {
								that.$router.push({name: 'addMoney'});
							}
						});
					} else if (parseInt(data.code) === -1) {
						that._Util.showAlert(that, {content: data.msg});
					} else {
						that._Util.showAlert(that, {content: '请登录'});
						that.$parent.$refs.headerRef.toUrl = that._Api.LOCAL_HOST + 'lottery/login?name=' + that.$route.fullPath;
						that.$parent.$refs.headerRef.showOpenFrame = true;
						that.$parent.$refs.headerRef.showFrmBack = false;
					}
				});
			},
			clearOrder: function () {
				this.orders = [];
				this.emptyOrderLength();
				//this.$emit('saveOrderSuccess');
			},
			//添加投注订单
			addOrder: function (order) {
				this.orders.push(order);
				this.bankId = true;
			},
			// 删除订单
			deleteOrder: function (index) {
				// console.log('index = ' + index);
				// console.log('this.orders = ' + this.orders);
				console.log(this.orders[index].multiple);
				this.$parent.$refs.headerRef.balanceAmount = parseFloat(this.$parent.$refs.headerRef.balanceAmount) + parseFloat(this.orders[index].multiple);
				this.orders.splice(index, 1);
				this.emptyOrderLength()
			},
			//如果order为0
			emptyOrderLength: function () {
				if (this.orders.length == '0') {
					this.$parent.$refs.footerRef.resetData(true);
					this.bankId = false;
					this.$emit('backFromConfirmPage', '')
				} else {
					false;
				}
			},
			OrdersTotal: function () {
				return this.orders
			},
			displayVisible: function () {
				this._Util.showConfirm(this, {content: '你确定要清空投注记录吗?'}, action => {
					if (!action) return;

					if (this.$parent.$refs.confirmPageRef) {
						this.$parent.$refs.confirmPageRef.clearOrder();
						this.$parent.$refs.confirmPageRef.sectionClick();
					}
				});
			},

			timeEndClearData() {
				if (this.bankId && !this.$parent.stopBet) {
					console.log('本期投注已经结束,是否要清空投注记录？')
					this._Util.showConfirm(this, {content: '本期投注已经结束,是否要清空投注记录?'}, action => {
						if (!action) return;
						this.$parent.emptyNull();
					});
				}
				;
			}
		},
		watch: {
			'creditId'(val) {
				console.log('this.creditId = ' + this.creditId)
			}
		},
		components: {
//      OpenFrame
		}
	}
</script>
