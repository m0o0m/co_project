<template>
  <div class="westernFooter positionFixed">
    <div class="westernFooterMain">
      <div class="westernFooterTop">
        <section class="westernSectionNum displayFlex">
          <p v-for="(mary,marry_index) in marryImg" data-marry="data.num" :class="{'on':marryImgId == marry_index}"
             @click="marryClick(marry_index, mary.num)" :data-Marry="mary.num">
            <img :src="mary.img"/>
          </p>
        </section>
      </div>
      <article class="ternFooterBottom displayFlex">
        <section>
          <a href="javascript:void(0)" @click="resetData(true)">清桌</a>
        </section>
        <section><a href="javascript:void(0)" @click="onConfirmBtnClicked">{{$parent.classAdata.status === 0 ||
          $parent.classAdata.status === -1 ? '暂停销售' : '立即投注'}}</a></section>
      </article>
    </div>
  </div>
</template>

<script>
	export default {
		name: "westernFooter",
		props: {
			personalRebate: {default: ''},
			GdlotteryDataArr: {default: ''},
			curtwoIndex: {default: ''},
			creditId: {default: ''},
			whetherNumber: {default: 0},
			balanceMarry: {default: ''}
		},
		data() {
			return {
				marryImgId: this.$route.query.game == -1 ? 1 : 2,
				immediateBetting: '立即投注',
				marryImg: [
					{img: require('../assets/images/marry_1.png'), num: 1, trueEd: false},
					{img: require('../assets/images/marry_10_f.png'), num: 10, trueEd: false},
					{img: require('../assets/images/marry_100.png'), num: 100, trueEd: false},
					{img: require('../assets/images/marry_1000.png'), num: 1000, trueEd: false},
					{img: require('../assets/images/marry_5000_f.png'), num: 5000, trueEd: false},
					{img: require('../assets/images/marry_10000.png'), num: 10000, trueEd: false},
				],
				sliderValue: 0,
				dragMan_maxline: null, //灰色
				dragMan_minline: null,
				dragMan_redLine: null, //color
				liu_codeMun_lodds: null,
				liu_codeMun_lodds_span: null,
				draging: false,
				dragMan_minline_width: 20,
				dragminLeft: 171,
				offsetWidth: 0,
				bonus: 0,
				multiple: '', // 官方玩法：倍数   信用玩法：金额
				timeSet: 0,
				whetherNumberfooter: 0,
//        sliderValue: 0,
				picture: require('../assets/images/tz.png')
			}
		},
		computed: {},
		watch: {
			'creditId': function () {
				var _this = this;
				setTimeout(function () {
					//_this.initSlider();
				}, 200);
				this.immediateBetting = parseInt(this.$parent.whetherNumber) === 0 || parseInt(this.$parent.whetherNumber) === -1 ? '暂停销售' : '立即投注';
				this.picture = parseInt(this.$parent.whetherNumber) === 0 || parseInt(this.$parent.whetherNumber) === -1 ? require('../assets/images/stopBtn.png') : require('../assets/images/tz.png');
			},

			'whetherNumber'() {
				this.immediateBetting = parseInt(this.$parent.whetherNumber) === 0 || parseInt(this.$parent.whetherNumber) === -1 ? '暂停销售' : '立即投注';
				this.whetherNumberfooter = this.whetherNumber;
			},

			'$parent.stopBet'(val) {
				if (val) {
					this.resetData(true);
				}
			}
		},
		mounted() {
			//this.initSlider();
			this.immediateBetting = parseInt(this.$parent.whetherNumber) === 0 || parseInt(this.$parent.whetherNumber) === -1 ? '暂停销售' : '立即投注';
			console.log("this.$parent.whetherNumber:", this.$parent.whetherNumber);
			console.log("this.immediateBetting:", parseInt(this.$parent.whetherNumber) === 0 || parseInt(this.$parent.whetherNumber) === -1);
			this.whetherNumberfooter = this.whetherNumber;
		},
		methods: {
			resetData: function (isBack) {
				let that = this;
				let fun = () => {
					this.sliderValue = 0;
//        this.dragMan_maxline = null;
//		  this.dragMan_minline.style.left = '0px';
//		  this.dragMan_redLine.style.width = '0px';
					$('.playMarryImg').each(function () {
						$(this).html('');
					});
//        this.dragMan_redLine = null;
//        this.liu_codeMun_lodds = null;
//        this.liu_codeMun_lodds_span = null;
//        this.draging = false;
//        this.dragMan_minline_width = 20;
//        this.dragminLeft = 0;
//        this.offsetWidth = 0;
					this.bonus = 0;
					this.multiple = ''; // 官方玩法：倍数   信用玩法：金额

//        this.resetSlider();
					this.marryImgId = 2;
					this.$parent.$emit('resetData', true);
					that.$parent.$refs.headerRef.getHistoryBet();
				};


				if (!isBack) {
					if (that.$parent.$refs.pcddref.getAllSelectedBalls().length) {
						that._Util.showConfirm(that, {content: '确定清空投注记录吗?'}, () => {
							fun();
						});
					} else {
						that._Util.showAlert(that, {content: '请选择号码'});
					}
				} else {
					fun();
				}
			},

			marryClick: function (index, num) {
				this.marryImgId = index;
				this.$parent.$emit('marryNum', num);
			},
			increaseClick: function () {
				this.dragMan_getCalp('0');
			},
			reduceClick: function () {
				this.dragMan_getCalp('1');
			},
			/*点击获取位置*/
			dragMan_getCalp: function (id) {
				if (this.liu_codeMun_lodds_span.innerHTML == "0") {
					this.dragminLeft = 0;
				}
				this.offsetWidth = this.dragMan_maxline.offsetWidth - this.dragMan_minline_width;
				if (id == "1") {
					this.dragminLeft += this.dragMan_maxline.offsetWidth / 8;
					if (this.dragminLeft >= this.offsetWidth) {
						this.dragminLeft = this.offsetWidth;
					}
				} else {
					this.dragminLeft -= this.dragMan_maxline.offsetWidth / 8;
					if (this.dragminLeft < 0) {
						this.dragminLeft = 0;
					}

				}
				this.updateDotPos(this.dragminLeft, this.offsetWidth);
			},
			//滑动效果
			// 事件
			start: function (e) {
				e.stopPropagation();
				this.draging = true;
				// console.log("鼠标按下")
			},
			move: function (e) {
				e.stopPropagation();
				//console.log("鼠标拖动")
				if (this.draging) {
					if (!e.touches) {
						//兼容移动端
						var x = e.clientX;
					} else {
						//兼容PC端
						var x = e.touches[0].pageX;
					}
					var lineDiv_left = this.getPosition(this.dragMan_maxline).left;
					this.dragminLeft = x - lineDiv_left;
					this.offsetWidth = this.dragMan_maxline.offsetWidth - this.dragMan_minline_width;
					if (this.dragminLeft >= this.offsetWidth) {
						this.dragminLeft = this.offsetWidth;
					}
					if (this.dragminLeft < 0) {
						this.dragminLeft = 0;
					}
					this.updateDotPos(this.dragminLeft, this.offsetWidth);
				}
			},
			end: function (e) {
				//console.log("鼠标弹起")

				this.draging = false;
			},
			//获取元素的绝对位置
			getPosition: function (node) {
				var left = node.offsetLeft; //获取元素相对于其父元素的left值var left
				var top = node.offsetTop;
				var current = node.offsetParent; // 取得元素的offsetParent
				// 一直循环直到根元素
				while (current != null) {
					left += current.offsetLeft;
					top += current.offsetTop;
					current = current.offsetParent;
				}
				return {
					"left": left,
					"top": top
				};
			},
			updateDotPos: function (val, wih) {
				this.dragMan_minline.style.left = val + "px";
				this.dragMan_redLine.style.width = val + 10 + "px";
				this.sliderValue = (parseFloat(((wih - (wih - val)) / wih) * this.personalRebate)).toFixed(0)

				this.liu_codeMun_lodds_span.innerText = this.sliderValue;
				this.$emit('sliderValue', this.sliderValue)
			},
			initSlider: function () {
				this.dragMan_maxline = document.getElementsByClassName("dragMan_maxline")[0], //灰色
					this.dragMan_minline = document.getElementsByClassName("dragMan_minline")[0]
				this.dragMan_redLine = document.getElementsByClassName("dragMan_redLine")[0] //color
				this.liu_codeMun_lodds = document.getElementsByClassName("liu_codeMun_lodds")[0]
				this.liu_codeMun_lodds_span = this.liu_codeMun_lodds.getElementsByTagName("span")[0]
				this.dragMan_minline.addEventListener("touchstart", this.start.bind(this))
				this.dragMan_minline.addEventListener("mousedown", this.start.bind(this))
				window.addEventListener("touchmove", this.move.bind(this))
				window.addEventListener("mousemove", this.move.bind(this))
				window.addEventListener("touchend", this.end.bind(this))
				window.addEventListener("mouseup", this.end.bind(this))
			},
			resetSlider: function () {
				this.offsetWidth = this.dragMan_maxline.offsetWidth - this.dragMan_minline_width
				this.dragminLeft = this.offsetWidth
				this.updateDotPos(this.dragminLeft, this.offsetWidth)
				this.multiple = this.isCredit ? '' : 1
				this.liu_codeMun_lodds_span.innerText = this.sliderValue
				this.$emit('sliderValue', this.sliderValue)
				this.$emit('multiple', this.multiple)
			},
			onConfirmBtnClicked: function () {
				if (parseInt(this.$parent.classAdata.status) === 0 || parseInt(this.$parent.classAdata.status) === -1) {
					this._Util.showAlert(this, {content: '暂停销售'});
					return false;
				}
				let orderStopBet = this.$parent.stopBetVund();
				if (orderStopBet) {
					this._Util.showAlert(this, {content: '已封盘'});
					return;
				}
				let that = this;
				if (that._LotteryUtil.isBetEnd(that, that.$parent.stopBetCountDownSecond, that.$parent.classAdata.status)) return;
				that.$emit('confirmBtnClicked');
			}
		}
	}
</script>
