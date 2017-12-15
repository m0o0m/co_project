var anim_racing = ( function (){

  // 设置样式
  function setStyle(argv) {
    for (var j in argv.style) {
      argv.obj.style[j] = argv.style[j];
    }
  }

  // 赛车
  var fn_car = function (argv) {
    this.argv = argv;
    this.style = {};
    this.ves = {};
    this.interval = {};
    this.status = 'first';
    this._format();
    this._style();
    this._create();
  };
  // 初始化属性
  fn_car.prototype._format = function () {
    this.number = this.argv.number;
    this.width = this.argv.width;
    this.height = this.argv.height;
    this.top = this.argv.top;
    this.startCallBack = this.argv.startCallBack;
  };
  // 样式
  fn_car.prototype._style = function () {
    this.style.ves_style = {
      background: 'url(' + require('../../../images/openLottery/pk10/' + this.number + 'car.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      width: this.width + 'px',
      height: this.height + 'px',
      position: 'absolute',
      left: '0',
      top: this.top
    };
    this.style.gas_style = {
      width: '50%',
      height: '50%',
      position: 'absolute',
      right: '100%',
      top: '25%'
    };
  };
  // 创建节点
  fn_car.prototype._create = function () {
    var ves = document.createElement('div'),
      gas = document.createElement('div'),
      _this = this;

    setStyle({obj: ves, style: this.style.ves_style});
    setStyle({obj: gas, style: this.style.gas_style});

    ves.appendChild(gas);
    this.gas = gas;
    this.ves = ves;
  };
  // 加速
  fn_car.prototype._quick = function () {
    var index = 0,
      _this = this;
    clearInterval(this.interval);
    this.interval = setInterval(function () {
      _this.gas.style.background = 'url(' + require('../../../images/openLottery/pk10/gas' + index + '.png') + ') no-repeat';
      _this.gas.style.backgroundSize = '100% 100%';
      index++;
      if (index >= 4) {
        index = 0;
      }
    }, 40);
  };
  // 起跑
  fn_car.prototype._start = function () {
    this.ves.style.left = '5%';
    this.ves.style.transition = 'all ease-in 1s';
  };
  // 匀速
  fn_car.prototype._auto = function () {
    this.gas.style.background = 'initial';
    clearInterval(this.interval);
  };

  // 背景构造函数
  var fn_bg = function () {
    this.style = {};
    this._style();
    this._create();
  };
  // 样式
  fn_bg.prototype._style = function () {
    this.style.ves_style = {
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: '0',
      left: '0',
      background: 'url(' + require('../../../images/openLottery/pk10/bg.png') + ') no-repeat',
      backgroundSize: 'auto 100%',
      transition: 'all ease-in 3s',
      zIndex: '-1'
    }
  };
  // 创建节点
  fn_bg.prototype._create = function () {
    var ves = document.createElement('div');

    setStyle({obj: ves, style: this.style.ves_style});

    this.ves = ves;
  };
  // 背景动画
  fn_bg.prototype._run = function () {
    this.ves.style.backgroundPosition = '100% 0';
  };

  // 弹窗构造函数
  var fn_result = function (argv) {
    this.argv = argv;
    this.style = {};
    this.status = 'first';
    this._format();
    this._style();
    this._create();
  };
  // 初始化属性
  fn_result.prototype._format = function () {
    this.width = window.innerWidth * 0.9;
    this.height = this.width * 0.9;
    this.fullHeight = window.innerHeight;
    this.close = this.argv.close;
  };
  // 样式
  fn_result.prototype._style = function () {
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
      background: 'url(' + require('../../../images/openLottery/pk10/result.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      left: '5%',
      // top: this.fullHeight * 0.5 + 'px',
      top: '50%',
      marginTop: -this.height * 0.5 + 'px',
      transition: 'all ease 0.3s',
      boxSizing: 'border-box',
      transform: 'scale( 0.5 )',
      paddingTop: '50%',
      opacity: '0'
    };
    this.style.first_style = {
      position: 'absolute',
      left: '10%',
      top: '70%',
      fontSize: this.height * 0.06 + 'px',
      textAlign: 'center',
      color: '#fff'
    };
    this.style.second_style = {
      position: 'absolute',
      left: '0%',
      top: '70%',
      width: '100%',
      textAlign: 'center',
      fontSize: this.height * 0.06 + 'px',
      textAlign: 'center',
      color: '#fff',
    };
    this.style.third_style = {
      position: 'absolute',
      right: '10%',
      top: '70%',
      fontSize: this.height * 0.06 + 'px',
      textAlign: 'center',
      color: '#fff'
    };
    this.style.close_style = {
      width: '20px',
      height: '20px',
      background: 'url(' + require('../../../images/openLottery/pk10/close.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      position: 'absolute',
      right: '5%',
      bottom: '10px'
    };
  };
  // 创建节点
  fn_result.prototype._create = function () {
    var ves = document.createElement('div'),
      content = document.createElement('div'),
      first = document.createElement('div'),
      second = document.createElement('div'),
      third = document.createElement('div'),
      close = document.createElement('div'),
      _this = this;

    first.innerHTML = '1号';
    second.innerHTML = '1号';
    third.innerHTML = '1号';

    setStyle({obj: ves, style: this.style.ves_style});
    setStyle({obj: content, style: this.style.content_style});
    setStyle({obj: first, style: this.style.first_style});
    setStyle({obj: second, style: this.style.second_style});
    setStyle({obj: third, style: this.style.third_style});
    setStyle({obj: close, style: this.style.close_style});

    close.addEventListener('click', function () {
      _this._hide();
    }, false);

    content.addEventListener('webkitTransitionEnd', function () {
      if (_this.status == 'first') {
        _this.content.style.transform = 'scale( 1 )';
        _this.content.style.transition = 'all ease-out 0.3s';
        _this.status = 'second';
      }
    }, false);

    content.appendChild(first);
    content.appendChild(second);
    content.appendChild(third);
    content.appendChild(close);
    ves.appendChild(content);
    this.ves = ves;
    this.content = content;
    this.first = first;
    this.second = second;
    this.third = third;
  };
  // 弹起弹窗
  fn_result.prototype._show = function (argv) {
    var _this = this;
    this.ves.style.display = 'block';
    this.first.innerHTML = '第一名  ' + argv[0];
    this.second.innerHTML = '第二名  ' + argv[1];
    this.third.innerHTML = '第三名  ' + argv[2];
    setTimeout(function () {
      _this.content.style.opacity = '1';
      _this.content.style.transform = 'scale( 1.05 )';
    }, 200);
  };
  // 关闭弹窗
  fn_result.prototype._hide = function () {
    var _this = this;
    _this.content.style.opacity = '0';
    _this.content.style.transform = 'scale( 0.5 )';
    setTimeout(function () {
      _this.ves.style.display = 'none';
      _this.close ? _this.close() : null;
    }, 300);
  };

  // 主函数
  var fn_main = function (argv) {
    this.argv = argv;
    this.style = {};
    this.bg = {};
    this.sports = [];
    this._format();
    this._style();
    this._create();
  };
  // 初始化属性
  fn_main.prototype._format = function () {
    this.el = this.argv.el;
    this.fullHeight = this.el.offsetHeight;
    this.fullWidth = this.el.offsetWidth;
    // this.el.style.position = 'relative';
    this.el.style.overflow = 'hidden';
    this.callback = this.argv.callback;
    this.close = this.argv.close;
  };
  // 样式
  fn_main.prototype._style = function () {
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
      transform: 'rotate( -10deg ) scale( 0.6 )',
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
  // 创建节点
  fn_main.prototype._create = function () {
    var sports = [],
      bg = new fn_bg(),
      ves = document.createElement('div');

    setStyle({obj: ves, style: this.style.ves_style});

    this.bg = bg;
    ves.appendChild(bg.ves);
    for (var i = 0, len = 10; i < len; i++) {
      var sport = new fn_car({
        number: i + 1,
        width: this.fullHeight / 10 * 1.4,
        height: this.fullHeight / 10 * 0.7,
        top: this.fullHeight * 0.99 / 10 * i + this.fullHeight * 0.3 / 10 * 0.5 + this.fullHeight * 0.01 * 0.5 + 'px',
        startCallBack: function () {
          bg._run();
        }
      });
      var numb = document.createElement('span');

      numb.innerHTML = i + 1;

      numb.style.top = this.fullHeight * 0.99 / 10 * i + this.fullHeight * 0.01 * 0.5 + 'px';
      setStyle({obj: numb, style: this.style.numb_style});

      this.el.appendChild(numb);
      ves.appendChild(sport.ves);
      this.sports.push(sport);
    }
    this.el.appendChild(ves);
    this.ves = ves;
  };
  // 执行动画
  fn_main.prototype._run = function (argv, callback) {
    // this.bg._run();
    var _this = this;
    setTimeout(function () {
      _this.bg._run();
    }, 400);
    for (var i = 0, len = this.sports.length; i < len; i++) {

      if (argv.indexOf(i + 1) == 0) {
        _this.sports[i].ves.style.left = ( 3 - argv.indexOf(i + 1)) * 10 + 30 + '%';
        _this.sports[i].ves.style.transition = 'left ease 1.5s';
        var startV = ( 3 - argv.indexOf(i + 1)) * 10 + 30;
        _this.sports[i]._quick();
        setTimeout((function () {
          var obj = _this.sports[i];
          return function () {
            obj._auto();
          }
        })(), 500);
        setTimeout((function () {
          var status,
            obj = _this.sports[i],
            sV = startV;
          return function () {
            setTimeout(function () {
              obj._quick();
            }, 1000);
            setTimeout(function () {
              obj._auto();
            }, 1500);
            setTimeout(function () {
              obj.ves.style.transition = 'left ease 1.5s';
              obj.ves.style.left = sV + 40 + '%';
              obj._quick();
            }, 1600);
            // setTimeout ( function (){

            // }, )
          }
        })(), 1500);
      } else if (argv.indexOf(i + 1) <= 2 && argv.indexOf(i + 1) > 0) {
        _this.sports[i].ves.style.left = ( 3 - argv.indexOf(i + 1)) * 8 + 30 + '%';
        _this.sports[i].ves.style.transition = 'left ease 1s';
        var startV = ( 3 - argv.indexOf(i + 1)) * 8 + 30;
        _this.sports[i]._quick();
        setTimeout((function () {
          var obj = _this.sports[i];
          return function () {
            obj._auto();
          }
        })(), 500);
        setTimeout((function () {
          var index = argv.indexOf(i + 1),
            obj = _this.sports[i],
            sV = startV;
          return function () {
            if (index == 1) {

              obj.ves.style.left = sV + 10 + '%';
              obj._quick();
              obj.ves.style.transition = 'left ease 1s';
              setTimeout(function () {
                obj.ves.style.left = sV - Math.random() * 10 - 3 + '%';
                obj.ves.style.transition = 'left ease 2s';
                obj._auto();
              }, 500);
              setTimeout(function () {
                obj.ves.style.left = sV + 10 + '%';
                obj._quick();
              }, 1200);
            } else if (index == 2) {
              setTimeout(function () {
                obj.ves.style.left = sV + 10 + '%';
                obj._quick();
                obj.ves.style.transition = 'left ease 1.5s';
              }, 600);
              setTimeout(function () {
                obj.ves.style.left = sV - 5 + '%';
                obj._auto();
                obj.ves.style.transition = 'left ease 1.5s';
              }, 1200);
              setTimeout(function () {
                obj.ves.style.transition = 'left ease 1s';
                obj.ves.style.left = sV + 10 + '%';
                obj._quick();
              }, 1600);
            }
          }
        })(), 1500);
      } else {
        _this.sports[i].ves.style.left = Math.random() * 20 + '%';
        _this.sports[i].ves.style.transition = 'left ease 0.8s';
        var startV = Math.random() * 30;
        setTimeout((function () {
          var index = argv.indexOf(i + 1),
            obj = _this.sports[i],
            sV = startV;
          return function () {
            obj.ves.style.transition = 'left ease 5s';
            obj.ves.style.left = sV - 45 + '%';
            setTimeout(function () {
              obj.ves.style.transition = 'left ease 1.5s';
              obj.ves.style.left = sV - 30 + '%';
            }, 1500);
          }
        })(), 800);
      }

    }

    // 检测第一名到达终点
    var test = setInterval(function () {
      var first = 0,
        index = 0;
      for (var i = 0, len = _this.sports.length; i < len; i++) {
        var temp = ( _this.sports[i].ves.offsetLeft + _this.fullHeight / 12 * 1.4 ) / _this.fullWidth * 100;
        if (_this.sports[i].ves.offsetLeft > first) {
          first = _this.sports[i].ves.offsetLeft;
          index = i;
        }
        if (temp >= 95) {
          clearInterval(test);
          console.log(_this.sports);
          for (var i = 0, len = _this.sports.length; i < len; i++) {
            _this.sports[i].ves.style.transition = 'initial';
            _this.sports[i].ves.style.left = _this.sports[i].ves.offsetLeft + 'px';
            clearInterval(_this.sports[i].interval);
          }
          _this.bg.ves.style.transition = 'initial';
          _this.bg.ves.style.left = _this.bg.ves.offsetLeft + 'px';

          // 创建快照
          var snap = _this.ves.cloneNode(true),
            numb = snap.getElementsByTagName('span'),	//获取快照中的泳道号码
            result = new fn_result({						// 创建弹窗对象
              close: _this.close
            });

          // 清除快照中的泳道号码
          for (var i = 0, len = numb.length; i < len; i++) {
            snap.removeChild(numb[i])
          }

          // 快照动画
          setTimeout(function () {
            setStyle({obj: snap, style: _this.style.snap_style});
          }, 200);

          // 快照弹窗动画回调，第一段结束 延时500毫秒，调用关闭函数，第二段结束 延时300毫秒弹出结果弹窗
          snap.addEventListener('webkitTransitionEnd', (function () {
            var status = 'first';
            return function () {
              if (status == 'first') {
                setTimeout(function () {
                  snap.style.opacity = '0';
                  snap.style.transform = 'rotate( -10deg ) scale( 0.3 )';
                  status = 'second';
                }, 500);
              } else if (status == 'second') {
                setTimeout(function () {
                  result._show([argv[0], argv[1], argv[2]]);
                  callback && callback();
                }, 300);
                status = 'third';
              }
            };
          })(), false);

          _this.el.appendChild(snap);
          _this.el.appendChild(result.ves);
        }
      }
    }, 40);
  };

  return fn_main;

})();
// var obj_anim = new anim_racing({
// 	el: document.getElementById ( 'content' ),					// 动画节点
// 	close: function (){											// 关闭结果动画后的回调函数
// 		// 回调函数
// 	}
// });
// var btn = document.getElementById ( 'btn' );
// btn.onclick = function (){
// 	obj_anim._run([ 0, 4, 3, 6, 11, 8, 9, 1, 2, 5, 10, 7 ]);       // 动画开始执行，里面是名次，从0开始，前三名为弹窗结果
// };

// 改样式在_style里面，构造函数里 _函数名 为函数，之外fn_函数名 为函数， 其他为变量

var fallMan = function (argv) {
  return new anim_racing(argv);
}

var fallRun = function (self, data, callback) {
  self._run(data, callback);
};

export default {
  fallMan,
  fallRun
}