<template>
  <div class="feedBackMessageList">
    <div class="commonNavBar positionFixed">
      <div class="backPassTitle"><p>宝贵意见</p></div>
      <div class="loginIcon left flt" @click="$router.go(-1)"><a href="javascript:void(0)"></a></div>
    </div>
    <div class="messageListContent">
      <div class="message_list_content_box"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="busy"
           infinite-scroll-distance="50"
           infinite-scroll-immediate-check="false"
      >
        <ul>
          <li v-for="(item,index) in feedBackList" :data-id="item.id" :key="index">
            <div class="item ask">
              <i>问</i>
              <p>{{item.content}}</p>
            </div>
            <div class="item answer">
              <i>答</i>
              <p>{{item.reply}}</p>
            </div>
            <div class="item time">更新于 {{item.reply_time}}</div>
          </li>
          
          <!--<div class="noneDIV" v-if="betIndex === 0">
                  <p><img src="../../assets/images/noneImg.png"/></p>
                  <p>暂无记录哦～</p>
                </div>-->
        </ul>
      </div>
    
    
    </div>
  </div>
</template>

<script>
//  import '../../assets/scss/personal.scss'
  
  export default {
    data() {
      return {
        feedBackList: [],
        pageid: 1,
        current_page: 0,
        last_page: 1,
        busy: false,
        moreMsg: '',
        betIndex: 2,
      }
    },
    
    mounted() {
      let that = this;
      that._Util.setCss('.messageListContent', {"height": 1}, "*");
      that.init();
    },
    methods: {
      init() {
        let that = this;
        if (!that.busy) {
          that.busy = true;
          if (that.current_page == that.last_page) {
            that._Util.showAlert(that, {content: '已经没有更多数据了'});
            return false;
          }
          that._Util.post(that, that._Api.POST_FEED_BACK_LIST, {
            page: that.pageid,
          }, (data) => {
            that.feedBackList = that.feedBackList.concat(data.data || []);
            that.current_page = parseInt(data.current_page);
            that.last_page = parseInt(data.last_page);
            if (that.feedBackList.length === 0) {
              that.betIndex = 0;
            } else {
              that.betIndex = 1;
            }
            if (data.data.length) {
              that.pageid++;
            }
            if (parseInt(data.current_page) === data.last_page) {
              that.moreMsg = '';
            }
            that.busy = false;
          });
        }
        
      },
      loadMore() {
        let that = this;
        that.init();
      }
    },
    components: {}
  }
</script>

<style lang="css" rel="styleheet/css" scoped>

</style>