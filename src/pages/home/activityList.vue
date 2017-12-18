<template>
  <div class="activityList">
    <div class="theDetails_title activityList_title"  v-if="$route.query.terminal">
      <p>{{title}}</p>
      <img :src="titleImg" @click="_Util.back($router)"/>
    </div>
    <div class="activityContent">
      <aside>
        <p>{{result.title}}</p>
        <p>活动时间：<span>{{result.start_time*1000 | dateFormat('yyyy-MM-dd')}}</span> - <span>{{result.end_time*1000 | dateFormat('yyyy-MM-dd')}}</span></p>
      </aside>
      <div class="activityText">
        <section v-html="result.detail"></section>
      </div>
    </div>
  </div>
</template>

<script>
	import '../../assets/scss/default.scss'
	export default {
		data(){
			return {
				title: "活动详情",
				titleImg: require("../../assets/images/icon_back2x.png"),
				active_id: 0,
				activeTitle: '',
				startTime: 0,
				endTime: 0,
				activeDetail: '',
				result: {}
			}
		},
		mounted(){
			let activityList_title = $(".activityList_title").outerHeight(true),
				activityContent = $(".activityContent aside").outerHeight(true),
				windowHeight = $(window).height();
			activityList_title = !activityList_title ? 0 : activityList_title;
			$(".activityText").css({
				"height": (windowHeight-(activityList_title+activityContent))*0.85,
				"overflow-y": "scroll"
			});

			this.initData();
		},
		methods: {
			initData () {
				var that = this;
				if (that.$route.query.id) {
					that.active_id = that.$route.query.id;
				}
				that._Util.post(that, that._Api.POST_DETAILS_ACTIVITIES, {active_id: that.active_id}, (data) => {
					if(data){
						that.result = data;
						let activityList_title = $(".activityList_title").outerHeight(true),
							activityContent = $(".activityContent aside").outerHeight(true),
							windowHeight = $(window).height();
						activityList_title = !activityList_title ? 0 : activityList_title;
						$(".activityText").css({
							"height": (windowHeight-(activityList_title+activityContent))*0.85,
							"overflow-y": "scroll"
						});
//                  that.activeTitle = data.title;
//                  console.log(data.start_time,data.end_time);
//                  that.startTime = that._Util.dateFormat(data.start_time,"yyyy-MM-dd");
//                  that.endTime = that._Util.dateFormat(data.end_time,"yyyy-MM-dd");
//                  that.activeDetail = data.detail;
					}
				});
			}
		}
	}
</script>

<style lang="scss">
  .activityList {
    background: url('../../assets/images/numberimg/gup.png') top center no-repeat; background-size: 100% auto;
  }
  .activityContent {
    padding: 0.5rem;
    aside {
      font-size: 0.74483rem;
      color: #FFDC99;
      line-height: 0.9931rem;
      text-align: center;
      p:last-of-type {
        font-size: 0.49655rem;
        color: #FFDC99;
        line-height: 0.9931rem;
        font-family: Arial;
      }
    }
    .activityText {
      margin: 0.41379rem auto;
      font-size: 0.57931rem;
      line-height: 0.9931rem;
      letter-spacing: 0;
      color: #FFDC99;
      background: rgba(0,0,0,0.5);
      padding: 0.5rem;
      section {
        p {
          text-align: justify; padding: 0.2rem 0;
        }
      }
    }
  }
</style>