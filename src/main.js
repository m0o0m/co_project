import 'babel-polyfill'
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/index'
// import VueWorker from 'vue-worker'
import * as filters from './filter/index'
import Utils from './assets/js/Utils'
import LotteryUtils from './assets/js/lotteryUtils'
import Api from './api'
import { Popup, Button, Loadmore, Spinner, Swipe, SwipeItem, Range, InfiniteScroll, Lazyload, DatetimePicker} from 'mint-ui'
import {Alert, Confirm, Loading} from './components/ui/index'
import {MyAudio} from './components/audio/index'
import './assets/js/hotcss.js'

const FastClick = require('fastclick');
FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(InfiniteScroll);
Vue.use(Alert);
Vue.use(Confirm);
Vue.use(Loading);
Vue.use(MyAudio);
Vue.use(Lazyload);
// Vue.use(VueWorker);

Vue.component(Popup.name, Popup);
Vue.component(Button.name, Button);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Range.name, Range);
Vue.component(Spinner.name, Spinner);
Vue.component(DatetimePicker.name, DatetimePicker);
// console.log(axios.defaults.headers);
// axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

Vue.prototype.$http = axios;
Vue.prototype._Util = Utils;
Vue.prototype._LotteryUtil = LotteryUtils;
Vue.prototype._Api = Api;

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]);
});

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes
});

router.beforeEach((route, redirect, next) => {
	let title = '';
	if (route.name === 'pcdd' && route.query.game) {
		switch (parseInt(route.query.game)) {
			case 1:
				title = 'PC蛋蛋';
				break;
			case 2:
				title = '加拿大幸运28';
				break;
			case 3:
				title = '香港新六合彩';
				break;
			case 4:
				title = '江苏快3';
				break;
			case 5:
				title = '北京PK10';
				break;
			case 6:
				title = '重庆时时彩';
				break;
		}
	}

	Utils.setTitle(title || route.meta.title || document.title);
	next();
});

Utils.init();

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {App}
})
