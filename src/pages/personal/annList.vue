<template>
  <div class="annList">
    <div class="commonNavBar positionFixed">
      <div class="backPassTitle"><p>公告列表</p></div>
      <div class="loginIcon left flt" @click="$router.go(-1)"><a href="javascript:void(0)"></a></div>
      <div class="loginIcon right"  @click="loginService"><a href="javascript:void(0)"></a></div>
    </div>
    <div class="perCenterAnlist">
      <div id="per_content_cls" class="perContentCls">
        <div class="examineMianAnlist"
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
                  <i class="commonArrowsRight"></i>
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
  
//  import '../../assets/scss/personal.scss';
  
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
      that._Util.setCss('.examineMianAnlist', {"height": (10 / 12)}, "*");
      that._Util.setCss('.annList', {"height": 1}, "*");
      that._Util.needClickFc('perContentCls');
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
      },
      loginService() {
        let that = this;
        that._Util.post(that, that._Api.POST_CUSTOMER_SERVER, {name: 'kf'}, (data) => {
          window.location.href = data.value;
        })
      }
    }
  }
</script>

<style lang="scss">
</style>