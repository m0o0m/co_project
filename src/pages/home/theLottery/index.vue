<template>
  <div class="lotteryMian">
    <div class="lotteryMun positionFixed indexJust">
      <section>
        <p>棋牌彩票已为用户赢得</p>
        <p>¥<span>{{lotteryMarry}}</span></p>
      </section>
    </div>
    <div class="lotteryDate">
      <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
        <ul>
          <li v-for="(lottery,index) in lotteryData" class="theLotteryList">
            <a href="javascript:void(0)" @click.stop="$router.push({name: 'theLotteryDetails', query: {id: lottery.id, name: lottery.name}})">
              <section class="theLotteryDate displayFlex">
                <p>{{lottery.name}}</p>
                <p class="commonArrowsRight">第<span>{{lottery.number}}</span>期</p>
              </section>
              <section class="theLotteryColor">
                <article class="theLotteryArticle"
                         :class="{'nameArt':lottery.id === 14,'nameArt01':lottery.id === 13,'nameArt02':lottery.id === 21,'nameArt03':lottery.id === 6,'nameArt04':lottery.id === 1 || lottery.id === 2,'nameArt05':lottery.id === 3 || lottery.id === 12,'nameArt06':lottery.id === 4,'nameArt07':lottery.id === 5,'nameArt08':lottery.id === 22 || lottery.id === 23 || lottery.id === 24}">
                  <p v-for="(dat,data_index) in lottery .data"
                     v-if="lottery.id !== 4 && lottery.id !== 3 && lottery.id !== 12 && lottery.id !== 15 && lottery.id !== 16 && lottery.id !== 18 && lottery.id !== 17 && lottery.id!==19 && lottery.id!==20"
                     :class="{'red':lottery.end_color=='red' && lottery.id <= 2 && data_index >= 3 || lottery.end_color=='red' && lottery.id == 3 && data_index == 0,'green':lottery.end_color=='green' && lottery.id <= 2 && data_index >= 3 ||lottery.end_color=='green' && lottery.id === 3 && data_index === 0,'blue':lottery.end_color=='blue' && lottery.id <= 2 && data_index >= 3 ||lottery.end_color=='blue' && lottery.id === 3 && data_index === 0,'gray':lottery.end_color=='gray' && lottery.id <= 2 && data_index >= 3 ||lottery.end_color=='gray' && lottery.id === 3 && data_index === 0}">
                    <span>{{dat}}</span></p>
                  <!--香港六合彩-->
                  <p v-for="(dat,data_index) in lottery.data" v-if="lottery.id === 3 || lottery.id === 12"
                     class="dataLoter"
                     :class="{'red':lottery.colors[data_index]=='red' && (lottery.id === 3 || lottery.id === 12),'green':lottery.colors[data_index]=='green' && (lottery.id === 3 || lottery.id === 12),'blue':lottery.colors[data_index]=='blue' && (lottery.id === 3 || lottery.id === 12),'gray':lottery.colors[data_index]=='gray' && (lottery.id === 3 || lottery.id === 12)}">
                    <span>{{dat}}</span><span
                      class="Contact_cus">{{lottery.animals[data_index]}}</span></p>
                  <!--<p v-if="lotter.id==3"><img :src="lotter.any"/></p>-->
                  <p v-if="lottery.id === 4" v-for="dat in jsksData"><img :src="dat"/></p>
                  <p v-if="lottery.id === 15" v-for="manila in manilaData" class="mnshImgCls"><img
                      :src="manila"/></p>
                  <p v-if="lottery.id === 16" v-for="ydzjhla in ydzjhData" class="mnshImgCls"><img
                      :src="ydzjhla"/></p>
                  <p v-if="lottery.id === 18" v-for="ydzjhla in pknnData" class="mnshImgCls"><img
                      :src="ydzjhla"/></p>
                  <p v-if="lottery.id === 17" class="sglncCls">
                    <span><img :src="lottery.extfield1"/></span>
                    <span>{{lottery.extfield}}</span>
                  </p>
                  <p v-if="lottery.id === 19" class="hxpjCls">
                    <em><span v-for="gow in gowData"><img :src="gow"/></span></em>
                    <em><span v-for="gows in gowtxtData">{{gows}}</span></em>
                  </p>
                  <p v-if="lottery.id === 20" class="hjrbgCls">
                    <em><span v-for="fkags in flagstaffData"><img :src="fkags"/></span></em>
                    <em><span v-for="gows in gowtxtData">{{gows}}</span></em>
                  </p>
                </article>
              </section>
            </a>
          </li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
          <!--↓-->
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }"></span>
          <span v-show="topStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
            </span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  //    import HomeFooter from '../../../components/HomeFooter'
  import '../../../assets/scss/default.scss'
  
  export default {
    data() {
      return {
        lotteryMarry: '0.00',
        resoutData: "",
        lotteryData: '',
        //江苏快三
        jsksData: [],
        //马尼拉梭哈数据
        manilaData: [],
        //云顶炸金花
        ydzjhData: [],
        //pk牛牛
        pknnData: [],
        //华夏牌九
        gowData: [],
        gowtxtData: ['庄家', '初门', '天门', '末门'],
        //皇家二八杠
        flagstaffData: [],
        topStatus: ''
      }
    },
    mounted() {
      this.analysisData();
      // this._Util.setCss('.lotteryMian',{"height": 1},"*");
      document.getElementsByClassName('lotteryDate')[0].addEventListener('touchstart', function (event) {
        event.target.classList.add('needsclick');
      })
    },
    computed: {},
    methods: {
      loadTop() {
        let that = this;
        that.analysisData();
        that.$refs.loadmore.onTopLoaded();
        
      },
      
      handleTopChange(status) {
        this.topStatus = status;
      },
      
      analysisData: function () {
        var that = this;
        that.jsksData = [];
        that.manilaData = [];
        that.ydzjhData = [];
        that.pknnData = [];
        that.gowData = [];
        that.flagstaffData = [];
        that._Util.post(that, that._Api.POST_LOTTERY, {}, (data) => {
          that.resoutData = data;
          that.lotteryMarry = that.resoutData.money;
          that.lotteryData = that.resoutData.lottery_list;
          console.log('that.lotteryData');
          console.log(that.lotteryData);
          for (var i = 0; i < that.lotteryData.length; i++) {
            var thatGroundId = parseInt(that.lotteryData[i].lottery_group_id);
            //香港六合彩
//                        if ( thatGroundId == 3 ) {
//                            var extfield = that.lotteryData[i].extfield;
//                            that.lotteryData[i].any = require('../../../assets/images/index/any/' + extfield + '.png');
//                            continue;
//                        }
            //江苏快三
            if (thatGroundId == 4) {
              var dataGround = that.lotteryData[i].data;
              
              for (var j = 0; j < dataGround.length; j++) {
                var dataStr = require('../../../assets/images/index/die/' + that.lotteryData[i].data[j] + '.png');
                that.jsksData.push(dataStr);
              }
              continue;
            }
            //马尼拉梭哈
            if (thatGroundId == 12) {
              var dataGround = that.lotteryData[i].data;
              for (var j = 0; j < dataGround.length; j++) {
                var str = require('../../../assets/images/showHand/sola/' + that.lotteryData[i].data[j] + '.png');
                that.manilaData.push(str);
              }
              continue;
            }
            //云顶炸金花
            if (thatGroundId == 13) {
              var dataGround = that.lotteryData[i].data;
              
              for (var j = 0; j < dataGround.length; j++) {
                var str = require('../../../assets/images/showHand/sola/' + that.lotteryData[i].data[j] + '.png');
                that.ydzjhData.push(str);
              }
              
              continue;
            }
            //pk牛牛
            if (thatGroundId == 15) {
              var dataGround = that.lotteryData[i].data;
              for (var j = 0; j < dataGround.length; j++) {
                var str = require('../../../assets/images/showHand/sola/' + that.lotteryData[i].data[j] + '.png');
                that.pknnData.push(str);
              }
              continue;
            }
            //苏格兰农场
            if (thatGroundId == 14) {
              var extfield1 = that.lotteryData[i].data[0],
                extfield = that.lotteryData[i].extfield;
              if (extfield1) {
                that.lotteryData[i].extfield1 = require('../../../assets/images/farm/' + extfield1 + '.png');
              }
              that.lotteryData[i].extfield = extfield;
              continue;
            }
            //华夏牌九
            if (thatGroundId == 16) {
              
              var dataGround = that.lotteryData[i].data;
              for (var j = 0; j < dataGround.length; j++) {
                var dataStr = require('../../../assets/images/paiGow/gzIcon/' + that.lotteryData[i].data[j] + '.png');
                that.gowData.push(dataStr);
              }
              continue;
            }
            //皇家二八杠
            if (thatGroundId == 17) {
              var dataGround = that.lotteryData[i].data;
              for (var j = 0; j < dataGround.length; j++) {
                var dataStr = require('../../../assets/images/Royal/img/' + that.lotteryData[i].data[j] + '.png');
                that.flagstaffData.push(dataStr);
              }
              continue;
            }
          }
          // that.$refs.loadmore.onTopLoaded();
        }, '', true);
      }
    },
    components: {
//            HomeFoter : HomeFooter
    },
    '$route'() {
//        if (this.$route.query.homeIndex == 1) {
//          this.analysisData();
//        }
    }
  }
</script>

<style lang="scss">

</style>