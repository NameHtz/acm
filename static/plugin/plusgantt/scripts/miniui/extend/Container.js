mini.Container = function () {
  mini.Container.superclass.constructor.call(this);
  this._contentEl = this.el;
}
mini.extend(mini.Container, mini.Control, {
  setControls: __mini_setControls,
  getContentEl: function () {
    return this._contentEl;
  },
  getBodyEl: function () {
    return this._contentEl;
  }
});