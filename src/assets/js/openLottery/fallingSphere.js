var fallingSphere = ( function ( document, window ){
  // 设置样式函数
  function setStyle(argv) {
    for (var j in argv.style) {
      argv.obj.style[j] = argv.style[j];
    }
  }

  // 小球对象
  var fn_ball = function (argv) {
    this.argv = argv;
    this.style = {};
    this._format();
    this._style();
    this._create();
  };
  // 初始化一些属性
  fn_ball.prototype._format = function () {
    this.number = this.argv.number;	//小球号码
    this.left = this.argv.left;
    this.dur = this.argv.dur;	//动画执行时长
    this.transform = this.argv.transform;
  };

  // 设置小球样式
  fn_ball.prototype._style = function () {
    this.style.ball_style = {
      width:'1.5rem',
      height: '1.5rem',
      background: 'url(' + require('../../images/openLottery/canada/' + this.number + '.png') + ') no-repeat',
      // background: 'url(/static/openLottery/' + this.number + '.png) no-repeat',
      backgroundSize: '100% 100%',
      position: 'absolute',
      transition: 'all ease-in ' + this.dur + 's',
      top: 0,
      left: this.left,
      transform: this.transform
    };
  };
  // 创建小球
  fn_ball.prototype._create = function () {
    var ball = document.createElement('div');


    setStyle({obj: ball, style: this.style.ball_style});

    this.ves = ball;
  };

  // 主函数 插件对象
  var fn_main = function (argv) {
    if (!argv) return;
    this.argv = argv;
    this.style = {};
    this.createInterval = {};
    this.animTimeout = {};
    this._format();
    this._style();
    this._create();
  };
  // 初始化一些属性
  fn_main.prototype._format = function () {
    var screenW = window.innerWidth;
    this.el = this.argv.el;
    this.width = this.argv.width;
    this.height = this.argv.height;
    if (this.el == null || this.el == "") {
      return
    } else {
      this.fullWidth = this.width.substring(this.width.length - 1) == '%' ? this.el.offsetWidth * this.width.substring(0, this.width.length - 1) / 100 : this.height.substring(0, this.width.length - 2); //统一动画面板宽度为像素
      this.fullHeight = this.height.substring(this.height.length - 1) == '%' ? this.el.offsetHeight * this.height.substring(0, this.height.length - 1) / 100 : this.height.substring(0, this.height.length - 2);//统一动画面板高度为像素
    }
  };
  // 设置属性
  fn_main.prototype._style = function () {
    this.style.ves_style = {
      width: this.width,
      height: this.height,
      position: 'fixed',
      top: '100%',
      left: '0',
      background: 'rgba( 0, 0, 0, 0.5)',
      transition: 'top ease 0.2s',
      overflow: 'hidden'
    };
    this.style.plate_style = {
      background: 'url(' + require('../../images/openLottery/canada/plate.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      width: '3rem',
      height: '3rem',
      position: 'absolute',
      top: '60%',
      left: '50%',
      marginLeft: '-1.5rem',
      transition: 'top ease 0.3s',
      overflow: 'visible',
    };
  };
  // 创建节点，调用小球对象，并添加到dom中
  fn_main.prototype._create = function () {
    var ves = document.createElement('div'),
      btn = document.createElement('div'),
      plate = document.createElement('div');

    setStyle({obj: ves, style: this.style.ves_style});
    setStyle({obj: plate, style: this.style.plate_style});

    ves.appendChild(plate);

    this.plate = plate;
    this.ves = ves;
    if (this.el == null || this.el == "") {
      return
    } else {
      this.el.appendChild(ves);
    }

  };
  // 弹起动画面板
  fn_main.prototype._show = function (argv) {
    setStyle({obj: this.ves, style: argv});
    setStyle({obj: this.plate, style: this.style.plate_style});
  };
  // 收起动画面板
  fn_main.prototype.hide = function () {
    this.ves.style.top = '100%';
  };
  // 运行动画
  fn_main.prototype._run = function (argv, callback) {
    var _this = this,									//保存对象
      balls = [],
      bool_end = false,									//动画是否结束
      speed = parseInt(Math.random() * 200) + 100;	//随机创建小球速度
    //Begin 动画时长 4秒后设置bool_end为ture，动画结束
    this.animTimeout = setTimeout(function () {
      bool_end = true;
    }, 4000);
    //End 动画时长

    //Begin 创建节点 每个speed毫秒创建一个小球对象
    this.createInterval = setInterval(function () {
      // var count = Math.random () * 5;
      if (!bool_end) {
        var numb_Left = Math.random() * _this.fullWidth - 40;	//小球left
        var number = parseInt(Math.random() * 10);			//随机小球号码
        var obj_ball = new fn_ball({
          number: number,
          dur: 3,
          left: numb_Left < 0 ? numb_Left + 40 + 'px' : numb_Left + 'px',
          transform: 'rotate(' + parseInt(Math.random() * 180) + 'deg)'
        });
        _this.ves.appendChild(obj_ball.ves);
        setTimeout(function () {
          obj_ball.ves.style.top = _this.fullHeight + 'px';
        }, 20);
        obj_ball.ves.addEventListener('webkitTransitionEnd', function () {
          _this.ves.removeChild(this);
        });
      }
    }, speed);
    //End 创建节点

    //Begin 延时400毫秒创建结果小球
    setTimeout(function () {
      var index = 0,	//结果小球下标
        pos = [1, 0, 2];
      _this.resultInterval = setInterval(function () {
        var obj_ball = new fn_ball({
          number: argv[index],
          dur: 2,
          left: _this.plate.offsetLeft + pos[index] * 20 + 15 + 'px'
        });
        _this.ves.appendChild(obj_ball.ves);
        balls.push(obj_ball.ves);
        setTimeout((function () {
          var i = index;
          return function () {
            if (pos[i] == 1) {
              obj_ball.ves.style.top = _this.plate.offsetTop + 30 + 'px';
                obj_ball.ves.style.left = '45.5%';
                obj_ball.ves.style.zIndex = '999';
            } else {
              obj_ball.ves.style.top = _this.plate.offsetTop + 'px';
                obj_ball.ves.style.left = '50%';
            }
            if (pos[i] == 0) {
              obj_ball.ves.style.left = _this.plate.offsetLeft - 2 + 'px';
            }
          };
        })(), 20);
        index++;
        //如果小球下标 >= 结果列表数量(3)，则清除定时器
        if (index >= argv.length) {
          clearInterval(_this.resultInterval);
        }
        //如果小球下标为最后一个
        if (index > argv.length - 1) {
          //监听最后一个小球的过渡完成事件 //‘’落地反弹 back反弹返回原位 end收起小球 finish收起托盘
          obj_ball.ves.addEventListener('webkitTransitionEnd', (function () {
            var status = '';
            return function () {
              if (status == 'back') {
                this.style.transformOrigin = '0 100%';
                this.style.transform = 'rotate( 0 )';
                this.style.transition = 'all ease-in 0.5s';
                status = 'end';
                //如果状态为end，结果小球收到右上角
              } else if (status == 'end') {
                setTimeout(function () {
                  for (var i = 0, len = balls.length; i < len; i++) {
                    balls[i].style.top = '-40px';
                    balls[i].style.left = '100%';
                  }
                }, 500);
                status = 'finish';
                //如果状态为finish，收起托盘
              } else if (status == 'finish') {
                _this.plate.style.top = '100%';
                setTimeout(function () {
                  callback && callback();
                }, 1000)

              } else {
                var pos = parseInt(Math.random() * 2);	//随机反弹方向
                if (pos == 1) {
                  this.style.transformOrigin = '0 100%';
                  this.style.transform = 'rotate( -5deg )';
                  this.style.transition = 'all ease-out 0.5s';
                } else {
                  this.style.transformOrigin = '100% 100%';
                  this.style.transform = 'rotate( 5deg )';
                  this.style.transition = 'all ease-out 0.5s';
                }
                status = 'back';
              }
            }
          })(), false);
        } else {
          //监听其他结果小球过渡结束事件
          obj_ball.ves.addEventListener('webkitTransitionEnd', (function () {
            var status = '';
            return function () {
              if (status == 'back') {
                this.style.transformOrigin = '0 90%';
                this.style.transform = 'rotate( 0 )';
                this.style.transition = 'all ease-in 0.5s';
              } else {
                var pos = parseInt(Math.random() * 2);	//随机反弹方向
                if (pos == 1) {
                  this.style.transformOrigin = '0 90%';
                  this.style.transform = 'rotate( -5deg )';
                  this.style.transition = 'all ease-out 0.5s';
                } else {
                  this.style.transformOrigin = '90% 90%';
                  this.style.transform = 'rotate( 5deg )';
                  this.style.transition = 'all ease-out 0.5s';
                }
                status = 'back';
              }
            }
          })(), false);
        }
      }, 1000);
    }, 400);
    //End 延时400毫秒创建结果小球
  }

  return fn_main;
})( document, window );

var fallMan = function (argv) {
  return new fallingSphere(argv);
}

var fallRun = function (self, data, callback) {
  self._show({
	top: '15%'
  });
  self._run(data, callback);
};

export default {
  fallMan,
  fallRun
}