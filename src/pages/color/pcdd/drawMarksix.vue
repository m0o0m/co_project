<template>
    <div class="contentMark" v-if="drawMarksNum == 1">
        <div class="skip" @click="drawClick"></div>
        <div class="light"></div>
        <div class="color">17</div>
        <div class="left_box">
            <div class="zodiacDrawed"></div>
            <div class="roulette_l roulette">
                <div class="animal_1 tab"></div>
                <div class="animal_2 tab"></div>
                <div class="animal_3 tab"></div>
                <div class="animal_4 tab"></div>
                <div class="animal_5 tab"></div>
                <div class="animal_6 tab"></div>
            </div>
        </div>
        <div class="right_box">
            <div class="roulette_r roulette">
                <div class="animal_7 tab"></div>
                <div class="animal_8 tab"></div>
                <div class="animal_9 tab"></div>
                <div class="animal_10 tab"></div>
                <div class="animal_11 tab"></div>
                <div class="animal_12 tab"></div>
            </div>
        </div>
    </div>

</template>
<script type="text/babel">
  import '../../../assets/scss/drawAlottery.scss'
  import $ from 'jquery'

  export default {
	props: {
	  openLotteryResult: {default: ''}
	},

	data() {
	  return {
		drawMarksNum: 0,
		drawMarkColor: '',
		zodiac: [
		  {k: '1', v: '鼠'},
		  {k: '2', v: '牛'},
		  {k: '3', v: '虎'},
		  {k: '4', v: '兔'},
		  {k: '5', v: '龙'},
		  {k: '6', v: '蛇'},
		  {k: '7', v: '马'},
		  {k: '8', v: '羊'},
		  {k: '9', v: '猴'},
		  {k: '10', v: '鸡'},
		  {k: '11', v: '狗'},
		  {k: '12', v: '猪'},
		]
	  }
	},

	mounted() {
	  this.drawMethodsFun();
	},
	methods: {
	  drawMethodsFun: function () {
		let that = this;
		this.drawMarksNum = 1;
		$(".color").removeClass(this.drawMarkColor);
		//中间生肖动画
        console.log(that.matchZodiac(that.$parent.$refs.headerRef.actionResultCopy.animals));
		var n = that.matchZodiac(that.openLotteryResult.extfield);//数字为1~12，分别对应：鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪
		var num = that.openLotteryResult.data[0];//中奖号码；
		var color = that.openLotteryResult.end_color;//中奖号码颜色：红:red 绿:green 蓝:blue
		var mx = -(50 * n + 11 * 50);
		$(".zodiacDrawed").css("background-position", "" + mx + "px 0px");
		this.drawMarkColor = color;
		//轮盘显示动画(有些啰嗦但是效果比较好)
		if (n == "1") {
		  $(".animal_1").addClass("animal");
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 100);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 200);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 300);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 400);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 500);
		  setTimeout(function () {
			$(".animal_7").addClass("animal");
			$(".animal_6").removeClass("animal");
		  }, 600);
		  setTimeout(function () {
			$(".animal_8").addClass("animal");
			$(".animal_7").removeClass("animal");
		  }, 700);
		  setTimeout(function () {
			$(".animal_9").addClass("animal");
			$(".animal_8").removeClass("animal");
		  }, 800);
		  setTimeout(function () {
			$(".animal_10").addClass("animal");
			$(".animal_9").removeClass("animal");
		  }, 900);
		  setTimeout(function () {
			$(".animal_11").addClass("animal");
			$(".animal_10").removeClass("animal");
		  }, 1000);
		  setTimeout(function () {
			$(".animal_12").addClass("animal");
			$(".animal_11").removeClass("animal");
		  }, 1100);
		  setTimeout(function () {
			$(".animal_1").addClass("animal");
			$(".animal_12").removeClass("animal");
		  }, 1200);
		}
		if (n == "2") {
		  $(".animal_1").addClass("animal");
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 100);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 200);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 300);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 400);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 500);
		  setTimeout(function () {
			$(".animal_7").addClass("animal");
			$(".animal_6").removeClass("animal");
		  }, 600);
		  setTimeout(function () {
			$(".animal_8").addClass("animal");
			$(".animal_7").removeClass("animal");
		  }, 700);
		  setTimeout(function () {
			$(".animal_9").addClass("animal");
			$(".animal_8").removeClass("animal");
		  }, 800);
		  setTimeout(function () {
			$(".animal_10").addClass("animal");
			$(".animal_9").removeClass("animal");
		  }, 900);
		  setTimeout(function () {
			$(".animal_11").addClass("animal");
			$(".animal_10").removeClass("animal");
		  }, 1000);
		  setTimeout(function () {
			$(".animal_12").addClass("animal");
			$(".animal_11").removeClass("animal");
		  }, 1100);
		  setTimeout(function () {
			$(".animal_1").addClass("animal");
			$(".animal_12").removeClass("animal");
		  }, 1200);
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 1300);
		}
		if (n == "3") {
		  $(".animal_1").addClass("animal");
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 100);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 200);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 300);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 400);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 500);
		  setTimeout(function () {
			$(".animal_7").addClass("animal");
			$(".animal_6").removeClass("animal");
		  }, 600);
		  setTimeout(function () {
			$(".animal_8").addClass("animal");
			$(".animal_7").removeClass("animal");
		  }, 700);
		  setTimeout(function () {
			$(".animal_9").addClass("animal");
			$(".animal_8").removeClass("animal");
		  }, 800);
		  setTimeout(function () {
			$(".animal_10").addClass("animal");
			$(".animal_9").removeClass("animal");
		  }, 900);
		  setTimeout(function () {
			$(".animal_11").addClass("animal");
			$(".animal_10").removeClass("animal");
		  }, 1000);
		  setTimeout(function () {
			$(".animal_12").addClass("animal");
			$(".animal_11").removeClass("animal");
		  }, 1100);
		  setTimeout(function () {
			$(".animal_1").addClass("animal");
			$(".animal_12").removeClass("animal");
		  }, 1200);
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 1300);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 1400);
		}
		if (n == "4") {
		  $(".animal_1").addClass("animal");
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 100);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 200);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 300);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 400);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 500);
		  setTimeout(function () {
			$(".animal_7").addClass("animal");
			$(".animal_6").removeClass("animal");
		  }, 600);
		  setTimeout(function () {
			$(".animal_8").addClass("animal");
			$(".animal_7").removeClass("animal");
		  }, 700);
		  setTimeout(function () {
			$(".animal_9").addClass("animal");
			$(".animal_8").removeClass("animal");
		  }, 800);
		  setTimeout(function () {
			$(".animal_10").addClass("animal");
			$(".animal_9").removeClass("animal");
		  }, 900);
		  setTimeout(function () {
			$(".animal_11").addClass("animal");
			$(".animal_10").removeClass("animal");
		  }, 1000);
		  setTimeout(function () {
			$(".animal_12").addClass("animal");
			$(".animal_11").removeClass("animal");
		  }, 1100);
		  setTimeout(function () {
			$(".animal_1").addClass("animal");
			$(".animal_12").removeClass("animal");
		  }, 1200);
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 1300);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 1400);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 1500);
		}
		if (n == "5") {
		  $(".animal_1").addClass("animal");
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 100);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 200);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 300);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 400);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 500);
		  setTimeout(function () {
			$(".animal_7").addClass("animal");
			$(".animal_6").removeClass("animal");
		  }, 600);
		  setTimeout(function () {
			$(".animal_8").addClass("animal");
			$(".animal_7").removeClass("animal");
		  }, 700);
		  setTimeout(function () {
			$(".animal_9").addClass("animal");
			$(".animal_8").removeClass("animal");
		  }, 800);
		  setTimeout(function () {
			$(".animal_10").addClass("animal");
			$(".animal_9").removeClass("animal");
		  }, 900);
		  setTimeout(function () {
			$(".animal_11").addClass("animal");
			$(".animal_10").removeClass("animal");
		  }, 1000);
		  setTimeout(function () {
			$(".animal_12").addClass("animal");
			$(".animal_11").removeClass("animal");
		  }, 1100);
		  setTimeout(function () {
			$(".animal_1").addClass("animal");
			$(".animal_12").removeClass("animal");
		  }, 1200);
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 1300);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 1400);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 1500);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 1600);
		}
		if (n == "6") {
		  $(".animal_1").addClass("animal");
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 100);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 200);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 300);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 400);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 500);
		  setTimeout(function () {
			$(".animal_7").addClass("animal");
			$(".animal_6").removeClass("animal");
		  }, 600);
		  setTimeout(function () {
			$(".animal_8").addClass("animal");
			$(".animal_7").removeClass("animal");
		  }, 700);
		  setTimeout(function () {
			$(".animal_9").addClass("animal");
			$(".animal_8").removeClass("animal");
		  }, 800);
		  setTimeout(function () {
			$(".animal_10").addClass("animal");
			$(".animal_9").removeClass("animal");
		  }, 900);
		  setTimeout(function () {
			$(".animal_11").addClass("animal");
			$(".animal_10").removeClass("animal");
		  }, 1000);
		  setTimeout(function () {
			$(".animal_12").addClass("animal");
			$(".animal_11").removeClass("animal");
		  }, 1100);
		  setTimeout(function () {
			$(".animal_1").addClass("animal");
			$(".animal_12").removeClass("animal");
		  }, 1200);
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 1300);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 1400);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 1500);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 1600);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 1700);
		}
		if (n == "7") {
		  $(".animal_1").addClass("animal");
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 100);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 200);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 300);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 400);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 500);
		  setTimeout(function () {
			$(".animal_7").addClass("animal");
			$(".animal_6").removeClass("animal");
		  }, 600);
		  setTimeout(function () {
			$(".animal_8").addClass("animal");
			$(".animal_7").removeClass("animal");
		  }, 700);
		  setTimeout(function () {
			$(".animal_9").addClass("animal");
			$(".animal_8").removeClass("animal");
		  }, 800);
		  setTimeout(function () {
			$(".animal_10").addClass("animal");
			$(".animal_9").removeClass("animal");
		  }, 900);
		  setTimeout(function () {
			$(".animal_11").addClass("animal");
			$(".animal_10").removeClass("animal");
		  }, 1000);
		  setTimeout(function () {
			$(".animal_12").addClass("animal");
			$(".animal_11").removeClass("animal");
		  }, 1100);
		  setTimeout(function () {
			$(".animal_1").addClass("animal");
			$(".animal_12").removeClass("animal");
		  }, 1200);
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 1300);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 1400);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 1500);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 1600);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 1700);
		  setTimeout(function () {
			$(".animal_7").addClass("animal");
			$(".animal_6").removeClass("animal");
		  }, 1800);
		}
		if (n == "8") {
		  $(".animal_1").addClass("animal");
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 100);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 200);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 300);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 400);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 500);
		  setTimeout(function () {
			$(".animal_7").addClass("animal");
			$(".animal_6").removeClass("animal");
		  }, 600);
		  setTimeout(function () {
			$(".animal_8").addClass("animal");
			$(".animal_7").removeClass("animal");
		  }, 700);
		  setTimeout(function () {
			$(".animal_9").addClass("animal");
			$(".animal_8").removeClass("animal");
		  }, 800);
		  setTimeout(function () {
			$(".animal_10").addClass("animal");
			$(".animal_9").removeClass("animal");
		  }, 900);
		  setTimeout(function () {
			$(".animal_11").addClass("animal");
			$(".animal_10").removeClass("animal");
		  }, 1000);
		  setTimeout(function () {
			$(".animal_12").addClass("animal");
			$(".animal_11").removeClass("animal");
		  }, 1100);
		  setTimeout(function () {
			$(".animal_1").addClass("animal");
			$(".animal_12").removeClass("animal");
		  }, 1200);
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 1300);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 1400);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 1500);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 1600);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 1700);
		  setTimeout(function () {
			$(".animal_7").addClass("animal");
			$(".animal_6").removeClass("animal");
		  }, 1800);
		  setTimeout(function () {
			$(".animal_8").addClass("animal");
			$(".animal_7").removeClass("animal");
		  }, 1900);
		}
		if (n == "9") {
		  $(".animal_1").addClass("animal");
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 100);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 200);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 300);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 400);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 500);
		  setTimeout(function () {
			$(".animal_7").addClass("animal");
			$(".animal_6").removeClass("animal");
		  }, 600);
		  setTimeout(function () {
			$(".animal_8").addClass("animal");
			$(".animal_7").removeClass("animal");
		  }, 700);
		  setTimeout(function () {
			$(".animal_9").addClass("animal");
			$(".animal_8").removeClass("animal");
		  }, 800);
		}
		if (n == "10") {
		  $(".animal_1").addClass("animal");
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 100);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 200);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 300);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 400);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 500);
		  setTimeout(function () {
			$(".animal_7").addClass("animal");
			$(".animal_6").removeClass("animal");
		  }, 600);
		  setTimeout(function () {
			$(".animal_8").addClass("animal");
			$(".animal_7").removeClass("animal");
		  }, 700);
		  setTimeout(function () {
			$(".animal_9").addClass("animal");
			$(".animal_8").removeClass("animal");
		  }, 800);
		  setTimeout(function () {
			$(".animal_10").addClass("animal");
			$(".animal_9").removeClass("animal");
		  }, 900);
		}
		if (n == "11") {
		  $(".animal_1").addClass("animal");
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 100);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 200);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 300);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 400);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 500);
		  setTimeout(function () {
			$(".animal_7").addClass("animal");
			$(".animal_6").removeClass("animal");
		  }, 600);
		  setTimeout(function () {
			$(".animal_8").addClass("animal");
			$(".animal_7").removeClass("animal");
		  }, 700);
		  setTimeout(function () {
			$(".animal_9").addClass("animal");
			$(".animal_8").removeClass("animal");
		  }, 800);
		  setTimeout(function () {
			$(".animal_10").addClass("animal");
			$(".animal_9").removeClass("animal");
		  }, 900);
		  setTimeout(function () {
			$(".animal_11").addClass("animal");
			$(".animal_10").removeClass("animal");
		  }, 1000);
		}
		if (n == "12") {
		  $(".animal_1").addClass("animal");
		  setTimeout(function () {
			$(".animal_2").addClass("animal");
			$(".animal_1").removeClass("animal");
		  }, 100);
		  setTimeout(function () {
			$(".animal_3").addClass("animal");
			$(".animal_2").removeClass("animal");
		  }, 200);
		  setTimeout(function () {
			$(".animal_4").addClass("animal");
			$(".animal_3").removeClass("animal");
		  }, 300);
		  setTimeout(function () {
			$(".animal_5").addClass("animal");
			$(".animal_4").removeClass("animal");
		  }, 400);
		  setTimeout(function () {
			$(".animal_6").addClass("animal");
			$(".animal_5").removeClass("animal");
		  }, 500);
		  setTimeout(function () {
			$(".animal_7").addClass("animal");
			$(".animal_6").removeClass("animal");
		  }, 600);
		  setTimeout(function () {
			$(".animal_8").addClass("animal");
			$(".animal_7").removeClass("animal");
		  }, 700);
		  setTimeout(function () {
			$(".animal_9").addClass("animal");
			$(".animal_8").removeClass("animal");
		  }, 800);
		  setTimeout(function () {
			$(".animal_10").addClass("animal");
			$(".animal_9").removeClass("animal");
		  }, 900);
		  setTimeout(function () {
			$(".animal_11").addClass("animal");
			$(".animal_10").removeClass("animal");
		  }, 1000);
		  setTimeout(function () {
			$(".animal_12").addClass("animal");
			$(".animal_11").removeClass("animal");
		  }, 1100);
		}
		//开门动画
		setTimeout(function () {
		  $(".left_box").addClass("left_box_1");
		  $(".right_box").addClass("right_box_1");
		}, 2200);
		//中奖颜色及数字
		setTimeout(function () {
		  $(".color").addClass(color);
		  $(".color").html(num);
		}, 300);

	  },
	  drawClick: function () {
//            this.drawMarksNum = 0;
		this.$parent.$emit('closeDraw');
	  },

	  matchZodiac(str) {
		let num = 0;
		for (let i = 0, vo; vo = this.zodiac[i++];) {
		  if (str === vo.v) {
			num = vo.k;
			break;
		  }
		}
		return num;
	  }


	},
	components: {}
  }
</script>

