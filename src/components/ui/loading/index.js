import Vue from 'vue'
import LoadingComponent from './tpl.vue'
import merge from 'lodash/merge'

let instance;

let globalConfig = {};

let LoadingConstructor = Vue.extend(LoadingComponent);

let initInstance = ()=>{
  instance = new LoadingConstructor({
	el: document.createElement('div')
  });
  document.body.appendChild(instance.$el);
};

initInstance();

let loading = {
  open(options = {}) {
	Vue.nextTick(() => {
	  instance.visible = true;
	});
  },

  close() {
	instance.visible = false;
  }
};

export default {
  install (Vue, options={}) {
	globalConfig = options;
	Vue.prototype.$loading = loading;
  }
};





