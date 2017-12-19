<template>
  <div class="lotteryRules">
    <div v-if="isBrowser" class="messageListTitle">
      <ul class="title">
        <li @click="_Util.back($router)"><a href="javascript: void(0);"></a></li>
        <li><h3>{{lotteryRulesTitle}}</h3></li>
      </ul>
    </div>
    <div class="lotteryRulesContent" :class="{showBrowser:!isBrowser}">
      <div class="lottery_rules_content_box">
        <div class="lottery_rules_content">
          <!--<h3 v-if="lotteryRulesTitle">{{lotteryRulesTitle}}</h3>-->
          <ul>
            <li v-for="(v,i) in questionAnswerList" :key="i">
              <p class="question" @click="allMessage(i,isShow)"><span>Q:</span>{{v.question}}<i class="arrow"
                                                                                                :class="{upArrow:isShow==i}"></i>
              </p>
              <div class="answer_box" v-show="isShow==i">
                <p class="answer" v-for="item in v.answer"><span>A:</span><s v-html="item"></s></p>
                <div v-if="v.ruleImgs&&lotteryId!=17" class="ruleImgs" :class="{paiGowImg:lotteryId==19}">
                  <div v-for="(value,index) in v.ruleImgs" :key="index" class="ruleImgItem">
                    <img :src="value.src" alt="">
                    <h4>{{value.title}}</h4>
                  </div>
                </div>
                <div v-if="v.ruleImgs&&lotteryId==17" class="farmRuleImgs">
                  <div v-for="(item,ind) in v.ruleImgs" class="farmRuleImgItem">
                    <!--<div class="farmImgItem" v-for="(val,ind) in value" :key="ind">
                      <h3 class="titleType">{{val.title}}</h3>
                      <div class="farmImgContent" v-for="(ImgItem,imgIndex)in val.data" :key="imgIndex">
                        <h4>{{ImgItem.num}}</h4>
                        <p>{{ImgItem.name}}</p>
                      </div>
                    </div>
                  </div>-->
                    <div class="farmImgItem" :class="{farmImgItem1:ind==3}" v-for="val in item">{{val}}</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="lotteryRulesFooter" v-if="footerContent">
            <h3>联系我们</h3>
            <p v-html="footerContent"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../assets/scss/rules/index.scss';
  import {rulesDate} from './rulesData';
  import $ from "jquery"
  
  export default {
    data() {
      return {
        questionAnswerList: [],
        lotteryRulesTitle: "",
        footerContent: "",
        isShow: 0,
        rulesImgs: [],
        lotteryId: -1,
        isBrowser: 0,
      }
    },
    mounted() {
      let that = this;
      that._Util.setCss('.lotteryRulesContent',{"height": 1},"*");
      that.init();
    },
    methods: {
      init() {
        let that = this;
        let lotteryId = that.$route.query.lotteryid;
        console.log("terminal:",that.$route.query.terminal);
        that.isBrowser = that.$route.query.terminal ? 1 : 0;
        that.lotteryId = lotteryId;
        console.log("lotteryId:", lotteryId);
        console.log("data:", rulesDate[lotteryId].data);
        that.questionAnswerList = rulesDate[lotteryId].data;
        that.lotteryRulesTitle = rulesDate[lotteryId].title;
        that.footerContent = rulesDate[lotteryId].footerdata.content;
        document.title = that.lotteryRulesTitle;
      },
      allMessage(index) {
        let that = this;
        let isShow;
        $(".question").next().stop().slideUp(500);
        $(".question").eq(index).next().stop().slideToggle(500);
        if($(".question").eq(index).find(".arrow").hasClass("upArrow")){
          $(".question").find(".arrow").removeClass("upArrow");
        }else{
          $(".question").find(".arrow").removeClass("upArrow");
          $(".question").eq(index).find(".arrow").addClass("upArrow");
        }
      },
    },
    components: {}
  }
</script>

<style lang="css" rel="styleheet/css" scoped>
  s {
    font-style: normal;
    text-decoration: none;
  }
</style>