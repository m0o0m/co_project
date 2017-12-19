<template>
  <div class="ProvCityBoxWarp">
    <div class="ProvCityBoxBg" v-show="show" @click="cityCancel()" @touchmove="_stopDef"
         @mousewheel="_stopDef"></div>
    <transition name="expand-select">
      <div class="ProvCityBox" v-show="show" @mousewheel="_stopDef">
        <div class="ProvCityHeader">
          <div class="ProvCityHeaderCancle" @click="cityCancel()">{{cancel}}</div>
          {{title}}
          <div class="ProvCityHeaderConfirm" @click="submit()">{{confirm}}</div>
        </div>
        <div class="ProvCityContent">
          <div class="ProvCityContentList">
            <ul ref="provinceList"
                :class="{'province_dragging': provinceState.dragging}"
                @touchstart="_onTouchStart('province', $event)"
                @mousedown="_onTouchStart('province', $event)"
                :style="{'transform' : 'translate3d(0,' + provinceState.translateY + 'px, 0)'}">
              <li></li>
              <li></li>
              <li v-for="(item, index) in provinceState.data"

                  :class="{
                                    'current': item.code === provinceState.selectedId,
                                    'node1':  Math.abs(index - provinceState.index) == 1,
                                    'node2':  Math.abs(index - provinceState.index) == 2,
                                    'node3':  Math.abs(index - provinceState.index) >= 3
                                }"
              >{{item.name}}
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <hr class="ProvCitySelectedTop">
        <hr class="ProvCitySelectedBottom">
      </div>
    </transition>

  </div>
</template>
<script type="text/babel">
	export default {
		props: {
			'result': {
				type: Object,
				default: null
			},
			'show': Boolean,
			'title': {
				type: String,
				default: '请选择'
			},
			'confirm': {
				type: String,
				default: '确定'
			},
			'cancel': {
				type: String,
				default: '取消'
			},
			'items': {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				target: '',
				provinceState: {
					data: [],
					selectedId: null,
					index: 0,
					startPos: null,
					translateY: 0,
					startTranslateY: 0,
					dragging: false
				},
				delta: 0,
				slideEls: null,

				p: '',
				provinces: [],
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				let that = this;
				that.provinces = that.items;
				that.beforeCreate();
				that._onTouchMove = that._onTouchMove.bind(that);
				that._onTouchEnd = that._onTouchEnd.bind(that);
			},

			beforeCreate() {
				this.provinceState.data = this.provinces;
				this.provinceState.selectedId = 110000; //北京市  省
			},

			setProvince(p) {
				this.p = p;
			},
			getDaysInMonth(year, month) {
				month = parseInt(month, 10); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
				let temp = new Date(year, month, 0);
				return temp.getDate();
			},

			setArea(a) {
				this.a = a;
			},


			submit() {
				let obj = {
					'province': this.provinceState.data[this.provinceState.index]
				};

				console.log(obj);
				this.$parent.$emit('pickerOk', obj);
			},

			getSelectedData(index) {
				let target = this.target;
				let thisData = this[target + 'State'];
				this._Util.log(thisData);
				thisData.selectedId = thisData.data[index];
				if (target === 'province') {
					this.setProvince(thisData.data[index]);
				}
			},

			setPage() {
				let target = this.target;
				let thisData = this[target + 'State'];

				if (!thisData.data.length) {
					return;
				}

				let clientHeight = this.slideEls[0]['clientHeight'];
				let total = thisData.data.length;
				let goPage = Math.round((thisData.translateY / clientHeight).toFixed(1));
				if (goPage > 0) {
					goPage = 0;
				}
				goPage = total - 1 >= Math.abs(goPage) ? goPage : -(total - 1);
				let index = Math.abs(goPage);
				thisData.index = index;
				this.getSelectedData(index);
				thisData.translateY = goPage * clientHeight;
			},
			cityCancel() {
				this.$parent.$emit('pickerCancel');
			},
			_getTouchPos(e) {
				return e.changedTouches ? e.changedTouches[0]['pageY'] : e['pageY'];
			},
			_getElem(e) {
				return Array.from(e.currentTarget.children).slice(3, -3);
			},
			_onTouchStart(target, e) {
				let thisData = this[target + 'State'];
				this.target = target;
				this.slideEls = this._getElem(e);
				this.delta = 0;
				thisData.startPos = this._getTouchPos(e);
				thisData.startTranslateY = thisData.translateY;
				thisData.dragging = true;
				document.addEventListener('touchmove', this._onTouchMove, false);
				document.addEventListener('touchend', this._onTouchEnd, false);
				document.addEventListener('mousemove', this._onTouchMove, false);
				document.addEventListener('mouseup', this._onTouchEnd, false);
			},
			_onTouchMove(e) {
				let target = this.target;
				let thisData = this[target + 'State'];
				e.delta = this._getTouchPos(e) - thisData.startPos;
				thisData.translateY = thisData.startTranslateY + e.delta;
				if (Math.abs(e.delta) > 0) {
					e.preventDefault();
				}
			},
			_onTouchEnd(e) {
				let target = this.target;
				let thisData = this[target + 'State'];
				thisData.dragging = false;
				this.setPage();
				document.removeEventListener('touchmove', this._onTouchMove);
				document.removeEventListener('touchend', this._onTouchEnd);
				document.removeEventListener('mousemove', this._onTouchMove);
				document.removeEventListener('mouseup', this._onTouchEnd);
			},
			_stopDef(e) {
				e.preventDefault()
			},
			getCode(itemList, str, parentId) {
				for (let i = 0; i < itemList.length; i++) {
					if (!parentId && itemList[i].name == str) {

					}
				}
			}
		},

		watch: {
			items() {
				this.init();
			}
		}
	}
</script>

<style>

</style>
