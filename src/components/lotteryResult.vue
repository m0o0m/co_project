<template>
    <div>
    </div>
</template>
<script type="text/babel">
  export default {
	data() {
	  return {
		resultList: []
	  }
	},

	mounted() {
	  let that = this;
	  that.initData();
	},

	methods: {
	  initData() {
		let that = this;
		that._Util.post(that, that._Api.POST_HOME, {}, (data) => {
		  that.resultList = data;
		});
	  }

	},


	components: {}
  }
</script>
