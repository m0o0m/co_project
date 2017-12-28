export default {
	pauseSell(self, status) {
		let flag = false;
		return false;
		// if (!status || status === -1) {
		// 	flag = true;
		// 	self._Util.showAlert(self, {
		// 		content: '暂停销售'
		// 	});
		// }
		// return flag;
	},

    // feedBackTc(self,options,index,callback){
	 //  switch (index){
    //       case 0:
    //         self.$alert({
    //             content: options.content
    //         },callback);
    //       break;
    //       case 1:
    //         self.$confirm({
    //           content: options.content
    //         },callback);
    //   }
    // },

    creditLow(self){
	  let credFlag = false;
      self._Util.showConfirm(self, {content: '余额不足，请充值'}, action => {
          if (!action) return;
          self.$router.push({name: 'addMoney'});
      });
	  return credFlag
    },

        isBetEnd(self, time, status) {
            if (((self.classAdata && self.classAdata.status !== 0 && self.classAdata.status !== -1) || (status && status !== 0 && status !== -1)) && time <= 0) {
      self._Util.showAlert(self, {
        content: '当期投注时间结束'
      });
      return true;
    }
    return false;
  },

  showAmount(status, stopBet, amount) {
	  //return (!status || status === -1) ? '' : (!stopBet ? (amount ? '￥' + amount : '') : '封盘');
	  // if(status === -1 || status === 0){
		 //  return !stopBet ? (amount ? '￥' + amount : '') : '';
	  // }else{
		 //  return !stopBet ? (amount ? '￥' + amount : '') : '封盘';
	  // }
	  return !stopBet && (status == -1 || status == 0 || status == 1) ? (amount ? '￥' + amount : '') : '封盘';
  },

  getHistoryBetMoney(self, id, actionNo) {
    let totalMoney = 0;
    let record = self._Util.getLocalStorage('lotteryHistoryRecord');
    let sectionS = !localStorage.getItem('sectionLogin') ? 0 : localStorage.getItem('sectionLogin');
    if (record[id] && record[id].actionNo === actionNo && parseInt(record[id].userId) == parseInt(sectionS)) {
      totalMoney = record[id].totalMoney;
    }
    return parseInt(totalMoney || 0);
  },

  JudgeLogin(){
    let sectionS = !localStorage.getItem('sectionLogin') ? 0 : localStorage.getItem('sectionLogin');
    if(sectionS === 0){
      return false;
    }else{
      return true;
    }
  },


    setHistoryBetMoney(self, id, actionNo, totalMoney) {
    let lotteryHistoryRecord = self._Util.getLocalStorage('lotteryHistoryRecord');
    if (!lotteryHistoryRecord) lotteryHistoryRecord = {};

    if (!lotteryHistoryRecord[id] || lotteryHistoryRecord[id].actionNo !== actionNo) {
      lotteryHistoryRecord[id] = {};
    }

    lotteryHistoryRecord[id] = {
      actionNo: actionNo,
      totalMoney: parseInt(totalMoney) + parseInt(lotteryHistoryRecord[self.creditId].totalMoney || 0),
      userId: self._Util.getUserInfo().id
    };
    self._Util.setLocalStorage('lotteryHistoryRecord', lotteryHistoryRecord);
  },

  lotteryCheckCount(self, arr, type){
    let flag = false;

    if (type && arr.length > 50) {
      self._Util.showAlert(self, {
        content: '投注总注数不能超过50注'
      });
      flag = true;
    }
    return flag;
  }
}