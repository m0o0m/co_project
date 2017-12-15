import Vue from 'vue'
import ConfirmComponent from './tpl.vue'
import merge from 'lodash/merge'

let instance;

let globalConfig = {};

let ConfirmConstructor = Vue.extend(ConfirmComponent);

let initInstance = ()=>{
  instance = new ConfirmConstructor({
	el: document.createElement('div')
  });
  document.body.appendChild(instance.$el);
}

let Confirm = (options = {}, callback) => {
  initInstance();

  options.callback = callback;
  // 将全局的 Alert 配置 合并到默认值中
  merge(instance.$data, globalConfig);
  // 将单个 Alert instance 的配置合并到默认值中
  merge(instance.$data, options);


  return new Promise((resolve, reject)=>{
	instance.show = true;

	// fix 弹窗出来之后依旧键盘没有回收
	let inputs = Array.prototype.slice.call(document.querySelectorAll('input'));

	inputs.forEach((input)=>{
	  input.blur();
	});

	let success = instance.success;

	instance.success = () => {
	  success();
	  resolve('ok');
	}
  });
}

export default {
  install (Vue, options={}) {
	globalConfig = options;
	Vue.prototype.$confirm = Confirm;
  }
};





