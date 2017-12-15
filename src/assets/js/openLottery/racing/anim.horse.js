var anim_horse = ( function (){

	// 设置样式
	function setStyle( argv ){
		for ( var j in argv.style ){
			argv.obj.style[j] = argv.style[j];
		}
	}
	// 运动员构造函数
	var fn_horse = function ( argv ){
		this.argv = argv;
		this.style = {};
		this.ves = {};
		this.interval = {};
		this.index = 1;
		this.status = 'first';
		this._format();
		this._style();
		this._create();
	};
	// 初始化一些属性
	fn_horse.prototype._format = function (){
		this.number = this.argv.number;
		this.width = this.argv.width;
		this.height = this.argv.height;
		this.top    = this.argv.top;
		this.startCallBack = this.argv.startCallBack;
	};
	// css样式
	fn_horse.prototype._style = function (){
		this.style.ves_style = {
			width: this.width,
			height: this.height,
			position: 'absolute',
			left: 0,
			top: this.top
		};
		this.style.horse_style = {
			width: '100%',
			height: '100%',
			display: 'none'
		}
		this.style.stop_style = {
			width: '100%',
			height: '100%'
		};
	};
	// 创建运动员节点
	fn_horse.prototype._create = function (){
		var ves = document.createElement ( 'div' ),
			stop = document.createElement ( 'img' ),
			horse = [],
			_this = this;
    stop.setAttribute('src', require('../../../images/openLottery/racing/horse' + this.number + '.atlas/stop.png'));
		for ( var i = 0; i < 3; i ++ ){
			var horseObj = document.createElement ( 'img' );
      horseObj.setAttribute('src', require('../../../images/openLottery/racing/horse' + this.number + '.atlas/horse' + i + '.png'));
			setStyle({ obj: horseObj, style: this.style.horse_style });
			ves.appendChild ( horseObj );
			horse.push ( horseObj );
		}
		
		setStyle({ obj: stop, style: this.style.stop_style });
		setStyle({ obj: ves, style: this.style.ves_style });

		ves.appendChild ( stop );
		this.ves = ves;
		this.horse = horse;
		this.stop = stop;
	};
	// 起跑
	fn_horse.prototype._run = function ( argv ){
		var _this = this;
		clearInterval ( this.interval );
		this.stop.style.display = 'none';
		_this.horse[0].style.display = 'block';
		this.interval = setInterval ( function (){
			for ( var i = 0; i < 3; i ++ ){
				_this.horse[i].style.display = 'none';
			}
			_this.horse[_this.index].style.display = 'block';
			_this.index ++;
			if ( _this.index >= 3 ){
				_this.index = 0;
			}
		}, argv );
	};
	// 加速
	fn_horse.prototype._quick = function ( argv ){
		var _this = this;
		clearInterval ( this.interval );
		this.interval = setInterval ( function (){
			for ( var i = 0; i < 3; i ++ ){
				_this.horse[i].style.display = 'none';
			}
			_this.horse[_this.index].style.display = 'block';
			_this.index ++;
			if ( _this.index >= 3 ){
				_this.index = 0;
			}
		}, argv );
	};
	// 匀速
	fn_horse.prototype._auto = function ( argv ){
		var _this = this;
		clearInterval ( this.interval );
		this.interval = setInterval ( function (){
			for ( var i = 0; i < 3; i ++ ){
				_this.horse[i].style.display = 'none';
			}
			_this.horse[_this.index].style.display = 'block';
			_this.index ++;
			if ( _this.index >= 3 ){
				_this.index = 0;
			}
		}, argv );
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
      background: 'url(' + require('../../../images/openLottery/racing/bg.png') + ') no-repeat',
			backgroundSize: 'auto 100%',
			transition: 'all ease-in 4s',
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
      background: 'url(' + require('../../../images/openLottery/racing/result.png') + ') no-repeat',
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
      background: 'url(' + require('../../../images/openLottery/racing/close.png') + ') no-repeat',
			backgroundSize: '100% 100%',
			position: 'absolute',
			right: '10px',
			top: '10px'
		};
		this.style.result_horse_style = {
			width: this.width / 3 + 'px',
			height: this.width / 3 + 'px',
      background: 'url(' + require('../../../images/openLottery/racing/result_horse.png') + ') no-repeat',
			backgroundSize: '100% 100%',
			position: 'absolute',
			left: '50%',
			top: - this.width / 3 + 'px',
			marginLeft: - this.width / 6 + 'px'
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
			result_horse = document.createElement ( 'div' ),
			_this = this;

		setStyle({ obj: ves, style: this.style.ves_style });
		setStyle({ obj: content, style: this.style.content_style });
		setStyle({ obj: first, style: this.style.first_style });
		setStyle({ obj: second, style: this.style.second_style });
		setStyle({ obj: third, style: this.style.third_style });
		setStyle({ obj: close, style: this.style.close_style });
		setStyle({ obj: result_horse, style: this.style.result_horse_style });

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
		content.appendChild ( result_horse );
		ves.appendChild ( content );
		this.ves = ves;
		this.content = content;
		this.first = first;
		this.second = second;
		this.third = third;
	};
	// 弹出弹窗
	fn_result.prototype._show = function ( argv ){
		var _this = this;
		this.ves.style.display = 'block';
		this.first.innerHTML = '第一名  ' + argv[0];
		this.second.innerHTML = '第二名  ' + argv[1];
		this.third.innerHTML = '第三名  ' + argv[2];
		setTimeout ( function (){
			_this.content.style.opacity = '1';
			_this.content.style.transform = 'scale( 1.05 )';
		}, 200 );
	};
	// 关闭弹窗
	fn_result.prototype._hide = function ( argv ){
		var _this = this;
		_this.content.style.opacity = '0';
		_this.content.style.transform = 'scale( 0.5 )';
		setTimeout ( function (){
			_this.ves.style.display = 'none';
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
		this.callback = this.argv.callback;
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
    // this.ves = ves;

		var that = this;
		setTimeout(function() {
      for ( var i = 0, len = 12; i < len; i ++ ){
        var sport = new fn_horse({
          number: i + 1,
          width: that.fullHeight / 12 * 1.26 + 'px',
          height: that.fullHeight / 12 *0.7 + 'px',
          top: that.fullHeight / 12 * i + that.fullHeight * 0.3 / 12 * 0.5 + 'px',
          startCallBack: function (){
            bg._run();
          }
        });
        var numb = document.createElement ( 'span' );

        numb.innerHTML = i + 1;

        numb.style.top = that.fullHeight / 12 * i + 'px';
        setStyle({ obj: numb, style: that.style.numb_style });

        that.el.appendChild ( numb );
        ves.appendChild ( sport.ves );
        that.sports.push ( sport );
      }
      that.el.appendChild ( ves );
      that.ves = ves;
		}, 500);



	};
	// 动画开始执行
	fn_main.prototype._run = function ( argv, callback ){
		// this.bg._run();
		var _this = this,
			dis   = 82;
		setTimeout ( function (){
			_this.bg._run();
		}, 400 );
		for ( var i = 0, len = this.sports.length; i < len; i ++ ){
      if (argv.indexOf(i + 1) <= 2) {
        _this.sports[i].ves.style.left = ( 11 - argv.indexOf(i + 1)) * 5 + '%';
				_this.sports[i].ves.style.transition = 'left ease-out 3s';
        var startV = ( 11 - argv.indexOf(i + 1)) * 5;
        _this.sports[i]._run(argv.indexOf(i + 1) * 5 + 100);
				setTimeout (( function (){
					var sV = startV,
						index = i,
						obj = _this.sports[i];
					return function (){
            obj.ves.style.left = ( 11 - argv.indexOf(index + 1)) * 4 + '%';
						obj.ves.style.transition = 'left ease 2s';
						setTimeout ( function (){
							var temp = Math.random () * 2 > 1 ? 1 : 0;
              if (argv.indexOf(index + 1) == 0) {
								setTimeout ( function (){
                  obj._quick(argv.indexOf(index + 1) * 5 + 100);
									obj.ves.style.left = sV + 3 + '%';
									obj.ves.style.transition = 'left ease 1.5s';
								}, 500 );
								setTimeout ( function (){
									obj.ves.style.left = sV + 3 + '%';
									obj.ves.style.transition = 'left linear 0.9s';
								}, 2000 );
              } else if (argv.indexOf(index + 1) == 1) {
								setTimeout ( function (){
									obj.ves.style.left = sV + 5 + '%';
									obj.ves.style.transition = 'left linear 1.5s';
                  obj._quick(argv.indexOf(index + 1) * 5 + 100);
									setTimeout ( function (){
										obj.ves.style.left = sV - Math.random () * 5 - 3 + '%';
										obj.ves.style.transition = 'left ease 0.9s';
                    obj._auto(argv.indexOf(index + 1) * 5 + 120);
									}, 1000 );
								}, 1000 );
							} else {
								obj.ves.style.left = sV + 5 + '%';
								obj.ves.style.transition = 'left ease 1.5s';
                obj._quick(argv.indexOf(index + 1) * 5 + 100);
								setTimeout ( function (){
									obj.ves.style.left = sV - Math.random () * 5 - 3 + '%';
									obj.ves.style.transition = 'left linear 0.9s';
                  obj._auto(argv.indexOf(index + 1) * 5 + 120);
								}, 1000 );
							}
							setTimeout ( function (){
								obj.ves.style.transition = 'left linear 0.8s';
								obj.ves.style.left = sV + 100 + '%';
							}, 2500 );
						}, 1000 );
					};
				})(), 1000 );
			} else {
        _this.sports[i].ves.style.left = ( 11 - argv.indexOf(i + 1)) * 4 + 20 + '%';
				_this.sports[i].ves.style.transition = 'left ease 2s';
        var startV = ( 11 - argv.indexOf(i + 1)) * 4;
        _this.sports[i]._run(argv.indexOf(i + 1) * 5 + 120);
				setTimeout (( function (){
					var status = false,
						sV = startV,
						index = i,
						obj = _this.sports[i];
					return function (){
						if ( status ){
							return;
						}
            var cur = ( 11 - argv.indexOf(index + 1)) * 4 - Math.random() * 30;
						obj.ves.style.left = cur + '%';
						obj.ves.style.transition = 'left ease 2s';
						setTimeout ( function (){
							var temp = Math.random () * 2 > 1 ? 1 : 0;
							if ( temp == 1 ){
                if (argv.indexOf(index + 1) / 2 == 0) {
									obj.ves.style.left = cur + 10 + '%';
                  obj._quick(argv.indexOf(index + 1) * 5 + 110);
									obj.ves.style.transition = 'left ease 3s';
									setTimeout ( function (){
                    obj._auto(argv.indexOf(index + 1) * 5 + 120);
										obj.ves.style.left = cur - Math.random () * 10 - 3 + '%';
										obj.ves.style.transition = 'left linear 3s';
									}, 1000 );
								}
							} else {
								obj.ves.style.left = cur + 10 + '%';
								obj.ves.style.transition = 'left ease 3s';
                obj._quick(argv.indexOf(index + 1) * 5 + 110);
								setTimeout ( function (){
									obj.ves.style.left = cur - Math.random () * 5 - 3 + '%';
									obj.ves.style.transition = 'left linear 0.9s';
                  obj._auto(argv.indexOf(index + 1) * 5 + 140);
								}, 1000 );
							}
							setTimeout ( function (){
								obj.ves.style.transition = 'left linear 3s';
								obj.ves.style.left = sV + 200 + '%';
							}, 2500 );
						}, 1000 );
					};
				})(), 1000 );
			}
		};
		// 检测第一名到达终点
		var test = setInterval ( function (){
			var first = 0,
				index = 0;
			for ( var i = 0, len = _this.sports.length; i < len; i ++ ){
				var temp = ( _this.sports[i].ves.offsetLeft + _this.fullHeight / 12 * 1.4 ) / _this.fullWidth * 100;
				if ( _this.sports[i].ves.offsetLeft > first ){
					first = _this.sports[i].ves.offsetLeft;			// 如果当前运动员left大于first，那么为first赋值为当前运动员left
					index = i;
				}
				if ( temp >= 100 ){
					clearInterval ( test );
					//停止所有动画
					for ( var i = 0, len = _this.sports.length; i < len; i ++ ){
						_this.sports[i].ves.style.transition = 'initial';
						_this.sports[i].ves.style.left = _this.sports[i].ves.offsetLeft + 'px';
						clearInterval ( _this.sports[i].interval );
					}
					_this.bg.ves.style.transition = 'initial';
					_this.bg.ves.style.left = _this.bg.ves.offsetLeft + 'px';

					// 创建快照
					var snap = _this.ves.cloneNode ( true ),
						numb = snap.getElementsByTagName ( 'span' ),	 // 获取快照中的泳道号码
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
								}, 600 );
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
// var obj_anim = new anim_horse({
// 	el: document.getElementById ( 'content' ),		// 动画节点
//
// });
// var btn = document.getElementById ( 'btn' );
// btn.onclick = function (){
// 	obj_anim._run([ 0, 4, 3, 6, 11, 8, 9, 1, 2, 5, 10, 7 ]);			// 动画开始执行，里面是名次，从0开始，前三名为弹窗结果
// };
// 改样式在_style里面，构造函数里 _函数名 为函数，之外fn_函数名 为函数， 其他为变量

var fallMan = function (argv) {
  return new anim_horse(argv);
}

var fallRun = function (self, data, callback) {
  self._run(data, callback);
};

export default {
  fallMan,
  fallRun
}