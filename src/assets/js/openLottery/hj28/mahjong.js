var anim_mahjong = (function () {
  // 设置样式
  function setStyle(argv) {
    for (var j in argv.style) {
      argv.obj.style[j] = argv.style[j];
    }
  }

  // 主函数
  var fn_main = function (argv) {
    this.argv = argv;
    this.style = {};
    this.el = {};
    this._format();
    this._style();
    this._create();
  };
  // 初始化属性
  fn_main.prototype._format = function () {
    this.el = this.argv.el;
    this.close = this.argv.close;
  };
  // 样式
  fn_main.prototype._style = function () {
    this.style.ves_style = {
      width: '100%',
      height: '100%',
      background: 'rgba( 0, 0, 0, 0.7 )',
      position: 'fixed',
      left: '0',
      top: '100%'
    };
    this.style.cont_style = {
      width: '95%',
      height: '11rem',
      background: 'url(' + require('../../../images/openLottery/hj28/bg.png') + ') no-repeat',
      backgroundSize: '100% 100%',
      position: 'absolute',
      boxSizing: 'border-box',
      left: '2.5%',
      top: '43%',
      marginTop: '-3.49rem',
      border: '1px solid #ffcd4d',
      borderRadius: '5px'
    };
    this.style.title_style = {
      fontSize: '0.74rem',
      width: '100%',
      textAlign: 'center',
      color: '#ffcd4d',
      fontWeight: 600,
      paddingTop: '1rem',
      position: 'relative'
    };
    this.style.title_img_style = {
      position: 'absolute',
      height: '0.42rem',
      width: '0.42rem',
      top: '0.3rem',
      right: '0.3rem'
    };
    this.style.result_style = {
      width: '100%',
      height: '2.6rem',
      marginTop: '1rem'
    };
    this.style.result_cont_style = {
      height: '1.6rem',
      width: '4rem',
      margin: '0 auto',
      boxSizing: 'border-box',
      paddingLeft: '1.5rem',
      background: 'url(' + require('../../../images/openLottery/hj28/font1.png') + ') no-repeat',
      backgroundSize: '1.5rem 1.5rem',
      position: 'relative'
    };
    this.style.result_cont_img1_style = {
      width: '1.04rem',
      height: '100%',
      marginLeft: '2%',
        display:"inline"
    };
    this.style.result_cont_img2_style = {
      width: '1.04rem',
      height: '100%',
      position: 'relative',
      transform: 'translate( -1.04rem )',
      webkitTransform: 'translate( -1.04rem )',
      top: '0rem',
        display:"inline"
    };
    this.style.content_style = {
      width: '100%',
      overflow: 'hidden',
      marginTop: '1rem'
    };
    this.style.content_list_style = {
      float: 'left',
      width: '33%',
      position: 'relative',
      height: '2.6rem',
      listStyle: 'none'
    };
    this.style.content_list_title_style = {
      height: '1.1rem',
      width: '1.5rem',
      position: 'absolute',
      top: 0,
      left: '50%',
      marginLeft: '-0.5rem',
    };1
    this.style.content_list_img1_style = {
      width: '1.04rem',
      height: '1.34rem',
      position: 'absolute',
      top: '1.1rem',
      left: '50%',
      marginLeft: '-0.8rem'
    };
    this.style.content_list_img2_style = {
      width: '1.04rem',
      height: '1.34rem',
      position: 'absolute',
      // top: '0.8rem',
      top: '1.1rem',
      left: '50%',
      marginLeft: '-0.8rem'
      // marginRight: '0.1rem'
    };
    this.style.content_list_p_style = {
      color: '#fff',
      position: 'absolute',
      fontSize: '0.34rem',
      top: '2rem',
      left: '50%',
      marginLeft: '-0.3rem'
    };
  };
  // 创建节点
  fn_main.prototype._create = function () {
    var _this = this,
      cont = document.createElement('div'),					//弹窗
      ves = document.createElement('div'),					//背景，弹窗容器
      title = document.createElement('div'),					//顶头的标题：‘庄开奖结果：’
      title_span = document.createElement('span'),				//顶头的结果： ‘同花顺’
      title_img = document.createElement('img'),				//关闭按钮
      result = document.createElement('div'),					//结果
      result_cont = document.createElement('div'),				//结果图片容器
      result_cont_img1 = document.createElement('img'),		//结果图片1
      result_cont_img2 = document.createElement('img'),		//结果图片2
      content = document.createElement('div'),					//结果列表
      content_list1 = document.createElement('li'),			//列表1
      content_list2 = document.createElement('li'),			//列表1
      content_list3 = document.createElement('li'),			//列表3
      content_list1_title = document.createElement('img'),		//列表标题图片
      content_list1_img1 = document.createElement('img'),		//列表图片
      content_list1_img2 = document.createElement('img'),
      content_list1_p = document.createElement('p'),			//列表文字
      content_list2_title = document.createElement('img'),
      content_list2_img1 = document.createElement('img'),
      content_list2_img2 = document.createElement('img'),
      content_list2_p = document.createElement('p'),
      content_list3_title = document.createElement('img'),
      content_list3_img1 = document.createElement('img'),
      content_list3_img2 = document.createElement('img'),
      content_list3_p = document.createElement('p');

    title_span.innerHTML = '庄开奖结果 : ';
    // content_list1_p.innerHTML = '7点';
    // content_list2_p.innerHTML = '7点';
    // content_list3_p.innerHTML = '7点';

    title_img.setAttribute('src', require('../../../images/openLottery/hj28/close.png'));
    result_cont_img2.setAttribute('src', require('../../../images/openLottery/hj28/result_bg.png'));
    content_list1_title.setAttribute('src', require('../../../images/openLottery/hj28/font2.png'));
    content_list1_img2.setAttribute('src', require('../../../images/openLottery/hj28/content_bg.png'));
    content_list2_title.setAttribute('src', require('../../../images/openLottery/hj28/font4.png'));
    content_list2_img2.setAttribute('src', require('../../../images/openLottery/hj28/content_bg.png'));
    content_list3_title.setAttribute('src', require('../../../images/openLottery/hj28/font3.png'));
    content_list3_img2.setAttribute('src', require('../../../images/openLottery/hj28/content_bg.png'));

    setStyle({obj: cont, style: this.style.cont_style});
    setStyle({obj: ves, style: this.style.ves_style});
    setStyle({obj: title, style: this.style.title_style});
    setStyle({obj: title_img, style: this.style.title_img_style});
    setStyle({obj: result, style: this.style.result_style});
    setStyle({obj: result_cont, style: this.style.result_cont_style});
    setStyle({obj: result_cont_img1, style: this.style.result_cont_img1_style});
    setStyle({obj: result_cont_img2, style: this.style.result_cont_img2_style});
    setStyle({obj: content, style: this.style.content_style});
    setStyle({obj: content, style: this.style.content_style});
    setStyle({obj: content_list1, style: this.style.content_list_style});
    setStyle({obj: content_list2, style: this.style.content_list_style});
    setStyle({obj: content_list3, style: this.style.content_list_style});
    setStyle({obj: content_list1_title, style: this.style.content_list_title_style});
    setStyle({obj: content_list1_img1, style: this.style.content_list_img1_style});
    setStyle({obj: content_list1_img2, style: this.style.content_list_img2_style});
    setStyle({obj: content_list1_p, style: this.style.content_list_p_style});
    setStyle({obj: content_list2_title, style: this.style.content_list_title_style});
    setStyle({obj: content_list2_img1, style: this.style.content_list_img1_style});
    setStyle({obj: content_list2_img2, style: this.style.content_list_img2_style});
    setStyle({obj: content_list2_p, style: this.style.content_list_p_style});
    setStyle({obj: content_list3_title, style: this.style.content_list_title_style});
    setStyle({obj: content_list3_img1, style: this.style.content_list_img1_style});
    setStyle({obj: content_list3_img2, style: this.style.content_list_img2_style});
    setStyle({obj: content_list3_p, style: this.style.content_list_p_style});

    title.appendChild(title_span);
    title.appendChild(title_img);
    result_cont.appendChild(result_cont_img1);
    result_cont.appendChild(result_cont_img2);
    result.appendChild(result_cont);
    content_list1.appendChild(content_list1_title);
    content_list1.appendChild(content_list1_img1);
    content_list1.appendChild(content_list1_img2);
    content_list1.appendChild(content_list1_p);
    content_list2.appendChild(content_list2_title);
    content_list2.appendChild(content_list2_img1);
    content_list2.appendChild(content_list2_img2);
    content_list2.appendChild(content_list2_p);
    content_list3.appendChild(content_list3_title);
    content_list3.appendChild(content_list3_img1);
    content_list3.appendChild(content_list3_img2);
    content_list3.appendChild(content_list3_p);
    content.appendChild(content_list1);
    content.appendChild(content_list2);
    content.appendChild(content_list3);
    cont.appendChild(title);
    cont.appendChild(result);
    cont.appendChild(content);
    ves.appendChild(cont);
    this.el.appendChild(ves);

    title_img.addEventListener('click', function () {
      _this._close();
    }, false);

    this.ves = ves;
    this.cont = cont;
    this.result_cont_img1 = result_cont_img1;
    this.result_cont_img2 = result_cont_img2;
    this.content_list1_img1 = content_list1_img1;
    this.content_list1_img2 = content_list1_img2;
    this.content_list2_img1 = content_list2_img1;
    this.content_list2_img2 = content_list2_img2;
    this.content_list3_img1 = content_list3_img1;
    this.content_list3_img2 = content_list3_img2;
    this.title_span = title_span;
    this.content_list1_p = content_list1_p;
    this.content_list2_p = content_list2_p;
    this.content_list3_p = content_list3_p;
  };
  // 关闭
  fn_main.prototype._close = function () {
    this.cont.style.top = '0';
    this.cont.style.left = '55%';
    this.cont.style.transition = 'all ease-out 0.3s';
    this.cont.style.webkitTransition = 'all ease-out 0.3s';
    this.cont.style.transform = 'perspective( 600px ) rotateX( 50deg ) rotateY( 20deg ) scale( 0 )';
    this.cont.style.webkitTransform = 'perspective( 600px ) rotateX( 50deg ) rotateY( 20deg ) scale( 0 )';
    this.cont.transformOrigin = '50% 50%';
    this.cont.webkitTransformOrigin = '50% 50%';
    this.cont.style.opacity = '0.3';
  };
  // 执行动画
  fn_main.prototype._run = function (argv, resultNum, callback) {
    this.ves.style.top = '0';
    this.ves.style.transition = 'all ease 0.3s';
    this.ves.style.webkitTransition = 'all ease 0.3s';
    var ves_status = 0,
      list_status1 = 0,
      list_status2 = 0,
      list_status3 = 0,
      result_status = 0,
      _this = this;

    this.result_cont_img1.setAttribute('src', argv.result[0]);
    this.content_list1_img1.setAttribute('src', argv.list1[0]);
    this.content_list2_img1.setAttribute('src', argv.list1[0]);
    this.content_list3_img1.setAttribute('src', argv.list1[0]);
    argv.list_text[0] ? this.content_list1_p.innerHTML = argv.list_text[0] : null;
    argv.list_text[1] ? this.content_list2_p.innerHTML = argv.list_text[0] : null;
    argv.list_text[2] ? this.content_list3_p.innerHTML = argv.list_text[0] : null;

    this.ves.addEventListener('webkitTransitionEnd', function () {
      if (ves_status == 0) {
        _this.content_list1_img2.style.transition = 'all ease 0.3s';
        _this.content_list1_img2.style.webkitTransition = 'all ease 0.3s';
        _this.content_list1_img2.style.left = '50%';
        _this.content_list1_img2.style.marginLeft = '0.3rem';
        ves_status = 1;
      }
    }, false);
    this.content_list1_img2.addEventListener('webkitTransitionEnd', function () {
      if (list_status1 == 0) {
        _this.content_list1_img2.style.transition = 'all ease 0.09s';
        _this.content_list1_img2.style.webkitTransition = 'all ease 0.09s';
        _this.content_list1_img2.style.top = '1.1rem';
        setTimeout(function () {
          _this.content_list1_img2.style.transform = 'rotateY( 90deg )';
          _this.content_list1_img2.style.webkitTransform = 'rotateY( 90deg )';
          list_status1 = 1;
        }, 50);
        // } else if ( list_status1 == 1 ){
        // 	_this.content_list1_img2.style.transition = 'all ease 0.1s';
        // 	_this.content_list1_img2.style.transform = 'rotateY( 90deg )';
        // 	list_status1 = 2;
      } else if (list_status1 == 1) {
        _this.content_list1_img2.style.transition = 'all ease 0.09s';
        _this.content_list1_img2.style.webkitTransition = 'all ease 0.09s';
        _this.content_list1_img2.style.transform = 'rotateY( 0deg )';
        _this.content_list1_img2.style.webkitTransform = 'rotateY( 0deg )';
        _this.content_list1_img2.setAttribute('src', argv.list1[1]);
        list_status1 = 2;
      } else if (list_status1 == 2) {
        _this.content_list2_img2.style.transition = 'all ease 0.3s';
        _this.content_list2_img2.style.webkitTransition = 'all ease 0.3s';
        _this.content_list2_img2.style.left = '50%';
        _this.content_list2_img2.style.marginLeft = '0.3rem';
        list_status1 = 3;
      }
    }, false);
    this.content_list2_img2.addEventListener('webkitTransitionEnd', function () {
      if (list_status2 == 0) {
        _this.content_list2_img2.style.transition = 'all ease 0.09s';
        _this.content_list2_img2.style.webkitTransition = 'all ease 0.09s';
        _this.content_list2_img2.style.top = '1.1rem';
        setTimeout(function () {
          _this.content_list2_img2.style.transform = 'rotateY( 90deg )';
          _this.content_list2_img2.style.webkitTransform = 'rotateY( 90deg )';
          list_status2 = 1;
        }, 50);
        // } else if ( list_status2 == 1 ){
        // 	_this.content_list2_img2.style.transition = 'all ease 0.1s';
        // 	_this.content_list2_img2.style.transform = 'rotateY( 90deg )';
        // 	list_status2 = 2;
      } else if (list_status2 == 1) {
        _this.content_list2_img2.style.transition = 'all ease 0.09s';
        _this.content_list2_img2.style.webkitTransition = 'all ease 0.09s';
        _this.content_list2_img2.style.transform = 'rotateY( 0deg )';
        _this.content_list2_img2.style.webkitTransform = 'rotateY( 0deg )';
        _this.content_list2_img2.setAttribute('src', argv.list2[1]);
        list_status2 = 2;
      } else if (list_status2 == 2) {
        _this.content_list3_img2.style.transition = 'all ease 0.3s';
        _this.content_list3_img2.style.webkitTransition = 'all ease 0.3s';
        _this.content_list3_img2.style.left = '50%';
        _this.content_list3_img2.style.marginLeft = '0.3rem';
        list_status2 = 3;
      }
    }, false);
    this.content_list3_img2.addEventListener('webkitTransitionEnd', function () {
      if (list_status3 == 0) {
        _this.content_list3_img2.style.transition = 'all ease 0.09s';
        _this.content_list3_img2.style.webkitTransition = 'all ease 0.09s';
        _this.content_list3_img2.style.top = '1.1rem';
        setTimeout(function () {
          _this.content_list3_img2.style.transform = 'rotateY( 90deg )';
          _this.content_list3_img2.style.webkitTransform = 'rotateY( 90deg )';
          list_status3 = 1;
        }, 50);
        // } else if ( list_status3 == 1 ){
        // 	_this.content_list3_img2.style.transition = 'all ease 0.1s';
        // 	_this.content_list3_img2.style.transform = 'rotateY( 90deg )';
        // 	list_status3 = 2;
      } else if (list_status3 == 1) {
        _this.content_list3_img2.style.transition = 'all ease 0.09s';
        _this.content_list3_img2.style.webkitTransition = 'all ease 0.09s';
        _this.content_list3_img2.style.transform = 'rotateY( 0deg )';
        _this.content_list3_img2.style.webkitTransform = 'rotateY( 0deg )';
        _this.content_list3_img2.setAttribute('src', argv.list3[1]);
        list_status3 = 2;
      } else if (list_status3 == 2) {
        _this.result_cont_img2.style.transition = 'all ease 0.3s';
        _this.result_cont_img2.style.webkitTransition = 'all ease 0.3s';
        _this.result_cont_img2.style.transform = 'translate( 0.1rem )';
        _this.result_cont_img2.style.webkitTransform = 'translate( 0.1rem )';
        list_status3 = 3;
      }
    }, false);
    this.result_cont_img2.addEventListener('webkitTransitionEnd', function () {
      if (result_status == 0) {
        _this.result_cont_img2.style.transition = 'all ease 0.09s';
        _this.result_cont_img2.style.webkitTransition = 'all ease 0.09s';
        _this.result_cont_img2.style.top = '0';
        setTimeout(function () {
          _this.result_cont_img2.style.transform = 'translate( 0.1rem ) rotateY( 90deg )';
          _this.result_cont_img2.style.webkitTransform = 'translate( 0.1rem ) rotateY( 90deg )';
          result_status = 1;
        }, 50);
        // } else if ( result_status == 1 ){
        // 	_this.result_cont_img2.style.transition = 'all ease 0.1s';
        // 	_this.result_cont_img2.style.transform = 'rotateY( 90deg )';
        // 	result_status = 2;
      } else if (result_status == 1) {
        _this.result_cont_img2.style.transition = 'all ease 0.09s';
        _this.result_cont_img2.style.webkitTransition = 'all ease 0.09s';
        _this.result_cont_img2.style.transform = 'translate( 0.1rem ) rotateY( 0deg )';
        _this.result_cont_img2.style.webkitTransform = 'translate( 0.1rem ) rotateY( 0deg )';
        _this.result_cont_img2.setAttribute('src', argv.result[1]);
        result_status = 2;
      } else if (result_status == 2) {
        _this.title_span.innerHTML = '庄开奖结果 : ' + argv.text;
        result_status = 3;
      }

      setTimeout(function () {
        _this._close();
        callback && callback();
      }, 1000 * 2);
    }, false);
  };

  return fn_main;

})();

var pokerInit = function (argv) {
  return new anim_mahjong(argv);
}

var pokerRun = function (self, data, resultNum, callback) {
  self._run({								// 执行动画
    result: [									// 结果图片
      require('../../../images/Royal/img/' + data[0] + '.png'),
      require('../../../images/Royal/img/' + data[1] + '.png')
    ],
    list1: [									// 结果列表1
      require('../../../images/Royal/img/' + data[2] + '.png'),
      require('../../../images/Royal/img/' + data[3] + '.png')
    ],
    list2: [									// 结果列表2
      require('../../../images/Royal/img/' + data[4] + '.png'),
      require('../../../images/Royal/img/' + data[5] + '.png')
    ],
    list3: [									// 结果列表3
      require('../../../images/Royal/img/' + data[6] + '.png'),
      require('../../../images/Royal/img/' + data[7] + '.png')
    ],
    list_text: [								//开奖列表文字，不写就不出现文字
      //'7点',
      //'7点',
      //'7点'
    ],
    text: resultNum								// 开奖结果文字
  }, resultNum, callback)
};

export default {
  pokerInit,
  pokerRun
}