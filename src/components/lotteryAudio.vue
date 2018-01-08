<template>
    <div>
        <audio controls="controls" id="music" style="display:none" preload autoplay> 
            <source src="song.mp3" type="audio/mpeg">
        </audio>
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

	  }

	},

	components: {}
  }
</script>
