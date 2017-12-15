/**
 * 日期格式化
 * @param timeSpan
 * @param format
 * @returns {*}
 */
export function dateFormat (timeSpan, format) {
  if (!timeSpan) return;

  let date = new Date(timeSpan);
  let o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }

  return format;
}

export function formatYesterday(time){
  let now = new Date();
  let date = new Date(time);
  let nowD = this.getDateFrom1970(now.getTime());
  let dateD = this.getDateFrom1970(time);
  if(nowD == dateD){
    return '今天';
  }else if(nowD - dateD == 1){
    return '昨天';
  }
  return date.getMonth() + 1 + '月' + date.getDate() + '日';
}
