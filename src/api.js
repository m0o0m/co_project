import hostConfig from './host.config';
const HOST = hostConfig.config.hostApi;
const LOCAL_HOST = hostConfig.config.localHost;

export default {
  HOST,
  LOCAL_HOST,
  //首页
  POST_HOME: HOST + '/index.php/api/Index/index  ',
  //获取彩种
  POST_LOTTERY_DETAIL: HOST + '/index.php/api/Lottery/detail',
  //彩种列表
  POST_COLOR_LIST: HOST + '/index.php/api/Lottery/lotteryList',
  //获取上一期开奖结果
  POST_LOTTERY_RECTOR_DETAIL: HOST + '/index.php/api/LotteryData/last',
  //采种提交数据
  POST_COLOR_SUBMINT: HOST + '/index.php/api/Order/bet',
  //开奖大厅
  POST_LOTTERY: HOST + '/index.php/api/Lottery/notice',
  //开奖大厅详情
  POST_LOTTERY_DETAILS: HOST + '/index.php/api/LotteryData/history',
  //投注记录
  POST_BETTING: HOST + '/index.php/api/Order',
  //投注详情接口
  POST_BETTING_DETAILS: HOST + '/index.php/api/Order/detail',
  //撤单
  POST_BETTING_CANCEL: HOST + '/index.php/api/Order/cancel',
  //获取用户名
  POST_COMMON_GET_USERNAMES: HOST + '/index.php/api/Member/checkOldUserName',
  //获取找回密码验证码
   POST_COMMON_GET_CAPTCHAPASSW: HOST + '/index.php/api/Member/forgetSendCode',
  //获取验证码
  POST_COMMON_GET_CAPTCHA: HOST + '/index.php/api/Code/sendCode',
  //验证短信接口
  POST_COMMON_VALIDATE_CODE: HOST + '/api/Code/validateCode',
  //绑定手机号
  POST_COMMON_BIND_PHONE: HOST + '/index.php/api/Member/bindPhone',
  //获取用户信息
  POST_USER_INFO: HOST + '/index.php/api/Member/profile',
  //用户首页信息
  POST_USER_WAVE: HOST + '/index.php/api/Member/profile',
  //修改登录密码
  POST_USER_UPD_PWD: HOST + '/index.php/api/Member/editPass',
  //会员银行卡信息
  POST_PERSONAL_MEMBER_BANK: HOST + '/index.php/api/MemberBank',
  //会员银行卡提现
  POST_PERSONAL_MEMBER_CASH: HOST + '/index.php/api/MemberWithdraw/add',
  //提现记录
  POST_PERSONAL_MEMBER_HISTORY: HOST + '/index.php/api/MemberWithdraw/lists',
  //修改提现密码
  POST_PERSONAL_MEMBER_BANK_UPD_PWD: HOST + '/index.php/api/Member/setPayPass',

  //获取银行
  POST_PERSONAL_MEMBER_BANK_SELECT: HOST + '/index.php/api/Bank',
  //获取银行
  POST_PERSONAL_MEMBER_BANK_BIND: HOST + '/index.php/api/MemberBank/bind',
  //宝贵意见
  POST_FEED_BACK: HOST + '/api/Feedback/add',
  POST_FEED_BACK_LIST: HOST + '/api/Feedback/lists',
  //公告列表
  POST_PERSONAL_ANN_LIST: HOST + '/index.php/api/Notice',
  //公告详情
  POST_PERSONAL_ANN_DETAIL: HOST + '/index.php/api/Notice/detail',
  //退出登录
  POST_PERSONAL_LOGIN_OUT: HOST + '/index.php/api/Member/logout',

  /**
   * 支付
   */
  //获取支付通道接口
  POST_PAY_TYPE: HOST + '/index.php/api/Payment/allPaymentType',
  //通道明细
  POST_PAY_TYPE_DETAIL: HOST + '/index.php/api/Payment/paymentList',
  //第三方支付【二维码】
  POST_PAY_QRCODE: HOST + '/index.php/api/MemberRecharge/add',
  //银行卡转账【线下充值】第二步接口
  POST_PAY_LINE: HOST + '/index.php/api/MemberRecharge/linePay',
  //第三方【线下充值】第二步接口
  POST_PAY_ALREADY_OFFLINE: HOST + '/index.php/api/MemberRecharge/linePayThird',
  //在线支付 【第二步】
  POST_PAY_MOBO: HOST + 'index.php/api/MemberRecharge/mobao2',


  //资金明细
  POST_PERSONAL_ASSETS_DETAIL_LIST: HOST + '/index.php/api/MemberCashLog',

  //获取佣金规则
  POST_PERSONAL_REBATE_LIST: HOST + '/index.php/api/Membercommision/commisionInfo',

  //分享开户接口
  POST_PERSONAL_REBATE_SHARE: HOST + '/index.php/api/Membercommision/share',

  //登录
  POST_LOGIN: HOST + '/index.php/api/Member/login',
  //注册
  POST_REGISTER: HOST + '/index.php/api/Member/register',
	//修改头像
	POST_USER_HEAD_IMG: HOST + '/index.php/api/Member/upload',
  //忘记密码
  POST_FORGIT: HOST + '/index.php/api/Member/forget',
  //客服
  POST_CUSTOMER_SERVER: HOST + '/api/AppConfig/index',
  //充值记录
  POST_RECHARGE_RECORD: HOST + '/index.php/api/MemberRecharge/lists',
  POST_APP_VERSION: HOST + '/index.php/api/AppVersion',
  //客户端的链接
  POST_APP_CLIENT: HOST + '/api/index/getDownloadUrl',
	//代理后台（收益）
  POST_MASTER_END: HOST + '/index.php/api/agent/subordinate',
	//代理后台（下级）
  POST_MASTER_ENDS: HOST + '/index.php/api/agent/profit',
  //活动详情接口
  POST_DETAILS_ACTIVITIES: HOST + '/index.php/api/Active/info',
  //走势图
  POST_TREND_CHART: HOST + '/api/lotterydata/chart'
}