mini.ToolBar = function () {
  mini.ToolBar.superclass.constructor.call(this);
}
mini.extend(mini.ToolBar, mini.Container, {
  _clearBorder: false,
  style: "",

  uiCls: "mini-toolbar",
  _create: function () {
    this.el = document.createElement("div");
    this.el.className = "mini-toolbar";

  },
  _initEvents: function () {

  },
  doLayout: function () {
    if (!this.canLayout()) return;


    var nodes = mini.getChildNodes(this.el, true);
    for (var i = 0, l = nodes.length; i < l; i++) {
      mini.layout(nodes[i]);
    }

  },


  set_bodyParent: function (value) {

    if (!value) return;

    this.el = value;


    this.doLayout();
  },

  getAttrs: function (el) {

    var attrs = {};
    mini._ParseString(el, attrs,
      ["id", "borderStyle"
      ]
    );


    this.el = el;
    this.el.uid = this.uid;

    this.addCls(this.uiCls);


    return attrs;
  }
});
mini.regClass(mini.ToolBar, "toolbar");