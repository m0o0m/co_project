var Sugar = {};
Sugar.layout = {};
Sugar.tools = {};
Sugar.layout.rem = (function (){

	return function (sugar_design_width,sugar_safe_width){		//design_width设计图宽度；safe_width安全宽度（默认320

		var sugar_eleHtml = document.getElementsByTagName('html')[0];		//获取hmtl标签

		//sugar_eleHtml.style.fontSize = sugar_screenWidth + 'px';		//初始化，为html标签fontSize赋值

		sugar_rem(sugar_design_width,sugar_safe_width,sugar_eleHtml);

		/*在屏幕尺寸改变时为html标签fontSize赋值*/
		window.addEventListener('resize',function (){
			return sugar_rem (sugar_design_width,sugar_safe_width,sugar_eleHtml);
		});

		return ;
	}

	function sugar_rem (sugar_design_width,sugar_safe_width,sugar_eleHtml){
		var sugar_screenWidth = window.innerWidth,		//获取屏幕宽度
			sugar_screenHeight = window.innerHeight;		//获取屏幕高度
					
		/*如果未定义设计图宽度的处理*/
		if(!sugar_design_width){
			throw new Error('设计图宽度，不可以或缺！');
		}else {
			var sugar_design_width = sugar_design_width;
		}

		/*如果未定义安全宽度的处理*/
		if(!sugar_safe_width){
			console.log('Sugar提示：页面安全宽度未设置，将采用默认值（320）');
			var sugar_safe_width = 320;
		}else {
			var sugar_safe_width = sugar_safe_width;
		}

		/*为html标签的fontSize赋值*/
		if(sugar_screenWidth <= sugar_safe_width){
			sugar_eleHtml.style.fontSize = sugar_screenWidth / sugar_design_width * 100 + 'px';
		}else {
			Sugar.tools.getStyle(sugar_eleHtml,'fontSize') == '100px' ? null : sugar_eleHtml.style.fontSize = '100px';
		}

		return ;

	}

	return ;

})();

Sugar.tools.getStyle = function (obj,attribute){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,null)[attribute];
	}else{
		return obj.currentStyle[attribute];
	}
}

