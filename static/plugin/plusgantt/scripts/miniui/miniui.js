mini = {
  components: {},
  uids: {},
  ux: {},

  isReady: false,


  byClass: function (cls, el) {
    if (typeof el == "string") el = mini.byId(el);
    return jQuery("." + cls, el)[0];
  },
  getComponents: function () {
    var cs = [];
    for (var id in mini.components) {
      var c = mini.components[id];
      cs.push(c);
    }
    return cs;
  },
  get: function (id) {
    if (!id) return null;
    if (mini.isControl(id)) return id;
    if (typeof id == "string") {
      if (id.charAt(0) == '#') id = id.substr(1);
    }
    if (typeof id == "string") return mini.components[id];
    else {
      var control = mini.uids[id.uid];
      if (control && control.el == id) return control;
    }
    return null;
  },
  getbyUID: function (uid) {
    return mini.uids[uid];
  },
  findControls: function (fn, scope) {
    if (!fn) return [];
    scope = scope || mini;
    var controls = [];
    var uids = mini.uids;
    for (var uid in uids) {
      var control = uids[uid];
      var ret = fn.call(scope, control);
      if (ret === true || ret === 1) {
        controls.push(control);
        if (ret === 1) break;
      }
    }
    return controls;
  },
  getChildControls: function (parent) {
    var p = mini.get(parent);
    if (!p) return [];
    var pel = parent.el ? parent.el : parent;
    var controls = mini.findControls(function (control) {
      if (!control.el || parent == control) return false;
      if (mini.isAncestor(pel, control.el) && control.within) return true;
      return false;
    });
    return controls;
  },
  emptyFn: function () {
  },


  createNameControls: function (obj, pre) {
    if (!obj || !obj.el) return;
    if (!pre) pre = "_";
    var el = obj.el;
    var controls = mini.findControls(function (control) {
      if (!control.el || !control.name) return false;
      if (mini.isAncestor(el, control.el)) return true;
      return false;
    });

    for (var i = 0, l = controls.length; i < l; i++) {
      var c = controls[i];
      var name = pre + c.name;
      if (pre === true) {
        name = c.name[0].toUpperCase() + c.name.substring(1, c.name.length);
      }
      obj[name] = c;
    }

  },
  getsbyName: function (name, parentNode) {
    var isControl = mini.isControl(parentNode);
    var parentControl = parentNode;
    if (parentNode && isControl) {
      parentNode = parentNode.el;
    }
    parentNode = mini.byId(parentNode);
    parentNode = parentNode || document.body;
    var controls = mini.findControls(function (control) {
      if (!control.el) return false;
      if (control.name == name && mini.isAncestor(parentNode, control.el)) return true;
      return false;
    }, this);

    if (isControl && controls.length == 0 && parentControl && parentControl.getbyName) {
      var obj = parentControl.getbyName(name);
      if (obj) controls.push(obj);
    }

    return controls;
  },
  getbyName: function (name, parentNode) {
    return mini.getsbyName(name, parentNode)[0];
  },

  getParams: function (url) {
    if (!url) url = location.href;
    url = url.split("?")[1];
    var params = {};
    if (url) {
      var us = url.split("&");
      for (var i = 0, l = us.length; i < l; i++) {
        var ps = us[i].split("=");

        try {
          params[ps[0]] = decodeURIComponent(unescape(ps[1]));
        } catch (ex) {

        }
      }
    }
    return params;
  },

  reg: function (cmp) {
    this.components[cmp.id] = cmp;
    this.uids[cmp.uid] = cmp;

  },
  unreg: function (cmp) {
    delete mini.components[cmp.id];
    delete mini.uids[cmp.uid];
  },

  classes: {},
  uiClasses: {},
  getClass: function (className) {
    if (!className) return null;
    return this.classes[className.toLowerCase()];
  },
  getClassByUICls: function (uiCls) {

    return this.uiClasses[uiCls.toLowerCase()];
  },


  idPre: "mini-",
  idIndex: 1,
  newId: function (idPre) {
    return (idPre || this.idPre) + this.idIndex++;
  },

  copyTo: function (to, from) {
    if (to && from) {
      for (var p in from) {
        to[p] = from[p];
      }
    }
    return to;
  },
  copyIf: function (to, from) {
    if (to && from) {
      for (var p in from) {
        if (mini.isNull(to[p])) {
          to[p] = from[p];
        }
      }
    }
    return to;
  },
  createDelegate: function (fn, scope) {
    if (!fn) return function () {
    };
    return function () {
      return fn.apply(scope, arguments);
    }
  },

  isControl: function (obj) {
    return !!(obj && obj.isControl);
  },
  isElement: function (obj) {
    return obj && obj.appendChild;
  },
  isDate: function (value) {
    return value && value.getFullYear;
  },
  isArray: function (value) {
    return value && !!value.unshift
  },
  isNull: function (value) {
    return value === null || value === undefined;
  },

  isNumber: function (value) {
    return !isNaN(value) && typeof value == 'number';
  },
  isEquals: function (a, b) {

    if (a !== 0 && b !== 0 && !(a instanceof Array) && !(b instanceof Array)) {
      if ((mini.isNull(a) || a == "") && (mini.isNull(b) || b == "")) return true;
    }


    if (a && b && a.getFullYear && b.getFullYear) return a.getTime() === b.getTime();

    if (typeof a == 'object' && typeof b == 'object') {
      return a === b;
    }

    return String(a) === String(b);
  },
  forEach: function (array, method, scope) {
    var list = array.clone();
    for (var i = 0, l = list.length; i < l; i++) {
      var o = list[i];
      if (method.call(scope, o, i, array) === false) break;
    }
  },
  sort: function (array, fn, scope) {
    scope = scope || array;
    array.sort(fn);

  },

  removeNode: function (el) {
    jQuery(el).remove();
  },
  elWarp: document.createElement("div")


};


if (typeof mini_debugger == "undefined") {
  mini_debugger = true;
}


mini_regClass = function (clazz, className) {
  className = className.toLowerCase();
  if (!mini.classes[className]) {
    mini.classes[className] = clazz;
    clazz.prototype.type = className;
  }
  var uiCls = clazz.prototype.uiCls;
  if (!mini.isNull(uiCls) && !mini.uiClasses[uiCls]) {
    mini.uiClasses[uiCls] = clazz;
  }
}
mini_extend = function (newClass, sp, overrides) {
  if (typeof sp != 'function') return this;

  var sb = newClass, sbp = sb.prototype, spp = sp.prototype;
  if (sb.superclass == spp) return;
  sb.superclass = spp;
  sb.superclass.constructor = sp;

  for (var p in spp) {
    sbp[p] = spp[p];
  }
  if (overrides) {
    for (var p in overrides) {
      sbp[p] = overrides[p];
    }
  }
  return sb;
}
mini.copyTo(mini, {
  extend: mini_extend,
  regClass: mini_regClass,
  debug: false
});


mini.namespace = function (names) {
  if (typeof names != "string") return;
  names = names.split(".");
  var parent = window;
  for (var i = 0, l = names.length; i < l; i++) {
    var name = names[i];
    var obj = parent[name];
    if (!obj) {
      obj = parent[name] = {};
    }
    parent = obj;
  }
}

mini._BindCallbacks = [];
mini._BindEvents = function (fn, scope) {
  mini._BindCallbacks.push([fn, scope]);
  if (!mini._EventTimer) {
    mini._EventTimer = setTimeout(function () {
      mini._FireBindEvents();
    }, 50);
  }
}
mini._FireBindEvents = function () {
  for (var i = 0, l = mini._BindCallbacks.length; i < l; i++) {
    var e = mini._BindCallbacks[i];
    e[0].call(e[1]);
  }
  mini._BindCallbacks = [];
  mini._EventTimer = null;
}

mini._getFunctoin = function (fnName) {
  if (typeof fnName != "string") return null;
  var names = fnName.split(".");
  var fn = null;
  for (var i = 0, l = names.length; i < l; i++) {
    var name = names[i];
    if (!fn) fn = window[name];
    else fn = fn[name];
    if (!fn) break;
  }
  return fn;
}

mini._getMap = function (name, obj) {
  if (!name) return null;
  var index = name.indexOf(".");
  if (index == -1 && name.indexOf("[") == -1) return obj[name];
  if (index == (name.length - 1)) return obj[name];
  var s = "obj." + name;
  try {
    var v = eval(s);
  } catch (e) {
    return null;
  }
  return v;
}
mini._setMap = function (name, value, obj) {
  if (!obj) return;
  if (typeof name != "string") return;

  var names = name.split(".");

  function createArray(obj, name, num, defaultValue) {
    var arr = obj[name];
    if (!arr) {
      arr = obj[name] = [];
    }
    for (var i = 0; i <= num; i++) {
      var arrObj = arr[i];
      if (!arrObj) {
        if (defaultValue === null || defaultValue === undefined) {
          arrObj = arr[i] = {};
        } else {
          arrObj = arr[i] = defaultValue;
        }
      }
    }
    return obj[name][num];
  }

  var obj2 = null;
  for (var i = 0, l = names.length; i <= l - 1; i++) {
    var name = names[i];

    if (i == l - 1) {
      if (name.indexOf(']') == -1) {
        obj[name] = value;
      } else {

        var as = name.split("[");
        var n1 = as[0], n2 = parseInt(as[1]);
        createArray(obj, n1, n2, "");
        obj[n1][n2] = value;
      }

      break;
    }

    if (name.indexOf(']') == -1) {

      obj2 = obj[name];
      if (i <= l - 2 && obj2 == null) {
        obj[name] = obj2 = {};
      }
      obj = obj2;
    } else {

      var as = name.split("[");
      var n1 = as[0], n2 = parseInt(as[1]);
      obj = createArray(obj, n1, n2);

    }

  }
  return value;
}


mini.getAndCreate = function (id) {
  if (!id) return null;
  if (typeof id == "string") return mini.components[id];

  if (typeof id == "object") {
    if (mini.isControl(id)) {
      return id;
    } else if (mini.isElement(id)) {
      return mini.uids[id.uid];
    } else {
      return mini.create(id);
    }
  }
  return null;
};
mini.create = function (uiConfig) {
  if (!uiConfig) return null;
  if (mini.get(uiConfig.id) === uiConfig) return uiConfig;
  var clazz = this.getClass(uiConfig.type);
  if (!clazz) return null;
  var ui = new clazz();
  ui.set(uiConfig);
  return ui;
}


mini.Component = function () {
  this._events = {};

  this.uid = mini.newId(this._idPre);
  this._id = this.uid;
  if (!this.id) {
    this.id = this.uid;
  }
  mini.reg(this);


}
mini.Component.prototype = {
  isControl: true,
  id: null,
  _idPre: "mini-",
  _idSet: false,
  _canFire: true,


  set: function (kv) {
    if (typeof kv == 'string') {
      return this;
    }
    var _allowLayout = this._allowLayout;
    this._allowLayout = false;

    var renderTo = kv.renderTo || kv.render;
    delete kv.renderTo;
    delete kv.render;

    for (var key in kv) {
      if (key.toLowerCase().indexOf('on') == 0) {

        var fn = kv[key];
        this.on(key.substring(2, key.length).toLowerCase(), fn);
        delete kv[key];
      }
    }


    for (var key in kv) {
      var v = kv[key];
      var n = 'set' + key.charAt(0).toUpperCase() + key.substring(1, key.length);
      var setter = this[n];
      if (setter) {
        setter.call(this, v);
      } else {
        this[key] = v;
      }
    }

    if (renderTo && this.render) {
      this.render(renderTo);
    }

    this._allowLayout = _allowLayout;
    if (this.doLayout) this.doLayout();

    return this;
  },

  fire: function (type, event) {
    if (this._canFire == false) return;
    type = type.toLowerCase();
    var handlers = this._events[type];
    if (handlers) {
      if (!event) event = {};
      if (event && event != this) {
        event.source = event.sender = this;
        if (!event.type) {
          event.type = type;
        }
      }
      for (var i = 0, l = handlers.length; i < l; i++) {
        var listener = handlers[i];
        if (listener) {
          listener[0].apply(listener[1], [event]);
        }
      }
    }
  },
  on: function (type, fn, scope) {

    if (typeof fn == "string") {

      var f = mini._getFunctoin(fn);
      if (!f) {

        var id = mini.newId("__str_");
        window[id] = fn;

        eval("fn = function(e){var s = " + id + ";var fn = mini._getFunctoin(s); if(fn) {fn.call(this, e)}else{eval(s);}}");
      } else {
        fn = f;
      }
    }

    if (typeof fn != 'function' || !type) return false;
    type = type.toLowerCase();
    var event = this._events[type];
    if (!event) {
      event = this._events[type] = [];
    }
    scope = scope || this;
    if (!this.findListener(type, fn, scope)) {
      event.push([fn, scope]);
    }
    return this;
  },
  un: function (type, fn, scope) {
    if (typeof fn != 'function') return false;
    type = type.toLowerCase();
    var event = this._events[type];
    if (event) {
      scope = scope || this;
      var listener = this.findListener(type, fn, scope);
      if (listener) {
        event.remove(listener);
      }
    }
    return this;
  },
  findListener: function (type, fn, scope) {
    type = type.toLowerCase();
    scope = scope || this;
    var handlers = this._events[type];
    if (handlers) {
      for (var i = 0, l = handlers.length; i < l; i++) {
        var listener = handlers[i];
        if (listener[0] === fn && listener[1] === scope) return listener;
      }
    }
  },


  setId: function (id) {
    if (!id) throw new Error("id not null");
    if (this._idSet) throw new Error("id just set only one");
    mini["unreg"](this);
    this.id = id;
    if (this.el) this.el.id = id;
    if (this._textEl) this._textEl.id = id + "$text";
    if (this._valueEl) this._valueEl.id = id + "$value";
    this._idSet = true;
    mini.reg(this);
  },
  getId: function () {
    return this.id;
  },
  destroy: function () {
    mini["unreg"](this);
    this.fire("destroy");
  }
}


mini._attrs = null;
mini.regHtmlAttr = function (attr, type) {
  if (!attr) return;
  if (!type) type = "string";
  if (!mini._attrs) mini._attrs = [];
  mini._attrs.push([attr, type]);
}


__mini_setControls = function (controls, contentEl, scope) {
  contentEl = contentEl || this._contentEl;
  scope = scope || this;
  if (!controls) controls = [];
  if (!mini.isArray(controls)) controls = [controls];


  for (var i = 0, l = controls.length; i < l; i++) {
    var c = controls[i];
    if (typeof c == "string") {
      if (c.indexOf("#") == 0) c = mini.byId(c);
    } else if (mini.isElement(c)) {
    } else {
      c = mini.getAndCreate(c);
      c = c.el;
    }
    if (!c) continue;

    mini.append(contentEl, c);


  }


  mini.parse(contentEl);
  scope.doLayout();
  return scope;
}


mini._Layouts = {};
mini.layout = function (el, mustLayout) {
  if (!document.body) return;

  function doLayout(el) {
    if (!el) return;
    var control = mini.get(el);
    if (control) {


      if (control.doLayout) {
        if (!mini._Layouts[control.uid]) {
          mini._Layouts[control.uid] = control;


          if (mustLayout !== false || control.isFixedSize() == false) {
            control.doLayout(false);
          }

          delete mini._Layouts[control.uid];
        }
      }
    } else {
      var cs = el.childNodes;
      if (cs) {
        for (var i = 0, l = cs.length; i < l; i++) {
          var cel = cs[i];
          doLayout(cel);
        }
      }
    }
  }

  if (!el) el = document.body;
  doLayout(el);

  if (el == document.body) {
    mini.layoutIFrames();
  }
}


mini.applyTo = function (el) {
  el = mini.byId(el);
  if (!el) return this;
  if (mini.get(el)) throw new Error("not applyTo a mini control");


  var config = this.getAttrs(el);
  delete config._applyTo;

  if (mini.isNull(config.defaultValue) && !mini.isNull(config.value)) {
    config.defaultValue = config.value;
  }
  if (mini.isNull(config.defaultText) && !mini.isNull(config.text)) {
    config.defaultText = config.text;
  }

  var p = el.parentNode;
  if (p && this.el != el) {


    p.replaceChild(this.el, el);


  }

  this.set(config);


  this._afterApply(el);

  return this;
}
mini._doParse = function (el) {
  if (!el) return;
  var nodeName = el.nodeName.toLowerCase();
  if (!nodeName) return;

  var className = el.className;
  if (className && className.split) {
    var control = mini.get(el);
    if (!control) {
      var classes = className.split(" ");
      for (var i = 0, l = classes.length; i < l; i++) {
        var cls = classes[i];
        var clazz = mini.getClassByUICls(cls);
        if (clazz) {
          mini.removeClass(el, cls);
          var ui = new clazz();
          mini.applyTo.call(ui, el);
          el = ui.el;
          break;
        }
      }
    }
  }

  if (nodeName == "select"
    || mini.hasClass(el, "mini-menu")
    || mini.hasClass(el, "mini-datagrid")
    || mini.hasClass(el, "mini-treegrid")
    || mini.hasClass(el, "mini-tree")
    || mini.hasClass(el, "mini-button")
    || mini.hasClass(el, "mini-textbox")
    || mini.hasClass(el, "mini-buttonedit")
  ) {
    return;
  }

  var children = mini.getChildNodes(el, true);
  for (var i = 0, l = children.length; i < l; i++) {
    var node = children[i];
    if (node.nodeType == 1) {
      if (node.parentNode == el) {
        mini._doParse(node);
      }
    }
  }
}
mini._Removes = [];
mini._firstParse = true;
mini.parse = function (el, layout) {
  if (mini._firstParse) {
    mini._firstParse = false;

    var doms = document.getElementsByTagName("iframe");
    for (var i = 0, l = doms.length; i < l; i++) {
      var d = doms[i];
      d._onload = d.onload;
      d._src = d.src;
      d.onload = function () {
      };
      d.src = "";
    }
    setTimeout(function () {
      for (var i = 0, l = doms.length; i < l; i++) {
        var d = doms[i];
        if (d._src) {
          d.onload = d._onload;
          d.src = d._src;
          d._src = null;
        }
      }
    }, 10);

  }


  if (typeof el == "string") {
    var id = el;
    el = mini.byId(id);
    if (!el) el = document.body;


  }
  if (el && !mini.isElement(el)) el = el.el;
  if (!el) el = document.body;


  var visible = mini.WindowVisible;
  if (isIE) {
    mini.WindowVisible = false;
  }


  mini._doParse(el);

  mini.WindowVisible = visible;


  mini.layout(el);
}
mini._ParseString = function (el, config, attrs) {
  for (var i = 0, l = attrs.length; i < l; i++) {
    var property = attrs[i];

    var value = mini.getAttr(el, property);
    if (value) {
      config[property] = value;
    }
  }
}
mini._ParseBool = function (el, config, attrs) {
  for (var i = 0, l = attrs.length; i < l; i++) {
    var property = attrs[i];
    var value = mini.getAttr(el, property);
    if (value) {
      config[property] = value == "true" ? true : false;
    }
  }
}
mini._ParseInt = function (el, config, attrs) {
  for (var i = 0, l = attrs.length; i < l; i++) {
    var property = attrs[i];
    var value = parseInt(mini.getAttr(el, property));
    if (!isNaN(value)) {
      config[property] = value;
    }
  }
}


mini._ParseColumns = function (el) {
  var columns = [];
  var cs = mini.getChildNodes(el);
  for (var i = 0, l = cs.length; i < l; i++) {
    var node = cs[i];
    var jq = jQuery(node);

    var column = {};

    var editor = null, filter = null;


    var subCs = mini.getChildNodes(node);
    if (subCs) {
      for (var ii = 0, li = subCs.length; ii < li; ii++) {
        var subNode = subCs[ii];
        var property = jQuery(subNode).attr("property");
        if (!property) continue;
        property = property.toLowerCase();
        if (property == "columns") {
          column.columns = mini._ParseColumns(subNode);
          jQuery(subNode).remove();
        }
        if (property == "editor" || property == "filter") {

          var className = subNode.className;
          var classes = className.split(" ");
          for (var i3 = 0, l3 = classes.length; i3 < l3; i3++) {
            var cls = classes[i3];
            var clazz = mini.getClassByUICls(cls);
            if (clazz) {
              var ui = new clazz();

              if (property == "filter") {
                filter = ui.getAttrs(subNode);
                filter.type = ui.type;
              } else {
                editor = ui.getAttrs(subNode);
                editor.type = ui.type;
              }
              break;
            }
          }

          jQuery(subNode).remove();
        }
      }
    }

    column.header = node.innerHTML;
    mini._ParseString(node, column,
      ["name", "header", "field", "editor", "filter", "renderer", "width", "type", "renderer",
        "headerAlign", "align", "headerCls", "cellCls", "headerStyle", "cellStyle"
        , "displayField"
        , "dateFormat", "listFormat", "mapFormat",
        'trueValue', "falseValue", "dataType", 'vtype', "currencyUnit",
        "summaryType", "summaryRenderer", "groupSummaryType", "groupSummaryRenderer",
        "defaultValue", "defaultText", "decimalPlaces", "data-options"
      ]
    );
    mini._ParseBool(node, column,
      ["visible", "readOnly", "allowSort", "allowResize", "allowMove", "allowDrag", "autoShowPopup",
        "unique", "autoEscape"
      ]
    );

    if (editor) column.editor = editor;
    if (filter) column.filter = filter;

    if (column.dataType) column.dataType = column.dataType.toLowerCase();

    if (column.defaultValue === "true") column.defaultValue = true;
    if (column.defaultValue === "false") column.defaultValue = false;

    columns.push(column);


    var options = column["data-options"];
    if (options) {
      options = eval("(" + options + ")");
      if (options) {

        mini.copyTo(column, options);
      }
    }
  }
  return columns;
}


mini._Columns = {};
mini._getColumn = function (columnType) {
  var columnFn = mini._Columns[columnType.toLowerCase()];
  if (!columnFn) return {};
  return columnFn();
}


mini.IndexColumn = function (config) {
  return mini.copyTo({
    width: 30, cellCls: "", align: "center", draggable: false, allowDrag: true,
    init: function (grid) {
      grid.on("addrow", this.__OnIndexChanged, this);
      grid.on("removerow", this.__OnIndexChanged, this);
      grid.on("moverow", this.__OnIndexChanged, this);


      if (grid.isTree) {
        grid.on("loadnode", this.__OnIndexChanged, this);
        this._gridUID = grid.uid;
        this._rowIdField = "_id";
      }
    },
    getNumberId: function (record) {
      return this._gridUID + "$number$" + record[this._rowIdField];
    },
    createNumber: function (grid, rowIndex) {
      if (mini.isNull(grid.pageIndex)) {
        return rowIndex + 1;
      }
      else return (grid.pageIndex * grid.pageSize) + rowIndex + 1;
    },
    renderer: function (e) {
      var grid = e.sender;
      if (this.draggable) {
        if (!e.cellStyle) e.cellStyle = "";
        e.cellStyle += ";cursor:move;";
      }
      var s = '<div id="' + this.getNumberId(e.record) + '">';
      if (mini.isNull(grid.pageIndex)) s += e.rowIndex + 1;
      else s += (grid.pageIndex * grid.pageSize) + e.rowIndex + 1;
      s += '</div>';
      return s;
    },
    __OnIndexChanged: function (e) {
      var grid = e.sender;

      var records = grid.toArray();

      for (var i = 0, l = records.length; i < l; i++) {
        var record = records[i];
        var id = this.getNumberId(record);
        var ck = document.getElementById(id);
        if (ck) ck.innerHTML = this.createNumber(grid, i);
      }

    }
  }, config);
}
mini._Columns["indexcolumn"] = mini.IndexColumn;


mini.CheckColumn = function (config) {
  return mini.copyTo(
    {
      width: 30, cellCls: "mini-checkcolumn", headerCls: "mini-checkcolumn",
      _multiRowSelect: true,
      header: function (column) {


        var id = this.uid + "checkall";
        var s = '<input type="checkbox" id="' + id + '" />';
        if (this.multiSelect == false) s = "";
        return s;
      },
      getCheckId: function (record) {
        return this._gridUID + "$checkcolumn$" + record[this._rowIdField];
      },
      init: function (grid) {
        grid.on("selectionchanged", this.__OnSelectionChanged, this);
        grid.on("HeaderCellClick", this.__OnHeaderCellClick, this);
      },
      renderer: function (e) {
        var id = this.getCheckId(e.record);
        var selected = e.sender.isSelected ? e.sender.isSelected(e.record) : false;

        var type = "checkbox";

        var grid = e.sender;
        if (grid.multiSelect == false) type = "radio";

        return '<input type="' + type + '" id="' + id + '" ' + (selected ? "checked" : "") + ' hidefocus style="outline:none;" onclick="return false"/>';
      },
      __OnHeaderCellClick: function (e) {
        var grid = e.sender;
        if (e.column != this) return;
        var id = grid.uid + "checkall";
        var ck = document.getElementById(id);
        if (ck) {

          if (grid.getMultiSelect()) {
            if (ck.checked) {
              grid.selectAll();
            } else {
              grid.deselectAll();
            }
          } else {
            grid.deselectAll();
            if (ck.checked) {
              grid.select(0);
            }
          }
          grid.fire("checkall");
        }
      },
      __OnSelectionChanged: function (e) {
        var grid = e.sender;
        var records = grid.toArray();

        for (var i = 0, l = records.length; i < l; i++) {
          var record = records[i];
          var select = grid.isSelected(record);
          var id = grid.uid + "$checkcolumn$" + record[grid._rowIdField];
          var ck = document.getElementById(id);

          if (ck) ck.checked = select;
        }
        var me = this;
        if (!this._timer) {
          this._timer = setTimeout(function () {
            me._doCheckState(grid);
            me._timer = null;
          }, 10);
        }
      },
      _doCheckState: function (grid) {


        var id = grid.uid + "checkall";
        var ck = document.getElementById(id);
        if (ck && grid._getSelectAllCheckState) {

          var state = grid._getSelectAllCheckState();
          if (state == "has") {
            ck.indeterminate = true;
            ck.checked = true;
          } else {
            ck.indeterminate = false;
            ck.checked = state;
          }
        }
      }
    }, config);
};
mini._Columns["checkcolumn"] = mini.CheckColumn;


mini.ExpandColumn = function (config) {
  return mini.copyTo({
    width: 30, cellCls: "", align: "center", draggable: false, cellStyle: "padding:0",
    renderer: function (e) {
      return '<a class="mini-grid-ecIcon" href="javascript:#" onclick="return false"></a>';
    },
    init: function (grid) {
      grid.on("cellclick", this.__OnCellClick, this);
    },
    __OnCellClick: function (e) {
      var grid = e.sender;
      if (e.column == this && grid.isShowRowDetail) {
        if (mini.findParent(e.htmlEvent.target, "mini-grid-ecIcon")) {
          var isShow = grid.isShowRowDetail(e.record);
          if (grid.autoHideRowDetail) {
            grid.hideAllRowDetail();
          }

          if (isShow) {
            grid.hideRowDetail(e.record);
          } else {
            grid.showRowDetail(e.record);
          }
        }
      }
    }
  }, config);
}
mini._Columns["expandcolumn"] = mini.ExpandColumn;


mini.CheckBoxColumn = function (config) {
  return mini.copyTo({
    _type: "checkboxcolumn",
    header: "#", headerAlign: "center", cellCls: "mini-checkcolumn", trueValue: true, falseValue: false,
    readOnly: false,
    getCheckId: function (record) {
      return this._gridUID + "$checkbox$" + record[this._rowIdField];
    },
    getCheckBoxEl: function (record) {
      return document.getElementById(this.getCheckId(record));
    },
    renderer: function (e) {
      var id = this.getCheckId(e.record);
      var v = mini._getMap(e.field, e.record);
      var checked = v == this.trueValue ? true : false;
      var type = "checkbox";


      return '<input type="' + type + '" id="' + id + '" ' + (checked ? "checked" : "") + ' hidefocus style="outline:none;" onclick="return false;"/>';
    },


    init: function (grid) {
      this.grid = grid;

      function oneditchange(e) {

        if (grid.isReadOnly() || this.readOnly) return;
        e.value = mini._getMap(e.field, e.record);
        grid.fire("cellbeginedit", e);

        if (e.cancel !== true) {


          var v = mini._getMap(e.column.field, e.record);
          var value = v == this.trueValue ? this.falseValue : this.trueValue;
          if (grid._OnCellCommitEdit) {
            grid._OnCellCommitEdit(e.record, e.column, value);


          }
        }
      }

      function onEdit(e) {

        if (e.column == this) {

          var id = this.getCheckId(e.record);
          var ck = e.htmlEvent.target;
          if (ck.id == id) {
            if (grid.allowCellEdit) {
              e.cancel = false;
              oneditchange.call(this, e);
            } else {
              if (grid.isEditingRow && grid.isEditingRow(e.record)) {
                setTimeout(function () {
                  ck.checked = !ck.checked;
                }, 1);
              }
            }
          }
        }
      }

      grid.on("cellclick", onEdit, this);
      mini.on(this.grid.el, "keydown", function (e) {
        if (e.keyCode == 32 && grid.allowCellEdit) {
          var currentCell = grid.getCurrentCell();
          if (!currentCell) return;
          var ex = {record: currentCell[0], column: currentCell[1]};
          ex.field = ex.column.field;
          oneditchange.call(this, ex);
          e.preventDefault();
        }
      }, this);


      var tv = parseInt(this.trueValue), fv = parseInt(this.falseValue);
      if (!isNaN(tv)) this.trueValue = tv;
      if (!isNaN(fv)) this.falseValue = fv;
    }
  }, config);
};
mini._Columns["checkboxcolumn"] = mini.CheckBoxColumn;


mini.RadioButtonColumn = function (config) {
  return mini.copyTo({
    _type: "radiobuttoncolumn",
    header: "", headerAlign: "center", cellCls: "mini-checkcolumn", trueValue: true, falseValue: false,
    readOnly: false,
    getCheckId: function (record) {
      return this._gridUID + "$radio$" + record[this._rowIdField];
    },
    getCheckBoxEl: function (record) {
      return document.getElementById(this.getCheckId(record));
    },
    renderer: function (e) {
      var grid = e.sender;
      var id = this.getCheckId(e.record);
      var v = mini._getMap(e.field, e.record);
      var checked = v == this.trueValue ? true : false;
      var type = "radio";
      var name = grid._id + e.column.field;

      var disabled = '';


      var s = '<div style="position:relative;">';
      s += '<input name="' + name + '" type="' + type + '" id="' + id + '" ' + (checked ? "checked" : "") + ' hidefocus style="outline:none;" onclick="return false;" style="position:relative;z-index:1;"/>';
      if (!grid.allowCellEdit) {
        if (!grid.isEditingRow(e.record)) {
          s += '<div class="mini-grid-radio-mask"></div>';
        }
      }
      s += '</div>';
      return s;
    },


    init: function (grid) {
      this.grid = grid;

      function oneditchange(e) {
        if (grid.isReadOnly() || this.readOnly) return;
        e.value = mini._getMap(e.field, e.record);
        grid.fire("cellbeginedit", e);

        if (e.cancel !== true) {
          var v = mini._getMap(e.column.field, e.record);
          if (v == this.trueValue) return;
          var value = v == this.trueValue ? this.falseValue : this.trueValue;


          var data = grid.getData();

          for (var i = 0, l = data.length; i < l; i++) {
            var row = data[i];
            if (row == e.record) continue;
            var v = mini._getMap(e.column.field, row);
            if (v != this.falseValue) {


              grid.updateRow(row, e.column.field, this.falseValue);
            }
          }

          if (grid._OnCellCommitEdit) {
            grid._OnCellCommitEdit(e.record, e.column, value);
          }
        }
      }

      function onEdit(e) {
        if (e.column == this) {
          var id = this.getCheckId(e.record);
          var ck = e.htmlEvent.target;
          if (ck.id == id) {
            if (grid.allowCellEdit) {
              e.cancel = false;
              oneditchange.call(this, e);
            } else {
              if (grid.isEditingRow && grid.isEditingRow(e.record)) {
                var that = this;
                setTimeout(function () {
                  ck.checked = true;


                  var data = grid.getData();
                  for (var i = 0, l = data.length; i < l; i++) {
                    var row = data[i];
                    if (row == e.record) continue;
                    var field = e.column.field;
                    var v = mini._getMap(field, row);
                    if (v != that.falseValue) {
                      if (row != e.record) {
                        if (grid._dataSource) {
                          mini._setMap(e.column.field, that.falseValue, row);
                          grid._dataSource._setModified(row, field, v);
                        } else {
                          var o = {};
                          mini._setMap(field, that.falseValue, o);
                          grid._doUpdateRow(row, o);
                        }
                      }
                    }
                  }


                }, 1);
              }
            }
          }
        }
      }

      grid.on("cellclick", onEdit, this);

      mini.on(this.grid.el, "keydown", function (e) {
        if (e.keyCode == 32 && grid.allowCellEdit) {
          var currentCell = grid.getCurrentCell();
          if (!currentCell) return;
          if (currentCell[1] != this) return;
          var ex = {record: currentCell[0], column: currentCell[1]};
          ex.field = ex.column.field;
          oneditchange.call(this, ex);
          e.preventDefault();
        }
      }, this);


      var tv = parseInt(this.trueValue), fv = parseInt(this.falseValue);
      if (!isNaN(tv)) this.trueValue = tv;
      if (!isNaN(fv)) this.falseValue = fv;
    }
  }, config);
};
mini._Columns["radiobuttoncolumn"] = mini.RadioButtonColumn;


mini.ComboBoxColumn = function (config) {
  return mini.copyTo(
    {
      renderer: function (e) {
        var value = !mini.isNull(e.value) ? String(e.value) : "";
        var values = value.split(",");

        var valueField = "id", textField = "text";
        var valueMaps = {};

        var editor = e.column.editor;
        if (editor && editor.type == "combobox") {
          var combo = this.__editor;
          if (!combo) {

            if (mini.isControl(editor)) {
              combo = editor;
            } else {
              editor = mini.clone(editor);
              combo = mini.create(editor);
            }
            this.__editor = combo;
          }

          valueField = combo.getValueField();
          textField = combo.getTextField();

          valueMaps = this._valueMaps;
          if (!valueMaps) {
            valueMaps = {};
            var data = combo.getData();
            for (var i = 0, l = data.length; i < l; i++) {
              var o = data[i];
              valueMaps[o[valueField]] = o;
            }
            this._valueMaps = valueMaps;
          }
        }

        var texts = [];
        for (var i = 0, l = values.length; i < l; i++) {
          var id = values[i];
          var o = valueMaps[id];
          if (o) {
            var text = o[textField];
            if (text === null || text === undefined) {
              text = "";
            }
            texts.push(text);
          }
        }
        return texts.join(',');
      }
    }, config);
};
mini._Columns["comboboxcolumn"] = mini.ComboBoxColumn;


mini._Resizer = function (grid) {
  this.owner = grid;
  mini.on(this.owner.el, "mousedown", this.__OnMouseDown, this);
}
mini._Resizer.prototype = {
  __OnMouseDown: function (e) {

    var has = mini.hasClass(e.target, "mini-resizer-trigger");
    if (has && this.owner.allowResize) {
      var drag = this._getResizeDrag();
      drag.start(e);
    }
  },
  _getResizeDrag: function () {
    if (!this._resizeDragger) {
      this._resizeDragger = new mini.Drag({
        capture: true,
        onStart: mini.createDelegate(this._OnDragStart, this),
        onMove: mini.createDelegate(this._OnDragMove, this),
        onStop: mini.createDelegate(this._OnDragStop, this)
      });
    }
    return this._resizeDragger;
  },
  _OnDragStart: function (drag) {

    this.proxy = mini.append(document.body, '<div class="mini-resizer-proxy"></div>');
    this.proxy.style.cursor = "se-resize";

    this.elBox = mini.getBox(this.owner.el);
    mini.setBox(this.proxy, this.elBox);
  },
  _OnDragMove: function (drag) {
    var grid = this.owner;
    var xOffset = drag.now[0] - drag.init[0];
    var yOffset = drag.now[1] - drag.init[1];

    var w = this.elBox.width + xOffset;
    var h = this.elBox.height + yOffset;
    if (w < grid.minWidth) w = grid.minWidth;
    if (h < grid.minHeight) h = grid.minHeight;
    if (w > grid.maxWidth) w = grid.maxWidth;
    if (h > grid.maxHeight) h = grid.maxHeight;

    mini.setSize(this.proxy, w, h);
  },
  _OnDragStop: function (drag, success) {
    if (!this.proxy) return;
    var box = mini.getBox(this.proxy);

    jQuery(this.proxy).remove();
    this.proxy = null;
    this.elBox = null;

    if (success) {
      this.owner.setWidth(box.width);
      this.owner.setHeight(box.height);
      this.owner.fire("resize");
    }
  }
};


mini._topWindow = null;
mini._getTopWindow = function () {
  if (mini._topWindow) return mini._topWindow;
  var ps = [];

  function getParents(me) {
    try {
      me["___try"] = 1;
      ps.push(me);
    } catch (ex) {
    }
    if (me.parent && me.parent != me) {
      getParents(me.parent);
    }
  }

  getParents(window);
  mini._topWindow = ps[ps.length - 1];
  return mini._topWindow;
}

var __ps = mini.getParams();

if (__ps._winid) {
  try {
    window.Owner = mini._getTopWindow()[__ps._winid];
  } catch (ex) {
  }
}


mini._WindowID = "w" + Math.floor(Math.random() * 10000);
mini._getTopWindow()[mini._WindowID] = window;

mini.__IFrameCreateCount = 1;
mini.createIFrame = function (url, onIFrameLoad) {

  var fnName = "__iframe_onload" + mini.__IFrameCreateCount++;
  window[fnName] = __OnLoad;

  if (!url) url = "";
  var urls = url.split("#");
  url = urls[0];

  var t = '_t=' + Math.floor(Math.random() * 1000000);
  if (url.indexOf("?") == -1) {
    url += "?" + t;
  } else {
    url += "&" + t;
  }
  if (urls[1]) {
    url = url + "#" + urls[1];
  }


  var s = '<iframe style="width:100%;height:100%;" onload="' + fnName + '()"  frameborder="0"></iframe>';

  var div = document.createElement("div");
  var iframe = mini.append(div, s);

  var canFireLoad = false;
  setTimeout(function () {
    if (iframe) {
      iframe.src = url;
      canFireLoad = true;
    }
  }, 5);


  var firstLoad = true;

  function __OnLoad() {

    if (canFireLoad == false) return;

    setTimeout(function () {
      if (onIFrameLoad) onIFrameLoad(iframe, firstLoad);
      firstLoad = false;


    }, 1);
  }


  iframe._ondestroy = function () {

    window[fnName] = mini.emptyFn;

    iframe.src = "";
    try {
      iframe.contentWindow.document.write("");
      iframe.contentWindow.document.close();
    } catch (ex) {
    }
    iframe._ondestroy = null;
    iframe = null;

  }


  return iframe;
}

mini._doOpen = function (options) {
  if (typeof options == "string") {
    options = {url: options};
  }

  options = mini.copyTo({
    width: 700,
    height: 400,
    allowResize: true,
    allowModal: true,
    closeAction: "destroy",

    title: "",
    titleIcon: "",
    iconCls: "",
    iconStyle: "",
    bodyStyle: "padding: 0",

    url: "",

    showCloseButton: true,
    showFooter: false
  }, options);

  options.closeAction = "destroy";

  var onload = options.onload;
  delete options.onload;
  var ondestroy = options.ondestroy;
  delete options.ondestroy;
  var url = options.url;
  delete options.url;

  var box = mini.getViewportBox();
  if (options.width && String(options.width).indexOf('%') != -1) {
    var w = parseInt(options.width);
    options.width = parseInt(box.width * (w / 100));
  }
  if (options.height && String(options.height).indexOf('%') != -1) {
    var h = parseInt(options.height);
    options.height = parseInt(box.height * (h / 100));
  }

  var win = new mini.Window();
  win.set(options);
  win.load(url,
    onload,
    ondestroy
  );
  win.show();

  return win;
}


mini.open = function (options) {
  if (!options) return;

  var url = options.url;
  if (!url) url = "";
  var urls = url.split("#");
  var url = urls[0];

  var t = "_winid=" + mini._WindowID;
  if (url.indexOf("?") == -1) {
    url += "?" + t;
  } else {
    url += "&" + t;
  }
  if (urls[1]) {
    url = url + "#" + urls[1];
  }

  options.url = url;

  options.Owner = window;
  var ps = [];

  function getParents(me) {
    if (me.mini) ps.push(me);
    if (me.parent && me.parent != me) {
      getParents(me.parent);
    }
  }

  getParents(window);

  var win = ps[ps.length - 1];
  return win["mini"]._doOpen(options);
}
mini.openTop = mini.open;


mini.getData = function (url, params, success, error, type) {
  var text = mini.getText(url, params, success, error, type);
  var data = mini.decode(text);
  return data;
}
mini.getText = function (url, params, success, error, type) {
  var returnText = null;
  mini.ajax({
    url: url,
    data: params,
    async: false,
    type: type ? type : "get",
    cache: false,
    success: function (text, http) {
      returnText = text;
      if (success) success(text, http);
    },
    error: error
  });
  return returnText;
}


if (!window.mini_RootPath) {
  mini_RootPath = "/";
}
mini_CreateJSPath = function (js) {
  var scripts = document.getElementsByTagName("script");
  var path = "";
  for (var i = 0, l = scripts.length; i < l; i++) {
    var src = scripts[i].src;
    if (src.indexOf(js) != -1) {
      var ss = src.split(js);
      path = ss[0];
      break;
    }
  }
  var href = location.href;
  href = href.split("#")[0];
  href = href.split("?")[0];
  var ss = href.split("/");
  ss.length = ss.length - 1;
  href = ss.join("/");

  if (path.indexOf("http:") == -1 && path.indexOf("file:") == -1) {
    path = href + "/" + path;
  }
  return path;
}
if (!window.mini_JSPath) {
  mini_JSPath = mini_CreateJSPath("miniui.js");
}


mini.update = function (options, el) {
  if (typeof options == "string") options = {url: options};
  if (el) options.el = el;
  var html = mini.loadText(options.url);
  mini.innerHTML(options.el, html);
  mini.parse(options.el);
}


mini.createSingle = function (Type) {
  if (typeof Type == "string") {
    Type = mini.getClass(Type);
  }
  if (typeof Type != "function") return;
  var obj = Type.single;
  if (!obj) {
    obj = Type.single = new Type();
  }
  return obj;
}
mini.createTopSingle = function (Type) {
  if (typeof Type != "function") return;

  var typeName = Type.prototype.type;
  if (top && top != window && top.mini && top.mini.getClass(typeName)) {
    return top.mini.createSingle(typeName);
  } else {
    return mini.createSingle(Type);
  }
}


mini.sortTypes = {
  "string": function (s) {
    return String(s).toUpperCase();
  },
  "date": function (s) {
    if (!s) {
      return 0;
    }
    if (mini.isDate(s)) {
      return s.getTime();
    }
    return mini.parseDate(String(s));
  },
  "float": function (s) {
    var val = parseFloat(String(s).replace(/,/g, ""));
    return isNaN(val) ? 0 : val;
  },
  "int": function (s) {
    var val = parseInt(String(s).replace(/,/g, ""), 10);
    return isNaN(val) ? 0 : val;
  },
  "currency": function (s) {
    var val = parseFloat(String(s).replace(/,/g, ""));
    return isNaN(val) ? 0 : val;
  }
};


mini._ValidateVType = function (vtype, value, e, scope) {
  var vtypes = vtype.split(";");
  for (var i = 0, l = vtypes.length; i < l; i++) {
    var vtype = vtypes[i].trim();
    var vv = vtype.split(":");
    var vt = vv[0];
    var args = vtype.substr(vt.length + 1, 1000);
    if (args) args = args.split(",");
    else args = [];

    var fn = mini.VTypes[vt];
    if (fn) {
      var isValid = fn(value, args);
      if (isValid !== true) {
        e.isValid = false;
        var vtext = vv[0] + "ErrorText";
        e.errorText = scope[vtext] || mini.VTypes[vtext] || "";
        e.errorText = String.format(e.errorText, args[0], args[1], args[2], args[3], args[4]);
        break;
      }
    }
  }
}
mini._getErrorText = function (obj, field) {
  if (obj && obj[field]) {
    return obj[field];
  } else {
    return mini.VTypes[field]
  }

}
mini.VTypes = {
  uniqueErrorText: "This field is unique.",
  requiredErrorText: "This field is required.",
  emailErrorText: "Please enter a valid email address.",
  urlErrorText: "Please enter a valid URL.",
  floatErrorText: "Please enter a valid number.",
  intErrorText: "Please enter only digits",
  dateErrorText: "Please enter a valid date. Date format is {0}",
  maxLengthErrorText: "Please enter no more than {0} characters.",
  minLengthErrorText: "Please enter at least {0} characters.",
  maxErrorText: "Please enter a value less than or equal to {0}.",
  minErrorText: "Please enter a value greater than or equal to {0}.",
  rangeLengthErrorText: "Please enter a value between {0} and {1} characters long.",
  rangeCharErrorText: "Please enter a value between {0} and {1} characters long.",
  rangeErrorText: "Please enter a value between {0} and {1}.",

  required: function (v, args) {
    if (mini.isNull(v) || v === "") return false;
    return true;
  },
  email: function (v, args) {
    if (mini.isNull(v) || v === "") return true;
    if (v.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
      return true;
    else
      return false;
  },
  url: function (v, args) {
    if (mini.isNull(v) || v === "") return true;

    function IsURL(str_url) {
      str_url = str_url.toLowerCase();


      var strRegex = "^((https|http|ftp|rtsp|mms)?:\/\/)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}"
        + "|"
        + "([0-9a-z_!~*'()-]+\.)*"
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\."
        + "[a-z]{2,6})"
        + "(:[0-9]{1,4})?"
        + "((/?)|"
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
      var re = new RegExp(strRegex);

      if (re.test(str_url)) {
        return (true);
      } else {
        return (false);
      }
    }

    return IsURL(v);
  },
  "int": function (v, args) {
    if (mini.isNull(v) || v === "") return true;

    function isInteger(s) {
      if (s < 0) {
        s = -s;
      }
      var n = String(s);
      return n.length > 0 && !(/[^0-9]/).test(n);
    }

    return isInteger(v);


  },
  "float": function (v, args) {
    if (mini.isNull(v) || v === "") return true;

    function isFloat(s) {

      if (s < 0) {
        s = -s;
      }
      var n = String(s);
      if (n.split(".").length > 2) return false;
      return n.length > 0 && !(/[^0-9.]/).test(n);
    }

    return isFloat(v);


  },
  "date": function (v, args) {
    if (mini.isNull(v) || v === "") return true;
    if (!v) return false;
    var d = null;
    var format = args[0];

    if (format) {
      d = mini.parseDate(v, format);
      if (d && d.getFullYear) {
        if (mini.formatDate(d, format) == v) return true;
      }
    } else {
      d = mini.parseDate(v, "yyyy-MM-dd");
      if (!d) d = mini.parseDate(v, "yyyy/MM/dd");
      if (!d) d = mini.parseDate(v, "MM/dd/yyyy");
      if (d && d.getFullYear) return true;
    }

    return false;
  },
  maxLength: function (v, args) {
    if (mini.isNull(v) || v === "") return true;
    var n = parseInt(args);
    if (!v || isNaN(n)) return true;
    if (v.length <= n) return true;
    else return false;
  },
  minLength: function (v, args) {
    if (mini.isNull(v) || v === "") return true;
    var n = parseInt(args);
    if (isNaN(n)) return true;
    if (v.length >= n) return true;
    else return false;
  },
  rangeLength: function (v, args) {
    if (mini.isNull(v) || v === "") return true;
    if (!v) return false;
    var min = parseFloat(args[0]), max = parseFloat(args[1]);
    if (isNaN(min) || isNaN(max)) return true;
    if (min <= v.length && v.length <= max) return true;
    return false;
  },
  rangeChar: function (v, args) {
    if (mini.isNull(v) || v === "") return true;

    var min = parseFloat(args[0]), max = parseFloat(args[1]);
    if (isNaN(min) || isNaN(max)) return true;

    function isChinese(v) {
      var re = new RegExp("^[\u4e00-\u9fa5]+$");
      if (re.test(v)) return true;
      return false;
    }

    var len = 0;
    var ss = String(v).split("");
    for (var i = 0, l = ss.length; i < l; i++) {
      if (isChinese(ss[i])) {
        len += 2;
      } else {
        len += 1;
      }
    }

    if (min <= len && len <= max) return true;
    return false;
  },
  range: function (v, args) {
    if (mini.VTypes["float"](v, args) == false) return false;

    if (mini.isNull(v) || v === "") return true;
    v = parseFloat(v);
    if (isNaN(v)) return false;
    var min = parseFloat(args[0]), max = parseFloat(args[1]);
    if (isNaN(min) || isNaN(max)) return true;
    if (min <= v && v <= max) return true;
    return false;
  },
  min: function (v, args) {
    if (mini.VTypes["float"](v, args) == false) return false;
    if (mini.isNull(v) || v === "") return true;
    v = parseFloat(v);
    if (isNaN(v)) return false;
    var min = parseFloat(args[0]);
    if (isNaN(min)) return true;
    if (min <= v) return true;
    return false;
  },
  max: function (v, args) {
    if (mini.VTypes["float"](v, args) == false) return false;
    if (mini.isNull(v) || v === "") return true;
    v = parseFloat(v);
    if (isNaN(v)) return false;
    var max = parseFloat(args[0]);
    if (isNaN(max)) return true;
    if (v <= max) return true;
    return false;
  }
};


mini.summaryTypes = {
  "count": function (data) {
    if (!data) data = [];
    return data.length;
  },
  "max": function (data, field) {
    if (!data) data = [];
    var max = null;
    for (var i = 0, l = data.length; i < l; i++) {
      var o = data[i];
      var value = parseFloat(o[field]);
      if (value === null || value === undefined || isNaN(value)) continue;
      if (max == null || max < value) {
        max = value;
      }
    }
    return max;
  },
  "min": function (data, field) {
    if (!data) data = [];
    var min = null;
    for (var i = 0, l = data.length; i < l; i++) {
      var o = data[i];
      var value = parseFloat(o[field]);
      if (value === null || value === undefined || isNaN(value)) continue;
      if (min == null || min > value) {
        min = value;
      }
    }
    return min;
  },
  "avg": function (data, field) {
    if (!data) data = [];
    if (data.length == 0) return 0;
    var total = 0;
    for (var i = 0, l = data.length; i < l; i++) {
      var o = data[i];
      var value = parseFloat(o[field]);
      if (value === null || value === undefined || isNaN(value)) continue;
      total += value;
    }
    var v = total / data.length;
    return v;
  },
  "sum": function (data, field) {
    if (!data) data = [];
    var total = 0;
    for (var i = 0, l = data.length; i < l; i++) {
      var o = data[i];
      var value = parseFloat(o[field]);
      if (value === null || value === undefined || isNaN(value)) continue;
      total += value;
    }
    return total;
  }
};


mini.formatCurrency = function (num, prefix) {
  if (num === null || num === undefined) num == 0;
  num = String(num).replace(/\$|\,/g, '');
  if (isNaN(num)) {
    num = "0";
  }
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) {
    cents = "0" + cents;
  }
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  }
  prefix = prefix || '';
  return prefix + (((sign) ? '' : '-') + num + '.' + cents);
}


mini.emptyFn = function () {
};
mini.Drag = function (options) {
  mini.copyTo(this, options);
};
mini.Drag.prototype = {
  onStart: mini.emptyFn,
  onMove: mini.emptyFn,
  onStop: mini.emptyFn,
  capture: false,
  fps: 20,
  event: null,
  delay: 80,


  start: function (e) {

    e.preventDefault();
    if (e) this.event = e;

    this.now = this.init = [this.event.pageX, this.event.pageY];

    var bd = document;
    mini.on(bd, 'mousemove', this.move, this);
    mini.on(bd, 'mouseup', this.stop, this);
    mini.on(bd, 'contextmenu', this.contextmenu, this);
    if (this.context) mini.on(this.context, 'contextmenu', this.contextmenu, this);

    this.trigger = e.target;
    mini.selectable(this.trigger, false);
    mini.selectable(bd.body, false);

    if (this.capture) {
      if (isIE) this.trigger.setCapture(true);
      else if (document.captureEvents) document.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP | Event.MOUSEDOWN);
    }
    this.started = false;


    this.startTime = new Date();
  },
  contextmenu: function (e) {
    if (this.context) mini.un(this.context, 'contextmenu', this.contextmenu, this);
    mini.un(document, 'contextmenu', this.contextmenu, this);
    e.preventDefault();
    e.stopPropagation();
  },
  move: function (e) {
    if (this.delay) {
      if (new Date() - this.startTime < this.delay) return;
    }


    if (!this.started) {
      this.started = true;
      this.onStart(this);
    }


    var sf = this;

    if (!this.timer) {
      this.timer = setTimeout(function () {
        sf.now = [e.pageX, e.pageY]
        sf.event = e;
        sf.onMove(sf);
        sf.timer = null;


      }, 5);
    }

  },
  stop: function (e) {


    this.now = [e.pageX, e.pageY]
    this.event = e;

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    var bd = document;

    mini.selectable(this.trigger, true);
    mini.selectable(bd.body, true);

    if (isIE) {
      this.trigger.setCapture(false);
      this.trigger.releaseCapture();
    }


    var success = mini.MouseButton.Right != e.button;
    if (success == false) {
      e.preventDefault();
    }


    mini.un(bd, 'mousemove', this.move, this);
    mini.un(bd, 'mouseup', this.stop, this);
    var sf = this;
    setTimeout(function () {
      mini.un(document, 'contextmenu', sf.contextmenu, sf);
      if (sf.context) mini.un(sf.context, 'contextmenu', sf.contextmenu, sf);
    }, 1);


    if (this.started) {

      sf.onStop(sf, success);

    }
  }
};


mini.JSON = new (function () {
  var sb = [];
  var _dateFormat = null;
  var useHasOwn = !!{}.hasOwnProperty,
    replaceString = function (a, b) {

      var c = m[b];
      if (c) {


        return c;
      }
      c = b.charCodeAt();
      return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);

    },
    doEncode = function (o, field) {

      if (o === null) {
        sb[sb.length] = "null";
        return;
      }
      var t = typeof o;
      if (t == "undefined") {
        sb[sb.length] = "null";
        return;
      } else if (o.push) {

        sb[sb.length] = '[';
        var b, i, l = o.length, v;
        for (i = 0; i < l; i += 1) {
          v = o[i];
          t = typeof v;
          if (t == "undefined" || t == "function" || t == "unknown") {
          } else {
            if (b) {
              sb[sb.length] = ',';
            }
            doEncode(v);

            b = true;
          }
        }
        sb[sb.length] = ']';
        return;
      } else if (o.getFullYear) {
        if (_dateFormat) {
          sb[sb.length] = _dateFormat(o, field);
        } else {
          var n;
          sb[sb.length] = '"';
          sb[sb.length] = o.getFullYear();
          sb[sb.length] = "-";
          n = o.getMonth() + 1;
          sb[sb.length] = n < 10 ? "0" + n : n;
          sb[sb.length] = "-";
          n = o.getDate();
          sb[sb.length] = n < 10 ? "0" + n : n;
          sb[sb.length] = "T"
          n = o.getHours();
          sb[sb.length] = n < 10 ? "0" + n : n;
          sb[sb.length] = ":"
          n = o.getMinutes();
          sb[sb.length] = n < 10 ? "0" + n : n;
          sb[sb.length] = ":"
          n = o.getSeconds();
          sb[sb.length] = n < 10 ? "0" + n : n;
          sb[sb.length] = '"';
          return;
        }
      } else if (t == "string") {
        if (strReg1.test(o)) {
          sb[sb.length] = '"';

          sb[sb.length] = o.replace(strReg2, replaceString);
          sb[sb.length] = '"';
          return;
        }
        sb[sb.length] = '"' + o + '"';
        return;
      } else if (t == "number") {
        sb[sb.length] = o;
        return;
      } else if (t == "boolean") {
        sb[sb.length] = String(o);
        return;
      } else {
        sb[sb.length] = "{";
        var b, i, v;
        for (i in o) {

          if (!useHasOwn || Object.prototype.hasOwnProperty.call(o, i)) {
            v = o[i];
            t = typeof v;
            if (t == "undefined" || t == "function" || t == "unknown") {
            } else {
              if (b) {
                sb[sb.length] = ',';
              }
              doEncode(i);
              sb[sb.length] = ":";
              doEncode(v, i)

              b = true;
            }
          }
        }
        sb[sb.length] = "}";
        return;
      }
    },
    m = {
      "\b": '\\b',
      "\t": '\\t',
      "\n": '\\n',
      "\f": '\\f',
      "\r": '\\r',
      '"': '\\"',
      "\\": '\\\\'
    },
    strReg1 = /["\\\x00-\x1f]/,
    strReg2 = /([\x00-\x1f\\"])/g;

  this.encode = function () {

    var ec;
    return function (o, dateFormat) {
      sb = [];

      _dateFormat = dateFormat;
      doEncode(o);

      _dateFormat = null;

      return sb.join("");
    };
  }();
  this.decode = function () {


    var dateRe1 = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2}(?:\.*\d*)?)Z*$/;

    var dateRe2 = new RegExp('^\/+Date\\((-?[0-9]+)\.*\\)\/+$', 'g');


    var re = /[\"\'](\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})[\"\']/g;
    return function (json, parseDate) {
      if (json === "" || json === null || json === undefined) return json;

      if (typeof json == 'object') {
        json = this.encode(json);
      }


      function evalParse(json) {
        if (parseDate !== false) {
          json = json.replace(__js_dateRegEx, "$1new Date($2)");
          json = json.replace(re, "new Date($1,$2-1,$3,$4,$5,$6)");
          json = json.replace(__js_dateRegEx2, "new Date($1)");
        }
        return eval('(' + json + ')');
      }


      var data = null;


      if (window.JSON && window.JSON.parse) {

        var dateReviver = function (key, value) {
          if (typeof value === 'string' && parseDate !== false) {

            dateRe1.lastIndex = 0;
            var a = dateRe1.exec(value);
            if (a) {
              value = new Date(a[1], a[2] - 1, a[3], a[4], a[5], a[6]);

              return value;
            }

            dateRe2.lastIndex = 0;
            var a = dateRe2.exec(value);
            if (a) {
              value = new Date(parseInt(a[1]));

              return value;
            }
          }
          return value;
        };

        try {
          var json2 = json.replace(__js_dateRegEx, "$1\"\/Date($2)\/\"");
          data = window.JSON.parse(json2, dateReviver);
        } catch (ex) {
          data = evalParse(json);
        }

      } else {

        data = evalParse(json);
      }
      return data;
    };

  }();

})();
__js_dateRegEx = new RegExp('(^|[^\\\\])\\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\"', "g");
__js_dateRegEx2 = new RegExp('[\"\']\/Date\\(([0-9]+)\\)\/[\"\']', 'g');
mini.encode = mini.JSON.encode;
mini.decode = mini.JSON.decode;

mini.clone = function (o, _clear) {
  if (o === null || o === undefined) return o;
  var json = mini.encode(o);
  var obj = mini.decode(json);

  function clearProp(arr) {
    for (var i = 0, l = arr.length; i < l; i++) {
      var o = arr[i];
      delete o._state;
      delete o._id;
      delete o._pid;
      delete o._uid;
      for (var p in o) {
        var v = o[p];
        if (v instanceof Array) clearProp(v);
      }
    }
  }

  if (_clear !== false) {
    clearProp(obj instanceof Array ? obj : [obj]);
  }

  return obj;
}


var DAY_MS = 86400000,
  HOUR_MS = 3600000,
  MINUTE_MS = 60000;

mini.copyTo(mini, {
  clearTime: function (date) {
    if (!date) return null;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  },
  maxTime: function (date) {
    if (!date) return null;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
  },
  cloneDate: function (date) {
    if (!date) return null;
    return new Date(date.getTime());
  },
  addDate: function (date, num, type) {
    if (!type) type = "D";
    date = new Date(date.getTime());
    switch (type.toUpperCase()) {
      case "Y":
        date.setFullYear(date.getFullYear() + num);
        break;
      case "MO":
        date.setMonth(date.getMonth() + num);
        break;
      case "D":
        date.setDate(date.getDate() + num);
        break;
      case "H":
        date.setHours(date.getHours() + num);
        break;
      case "M":
        date.setMinutes(date.getMinutes() + num);
        break;
      case "S":
        date.setSeconds(date.getSeconds() + num);
        break;
      case "MS":
        date.setMilliseconds(date.getMilliseconds() + num);
        break;
    }
    return date;
  },
  getWeek: function (year, month, day) {
    month += 1;

    var a = Math.floor((14 - (month)) / 12);
    var y = year + 4800 - a;
    var m = (month) + (12 * a) - 3;
    var jd = day + Math.floor(((153 * m) + 2) / 5) +
      (365 * y) + Math.floor(y / 4) - Math.floor(y / 100) +
      Math.floor(y / 400) - 32045;

    var d4 = (jd + 31741 - (jd % 7)) % 146097 % 36524 % 1461;
    var L = Math.floor(d4 / 1460);
    var d1 = ((d4 - L) % 365) + L;
    NumberOfWeek = Math.floor(d1 / 7) + 1;
    return NumberOfWeek;
  },

  getWeekStartDate: function (date, weekStartDay) {
    if (!weekStartDay) weekStartDay = 0;
    if (weekStartDay > 6 || weekStartDay < 0) throw new Error("out of weekday");
    var day = date.getDay();
    var num = weekStartDay - day;
    if (day < weekStartDay) {
      num -= 7;
    }
    var d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + num);
    return d;
  },
  getShortWeek: function (week) {
    var weeks = this.dateInfo.daysShort;
    return weeks[week];
  },
  getLongWeek: function (week) {
    var weeks = this.dateInfo.daysLong;
    return weeks[week];
  },
  getShortMonth: function (month) {
    var months = this.dateInfo.monthsShort;
    return months[month];
  },
  getLongMonth: function (month) {
    var months = this.dateInfo.monthsLong;
    return months[month];
  },
  dateInfo: {
    monthsLong: ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    daysLong: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    quarterLong: ['Q1', 'Q2', 'Q3', 'Q4'],
    quarterShort: ['Q1', 'Q2', 'Q3', 'Q4'],
    halfYearLong: ['first half', 'second half'],
    patterns: {
      "d": "M/d/yyyy",
      "D": "dddd, MMMM dd, yyyy",
      "f": "dddd, MMMM dd, yyyy H:mm tt",
      "F": "dddd, MMMM dd, yyyy H:mm:ss tt",
      "g": "M/d/yyyy H:mm tt",
      "G": "M/d/yyyy H:mm:ss tt",
      "m": "MMMM dd",
      "o": "yyyy-MM-ddTHH:mm:ss.fff",
      "s": "yyyy-MM-ddTHH:mm:ss",
      "t": "H:mm tt",
      "T": "H:mm:ss tt",
      "U": "dddd, MMMM dd, yyyy HH:mm:ss tt",
      "y": "MMM, yyyy"
    },
    tt: {
      "AM": "AM",
      "PM": "PM"
    },
    ten: {
      "Early": "Early",
      "Mid": "Mid",
      "Late": "Late"
    },
    today: 'Today',
    clockType: 24
  }
});
Date.prototype.getHalfYear = function () {
  if (!this.getMonth) return null;
  var m = this.getMonth();
  if (m < 6) return 0;
  return 1;
}
Date.prototype.getQuarter = function () {
  if (!this.getMonth) return null;
  var m = this.getMonth();
  if (m < 3) return 0;
  if (m < 6) return 1;
  if (m < 9) return 2;
  return 3;
}


mini.formatDate = function (date, format, locale) {
  if (!date || !date.getFullYear || isNaN(date)) return "";
  var fd = date.toString();

  var dateFormat = mini.dateInfo;
  if (!dateFormat) dateFormat = mini.dateInfo;

  if (typeof (dateFormat) !== "undefined") {
    var pattern = typeof (dateFormat.patterns[format]) !== "undefined" ? dateFormat.patterns[format] : format;

    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();

    if (format == "yyyy-MM-dd") {
      month = month + 1 < 10 ? "0" + (month + 1) : month + 1;
      day = day < 10 ? "0" + day : day;
      return year + "-" + month + "-" + day;
    }
    if (format == "MM/dd/yyyy") {
      month = month + 1 < 10 ? "0" + (month + 1) : month + 1;
      day = day < 10 ? "0" + day : day;
      return month + "/" + day + "/" + year;
    }


    fd = pattern.replace(/yyyy/g, year);
    fd = fd.replace(/yy/g, (year + "").substring(2));


    var halfyear = date.getHalfYear();
    fd = fd.replace(/hy/g, dateFormat.halfYearLong[halfyear]);


    var quarter = date.getQuarter();
    fd = fd.replace(/Q/g, dateFormat.quarterLong[quarter]);
    fd = fd.replace(/q/g, dateFormat.quarterShort[quarter]);


    fd = fd.replace(/MMMM/g, dateFormat.monthsLong[month].escapeDateTimeTokens());
    fd = fd.replace(/MMM/g, dateFormat.monthsShort[month].escapeDateTimeTokens());
    fd = fd.replace(/MM/g, month + 1 < 10 ? "0" + (month + 1) : month + 1);
    fd = fd.replace(/(\\)?M/g, function ($0, $1) {
      return $1 ? $0 : month + 1;
    });

    var dayOfWeek = date.getDay();
    fd = fd.replace(/dddd/g, dateFormat.daysLong[dayOfWeek].escapeDateTimeTokens());
    fd = fd.replace(/ddd/g, dateFormat.daysShort[dayOfWeek].escapeDateTimeTokens());


    fd = fd.replace(/dd/g, day < 10 ? "0" + day : day);
    fd = fd.replace(/(\\)?d/g, function ($0, $1) {
      return $1 ? $0 : day;
    });

    var hour = date.getHours();
    var halfHour = hour > 12 ? hour - 12 : hour;
    if (dateFormat.clockType == 12) {
      if (hour > 12) {
        hour -= 12;
      }
    }


    fd = fd.replace(/HH/g, hour < 10 ? "0" + hour : hour);
    fd = fd.replace(/(\\)?H/g, function ($0, $1) {
      return $1 ? $0 : hour;
    });


    fd = fd.replace(/hh/g, halfHour < 10 ? "0" + halfHour : halfHour);
    fd = fd.replace(/(\\)?h/g, function ($0, $1) {
      return $1 ? $0 : halfHour;
    });

    var minutes = date.getMinutes();
    fd = fd.replace(/mm/g, minutes < 10 ? "0" + minutes : minutes);
    fd = fd.replace(/(\\)?m/g, function ($0, $1) {
      return $1 ? $0 : minutes;
    });

    var seconds = date.getSeconds();
    fd = fd.replace(/ss/g, seconds < 10 ? "0" + seconds : seconds);
    fd = fd.replace(/(\\)?s/g, function ($0, $1) {
      return $1 ? $0 : seconds;
    });

    fd = fd.replace(/fff/g, date.getMilliseconds());

    fd = fd.replace(/tt/g, date.getHours() > 12 || date.getHours() == 0 ? dateFormat.tt["PM"] : dateFormat.tt["AM"]);


    var date = date.getDate();
    var tenF = '';
    if (date <= 10) tenF = dateFormat.ten['Early'];
    else if (date <= 20) tenF = dateFormat.ten['Mid'];
    else tenF = dateFormat.ten['Late'];
    fd = fd.replace(/ten/g, tenF);
  }

  return fd.replace(/\\/g, "");
}
String.prototype.escapeDateTimeTokens = function () {
  return this.replace(/([dMyHmsft])/g, "\\$1");
}


mini.fixDate = function (d, check) {
  if (+d) {
    while (d.getDate() != check.getDate()) {
      d.setTime(+d + (d < check ? 1 : -1) * HOUR_MS);
    }
  }
}


mini.parseDate = function (s, ignoreTimezone) {
  try {
    var d = eval(s);
    if (d && d.getFullYear) return d;
  } catch (ex) {
  }

  if (typeof s == 'object') {
    return isNaN(s) ? null : s;
  }
  if (typeof s == 'number') {

    var d = new Date(s * 1000);
    if (d.getTime() != s) return null;
    return isNaN(d) ? null : d;
  }
  if (typeof s == 'string') {

    m = s.match(/^([0-9]{4}).([0-9]*)$/);
    if (m) {
      var date = new Date(m[1], m[2] - 1);
      return date;
    }

    if (s.match(/^\d+(\.\d+)?$/)) {
      var d = new Date(parseFloat(s) * 1000);
      if (d.getTime() != s) return null;
      else return d;
    }
    if (ignoreTimezone === undefined) {
      ignoreTimezone = true;
    }
    var d = mini.parseISO8601(s, ignoreTimezone) || (s ? new Date(s) : null);
    return isNaN(d) ? null : d;
  }

  return null;
}
mini.parseISO8601 = function (s, ignoreTimezone) {


  var m = s.match(/^([0-9]{4})([-\/]([0-9]{1,2})([-\/]([0-9]{1,2})([T ]([0-9]{1,2}):([0-9]{1,2})(:([0-9]{1,2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
  if (!m) {

    m = s.match(/^([0-9]{4})[-\/]([0-9]{2})[-\/]([0-9]{2})[T ]([0-9]{1,2})/);
    if (m) {
      var date = new Date(m[1], m[2] - 1, m[3], m[4]);
      return date;
    }


    m = s.match(/^([0-9]{4}).([0-9]*)/);
    if (m) {
      var date = new Date(m[1], m[2] - 1);
      return date;
    }


    m = s.match(/^([0-9]{4}).([0-9]*).([0-9]*)/);
    if (m) {
      var date = new Date(m[1], m[2] - 1, m[3]);
      return date;
    }


    m = s.match(/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/);
    if (!m) return null;
    else {
      var date = new Date(m[3], m[1] - 1, m[2]);
      return date;
    }
  }
  var date = new Date(m[1], 0, 1);
  if (ignoreTimezone || !m[14]) {
    var check = new Date(m[1], 0, 1, 9, 0);
    if (m[3]) {
      date.setMonth(m[3] - 1);
      check.setMonth(m[3] - 1);
    }
    if (m[5]) {
      date.setDate(m[5]);
      check.setDate(m[5]);
    }
    mini.fixDate(date, check);
    if (m[7]) {
      date.setHours(m[7]);
    }
    if (m[8]) {
      date.setMinutes(m[8]);
    }
    if (m[10]) {
      date.setSeconds(m[10]);
    }
    if (m[12]) {
      date.setMilliseconds(Number("0." + m[12]) * 1000);
    }
    mini.fixDate(date, check);
  } else {
    date.setUTCFullYear(
      m[1],
      m[3] ? m[3] - 1 : 0,
      m[5] || 1
    );
    date.setUTCHours(
      m[7] || 0,
      m[8] || 0,
      m[10] || 0,
      m[12] ? Number("0." + m[12]) * 1000 : 0
    );
    var offset = Number(m[16]) * 60 + (m[18] ? Number(m[18]) : 0);
    offset *= m[15] == '-' ? 1 : -1;
    date = new Date(+date + (offset * 60 * 1000));
  }
  return date;
}


mini.parseTime = function (s, format) {
  if (!s) return null;
  var n = parseInt(s);

  if (n == s && format) {
    d = new Date(0);
    if (format[0] == "H") {
      d.setHours(n);
    } else if (format[0] == "m") {
      d.setMinutes(n);
    } else if (format[0] == "s") {
      d.setSeconds(n);
    }
    return d;
  }

  var d = mini.parseDate(s);
  if (!d) {
    var ss = s.split(":");
    var t1 = parseInt(parseFloat(ss[0]));
    var t2 = parseInt(parseFloat(ss[1]));
    var t3 = parseInt(parseFloat(ss[2]));
    if (!isNaN(t1) && !isNaN(t2) && !isNaN(t3)) {
      d = new Date(0);
      d.setHours(t1);
      d.setMinutes(t2);
      d.setSeconds(t3);
    }
    if (!isNaN(t1) && (format == "H" || format == "HH")) {
      d = new Date(0);
      d.setHours(t1);
    } else if (!isNaN(t1) && !isNaN(t2) && (format == "H:mm" || format == "HH:mm")) {
      d = new Date(0);
      d.setHours(t1);
      d.setMinutes(t2);
    } else if (!isNaN(t1) && !isNaN(t2) && format == "mm:ss") {
      d = new Date(0);
      d.setMinutes(t1);
      d.setSeconds(t2);
    }
  }
  return d;
}


mini.dateInfo = {
  monthsLong: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  daysLong: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  daysShort: ["日", "一", "二", "三", "四", "五", "六"],
  quarterLong: ['一季度', '二季度', '三季度', '四季度'],
  quarterShort: ['Q1', 'Q2', 'Q2', 'Q4'],
  halfYearLong: ['上半年', '下半年'],
  patterns: {
    "d": "yyyy-M-d",
    "D": "yyyy年M月d日",
    "f": "yyyy年M月d日 H:mm",
    "F": "yyyy年M月d日 H:mm:ss",
    "g": "yyyy-M-d H:mm",
    "G": "yyyy-M-d H:mm:ss",
    "m": "MMMd日",
    "o": "yyyy-MM-ddTHH:mm:ss.fff",
    "s": "yyyy-MM-ddTHH:mm:ss",
    "t": "H:mm",
    "T": "H:mm:ss",
    "U": "yyyy年M月d日 HH:mm:ss",
    "y": "yyyy年MM月"
  },
  tt: {
    "AM": "上午",
    "PM": "下午"
  },
  ten: {
    "Early": "上旬",
    "Mid": "中旬",
    "Late": "下旬"
  },
  today: '今天',
  clockType: 24
};


mini.append = function (to, html) {
  to = mini.byId(to);
  if (!html || !to) return;
  if (typeof html == "string") {
    if (html.charAt(0) == '#') {
      html = mini.byId(html);
      if (!html) return;
      to.appendChild(html);
      return html;
    } else {
      if (html.indexOf("<tr") == 0) {
        return jQuery(to).append(html)[0].lastChild;
        return;
      }

      var d = document.createElement("div");
      d.innerHTML = html;
      html = d.firstChild;
      while (d.firstChild) {
        to.appendChild(d.firstChild);
      }
      return html;
    }
  } else {
    to.appendChild(html);
    return html;
  }


}
mini.prepend = function (to, html) {
  if (typeof html == "string") {
    if (html.charAt(0) == '#') {
      html = mini.byId(html);
    } else {
      var d = document.createElement("div");
      d.innerHTML = html;
      html = d.firstChild;
    }
  }
  return jQuery(to).prepend(html)[0].firstChild;
}
mini.after = function (to, html) {
  if (typeof html == "string") {
    if (html.charAt(0) == '#') {
      html = mini.byId(html);
    } else {
      var d = document.createElement("div");
      d.innerHTML = html;
      html = d.firstChild;
    }
  }
  if (!html || !to) return;
  to.nextSibling ? to.parentNode.insertBefore(html, to.nextSibling) : to.parentNode.appendChild(html);
  return html;
}
mini.before = function (to, html) {
  if (typeof html == "string") {
    if (html.charAt(0) == '#') {
      html = mini.byId(html);
    } else {
      var d = document.createElement("div");
      d.innerHTML = html;
      html = d.firstChild;
    }
  }
  if (!html || !to) return;
  to.parentNode.insertBefore(html, to);
  return html;
}

mini.__wrap = document.createElement('div');
mini.createElements = function (html) {
  mini.removeChilds(mini.__wrap);
  var isTr = html.indexOf("<tr") == 0;
  if (isTr) {
    html = '<table>' + html + '</table>';
  }
  mini.__wrap.innerHTML = html;
  return isTr ? mini.__wrap.firstChild.rows : mini.__wrap.childNodes;
}

mini_byId = function (id, context) {
  if (typeof id == "string") {
    if (id.charAt(0) == '#') id = id.substr(1);
    var el = document.getElementById(id);
    if (el) return el;
    if (context && !mini.isAncestor(document.body, context)) {


      var els = context.getElementsByTagName("*");
      for (var i = 0, l = els.length; i < l; i++) {
        var el = els[i];
        if (el.id == id) return el;
      }
      el = null;
    }
    return el;
  } else {
    return id;
  }
}
mini_hasClass = function (el, className) {
  el = mini.byId(el);
  if (!el) return;
  if (!el.className) return false;
  var clss = String(el.className).split(" ");
  return clss.indexOf(className) != -1;
}
mini_addClass = function (el, className) {
  if (!className) return;
  if (mini.hasClass(el, className) == false) {
    jQuery(el).addClass(className);
  }
}
mini_removeClass = function (el, className) {
  if (!className) return;
  jQuery(el).removeClass(className);


}

mini_getMargins = function (el) {
  el = mini.byId(el);
  var jq = jQuery(el);
  return {
    top: parseInt(jq.css("margin-top"), 10) || 0,
    left: parseInt(jq.css("margin-left"), 10) || 0,
    bottom: parseInt(jq.css("margin-bottom"), 10) || 0,
    right: parseInt(jq.css("margin-right"), 10) || 0
  };
}
mini_getBorders = function (el) {
  el = mini.byId(el);
  var jq = jQuery(el);
  return {
    top: parseInt(jq.css("border-top-width"), 10) || 0,
    left: parseInt(jq.css("border-left-width"), 10) || 0,
    bottom: parseInt(jq.css("border-bottom-width"), 10) || 0,
    right: parseInt(jq.css("border-right-width"), 10) || 0
  };
}

mini_getPaddings = function (el) {
  el = mini.byId(el);
  var jq = jQuery(el);
  return {
    top: parseInt(jq.css("padding-top"), 10) || 0,
    left: parseInt(jq.css("padding-left"), 10) || 0,
    bottom: parseInt(jq.css("padding-bottom"), 10) || 0,
    right: parseInt(jq.css("padding-right"), 10) || 0
  };
}
mini_setWidth = function (el, width) {
  el = mini.byId(el);
  width = parseInt(width);
  if (isNaN(width) || !el) return;
  if (jQuery.boxModel) {
    var p = mini.getPaddings(el);
    var b = mini.getBorders(el);
    width = width - p.left - p.right - b.left - b.right;
  }


  if (width < 0) width = 0;
  el.style.width = width + "px";
}
mini_setHeight = function (el, height) {
  el = mini.byId(el);
  height = parseInt(height);
  if (isNaN(height) || !el) return;
  if (jQuery.boxModel) {
    var p = mini.getPaddings(el);
    var b = mini.getBorders(el);
    height = height - p.top - p.bottom - b.top - b.bottom;
  }


  if (height < 0) height = 0;
  el.style.height = height + "px";
}
mini_getWidth = function (el, content) {
  el = mini.byId(el);
  if (el.style.display == "none" || el.type == "text/javascript") return 0;
  return content ? jQuery(el).width() : jQuery(el).outerWidth();
}
mini_getHeight = function (el, content) {
  el = mini.byId(el);
  if (el.style.display == "none" || el.type == "text/javascript") return 0;
  return content ? jQuery(el).height() : jQuery(el).outerHeight();
}
mini_setBox = function (el, x, y, width, height) {
  if (y === undefined) {
    y = x.y;
    width = x.width;
    height = x.height;
    x = x.x;
  }
  mini.setXY(el, x, y);
  mini.setWidth(el, width);
  mini.setHeight(el, height);
}
mini_getBox = function (el) {
  var xy = mini.getXY(el);
  var box = {
    x: xy[0],
    y: xy[1],
    width: mini.getWidth(el),
    height: mini.getHeight(el)
  };
  box.left = box.x;
  box.top = box.y;
  box.right = box.x + box.width;
  box.bottom = box.y + box.height;
  return box;
}
mini_setStyle = function (el, style) {
  el = mini.byId(el);
  if (!el || typeof style != "string") return;

  var jq = jQuery(el);
  var styles = style.toLowerCase().split(";");
  for (var i = 0, l = styles.length; i < l; i++) {
    var s = styles[i];
    var ss = s.split(":");
    if (ss.length > 1) {
      if (ss.length > 2) {
        var s1 = ss[0].trim();
        ss.removeAt(0);
        var s2 = ss.join(":").trim();
        jq.css(s1, s2);
      } else {
        jq.css(ss[0].trim(), ss[1].trim());
      }
    }
  }
}
mini_getStyle = function () {
  var f = document.defaultView;
  return new Function('el', 'style', [
    "style.indexOf('-')>-1 && (style=style.replace(/-(\\w)/g,function(m,a){return a.toUpperCase()}));",
    "style=='float' && (style='",
    f ? 'cssFloat' : 'styleFloat',
    "');return el.style[style] || ",
    f ? 'window.getComputedStyle(el, null)[style]' : 'el.currentStyle[style]',
    ' || null;'].join(''));
}();
mini_isAncestor = function (p, c) {
  var ret = false;
  p = mini.byId(p);
  c = mini.byId(c);
  if (p === c) return true;
  if (p && c) {
    if (p.contains) {
      try {
        return p.contains(c);
      } catch (e) {
        return false;
      }
    } else if (p.compareDocumentPosition) {
      return !!(p.compareDocumentPosition(c) & 16);
    } else {
      while (c = c.parentNode) {
        ret = c == p || ret;
      }
    }
  }
  return ret;
}
mini_findParent = function (p, cls, maxDepth) {
  p = mini.byId(p);
  var b = document.body, depth = 0, stopEl;
  maxDepth = maxDepth || 50;
  if (typeof maxDepth != "number") {
    stopEl = mini.byId(maxDepth);
    maxDepth = 10;
  }
  while (p && p.nodeType == 1 && depth < maxDepth && p != b && p != stopEl) {
    if (mini.hasClass(p, cls)) {
      return p;
    }
    depth++;
    p = p.parentNode;
  }
  return null;
}
mini.copyTo(mini, {
  byId: mini_byId,
  hasClass: mini_hasClass,
  addClass: mini_addClass,
  removeClass: mini_removeClass,

  getMargins: mini_getMargins,
  getBorders: mini_getBorders,
  getPaddings: mini_getPaddings,
  setWidth: mini_setWidth,
  setHeight: mini_setHeight,
  getWidth: mini_getWidth,
  getHeight: mini_getHeight,
  setBox: mini_setBox,
  getBox: mini_getBox,

  setStyle: mini_setStyle,
  getStyle: mini_getStyle,

  repaint: function (el) {
    if (!el) el = document.body;
    mini.addClass(el, "mini-repaint");
    setTimeout(function () {
      mini.removeClass(el, "mini-repaint");
    }, 1);
  },

  getSize: function (el, content) {
    return {
      width: mini.getWidth(el, content),
      height: mini.getHeight(el, content)
    };
  },
  setSize: function (el, width, height) {
    mini.setWidth(el, width);
    mini.setHeight(el, height);
  },
  setX: function (el, x) {
    x = parseInt(x);
    var xy = jQuery(el).offset();

    var y = parseInt(xy.top);
    if (y === undefined) y = xy[1];
    mini.setXY(el, x, y);
  },
  setY: function (el, y) {
    y = parseInt(y);
    var xy = jQuery(el).offset();
    var x = parseInt(xy.left);
    if (x === undefined) x = xy[0];
    mini.setXY(el, x, y);
  },
  setXY: function (el, x, y) {

    var xy = {
      left: parseInt(x),
      top: parseInt(y)
    };
    jQuery(el).offset(xy);
    jQuery(el).offset(xy);
  },
  getXY: function (el) {
    var xy = jQuery(el).offset();
    return [parseInt(xy.left), parseInt(xy.top)];
  },
  getViewportBox: function () {


    var w = jQuery(window).width(), h = jQuery(window).height();
    var x = jQuery(document).scrollLeft(), y = jQuery(document.body).scrollTop();

    if (y == 0 && document.documentElement) y = document.documentElement.scrollTop;

    return {
      x: x, y: y, width: w, height: h, right: x + w, bottom: y + h
    };
  },

  getChildNodes: function (el, all) {
    el = mini.byId(el);
    if (!el) return;
    var nodes = el.childNodes;
    var cs = [];
    for (var i = 0, l = nodes.length; i < l; i++) {
      var c = nodes[i];
      if (c.nodeType == 1 || all === true) {
        cs.push(c);
      }
    }
    return cs;
  },


  removeChilds: function (el, butEl) {
    el = mini.byId(el);
    if (!el) return;
    var cs = mini.getChildNodes(el, true);
    for (var i = 0, l = cs.length; i < l; i++) {
      var c = cs[i];
      if (butEl && c == butEl) {
      } else {
        el.removeChild(cs[i]);
      }
    }
  },
  isAncestor: mini_isAncestor,
  findParent: mini_findParent,
  findChild: function (el, cls) {
    el = mini.byId(el);
    var els = el.getElementsByTagName('*');
    for (var i = 0, l = els.length; i < l; i++) {
      var el = els[i];
      if (mini.hasClass(el, cls)) return el;
    }
  },
  isAncestor: function (p, c) {
    var ret = false;
    p = mini.byId(p);
    c = mini.byId(c);
    if (p === c) return true;
    if (p && c) {
      if (p.contains) {
        try {
          return p.contains(c);
        } catch (e) {
          return false
        }
      } else if (p.compareDocumentPosition) {
        return !!(p.compareDocumentPosition(c) & 16);
      } else {
        while (c = c.parentNode) {
          ret = c == p || ret;
        }
      }
    }
    return ret;
  },
  getOffsetsTo: function (el, target) {
    var o = this.getXY(el), e = this.getXY(target);
    return [o[0] - e[0], o[1] - e[1]];
  },
  scrollIntoView: function (el, container, hscroll) {
    var c = mini.byId(container) || document.body,
      o = this.getOffsetsTo(el, c),
      l = o[0] + c.scrollLeft,
      t = o[1] + c.scrollTop,
      b = t + el.offsetHeight,
      r = l + el.offsetWidth,
      ch = c.clientHeight,
      ct = parseInt(c.scrollTop, 10),
      cl = parseInt(c.scrollLeft, 10),
      cb = ct + ch,
      cr = cl + c.clientWidth;

    if (el.offsetHeight > ch || t < ct) {
      c.scrollTop = t;
    } else if (b > cb) {
      c.scrollTop = b - ch;
    }
    c.scrollTop = c.scrollTop;

    if (hscroll !== false) {
      if (el.offsetWidth > c.clientWidth || l < cl) {
        c.scrollLeft = l;
      } else if (r > cr) {
        c.scrollLeft = r - c.clientWidth;
      }
      c.scrollLeft = c.scrollLeft;
    }
    return this;
  },
  setOpacity: function (el, opacity) {
    jQuery(el).css({
      "opacity": opacity
    });
  },
  selectable: function (el, selected) {
    el = mini.byId(el);
    if (!!selected) {
      jQuery(el).removeClass('mini-unselectable');
      if (isIE) el.unselectable = "off";
      else {
        el.style.MozUserSelect = '';
        el.style.KhtmlUserSelect = '';
        el.style.UserSelect = '';

      }
    } else {
      jQuery(el).addClass('mini-unselectable');
      if (isIE) el.unselectable = 'on';
      else {
        el.style.MozUserSelect = 'none';
        el.style.UserSelect = 'none';
        el.style.KhtmlUserSelect = 'none';
      }
    }
  },
  selectRange: function (el, iStart, iEnd) {
    if (el.createTextRange) {
      var oRange = el.createTextRange();
      oRange.moveStart("character", iStart);
      oRange.moveEnd("character", iEnd - el.value.length);
      oRange.select();
    } else {
      if (el.setSelectionRange) {
        el.setSelectionRange(iStart, iEnd);
      }
    }
    try {
      el.focus();
    } catch (e) {
    }
  },
  getSelectRange: function (el) {
    el = mini.byId(el);
    if (!el) return;
    try {
      el.focus();
    } catch (e) {
    }
    var start = 0, end = 0;
    if (el.createTextRange && document.selection) {

      var r = document.selection.createRange().duplicate();
      r.moveEnd('character', el.value.length);
      if (r.text === '') {
        start = el.value.length;
      }
      else {
        start = el.value.lastIndexOf(r.text);
      }


      var r = document.selection.createRange().duplicate();
      r.moveStart('character', -el.value.length);
      end = r.text.length;

    } else {
      start = el.selectionStart;
      end = el.selectionEnd;
    }

    return [start, end];
  }


});
(function () {
  var fixAttr = {
    tabindex: 'tabIndex',
    readonly: 'readOnly',
    'for': 'htmlFor',
    'class': 'className',
    maxlength: 'maxLength',
    cellspacing: 'cellSpacing',
    cellpadding: 'cellPadding',
    rowspan: 'rowSpan',
    colspan: 'colSpan',
    usemap: 'useMap',
    frameborder: 'frameBorder',
    contenteditable: 'contentEditable'
  };

  var div = document.createElement('div');
  div.setAttribute('class', 't');
  var supportSetAttr = div.className === 't';

  mini.setAttr = function (el, name, val) {
    el.setAttribute(supportSetAttr ? name : (fixAttr[name] || name), val);
  }
  mini.getAttr = function (el, name) {
    if (name == "value" && (isIE6 || isIE7)) {
      var a = el.attributes[name]
      return a ? a.value : null;
    }

    var v = el.getAttribute(supportSetAttr ? name : (fixAttr[name] || name));

    if (typeof v == "function") {
      v = el.attributes[name].value;
    }


    if (v == null && name == "onload") {
      var node = el.getAttributeNode ? el.getAttributeNode(name) : null;
      if (node) {
        v = node.nodeValue;
      }
    }

    return v;
  }


})()


mini_preventDefault = function () {
  if (window.event) {
    window.event.returnValue = false;
  }
}
mini_stopPropogation = function () {
  if (window.event) {
    window.event.cancelBubble = true;
  }
}
mini_onOne = function (el, type, fn, scope) {


  if (!el) return;
  var name = "on" + type.toLowerCase();

  el[name] = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;
    if (!e.preventDefault) {
      e.preventDefault = mini_preventDefault;
    }
    if (!e.stopPropogation) {
      e.stopPropogation = mini_stopPropogation;
    }
    var ret = fn.call(scope, e);
    if (ret === false) return false;
  }
}


mini_on = function (el, type, fn, scope) {
  el = mini.byId(el);
  scope = scope || el;
  if (!el || !type || !fn || !scope) return false
  var listener = mini.findListener(el, type, fn, scope);
  if (listener) return false;
  var method = mini.createDelegate(fn, scope);
  mini.listeners.push([el, type, fn, scope, method]);
  if (isFirefox && type == 'mousewheel') type = 'DOMMouseScroll';
  jQuery(el).bind(type, method);
};
mini_un = function (el, type, fn, scope) {
  el = mini.byId(el);
  scope = scope || el;
  if (!el || !type || !fn || !scope) return false
  var listener = mini.findListener(el, type, fn, scope);
  if (!listener) return false;
  mini.listeners.remove(listener);
  if (isFirefox && type == 'mousewheel') type = 'DOMMouseScroll';
  jQuery(el).unbind(type, listener[4]);

};
mini.copyTo(mini, {
  listeners: [],
  on: mini_on,
  un: mini_un,
  findListener: function (el, type, fn, scope) {
    el = mini.byId(el);
    scope = scope || el;
    if (!el || !type || !fn || !scope) return false
    var listeners = mini.listeners;
    for (var i = 0, l = listeners.length; i < l; i++) {
      var listener = listeners[i];
      if (listener[0] == el
        && listener[1] == type
        && listener[2] == fn
        && listener[3] == scope
      ) {
        return listener;
      }
    }
  },
  clearEvent: function (el, type) {
    el = mini.byId(el);
    if (!el) return false;
    var listeners = mini.listeners;
    for (var i = listeners.length - 1; i >= 0; i--) {
      var listener = listeners[i];
      if (listener[0] == el) {
        if (!type || type == listener[1]) {
          mini.un(el, listener[1], listener[2], listener[3]);
        }
      }
    }
    el.onmouseover = el.onmousedown = null;
  }


});


mini.__windowResizes = [];
mini.onWindowResize = function (fn, scope) {
  mini.__windowResizes.push([fn, scope]);
}
mini.on(window, "resize", function (e) {
  var events = mini.__windowResizes;
  for (var i = 0, l = events.length; i < l; i++) {
    var event = events[i];
    event[0].call(event[1], e);
  }
});


mini.htmlEncode = function (str) {

  if (typeof str !== "string") return str;
  var s = "";
  if (str.length == 0) return "";
  s = str;
  s = s.replace(/&/g, "&amp;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/ /g, "&nbsp;");
  s = s.replace(/\'/g, "&#39;");
  s = s.replace(/\"/g, "&quot;");

  return s;
}

mini.htmlDecode = function (str) {
  if (typeof str !== "string") return str;
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&gt;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&nbsp;/g, " ");
  s = s.replace(/&#39;/g, "\'");
  s = s.replace(/&quot;/g, "\"");

  return s;
}


mini.copyTo(Array.prototype, {
  add: Array.prototype.enqueue = function (item) {
    this[this.length] = item;
    return this;
  },
  getRange: function (start, end) {
    var arr = [];
    for (var i = start; i <= end; i++) {
      var o = this[i];
      if (o) {
        arr[arr.length] = o;
      }
    }
    return arr;
  },
  addRange: function (array) {
    for (var i = 0, j = array.length; i < j; i++) this[this.length] = array[i];
    return this;
  },
  clear: function () {
    this.length = 0;
    return this;
  },
  clone: function () {
    if (this.length === 1) {
      return [this[0]];
    }
    else {
      return Array.apply(null, this);
    }
  },
  contains: function (item) {
    return (this.indexOf(item) >= 0);
  },
  indexOf: function (item, from) {
    var len = this.length;
    for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  },
  dequeue: function () {
    return this.shift();
  },
  insert: function (index, item) {
    this.splice(index, 0, item);
    return this;
  },
  insertRange: function (index, items) {
    for (var i = items.length - 1; i >= 0; i--) {
      var item = items[i];
      this.splice(index, 0, item);

    }
    return this;
  },
  remove: function (item) {
    var index = this.indexOf(item);
    if (index >= 0) {
      this.splice(index, 1);
    }
    return (index >= 0);
  },
  removeAt: function (index) {
    var ritem = this[index];
    this.splice(index, 1);
    return ritem;
  },
  removeRange: function (items) {
    items = items.clone();
    for (var i = 0, l = items.length; i < l; i++) {
      this.remove(items[i]);
    }
  }
});


mini.Keyboard = {
  Left: 37,
  Top: 38,
  Right: 39,
  Bottom: 40,

  PageUp: 33,
  PageDown: 34,
  End: 35,
  Home: 36,

  Enter: 13,
  ESC: 27,
  Space: 32,
  Tab: 9,
  Del: 46,

  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123
};


var ua = navigator.userAgent.toLowerCase(),
  check = function (r) {
    return r.test(ua);
  },
  DOC = document,
  isStrict = DOC.compatMode == "CSS1Compat",
  isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]',
  isChrome = check(/chrome/),
  isWebKit = check(/webkit/),
  isSafari = !isChrome && check(/safari/),
  isSafari2 = isSafari && check(/applewebkit\/4/),
  isSafari3 = isSafari && check(/version\/3/),
  isSafari4 = isSafari && check(/version\/4/),
  isIE = !!window.attachEvent && !isOpera,
  isIE7 = isIE && check(/msie 7/),
  isIE8 = isIE && check(/msie 8/),
  isIE9 = isIE && check(/msie 9/),
  isIE10 = isIE && document.documentMode == 10,
  isIE6 = isIE && !isIE7 && !isIE8 && !isIE9 && !isIE10,
  isFirefox = navigator.userAgent.indexOf("Firefox") > 0,
  isGecko = !isWebKit && check(/gecko/),
  isGecko2 = isGecko && check(/rv:1\.8/),
  isGecko3 = isGecko && check(/rv:1\.9/),
  isBorderBox = isIE && !isStrict,
  isWindows = check(/windows|win32/),
  isMac = check(/macintosh|mac os x/),
  isAir = check(/adobeair/),
  isLinux = check(/linux/),
  isSecure = /^https/i.test(window.location.protocol);

if (isIE6) {
  try {
    DOC.execCommand("BackgroundImageCache", false, true);
  } catch (e) {
  }
}


mini.boxModel = !isBorderBox;
mini.isIE = isIE;
mini.isIE6 = isIE6;
mini.isIE7 = isIE7;
mini.isIE8 = isIE8;
mini.isIE9 = isIE9;
mini.isIE10 = isIE10;
mini.isFirefox = isFirefox;
mini.isOpera = isOpera;
mini.isSafari = isSafari;
mini.isChrome = isChrome;

if (jQuery) jQuery.boxModel = mini.boxModel;


mini.noBorderBox = false;
if (jQuery.boxModel == false && isIE && isIE9 == false) mini.noBorderBox = true;

mini.MouseButton = {
  Left: 0,
  Middle: 1,
  Right: 2
}
if (isIE && !isIE9 && !isIE10) {
  mini.MouseButton = {
    Left: 1,
    Middle: 4,
    Right: 2
  }
}


mini._MaskID = 1;
mini._MaskObjects = {};
mini.mask = function (options) {


  var el = mini.byId(options);
  if (mini.isElement(el)) options = {el: el};
  else if (typeof options == "string") options = {html: options};

  options = mini.copyTo({
    html: "",
    cls: "",
    style: "",

    backStyle: "background:#ccc"
  }, options);
  options.el = mini.byId(options.el);
  if (!options.el) options.el = document.body;
  var el = options.el;

  mini["unmask"](options.el);
  el._maskid = mini._MaskID++;
  mini._MaskObjects[el._maskid] = options;

  var maskEl = mini.append(el, '<div class="mini-mask">' +
    '<div class="mini-mask-background" style="' + options.backStyle + '"></div>' +
    '<div class="mini-mask-msg ' + options.cls + '" style="' + options.style + '">' + options.html + '</div>'
    + '</div>');

  options.maskEl = maskEl;
  if (!mini.isNull(options.opacity)) {
    mini.setOpacity(maskEl.firstChild, options.opacity);
  }

  function center() {
    msgEl.style.display = "block";
    var size = mini.getSize(msgEl);
    msgEl.style.marginLeft = -size.width / 2 + "px";
    msgEl.style.marginTop = -size.height / 2 + "px";
  }

  var msgEl = maskEl.lastChild;
  msgEl.style.display = "none";

  setTimeout(function () {
    center();
  }, 0);


}
mini["unmask"] = function (el) {
  el = mini.byId(el);
  if (!el) el = document.body;
  var options = mini._MaskObjects[el._maskid];
  if (!options) return;
  delete mini._MaskObjects[el._maskid];
  var maskEl = options.maskEl;
  options.maskEl = null;
  if (maskEl && maskEl.parentNode) {
    maskEl.parentNode.removeChild(maskEl);
  }
}


mini.Cookie = {
  get: function (sName) {
    var aCookie = document.cookie.split("; ");
    var lastMatch = null;
    for (var i = 0; i < aCookie.length; i++) {
      var aCrumb = aCookie[i].split("=");
      if (sName == aCrumb[0]) {
        lastMatch = aCrumb;
      }
    }
    if (lastMatch) {
      var v = lastMatch[1];
      if (v === undefined) return v;
      return unescape(v);
    }
    return null;
  },
  set: function (name, value, expires, domain) {
    var LargeExpDate = new Date();
    if (expires != null) {


      LargeExpDate = new Date(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
    }

    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString())) + ";path=/" + (domain ? "; domain=" + domain : "");
  },
  del: function (name, domain) {
    this.set(name, null, -100, domain);
  }
};


mini.copyTo(mini, {

  treeToArray: function (nodes, nodesField, idField, parentIdField, parentId) {
    if (!nodesField) nodesField = 'children';
    var array = [];
    for (var i = 0, l = nodes.length; i < l; i++) {
      var node = nodes[i];
      array[array.length] = node;

      if (parentIdField) node[parentIdField] = parentId;

      var childrenNodes = node[nodesField];
      if (childrenNodes && childrenNodes.length > 0) {
        var id = node[idField];
        var childrenArray = this.treeToArray(childrenNodes, nodesField, idField, parentIdField, id);
        array.addRange(childrenArray);
      }
    }
    return array;
  },

  arrayToTree: function (data, nodesField, idField, parentIdField) {
    if (!nodesField) nodesField = 'children';
    idField = idField || '_id';
    parentIdField = parentIdField || '_pid';

    var nodes = [];


    var idHash = {};
    for (var i = 0, l = data.length; i < l; i++) {
      var o = data[i];
      if (!o) continue;
      var id = o[idField];
      if (id !== null && id !== undefined) {
        idHash[id] = o;
      }
      delete o[nodesField];
    }


    for (var i = 0, l = data.length; i < l; i++) {
      var o = data[i];
      var p = idHash[o[parentIdField]];
      if (!p) {
        nodes.push(o);
        continue;
      }
      if (!p[nodesField]) {
        p[nodesField] = [];
      }
      p[nodesField].push(o);
    }
    return nodes;
  }
});
mini.treeToList = mini.treeToArray;
mini.listToTree = mini.arrayToTree;

function UUID() {
  var s = [], itoh = '0123456789ABCDEF'.split('');
  for (var i = 0; i < 36; i++) s[i] = Math.floor(Math.random() * 0x10);
  s[14] = 4;
  s[19] = (s[19] & 0x3) | 0x8;
  for (var i = 0; i < 36; i++) s[i] = itoh[s[i]];
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
}


String.format = function (format) {
  var args = Array.prototype.slice.call(arguments, 1);
  format = format || "";
  return format.replace(/\{(\d+)\}/g, function (m, i) {
    return args[i];
  });
}
String.prototype.trim = function () {
  var re = /^\s+|\s+$/g;
  return function () {
    return this.replace(re, "");
  };
}();


mini.copyTo(mini, {
  measureText: function (el, text, style) {
    if (!this.measureEl) {
      this.measureEl = mini.append(document.body, '<div></div>');
    }

    this.measureEl.style.cssText = "position:absolute;left:-1000px;top:-1000px;visibility:hidden;";
    if (typeof el == "string") {
      this.measureEl.className = el;

    } else {
      this.measureEl.className = "";

      var j1 = jQuery(el);
      var j2 = jQuery(this.measureEl);
      var csses = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
      for (var i = 0, l = csses.length; i < l; i++) {
        var css = csses[i];
        j2.css(css, j1.css(css));
      }
    }
    if (style) mini.setStyle(this.measureEl, style);
    this.measureEl.innerHTML = text;
    return mini.getSize(this.measureEl);
  }
});


jQuery(function () {

  var sss = new Date();
  mini.isReady = true;
  mini.parse();
  mini._FireBindEvents();


  if ((mini.getStyle(document.body, "overflow") == "hidden" || mini.getStyle(document.documentElement, "overflow") == "hidden")
    && (isIE6 || isIE7)) {


    jQuery(document.body).css("overflow", "visible");
    jQuery(document.documentElement).css("overflow", "visible");
  }
  mini.__LastWindowWidth = document.documentElement.clientWidth;
  mini.__LastWindowHeight = document.documentElement.clientHeight;

});
mini_onload = function (e) {

  if (mini.isIE8) {
    $(document.body).addClass('ie8');
  }

  mini.layout(null, false);
  mini.on(window, "resize", mini_onresize);

}
mini.on(window, "load", mini_onload);

mini.__LastWindowWidth = document.documentElement.clientWidth;
mini.__LastWindowHeight = document.documentElement.clientHeight;
mini.doWindowResizeTimer = null;

mini.allowLayout = true;


mini_onresize = function (e) {


  if (mini.doWindowResizeTimer) {
    clearTimeout(mini.doWindowResizeTimer);
  }

  mini.WindowVisible = mini.isWindowDisplay();

  if (mini.WindowVisible == false || mini.allowLayout == false) return;

  if (typeof Ext != "undefined") {
    mini.doWindowResizeTimer = setTimeout(function () {
      var __LastWindowWidth = document.documentElement.clientWidth;
      var __LastWindowHeight = document.documentElement.clientHeight;
      if (mini.__LastWindowWidth == __LastWindowWidth && mini.__LastWindowHeight == __LastWindowHeight) {
      } else {

        mini.__LastWindowWidth = __LastWindowWidth;
        mini.__LastWindowHeight = __LastWindowHeight;
        mini.layout(null, false);
      }
      mini.doWindowResizeTimer = null;
    }, 300);
  } else {
    var deferTime = 100;
    try {
      if (parent && parent != window && parent.mini) {
        deferTime = 0;
      }
    } catch (ex) {
    }
    mini.doWindowResizeTimer = setTimeout(function () {
      var __LastWindowWidth = document.documentElement.clientWidth;
      var __LastWindowHeight = document.documentElement.clientHeight;


      if (mini.__LastWindowWidth == __LastWindowWidth && mini.__LastWindowHeight == __LastWindowHeight) {
      } else {

        mini.__LastWindowWidth = __LastWindowWidth;
        mini.__LastWindowHeight = __LastWindowHeight;
        mini.layout(null, false);
      }
      mini.doWindowResizeTimer = null;
    }, deferTime);
  }
}


mini.isDisplay = function (p, body) {
  var doc = body || document.body;
  while (1) {
    if (p == null || !p.style) return false;
    if (p && p.style && p.style.display == "none") return false;
    if (p == doc) return true;

    p = p.parentNode;

  }
  return true;
};


mini.isWindowDisplay = function () {
  try {
    var parentWindow = window.parent;
    var isIFrame = parentWindow != window;

    if (isIFrame) {
      var _iframes = parentWindow.document.getElementsByTagName("iframe");
      var _frames = parentWindow.document.getElementsByTagName("frame");
      var iframes = [];
      for (var i = 0, l = _iframes.length; i < l; i++) {
        iframes.push(_iframes[i]);
      }
      for (var i = 0, l = _frames.length; i < l; i++) {
        iframes.push(_frames[i]);
      }

      var iframe = null;
      for (var i = 0, l = iframes.length; i < l; i++) {
        var el = iframes[i];
        if (el.contentWindow == window) {
          iframe = el;
          break;
        }
      }
      if (!iframe) return false;

      return mini.isDisplay(iframe, parentWindow.document.body);


    } else {
      return true;
    }
  } catch (e) {
    return true;
  }
};


mini.WindowVisible = mini.isWindowDisplay();


mini.layoutIFrames = function (parentNode) {
  if (!parentNode) parentNode = document.body;
  if (!parentNode) return;
  var iframes = parentNode.getElementsByTagName("iframe");
  setTimeout(function () {
    for (var i = 0, l = iframes.length; i < l; i++) {
      var el = iframes[i];
      try {
        if (mini.isDisplay(el) && mini.isAncestor(parentNode, el)) {
          if (el.contentWindow.mini) {
            if (el.contentWindow.mini.WindowVisible == false) {
              el.contentWindow.mini.WindowVisible = el.contentWindow.mini.isWindowDisplay();
              el.contentWindow.mini.layout();
            } else {
              el.contentWindow.mini.layout(null, false);
            }
          }
          el.contentWindow.mini.layoutIFrames();
        }
      } catch (ex) {
      }
    }
  }, 30);
}


$.ajaxSetup({
  cache: false
})


if (isIE) {


}


mini_unload = function (e) {


  if (!window.mini) return;

  try {
    var win = mini._getTopWindow();
    win[mini._WindowID] = '';
    delete win[mini._WindowID];
  } catch (ex) {

  }


  var iframes = document.body.getElementsByTagName("iframe");
  if (iframes.length > 0) {

    var IFrames = [];
    for (var i = 0, l = iframes.length; i < l; i++) {
      IFrames.push(iframes[i]);
    }

    for (var i = 0, l = IFrames.length; i < l; i++) {
      try {
        var iframe = IFrames[i];
        iframe._ondestroy = null;
        iframe.src = "";
        try {
          iframe.contentWindow.document.write("");
          iframe.contentWindow.document.close();
        } catch (ex) {
        }
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      } catch (e) {
      }
    }
  }

  var cs = mini.getComponents();
  for (var i = 0, l = cs.length; i < l; i++) {
    var control = cs[i];
    if (control.destroyed !== true) {
      control.destroy(false);
    }
  }

  cs.length = 0;
  cs = null;

  mini.un(window, "unload", mini_unload);
  mini.un(window, "load", mini_onload);
  mini.un(window, "resize", mini_onresize);

  mini.components = {};
  mini.classes = {};
  mini.uiClasses = {};
  mini.uids = {};

  mini._topWindow = null;
  window.mini = null;
  window.Owner = null;
  window.CloseOwnerWindow = null;

  try {

  } catch (e) {
  }


}
mini.on(window, "unload", mini_unload);


function __OnIFrameMouseDown() {

}

function __BindIFrames() {
  if (mini.isIE10) return;
  var iframes = document.getElementsByTagName("iframe");
  for (var i = 0, l = iframes.length; i < l; i++) {
    var iframe = iframes[i];

    try {
      if (iframe.contentWindow) {
        iframe.contentWindow.document.onmousedown = __OnIFrameMouseDown;
      }


    } catch (e) {
    }

  }
}


mini.zIndex = 1000;
mini.getMaxZIndex = function () {
  return mini.zIndex++;
}


function js_isTouchDevice() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

function js_touchScroll(id) {
  if (js_isTouchDevice()) {
    var el = typeof id == "string" ? document.getElementById(id) : id;
    var scrollStartPos = 0;

    el.addEventListener("touchstart", function (event) {
      scrollStartPos = this.scrollTop + event.touches[0].pageY;
      event.preventDefault();
    }, false);

    el.addEventListener("touchmove", function (event) {
      this.scrollTop = scrollStartPos - event.touches[0].pageY;
      event.preventDefault();
    }, false);
  }
}


mini._placeholder = function (el) {
  el = mini.byId(el);
  if (!el || !isIE || isIE10) return;

  function doLabel() {
    var label = el._placeholder_label;

    if (!label) return;

    var placeholder = el.getAttribute("placeholder");
    if (!placeholder) placeholder = el.placeholder;
    if (!el.value && !el.disabled) {
      label.innerHTML = placeholder;
      label.style.display = "";
    } else {
      label.style.display = "none";
    }
  }

  if (el._placeholder) {
    doLabel();
    return;
  }
  el._placeholder = true;

  var label = document.createElement("label");
  label.className = "mini-placeholder-label";
  el.parentNode.appendChild(label);
  el._placeholder_label = label;

  label.onmousedown = function () {
    el.focus();
  }


  el.onpropertychange = function (e) {
    e = e || window.event;
    if (e.propertyName == "value") {

      doLabel();
    }
  }

  doLabel();


  mini.on(el, "focus", function (e) {
    if (!el.readOnly) {
      label.style.display = "none";
    }
  });
  mini.on(el, "blur", function (e) {
    doLabel();
  });

}


mini.ajax = function (options) {
  if (!options.dataType) {
    options.dataType = "text";
  }


  return window.jQuery.ajax(options);
}


if (typeof window.rootpath == "undefined") {
  rootpath = "/";
}

mini.loadJS = function (src, callback) {
  if (!src) return;
  if (typeof callback == "function") {
    return loadJS._async(src, callback);
  } else {
    return loadJS._sync(src);
  }
}
mini.loadJS._js = {};
mini.loadJS._async = function (src, callback) {
  var state = mini.loadJS._js[src];
  if (!state) {
    state = mini.loadJS._js[src] = {create: false, loaded: false, callbacks: []};
  }
  if (state.loaded) {
    setTimeout(function () {
      callback();
    }, 1);
    return;
  } else {
    state.callbacks.push(callback);
    if (state.create) return;
  }

  state.create = true;

  var head = document.getElementsByTagName('head')[0];
  var js = document.createElement('script');
  js.src = src;
  js.type = 'text/javascript';

  function doCallback() {
    for (var i = 0; i < state.callbacks.length; i++) {
      var fn = state.callbacks[i];
      if (fn) fn();
    }
    state.callbacks.length = 0;
  }

  setTimeout(function () {
    if (document.all) {
      js.onreadystatechange = function () {
        if (js.readyState == 'loaded' || js.readyState == 'complete') {
          doCallback();
          state.loaded = true;
        }
      }
    } else {
      js.onload = function () {
        doCallback();
        state.loaded = true;
      }
    }
    head.appendChild(js);
  }, 1);
  return js;
}
mini.loadJS._sync = function (src) {
  if (loadJS._js[src]) return;
  loadJS._js[src] = {create: true, loaded: true, callbacks: []};

  var head = document.getElementsByTagName('head')[0];
  var js = document.createElement('script');
  js.type = 'text/javascript';
  js.text = loadText(src);
  head.appendChild(js);
  return js;
}

mini.loadText = function (url) {
  var text = "";
  var isLocal = document.all && location.protocol == "file:";


  var xmlhttp = null;
  if (isLocal) {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }


  xmlhttp.onreadystatechange = state_Change;

  var d = '_t=' + new Date().getTime();
  if (url.indexOf("?") == -1) d = "?" + d;
  else d = "&" + d;
  url += d;

  xmlhttp.open("GET", url, false);
  xmlhttp.send(null);

  function state_Change() {
    if (xmlhttp.readyState == 4) {
      var statusCode = isLocal ? 0 : 200;
      if (xmlhttp.status == statusCode) {
        text = xmlhttp.responseText;
      }
      else {

      }
    }
  }

  return text;
}

mini.loadJSON = function (url) {
  var text = loadText(url);
  var o = eval("(" + text + ")");
  return o;
}


mini.loadCSS = function (src, id) {
  if (!src) return;
  if (loadCSS._css[src]) return;
  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');
  if (id) link.id = id;
  link.href = src;
  link.rel = 'stylesheet';
  link.type = 'text/css';
  head.appendChild(link);
  return link;
}
mini.loadCSS._css = {};


mini.innerHTML = function (el, html) {
  if (typeof el == 'string') el = document.getElementById(el);
  if (!el) return;
  html = '<div style="display:none">&nbsp;</div>' + html;
  el.innerHTML = html;
  mini.__executeScripts(el);
  var d = el.firstChild;

}
mini.__executeScripts = function (d) {
  var scripts = d.getElementsByTagName("script")
  for (var i = 0, l = scripts.length; i < l; i++) {
    var sc = scripts[i];
    var src = sc.src;
    if (src) {
      mini.loadJS(src);
    } else {
      var ns = document.createElement('script');
      ns.type = "text/javascript";
      ns.text = sc.text;
      d.appendChild(ns);
    }
  }
  for (var i = scripts.length - 1; i >= 0; i--) {
    var sc = scripts[i];
    sc.parentNode.removeChild(sc);
  }
}





mini.MessageBox = {


  alertTitle: "提醒",
  confirmTitle: "确认",
  prompTitle: "输入",
  prompMessage: "请输入内容：",
  buttonText: {
    ok: "确定",
    cancel: "取消",
    yes: "是",
    no: "否"
  },
  show: function (options) {

    options = mini.copyTo({
      width: "auto",
      height: "auto",
      showModal: true,

      minWidth: 150,
      maxWidth: 800,
      minHeight: 100,
      maxHeight: 350,

      showHeader: true,
      title: "",
      titleIcon: "",
      iconCls: "",
      iconStyle: "",
      message: "",
      html: "",

      spaceStyle: "margin-right:15px",

      showCloseButton: true,
      buttons: null,
      buttonWidth: 58,
      callback: null
    }, options);

    var callback = options.callback;

    var control = new mini.Window();

    control.setBodyStyle("overflow:hidden");
    control.setShowModal(options.showModal);
    control.setTitle(options.title || "");
    control.setIconCls(options.titleIcon);
    control.setShowHeader(options.showHeader);

    control.setShowCloseButton(options.showCloseButton);

    var id1 = control.uid + "$table", id2 = control.uid + "$content";

    var icon = '<div class="' + options.iconCls + '" style="' + options.iconStyle + '"></div>';
    var s = '<table class="mini-messagebox-table" id="' + id1 + '" style="" cellspacing="0" cellpadding="0"><tr><td>'
      + icon + '</td><td id="' + id2 + '" class="mini-messagebox-content-text">'
      + (options.message || "") + '</td></tr></table>';


    var ws = '<div class="mini-messagebox-content"></div>'
      + '<div class="mini-messagebox-buttons"></div>';
    control._bodyEl.innerHTML = ws;
    var contentEl = control._bodyEl.firstChild;
    if (options.html) {
      if (typeof options.html == "string") {
        contentEl.innerHTML = options.html;
      } else if (mini.isElement(options.html)) {
        contentEl.appendChild(options.html);
      }
    } else {
      contentEl.innerHTML = s;
    }

    control._Buttons = [];

    var buttonsEl = control._bodyEl.lastChild;
    if (options.buttons && options.buttons.length > 0) {
      for (var i = 0, l = options.buttons.length; i < l; i++) {
        var button = options.buttons[i];
        var text = mini.MessageBox.buttonText[button];
        if (!text) text = button;

        var btn = new mini.Button();
        btn.setText(text);
        btn.setWidth(options.buttonWidth);
        btn.render(buttonsEl);
        btn.action = button;
        btn.on("click", function (e) {
          var button = e.sender;
          if (callback) callback(button.action);
          mini.MessageBox.hide(control);
        });

        if (i != l - 1) {
          btn.setStyle(options.spaceStyle);
        }

        control._Buttons.push(btn);
      }
    } else {
      buttonsEl.style.display = "none";
    }

    control.setMinWidth(options.minWidth);
    control.setMinHeight(options.minHeight);
    control.setMaxWidth(options.maxWidth);
    control.setMaxHeight(options.maxHeight);
    control.setWidth(options.width);
    control.setHeight(options.height);


    control.show();


    var width = control.getWidth();
    control.setWidth(width);

    var height = control.getHeight();
    control.setHeight(height);

    var tb = document.getElementById(id1);
    if (tb) {
      tb.style.width = "100%";
    }
    var td = document.getElementById(id2);
    if (td) {
      td.style.width = "100%";
    }


    var firstButton = control._Buttons[0];
    if (firstButton) {
      firstButton.focus();
    } else {
      control.focus();
    }

    control.on("beforebuttonclick", function (e) {
      if (callback) callback("close");
      e.cancel = true;
      mini.MessageBox.hide(control);
    });
    mini.on(control.el, "keydown", function (e) {


    });

    return control.uid;
  },
  hide: function (id) {

    if (!id) return;
    var control = typeof id == "object" ? id : mini.getbyUID(id);
    if (!control) return;


    for (var i = 0, l = control._Buttons.length; i < l; i++) {
      var button = control._Buttons[i];
      button.destroy();
    }
    control._Buttons = null;

    control.destroy();
  },
  alert: function (message, title, callback) {
    return mini.MessageBox.show({
      minWidth: 250,
      title: title || mini.MessageBox.alertTitle,
      buttons: ["ok"],
      message: message,
      iconCls: "mini-messagebox-warning",
      callback: callback
    });
  },
  confirm: function (message, title, callback) {
    return mini.MessageBox.show({
      minWidth: 250,
      title: title || mini.MessageBox.confirmTitle,
      buttons: ["ok", "cancel"],
      message: message,
      iconCls: "mini-messagebox-question",
      callback: callback
    });
  },
  prompt: function (message, title, callback, multi) {
    var id = "prompt$" + new Date().getTime();
    var s = message || mini.MessageBox.promptMessage;
    if (multi) {
      s = s + '<br/><textarea id="' + id + '" style="width:200px;height:60px;margin-top:3px;"></textarea>';
    } else {
      s = s + '<br/><input id="' + id + '" type="text" style="width:200px;margin-top:3px;"/>';
    }
    var uid = mini.MessageBox.show({
      title: title || mini.MessageBox.promptTitle,
      buttons: ["ok", "cancel"],
      width: 250,
      html: '<div style="padding:5px;padding-left:10px;">' + s + '</div>',
      callback: function (action) {
        var input = document.getElementById(id);
        if (callback) callback(action, input.value);
      }
    });
    var input = document.getElementById(id);
    input.focus();
    return uid;
  },
  loading: function (message, title) {
    return mini.MessageBox.show({
      minHeight: 50,
      title: title,
      showCloseButton: false,
      message: message,
      iconCls: "mini-messagebox-waiting"
    });
  }
};
mini.alert = mini.MessageBox.alert;
mini.confirm = mini.MessageBox.confirm;
mini.prompt = mini.MessageBox.prompt;
mini.loading = mini.MessageBox.loading;
mini.showMessageBox = mini.MessageBox.show;
mini.hideMessageBox = mini.MessageBox.hide;


mini_Column_Prototype = {
  _getColumnEl: function (column) {
    column = this.getColumn(column);
    if (!column) return null;
    var id = this._createColumnId(column);
    return document.getElementById(id);
  },
  _getCellEl: function (row, column) {
    row = this.getRow ? this.getRow(row) : this.getNode(row);
    column = this.getColumn(column);
    if (!row || !column) return null;
    var id = this._createCellId(row, column);
    return document.getElementById(id);
  },
  _getCellByEvent: function (e) {
    var record = this._getRecordByEvent ? this._getRecordByEvent(e) : this._getNodeByEvent(e);
    var column = this._getColumnByEvent(e);
    return {
      record: record,
      column: column
    };
  },
  _getColumnByEvent: function (e) {
    var t = mini.findParent(e.target, this._cellCls);
    if (!t) t = mini.findParent(e.target, this._headerCellCls);
    if (t) {
      var ids = t.id.split("$");
      var id = ids[ids.length - 1];
      return this._getColumnById(id);
    }
    return null;
  },
  _createColumnId: function (column) {
    return this.uid + "$column$" + column._id;
  },
  getColumnBox: function (column) {
    var id = this._createColumnId(column);
    var el = document.getElementById(id);
    if (el) {

      var box = mini.getBox(el);
      box.x -= 1;
      box.left = box.x;
      box.right = box.x + box.width;
      return box;
    }
  },

  setColumns: function (value) {


    if (!mini.isArray(value)) value = [];
    this.columns = value;

    this._idColumns = {};
    this._nameColumns = {};
    this._bottomColumns = [];

    this.maxColumnLevel = 0;
    var level = 0;

    function init(column, index, parentColumn) {
      if (column.type) {
        if (!mini.isNull(column.header) && typeof column.header !== "function") {
          if (column.header.trim() == "") {
            delete column.header;
          }
        }
        var col = mini._getColumn(column.type);
        if (col) {
          var _column = mini.copyTo({}, column);
          mini.copyTo(column, col);
          mini.copyTo(column, _column);
        }
      }


      var width = parseInt(column.width);
      if (mini.isNumber(width) && String(width) == column.width) column.width = width + "px";
      if (mini.isNull(column.width)) column.width = this.columnWidth + "px";
      column.visible = column.visible !== false;
      column.allowResize = column.allowResize !== false;
      column.allowMove = column.allowMove !== false;
      column.allowSort = column.allowSort === true;
      column.allowDrag = !!column.allowDrag;
      column.readOnly = !!column.readOnly;
      column.autoEscape = !!column.autoEscape;

      if (!column._id) column._id = mini.DataGrid.ColumnID++;
      column._gridUID = this.uid;
      column._rowIdField = this._rowIdField;
      column._pid = parentColumn == this ? -1 : parentColumn._id;
      this._idColumns[column._id] = column;
      if (column.name) this._nameColumns[column.name] = column;

      if (!column.columns || column.columns.length == 0) {
        this._bottomColumns.push(column);
      }

      column.level = level;
      level += 1;
      this.eachColumns(column, init, this);
      level -= 1;
      if (column.level > this.maxColumnLevel) this.maxColumnLevel = column.level;


      if (typeof column.editor == "string") {
        var cls = mini.getClass(column.editor);
        if (cls) {
          column.editor = {type: column.editor};
        } else {
          column.editor = eval('(' + column.editor + ')');
        }
      }


      if (typeof column.filter == "string") {
        column.filter = eval('(' + column.filter + ')');
      }
      if (column.filter && !column.filter.el) {
        column.filter = mini.create(column.filter);
      }

      if (typeof column.init == "function" && column.inited != true) {
        column.init(this);
      }
      column.inited = true;
    }

    this.eachColumns(this, init, this);

    if (this._doUpdateFilterRow) this._doUpdateFilterRow();

    this.doUpdate();

    this.fire("columnschanged");
  },
  getColumns: function () {
    return this.columns;
  },
  getBottomColumns: function () {
    return this._bottomColumns;
  },
  getVisibleColumns: function () {
    var columns = this.getBottomColumns();
    var cs = [];
    for (var i = 0, l = columns.length; i < l; i++) {
      var c = columns[i];
      if (c.visible) cs.push(c);
    }
    return cs;
  },
  getBottomVisibleColumns: function () {
    var columns = [];
    for (var i = 0, l = this._bottomColumns.length; i < l; i++) {
      var c = this._bottomColumns[i];
      if (this.isVisibleColumn(c)) columns.push(c);
    }
    return columns;
  },
  eachColumns: function (column, fn, scope) {
    var columns = column.columns;
    if (columns) {
      var list = columns.clone();
      for (var i = 0, l = list.length; i < l; i++) {
        var o = list[i];
        if (fn.call(scope, o, i, column) === false) break;
      }
    }
  },
  getColumn: function (index) {
    var t = typeof index;
    if (t == "number") return this.getBottomColumns()[index];
    else if (t == "object") return index;
    else {
      return this._nameColumns[index];
    }
  },
  getColumnByField: function (field) {
    if (!field) return;
    var columns = this.getBottomColumns();
    for (var i = 0, l = columns.length; i < l; i++) {
      var column = columns[i];
      if (column.field == field) return column;
    }
    return column;
  },
  _getColumnById: function (id) {
    return this._idColumns[id];
  },
  getParentColumn: function (column) {
    column = this.getColumn(column);
    var pid = column._pid;
    if (pid == -1) return this;
    return this._idColumns[pid];
  },
  getAncestorColumns: function (node) {
    var as = [];
    while (1) {
      var parentNode = this.getParentColumn(node);
      if (!parentNode || parentNode == this) break;
      as[as.length] = parentNode;
      node = parentNode;
    }
    as.reverse();
    return as;
  },
  isAncestorColumn: function (parentNode, node) {
    if (parentNode == node) return true;
    if (!parentNode || !node) return false;
    var as = this.getAncestorColumns(node);
    for (var i = 0, l = as.length; i < l; i++) {
      if (as[i] == parentNode) return true;
    }
    return false;
  },
  isVisibleColumn: function (column) {
    column = this.getColumn(column);
    var columns = this.getAncestorColumns(column);
    for (var i = 0, l = columns.length; i < l; i++) {
      if (columns[i].visible == false) return false;
    }
    return true;
  },
  updateColumn: function (column, option) {
    column = this.getColumn(column);
    if (!column) return;
    mini.copyTo(column, option);
    this.setColumns(this.columns);
  },
  removeColumn: function (column) {
    column = this.getColumn(column);
    var pcolumn = this.getParentColumn(column);
    if (column && pcolumn) {
      pcolumn.columns.remove(column);
      this.setColumns(this.columns);
    }
    return column;
  },
  moveColumn: function (column, targetColumn, action) {
    column = this.getColumn(column);
    targetColumn = this.getColumn(targetColumn);
    if (!column || !targetColumn || !action || column == targetColumn) return;

    if (this.isAncestorColumn(column, targetColumn)
    ) {
      return;
    }


    var pcolumn = this.getParentColumn(column);
    if (pcolumn) {
      pcolumn.columns.remove(column);
    }


    var parentColumn = targetColumn;
    var index = action;
    if (index == 'before') {
      parentColumn = this.getParentColumn(targetColumn);
      index = parentColumn.columns.indexOf(targetColumn);
    } else if (index == 'after') {
      parentColumn = this.getParentColumn(targetColumn);
      index = parentColumn.columns.indexOf(targetColumn) + 1;
    } else if (index == 'add' || index == "append") {
      if (!parentColumn.columns) parentColumn.columns = [];
      index = parentColumn.columns.length;
    } else if (!mini.isNumber(index)) {
      return;
    }

    parentColumn.columns.insert(index, column);

    this.setColumns(this.columns);
  },
  hideColumns: function (columns) {
    if (this.allowCellEdit) {
      this.commitEdit();
    }
    for (var i = 0, l = columns.length; i < l; i++) {
      var column = this.getColumn(columns[i]);
      if (!column) continue;
      column.visible = false;
    }
    this.setColumns(this.columns);
  },
  showColumns: function (columns) {
    if (this.allowCellEdit) {
      this.commitEdit();
    }
    for (var i = 0, l = columns.length; i < l; i++) {
      var column = this.getColumn(columns[i]);
      if (!column) continue;
      column.visible = true;
    }
    this.setColumns(this.columns);
  },
  hideColumn: function (column) {
    column = this.getColumn(column);
    if (!column) return;

    if (this.allowCellEdit) {
      this.commitEdit();
    }

    column.visible = false;
    this.setColumns(this.columns);


  },
  showColumn: function (column) {
    column = this.getColumn(column);
    if (!column) return;

    if (this.allowCellEdit) {
      this.commitEdit();
    }

    column.visible = true;
    this.setColumns(this.columns);


  },
  getColumnRows: function () {
    var maxLevel = this.getMaxColumnLevel();
    var dcs = [];
    for (var i = 0, l = maxLevel; i <= l; i++) {
      dcs.push([]);
    }

    function getColSpan(col) {
      var subColumns = mini.treeToArray(col.columns, "columns");
      var colSpan = 0;
      for (var i = 0, l = subColumns.length; i < l; i++) {
        var c = subColumns[i];
        if (c.visible != true || c._hide == true) continue;
        if (!c.columns || c.columns.length == 0) {
          colSpan += 1;
        }
      }
      return colSpan;
    }

    var list = mini.treeToArray(this.columns, "columns");

    for (var i = 0, l = list.length; i < l; i++) {
      var column = list[i];
      var cols = dcs[column.level];

      if (column.columns && column.columns.length > 0) {
        column.colspan = getColSpan(column);
      }
      if ((!column.columns || column.columns.length == 0) && column.level < maxLevel) {
        column.rowspan = maxLevel - column.level + 1;
      }

      cols.push(column);
    }

    return dcs;
  },
  getMaxColumnLevel: function () {
    return this.maxColumnLevel;
  }
}


mini_CellValidator_Prototype = {
  getCellErrors: function () {
    var errors = this._cellErrors.clone();

    var data = this.data;
    for (var i = 0, l = errors.length; i < l; i++) {
      var error = errors[i];
      var row = error.record;
      var column = error.column;
      if (data.indexOf(row) == -1) {
        var id = row[this._rowIdField] + "$" + column._id;
        delete this._cellMapErrors[id];
        this._cellErrors.remove(error);
      }
    }

    return this._cellErrors;
  },
  getCellError: function (row, column) {
    row = this.getNode ? this.getNode(row) : this.getRow(row);
    column = this.getColumn(column);
    if (!row || !column) return;

    var id = row[this._rowIdField] + "$" + column._id;
    return this._cellMapErrors[id];
  },
  isValid: function () {

    return this.getCellErrors().length == 0;
  },
  validate: function () {

    var data = this.data;
    for (var i = 0, l = data.length; i < l; i++) {
      var row = data[i];
      this.validateRow(row);

    }
  },
  validateRow: function (row) {
    var columns = this.getBottomColumns();
    for (var i = 0, l = columns.length; i < l; i++) {
      var column = columns[i];
      this.validateCell(row, column);
    }
  },
  validateCell: function (row, column) {
    row = this.getNode ? this.getNode(row) : this.getRow(row);
    column = this.getColumn(column);
    if (!row || !column) return;
    var e = {
      record: row,
      row: row,
      node: row,
      column: column,
      field: column.field,
      value: row[column.field],
      isValid: true,
      errorText: ""
    };

    if (column.vtype) {
      mini._ValidateVType(column.vtype, e.value, e, column);
    }

    if (e.isValid == true && column.unique && column.field) {

      var maps = {};
      var data = this.data, field = column.field;
      for (var i = 0, l = data.length; i < l; i++) {
        var o = data[i];
        var v = o[field];
        if (mini.isNull(v) || v === "") {
        } else {
          var old = maps[v];
          if (old && o == row) {
            e.isValid = false;
            e.errorText = mini._getErrorText(column, "uniqueErrorText");


            this.setCellIsValid(old, column, e.isValid, e.errorText);
            break;
          }
          maps[v] = o;
        }
      }
    }

    this.fire("cellvalidation", e);
    this.setCellIsValid(row, column, e.isValid, e.errorText);
  },

  setIsValid: function (value) {
    if (value) {
      var errors = this._cellErrors.clone();
      for (var i = 0, l = errors.length; i < l; i++) {
        var error = errors[i];
        this.setCellIsValid(error.record, error.column, true);
      }
    }
  },
  _removeRowError: function (row) {
    var columns = this.getColumns();
    for (var i = 0, l = columns.length; i < l; i++) {
      var column = columns[i];
      var id = row[this._rowIdField] + "$" + column._id;
      var error = this._cellMapErrors[id];
      if (error) {
        delete this._cellMapErrors[id];
        this._cellErrors.remove(error);
      }
    }
  },
  setCellIsValid: function (row, column, isValid, errorText) {
    row = this.getNode ? this.getNode(row) : this.getRow(row);
    column = this.getColumn(column);
    if (!row || !column) return;
    var id = row[this._rowIdField] + "$" + column._id;
    var cellEl = this._getCellEl(row, column);

    var error = this._cellMapErrors[id];
    delete this._cellMapErrors[id];
    this._cellErrors.remove(error);

    if (isValid === true) {
      if (cellEl && error) {
        mini.removeClass(cellEl, 'mini-grid-cell-error');
      }
    } else {
      error = {record: row, column: column, isValid: isValid, errorText: errorText};
      this._cellMapErrors[id] = error;
      this._cellErrors.add(error);
      if (cellEl) {
        mini.addClass(cellEl, 'mini-grid-cell-error');
      }
    }
  }
}


mini.getNextWeekStartDate = function (date, weekStartDay) {
  var d = mini.getWeekStartDate(date, weekStartDay);
  d.setDate(d.getDate() + 7);
  return d;
}

String.leftPad = function (val, size, ch) {
  size = size || 2;
  ch = ch || "0";
  var result = new String(val);
  if (ch == null || ch == undefined) {
    ch = " ";
  }
  while (result.length < size) {
    result = ch + result;
  }
  return result.toString();
}

