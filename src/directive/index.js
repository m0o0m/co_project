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
