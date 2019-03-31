mini.Fit = function () {
  mini.Fit.superclass.constructor.call(this);
}
mini.extend(mini.Fit, mini.Container, {

  style: "",
  _clearBorder: false,

  uiCls: "mini-fit",
  _create: function () {
    this.el = document.createElement("div");
    this.el.className = "mini-fit";
    this._bodyEl = this.el;
  },
  _initEvents: function () {

  },
  isFixedSize: function () {
    return false;
  },
  doLayout: function () {
    if (!this.canLayout()) return;

    var parentNode = this.el.parentNode;
    var childNodes = mini.getChildNodes(parentNode);
    if (parentNode == document.body) {
      this.el.style.height = "0px";
    }


    var height = mini.getHeight(parentNode, true);


    for (var i = 0, l = childNodes.length; i < l; i++) {
      var node = childNodes[i];
      var tagName = node.tagName ? node.tagName.toLowerCase() : "";
      if (node == this.el || (tagName == "style" || tagName == "script")) continue;
      var pos = mini.getStyle(node, "position");
      if (pos == "absolute" || pos == "fixed") continue;

      var h = mini.getHeight(node);

      var margin = mini.getMargins(node);
      height = height - h - margin.top - margin.bottom;
    }

    var border = mini.getBorders(this.el);
    var padding = mini.getPaddings(this.el);
    var margin = mini.getMargins(this.el);

    height = height - margin.top - margin.bottom;
    if (jQuery.boxModel) {
      height = height - padding.top - padding.bottom - border.top - border.bottom;
    }
    if (height < 0) height = 0;

    this.el.style.height = height + "px";


    try {
      childNodes = mini.getChildNodes(this.el);
      for (var i = 0, l = childNodes.length; i < l; i++) {
        var node = childNodes[i];
        mini.layout(node);
      }
    } catch (e) {
    }

  },
  set_bodyParent: function (value) {

    if (!value) return;

    var el = this._bodyEl;

    var p = value;
    while (p.firstChild) {
      try {
        el.appendChild(p.firstChild);
      } catch (e) {
      }
    }
    this.doLayout();
  },


  getAttrs: function (el) {
    var attrs = mini.Fit.superclass.getAttrs.call(this, el);

    attrs._bodyParent = el;

    return attrs;
  }
});
mini.regClass(mini.Fit, "fit");