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
	  that.init();
	},

	methods: {
	  init() {
		let that = this;
		that._Util.post(that, that._Api.POST_HOME, {}, (data) => {
		  that.resultList = data;
		});
	  }

	},


	components: {}
  }
</script>
