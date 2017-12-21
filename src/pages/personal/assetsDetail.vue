<template>
  <div class="moneyTemplateed">
    <div class="commonNavBar positionFixed">
        <div class="backPassTitle"><p>资金明细</p></div>
        <div class="loginIcon left flt" @click="$router.go(-1)"><a href="javascript:void(0)"></a></div>
        <div class="loginIcon right choose"  @click="showType = !showType"><a href="javascript:void(0)"></a></div>
      </div>
      <div id="assetsDeList" class="assetsDeList">
        <div class="examineMianBody"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="busy"
             infinite-scroll-distance="50"
             infinite-scroll-immediate-check="false">
          <div class="noneDIV" v-if="betIndex === 0">
            <p><img src="../../assets/images/noneImg.png"/></p>
            <p>暂无记录哦～</p>
          </div>
          <ul v-else>
            <li v-for="(v, index) in resultList" class="assetsDeListLI">
              <a href="javascript: void(0);">
                <article class="examineArticle">
                  <section
                      :class="{'assetsColor':v.type_text=='返点' || v.type_text=='中奖' || v.type_text=='返款' ||　v.type_text=='佣金' || v.type_text=='提现' || v.type_text=='派奖' || v.type_text=='彩金'|| v.type_text=='充值'}">
                    <p>{{v.type_text}}</p>
                  </section>
                  <section>
                    <article class="assetsArticle">
                      <p>{{(v.note.split(','))[0].split('：')[1] ? (v.note.split(','))[0].split('：')[1] : v.note}}
                        <span class="opts" v-if="(''+v.note.split('，')[1]).split('：')[1]">&nbsp;&nbsp;第{{(''+v.note.split('，')[1]).split('：')[1] ? (''+v.note.split('，')[1]).split('：')[1] : ''}}期</span>
                      </p>
                      <p class="totalMarry"><span>{{v.cash}}</span></p>
                    </article>
                    <article class="assetsArticle">
                      <p class="timer opts"><span v-if="v.note_text" class="assets_article_playname">{{v.note_text}}&nbsp;&nbsp;&nbsp;&nbsp;</span><span>{{v.create_time}}</span>
                      </p>
                      <p class="balankMarry optss"><span>{{'余￥' + v.amount}}</span></p>
                    </article>
                  </section>
                </article>
              </a>
            </li>
          </ul>
        </div>
      </div>
    <div class="Popup_up indexJust" v-if="showType">
      <div class="popup_upMian">
        <div class="popup_ulTitle popup_ulTitle_center">分类</div>
        <ul>
          <li v-for="(v, index) in showTypeItems" :class="{'on':numIndex == index}" @click="changeType(v, index)">
            {{v.name}}
          </li>
        </ul>
        <div @click="showType = !showType" class="delPopup">
          <img :src="delImg"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //   import '../../assets/scss/adetails.scss';
//  import '../../assets/scss/personal.scss';
  export default {
    data() {
      return {
        title: "资金明细",
        resultList: [],
        showType: false,
        numIndex: 0,
        showTypeItems: [
          {type: 0, name: '全部'},
          {type: 5, name: '返点'},
          {type: 4, name: '中奖'},
          {type: 34, name: '返款'},
          {type: 3, name: '投注'},
          {type: 6, name: '佣金'},
          {type: 1, name: '充值'},
          {type: 2, name: '提现'},
          {type: 16, name: '彩金'}
//          {type: 33, name: '撤单'}
        ],
        delImg: require('../../assets/images/iconbtn2x.png'),
        busy: false,
        params: {
          page: 1,
          type: ''
        },
        moreMsg: '',
        betIndex: ''
      }
    },
    
    mounted() {
//	  console.log(this.resultList[0].note.split(','))
      let that = this;
      that.init();
      that._Util.needClickFc('assetsDeList')
    },
    
    methods: {
      init() {
        let that = this;
        if (!that.busy) {
          that.busy = true;
          that._Util.post(that, that._Api.POST_PERSONAL_ASSETS_DETAIL_LIST, that.params, (data) => {
            that.resultList = that.resultList.concat(data.data || []);
            that.busy = false;
            
            if (that.resultList.length === 0) {
              that.betIndex = 0;
            } else {
              that.betIndex = 1;
            }
            
            if (data.data.length) {
              that.params.page++;
            }
            
            if (parseInt(data.current_page) === data.last_page) {
              that.moreMsg = '正在加载更多的数据...';
            }
            
            if (that.params.page === data.last_page && !data.data.length) {
              that._Util.showAlert(that, {content: '已经没有更多数据了'});
            }
          });
        }
      },
      
      changeType(v, index) {
        let that = this;
        that.numIndex = index;
        that.params.page = 1;
        that.params.type = v.type;
        that.resultList = [];
        that.showType = false;
        that.init();
      },
      
      loadMore() {
        let that = this;
        that.init();
      }
    }
  }
</script>

<style lang='scss'>
  .popup_ulTitle_center {
    text-align: center;
  }
</style>
