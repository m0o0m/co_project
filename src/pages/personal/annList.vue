<template>
  <div class="annWidth">
    <div class="per">
      <ul class="per_leftd isbug">
        <li id="liso" class="isbug" @click="$router.go(-1);"><a href="javascript: void(0);"></a></li>
        <li><p class="incors">公告列表</p></li>
      </ul>
    </div>
    <div class="per_center_anlist">
      <div id="per_content_cls" class="per_content_cls">
        <div class="examineMian_anlist"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="busy"
             infinite-scroll-distance="50"
             infinite-scroll-immediate-check="false"
             style="">
          <ul>
            <li @click="toDetail(v)" v-for="(v, index) in resultList">
              <a href="javascript: void(0);">
                <article class="examine_article_anlist">
                  <section>
                    <p><span>{{v.title}}</span></p>
                    <p><span>{{v.create_time}}</span></p>
                  </section>
                </article>
              </a>
            </li>
          </ul>
          
          <!--<span v-html="moreMsg"></span>-->
          <!--<span v-if="busy">正在加载更多的数据...</span>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
  import '../../assets/scss/personal.scss';
  
  export default {
    data() {
      return {
        resultList: [],
        busy: false,
        params: {
          page: 1,
          type: ''
        }
      }
    },
    
    mounted() {
      let that = this;
      that.init();
      that._Util.setCss('.examineMian_anlist', {"height": (10 / 12)}, "*");
      that._Util.setCss('.annWidth', {"height": 1}, "*");
      that._Util.needClickFc('per_content_cls');
    },
    
    methods: {
      init() {
        let that = this;
        if (!that.busy) {
          that.busy = true;
          
          that._Util.post(that, that._Api.POST_PERSONAL_ANN_LIST, that.params, (data) => {
            that.busy = false;
            that.resultList = that.resultList.concat(data.data || []);
            if (data.data.length) {
              that.params.page++;
            }
            
            if (that.params.page === data.last_page && !data.data.length) {
              that._Util.showAlert(that, {content: '已经没有更多数据了'});
            }
          });
        }
      },
      
      loadMore() {
        let that = this;
        that.init();
      },
      
      toDetail(v) {
        this.$router.push({name: 'annDetail', query: {id: v.id}});
      }
    }
  }
</script>

<style lang="scss">
  /*body {*/
  /*overflow: hidden;*/
  /*}*/
  /*.view {*/
  /*height: 100%;*/
  /*}*/
</style>