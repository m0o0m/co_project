<template>

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
