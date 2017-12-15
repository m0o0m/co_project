<template>
    <div class="content">
        <div class="conter">
            <div class="close"></div>
            <!--关闭按钮-->
            <div class="icon">
                <div class="icon_bg"></div>
            </div>
            <div class="Period">
                第{{$parent.$refs.headerRef.actionResultCopy.number}}期
                开奖结果 {{$parent.$refs.headerRef.actionDataCopy[0]}}
            </div>
            <div class="basin">
                <div class="t_box">
                    <div class="box">
                        <div class="bean bean_1"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_2"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_3"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_4"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_5"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_6"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_7"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_8"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_9"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_10"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_11"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_12"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_13"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_14"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_15"></div>
                    </div>
                    <div class="box">
                        <div class="bean bean_16"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import '../../../assets/scss/drawCanada.scss'

  export default {
	props: {
	  creditId: {default: ''}
	},

	data() {
	  return {}
	},
	mounted() {
	  this.drawAlooteryFunction();
	},
	methods: {
	  drawAlooteryFunction: function () {
	    let that = this;
	    setTimeout(function () {
          that._Util.audioPlay(that, {fileName: 'fantan.mp3', audioPlay: true});
        }, 500);
		$(".conter").addClass("conter_t");
		//	延迟显示中奖号码
//		var n = 23456;//期数
        var m = that.$parent.$refs.headerRef.actionDataCopy[0];//数值范围：1~4
//		$(".Period").text("第" + n + "场 开奖结果： -");
//		setTimeout(function () {
//		  $(".Period").text("第" + n + "场 开奖结果： " + m);
//		}, 4000);
		//动画组
		setTimeout(function () {
		  $(".bean_1").addClass("bean1");
		  $(".box:nth-of-type(1)").addClass("box_1")
		}, 700);
		setTimeout(function () {
		  $(".bean_2").addClass("bean2");
		  $(".box:nth-of-type(2)").addClass("box_1")
		}, 900);
		setTimeout(function () {
		  $(".bean_3").addClass("bean3");
		  $(".box:nth-of-type(3)").addClass("box_1")
		}, 1100);
		setTimeout(function () {
		  $(".bean_4").addClass("bean4");
		  $(".box:nth-of-type(4)").addClass("box_1")
		}, 1300);
		setTimeout(function () {
		  $(".bean_5").addClass("bean5");
		  $(".box:nth-of-type(5)").addClass("box_1")
		}, 1500);
		setTimeout(function () {
		  $(".bean_6").addClass("bean6");
		  $(".box:nth-of-type(6)").addClass("box_1")
		}, 1700);
		setTimeout(function () {
		  $(".bean_7").addClass("bean7");
		  $(".box:nth-of-type(7)").addClass("box_1")
		}, 1900);
		setTimeout(function () {
		  $(".bean_8").addClass("bean8");
		  $(".box:nth-of-type(8)").addClass("box_1")
		}, 2100);
		setTimeout(function () {
		  $(".bean_9").addClass("bean9");
		  $(".box:nth-of-type(9)").addClass("box_1")
		}, 2300);
		setTimeout(function () {
		  $(".bean_10").addClass("bean10");
		  $(".box:nth-of-type(10)").addClass("box_1")
		}, 2500);
		setTimeout(function () {
		  $(".bean_11").addClass("bean11");
		  $(".box:nth-of-type(11)").addClass("box_1")
		}, 2700);
		setTimeout(function () {
		  $(".bean_12").addClass("bean12");
		  $(".box:nth-of-type(12)").addClass("box_1")
          that._Util.audioClose(that);
		}, 2900);
		//	关闭动画
		$(".close").click(function () {
		  $(".conter").addClass("conter_1");
          setTimeout(function () {
            $(".content").fadeOut('fast');
            setTimeout(function () {
              that.$parent.isOpenLottery = false;
            }, 1000);
          }, 600);
		});
		//中奖结果显示
		if (m == 1) {
		  $("div:nth-of-type(14)").addClass("clear");
		  $("div:nth-of-type(15)").addClass("clear");
		  $("div:nth-of-type(16)").addClass("clear");
		}
		else if (m == 2) {
		  $("div:nth-of-type(15)").addClass("clear");
		  $("div:nth-of-type(16)").addClass("clear");
		}
		else if (m == 3) {
		  $("div:nth-of-type(16)").addClass("clear");
		}
		else {
		  $("div").removeClass("clear");
		}

        setTimeout(function () {
          $(".close").click();
        }, 1000 * 4);
	  }
	}
  }
</script>