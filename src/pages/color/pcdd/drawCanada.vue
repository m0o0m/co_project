<template>
    <div class="drawAlottery">
        <div class="ves indexJust" id="ves">
            <button @click="openDraw" style="display: none;">BUTTON</button>
        </div>
    </div>
</template>

<script type="text/babel">
//  import '../../../assets/scss/drawCanada.scss'
  import '../../../assets/css/style.css'
import fall from '../../../assets/js/openLottery/fallingSphere'

  export default {
	props: {
	},
	data() {
	  return {}
	},
	mounted() {
      this.openDraw();
	},
	methods: {
	  openDraw() {
		let that = this;
		let fallObj = fall.fallMan({
		  el: document.getElementById('ves'),	//动画节点，动画容器添加到哪里
		  width: '100%',							//动画容器宽度
		  height: '70%'
		});

        let newArr = JSON.parse(JSON.stringify(this.$parent.$refs.headerRef.actionDataCopy));
        newArr.pop();
        fall.fallRun(fallObj, newArr, () => {
		  that.$parent.$emit('closeDraw');
		});
	  }
	},
  }

</script>