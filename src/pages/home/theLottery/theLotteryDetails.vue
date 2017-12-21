<template>
  <div class="lotteryMian">
    <div class="backPassTitle"><p>{{title}}</p></div>
    <div class="loginIcon flt left" @click="$router.go(-1)"><a href="javascript:void(0)"></a></div>
    <div class="lotteryDate percentage">
      <div class="theLotteryDetails">
        <div v-infinite-scroll="loadMore"
             infinite-scroll-disabled="busy"
             infinite-scroll-distance="50"
             infinite-scroll-immediate-check="false">
          <ul>
            <li v-for="init in resultList" v-if="resultList.length > 0" class="theLotteryList">
              <!--pcdd蛋蛋 加拿大幸运28-->
              <a href="javascript:void(0)" v-if="colorId === 1 || colorId === 2">
                <section class="theLotteryDate displayFlex">
                  <p>第<span>{{init.number}}</span>期</p>
                  <p><span>{{init.create_time}}</span></p>
                </section>
                <section class="theLotteryColor">
                  <article class="theLotteryArticle nameArt04">
                    <p v-for="(d,data_index) in init.data"
                       :class="{'red':init.end_color=='red' && colorId <= 2 && data_index >= 3,'green':init.end_color=='green' && colorId <= 2 && data_index >= 3,'blue':init.end_color=='blue' && colorId <= 2 && data_index >= 3,'gray':init.end_color=='gray' && colorId <= 2 && data_index >= 3}">
                      <span>{{d}}</span></p>
                  </article>
                </section>
                <article class="theLotteryEnd theLotteryPcdd">
                  <section>
                    <p>{{init.kj_result[0][0]}}</p>
                    <p>{{init.kj_result[0][1]}}</p>
                  </section>
                  <section>
                    <p class="beimgSec">
                      <span>{{init.kj_result[1][0]}}</span>
                      <span>{{init.kj_result[1][1]}}</span>
                      <span>{{init.kj_result[1][2]}}</span>
                      <span>{{init.kj_result[1][3]}}</span>
                    </p>
                    <p>
                      {{init.kj_result[1][4]}}
                    </p>
                  </section>
                </article>
              </a>
              <!--香港六合彩-->
              <a href="javascript:void(0)" v-if="colorId == 3 || colorId == 12">
                <section class="theLotteryDate displayFlex">
                  <p>第<span>{{init.number}}</span>期</p>
                  <p><span>{{init.create_time}}</span></p>
                </section>
                <section class="theLotteryColor">
                  <article class="theLotteryArticle nameArt05">
                    <p v-for="(d,data_index) in init.data"
                       :class="{'red':init.colors[data_index]=='red' && (colorId == 3 || colorId == 12),'green':init.colors[data_index]=='green' && (colorId == 3 || colorId == 12),'blue':init.colors[data_index]=='blue' && (colorId == 3 || colorId == 12) ,'gray':init.colors[data_index]=='gray' && (colorId == 3 || colorId == 12)}">
                      <span>{{d}}</span><span class="Contact_cus">{{init.animals[data_index]}}</span></p>
                    <!--<p><img :src="init.any"/></p>-->
                  </article>
                </section>
                <article class="theLotteryFast">
                  <section class="displayFlex">
                    <p v-for="resu in init.kj_result[0]">{{resu}}</p>
                  </section>
                  <section class="displayFlex">
                    <p v-for="resus in init.kj_result[1]">{{resus}}</p>
                  </section>
                </article>
              </a>
              <!--江苏快三-->
              <a href="javascript:void(0)" v-if="parseInt(colorId) === 4">
                <section class="theLotteryDate displayFlex">
                  <p>第<span>{{init.number}}</span>期</p>
                  <p><span>{{init.create_time}}</span></p>
                </section>
                <section class="theLotteryColor">
                  <article class="theLotteryArticle nameArt06">
                    <p v-for="d in init.dataImg"><img :src="d"/></p>
                  </article>
                </section>
                <article class="theLotteryFast">
                  <section class="displayFlex">
                    <p v-for="resu in init.kj_result[0]">{{resu}}</p>
                  </section>
                  <section class="displayFlex">
                    <p v-for="resus in init.kj_result[1]">{{resus}}</p>
                  </section>
                </article>
              </a>
              <!--北京PK10-->
              <!--重庆时时彩-->
              <!--泳神争霸-->
              <a href="javascript:void(0)" v-if="colorId == 5 || colorId == 6 || colorId == 22 || colorId == 23 || colorId == 24">
                <section class="theLotteryDate displayFlex">
                  <p>第<span>{{init.number}}</span>期</p>
                  <p><span>{{init.create_time}}</span></p>
                </section>
                <section class="theLotteryColor">
                  <article class="theLotteryArticle" :class="{'nameArt07': colorId == 5 ,'nameArt03': colorId == 6, 'nameArt08': colorId == 22 || colorId == 23 || colorId == 24}">
                    <p v-for="d in init.data"><span>{{d}}</span></p>
                  </article>
                </section>
                <article class="theLotteryFast">
                  <section class="displayFlex">
                    <p v-for="resu in init.kj_result[0]">{{resu}}</p>
                  </section>
                  <section class="displayFlex">
                    <p v-for="resus in init.kj_result[1]">{{resus}}</p>
                  </section>
                </article>
              </a>
              <!--俄罗斯大转盘-->
              <a href="javascript:void(0)" v-if="colorId == 13">
                <section class="theLotteryDate displayFlex">
                  <p>第<span>{{init.number}}</span>期</p>
                  <p><span>{{init.create_time}}</span></p>
                </section>
                <section class="theLotteryColor">
                  <article class="theLotteryArticle nameArt01">
                    <p v-for="d in init.data"
                       :class="{'red':init.end_color=='red','green':init.end_color=='green','black':init.end_color=='black'}">
                      <span>{{d}}</span></p>
                  </article>
                </section>
              </a>
              <!--济州岛赛马-->
              <a href="javascript:void(0)" v-if="colorId == 14">
                <section class="theLotteryDate displayFlex">
                  <p>第<span>{{init.number}}</span>期</p>
                  <p><span>{{init.create_time}}</span></p>
                </section>
                <section class="theLotteryColor">
                  <article class="theLotteryArticle nameArt">
                    <p v-for="d in init.data"><span>{{d}}</span></p>
                  </article>
                </section>
                <article class="theLotteryFast">
                  <section class="displayFlex">
                    <p v-for="resu in init.kj_result[0]">{{resu}}</p>
                  </section>
                  <section class="displayFlex">
                    <p>
                      <span class="theLotterySpan boxSizing">{{init.kj_result[1][0]}}</span>
                      <span class="theLotterySpan boxSizing borderHiddenRight">{{init.kj_result[1][1]}}</span>
                    </p>
                    <p>
                      <span class="theLotterySpan boxSizing">{{init.kj_result[1][2]}}</span>
                      <span class="theLotterySpan boxSizing borderHiddenRight">{{init.kj_result[1][3]}}</span>
                    </p>
                    <p>
                      <span class="theLotterySpan boxSizing">{{init.kj_result[1][4]}}</span>
                      <span class="theLotterySpan boxSizing borderHiddenRight">{{init.kj_result[1][5]}}</span>
                    </p>
                  </section>
                </article>
              </a>
              <!--马尼拉梭哈--><!--云顶炸金花-->
              <a href="javascript:void(0)" v-if="colorId == 15 || colorId == 16 || colorId == 18">
                <section class="theLotteryDate displayFlex">
                  <p>第<span>{{init.number}}</span>期</p>
                  <p><span>{{init.create_time}}</span></p>
                </section>
                <section class="theLotteryColor">
                  <article class="theLotteryArticle">
                    <p v-for="d in init.dataImg" class="mnshImgCls"><img :src="d"/></p>
                  </article>
                </section>
              </a>
              <!--苏格兰农场-->
              <a href="javascript:void(0)" v-if="colorId == 17">
                <section class="theLotteryDate displayFlex">
                  <p>第<span>{{init.number}}</span>期</p>
                  <p><span>{{init.create_time}}</span></p>
                </section>
                <section class="theLotteryColor">
                  <article class="theLotteryArticle">
                    <p class="sglncCls">
                      <span><img :src="init.dataImg"/></span>
                      <span>{{init.extfield}}</span>
                    </p>
                  </article>
                </section>
              </a>
              <!--华夏牌九-->
              <a href="javascript:void(0)" v-if="colorId == 19 || colorId == 20">
                <section class="theLotteryDate displayFlex">
                  <p>第<span>{{init.number}}</span>期</p>
                  <p><span>{{init.create_time}}</span></p>
                </section>
                <section class="theLotteryColor">
                  <article class="theLotteryArticle">
                    <p class="hxpjCls">
                      <em><span v-for="d in init.dataImg"><img :src="d"/></span></em>
                      <em><span v-for="gows in gowtxtData">{{gows}}</span></em>
                    </p>
                  </article>
                </section>
              </a>
              <!--西部番摊-->
              <a href="javascript:void(0)" v-if="colorId == 21">
                <section class="theLotteryDate displayFlex">
                  <p>第<span>{{init.number}}</span>期</p>
                  <p><span>{{init.create_time}}</span></p>
                </section>
                <section class="theLotteryColor">
                  <article class="theLotteryArticle nameArt02">
                    <p v-for="d in init.data"><span>{{d}}</span></p>
                  </article>
                </section>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    data() {
      return {
        title: "",
        colorId: 1,
        thatData: "",
        initData: "",
        initLen: 0,
        gowtxtData: ['庄家', '初门', '天门', '末门'],
        params: {
          page: 1,
          id: 1
        },
        busy: false,
        resultList: []
      }
    },
    mounted() {
      this.title = this.$route.query.name;
      this.colorId = this.$route.query.id;
      this.params.id = this.$route.query.id;
      this.theLotteryInit();
      this._Util.needClickFc('lotteryMian');
    },
    methods: {
      theLotteryInit: function () {
        var that = this;
        if (that.busy) return;
        that.busy = true;
        
        that._Util.post(that, that._Api.POST_LOTTERY_DETAILS, that.params, (data) => {
          that.busy = false;
          that.thatData = data;
          that.initData = data.data;
          that.initLen = that.initData.length;
          
          try {
            //香港六合彩
            if (that.colorId == 3) {
              for (var i = 0; i < that.initLen; i++) {
                var extfield = that.initData[i].extfield;
                that.initData[i].any = require('../../../assets/images/index/any/' + extfield + '.png');
              }
            }
            //江苏快三
            if (that.colorId == 4) {
              for (var i = 0; i < that.initLen; i++) {
                var data = that.initData[i].data;
                that.initData[i].dataImg = [];
                for (var j = 0; j < data.length; j++) {
                  var dataMg = require('../../../assets/images/index/die/' + data[j] + '.png');
                  that.initData[i].dataImg.push(dataMg);
                }
              }
            }
            //马尼拉梭哈
            if (that.colorId == 15 || that.colorId == 18) {
              for (var i = 0; i < that.initLen; i++) {
                var data = that.initData[i].data;
                that.initData[i].dataImg = [];
                for (var j = 0; j < data.length; j++) {
                  var dataMg = require('../../../assets/images/showHand/sola/' + data[j] + '.png');
                  that.initData[i].dataImg.push(dataMg);
                }
              }
            }
            //云顶炸金花
            if (that.colorId == 16) {
              for (var i = 0; i < that.initLen; i++) {
                var data = that.initData[i].data;
                that.initData[i].dataImg = [];
                for (var j = 0; j < data.length; j++) {
                  var dataMg = require('../../../assets/images/showHand/sola/' + data[j] + '.png');
                  that.initData[i].dataImg.push(dataMg);
                }
              }
            }
            //苏格兰农场
            if (that.colorId == 17) {
              for (var i = 0; i < that.initLen; i++) {
                var data = that.initData[i].data;
                that.initData[i].dataImg = [];
                for (var j = 0; j < data.length; j++) {
                  var dataMg = require('../../../assets/images/farm/' + data[j] + '.png');
                  that.initData[i].dataImg.push(dataMg);
                }
              }
            }
            //华夏牌九
            if (that.colorId == 19) {
              for (var i = 0; i < that.initLen; i++) {
                var data = that.initData[i].data;
                that.initData[i].dataImg = [];
                for (var j = 0; j < data.length; j++) {
                  var dataMg = require('../../../assets/images/paiGow/gzIcon/' + data[j] + '.png');
                  that.initData[i].dataImg.push(dataMg);
                }
              }
            }
            //皇家二八杠
            if (that.colorId == 20) {
              for (var i = 0; i < that.initLen; i++) {
                var data = that.initData[i].data;
                that.initData[i].dataImg = [];
                for (var j = 0; j < data.length; j++) {
                  var dataMg = require('../../../assets/images/Royal/img/' + data[j] + '.png');
                  that.initData[i].dataImg.push(dataMg);
                }
              }
            }
          } catch (error) {
          
          } finally {
            that.resultList = that.resultList.concat(that.initData || []);
            
            if (that.initData.length) {
              that.params.page++;
            }
            
            
            if (that.params.page === data.last_page && !that.initData.length) {
              that._Util.showAlert(that, {content: '已经没有更多数据了'});
            }
          }
        })
      },
      loadMore() {
        this.theLotteryInit();
      }
    }
  }
</script>
