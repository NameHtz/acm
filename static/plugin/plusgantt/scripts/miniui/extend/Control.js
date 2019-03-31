mini.Control = function () {
  mini.Control.superclass.constructor.call(this);

  this._create();
  this.el.uid = this.uid;

  this._initEvents();


  if (this._clearBorder) {
    this.el.style.borderWidth = "0";
    this.el.style.padding = "0px";
  }
  this.addCls(this.uiCls);
  this.setWidth(this.width);
  this.setHeight(this.height);

  this.el.style.display = this.visible ? this._displayStyle : "none";
}

mini.extend(mini.Control, mini.Component, {
  jsName: null,

  width: "",
  height: "",

  visible: true,
  readOnly: false,
  enabled: true,

  tooltip: "",

  _readOnlyCls: "mini-readonly",
  _disabledCls: "mini-disabled",

  _create: function () {
    this.el = document.createElement("div");
  },
  _initEvents: function () {
  },
  within: function (e) {
    if (mini.isAncestor(this.el, e.target)) return true;
    return false;
  },

  name: "",
  setName: function (value) {
    this.name = value;

  },
  getName: function () {
    return this.name;
  },


  isAutoHeight: function () {
    var v = this.el.style.height;
    return v == "auto" || v == "";
  },
  isAutoWidth: function () {
    var v = this.el.style.width;
    return v == "auto" || v == "";
  },
  isFixedSize: function () {


    var width = this.width;
    var height = this.height;
    if (parseInt(width) + "px" == width && parseInt(height) + "px" == height) return true;
    return false;
  },

  isRender: function (parentNode) {

    return !!(this.el && this.el.parentNode && this.el.parentNode.tagName);
  },
  render: function (parent, position) {
    if (typeof parent === 'string') {
      if (parent == "#body") parent = document.body;
      else parent = mini.byId(parent);
    }
    if (!parent) return;
    if (!position) position = "append";
    position = position.toLowerCase();

    if (position == "before") {
      jQuery(parent).before(this.el);
    } else if (position == "preend") {
      jQuery(parent).preend(this.el);
    } else if (position == "after") {
      jQuery(parent).after(this.el);
    } else {
      parent.appendChild(this.el);
    }


    this.el.id = this.id;

    this.doLayout();
    this.fire("render");
  },


  getEl: function () {
    return this.el;
  },
  setJsName: function (value) {
    this.jsName = value;
    window[value] = this;
  },
  getJsName: function () {
    return this.jsName;
  },
  setTooltip: function (value) {
    this.tooltip = value;
    this.el.title = value;
  },
  getTooltip: function () {
    return this.tooltip;
  },
  _sizeChaned: function () {
    this.doLayout();
  },
  setWidth: function (value) {
    if (parseInt(value) == value) value += "px";
    this.width = value;
    this.el.style.width = value;
    this._sizeChaned();
  },
  getWidth: function (content) {
    var w = content ? jQuery(this.el).width() : jQuery(this.el).outerWidth();
    if (content && this._borderEl) {
      var b2 = mini.getBorders(this._borderEl);
      w = w - b2.left - b2.right;
    }
    return w;
  },
  setHeight: function (value) {
    if (parseInt(value) == value) value += "px";
    this.height = value;
    this.el.style.height = value;
    this._sizeChaned();
  },
  getHeight: function (content) {
    var h = content ? jQuery(this.el).height() : jQuery(this.el).outerHeight();
    if (content && this._borderEl) {
      var b2 = mini.getBorders(this._borderEl);
      h = h - b2.top - b2.bottom;
    }
    return h;
  },
  getBox: function () {
    return mini.getBox(this.el);
  },
  setBorderStyle: function (value) {

    var el = this._borderEl || this.el;
    mini.setStyle(el, value);
    this.doLayout();
  },
  getBorderStyle: function () {
    return this.borderStyle;
  },
  _clearBorder: true,
  setStyle: function (value) {

    this.style = value;
    mini.setStyle(this.el, value);
    if (this._clearBorder) {
      this.el.style.borderWidth = "0";
    }


    this.width = this.el.style.width;
    this.height = this.el.style.height;

    this._sizeChaned();
  },
  getStyle: function () {
    return this.style;
  },
  setCls: function (cls) {

    this.addCls(cls);
  },
  getCls: function () {
    return this.cls;
  },
  addCls: function (cls) {
    mini.addClass(this.el, cls);
  },
  removeCls: function (cls) {
    mini.removeClass(this.el, cls);
  },
  _doReadOnly: function () {
    if (this.readOnly) {
      this.addCls(this._readOnlyCls);
    } else {
      this.removeCls(this._readOnlyCls);
    }
  },
  setReadOnly: function (value) {
    this.readOnly = value;
    this._doReadOnly();
  },
  getReadOnly: function () {
    return this.readOnly;
  },
  getParent: function (uiCls) {
    var doc = document;
    var p = this.el.parentNode;
    while (p != doc && p != null) {
      var pcontrol = mini.get(p);
      if (pcontrol) {
        if (!mini.isControl(pcontrol)) return null;
        if (!uiCls || pcontrol.uiCls == uiCls) return pcontrol;
      }
      p = p.parentNode;
    }
    return null;
  },
  isReadOnly: function () {
    if (this.readOnly || !this.enabled) return true;
    var p = this.getParent();
    if (p) return p.isReadOnly();
    return false;
  },
  setEnabled: function (value) {
    this.enabled = value;
    if (this.enabled) {
      this.removeCls(this._disabledCls);
    } else {
      this.addCls(this._disabledCls);
    }
    this._doReadOnly();
  },
  getEnabled: function () {
    return this.enabled;
  },
  enable: function () {
    this.setEnabled(true);
  },
  disable: function () {
    this.setEnabled(false);
  },
  _displayStyle: "",
  setVisible: function (value) {
    this.visible = value;
    if (this.el) {
      this.el.style.display = value ? this._displayStyle : "none";
      this.doLayout();
    }
  },
  getVisible: function () {
    return this.visible;
  },
  show: function () {
    this.setVisible(true);
  },
  hide: function () {
    this.setVisible(false);
  },
  isDisplay: function (ignoresFn) {

    if (mini.WindowVisible == false) return false;


    var doc = document.body;
    var p = this.el;
    while (1) {
      if (p == null || !p.style) return false;
      if (p && p.style && p.style.display == "none") {

        if (ignoresFn) {

          if (ignoresFn(p) !== true) return false;
        }
        else return false;
      }
      if (p == doc) return true;

      p = p.parentNode;

    }
    return true;
  },

  _allowUpdate: true,
  beginUpdate: function () {
    this._allowUpdate = false;
  },
  endUpdate: function () {
    this._allowUpdate = true;
    this.doUpdate();
  },
  doUpdate: function () {

  },
  canLayout: function () {

    if (this._allowLayout == false) return false;
    return this.isDisplay();
  },
  doLayout: function () {

  },
  layoutChanged: function () {
    if (this.canLayout() == false) return;
    this.doLayout();
  },

  _destroyChildren: function (removeEl) {
    if (this.el) {
      var cs = mini.getChildControls(this);
      for (var i = 0, l = cs.length; i < l; i++) {
        var control = cs[i];
        if (control.destroyed !== true) {
          control.destroy(removeEl);
        }
      }
    }
  },
  destroy: function (removeEl) {

    if (this.destroyed !== true) {
      this._destroyChildren(removeEl);
    }

    if (this.el) {
      mini.clearEvent(this.el);


      if (removeEl !== false) {
        var p = this.el.parentNode;
        if (p) p.removeChild(this.el);
      }
    }
    this._borderEl = null;
    this.el = null;
    mini["unreg"](this);
    this.destroyed = true;
    this.fire("destroy");
  },

  focus: function () {
    try {
      var me = this;

      me.el.focus();

    } catch (e) {
    }
    ;
  },
  blur: function () {
    try {
      var me = this;

      me.el.blur();

    } catch (e) {
    }
    ;
  },

  allowAnim: true,
  setAllowAnim: function (value) {
    this.allowAnim = value;
  },
  getAllowAnim: function () {
    return this.allowAnim;
  },


  _getMaskWrapEl: function () {
    return this.el;
  },
  mask: function (options) {
    if (typeof options == "string") options = {html: options};
    options = options || {};
    options.el = this._getMaskWrapEl();
    if (!options.cls) options.cls = this._maskCls;
    mini.mask(options);
  },
  unmask: function () {

    mini.unmask(this._getMaskWrapEl());


  },
  _maskCls: "mini-mask-loading",
  loadingMsg: "Loading...",
  loading: function (msg) {

    this.mask(msg || this.loadingMsg);
  },
  setLoadingMsg: function (value) {
    this.loadingMsg = value;
  },
  getLoadingMsg: function () {
    return this.loadingMsg;
  },

  _getContextMenu: function (value) {
    var ui = value;
    if (typeof value == "string") {
      ui = mini.get(value);
      if (!ui) {
        mini.parse(value);
        ui = mini.get(value);
      }
    } else if (mini.isArray(value)) {
      ui = {
        type: "menu",
        items: value
      };
    } else if (!mini.isControl(value)) {
      ui = mini.create(value);
    }
    return ui;
  },
  __OnHtmlContextMenu: function (e) {
    var ev = {
      popupEl: this.el,
      htmlEvent: e,
      cancel: false
    };
    this.contextMenu.fire("BeforeOpen", ev);
    if (ev.cancel == true) return;
    this.contextMenu.fire("opening", ev);
    if (ev.cancel == true) return;
    this.contextMenu.showAtPos(e.pageX, e.pageY);
    this.contextMenu.fire("Open", ev);
    return false;
  },
  contextMenu: null,
  setContextMenu: function (value) {
    var ui = this._getContextMenu(value);
    if (!ui) return;
    if (this.contextMenu !== ui) {
      this.contextMenu = ui;
      this.contextMenu.owner = this;
      mini.on(this.el, "contextmenu", this.__OnHtmlContextMenu, this);
    }
  },
  getContextMenu: function () {
    return this.contextMenu;
  },
  setDefaultValue: function (value) {
    this.defaultValue = value;
  },
  getDefaultValue: function () {
    return this.defaultValue;
  },
  setValue: function (value) {
    this.value = value;
  },
  getValue: function () {
    return this.value;
  },


  _afterApply: function (el) {


  },
  dataField: "",
  setDataField: function (value) {
    this.dataField = value;
  },
  getDataField: function () {
    return this.dataField;
  },

  getAttrs: function (el) {


    var attrs = {};

    var cls = el.className;
    if (cls) attrs.cls = cls;

    if (el.value) attrs.value = el.value;
    mini._ParseString(el, attrs,
      ["id", "name", "width", "height", "borderStyle", "value", "defaultValue",
        "contextMenu", "tooltip", "ondestroy", "data-options", "dataField"
      ]
    );

    mini._ParseBool(el, attrs,
      ["visible", "enabled", "readOnly"
      ]
    );

    if (el.readOnly && el.readOnly != "false") attrs.readOnly = true;

    var style = el.style.cssText;
    if (style) {
      attrs.style = style;
    }

    if (isIE9) {
      var bg = el.style.background;
      if (bg) {
        if (!attrs.style) attrs.style = "";
        attrs.style += ";background:" + bg;
      }
    }
    if (this.style) {
      if (attrs.style) attrs.style = this.style + ";" + attrs.style;
      else attrs.style = this.style;
    }
    if (this.borderStyle) {
      if (attrs.borderStyle) attrs.borderStyle = this.borderStyle + ";" + attrs.borderStyle;
      else attrs.borderStyle = this.borderStyle;
    }


    var ts = mini._attrs;
    if (ts) {
      for (var i = 0, l = ts.length; i < l; i++) {
        var t = ts[i];
        var name = t[0];
        var type = t[1];
        if (!type) type = "string";
        if (type == "string") mini._ParseString(el, attrs, [name]);
        else if (type == "bool") mini._ParseBool(el, attrs, [name]);
        else if (type == "int") mini._ParseInt(el, attrs, [name]);
      }
    }


    var options = attrs["data-options"];
    if (options) {
      options = eval("(" + options + ")");
      if (options) {

        mini.copyTo(attrs, options);
      }
    }

    return attrs;
  }
});
