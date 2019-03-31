mini.TreeSelect = function () {
  this.data = [];
  mini.TreeSelect.superclass.constructor.call(this);
}
mini.extend(mini.TreeSelect, mini.PopupEdit, {
  valueFromSelect: false,

  text: '',
  value: '',

  autoCheckParent: false,
  expandOnLoad: false,

  valueField: "id",
  textField: "text",
  nodesField: "children",
  delimiter: ',',

  multiSelect: false,
  data: [],
  url: "",

  allowInput: false,

  showTreeIcon: false,
  showTreeLines: true,

  resultAsTree: false,
  parentField: "pid",
  checkRecursive: false,

  showFolderCheckBox: false,

  popupHeight: 200,
  popupWidth: "100%",
  popupMaxHeight: 250,
  popupMinWidth: 100,

  set: function (kv) {
    if (typeof kv == 'string') {
      return this;
    }

    var value = kv.value;
    delete kv.value;
    var text = kv.text;
    delete kv.text;
    var url = kv.url;
    delete kv.url;
    var data = kv.data;
    delete kv.data;

    mini.TreeSelect.superclass.set.call(this, kv);

    if (!mini.isNull(data)) {
      this.setData(data);
    }
    if (!mini.isNull(url)) {
      this.setUrl(url);
    }
    if (!mini.isNull(value)) {
      this.setValue(value);
    }
    if (!mini.isNull(text)) {
      this.setText(text);
    }
    return this;
  },

  uiCls: "mini-treeselect",
  _createPopup: function () {
    mini.TreeSelect.superclass._createPopup.call(this);

    this.tree = new mini.Tree();
    this.tree.setShowTreeIcon(true);
    this.tree.setStyle("border:0;width:100%;height:100%;");
    this.tree.setResultAsTree(this.resultAsTree);
    this.tree.render(this.popup._contentEl);
    this.tree.setCheckRecursive(this.checkRecursive);
    this.tree.setShowFolderCheckBox(this.showFolderCheckBox);

    this.tree.on("nodeclick", this.__OnNodeClick, this);
    this.tree.on("nodecheck", this.__OnCheckedChanged, this);
    this.tree.on("expand", this.__OnTreeExpand, this);
    this.tree.on("collapse", this.__OnTreeCollapse, this);
    this.tree.on("beforenodecheck", this.__OnTreeBeforeNodeCheck, this);
    this.tree.on("beforenodeselect", this.__OnTreeBeforeNodeSelect, this);
    this.tree.on("drawnode", this.__OnDrawNode, this);
    this.tree.allowAnim = false;

    var me = this;
    this.tree.on("beforeload", function (e) {
      me.fire("beforeload", e);
    }, this);
    this.tree.on("load", function (e) {
      me.fire("load", e);
    }, this);
    this.tree.on("loaderror", function (e) {
      me.fire("loaderror", e);
    }, this);
  },
  __OnDrawNode: function (e) {
    this.fire("drawnode", e);
  },
  __OnTreeBeforeNodeCheck: function (e) {
    e.tree = e.sender;
    this.fire("beforenodecheck", e);
  },
  __OnTreeBeforeNodeSelect: function (e) {
    e.tree = e.sender;
    this.fire("beforenodeselect", e);
  },
  __OnTreeExpand: function (e) {

  },
  __OnTreeCollapse: function (e) {

  },
  getSelectedNode: function () {
    return this.tree.getSelectedNode();
  },
  getCheckedNodes: function (hasParent) {
    return this.tree.getCheckedNodes(hasParent)
  },
  getSelectedNodes: function () {
    return this.tree.getSelectedNodes()
  },
  getParentNode: function (node) {
    return this.tree.getParentNode(node);
  },
  getChildNodes: function (node) {
    return this.tree.getChildNodes(node);
  },


  showPopup: function () {
    var ex = {cancel: false};
    this.fire("beforeshowpopup", ex);
    if (ex.cancel == true) return;


    mini.TreeSelect.superclass.showPopup.call(this);

    this.tree.setValue(this.value);
  },


  __OnPopupHide: function (e) {
    this.__doFocusCls();
    this.tree.clearFilter();
    this.fire("hidepopup");
  },
  getItem: function (item) {
    return typeof item == "object" ? item : this.data[item];
  },
  indexOf: function (item) {
    return this.data.indexOf(item);
  },
  getAt: function (index) {
    return this.data[index];
  },
  loadList: function (list, idField, parentField) {
    this.tree.loadList(list, idField, parentField);
    this.data = this.tree.getData();
  },
  getList: function () {
    return this.tree.getList();
  },
  load: function (data) {
    this.tree.load(data);
  },
  _eval: function (_) {
    return eval('(' + _ + ')');
  },
  setData: function (data) {
    if (typeof data == "string") {
      data = this._eval(data);
    }
    if (!mini.isArray(data)) data = [];
    this.tree.setData(data);
    this.data = this.tree.data;
  },
  getData: function () {
    return this.data;
  },
  setUrl: function (url) {
    this.getPopup();


    this.tree.setUrl(url);
    this.url = this.tree.url;
  },
  getUrl: function () {
    return this.url;
  },
  setTextField: function (value) {
    if (this.tree) this.tree.setTextField(value);
    this.textField = value;
  },
  getTextField: function () {
    return this.textField;
  },
  setNodesField: function (value) {
    if (this.tree) this.tree.setNodesField(value);
    this.nodesField = value;
  },
  getNodesField: function () {
    return this.nodesField;
  },

  setValue: function (value) {


    var vts = this.tree.getValueAndText(value);
    if (vts[1] == "" && !this.valueFromSelect) {
      vts[0] = value;
      vts[1] = value;
    }
    this.value = value;

    this._valueEl.value = value;

    this.text = this._textEl.value = vts[1];


    this._doEmpty();


    this.tree.value = this.value;


  },
  setMultiSelect: function (value) {
    if (this.multiSelect != value) {
      this.multiSelect = value;
      this.tree.setShowCheckBox(value);
      this.tree.setAllowSelect(!value);
      this.tree.setEnableHotTrack(!value);
    }
  },
  getMultiSelect: function () {
    return this.multiSelect;
  },
  __OnNodeClick: function (e) {

    if (this.multiSelect) return;


    var node = this.tree.getSelectedNode();
    var v = this.tree.getItemValue(node);


    var value = this.getValue();
    this.setValue(v);
    if (value != this.getValue()) {
      this._OnValueChanged();
    }

    this.hidePopup();
    this.focus();

    this.fire("nodeclick", {node: e.node});
  },
  __OnCheckedChanged: function (e) {

    if (!this.multiSelect) return;
    var v = this.tree.getValue();

    var value = this.getValue();
    this.setValue(v);
    if (value != this.getValue()) {
      this._OnValueChanged();
    }
    this.focus();

  },


  __OnInputKeyDown: function (e) {
    var ex = {htmlEvent: e};
    this.fire("keydown", ex);
    if (e.keyCode == 8 && (this.isReadOnly() || this.allowInput == false)) {
      return false;
    }

    if (e.keyCode == 9) {
      this.hidePopup();
      return;
    }

    if (this.isReadOnly()) return;

    switch (e.keyCode) {
      case 27:
        if (this.isShowPopup()) {
          e.stopPropagation();
        }

        this.hidePopup();
        break;
      case 13:
        var me = this;
        setTimeout(function () {
          me.fire("enter", ex);
        }, 10);
        break;
      case 37:
        break;
      case 38:
        e.preventDefault();
        break;
      case 39:
        break;
      case 40:
        e.preventDefault();
        this.showPopup();
        break;
      default:
        var me = this;
        setTimeout(function () {
          me._doQuery();
        }, 10);
        break;
    }
  },
  _doQuery: function () {

    var field = this.textField;
    var value = this._textEl.value.toLowerCase();
    this.tree.filter(function (node) {
      var text = String(node[field] ? node[field] : "").toLowerCase();
      if (text.indexOf(value) != -1) {
        return true;
      } else return false;
    });
    this.tree.expandAll();
    this.showPopup();
  },


  setCheckRecursive: function (value) {
    this.checkRecursive = value;
    if (this.tree) this.tree.setCheckRecursive(value);
  },
  getCheckRecursive: function () {
    return this.checkRecursive;
  },
  setResultAsTree: function (value) {
    this.resultAsTree = value;
    if (this.tree) this.tree.setResultAsTree(value);
  },
  getResultAsTree: function () {
    return this.resultAsTree;
  },
  setParentField: function (value) {
    this.parentField = value;
    if (this.tree) this.tree.setParentField(value);
  },
  getParentField: function () {
    return this.parentField;
  },
  setValueField: function (valueField) {
    if (this.tree) this.tree.setIdField(valueField);
    this.valueField = valueField;
  },
  getValueField: function () {
    return this.valueField;
  },
  setShowTreeIcon: function (value) {
    this.showTreeIcon = value;
    if (this.tree) this.tree.setShowTreeIcon(value);
  },
  getShowTreeIcon: function () {
    return this.showTreeIcon;
  },
  setShowTreeLines: function (value) {
    this.showTreeLines = value;
    if (this.tree) this.tree.setShowTreeLines(value);
  },
  getShowTreeLines: function () {
    return this.showTreeLines;
  },
  setShowFolderCheckBox: function (value) {

    this.showFolderCheckBox = value;
    if (this.tree) this.tree.setShowFolderCheckBox(value);
  },
  getShowFolderCheckBox: function () {
    return this.showFolderCheckBox;
  },
  setAutoCheckParent: function (value) {

    this.autoCheckParent = value;
    if (this.tree) this.tree.setAutoCheckParent(value);
  },
  getAutoCheckParent: function () {
    return this.autoCheckParent;
  },
  setExpandOnLoad: function (value) {

    this.expandOnLoad = value;
    if (this.tree) this.tree.setExpandOnLoad(value);
  },
  getExpandOnLoad: function () {
    return this.expandOnLoad;
  },
  setValueFromSelect: function (value) {
    this.valueFromSelect = value;
  },
  getValueFromSelect: function () {
    return this.valueFromSelect;
  },
  setDataField: function (value) {
    if (this.tree) this.tree.setDataField(value);
    this.dataField = value;
  },
  getAttrs: function (el) {
    var attrs = mini.ComboBox.superclass.getAttrs.call(this, el);

    mini._ParseString(el, attrs,
      ["url", "data", "textField", "valueField", "nodesField", "parentField", "onbeforenodecheck", "onbeforenodeselect",
        "expandOnLoad", "onnodeclick", "onbeforeload", "onload", "onloaderror", "ondrawnode"
      ]
    );
    mini._ParseBool(el, attrs,
      ["multiSelect", "resultAsTree", "checkRecursive", "showTreeIcon", "showTreeLines", "showFolderCheckBox",
        "autoCheckParent", "valueFromSelect"
      ]
    );

    if (attrs.expandOnLoad) {
      var level = parseInt(attrs.expandOnLoad);
      if (mini.isNumber(level)) {
        attrs.expandOnLoad = level;
      } else {
        attrs.expandOnLoad = attrs.expandOnLoad == "true" ? true : false;
      }
    }

    return attrs;
  }
});
mini.regClass(mini.TreeSelect, 'TreeSelect');
