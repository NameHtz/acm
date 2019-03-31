mini.Password = function () {
  mini.Password.superclass.constructor.call(this);
}
mini.extend(mini.Password, mini.TextBox, {
  uiCls: "mini-password",
  _InputType: "password",
  setEmptyText: function (value) {
    this.emptyText = "";
  }
});
mini.regClass(mini.Password, 'password');
