<template>
	<!--<div v-show="popupVisible" style="width: 100%; height: 100%;">-->
	<mt-popup v-model="popupVisible" position="right"
	          class="mint-popup-3" :modal="false">
		<button id="closeFrame" v-show="showFrmBack" @click="$emit('update:popupVisible', !popupVisible)"
		        style="height: 50px; width: 50px;opacity: 0"></button>

		<iframe id="frameId" v-if="showFrm" :src="toUrl" frameborder="0"
		        style="height: 100%; width: 100%;"></iframe>
	</mt-popup>

	<!--</div>-->

</template>
<script type="text/babel">
	export default {
		props: {
			toUrl: '',
			popupVisible: {default: false},
			showFrmBack: {default: false},
		},

		data() {
			return {
				showFrm: true
			}
		},

		mounted() {
			this.init();
		},

		methods: {
			closeFrm() {
				this.popupVisible = false;
			},


			init() {

			}
		},

		watch: {
			popupVisible(val) {
				let that = this;
				setTimeout(function () {
					that.showFrm = val;
				}, 300);
			}
		},

		components: {}
	}
</script>

<style>
	.mint-popup-3 {
		width: 100%;
		height: 100%;
		background-color: #fff;
		z-index: 99999 !important;
	}

	.mint-popup-3 .mint-button {
		position: absolute;
		width: 90%;
		top: 50%;
		left: 5%;
		transform: translateY(-50%);
	}
</style>

