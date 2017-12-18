<template>
  <div class="moneyTemplateed">
    <div class="assetsDetailCls">
      <div class="rechargeLeft" @click="$router.go(-1);"></div>
      <div class="assetsDeRight assetsDeRightImg" @click="goContract"><a href="javascript:void(0)"></a></div>
      <div class="assetsTitle"><p>{{title}}</p></div>
      <div id="assetsDeList" class="assetsDeList">
        <div class="" style="">
            <div id="subnav" style="color:#FFDC99;margin-bottom: 0 !important">
                <span @click="type = 0" :class="{on: type == 0}">佣金收益</span>
                <span @click="type = 1" :class="{on: type == 1}">下级列表</span>
            </div>
            <div class="agentsTotal" v-if="type == 0">
                <p>下级总数：<span></span>名</p>
                <p>今日新增下级：<span></span>名</p>
            </div>
            <div class="agentsTotal" v-if="type == 1">
                <p style="border-right: none !important" @click="opensYear"  size="large">选择年份
                    <input type="text" :value="  value2 ? value2 : 2017" >
                </p>
                <p @click = "opensMoon">选择月份
                    <input type="text" value="全部">
                </p>
            </div>
        </div>
          <div style="height: 80%; overflow: hidden;margin-top: 0.6rem;">
              <div v-if="type == 0" class="examineMian examineMian_master"
                   v-infinite-scroll="loadMore"
                   infinite-scroll-disabled="busy"
                   infinite-scroll-distance="50"
                   infinite-scroll-immediate-check="false"
                   style="height: 100%; overflow: auto;">
                  <ul class="master_ul">
                      <li class="list_tit">
                          <p>结算时间段</p>
                          <p>会员数</p>
                          <p>盈亏额</p>
                          <p>佣金</p>
                      </li>
                  </ul>
                  <ul class="master_ul" style="margin-bottom: 2rem;">
                      <li class="list_tit" v-for="(master,index) in resultList">
                          <p><span>{{master.username}}</span></p>
                          <p><span>{{master.reg_time}}</span></p>
                          <p><span>￥{{master.sum}}</span></p>
                          <p><span>￥{{master.sum}}</span></p>
                      </li>
                      <!--      <div class="noneDIV" v-if="betIndex === 0">
                              <p><img src="../../assets/images/noneImg.png"/></p>
                              <p>暂无记录哦～</p>
                            </div>-->
                  </ul>
                  <!--<span style="font-size: 0.5rem;color: #fff; padding-bottom: 0.5rem;" v-html="moreMsg"></span>-->
              </div>
              <div v-if="type == 1" class="examineMian examineMian_master"
                   v-infinite-scroll="loadMore"
                   infinite-scroll-disabled="busy"
                   infinite-scroll-distance="50"
                   infinite-scroll-immediate-check="false"
                   style="height: 100%; overflow: auto;">
                  <ul class="master_ul">
                      <li class="list_tit">
                          <p style="width: 45%;">用户名</p>
                          <p>盈亏额</p>
                      </li>
                  </ul>
                  <ul class="master_ul" style="margin-bottom: 2rem;">
                      <li class="list_tit" v-for="(master,index) in resultList">
                          <p style="width: 45%;"><span>{{master.username}}</span></p>
                          <p><span>{{master.reg_time}}</span></p>
                      </li>
                      <!--      <div class="noneDIV" v-if="betIndex === 0">
                              <p><img src="../../assets/images/noneImg.png"/></p>
                              <p>暂无记录哦～</p>
                            </div>-->
                  </ul>
                  <!--<span style="font-size: 0.5rem;color: #fff; padding-bottom: 0.5rem;" v-html="moreMsg"></span>-->
              </div>
          </div>
      </div>
    </div>

      <!--<mt-datetime-picker-->
              <!--ref="picker2"-->
              <!--type="date"-->
              <!--v-model="value2"-->
              <!--@confirm="handleChange">-->
      <!--</mt-datetime-picker>-->
  </div>
</template>

<script>
	import '../../assets/scss/personal.scss';
	export default {
		data() {
			return {
				result: [],
				value2: null,
				pickerValue: true,
				title: "代理后台",
				resultList: [],
				showType: false,
				numIndex: 0,
				showTypeItems: [],
				delImg: require('../../assets/images/iconbtn2x.png'),
                busy: false,
				params: {
					page: 1,
					start_date: '',
					end_date: ''
				},
              type:0,
              moreMsg: '',
              betIndex: '',
              masterNum: '',
              masterNum01: '',
              masteramout: '',
              masterMarry: '',
              current_page: 0,
              last_page: 1,
			  years: false,
              moon:false
			}
		},

		mounted() {
			let that = this;
			that.init();
			that._Util.needClickFc('assetsDeList');
		},

		methods: {
			opensYear () {
				let that = this ;
				that.years = true;
            },
            opensMoon () {
                let that = this ;
                that.years = true;
            },
			init() {
				let that = this;
				if (!that.busy) {
					that.busy = true;
					console.log("ssss:",that.current_page,that.last_page);
					if(that.current_page == that.last_page){
						that._Util.showAlert(that, {content: '已经没有更多数据了'});
						return false;
					}
					that._Util.post(that, that._Api.POST_MASTER_END, that.params, (data) => {
						that.resultList = that.resultList.concat(data.data || []);
						that.masterNum = data.total || 0;
						that.masterNum01 = data.total_real_number || 0;
						that.masteramout = data.total_amount || 0;
						that.masterMarry = data.total_commission || 0;
//                        console.log(that.resultList);
						if (that.resultList.length === 0) {
							that.betIndex = 0;
						} else {
							that.betIndex = 1;
						}

						if (data.data.length) {
							that.params.page++;
						}
						if (parseInt(data.current_page) !== data.last_page) {
							that.moreMsg = '正在加载更多的数据...';
						}
            that.current_page = parseInt(data.current_page);
            that.last_page = parseInt(data.last_page);

						if (parseInt(data.current_page) === data.last_page) {
							that.moreMsg = '';
						}
						that.busy = false;
					});
				}
			},
			open(picker) {
//				console.log("nsasda");
				this.$refs[picker].open();
			},
            goContract () {
				let that = this ;
	            that.$router.replace({name: 'agencyContract'});
            },
//			handleChange(value) {
//				var that = this;
//				that.current_page = 0;
//				that.last_page = 1;
//				that.busy = false;
//				console.log("aaa:", value,this._Util.dateFormat(value,"yyyy-MM-dd"));
//				that.params.page = 1;
//				that.params.start_date = this._Util.dateFormat(value,"yyyy-MM-dd");
//                that.params.end_date = this._Util.dateFormat(value,"yyyy-MM-dd");
//				that.resultList=[];
//				that.init();
//			},
//			changeType(v, index) {
//				let that = this;
//				that.numIndex = index;
//				that.params.page = 1;
//				that.params.type = v.type;
//				that.resultList = [];
//				that.showType = false;
//                that.params.start_date = "";
//                that.params.end_data = "";
//				that.init();
//			},

			loadMore() {
				let that = this;
				that.init();
			}
		},

//		components: {
//			DatetimePicker
//		}
	}
</script>
<style>
  /*@component-namespace page {
    @component datetime {
      @descendent wrapper {
        padding:  0 1rem;
        position: absolute 50% ;
        width:100%;
        transform: translateY(-50%);
        button:not:(last-child) {
        margin-bottom: 1rem;
      }
      }
    }
  }*/
  .picker-items{
    height:6rem;
      background: #fff !important;
  }
  .picker-slot-wrapper{
    height: auto !important;

  }
 .picker-toolbar .mint-datetime-action{
    font-size:0.7rem !important;
   line-height: 1.5rem !important;
  }
  .picker-toolbar {
    height:1.5rem !important;
  }
  .picker-item {
    font-size: 0.6rem !important;
      text-align: center !important;
      height:1.5rem !important;
      line-height:1.5rem !important;
  }
  .picker-item.picker-selected{
    font-size: 0.7rem !important;
    margin: 0.5rem 0;
  }
  .picker-center-highlight {
    height: 1.5rem !important;
    /*line-height: 1.5rem !important;*/
    margin-top: -0.6rem !important;
    overflow: visible;
  }

</style>