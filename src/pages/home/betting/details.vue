<template>
  <div id="bgimg" class="lottery_Height betting_record_box" style="position: relative;">
    <div class="bgimg_title">
      投注详情
      <img src="../../../assets/images/icon_back2x.png" @click="_Util.back($router)"/>
    </div>
    <!--<button @click="changeSelect = !changeSelect">采种选择</button> -->
    <div class="betting_record_details">
      <div class="beimg_cls">
        <div class="beimg_clsMian">
          <div class="beimg_article">
            <section><img :src="betDeatImg"/></section>
            <section>
              <p class="colors">{{resultList.lottery_name}} <span class="datas">第{{resultList.action_no}}期</span></p>
              <p class="state">{{resultList.status_text}} <span
                  v-if="resultList.status_text != '未开奖' && resultList.bonus > 0 ">赢取￥{{resultList.bonus}}</span></p>
            </section>
          </div>
          <div class="beimg_list">
            <div class="beimg_list_title">订单详情</div>
            <div class="beimg_list_content">
              <section>
                <p>订单号</p>
                <p>{{resultList.order_id}}</p>
              </section>
              <section>
                <p>投注金额</p>
                <p>{{resultList.multiple}}</p>
              </section>
              <section>
                <p>投注注数</p>
                <p>{{resultList.action_num}}</p>
              </section>
              <section>
                <p>投注返点</p>
                <p>{{resultList.rebate}}%</p>
              </section>
              <section>
                <p>投注赔率</p>
                <p>{{resultList.odds}}</p>
              </section>
              <section>
                <p>投注时间</p>
                <p>{{resultList.action_time}}</p>
              </section>
              <section>
                <p>是否中奖</p>
                <p>
                  <span v-if="resultList.is_win == 1">是</span>
                  <span v-if="resultList.is_win == 0">否</span>
                </p>
              </section>
              <section>
                <p>玩法名称</p>
                <p>{{resultList.lottery_name}}-{{resultList.played_name}}</p>
              </section>
              <section>
                <p>投注号码</p>
                <p>{{resultList.action_data}}</p>
              </section>
            </div>
          </div>
          <div class="beimg_result" v-if="resultList.status_text != '未开奖' && resultList.status_text != '撤单'">
            <div class="beimg_result_title">开奖结果</div>
            <!--pc蛋蛋 加拿大幸运28-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 1 || resultList.lottery_id == 2">
              <article class="beimg_section pcddBeimg">
                <section>
                  <p v-for="(lotNo,index) in resultList.lottery_no"
                     :class="{'red':resultList.end_color == 'red' && index == 3 , 'green':resultList.end_color == 'green' && index == 3, 'blue':resultList.end_color == 'blue' && index == 3,'gray':resultList.end_color == 'gray' && index == 3}">
                    {{lotNo}}</p>
                </section>
              </article>
              <article class="beimg_articleed">
                <section>
                  <p>{{resultList.kj_result[0][0]}}</p>
                  <p>{{resultList.kj_result[0][1]}}</p>
                </section>
                <section>
                  <p class="beimgSec">
                    <span>{{resultList.kj_result[1][0]}}</span>
                    <span>{{resultList.kj_result[1][1]}}</span>
                    <span>{{resultList.kj_result[1][2]}}</span>
                    <span>{{resultList.kj_result[1][3]}}</span>
                  </p>
                  <p>
                    {{resultList.kj_result[1][4]}}
                  </p>
                </section>
              </article>
            </div>
            <!--北京pk10-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 5">
              <article class="result_bj_article">
                <section>
                  <p v-for="loty in resultList.lottery_no">{{loty}}</p>
                </section>
              </article>
              <article class="beimg_articleed beimg_articleed_jsk3">
                <section>
                  <p v-for="resu in resultList.kj_result[0]" style="width: 33.3%;">{{resu}}</p>
                </section>
                <section>
                  <p v-for="resus in resultList.kj_result[1]" style="width: 33.3%;">{{resus}}</p>
                </section>
              </article>
            </div>
            <!--香港新六合彩-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 3 || resultList.lottery_id == 12">
              <article class="beimg_section pcddBeimg xjlhcBeimg beImgSection_liu">
                <section>
                  <p v-for="(lotNo,index) in resultList.lottery_no"
                     :class="{'red':resultList.colors[index] == 'red', 'green':resultList.colors[index] == 'green', 'blue':resultList.colors[index] == 'blue','gray':resultList.colors[index] == 'gray'}">
                    <span>{{lotNo}}</span><span>{{resultList.animals[index]}}</span></p>
                  <!---->
                  <!--<p style="background: transparent;"><img :src="ZodiacImg"/></p>-->
                </section>
              </article>
              <article class="beimg_articleed beimg_articleed_xlhc">
                <section>
                  <p v-for="resu in resultList.kj_result[0]">{{resu}}</p>
                </section>
                <section>
                  <p v-for="resus in resultList.kj_result[1]">{{resus}}</p>
                </section>
              </article>
            </div>
            <!--江苏快三-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 4">
              <article class="beimg_section pcddBeimg jsk3Beimg">
                <section>
                  <p v-for="bone in boneIcon"><img :src="bone"/></p>
                </section>
              </article>
              <article class="beimg_articleed beimg_articleed_jsk3">
                <section>
                  <p v-for="resu in resultList.kj_result[0]">{{resu}}</p>
                </section>
                <section>
                  <p v-for="resus in resultList.kj_result[1]">{{resus}}</p>
                </section>
              </article>
            </div>
            <!--重庆时时彩-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 6">
              <article class="beimg_section">
                <section>
                  <p v-for="loty in resultList.lottery_no">{{loty}}</p>
                </section>
              </article>
              <article class="beimg_articleed beimg_articleed_jsk3">
                <section>
                  <p v-for="resu in resultList.kj_result[0]" style="width: 33.3%;">{{resu}}</p>
                </section>
                <section>
                  <p v-for="resus in resultList.kj_result[1]" style="width: 33.3%;">{{resus}}</p>
                </section>
              </article>
            </div>
            <!--济州岛赛马-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 14">
              <article class="beimg_section beimgArticle">
                <p v-for="resUmun in resultList.lottery_no" style="font-family: Arial;">{{resUmun}}</p>
              </article>
              <article class="beimg_articleed beimg_articleed_jsk3">
                <section>
                  <p v-for="resu in resultList.kj_result[0]" style="width: 33%;">{{resu}}</p>
                </section>
                <section class="beimgSpan">
                  <p style="width: 33%;">
                    <span style="width: 50%; text-align: center;">{{resultList.kj_result[1][0]}}</span><span
                      style="width: 50%; text-align: center;">{{resultList.kj_result[1][1]}}</span>
                  </p>
                  <p style="width: 33%;">
                  <span
                      style="width: 50%; text-align: center; display: inline-block">{{resultList.kj_result[1][2]}}</span><span
                      style="width: 50%; text-align: center; display: inline-block">{{resultList.kj_result[1][3]}}</span>
                  </p>
                  <p style="width: 33%;">
                  <span
                      style="width: 50%; text-align: center; display: inline-block">{{resultList.kj_result[1][4]}}</span><span
                      style="width: 50%; text-align: center; display: inline-block">{{resultList.kj_result[1][5]}}</span>
                  </p>
                </section>
              </article>
            </div>
            <!--马尼拉梭哈-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 15">
              <section class="beimg_section beimg_section_mnhsSection">
                <p v-for="bone in boneIcon"><img :src="bone"/></p>
              </section>
              <article class="beimg_articleed beimg_articleed_jsk3" v-if="resultList.kj_result.length != 0">
                <section>
                  <p v-for="resu in resultList.kj_result[0]">{{resu}}</p>
                </section>
                <section class="beimgSpan">
                  <p>
                    <span style="width: 50%; text-align: right;">{{resultList.kj_result[1][0]}}</span><span
                      style="width: 50%; text-align: left;">{{resultList.kj_result[1][1]}}</span>
                  </p>
                  <p>
                    <span>{{resultList.kj_result[1][2]}}</span><span>{{resultList.kj_result[1][3]}}</span>
                  </p>
                  <p>
                    <span>{{resultList.kj_result[1][4]}}</span><span>{{resultList.kj_result[1][5]}}</span>
                  </p>
                </section>
              </article>
            </div>
            <!--云顶炸金花-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 16">
              <section class="beimg_section beimg_section_mnhsSection">
                <p v-for="bone in boneIcon"><img :src="bone"/></p>
              </section>
            </div>
            <!--苏格兰农场-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 17">
              <section class="beimg_section beimgSection">
                <p><img src="../../../assets/images/farm/1.png"/></p>
                <p>大型水果</p>
              </section>
            </div>
            <!--PK牛牛-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 18">
              <section class="beimg_section beimg_section_mnhsSection">
                <p v-for="bone in boneIcon"><img :src="bone"/></p>
              </section>
            </div>
            <!--华夏牌九-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 19">
              <section class="beimg_section_hx">
                <p class="hxpjCls">
                  <em>
                    <span v-for="bone in boneIcon"><img :src="bone"/></span>
                  </em>
                  <em><span>庄家</span><span>初门</span><span>天门</span><span>末门</span></em>
                </p>
              </section>
            </div>
            <!--皇家二八杠-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 20">
              <section class="beimg_section_hx">
                <p class="hjrbgCls">
                  <em>
                    <span v-for="bone in boneIcon"><img :src="bone"/></span>
                  </em>
                  <em><span>庄家</span><span>初门</span><span>天门</span><span>末门</span></em>
                </p>
              </section>
            </div>
            <!--西部番摊-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 21">
              <section class="lootery_section_height">
                <p v-for="loty in resultList.lottery_no">{{loty}}</p>
              </section>
            </div>
            <!--俄罗斯大转盘-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 13">
              <section class="lootery_section_height lootery_section_height_01">
                <p v-for="loty in resultList.lottery_no">{{loty}}</p>
              </section>
            </div>
            <!--神勇争霸-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 22">
              <section class="beimgMunr_Sect">
                <p v-for="loty in resultList.lottery_no">{{loty}}</p>
              </section>
              <article class="beimg_articleed beimg_articleed_jsk3">
                <section>
                  <p v-for="resu in resultList.kj_result[0]" style="width: 33%;">{{resu}}</p>
                </section>
                <section class="beimgSpan">
                  <p style="width: 33%;">
                    <span style="width: 50%; text-align: center;">{{resultList.kj_result[1][0]}}</span><span
                      style="width: 50%; text-align: center;">{{resultList.kj_result[1][1]}}</span>
                  </p>
                  <p style="width: 33%;">
                  <span
                      style="width: 50%; text-align: center; display: inline-block">{{resultList.kj_result[1][2]}}</span><span
                      style="width: 50%; text-align: center; display: inline-block">{{resultList.kj_result[1][3]}}</span>
                  </p>
                  <p style="width: 33%;">
                  <span
                      style="width: 50%; text-align: center; display: inline-block">{{resultList.kj_result[1][4]}}</span><span
                      style="width: 50%; text-align: center; display: inline-block">{{resultList.kj_result[1][5]}}</span>
                  </p>
                </section>
              </article>
            </div>
            <!--广东11选5 信用-->
            <div class="beimgMunr" v-if="resultList.lottery_id == 23 || resultList.lottery_id == 24">
              <section class="beimgMunr_Sect">
                <p v-for="loty in resultList.lottery_no">{{loty}}</p>
              </section>
              <article class="beimg_articleed beimg_articleed_jsk3" v-if="resultList.lottery_id == 23">
                <section>
                  <p v-for="resu in resultList.kj_result[0]" style="width: 20%;">{{resu}}</p>
                </section>
                <section class="beimgSpan">
                  <p v-for="res in resultList.kj_result[1]" style="width: 20%;">{{res}}</p>
                </section>
              </article>
              <article class="beimg_articleed beimg_articleed_jsk3" v-if="resultList.lottery_id == 24">
                <section>
                  <p v-for="resu in resultList.kj_result[0]" style="width: 33.3%;">{{resu}}</p>
                </section>
                <section class="beimgSpan">
                  <p v-for="res in resultList.kj_result[1]" style="width: 33.3%;">{{res}}</p>
                </section>
              </article>
            </div>
      
          </div>
          <!--按钮-->
        </div>
      </div>
    </div>
    <div class="beimgPushBtn">
      <!--<p class="nextPushBtn" v-if="resultList.status_text == '未开奖'" @click="cancellationsCls"><a href="javascript:void(0)">撤单</a></p>-->
      <p class="nextPushBtn"><a href="javascript:void(0)" @click="noteToClick">再来一注</a></p>
    </div>
  </div>
</template>
<script type="text/babel">
//   import '../../../assets/scss/details.scss';
  import '../../../assets/scss/default.scss';
  
  export default {
    data() {
      return {
        resultList: '',
        changeSelect: false,
        betDetailsId: 0,
        betDeatImg: '',
        ZodiacImg: '',
        boneIcon: []
      }
    },
    
    mounted() {
      let that = this;
      that.betDetailsId = that.$route.query.id;
      that.initData();
//	  that.isok();
//      $(".betting_record_box").css({
//        height: $(window).height()*.78,
//      });
    },
    
    methods: {
      initData() {
        let that = this;
        that._Util.post(that, that._Api.POST_BETTING_DETAILS, {id: that.betDetailsId}, (data) => {
          that.resultList = data;
          console.log('--------------')
          console.log(that.resultList)
          that.betDeatImg = require('../../../assets/images/index/icon/' + that.resultList.lottery_id + '.png');
          if (that.resultList.lottery_id == '3') {
            //that.ZodiacImg = require('../../../assets/images/index/any/' + that.resultList.extfield + '.png');
          } else if (that.resultList.lottery_id == '4') {
            for (var i = 0; i < that.resultList.lottery_no.length; i++) {
              let boneImg = require('../../../assets/images/index/die/' + that.resultList.lottery_no[i] + '.png');
              that.boneIcon.push(boneImg);
            }
          } else if (that.resultList.lottery_id == '16') {
            for (var i = 0; i < that.resultList.lottery_no.length; i++) {
              let lotlist = require('../../../assets/images/showHand/sola/' + that.resultList.lottery_no[i] + '.png');
              that.boneIcon.push(lotlist);
            }
          } else if (that.resultList.lottery_id == '15') {
            for (var i = 0; i < that.resultList.lottery_no.length; i++) {
              let lotlist = require('../../../assets/images/showHand/sola/' + that.resultList.lottery_no[i] + '.png');
              that.boneIcon.push(lotlist);
            }
          } else if (that.resultList.lottery_id == '17') {
            for (var i = 0; i < that.resultList.lottery_no.length; i++) {
              let lotlist = require('../../../assets/images/showHand/sola/' + that.resultList.lottery_no[i] + '.png');
              that.boneIcon.push(lotlist);
            }
          } else if (that.resultList.lottery_id == '18') {
            for (var i = 0; i < that.resultList.lottery_no.length; i++) {
              let lotlist = require('../../../assets/images/showHand/sola/' + that.resultList.lottery_no[i] + '.png');
              that.boneIcon.push(lotlist);
            }
          } else if (that.resultList.lottery_id == '19') {
            for (var i = 0; i < that.resultList.lottery_no.length; i++) {
              let lotlist = require('../../../assets/images/paiGow/gzIcon/' + that.resultList.lottery_no[i] + '.png');
              that.boneIcon.push(lotlist);
            }
          } else if (that.resultList.lottery_id == '20') {
            for (var i = 0; i < that.resultList.lottery_no.length; i++) {
              let lotlist = require('../../../assets/images/Royal/img/' + that.resultList.lottery_no[i] + '.png');
              that.boneIcon.push(lotlist);
            }
            console.log('that.boneIcon');
            console.log(that.boneIcon);
          }
        });
      },
      cancellationsCls() {
        let that = this;
        that._Util.post(that, that._Api.POST_BETTING_CANCEL, {id: that.resultList.id}, (data) => {
          that._Util.showAlert(that, {
            content: "撤单成功"
          });
          window.location = window.location;
        })
      },
      noteToClick() {
        if (this.resultList.lottery_id <= 6 && this.resultList.lottery_id != 3) {
          this.$router.replace({'name': 'pcdd', query: {game: this.resultList.lottery_id}});
        } else {
          var chessHref = "";
          switch (parseInt(this.resultList.lottery_id)) {
            case 3:
              chessHref = 'XGNewslottery';
              break;
            case 12:
              chessHref = 'XGlottery';
              break;
            case 13:
              chessHref = 'turnTable';
              break;
            case 14:
              chessHref = 'racing';
              break;
            case 15:
              chessHref = 'showHand';
              break;
            case 16:
              chessHref = 'cloudTop';
              break;
            case 17:
              chessHref = 'farm';
              break;
            case 18:
              chessHref = 'pknn';
              break;
            case 19:
              chessHref = 'paiGow';
              break;
            case 20:
              chessHref = 'Royal';
              break;
            case 21:
              chessHref = 'western';
              break;
            case 22:
              chessHref = 'swim';
              break;
            case 23:
              chessHref = 'theColorGD';
              break;
            case 24:
              chessHref = 'theColor';
              break;
          }
          this.$router.replace({'name': chessHref});
        }
      }
      
    },
    components: {}
  }
</script>
