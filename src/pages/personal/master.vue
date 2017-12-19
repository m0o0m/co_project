<template>
	<div class="moneyTemplateed">
		<div class="assetsDetailCls">
			<div class="rechargeLeft" @click="$router.push({name:'personal'});"></div>
			<div class="assetsDeRight assetsDeRightImg" @click="goContract"><a href="javascript:void(0)"></a></div>
			<div class="assetsTitle"><p>{{title}}</p></div>
			<div id="assetsDeList" class="assetsDeList" >
				<div class="" style="">
					<div id="subnav" style="color:#FFDC99;margin-bottom: 0 !important">
						<span @click="type = 0" :class="{on: type == 0}">佣金收益</span>
						<span @click="type = 1" :class="{on: type == 1}">下级列表</span>
					</div>
					<div class="agentsTotal" v-if="type == 0">
						<p>下级总数：<span>{{value2}}</span>名</p>
						<p>今日新增下级：<span>{{value3}}</span>名</p>
					</div>
					<div class="agentsTotal" v-if="type == 1">
						<p style="border-right: none !important" size="large" @click="initDates(true)" >选择年份
                            <!--<select  @click="initDates(true)">-->
                                <!--<option :value="value2">{{value2}}</option>-->
                            <!--</select>-->
							<input type="text"  :value="  value2 ? value2 : 2017" disabled >
						</p>
						<p  @click="initDates()">选择月份
                            <!--<select  @click="initDates()">-->
                                <!--<option :value="value3">{{value3}}</option>-->
                            <!--</select>-->
							<input type="text" :value="  value3 ? value3 : '全部'" disabled>
						</p>
					</div>
				</div>
				<div style="height: 80%; overflow: hidden;margin-top: 0.6rem;">
					<div v-if="type == 0" class="examineMian examineMian_master"
					     style="height: 100%; overflow: hidden;">
						<ul class="master_ul">
							<li class="list_tit">
								<p>结算时间段</p>
								<p>会员数</p>
								<p>盈亏额</p>
								<p>佣金</p>
							</li>
						</ul>
						<ul class="master_ul" style="max-height: 85%; overflow: auto;"
                            v-infinite-scroll="loadMore"
                            infinite-scroll-disabled="busy"
                            infinite-scroll-distance="50"
                            infinite-scroll-immediate-check="false">
							<li class="list_tit" v-for="(master,index) in resultList">
								<p><span>{{master.username}}</span></p>
								<p><span>{{master.sum}}</span></p>
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
					     style="height: 100%; overflow: hidden;">
						<ul class="master_ul">
							<li class="list_tit">
								<p style="width: 45%;">用户名</p>
								<p>盈亏额</p>
							</li>
						</ul>
						<ul class="master_ul"style="max-height: 85%; overflow: auto;"
                            v-infinite-scroll="loadMore"
                            infinite-scroll-disabled="busy"
                            infinite-scroll-distance="50"
                            infinite-scroll-immediate-check="false">
							<li class="list_tit" v-for="(master,index) in resultList">
								<p style="width: 45%;"><span>{{master.username}}</span></p>
								<p><span>{{master.reg_time}}</span></p>
							</li>
							<!--      <div class="noneDIV" v-if="betIndex === 0">
											<p><img src="../../assets/images/noneImg.png"/></p>
											<p>暂无记录哦～</p>
										</div>-->
						</ul>
						<!--<span style="font-size: 0.5rem;color: #fff; padding-bottom: 0.5rem;" v-html="moreMsg">{{moreMsg}}</span>-->
					</div>
				</div>
			</div>
		</div>

		<BankChange :show=" years || month " :items="dateItems"></BankChange>
	</div>
</template>

<script>
	import '../../assets/scss/personal.scss';
	import BankChange from '../../components/bankChange.vue';

	export default {
		data() {
			return {
				result: [],
				dateItems: [],
				value2: 2017,
				value3: '全部',
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
				type: 0,
				moreMsg: '',
				betIndex: '',
				masterNum: '',
				masterNum01: '',
				masteramout: '',
				masterMarry: '',
				current_page: 0,
				last_page: 1,
				years: false,
				month: false,
				isYear: 2017
			}
		},

		mounted() {
			let that = this;
			that.init();
			that._Util.needClickFc('assetsDeList');
			let date = new Date;
			that.isYear = date.getFullYear();
			that.$on('pickerCancel', () => {
				that.years = false;
				that.month = false;
				that.dateItems = [];
			});
			that.$on('pickerOk', (data) => {
				var numS = parseInt(data.province.name);
				if (numS < 12) {
					that.value3 = numS
				} else {
					that.value2 = numS
				}
				that.params.start_date= this.value2;
				that.params.end_date= this.value3;
                if (that.params.end_date == '全部' ) {
                    that.params.end_date  = 'all'
                }
				that._Util.post(that, that._Api.POST_MASTER_END,that.params , (data) => {
					console.log(data);
				})
				that.years = false;
				that.month = false;
				that.dateItems = [];
			})
		},

		methods: {
			initDates(type) {
				let that = this;

				if (type) {
					for (let i = that.isYear - 10; i < that.isYear + 2; i++) {
						that.dateItems.push({id: i, name: i});
					}
					that.years = true;
					that.month = false;
				} else {
					that.dateItems = [{id: 0, name: '全部'}];
					for (let i = 1; i < 13; i++) {
						that.dateItems.push({id: i, name: i});
					}
					that.years = false;
					that.month = true;
				}
			},
			init() {
				let that = this;
				if (!that.busy) {
					that.busy = true;
//					console.log("ssss:", that.current_page, that.last_page);
                    that.params.start_date= this.value2;
					that.params.end_date= this.value3;
                    if (that.params.end_date == '全部' ) {
	                    that.params.end_date  = 'all'
                    }
					that._Util.post(that, that._Api.POST_MASTER_END, that.params, (data) => {
                    that.resultList = that.resultList.concat(data.data || []);
                    that.resultList =[
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"},
                        {id: 22620, username: "zj555555", reg_time: "2017-12-08 13:51", sum: "0"}
                    ]
                    that.masterNum = data.total || 0;
                    that.masterNum01 = data.total_real_number || 0;
                    that.masteramout = data.total_amount || 0;
                    that.masterMarry = data.total_commission || 0;
    //                        console.log(that.resultList);
    //						if (that.resultList.length === 0) {
    //							that.betIndex = 0;
    //						} else {
    //							that.betIndex = 1;
    //						}

                    if (data.data.length) {
                        that.params.page++;
                    } else {
                        that._Util.showAlert(that, {content: '已经没有更多数据了'});
                    }
    //						if (parseInt(data.current_page) !== data.last_page) {
    //							that.moreMsg = '正在加载更多的数据...';
    //						}
                    that.current_page = parseInt(data.current_page);
                    that.last_page = parseInt(data.last_page);

    //						if (parseInt(data.current_page) === data.last_page) {
    //							that.moreMsg = '';
    //						}
                    that.busy = false;
                });
            }
        },
			goContract() {
				let that = this;
				that.$router.replace({name: 'agencyContract'});
			},
			changeType(v, index) {
				let that = this;
				that.numIndex = index;
				that.params.page = 1;
				that.params.type = v.type;
				that.resultList = [];
				that.showType = false;
				that.params.start_date = "";
				that.params.end_data = "";
				that.init();
			},
			loadMore() {
				let that = this;
				that.init();
			}
		},
		components: {
			BankChange
		}
	}
</script>