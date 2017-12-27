<template>
  <div class="lotteryMian">
    <div class="backPassTitle"><p>{{title}}</p></div>
    <div class="loginIcon flt arrowLeft" @click="$router.go(-1)"><a href="javascript:void(0)"></a></div>
    <div class="bettingDetails">
      <article class="betDetailsTitle displayFlex">
        <section>
          <firgue><img :src="betDeatImg"/></firgue>
        </section>
        <section>
          <p>{{resultList.lottery_name}} <span class="datas">第<i class="spanArial">{{resultList.action_no}}</i>期</span></p>
          <p>{{resultList.status_text}} <span
              v-if="resultList.status_text != '未开奖' && resultList.bonus > 0 ">赢取￥{{resultList.bonus}}</span></p>
        </section>
      </article>
      <article class="bettingContList">
        <aside>订单详情</aside>
        <div class="bettingDList">
          <section class="displayFlex">
            <p>订单号</p>
            <p class="spanArial">{{resultList.order_id}}</p>
          </section>
          <section class="displayFlex">
            <p>投注金额</p>
            <p class="spanArial">{{resultList.multiple}}</p>
          </section>
          <section class="displayFlex">
            <p>投注注数</p>
            <p class="spanArial">{{resultList.action_num}}</p>
          </section>
          <section class="displayFlex">
            <p>投注返点</p>
            <p class="spanArial">{{resultList.rebate}}%</p>
          </section>
          <section class="displayFlex">
            <p>投注赔率</p>
            <p class="spanArial">{{resultList.odds}}</p>
          </section>
          <section class="displayFlex">
            <p>投注时间</p>
            <p class="spanArial">{{resultList.action_time}}</p>
          </section>
          <section class="displayFlex">
            <p>是否中奖</p>
            <p>
              <span v-if="resultList.is_win == 1">是</span>
              <span v-if="resultList.is_win == 0">否</span>
            </p>
          </section>
          <section class="displayFlex">
            <p>玩法名称</p>
            <p>{{resultList.lottery_name}}-{{resultList.played_name}}</p>
          </section>
          <section class="displayFlex">
            <p>投注号码</p>
            <p class="spanArial">{{resultList.action_data}}</p>
          </section>
        </div>
      </article>
      <div class="lotteryDate bettingDraw" v-if="resultList.status_text != '未开奖' && resultList.status_text != '撤单'">
        <div class="bettingResultTitle">开奖结果</div>
        <ul>
          <li class="theLotteryList BackTransparent">
            <!--pcdd蛋蛋 加拿大幸运28-->
            <a href="javascript:void(0)" v-if="resultList.lottery_id === 1 || resultList.lottery_id === 2">
              <section class="theLotteryColor">
                <article class="theLotteryArticle nameArt04">
                  <p v-for="(lotNo,index) in resultList.lottery_no"
                     :class="{'red':resultList.end_color=='red' && index >= 3,'green':resultList.end_color=='green' && index >= 3,'blue':resultList.end_color=='blue' && index >= 3,'gray':resultList.end_color=='gray' && index >= 3}">
                    <span>{{lotNo}}</span></p>
                </article>
              </section>
              <article class="theLotteryEnd theLotteryPcdd">
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
            </a>
            <!--香港新六合彩-->
            <a href="javascript:void(0)" v-if="resultList.lottery_id == 3 || resultList.lottery_id == 12">
              <section class="theLotteryColor">
                <article class="theLotteryArticle nameArt05">
                  <p v-for="(lotNo,index) in resultList.lottery_no"
                     :class="{'red':resultList.colors[data_index]=='red','green':resultList.colors[data_index]=='green','blue':resultList.colors[data_index]=='blue','gray':resultList.colors[data_index]=='gray'}">
                    <span>{{lotNo}}</span><span class="Contact_cus">{{resultList.animals[data_index]}}</span></p>
                </article>
              </section>
              <article class="theLotteryFast">
                <section class="displayFlex">
                  <p v-for="resu in resultList.kj_result[0]">{{resu}}</p>
                </section>
                <section class="displayFlex">
                  <p v-for="resus in resultList.kj_result[1]">{{resus}}</p>
                </section>
              </article>
            </a>
            <!--江苏快三-->
            <a href="javascript:void(0)" v-if="parseInt(resultList.lottery_id) === 4">
              <section class="theLotteryColor">
                <article class="theLotteryArticle nameArt06">
                  <p v-for="bone in boneIcon"><img :src="bone"/></p>
                </article>
              </section>
              <article class="theLotteryFast">
                <section class="displayFlex">
                  <p v-for="resu in resultList.kj_result[0]">{{resu}}</p>
                </section>
                <section class="displayFlex">
                  <p v-for="resus in resultList.kj_result[1]">{{resus}}</p>
                </section>
              </article>
            </a>
            <!--北京PK10-->
            <!--重庆时时彩-->
            <!--泳神争霸-->
            <a href="javascript:void(0)" v-if="resultList.lottery_id == 5 || resultList.lottery_id == 6 || resultList.lottery_id == 22 || resultList.lottery_id == 23 || resultList.lottery_id == 24">
              <section class="theLotteryColor">
                <article class="theLotteryArticle" :class="{'nameArt07': resultList.lottery_id == 5 ,'nameArt03': resultList.lottery_id == 6, 'nameArt08': resultList.lottery_id == 22 || resultList.lottery_id == 23 || resultList.lottery_id == 24}">
                  <p v-for="loty in resultList.lottery_no"><span>{{loty}}</span></p>
                </article>
              </section>
              <article class="theLotteryFast">
                <section class="displayFlex">
                  <p v-for="resu in resultList.kj_result[0]">{{resu}}</p>
                </section>
                <section class="displayFlex">
                  <p v-for="resus in resultList.kj_result[1]">{{resus}}</p>
                </section>
              </article>
            </a>
            <!--俄罗斯大转盘-->
            <a href="javascript:void(0)" v-if="resultList.lottery_id == 13">
              <section class="theLotteryColor">
                <article class="theLotteryArticle nameArt01">
                  <p v-for="loty in resultList.lottery_no"
                     :class="{'red':resultList.end_color=='red','green':resultList.end_color=='green','black':resultList.end_color=='black'}">
                    <span>{{loty}}</span></p>
                </article>
              </section>
            </a>
            <!--济州岛赛马-->
            <a href="javascript:void(0)" v-if="resultList.lottery_id == 14">
              <section class="theLotteryColor">
                <article class="theLotteryArticle nameArt">
                  <p v-for="resUmun in resultList.lottery_no"><span>{{resUmun}}</span></p>
                </article>
              </section>
              <article class="theLotteryFast">
                <section class="displayFlex">
                  <p v-for="resu in resultList.kj_result[0]">{{resu}}</p>
                </section>
                <section class="displayFlex">
                  <p>
                    <span class="theLotterySpan boxSizing">{{resultList.kj_result[1][0]}}</span>
                    <span class="theLotterySpan boxSizing borderHiddenRight">{{resultList.kj_result[1][1]}}</span>
                  </p>
                  <p>
                    <span class="theLotterySpan boxSizing">{{resultList.kj_result[1][2]}}</span>
                    <span class="theLotterySpan boxSizing borderHiddenRight">{{resultList.kj_result[1][3]}}</span>
                  </p>
                  <p>
                    <span class="theLotterySpan boxSizing">{{resultList.kj_result[1][4]}}</span>
                    <span class="theLotterySpan boxSizing borderHiddenRight">{{resultList.kj_result[1][5]}}</span>
                  </p>
                </section>
              </article>
            </a>
            <!--马尼拉梭哈--><!--云顶炸金花-->
            <a href="javascript:void(0)" v-if="resultList.lottery_id == 15 || resultList.lottery_id == 16 || resultList.lottery_id == 18">
              <section class="theLotteryColor">
                <article class="theLotteryArticle">
                  <p v-for="bone in boneIcon" class="mnshImgCls"><img :src="bone"/></p>
                </article>
              </section>
            </a>
            <!--苏格兰农场-->
            <a href="javascript:void(0)" v-if="resultList.lottery_id == 17">
              <section class="theLotteryColor">
                <article class="theLotteryArticle">
                  <p class="sglncCls">
                    <span><img :src="boneIcon[0]"/></span>
                    <span>{{resultList.extfield}}</span>
                  </p>
                </article>
              </section>
            </a>
            <!--华夏牌九-->
            <a href="javascript:void(0)" v-if="resultList.lottery_id == 19 || resultList.lottery_id == 20">
              <section class="theLotteryColor">
                <article class="theLotteryArticle">
                  <p class="hxpjCls">
                    <em><span v-for="bone in boneIcon"><img :src="bone"/></span></em>
                    <em><span v-for="gows in gowtxtData">{{gows}}</span></em>
                  </p>
                </article>
              </section>
            </a>
            <!--西部番摊-->
            <a href="javascript:void(0)" v-if="resultList.lottery_id == 21">
              <section class="theLotteryColor">
                <article class="theLotteryArticle nameArt02">
                  <p v-for="loty in resultList.lottery_no"><span>{{loty}}</span></p>
                </article>
              </section>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="bettingScss">
      <!--<p class="nextPushBtn" v-if="resultList.status_text == '未开奖'" @click="cancellationsCls"><a href="javascript:void(0)">撤单</a></p>-->
      <p class="nextPushBtn"><a href="javascript:void(0)" @click="noteToClick">再来一注</a></p>
    </div>
  </div>
</template>
<script type="text/babel">
	//   import '../../../assets/scss/details.scss';
	// import '../../../assets/scss/default.scss';

	export default {
		data() {
			return {
				resultList: '',
				changeSelect: false,
				betDetailsId: 0,
				betDeatImg: '',
				ZodiacImg: '',
				boneIcon: [],
        title: '投注详情',
				gowtxtData: ['庄家', '初门', '天门', '末门'],
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
							let lotlist = require('../../../assets/images/farm/' + that.resultList.lottery_no[i] + '.png');
							that.boneIcon.push(lotlist);
							console.log(that.boneIcon);
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
