var poker = (function (document, window) {
  // _run函数只执行一次
  // var bool_status = false;

  // 设置样式 { obj: 元素, style: 样式 }
  function setStyle(argv) {
    for (var j in argv.style) {
      argv.obj.style[j] = argv.style[j];
    }
  }

  // 主函数
  var fn_main = function (argv) {
    this.argv = argv;
    this.style = {};
    this._format();
    this._style();
    this._create();
  };
  // 初始化属性
  fn_main.prototype._format = function () {
    this.el = this.argv.el;
  };
  // 保存样式 元素名_style
  fn_main.prototype._style = function () {
    this.style.ves_style = {
      width: '90%',
      height: '50%',
      background: 'rgba( 0, 0, 0, 0.5 )',
      position: 'fixed',
      right: '5%',
      transition: 'all ease-out 0.3s',
	    webkitTransition: 'all ease-out 0.3s',
      background: 'url(' + require('../../images/openLottery/paiGow/bg.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      top: '100%',
    };
    this.style.title_style = {
      textAlign: 'center',
      color: 'yellow',
      fontSize: '0.7rem',
      marginTop: '1rem'
    };
    this.style.result_style = {
      width: '4rem',
      height: '2rem',
      margin: '0 auto',
      marginBottom: '1rem',
      marginTop: '1rem'
    };
    this.style.result_icon_style = {
      marginTop:'0.2rem',
      width: '1.5rem',
      height: '1.5rem',
      background: 'url(' + require('../../images/openLottery/paiGow/result.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      float: 'left',
    };
    this.style.result_item1_style = {
      width: '0.8rem',
      height: '2rem',
      background: 'url(' + require('../../images/openLottery/paiGow/img.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      float: 'left',
      transition: 'all ease 0.2s',
	    webkitTransition: 'all ease 0.2s',
      marginLeft: '0.1rem',
      boxShadow: '2px 2px 5px #000'
    };
    this.style.result_item2_style = {
      width: '0.8rem',
      height: '2rem',
      background: 'url(' + require('../../images/openLottery/paiGow/img.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      float: 'left',
      transition: 'all ease 0.2s',
	    webkitTransition: 'all ease 0.2s',
      marginLeft: '0.1rem',
      boxShadow: '2px 2px 5px #000'
    };
    this.style.content_style = {
      width: '100%',
      height: '5rem',
      position: 'relative',
      marginTop:'3rem'
    };
    this.style.content_item1_style = {
      width: '3rem',
      height: '2.7rem',
      position: 'absolute',
      left: '0.5rem',
    };
    this.style.content_item2_style = {
      width: '3rem',
        height: '2.7rem',
      position: 'absolute',
      left: '50%',
      marginLeft:'-1.5rem'
    };
    this.style.content_item3_style = {
      width: '3rem',
        height: '2.7rem',
      position: 'absolute',
      right: '0.5rem',
    };
    this.style.content_item1_img1_style = {
      width: '1rem',
      height: '2rem',
      background: 'url(' + require('../../images/openLottery/paiGow/img.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      float: 'left',
      transition: 'all ease 0.2s',
      webkitTransition: 'all ease 0.2s',
      marginLeft: '0.05rem',
      boxShadow: '2px 2px 5px #000'
    };
    this.style.content_item1_img2_style = {
        width: '1rem',
        height: '2rem',
      background: 'url(' + require('../../images/openLottery/paiGow/img.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      float: 'left',
      transition: 'all ease 0.2s',
	    webkitTransition: 'all ease 0.2s',
      marginLeft: '0.1rem',
      boxShadow: '2px 2px 5px #000'
    };
    this.style.content_item2_img1_style = {
        width: '1rem',
        height: '2rem',
      background: 'url(' + require('../../images/openLottery/paiGow/img.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      float: 'left',
      transition: 'all ease 0.2s',
	    webkitTransition: 'all ease 0.2s',
      marginLeft: '0.05rem',
      boxShadow: '2px 2px 5px #000'
    };
    this.style.content_item2_img2_style = {
        width: '1rem',
        height: '2rem',
      background: 'url(' + require('../../images/openLottery/paiGow/img.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      float: 'left',
      transition: 'all ease 0.2s',
	    webkitTransition: 'all ease 0.2s',
      marginLeft: '0.1rem',
      boxShadow: '2px 2px 5px #000'
    };
    this.style.content_item3_img1_style = {
        width: '1rem',
        height: '2rem',
      background: 'url(' + require('../../images/openLottery/paiGow/img.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      float: 'left',
      transition: 'all ease 0.2s',
	    webkitTransition: 'all ease 0.2s',
      marginLeft: '0.05rem',
      boxShadow: '2px 2px 5px #000'
    };
    this.style.content_item3_img2_style = {
        width: '1rem',
        height: '2rem',
      background: 'url(' + require('../../images/openLottery/paiGow/img.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      float: 'left',
      transition: 'all ease 0.2s',
	    webkitTransition: 'all ease 0.2s',
      marginLeft: '0.1rem',
      boxShadow: '2px 2px 5px #000'
    };
    this.style.content_item1_title_style = {
      width: '2.2rem',
      height: '0.7rem',
      background: 'url(' + require('../../images/openLottery/paiGow/title1.png') + ') no-repeat',
      backgroundSize: '100% 100%'
    };
    this.style.content_item2_title_style = {
        width: '2.2rem',
        height: '0.7rem',
      background: 'url(' + require('../../images/openLottery/paiGow/title3.png') + ') no-repeat',
      backgroundSize: '100% 100%'
    };
    this.style.content_item3_title_style = {
        width: '2.2rem',
        height: '0.7rem',
      background: 'url(' + require('../../images/openLottery/paiGow/title2.png') + ') no-repeat',
      backgroundSize: '100% 100%'
    };
    this.style.btn_close_style = {
      width: '30px',
      height: '30px',
      position: 'absolute',
      top: '10px',
      right: '10px'
    };
    this.style.btn_close_img_style = {
      width: '20px',
      height: '20px',
      background: 'url(' + require('../../images/openLottery/paiGow/close.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      marginTop: '5px',
      marginLeft: '5px'
    }
  };
  // 创建元素
  fn_main.prototype._create = function () {
    var _this = this,
      ves = document.createElement('div'),				// 容器
      title = document.createElement('div'),			// 标题
      result = document.createElement('div'),			// 结果盒子
      result_icon = document.createElement('div'), 	// 结果icon
      result_item1 = document.createElement('div'),	// 结果图片1
      result_item2 = document.createElement('div'),	// 结果图片2
      content = document.createElement('div'),			// 结果列表盒子
      content_item1 = document.createElement('div'),	// 结果列表1
      content_item2 = document.createElement('div'),	// 结果列表2
      content_item3 = document.createElement('div'),	// 结果列表3
      content_item1_title = document.createElement('div'),	// 结果列表标题1
      content_item2_title = document.createElement('div'),	// 结果列表标题2
      content_item3_title = document.createElement('div'),	// 结果列表标题3
      content_item1_img1 = document.createElement('div'),	// 结果列表图片1-1
      content_item1_img2 = document.createElement('div'),	// 结果列表图片1-2
      content_item2_img1 = document.createElement('div'),	// 结果列表图片2-1
      content_item2_img2 = document.createElement('div'),	// 结果列表图片2-2
      content_item3_img1 = document.createElement('div'),	// 结果列表图片3-1
      content_item3_img2 = document.createElement('div'),	// 结果列表图片3-2
      btn_close_img = document.createElement('div'),	// 关闭按钮盒子  修改按钮背景改这个
      btn_close = document.createElement('div');	// 关闭按钮图标

    title.innerHTML = '庄开奖结果:';
    title.id = 'paiGowTitle',

      setStyle({obj: ves, style: this.style.ves_style});
    setStyle({obj: title, style: this.style.title_style});
    setStyle({obj: result, style: this.style.result_style});
    setStyle({obj: result_icon, style: this.style.result_icon_style});
    setStyle({obj: result_item1, style: this.style.result_item1_style});
    setStyle({obj: result_item2, style: this.style.result_item2_style});
    setStyle({obj: content, style: this.style.content_style});
    setStyle({obj: content_item1, style: this.style.content_item1_style});
    setStyle({obj: content_item2, style: this.style.content_item2_style});
    setStyle({obj: content_item3, style: this.style.content_item3_style});
    setStyle({obj: content_item1_img1, style: this.style.content_item1_img1_style});
    setStyle({obj: content_item1_img2, style: this.style.content_item1_img2_style});
    setStyle({obj: content_item2_img1, style: this.style.content_item2_img1_style});
    setStyle({obj: content_item2_img2, style: this.style.content_item2_img2_style});
    setStyle({obj: content_item3_img1, style: this.style.content_item3_img1_style});
    setStyle({obj: content_item3_img2, style: this.style.content_item3_img2_style});
    setStyle({obj: content_item1_title, style: this.style.content_item1_title_style});
    setStyle({obj: content_item2_title, style: this.style.content_item2_title_style});
    setStyle({obj: content_item3_title, style: this.style.content_item3_title_style});
    setStyle({obj: btn_close, style: this.style.btn_close_style});
    setStyle({obj: btn_close_img, style: this.style.btn_close_img_style});


    result.appendChild(result_icon);
    result.appendChild(result_item1);
    result.appendChild(result_item2);
    content.appendChild(content_item1);
    content.appendChild(content_item2);
    content.appendChild(content_item3);
    content_item1.appendChild(content_item1_title);
    content_item1.appendChild(content_item1_img1);
    content_item1.appendChild(content_item1_img2);
    content_item2.appendChild(content_item2_title);
    content_item2.appendChild(content_item2_img1);
    content_item2.appendChild(content_item2_img2);
    content_item3.appendChild(content_item3_title);
    content_item3.appendChild(content_item3_img1);
    content_item3.appendChild(content_item3_img2);
    ves.appendChild(title);
    ves.appendChild(result);
    ves.appendChild(content);
    btn_close.appendChild(btn_close_img);
    ves.appendChild(btn_close);

    // 按钮关闭事件
    btn_close.addEventListener('click', function () {

      _this._close();

    }, false);

    this.el.appendChild(ves);
    this.ves = ves;
    this.result_item1 = result_item1;
    this.result_item2 = result_item2;
    this.content1 = {};
    this.content1.contentItem1 = content_item1_img1;
    this.content1.contentItem2 = content_item1_img2;
    this.content2 = {};
    this.content2.contentItem1 = content_item2_img1;
    this.content2.contentItem2 = content_item2_img2;
    this.content3 = {};
    this.content3.contentItem1 = content_item3_img1;
    this.content3.contentItem2 = content_item3_img2;
  };
  // 动画执行函数
  fn_main.prototype._run = function (argv, resultNum, callback) {
    // if (bool_status) {
    //   return;
    // }
    this.ves.style.top = '25%';
    // bool_status = false;
    var _this = this,
      status = '';
    this.ves.addEventListener('webkitTransitionEnd', function () {
      // if (status) {
      //   return;
      // }
      _this.content1.contentItem1.style.transform = 'rotateY( 90deg )';
      _this.content1.contentItem1.style.webkitTransform = 'rotateY( 90deg )';
      _this.content1.contentItem2.style.transform = 'rotateY( 90deg )';
      _this.content1.contentItem2.style.webkitTransform = 'rotateY( 90deg )';
      status = 'first';
    }, false);
    this.content1.contentItem1.addEventListener('webkitTransitionEnd', function () {
      if (status != 'first') {
        return;
      }
      status = 'second';
      setTimeout(function () {
        _this.content1.contentItem1.style.background = 'url( ' + argv.list1[0] + ' ) no-repeat';
        _this.content1.contentItem1.style.backgroundSize = '100% 100%';
        _this.content1.contentItem2.style.background = 'url( ' + argv.list1[1] + ' ) no-repeat';
        _this.content1.contentItem2.style.backgroundSize = '100% 100%';
        _this.content1.contentItem1.style.transform = 'rotateY( 0deg )';
        _this.content1.contentItem1.style.webkitTransform = 'rotateY( 0deg )';
        _this.content1.contentItem2.style.transform = 'rotateY( 0deg )';
        _this.content1.contentItem2.style.webkitTransform = 'rotateY( 0deg )';
      }, 10);
      _this.content2.contentItem1.style.webkitTransform = 'rotateY( 90deg )';
      _this.content2.contentItem1.style.transform = 'rotateY( 90deg )';
      _this.content2.contentItem2.style.transform = 'rotateY( 90deg )';
      _this.content2.contentItem2.style.webkitTransform = 'rotateY( 90deg )';
    }, false);
    this.content2.contentItem1.addEventListener('webkitTransitionEnd', function () {
      if (status != 'second') {
        return;
      }
      status = 'third';
      setTimeout(function () {
        _this.content2.contentItem1.style.background = 'url( ' + argv.list2[0] + ' ) no-repeat';
        _this.content2.contentItem1.style.backgroundSize = '100% 100%';
        _this.content2.contentItem2.style.background = 'url( ' + argv.list2[1] + ' ) no-repeat';
        _this.content2.contentItem2.style.backgroundSize = '100% 100%';
        _this.content2.contentItem1.style.transform = 'rotateY( 0deg )';
        _this.content2.contentItem1.style.webkitTransform = 'rotateY( 0deg )';
        _this.content2.contentItem2.style.transform = 'rotateY( 0deg )';
        _this.content2.contentItem2.style.webkitTransform = 'rotateY( 0deg )';
      }, 10);
      _this.content3.contentItem1.style.transform = 'rotateY( 90deg )';
      _this.content3.contentItem1.style.webkitTransform = 'rotateY( 90deg )';
      _this.content3.contentItem2.style.transform = 'rotateY( 90deg )';
      _this.content3.contentItem2.style.webkitTransform = 'rotateY( 90deg )';
    }, false);
    this.content3.contentItem1.addEventListener('webkitTransitionEnd', function () {
      if (status != 'third') {
        return;
      }
      status = 'result';
      setTimeout(function () {
        _this.content3.contentItem1.style.background = 'url( ' + argv.list3[0] + ' ) no-repeat';
        _this.content3.contentItem1.style.backgroundSize = '100% 100%';
        _this.content3.contentItem2.style.background = 'url( ' + argv.list3[1] + ' ) no-repeat';
        _this.content3.contentItem2.style.backgroundSize = '100% 100%';
        _this.content3.contentItem1.style.transform = 'rotateY( 0deg )';
        _this.content3.contentItem1.style.webkitTransform = 'rotateY( 0deg )';
        _this.content3.contentItem2.style.transform = 'rotateY( 0deg )';
        _this.content3.contentItem2.style.webkitTransform = 'rotateY( 0deg )';
      }, 10);
      _this.result_item1.style.transform = 'rotateY( 90deg )';
      _this.result_item1.style.webkitTransform = 'rotateY( 90deg )';
      _this.result_item2.style.transform = 'rotateY( 90deg )';
      _this.result_item2.style.webkitTransform = 'rotateY( 90deg )';
    }, false);
    this.result_item1.addEventListener('webkitTransitionEnd', function () {
      setTimeout(function () {
        _this.result_item1.style.background = 'url( ' + argv.result[0] + ' ) no-repeat';
        _this.result_item1.style.backgroundSize = '100% 100%';
        _this.result_item2.style.background = 'url( ' + argv.result[1] + ' ) no-repeat';
        _this.result_item2.style.backgroundSize = '100% 100%';
        _this.result_item1.style.transform = 'rotateY( 0deg )';
        _this.result_item1.style.webkitTransform = 'rotateY( 0deg )';
        _this.result_item2.style.transform = 'rotateY( 0deg )';
        _this.result_item2.style.webkitTransform = 'rotateY( 0deg )';
        $('#paiGowTitle').html('庄开奖结果:' + resultNum);
      }, 10);

      setTimeout(function () {
        _this._close();
        callback && callback();
      }, 1000 * 4);
    }, false);
  };
  // 动画关闭函数，可以手动调用
  fn_main.prototype._close = function () {
    this.ves.style.top = '-25%';
    this.ves.style.right = '-45%';
    this.ves.style.transition = 'all ease-out 0.3s';
    this.ves.style.webkitTransition = 'all ease-out 0.3s';
    this.ves.style.transform = 'perspective( 600px ) rotateX( 50deg ) rotateY( 20deg ) scale( 0 )';
    this.ves.style.webkitTransform = 'perspective( 600px ) rotateX( 50deg ) rotateY( 20deg ) scale( 0 )';
    this.ves.webkitTransformOrigin = '50% 50%';
    this.ves.transformOrigin = '50% 50%';
    this.ves.style.opacity = '0.3';
  }
  return fn_main;
})(document, window);

var pokerInit = function (argv) {
  return new poker({
    el: document.getElementById('context'),		// 放置动画的节点
  });
}

var pokerRun = function (self, data, resultNum, callback) {
  self._run({								// 执行动画
    result: [									// 结果图片
      require('../../images/paiGow/gzIcon/' + data[0] + '.png'),
      require('../../images/paiGow/gzIcon/' + data[1] + '.png')
    ],
    list1: [									// 结果列表1
      require('../../images/paiGow/gzIcon/' + data[2] + '.png'),
      require('../../images/paiGow/gzIcon/' + data[3] + '.png')
    ],
    list2: [									// 结果列表2
      require('../../images/paiGow/gzIcon/' + data[4] + '.png'),
      require('../../images/paiGow/gzIcon/' + data[5] + '.png')
    ],
    list3: [									// 结果列表3
      require('../../images/paiGow/gzIcon/' + data[6] + '.png'),
      require('../../images/paiGow/gzIcon/' + data[7] + '.png')
    ]
  }, resultNum, callback)
};

export default {
  pokerInit,
  pokerRun
}
