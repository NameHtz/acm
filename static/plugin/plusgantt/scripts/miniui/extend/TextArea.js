

mini.TextArea = function () {
  mini.TextArea.superclass.constructor.call(this);
}
mini.extend(mini.TextArea, mini.TextBox, {
  maxLength: 10000000,


  height: '',
  minHeight: 50,
  _InputType: "textarea",
  uiCls: "mini-textarea",
  doLayout: function () {
    if (!this.canLayout()) return;
    mini.TextArea.superclass.doLayout.call(this);

    var h = mini.getHeight(this.el);


    mini.setHeight(this._borderEl, h);

    h -= 2;
    if (h < 0) h = 0;
    this._textEl.style.height = h + "px";
  }
});
mini.regClass(mini.TextArea, 'textarea');

