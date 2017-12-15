var anim_swin = ( function (){

	// 设置样式
	function setStyle( argv ){
		for ( var j in argv.style ){
			argv.obj.style[j] = argv.style[j];
		}
	}

	// 运动员构造函数
	var fn_sport = function ( argv ){
		this.argv = argv;
		this.style = {};
		this.ves = {};
		this.interval = {};
		this.status = 'first';
		this._format();
		this._style();
		this._create();
	};
	// 初始化一些属性
	fn_sport.prototype._format = function (){
		this.number = this.argv.number;
		this.width = this.argv.width;
		this.height = this.argv.height;
		this.top    = this.argv.top;
	};
	// css样式
	fn_sport.prototype._style = function (){
		this.style.ves_style = {
			// background: 'url( img/swim' + this.number + '/stop.png ) no-repeat',
			// backgroundSize: '100% 100%',
			width: this.width,
			height: this.height,
			position: 'absolute',
			left: '10%',
			top: this.top
		};
		this.style.obj_stop_style = {
			width: '100%',
			height: '100%'
		};
		this.style.obj_start_style = {
			width: '100%',
			height: '100%',
			display: 'none'
		};
		this.style.obj_swim_style = {
			width: '100%',
			height: '100%',
			display: 'none'
		};
		this.style.obj_quick_style = {
			width: '100%',
			height: '100%',
			display: 'none'
		};
	};
	// 创建运动员节点
	fn_sport.prototype._create = function (){
		var ves = document.createElement ( 'div' ),
			quick = document.createElement ( 'img' ),
			stop = document.createElement ( 'img' ),
			start = [],
			swim = [],
			_this = this;

    stop.setAttribute('src', require('../../../images/openLottery/swim/swim' + this.number + '/stop.png'));
		setStyle({ obj: stop, style: this.style.obj_stop_style });
		ves.appendChild ( stop );

    quick.setAttribute('src', require('../../../images/openLottery/swim/swim' + this.number + '/quick.png'));
		setStyle({ obj: quick, style: this.style.obj_quick_style });
		ves.appendChild ( quick );	

		for ( var i = 0; i < 4; i ++ ){
			var obj_start = document.createElement ( 'img' );
      obj_start.setAttribute('src', require('../../../images/openLottery/swim/swim' + this.number + '/start' + i + '.png'));

			setStyle({ obj: obj_start, style: this.style.obj_start_style });

			start.push ( obj_start );
			ves.appendChild ( obj_start );
		}
		for ( var j = 0; j < 7; j ++ ){
			var obj_swim = document.createElement ( 'img' );
      obj_swim.setAttribute('src', require('../../../images/openLottery/swim/swim' + this.number + '/swim' + j + '.png'));

			setStyle({ obj: obj_swim, style: this.style.obj_swim_style });

			swim.push ( obj_swim );
			ves.appendChild ( obj_swim );		
		}

		setStyle({ obj: ves, style: this.style.ves_style });

		this.stop = stop;
		this.start = start;
		this.quick = quick;
		this.swim = swim;
		this.ves = ves;
	};
	// 跳水
	fn_sport.prototype._start = function ( argv ){
		var _this = this,
			arm = argv,
			index = 1;
		_this.stop.style.display = 'none';
		_this.start[0].style.display = 'block';
		this.interval = setInterval ( function (){

			for ( var i = 0, len = _this.start.length; i < len; i ++ ){
				_this.start[i].style.display = 'none';
			}
			if ( index >= 4 ){
				_this.quick.style.display = 'block';
			} else {
				_this.start[index].style.display = 'block';
			}
			index ++ ;
		}, 120 );
		setTimeout ( function (){
			_this.ves.style.transition = 'left ease-in 0.5s';
			_this.ves.style.left = '30%';
		}, 0.5);
		this.arm = arm;
	};
	// 匀速
	fn_sport.prototype._swim = function (){
		var _this = this,
			index = 1;
		clearInterval ( this.interval );
		this.quick.style.display = 'none';
		this.swim[0].style.display = 'block';
		this.interval = setInterval ( function (){
			
			for ( var i = 0, len = _this.swim.length; i < len; i ++ ){
				_this.swim[i].style.display = 'none';
			}

			_this.swim[index].style.display = 'block';
			// _this.ves.style.background = 'url( img/swim' + _this.number + '/swim' + index + '.png ) no-repeat';
			// _this.ves.style.backgroundSize = '100% 100%';
			index ++;
			if ( index >= 6 ){
				index = 0;
			}
		}, 150 );

	};

	// 背景函数
	var fn_bg = function (){
		this.style = {};
		this._style();
		this._create();
	};
	// 样式
	fn_bg.prototype._style = function (){
		this.style.ves_style = {
			width: '100%',
			height: '100%',
			position: 'fixed',
			top: '0',
			left: '0',
      background: 'url(' + require('../../../images/openLottery/swim/bg.png') + ') no-repeat',
			backgroundSize: 'auto 100%',
			transition: 'all linear 4s',
			zIndex: '-1'
		}
	};
	// 创建背景节点
	fn_bg.prototype._create = function (){
		var ves = document.createElement ( 'div' );

		setStyle({ obj: ves, style: this.style.ves_style });

		this.ves = ves;
	};
	// 背景动画
	fn_bg.prototype._run = function (){
		this.ves.style.backgroundPosition = '100% 0';
	};


	// 结果弹窗构造函数
	var fn_result = function ( argv ){
		this.argv = argv;
		this.style = {};
		this.status = 'first';
		this._format();
		this._style();
		this._create();
	};
	// 初始化一些属性
	fn_result.prototype._format = function (){
		this.width = window.innerWidth * 0.9;
		this.height = this.width * 0.67;
		this.fullHeight = window.innerHeight;
		this.close = this.argv.close;
	};
	// 样式
	fn_result.prototype._style = function (){
		this.style.ves_style = {
			width: '100%',
			height: '100%',
			position: 'fixed',
			left: '0',
			top: '0',
			background: 'rgba( 0, 0, 0, 0.6)',
			display: 'none'
		};
		this.style.content_style = {
			position: 'absolute',
			width: this.width + 'px',
			height: this.height + 'px',
      background: 'url(' + require('../../../images/openLottery/swim/result.png') + ') no-repeat',
			backgroundSize: '100% 100%',
			left: '5%',
			// top: this.fullHeight * 0.5 + 'px',
			top: '50%',
			marginTop: - this.height * 0.5 + 'px',
			transition: 'all ease 0.3s',
			boxSizing: 'border-box',
			paddingTop: this.height * 0.25 + 'px',
			transform: 'scale( 0.5 )',
			opacity: '0'
		};
		this.style.first_style = {
			fontSize: this.height * 0.06 + 'px',
			lineHeight: this.height * 0.22 + 'px',
			textAlign: 'center'
		};
		this.style.second_style = {
			fontSize: this.height * 0.06 + 'px',
			lineHeight: this.height * 0.22 + 'px',
			textAlign: 'center'
		};
		this.style.third_style = {
			fontSize: this.height * 0.06 + 'px',
			lineHeight: this.height * 0.22 + 'px',
			textAlign: 'center'
		};
		this.style.close_style = {
			width: '30px',
			height: '30px',
      background: 'url(' + require('../../../images/openLottery/swim/close.png') + ') no-repeat',
			backgroundSize: '100% 100%',
			position: 'absolute',
			right: '10px',
			top: '10px'
		};
	};
	// 创建节点
	fn_result.prototype._create = function (){
		var ves = document.createElement ( 'div' ),
			content = document.createElement ( 'div' ),
			first = document.createElement ( 'div' ),
			second = document.createElement ( 'div' ),
			third = document.createElement ( 'div' ),
			close = document.createElement ( 'div' ),
			_this = this;

		setStyle({ obj: ves, style: this.style.ves_style });
		setStyle({ obj: content, style: this.style.content_style });
		setStyle({ obj: first, style: this.style.first_style });
		setStyle({ obj: second, style: this.style.second_style });
		setStyle({ obj: third, style: this.style.third_style });
		setStyle({ obj: close, style: this.style.close_style });

		close.addEventListener ( 'click', function (){
			_this._hide();
		}, false );

		content.addEventListener ( 'webkitTransitionEnd', function (){
			if ( _this.status == 'first' ){
				_this.content.style.transform = 'scale( 1 )';
				_this.content.style.transition = 'all ease-out 0.3s';
				_this.status = 'second';
			}
		}, false );

		content.appendChild ( first );
		content.appendChild ( second );
		content.appendChild ( third );
		content.appendChild ( close );
		ves.appendChild ( content );
		this.ves = ves;
		this.content = content;
		this.first = first;
		this.second = second;
		this.third = third;
	};
	// // 弹出弹窗
  fn_result.prototype._show = function (argv, callback) {
		var _this = this;
		this.ves.style.display = 'block';
		this.first.innerHTML = '第一名  ' + argv[0];
		this.second.innerHTML = '第二名  ' + argv[1];
		this.third.innerHTML = '第三名  ' + argv[2];
		setTimeout ( function (){
			_this.content.style.opacity = '1';
			_this.content.style.transform = 'scale( 1.05 )';

			setTimeout(function () {
			  callback && callback();
			}, 1000)
		}, 200 );
	};
	// 关闭弹窗
	fn_result.prototype._hide = function (){
		var _this = this;
		_this.content.style.opacity = '0';
		_this.content.style.transform = 'scale( 0.5 )';
		setTimeout ( function (){
			_this.ves.style.display = 'none';
			_this.close ? _this.close() : null;
		}, 300 );
	};

	// 主函数
	var fn_main = function ( argv ){
		this.argv = argv;
		this.style = {};
		this.bg    = {};
		this.sports = [];
		this._format();
		this._style();
		this._create();
	};
	// 初始化属性
	fn_main.prototype._format = function (){
		this.el = this.argv.el;
		this.fullHeight = this.el.offsetHeight;
		this.fullWidth = this.el.offsetWidth;
    // this.el.style.position = 'relative';
		this.el.style.overflow = 'hidden';
		this.close = this.argv.close;
	};
	// 样式
	fn_main.prototype._style = function (){
		this.style.ves_style = {
			width: '100%',
			height: '100%',
			position: 'absolute',
			left: '0',
			top: '0',
			zIndex: '-1',
			overflow: 'hidden'
		};
		this.style.snap_style = {
			transform : 'rotate( -10deg ) scale( 0.6 )',
			boxSizing: 'border-box',
			border: '3px solid #fff',
			transition: 'all ease 0.2s',
			zIndex: '0'
		};
		this.style.numb_style = {
			lineHeight: this.fullHeight / 12 + 'px',
			position: 'absolute',
			left: '60%',
			color: '#fff',
			opacity: '0.7'
		};
	};
	// 创建节点 new运动员，new 背景
	fn_main.prototype._create = function (){
		var sports = [],
			bg = new fn_bg(),
			ves = document.createElement ( 'div' );

		setStyle({ obj: ves, style: this.style.ves_style });

		this.bg = bg;
		ves.appendChild ( bg.ves );
    this.el.appendChild ( ves );
    this.ves = ves;

    var that = this;
    setTimeout(function () {
      for ( var i = 0, len = 12; i < len; i ++ ){
        var sport = new fn_sport({				// 创建运动员
          number: i + 1,						// 运动员号码
          width: that.fullHeight / 12 * 1.4 + 'px',	//宽度
          height: that.fullHeight / 12 * 0.7 + 'px',	// 高度
          top: that.fullHeight / 12 * i + that.fullHeight / 12 * 0.15 + 'px' //top
        });
        var numb = document.createElement ( 'span' );		// 创建泳道号码

        numb.innerHTML = i + 1;

        numb.style.top = that.fullHeight / 12 * i + 'px';
        setStyle({ obj: numb, style: that.style.numb_style });

        that.el.appendChild ( numb );
        ves.appendChild ( sport.ves );
        that.sports.push ( sport );
        // sportsTemp.push ( sport );
      }
      // that.sports = that.sports.concat(sportsTemp);
      that.el.appendChild ( ves );
      that.ves = ves;
    }, 500);


	};
	// 动画开始执行
	fn_main.prototype._run = function ( argv, callback){
		// this.bg._run();
		var _this = this,
			dis   = 82;
		for ( var i = 0, len = this.sports.length; i < len; i ++ ){
			_this.sports[i]._start( argv[i] );


			var firstV;
			var secondV;
			var thirdV,
				fourV;
      if (argv.indexOf(i + 1) >= 7) {
        firstV = ( 11 - argv.indexOf(i + 1)) * 6 - Math.random() * 40;
        secondV = ( 11 - argv.indexOf(i + 1)) * 3 - 40;
				thirdV = secondV;
				fourV  = thirdV + 20;
			} else {
        if (argv.indexOf(i + 1) != 0) {
					var dis = Math.random () * 2 > 1 ? 1 : -1,
						temp = Math.random () * 10;
          firstV = ( 11 - argv.indexOf(i + 1)) * 10 - 50;
					secondV = dis == 1 ? firstV + temp : firstV - temp;
					thirdV = dis == 1 ? secondV - temp : secondV + temp;
					fourV = thirdV + 10;
				} else {
					var dis = Math.random () * 2 > 1 ? 1 : -1,
						temp = Math.random () * 10
          firstV = ( 11 - argv.indexOf(i + 1)) * 10 - 50;
					secondV = dis == 1 ? firstV + temp : firstV - temp;
					thirdV = dis == 1 ? secondV - temp : secondV + temp;
					fourV = thirdV + 35;
				}
			}

			// 运动员动画
			_this.sports[i].ves.addEventListener ( 'webkitTransitionEnd', ( function (){
				var sportObj = _this.sports[i],
					fV      = firstV,
					sV      = secondV,
					index   = i,
					tV      = thirdV,
					foV      = fourV;
				return function (){
					if ( sportObj.status == 'first' ){
						_this.bg._run();
						sportObj._swim();
						sportObj.ves.style.transition = 'left ease-in 1.5s';
						sportObj.ves.style.left = fV + '%';
						sportObj.status = 'second';
					} else if ( sportObj.status == 'second' ){
						sportObj.ves.style.transition = 'left ease-in 1s';
						sportObj.ves.style.left = sV + '%';
						sportObj.status = 'third';
					} else if ( sportObj.status == 'third' ){
						sportObj.ves.style.transition = 'left ease-in 1s';
						sportObj.ves.style.left = tV + '%';
						sportObj.status = 'end';
					} else if ( sportObj.status == 'end' ){
						sportObj.ves.style.transition = 'left linear 0.5s';
						sportObj.ves.style.left = foV + '%';
						sportObj.status = 'exit';
					}
				};
			})(), false );

		}


		// 检测第一名到达终点
		var test = setInterval ( function (){
			var first = 0;
			for ( var i = 0, len = _this.sports.length; i < len; i ++ ){
				var temp = ( _this.sports[i].ves.offsetLeft + _this.fullHeight / 12 * 1.4 ) / _this.fullWidth * 100;
				if ( _this.sports[i].ves.offsetLeft > first ){
					first = _this.sports[i].ves.offsetLeft;			// 如果当前运动员left大于first，那么为first赋值为当前运动员left
				}
				if ( temp >= 95 ){

					//停止所有动画
					clearInterval ( test );
					for ( var i = 0, len = _this.sports.length; i < len; i ++ ){
						_this.sports[i].ves.style.transition = 'initial';
						_this.sports[i].ves.style.left = _this.sports[i].ves.offsetLeft + 'px';
						clearInterval ( _this.sports[i].interval );
					}

					// 创建快照
					var snap = _this.ves.cloneNode ( true ),
						numb = snap.getElementsByTagName ( 'span' ), // 获取快照中的泳道号码
						result = new fn_result({						//new弹窗对象
							close: _this.close
						});

					// 清除快照中的泳道号码
					for ( var i = 0, len = numb.length; i < len; i ++ ){
						snap.removeChild ( numb[i] )
					}

					// 延时200毫秒弹出快照，直接创建的节点不能执行动画，要等到渲染完，snap_style保存在主函数_style里
					setTimeout ( function (){
						setStyle({ obj: snap, style: _this.style.snap_style });
					}, 200 );

					// 快照弹窗动画回调，第一段结束 延时500毫秒，调用关闭函数，第二段结束 延时300毫秒弹出结果弹窗
					snap.addEventListener ( 'webkitTransitionEnd', (function (){
						var status = 'first';
						return function (){
							if ( status == 'first' ){
								setTimeout ( function (){
									snap.style.opacity = '0';
									snap.style.transform = 'rotate( -10deg ) scale( 0.3 )';
									status = 'second';
								}, 500 );
							} else if ( status == 'second' ){
								setTimeout ( function (){
                  result._show([argv[0], argv[1], argv[2]]);

                  callback && callback();
								}, 300 );
								status = 'third';
							}
						};
					})(), false );

					// 添加节点到视图中
					_this.el.appendChild ( snap );
					_this.el.appendChild ( result.ves );
				}
			}
		}, 40 );
	};

	return fn_main ;

})();
// var obj_anim = new anim_swin({
// 	el: document.getElementById ( 'content' ),							// 动画节点
// 	close: function (){													// 关闭结果动画后的回调函数
// 		// 回调函数
// 	}
// });
// var btn = document.getElementById ( 'btn' );
// btn.onclick = function (){
// 	obj_anim._run([ 0, 4, 3, 6, 11, 8, 9, 1, 2, 5, 10, 7 ]);			// 动画开始执行，里面是名次，从0开始，前三名为弹窗结果
// };

// 改样式在_style里面，构造函数里 _函数名 为函数，之外fn_函数名 为函数， 其他为变量

var fallMan = function (argv) {
  return new anim_swin(argv);
}

var fallRun = function (self, data, callback) {
  self._run(data, callback);
};

export default {
  fallMan,
  fallRun
}