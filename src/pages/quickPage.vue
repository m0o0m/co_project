<template>
    <div style="height: 100%; width: 100%; background: white;">


        返回前台: {{count}}

        <div style="height: 800px; margin: 100px;">
            <mt-range v-model="rangeValue"
                      :min="0"
                      :max="8"
                      :step="1">
                <div slot="start">0</div>
                <div slot="end">8</div>
            </mt-range>
            {{rangeValue}}
        </div>


    </div>
</template>
<script type="text/babel">
  export default {
	data() {
	  return {
		count: 50,
		result: [],
		popupVisible: false,
        rangeValue: 0,
        count: 0
	  }
	},

	mounted() {
	  let that = this;
      that._Util.audioPlay(that, {fileName: 'pcegg.mp3'});
//      let that = this;
//		that._Util.showConfirm(that, {
//			title: '请输入交易验证码',
//			content: 1893222222,
//			placeholder: '请输入口令',
//			showText: true
//		}, (inputText, callback) => {
//
//		});

      document.addEventListener('visibilitychange', function(event) {
        if (!document.hidden) {
          that.count += 1;
        } else {
        }
      });
	},

	methods: {
      closeFrm() {
        this.popupVisible = false;
      },

      start() {
        let that = this;
        setTimeout(function () {
          racing.fallRun(that.fallObj, [9, 4, 3, 6, 11, 8, 10, 1, 2, 5, 0, 7] || that.$parent.$refs.headerRef.actionDataCopy, () => {
//			that.$parent.$emit('closeDraw');
          });
        }, 300)
      },


	  init() {
		let that = this;
		that._Util.post(that, that._Api.POST_HOME, {}, (data) => {
		  that.resultList = data;
		});

		for (let i = 0; i < 50; i++) {
		  that.result.push({name: '小' + i, age: i});
		}


//		that._Util.showConfirm(that, {
//		  title: '请输入交易验证码',
//		  content: '159************',
//		  placeholder: '请输入口令',
//          showText: true
//        }, (inputText, callback) => {
//		  console.log(inputText);
//		  that._Util.post(that, that._Api.POST_HOME, {}, (data) => {
//			callback && callback();
//		  });
////		  that._Util.showAlert(that, {content: '验证码不正确'});
//        })
	  },

	  openIframe() {

	  },

	  loadMore() {
		console.log('loadMore');
	  }
	},

	components: {
	}
  }
</script>

<style>
    .contentMark {
        width: 100%;
        height: 100%;
    }
</style>

