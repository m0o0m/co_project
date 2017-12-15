var first = 4;//第一个结果
var two = 4;//第二个结果
var three = 3;//第三个结果
var result = [first - 3, two - 3, three - 3];
var machine1 = $("#machine1").slotMachine({
	active: 0, //默认第一个
	delay: 800,
	randomize: function (activeElementIndex) {
		return result[0];
	}
});

var machine2 = $("#machine2").slotMachine({
	active: 0,//默认第二个
	delay: 800,
	randomize: function (activeElementIndex) {
		return result[1];
	}
});

var machine3 = $("#machine3").slotMachine({
	active: 0,//默认第三个
	delay: 800,
	randomize: function (activeElementIndex) {
		return result[2];
	}
});
function onComplete(active) {
	//摇奖结束
	$("#machine1 div").eq(first).css({ 'margin-bottom': "5px" }).find("img").css({ width: ".48rem" });
	$("#machine2 div").eq(two).css({ 'margin-bottom': "5px" }).find("img").css({ width: ".48rem" });
	$("#machine3 div").eq(three).css({ 'margin-bottom': "5px" }).find("img").css({ width: ".48rem" });

	$("#machine1 div").eq(first - 1).css({ 'margin-bottom': "5px" }).find("img").css({ opacity: ".8" });
	$("#machine1 div").eq(first + 1).find("img").css({ opacity: ".8" });
	$("#machine2 div").eq(two - 1).css({ 'margin-bottom': "5px" }).find("img").css({ opacity: ".8" });
	$("#machine2 div").eq(two + 1).find("img").css({ opacity: ".8" });
	$("#machine3 div").eq(three - 1).css({ 'margin-bottom': "5px" }).find("img").css({ opacity: ".8" });
	$("#machine3 div").eq(three + 1).find("img").css({ opacity: ".8" });
}
function start() {
	machine1.shuffle(5, onComplete);//旋转5次
	machine2.shuffle(5, onComplete);//旋转5次
	machine3.shuffle(5, onComplete);//旋转5次

}
$(function () {
	lxfEndtime();
	//开启滚动
	$(".gam-ok").click(function () {
		$(".slotMachineContainer div").attr("style", "");
		$(".slotMachineContainer img").attr("style", "");
		start();

	});

});
