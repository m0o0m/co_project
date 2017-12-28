<template>
    <div v-if="show" class="Popup2">
        <div class="Popup_text indexJust">
            <div class="Popup_text_wz" v-html="content"></div>
        </div>
    </div>
</template>
<script type="text/babel">
  export default {
	data() {
	  return {
	    show: false,
        content: '',
        callback: ''
	  }
	},

	mounted() {
	  let that = this;
	  that.init();
	},

	methods: {
	  init() {

	  }
	},

    watch: {
	  show (v) {
	    let that = this;
	    if (v) {
	      setTimeout(function() {
			that.show = false;
			that.callback && that.callback();
          }, 1000);
        }
      }
    },


	components: {}
  }
</script>
