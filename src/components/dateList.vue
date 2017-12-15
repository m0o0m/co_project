<template>
  <mt-datetime-picker
          ref="picker"
          type="time"
          v-model="pickerValue">
  </mt-datetime-picker>
</template>

<script>
	import { DatetimePicker } from 'mint-ui';
	export default {
		methods: {
			openPicker() {
				this.$refs.picker.open();
			}
		}
	};
</script>