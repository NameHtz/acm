mini.Hidden = function () {
  mini.Hidden.superclass.constructor.call(this);

}
mini.extend(mini.Hidden, mini.Control, {
  _clearBorder: false,
  formField: true,
  value: "",

  uiCls: "mini-hidden",
  _create: function () {
    this.el = document.createElement("input");
    this.el.type = "hidden";
    this.el.className = "mini-hidden";
  },
  setName: function (value) {

    this.name = value;
    this.el.name = value;
  },
  setValue: function (value) {
    if (value === null || value === undefined) value = "";
    this.value = value;
    if (mini.isDate(value)) {
      var y = value.getFullYear();
      var m = value.getMonth() + 1;
      var d = value.getDate();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      this.el.value = y + "-" + m + "-" + d;
    } else {
      this.el.value = value;
    }
  },
  getValue: function () {
    return this.value;
  },
  getFormValue: function () {
    return this.el.value;
  }
});
mini.regClass(mini.Hidden, "hidden");
