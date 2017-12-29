<template>
  <div class="lineChart" style="position: relative;">

    <div class="chartMun">
      <div class="lineChart_title" v-if="$route.query.terminal">
        <p>{{title}}</p>
        <img src="../../assets/images/back.png" @click="_Util.back($router)">
      </div>
      <!--tab-->
      <nav class="chartNav chartFix"
           v-if="cid === 3 || cid === 15 || cid === 16 || cid === 18 ||cid === 4 || cid === 5 || cid === 6 || cid === 12 || cid === 14  || cid === 22 || cid === 23 || cid === 24">
        <li v-for="(nav,nav_index) in chartNav" :class="{'on': nav_index === chartId}"
            @click="tabNav(nav_index)"><p>{{nav}}</p></li>
      </nav>
      <!--no tab-->
      <nav class="chartNoNav chartFix"
           v-if="cid === 1 || cid === 2 || cid === 5 ||  cid === 23 || cid === 24 ||  cid === 13 ||cid === 14 ||cid === 22 || cid === 12 && chartId !== 2 || (cid === 3 && chartId !== 2) || cid === 21 || ((cid === 15 || cid === 16 || cid === 18)  && chartId !== 1)">
        <li v-for="(char,char_index) in chartSmallNav"
            :class="{'one': char_index === 0 ,'two': char_index > 0 }">{{char}}
        </li>
      </nav>
    </div>
    <!--<form id="form1" runat="server">-->
    <div id="chartForm">
      <div class="chartFormDiv">
        <div class="lineChart_titleIos"
             v-if="!$route.query.terminal && (cid === 5 || cid === 23 || cid === 24 || cid === 14 || cid === 22)"></div>
        <div class="lineChart_titleIos1"
             v-if="!$route.query.terminal && (cid === 1 || cid === 2 || cid === 13 || cid === 21 || ((cid === 15 || cid === 16 || cid === 18) && chartId == 1))"></div>
        <div class="lineChart_titleIos2" v-if="!$route.query.terminal && (cid === 3 || cid === 12)"></div>
        <div class="lineChart_titleIos3" v-if="!$route.query.terminal && (cid === 4 || cid === 6)"></div>
        <div class="lineChart_titleIos4"
             v-if="!$route.query.terminal && (((cid === 3 || cid === 12) && chartId < 2) || ((cid === 15 || cid === 16 || cid === 18) && chartId < 1))"></div>
        <div class="lineChart_titleIos5"
             v-if="!$route.query.terminal && ((cid === 3 || cid === 12) && chartId === 2)"></div>
        <div class="lineChart_titleIos6"
             v-if="!$route.query.terminal && (((cid === 15 || cid === 16 || cid === 18) && chartId === 1))"></div>
        <div class="chartColor"
             :class="{'chartColors': (cid === 15 && chartId === 1)  || (cid === 16 && chartId === 1) || (cid === 18&&chartId === 1)  }"
             v-if="cid !== 12 && cid !== 3 && chartData ">
          <!--线图-->
          <article class="chartArticle chartFix" v-for="(data,data_index) in chartData"
                   v-if="cid === 4 || cid === 5 || cid === 6 || cid === 14 || cid === 21 || cid === 22 || cid === 23 || cid === 24">
            <section><a href="#" style="color: #fff">{{data.number}}</a></section>
            <section>
              <article class="chartArt chartFix">
                <p v-for="num in chartNum" :class="{'on':((num-1)+chartIndex) == data.data}"><span>{{(num-1)+chartIndex}}</span>
                </p>
              </article>
            </section>
          </article>
          <!--大小单双-->
          <article class="chartDouble chartFix"
                   :class="{'chartDouble_yd': cid === 16 && chartId !== 1 || cid === 15 && chartId !== 1 || cid === 18 && chartId !== 1 }"
                   v-for="(dar,data_index) in chartDataNav"
                   v-if="cid === 1 || cid === 2 || cid ===  13|| cid === 16 && chartId !== 1|| cid === 15 && chartId !== 1|| cid === 18 && chartId !== 1">
            <p v-for="(v,v_index) in dar.data"
               :class="{'red': v_index === 1 && dar.color == 'red', 'blue': v_index === 1 && dar.color == 'blue' , 'green': v_index === 1 && dar.color == 'green', 'gray': v_index === 1 && dar.color == 'gray','one': v_index === 0, 'two': v_index > 0,'redBG': v_index === 1 && dar.color == '红','blackBG': v_index === 1 && dar.color == '黑','greenBG':cid===13 &&v_index === 1 && dar.color == ''}">
                            <span class='pai'
                                  v-if="cid === 16 && chartId === 0 && v_index > 0 && v_index < 4 || cid === 15  && chartId === 0 && v_index > 0 && v_index < 6 || cid === 18  && chartId === 0 && v_index > 0 && v_index < 6"><img
                                :src="require('../../assets/images/showHand/sola/'+v+'.png')" alt=""></span>
              <!--<span class='pai' v-if="" ><img :src="require('../../assets/images/showHand/sola/'+v+'.png')" alt=""></span>-->
              <span v-else><a href="#" style="color: #fff">{{v}}</a></span>
            </p>
          </article>
        </div>

        <!--香港六合彩-->
        <div class="chartColor" v-if="chartData">
          <!--号码-->
          <article class="chartArticle chartCombination chartFix" v-for="(colorNum,data_index) in chartData"
                   v-if="(cid === 12 || cid === 3) && chartId === 0 ">
            <section><a href="#" style="color: #fff">{{colorNum.number}}</a></section>
            <section class="combination chartFix">

              <p v-for="(v,v_index) in colorNum.data"
                 :class="{'red': colorNum.colors[v_index] == 'red', 'blue': colorNum.colors[v_index] == 'blue' , 'green': colorNum.colors[v_index] == 'green', 'gray': colorNum.colors[v_index] == 'gray',}">
                <span>{{v}}</span><span>{{colorNum.animals[v_index]}}</span></p>
            </section>
          </article>
          <!--总分-->
          <article class="chartDouble chartFix" v-for="(dar,data_index) in chartDataNav"
                   v-if="(cid === 12 || cid === 3) && chartId === 1 ">
            <p v-for="(v,v_index) in dar.data" :class="{'one': v_index === 0, 'two': v_index > 0}"><span><a href="#"
                                                                                                            style="color: #fff">{{v}}</a></span>
            </p>
          </article>
          <div class="chartDragon"
               v-if="(cid === 12 || cid === 3) && chartId === 2 || cid === 15 && chartId === 1|| cid === 16 && chartId === 1|| cid === 18 && chartId === 1">
            <div class="chartDragonMan chartFix" v-if="(cid === 12 || cid === 3) && chartId === 2 ">
              <div class="chartDragonLeft">
                <section class="chartDrgTop">期数</section>
                <section class="chartDrgNum">
                  <p v-for="n in chartDataNav"><a href="#" style="color: #fff">{{n.number}}</a></p>
                </section>
              </div>
              <!--style="overflow-x: scroll;"-->
              <div class="chartDragonRight">
                <article class="chartDrgArticle">
                  <section class="chartDrgNav">
                    <p v-for="c in chartSmallNav">{{c}}</p>
                  </section>
                  <section class="chartDrgContent">
                    <article class="chartDrgCls" v-for="(darNa,data_index) in chartDataNav">
                      <p v-for="(d,v_index) in darNa.data" :class="{'red': d == '龙' }">{{d}}</p>
                    </article>
                  </section>
                </article>
              </div>
            </div>
            <div class="chartDragonMan chartFix"
                 v-if="cid === 16 && chartId === 1 || cid === 15 && chartId === 1|| cid === 18 && chartId === 1 ">
              <div class="chartDragonLefts">
                <section class="chartDrgTop">期数</section>
                <section class="chartDrgNum">
                  <p v-for="n in chartDataNav"><a href="#" style="color: #fff">{{n.number}}</a></p>
                </section>
              </div>
              <div class="chartDragonRights">
                <article class="chartDrgArticle chartDrgArticles">
                  <section class="chartDrgNavs"
                           :class="{'chartDrgNav_mn':cid === 15 && chartId === 1 || cid === 18 && chartId === 1}">
                    <p v-for="c in chartSmallNav">{{c}}</p>
                  </section>
                  <section class="chartDrgContents">
                    <article class="chartDrgCls chartDrgClss "
                             :class="{'chartDrgClss_mn':cid === 15 && chartId === 1 || cid === 18 && chartId === 1}"
                             v-for="(darNa,data_index) in chartDataNav">
                      <p v-for="(d,v_index) in darNa.data" :class="{'red': d == '龙' }">{{d}}</p>
                    </article>
                  </section>
                </article>
              </div>
            </div>
          </div>
        </div>
        <!--</form>-->
        <canvas id="myCanvas" class="myCanvas"
                v-if="(cid === 4 || cid === 5 || cid === 6 || cid === 14 || cid === 21 || cid === 22 || cid === 23 || cid === 24) && chartData"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../assets/scss/trendChart/lineChart.scss';
  
  
  export default {
    data() {
      return {
        title: 'title',
        cid: parseInt(this.$route.query.lotteryId),
        chartNav: [],
        chartSmallNav: [],
        chartId: 0,
        chartNum: [],
        chartData: '',
        chartDataNav: [],
        successData: {
          id: 1,
          type: 1
        },
        chartIndex: 0
      }
    },
    mounted() {
      let that = this;
      switch (parseInt(that.$route.query.lotteryId)) {
        case 1:
          that.chartSmallNav = ["期号", "值", "大", "小", "单", "双", "小单", "大单", "小双", "大双"];
          that.title = "pc蛋蛋";
          break;
        case 2:
          that.chartSmallNav = ["期号", "值", "大", "小", "单", "双", "小单", "大单", "小双", "大双"];
          that.title = "加拿大28";
          break;
        case 3:
          that.chartNav = ["号码", "总分", "龙虎斗"];
          that.chartSmallNav = ["期数", "正一", "正二", "正三", "正四", "正五", "正六", "特码"];
          that.title = "香港新六合彩";
          break;
        case 4:
          that.chartNav = ["第一球", "第二球", "第三球"];
          that.chartNum = 6;
          that.chartIndex = 1;
          that.title = "江苏快三";
          break;
        case 5:
          that.chartNav = ["冠军", "亚军", "3", "4", "5", "6", "7", "8", "9", "10"];
          that.chartSmallNav = ["期数", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
          that.chartNum = 10;
          that.chartIndex = 1;
          that.title = "北京pk10";
          break;
        case 6:
          that.chartNav = ["万位", "千位", "百位", "个位", "十位"];
          that.chartNum = 10;
          that.chartIndex = 0;
          that.title = "重庆时时彩";
          break;
        case 12:
          that.chartNav = ["号码", "总分", "龙虎斗"];
          that.chartSmallNav = ["期数", "正一", "正二", "正三", "正四", "正五", "正六", "特码"];
          that.title = "香港六合彩";
          break;
        case 13:
          that.chartSmallNav = ["期数", "号码", "大", "小", "单", "双", "黑", "红"];
          that.title = "俄罗斯轮盘";
          break;
        case 14:
          that.chartNav = ["冠军", "亚军", "季军"];
          that.chartSmallNav = ["期数", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
          that.chartNum = 12;
          that.chartIndex = 1;
          that.title = "济州岛赛马";
          break;
        case 15:
          that.chartNav = ["号码", "龙虎斗"];
          that.chartSmallNav = ["期数", "第一张", "第二张", "第三张", "第四张", "第五张", "牌型"];
          that.title = "马尼拉梭哈";
          break;
        case 16:
          that.chartNav = ["号码", "龙虎斗"];
          that.chartSmallNav = ["期数", "第一张", "第二张", "第三张", "牌型"];
          that.title = "云顶炸金花";
          break;
        case 17:
          that.title = "苏格兰农场";
          break;
        case 18:
          that.chartNav = ["号码", "龙虎斗"];
          that.chartSmallNav = ["期数", "第一张", "第二张", "第三张", "第四张", "第五张", "牌型"];
          that.title = "PK牛牛";
          break;
        case 19:
          that.title = "华夏牌九";
          break;
        case 20:
          that.title = "皇家二八杠";
          break;
        case 21:
          that.chartSmallNav = ["期号", "开奖号码"];
          that.chartNum = 4;
          that.chartIndex = 1;
          that.title = "西部番摊";
          break;
        case 22:
          that.chartNav = ["金牌得主", "银牌得主", "铜牌得主"];
          that.chartSmallNav = ["期数", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
          that.chartNum = 12;
          that.chartIndex = 1;
          that.title = "泳神争霸";
          break;
        case 23:
          that.chartNav = ["正码一", "正码二", "正码三", "正码四", "正码五"];
          that.chartSmallNav = ["期数", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
          that.chartNum = 11;
          that.chartIndex = 1;
          that.title = "广东11选五";
          break;
        case 24:
          that.chartNav = ["第一球", "第二球", "第三球", "第四球", "第五球"];
          that.chartSmallNav = ["期数", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
          that.chartNum = 10;
          that.chartIndex = 0;
          that.title = "东京1.5分彩";
          break;
      }
      that.trendMapData();
      that.headerSpaceing();
      document.title = that.title;
      
    },
    methods: {
      tabNav(index) {
        this.chartData = "";
        this.chartId = index;
        this.successData.type = index + 1;
        this.trendMapData();
      },
      trendMapData() {
        var that = this;
        that.successData.id = that.$route.query.lotteryId;
        that._Util.post(that, that._Api.POST_TREND_CHART, that.successData, (data) => {
          let ln = data.data.length;
          that.chartData = data.data;
          //pc蛋蛋
          if (that.cid === 1 || that.cid === 2) {
            that.chartDataNav = [];
            for (var i = 0; i < ln; i++) {
              let big = data.data[i].big_small == '大' ? '大' : '',
                small = data.data[i].big_small == '小' ? '小' : '',
                single_double_d = data.data[i].single_double == "单" ? '单' : '',
                single_double_s = data.data[i].single_double == "双" ? '双' : '',
                single_double_small = data.data[i].big_small_single_double == "小单" ? '小单' : '',
                single_double_big = data.data[i].big_small_single_double == "大单" ? '大单' : '',
                single_double_bigs = data.data[i].big_small_single_double == "小双" ? '小双' : '',
                single_double_bigss = data.data[i].big_small_single_double == "大双" ? '大双' : '';
              let chartD = {
                data: [data.data[i].number, data.data[i].data, big, small, single_double_d, single_double_s, single_double_small, single_double_big, single_double_bigs, single_double_bigss],
                color: data.data[i].color
              };
              that.chartDataNav.push(chartD);
            }
          }
          /*香港六合彩*/
          if (that.cid === 12 || that.cid === 3) {
            switch (parseInt(that.chartId)) {
              case 0:
                that.chartSmallNav = ["期数", "正一", "正二", "正三", "正四", "正五", "正六", "特码"];
                break;
              case 1:
                that.chartSmallNav = ["期数", "总数", "大", "小", "单", "双"];
                that.chartDataNav = [];
                for (var i = 0; i < ln; i++) {
                  let big = data.data[i].big_small == '大' ? '大' : '',
                    small = data.data[i].big_small == '小' ? '小' : '',
                    single_double_d = data.data[i].single_double == "单" ? '单' : '',
                    single_double_s = data.data[i].single_double == "双" ? '双' : '';
                  let chartD = {
                    data: [data.data[i].number, data.data[i].sum, big, small, single_double_d, single_double_s]
                  };
                  that.chartDataNav.push(chartD);
                }
                break;
              case 2:
                that.chartSmallNav = ["1v2", "1v3", "1v4", "1v5", "1v6", "1v特", "2v3", "2v4", "2v5", "2v6", "2v特", "3v4", "3v5", "3v6", "3v特", "4v5", "4v6", "4v特", "5v6", "5v特", "6v特"];
                that.chartDataNav = [];
                for (var i = 0; i < ln; i++) {
                  let chartD = {
                    data: [
                      data.data[i].dragon_tiger_1v2,
                      data.data[i].dragon_tiger_1v3,
                      data.data[i].dragon_tiger_1v4,
                      data.data[i].dragon_tiger_1v5,
                      data.data[i].dragon_tiger_1v6,
                      data.data[i].dragon_tiger_1v7,
                      data.data[i].dragon_tiger_2v3,
                      data.data[i].dragon_tiger_2v4,
                      data.data[i].dragon_tiger_2v5,
                      data.data[i].dragon_tiger_2v6,
                      data.data[i].dragon_tiger_2v7,
                      data.data[i].dragon_tiger_3v4,
                      data.data[i].dragon_tiger_3v5,
                      data.data[i].dragon_tiger_3v6,
                      data.data[i].dragon_tiger_3v7,
                      data.data[i].dragon_tiger_4v5,
                      data.data[i].dragon_tiger_4v6,
                      data.data[i].dragon_tiger_4v7,
                      data.data[i].dragon_tiger_5v6,
                      data.data[i].dragon_tiger_5v7,
                      data.data[i].dragon_tiger_6v7
                    
                    ],
                    number: data.data[i].number
                  };
                  that.chartDataNav.push(chartD);
                }
                break;
            }
          }
          if (that.cid === 13) {
            that.chartDataNav = [];
            for (var i = 0; i < ln; i++) {
              let big = data.data[i].big_small == '大' ? '大' : '',
                small = data.data[i].big_small == '小' ? '小' : '',
                single_double_d = data.data[i].single_double == "单" ? '单' : '',
                single_double_s = data.data[i].single_double == "双" ? '双' : '',
                single_double_bigs = data.data[i].color == "黑" ? '黑' : '',
                single_double_bigss = data.data[i].color == "红" ? '红' : '';
//			                    single_double_small = data.data[i].big_small_single_double == "小单" ? '小单': '',
//			                    single_double_big = data.data[i].big_small_single_double == "大单" ? '大单': '',
//			                    single_double_bigs = data.data[i].big_small_single_double == "小双" ? '小双': '',
//			                    single_double_bigss = data.data[i].big_small_single_double == "大双" ? '大双': '';
              let chartD = {
                data: [data.data[i].number, data.data[i].data, big, small, single_double_d, single_double_s, single_double_bigs, single_double_bigss],
                color: data.data[i].color
              };
              that.chartDataNav.push(chartD);
            }
          }
          if (that.cid === 16) {
            switch (parseInt(that.chartId)) {
              case 0:
                that.chartSmallNav = ["期数", "第一张", "第二张", "第三张", "牌型"];
                that.chartDataNav = [];
                for (var i = 0; i < ln; i++) {
                  let chartD = {
                    data: [
                      data.data[i].number,
                      data.data[i].data[0],
                      data.data[i].data[1],
                      data.data[i].data[2],
                      data.data[i].type,
                    ],
                  };
                  that.chartDataNav.push(chartD);
                }
                break;
              case 1:
                that.chartSmallNav = ["第一张vs第二张", "第一张vs第三张", "第二张vs第三张"];
                that.chartDataNav = [];
                for (var i = 0; i < ln; i++) {
                  let chartD = {
                    data: [
                      data.data[i].dragon_tiger_1v2,
                      data.data[i].dragon_tiger_1v3,
                      data.data[i].dragon_tiger_2v3,
                    ],
                    number: data.data[i].number
                  };
                  that.chartDataNav.push(chartD);
                }
                break;
            }
          }
          if (that.cid === 15 || that.cid === 18) {
            switch (parseInt(that.chartId)) {
              case 0:
                that.chartSmallNav = ["期数", "第一张", "第二张", "第三张", "第四张", "第五张", "牌型"];
                that.chartDataNav = [];
                for (var i = 0; i < ln; i++) {
                  let chartD = {
                    data: [
                      data.data[i].number,
                      data.data[i].data[0],
                      data.data[i].data[1],
                      data.data[i].data[2],
                      data.data[i].data[3],
                      data.data[i].data[4],
                      data.data[i].type,
                    ],
                  };
                  that.chartDataNav.push(chartD);
                }
                break;
              case 1:
                that.chartSmallNav = ["1v2", "1v3", "1v4", "1v5", "2v3", "2v4", "2v5", "3v4", "3v5", "4v5"];
                that.chartDataNav = [];
                for (var i = 0; i < ln; i++) {
                  let chartD = {
                    data: [
                      data.data[i].dragon_tiger_1v2,
                      data.data[i].dragon_tiger_1v3,
                      data.data[i].dragon_tiger_1v4,
                      data.data[i].dragon_tiger_1v5,
                      data.data[i].dragon_tiger_2v3,
                      data.data[i].dragon_tiger_2v4,
                      data.data[i].dragon_tiger_2v5,
                      data.data[i].dragon_tiger_3v4,
                      data.data[i].dragon_tiger_3v5,
                      data.data[i].dragon_tiger_4v5,
                    ],
                    number: data.data[i].number
                  };
                  that.chartDataNav.push(chartD);
                }
                break;
            }
          }
          if (that.cid === 4 || that.cid === 5 || that.cid === 6 || that.cid === 14 || that.cid === 21 || that.cid === 22 || that.cid === 23 || that.cid === 24) {
            setTimeout(function () {
              that.elementUtil(ln);
            }, 10)
          }
          setTimeout(function () {
            that.headerSpaceing();
          }, 50);
        });
      },
      //元素
      elementUtil(index) {
        $("#chartForm").scrollTop(0)
        let myCanvas = document.getElementById("myCanvas");
        let myCanvasCtx = myCanvas.getContext("2d");
        myCanvas.width = $(window).width();
        myCanvas.height = $(".chartFormDiv").height() + $(".chartMun").height();
        let lineCanvasS = $(".chartMun").height();
        let _chartA = $('.chartArticle:eq(0) .chartArt p.on').find('span');
        let _chartXY = _chartA.offset();
        let u = 15;
        $(".myCanvas").css({
          "top": ($(window).height() * 0.02),
          "left": $(window).width() * 0.018
        });
        myCanvasCtx.moveTo(_chartXY.left + u, _chartXY.top);
        for (var i = 0; i < index; i++) {
          let chartA = $('.chartArticle:eq(' + i + ') .chartArt p.on').find('span');
          let chartXY = chartA.offset();
          myCanvasCtx.lineTo(chartXY.left + u, chartXY.top);
        }
        myCanvasCtx.lineWidth = 2;
        myCanvasCtx.strokeStyle = "#FDBB51";
        myCanvasCtx.stroke();
        this.simulationTop(myCanvas)
      },
      simulationTop(myCanvas) {
        let isTouched = false;
        let oldX = -1;
        //let oldY = -1;
        let $myCanvas = $("#myCanvas");
        let chartFormDiv = $(".chartFormDiv");
        $myCanvas.bind('mouseDown', function (e) {
          isTouched = true;
          oldX = e.clientX;
          //oldY = e.clientY;
        });
        $myCanvas.bind('mouseMove', function (e) {
          if (isTouched) {
            let deltaX = e.clientX - oldX;
            // let deltaY = e.clientY - oldY;
            oldX = e.clientX;
            //oldY = e.clientY;
            chartFormDiv.scrollLeft -= deltaX;
            // chartFormDiv.scrollTop -= deltaY;
          }
        });
        $myCanvas.bind('mouseUp', function (e) {
          isTouched = false;
          oldX = -1;
          // oldY = -1;
        });
      },
      //头部间距
      headerSpaceing() {
        let lineChart_title = $(".lineChart_title").height(),
          chartNav = $(".chartNav").height(),
          chartNoNav = $(".chartNoNav").height();
        chartNav = chartNav ? chartNav : 0;
        chartNoNav = chartNoNav ? chartNoNav : 0;
        $(".chartMun").css({
          "height": lineChart_title + chartNav + chartNoNav
        });
        $(".chartFormDiv").css({
          "padding-top": lineChart_title + chartNav + chartNoNav
        });
        let chartDrgNav = $(".chartDrgNav p").outerWidth(true);
        $(".chartDrgArticle").css({
          "width": this.chartSmallNav.length * (chartDrgNav + 1)
        });
        let chartDrgNavs = $(".chartDrgNavs p").outerWidth(true);
        $(".chartDragonRights .chartDrgArticle").css({
          "width": this.chartSmallNav.length * chartDrgNavs + 5
        });
        setTimeout(function () {
          let chartDragonLeft = $(".chartDragonLeft").height();
          $(".chartDragonRight").height(chartDragonLeft);
        }, 100);
        setTimeout(function () {
          let chartDragonLeft = $(".chartDragonLeft").height();
          $(".chartDragonRights").height(chartDragonLeft);
        }, 100);
      }
    }
  }
</script>
<style lang='scss'>

</style>
