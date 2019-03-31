mini.SuperTree = function () {
  mini.SuperTree.superclass.constructor.call(this);

}
mini.extend(mini.SuperTree, mini.SuperGrid, {
  treeColumn: null,
  showTreeIcon: false,
  allowColumnSort: false,

  leafIcon: "mini-supertree-leaf",
  folderIcon: "mini-supertree-folder",

  uiCls: "mini-supertree",
  _create: function () {
    mini.SuperTree.superclass._create.call(this);
    this.addCls("mini-supergrid");
  },
  _initEvents: function () {
    mini.SuperTree.superclass._initEvents.call(this);
  },
  _getSource: function (data) {
    if (!mini.isArray(data)) return data;
    var dataTree = new mini.DataTree();
    dataTree.loadData(data);
    return dataTree;
  },
  __OnTreeCollapse: function (e) {
    this.fire("collapse", e);
  },
  __OnTreeExpand: function (e) {

    this.fire("expand", e);
  },

  isLeaf: function (node) {
    return this.data.isLeaf(node);
  },
  getLevel: function (node) {
    return node ? node._level : 0;
  },
  isExpanded: function (node) {
    return this.data.isExpanded(node);
  },
  isAncestor: function (p, n) {
    return this.data.isAncestor(p, n);
  },
  _OnDrawCell: function (record, column, rowIndex, columnIndex) {
    var e = mini.SuperTree.superclass._OnDrawCell.call(this, record, column, rowIndex, columnIndex);
    if (this.treeColumn !== column.name) return e;

    var node = record;
    if (!node) return e;

    var cellHtml = e.cellHtml;

    var columnWidth = column.width;
    var isLeaf = this.isLeaf(node);
    var left = this.getLevel(node) * 18;

    var cls = '';
    if (!isLeaf) {
      cls = this.isExpanded(node) ? 'mini-supertree-expand' : 'mini-supertree-collapse';
    }

    var s = '<div class="mini-supertree-node ' + cls + '">';

    if (!isLeaf) {
      s += '<a href="#" onclick="return false;"  hidefocus class="mini-supertree-ec-icon" style="left:' + (left) + 'px;"></a>';
    }
    left += 18;

    if (this.showTreeIcon) {
      var icon = this.getIcon(node);

      s += '<div class="' + icon + ' mini-supertree-nodeicon" style="left:' + left + 'px;"></div>';
      left += 18;

    }

    s += '<div class="mini-supertree-nodetext" style="padding-left:' + (left + 2) + 'px;">' + cellHtml + '</div>';
    s += '</div>';
    cellHtml = s;
    e.cellHtml = cellHtml;
    return e;
  },
  getIcon: function (node) {
    var icon = node[this.iconField];
    if (!icon) {
      if (this.isLeaf(node)) icon = this.leafIcon;
      else icon = this.folderIcon;
    }
    return icon;
  },
  setTreeColumn: function (value) {
    if (this.treeColumn != value) {
      this.treeColumn = value;
      this.layoutChanged();
    }
  },
  setShowTreeIcon: function (value) {
    if (this.showTreeIcon != value) {
      this.showTreeIcon = value;
      this.layoutChanged();
    }
  },

  _OnCellMouseDown: function (record, column, e) {
    if (mini.findParent(e.target, "mini-supertree-ec-icon")) {

      this.data.toggle(record);


    } else {
      var eve = {
        record: record,
        column: column,
        field: column.field,
        htmlEvent: e
      };
      this.fire("cellmousedown", eve);
    }

  },
  _OnCellClick: function (record, column, e) {
    if (mini.findParent(e.target, "mini-supertree-ec-icon")) {
      e.stopPropagation();
    } else {
      var eve = {
        record: record,
        column: column,
        field: column.field,
        htmlEvent: e
      };
      this.fire("cellclick", eve);
    }

  },
  addNodeCls: function (node, cls) {
    this.addRowCls(node, cls);
  },
  removeNodeCls: function (node, cls) {
    this.removeRowCls(node, cls);
  },

  getAttrs: function (el) {
    var attrs = mini.SuperTree.superclass.getAttrs.call(this, el);
    var jq = jQuery(el);

    var treeColumn = jq.attr("treeColumn");
    if (treeColumn) {
      attrs.treeColumn = treeColumn;
    }
    var iconField = jq.attr("iconField");
    if (iconField) {
      attrs.iconField = iconField;
    }
    var nodesField = jq.attr("nodesField");
    if (nodesField) {
      attrs.nodesField = nodesField;
    }
    var useArrows = jq.attr("useArrows");
    if (useArrows) {
      attrs.useArrows = useArrows == "false" ? false : true;
    }
    var showTreeIcon = jq.attr("showTreeIcon");
    if (showTreeIcon) {
      attrs.showTreeIcon = showTreeIcon == "false" ? false : true;
    }

    return attrs;
  }
});

mini._SuperDataTreeApplys = {
  isLeaf: function (node) {
    return this.data.isLeaf(node);
  },
  getLevel: function (node) {
    return node ? node._level : 0;
  },
  isExpanded: function (node) {
    return this.data.isExpandedNode(node);
  },
  getChildNodes: function (node) {
    return this.data.getChildNodes(node);
  },
  getParentNode: function (node) {
    return this.data.getParentNode(node);
  },
  isAncestor: function (pnode, node) {
    return this.data.isAncestor(pnode, node);
  },
  getAncestors: function (node) {
    return this.data.getAncestors(node);
  },
  getRootNode: function (node) {
    return this.data.getRootNode(node);
  },
  getAncestors: function (node) {
    return this.data.getAncestors(node);
  },
  hasChildNodes: function (node) {
    return this.data.hasChildNodes(node);
  },
  indexOfNode: function (node) {
    return this.data.indexOfNode(node);
  },
  updateNode: function (node, field, value) {
    this.data.updateRecord(node, field, value);
  },
  addNode: function (node, parentNode) {
    return this.data.addNode(node, parentNode);
  },
  insertNode: function (node, index, parentNode) {
    return this.data.insertNode(node, index, parentNode);
  },
  removeNodeAt: function (index, parentNode) {
    return this.data.removeNodeAt(index, parentNode);
  },
  removeNode: function (node) {
    return this.data.removeNode(node);
  },
  moveNode: function (node, action, targetNode) {
    this.data.moveNode(node, action, targetNode);
  },
  addNodes: function (nodes, parentNode) {
    return this.data.addNodes(nodes, parentNode);
  },
  insertNodes: function (nodes, index, parentNode) {
    return this.data.insertNodes(index, nodes, parentNode);
  },
  moveNodes: function (nodes, action, targetNode) {
    this.data.moveNodes(nodes, action, targetNode);
  },
  removeNodes: function (nodes) {
    return this.data.removeNodes(nodes);
  },
  findNodes: function (field, value) {
    return this.data.findRecords(field, value);
  },
  getChanges: function () {
    return this.data.getChanges();
  },
  getData: function () {
    return this.data.toTree();
  },
  bubbleParent: function (node, fn, scope) {
    this.data.bubbleParent(node, fn, scope);
  },
  cascadeChild: function (node, fn, scope) {
    this.data.cascadeChild(node, fn, scope);
  },
  eachChild: function (node, fn, scope) {
    this.data.eachChild(node, fn, scope);
  },
  collapseLevel: function (level, deep) {
    this.data.collapseLevel(level, deep);
  },
  expandLevel: function (level, deep) {
    this.data.expandLevel(level, deep);
  },
  collapse: function (node, deep) {
    this.data.collapse(node, deep);
  },
  expand: function (node, deep) {
    this.data.expand(node, deep);
  },
  toggle: function (node) {
    this.data.toggle(node);
  },
  collapseAll: function () {
    this.data.collapseAll();
  },
  expandAll: function () {
    this.data.expandAll();
  },
  filter: function (fn, scope) {
    this.data.filter(fn, scope);
  },
  clearFilter: function () {
    this.data.clearFilter();
  },
  sort: function (fn, scope) {
    this.data.sort(fn, scope);
  },
  clearSort: function () {
    this.data.clearSort();
  }
};

mini.copyTo(mini.SuperTree.prototype, mini._SuperDataTreeApplys);

mini.regClass(mini.SuperTree, "supertree");
