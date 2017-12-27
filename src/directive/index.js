/**
 * 自动获取焦点
 * @type {{name: string, inserted: focus.inserted}}
 */
export let focus = {
  name: 'focus',
  inserted: function (el) {
    el.focus();
  }
};

export let back = {
	name: 'back',
	bind: function (el, binding, vnode) {
		el.addEventListener('click', function () {
			vnode.context.$router.go(-1);
		});
	},
};