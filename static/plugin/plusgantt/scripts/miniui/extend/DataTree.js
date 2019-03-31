mini.DataTree = function () {
  mini.DataTree.superclass.constructor.call(this);
};
mini.extend(mini.DataTree, mini.DataSource, {
  isTree: true,

  expandOnLoad: false,

  idField: "id",
  parentField: "pid",
  nodesField: "children",
  resultAsTree: true,

  checkModel: "cascade",
  autoCheckParent: false,
  onlyLeafCheckable: false,

  setExpandOnLoad: function (value) {
    this.expandOnLoad = value;
  },
  getExpandOnLoad: function () {
    return this.expandOnLoad;
  },
  setParentField: function (value) {
    this.parentField = value;
  },
  setNodesField: function (value) {
    if (this.nodesField != value) {
      var data = this.root[this.nodesField];
      this.nodesField = value;
      this._doLoadData(data);
    }
  },
  setResultAsTree: function (value) {
    this.resultAsTree = value;
  },
  setCheckRecursive: function (value) {
    this.checkModel = value ? "cascade" : "multiple";
  },
  getCheckRecursive: function () {
    return this.checkModel == "cascade";
  },
  setShowFolderCheckBox: function (value) {
    this.onlyLeafCheckable = !value;
  },
  getShowFolderCheckBox: function () {
    return !this.onlyLeafCheckable;
  },

  _OnBeforeLoad: function (e) {
    var node = this._loadingNode || this.root;
    e.node = node;

    if (this.isNodeLoading()) {
      e.async = true;
      e.isRoot = e.node == this.root;
      if (!e.isRoot) {
        e.data[this.idField] = this.getItemValue(e.node);
      }
    }
    this.fire("beforeload", e);
  },
  _OnPreLoad: function (e) {

    if (this.resultAsTree == false) {
      e.data = mini.arrayToTree(e.data, this.nodesField, this.idField, this.parentField)
    }
    this.fire("preload", e);


    var nodesField = this.nodesField;
    var expandOnLoad = this.expandOnLoad;

    function eachNodes(nodes, level) {
      for (var i = 0, l = nodes.length; i < l; i++) {
        var node = nodes[i];

        if (expandOnLoad === true
          || (mini.isNumber(expandOnLoad) && level <= expandOnLoad)) {
          node.expanded = true;
        } else {
          node.expanded = false;
        }

        var childs = node[nodesField];
        if (childs) {
          eachNodes(childs, level + 1);
        }
      }
    }

    eachNodes(e.data, 0);

  },
  _init: function () {

    mini.DataTree.superclass._init.call(this);
    this.root = {_id: -1, _level: -1};
    this.source = this.root[this.nodesField] = [];
    this.viewNodes = null;
    this.dataview = null;
    this.visibleRows = null;

    this._ids[this.root._id] = this.root;
  },
  _doLoadData: function (data) {

    this.source = this.root[this.nodesField] = data || [];
    this.viewNodes = null;
    this.dataview = null;
    this.visibleRows = null;


    var ds = mini.treeToArray(data, this.nodesField);
    var ids = this._ids;
    ids[this.root._id] = this.root;
    for (var i = 0, l = ds.length; i < l; i++) {
      var node = ds[i];

      node._id = mini.DataSource.RecordId++;
      ids[node._id] = node;


      node._uid = node._id;
    }


    var ds = mini.treeToArray(data, this.nodesField, "_id", "_pid", this.root._id);
    for (var i = 0, l = ds.length; i < l; i++) {
      var node = ds[i];
      var parentNode = this.getParentNode(node);
      node._pid = parentNode._id;
      node._level = parentNode._level + 1;
      delete node._state;
    }


    this._doUpdateLoadedCheckedNodes();
  },
  _setAdded: function (node) {
    var parentNode = this.getParentNode(node);
    node._id = mini.DataSource.RecordId++;


    node._uid = node._id;


    node._pid = parentNode._id;
    node[this.parentField] = parentNode[this.idField];
    node._level = parentNode._level + 1;
    node._state = "added";
    this._ids[node._id] = node;
    delete this._originals[node._id];
  },
  _createNodes: function (node) {
    var nodes = node[this.nodesField];
    if (!nodes) {
      nodes = node[this.nodesField] = [];

    }
    if (this.viewNodes && !this.viewNodes[node._id]) {
      this.viewNodes[node._id] = [];
    }
    return nodes;
  },

  addNode: function (node, parentNode) {
    if (!node) return;
    return this.insertNode(node, -1, parentNode);
  },
  addNodes: function (nodes, parentNode) {
    if (!mini.isArray(nodes)) return;
    return this.insertNodes(nodes, -1, parentNode);
  },
  insertNodes: function (nodes, index, parentNode) {
    if (!mini.isNumber(index)) return;
    if (!mini.isArray(nodes)) return;
    if (!parentNode) parentNode = this.root;
    this.beginChange();

    var pnodes = this._createNodes(parentNode);
    if (index < 0 || index > pnodes.length) index = pnodes.length;

    nodes = nodes.clone();
    for (var i = 0, l = nodes.length; i < l; i++) {
      this.insertNode(nodes[i], index + i, parentNode);
    }

    this.endChange();
    return nodes;
  },
  removeNode: function (node) {
    var parentNode = this.getParentNode(node);
    if (!parentNode) return;

    var nodes = this.getChildNodes(parentNode, false, false);
    var index = nodes.indexOf(node);


    return this.removeNodeAt(index, parentNode);
  },
  removeNodes: function (nodes) {
    if (!mini.isArray(nodes)) return;
    this.beginChange();
    nodes = nodes.clone();
    for (var i = 0, l = nodes.length; i < l; i++) {
      this.removeNode(nodes[i]);
    }
    this.endChange();
  },
  moveNodes: function (nodes, targetNode, action) {
    if (!nodes || nodes.length == 0 || !targetNode || !action) return;
    this.beginChange();
    var sf = this;
    mini.sort(nodes, function (a, b) {
      return sf.indexOf(a) > sf.indexOf(b);
    }, this);
    for (var i = 0, l = nodes.length; i < l; i++) {
      var node = nodes[i];
      this.moveNode(node, targetNode, action);
      if (i != 0) {
        targetNode = node;
        action = "after";
      }

    }
    this.endChange();
  },

  moveNode: function (node, targetNode, action) {
    if (!node || !targetNode || mini.isNull(action)) return;


    if (this.viewNodes) {
      var parentNode = targetNode;
      var index = action;
      if (index == 'before') {
        parentNode = this.getParentNode(targetNode);
        index = this.indexOfNode(targetNode);
      } else if (index == 'after') {
        parentNode = this.getParentNode(targetNode);
        index = this.indexOfNode(targetNode) + 1;
      } else if (index == 'add' || index == "append") {
        if (!parentNode[this.nodesField]) parentNode[this.nodesField] = [];
        index = parentNode[this.nodesField].length;
      } else if (!mini.isNumber(index)) {
        return;
      }
      if (this.isAncestor(node, parentNode)) {
        return false;
      }

      var childNodes = this.getChildNodes(parentNode);
      if (index < 0 || index > childNodes.length) index = childNodes.length;


      var ___node = {};
      childNodes.insert(index, ___node);


      var oldParentNode = this.getParentNode(node);
      var oldChildNodes = this.getChildNodes(oldParentNode);
      oldChildNodes.remove(node);


      index = childNodes.indexOf(___node);
      childNodes[index] = node;

    }

    var parentNode = targetNode;
    var index = action;
    var childNodes = this._createNodes(parentNode);

    if (index == 'before') {
      parentNode = this.getParentNode(targetNode);
      childNodes = this._createNodes(parentNode);
      index = childNodes.indexOf(targetNode);
    } else if (index == 'after') {
      parentNode = this.getParentNode(targetNode);
      childNodes = this._createNodes(parentNode);
      index = childNodes.indexOf(targetNode) + 1;
    } else if (index == 'add' || index == "append") {
      index = childNodes.length;
    } else if (!mini.isNumber(index)) {
      return;
    }
    if (this.isAncestor(node, parentNode)) {
      return false;
    }

    if (index < 0 || index > childNodes.length) index = childNodes.length;


    var ___node = {};
    childNodes.insert(index, ___node);


    var oldParentNode = this.getParentNode(node);
    oldParentNode[this.nodesField].remove(node);


    index = childNodes.indexOf(___node);
    childNodes[index] = node;


    this._updateParentAndLevel(node, parentNode);

    this._dataChanged();
    var e = {
      parentNode: parentNode,
      index: index,
      node: node
    };

    this.fire("movenode", e);
  },

  insertNode: function (node, index, parentNode) {
    if (!node) return;
    if (!parentNode) {
      parentNode = this.root;
      index = "add";
    }
    if (!mini.isNumber(index)) {
      switch (index) {
        case "before":
          index = this.indexOfNode(parentNode);
          parentNode = this.getParentNode(parentNode);
          this.insertNode(node, index, parentNode);
          break;
        case "after":
          index = this.indexOfNode(parentNode);
          parentNode = this.getParentNode(parentNode);
          this.insertNode(node, index + 1, parentNode);
          break;
        case "append":
        case "add":
          this.addNode(node, parentNode);
          break;
        default:
          break;
      }
      return;
    }
    ;

    var nodes2 = this._createNodes(parentNode);
    var nodes = this.getChildNodes(parentNode);
    if (index < 0) index = nodes.length;

    nodes.insert(index, node);

    index = nodes.indexOf(node);


    if (this.viewNodes) {
      var nextNode = nodes[index + 1];
      if (nextNode) {
        var index2 = nodes2.indexOf(nextNode);
        nodes2.insert(index2, node);
      } else {
        nodes2.add(node);
      }
    }

    node._pid = parentNode._id;
    this._setAdded(node);
    this.cascadeChild(node, function (n, i, p) {
      n._pid = p._id;
      this._setAdded(n);
    }, this);

    this._dataChanged();
    var e = {
      parentNode: parentNode,
      index: index,
      node: node
    };
    this.fire("addnode", e);
    return node;
  },
  removeNodeAt: function (index, parentNode) {

    if (!parentNode) parentNode = this.root;

    var nodes = this.getChildNodes(parentNode, false, false);
    var node = nodes[index];
    if (!node) return null;

    nodes.removeAt(index);
    if (this.viewNodes) {
      var nodes2 = parentNode[this.nodesField];
      nodes2.remove(node);
    }

    this._setRemoved(node);
    this.cascadeChild(node, function (n, i, p) {
      this._setRemoved(n);
    }, this);

    this._checkSelecteds();

    this._dataChanged();
    var e = {
      parentNode: parentNode,
      index: index,
      node: node
    };
    this.fire("removenode", e);

    return node;
  },


  bubbleParent: function (node, fn, scope) {
    scope = scope || this;
    if (node) fn.call(this, node);
    var parentNode = this.getParentNode(node);
    if (parentNode && parentNode != this.root) {
      this.bubbleParent(parentNode, fn, scope);
    }
  },

  cascadeChild: function (node, fn, scope) {
    if (!fn) return;
    if (!node) node = this.root;
    var nodes = node[this.nodesField];
    if (nodes) {
      nodes = nodes.clone();
      for (var i = 0, l = nodes.length; i < l; i++) {
        var c = nodes[i];
        if (fn.call(scope || this, c, i, node) === false) return;
        this.cascadeChild(c, fn, scope);
      }
    }
  },

  eachChild: function (node, fn, scope) {
    if (!fn || !node) return;
    var nodes = node[this.nodesField];
    if (nodes) {
      var list = nodes.clone();
      for (var i = 0, l = list.length; i < l; i++) {
        var o = list[i];
        if (fn.call(scope || this, o, i, node) === false) break;
      }
    }
  },
  collapseLevel: function (level, deep) {
    this.beginChange();
    this.each(function (node) {
      var nodeLevel = this.getLevel(node);
      if (level == nodeLevel) {
        this.collapse(node, deep);
      }
    }, this);
    this.endChange();
  },
  expandLevel: function (level, deep) {
    this.beginChange();
    this.each(function (node) {
      var nodeLevel = this.getLevel(node);
      if (level == nodeLevel) {
        this.expand(node, deep);
      }
    }, this);
    this.endChange();
  },
  collapse: function (node, deep) {

    if (!node) return;
    this.beginChange();

    node.expanded = false;
    if (deep) {
      this.eachChild(node, function (o) {
        if (o[this.nodesField] != null) {
          this.collapse(o, deep);
        }
      }, this);
    }

    this.endChange();

    var e = {
      node: node
    };
    this.fire("collapse", e);
  },
  expand: function (node, deep) {

    if (!node) return;
    this.beginChange();

    node.expanded = true;
    if (deep) {
      this.eachChild(node, function (o) {
        if (o[this.nodesField] != null) {
          this.expand(o, deep);
        }
      }, this);
    }

    this.endChange();

    var e = {
      node: node
    };
    this.fire("expand", e);
  },
  toggle: function (node) {
    if (this.isExpandedNode(node)) this.collapse(node);
    else this.expand(node);
  },
  collapseAll: function () {
    this.collapse(this.root, true);
  },
  expandAll: function () {
    this.expand(this.root, true);
  },


  isAncestor: function (parentNode, node) {
    if (parentNode == node) return true;
    if (!parentNode || !node) return false;
    var as = this.getAncestors(node);
    for (var i = 0, l = as.length; i < l; i++) {
      if (as[i] == parentNode) return true;
    }
    return false;
  },

  getAncestors: function (node) {
    var as = [];
    while (1) {
      var parentNode = this.getParentNode(node);
      if (!parentNode || parentNode == this.root) break;
      as[as.length] = parentNode;
      node = parentNode;
    }
    as.reverse();
    return as;
  },
  getRootNode: function () {
    return this.root;
  },
  getParentNode: function (node) {

    if (!node) return null;
    return this.getby_id(node._pid);
  },
  getAllChildNodes: function (node) {
    return this.getChildNodes(node, true);
  },
  getChildNodes: function (node, all, useView) {
    var nodes = node[this.nodesField];


    if (this.viewNodes && useView !== false) {
      nodes = this.viewNodes[node._id];
    }


    if (all === true && nodes) {
      var view = [];
      for (var i = 0, l = nodes.length; i < l; i++) {
        var cnode = nodes[i];
        view[view.length] = cnode;
        var cnodes = this.getChildNodes(cnode, all, useView);
        if (cnodes && cnodes.length > 0) {
          view.addRange(cnodes);
        }
      }
      nodes = view;
    }
    return nodes || [];
  },
  getChildNodeAt: function (index, node) {
    var nodes = this.getChildNodes(node);
    if (nodes) return nodes[index];
    return null;
  },

  hasChildNodes: function (node) {
    var nodes = this.getChildNodes(node);
    return nodes.length > 0;
  },
  getNodeLevel: function (node) {
    return node._level;
  },
  getLevel: function (node) {
    return node._level;
  },


  isLeafNode: function (node) {
    return this.isLeaf(node);
  },
  isLeaf: function (node) {
    if (!node || node.isLeaf === false) return false;
    var nodes = this.getChildNodes(node);
    if (nodes.length > 0) return false;
    return true;
  },
  hasChildren: function (node) {
    var subNodes = this.getChildNodes(node);
    return !!(subNodes && subNodes.length > 0);
  },
  isFirstNode: function (node) {
    if (node == this.root) return true;
    var parentNode = this.getParentNode(node);
    if (!parentNode) return false;
    return this.getFirstNode(parentNode) == node;
  },
  isLastNode: function (node) {
    if (node == this.root) return true;
    var parentNode = this.getParentNode(node);
    if (!parentNode) return false;
    return this.getLastNode(parentNode) == node;
  },
  isCheckedNode: function (node) {
    return node.checked === true;
  },
  isExpandedNode: function (node) {
    return node.expanded == true || node.expanded == 1 || mini.isNull(node.expanded);
  },
  isVisible: function (node) {
    var pnode = this._ids[node._pid];
    if (!pnode || pnode == this.root) return true;
    if (pnode.expanded === false) return false;
    return this.isVisible(pnode);
  },
  getNextNode: function (node) {
    var parentNode = this.getby_id(node._pid);
    if (!parentNode) return null;
    var index = this.indexOfNode(node);
    return this.getChildNodes(parentNode)[index + 1];
  },
  getPrevNode: function (node) {
    var parentNode = this.getby_id(node._pid);
    if (!parentNode) return null;
    var index = this.indexOfNode(node);
    return this.getChildNodes(parentNode)[index - 1];
  },
  getFirstNode: function (parentNode) {
    return this.getChildNodes(parentNode)[0];
  },
  getLastNode: function (parentNode) {
    var nodes = this.getChildNodes(parentNode);
    return nodes[nodes.length - 1];
  },
  indexOfNode: function (node) {
    var parentNode = this.getby_id(node._pid);
    if (parentNode) {
      return this.getChildNodes(parentNode).indexOf(node);
    }
    return -1;
  },
  getAt: function (index) {
    return this.getDataView()[index];
  },
  indexOf: function (record) {
    return this.getDataView().indexOf(record);
  },
  getRange: function (start, end) {
    if (start > end) {
      var t = start;
      start = end;
      end = t;
    }
    var data = this.getChildNodes(this.root, true);
    var range = [];
    for (var i = start, l = end; i <= l; i++) {
      var o = data[i];
      if (o) {
        range.push(o);
      }
    }
    return range;
  },
  selectRange: function (start, end) {
    var data = this.getChildNodes(this.root, true);
    if (!mini.isNumber(start)) start = data.indexOf(start);
    if (!mini.isNumber(end)) end = data.indexOf(end);
    if (mini.isNull(start) || mini.isNull(end)) return;

    var rs = this.getRange(start, end);
    this.selects(rs);
  },
  findRecords: function (property, value) {
    var data = this.toArray();

    var ifFn = typeof property == "function";
    var fn = property;
    var scope = value || this;
    var records = [];
    for (var i = 0, l = data.length; i < l; i++) {
      var o = data[i];

      if (ifFn) {
        var ret = fn.call(scope, o);
        if (ret == true) {
          records[records.length] = o;
        }
        if (ret === 1) break;
      } else {
        if (o[property] == value) {
          records[records.length] = o;
        }
      }
    }
    return records;
  },

  _dataChangedCount: 0,
  _dataChanged: function () {
    this._dataChangedCount++;
    this.dataview = null;
    this.visibleRows = null;
    if (this.__changeCount == 0) {
      this.fire("datachanged");
    }
  },
  _createDataView: function () {

    var data = this.getChildNodes(this.root, true);
    return data;
  },
  _createVisibleRows: function () {

    var data = this.getChildNodes(this.root, true);

    var view = [];
    for (var i = 0, l = data.length; i < l; i++) {
      var node = data[i];
      if (this.isVisible(node)) view[view.length] = node;
    }
    return view;
  },
  getList: function () {

    return mini.treeToList(this.source, this.nodesField);
  },
  getDataView: function () {
    if (!this.dataview) {
      this.dataview = this._createDataView();
    }
    return this.dataview;
  },
  getVisibleRows: function () {
    if (!this.visibleRows) {
      this.visibleRows = this._createVisibleRows();
    }
    return this.visibleRows;
  },

  _doFilter: function () {
    if (!this._filterInfo) {
      this.viewNodes = null;
      return;
    }

    var fn = this._filterInfo[0], scope = this._filterInfo[1];

    var viewNodes = this.viewNodes = {}, nodesField = this.nodesField;

    function filter(node) {
      var nodes = node[nodesField];
      if (!nodes) return false;
      var id = node._id;
      var views = viewNodes[id] = [];

      for (var i = 0, l = nodes.length; i < l; i++) {
        var r = nodes[i];
        var cadd = filter(r);
        var add = fn.call(scope, r, i, this);
        if (add === true || cadd) {
          views.push(r);
        }

      }
      return views.length > 0;
    }

    filter(this.root);
  },
  _doSort: function () {
    if (!this._filterInfo && !this._sortInfo) {
      this.viewNodes = null;
      return;
    }
    if (!this._sortInfo) return;
    var fn = this._sortInfo[0], scope = this._sortInfo[1], reverse = this._sortInfo[2];
    var nodesField = this.nodesField;
    if (!this.viewNodes) {
      var viewNodes = this.viewNodes = {};

      viewNodes[this.root._id] = this.root[nodesField].clone();
      this.cascadeChild(this.root, function (node, i, p) {
        var nodes = node[nodesField];
        if (nodes) {
          viewNodes[node._id] = nodes.clone();
        }
      });
    }

    var sf = this;

    function sort(node) {
      var nodes = sf.getChildNodes(node);
      mini.sort(nodes, fn, scope);
      if (reverse) nodes.reverse();
      for (var i = 0, l = nodes.length; i < l; i++) {
        var r = nodes[i];
        sort(r);
      }
    };
    sort(this.root);
  },


  toArray: function () {


    if (!this._array || this._dataChangedCount != this._dataChangedCount2) {
      this._dataChangedCount2 = this._dataChangedCount;
      this._array = this.getChildNodes(this.root, true, false);
    }


    return this._array;
  },
  toTree: function () {
    return this.root[this.nodesField];
  },

  getChanges: function (rowState, onlyField) {
    var changes = [];
    if (rowState == "removed" || rowState == null) {
      changes.addRange(this._removeds.clone());
    }
    this.cascadeChild(this.root, function (record, i, p) {
      if (record._state == null || record._state == "") return;
      if (record._state == rowState || rowState == null) {
        changes[changes.length] = record;
      }
    }, this);

    var rows = changes;
    if (onlyField) {
      for (var i = 0, l = rows.length; i < l; i++) {
        var row = rows[i];
        if (row._state == "modified") {
          var newRow = {};
          newRow._state = row._state;
          newRow[this.idField] = row[this.idField];
          for (var field in row) {
            var modifed = this.isModified(row, field);
            if (modifed) {
              newRow[field] = row[field];
            }
          }
          rows[i] = newRow;
        }
      }
    }

    return changes;
  },

  accept: function (node) {
    node = node || this.root;
    this.beginChange();
    this.cascadeChild(this.root, function (node) {
      this.acceptRecord(node);
    }, this);
    this._removeds = [];
    this._originals = {};
    this.endChange();
  },
  reject: function (node) {
    this.beginChange();
    this.cascadeChild(this.root, function (node) {
      this.rejectRecord(node);
    }, this);
    this._removeds = [];
    this._originals = {};
    this.endChange();
  },
  acceptRecord: function (node) {
    delete this._originals[node._id];
    if (node._state == "deleted") {
      this.removeNode(node);
    } else {
      delete node._state;
      delete this._originals[node._id];
      this._dataChanged();
    }
  },
  rejectRecord: function (node) {
    if (node._state == "added") {
      this.removeNode(node);
    } else if (node._state == "modified" || node._state == "deleted") {
      var or = this._getOriginal(node);
      mini.copyTo(node, or);
      delete node._state;
      delete this._originals[node._id];
      this._dataChanged();
    }
  },


  upGrade: function (task) {
    var parentTask = this.getParentNode(task);
    if (parentTask == this.root || task == this.root) {
      return false;
    }


    var pNodes = parentTask[this.nodesField];

    var index = pNodes.indexOf(task);
    var appendIndex = task[this.nodesField] ? task[this.nodesField].length : 0;

    for (var i = pNodes.length - 1; i >= index; i--) {
      var o = pNodes[i];
      pNodes.removeAt(i);
      if (o != task) {
        if (!task[this.nodesField]) task[this.nodesField] = [];
        task[this.nodesField].insert(appendIndex, o);
      }
    }

    var pparentTask = this.getParentNode(parentTask);
    var ppNodes = pparentTask[this.nodesField];
    var index = ppNodes.indexOf(parentTask);
    ppNodes.insert(index + 1, task);


    this._updateParentAndLevel(task, pparentTask);

    this._doFilter();

    this._dataChanged();
  },
  downGrade: function (node) {

    if (this.isFirstNode(node)) {
      return false;
    }

    var oldParentNode = this.getParentNode(node);

    var opNodes = oldParentNode[this.nodesField];

    var index = opNodes.indexOf(node);

    var parentNode = opNodes[index - 1];


    opNodes.removeAt(index);
    if (!parentNode[this.nodesField]) parentNode[this.nodesField] = [];
    parentNode[this.nodesField].add(node);


    this._updateParentAndLevel(node, parentNode);


    this._doFilter();

    this._dataChanged();


  },

  _updateParentAndLevel: function (node, parentNode) {
    node._pid = parentNode._id;
    node._level = parentNode._level + 1;
    this.cascadeChild(node, function (n, i, p) {
      n._pid = p._id;
      n._level = p._level + 1;

      n[this.parentField] = p[this.idField];
    }, this);
    this._setModified(node);
  },


  setCheckModel: function (value) {
    this.checkModel = value;
  },
  getCheckModel: function () {
    return this.checkModel;
  },
  setOnlyLeafCheckable: function (value) {
    this.onlyLeafCheckable = value;
  },
  getOnlyLeafCheckable: function () {
    return this.onlyLeafCheckable;
  },
  setAutoCheckParent: function (value) {
    this.autoCheckParent = value;
  },
  getAutoCheckParent: function () {
    return this.autoCheckParent;
  },
  _doUpdateLoadedCheckedNodes: function () {

    var nodes = this.getAllChildNodes(this.root);
    for (var i = 0, l = nodes.length; i < l; i++) {
      var node = nodes[i];
      if (node.checked == true) {

        this._doUpdateNodeCheckState(node);
      }
    }

  },
  _doUpdateNodeCheckState: function (node) {


    if (!node) return;
    var checked = this.isChecked(node);
    if (this.checkModel == "cascade") {

      this.cascadeChild(node, function (cnode) {
        var checkable = this.getCheckable(cnode);
        if (checkable) {
          this.doCheckNodes(cnode, checked);
        }
      }, this);

      if (!this.autoCheckParent) {
        var ans = this.getAncestors(node);
        ans.reverse();
        for (var i = 0, l = ans.length; i < l; i++) {
          var pnode = ans[i];
          var checkable = this.getCheckable(pnode);
          if (checkable == false) return;
          var childNodes = this.getChildNodes(pnode);
          var checkAll = true;
          for (var ii = 0, ll = childNodes.length; ii < ll; ii++) {
            var cnode = childNodes[ii];
            if (!this.isCheckedNode(cnode)) {
              checkAll = false;
            }
          }
          if (checkAll) this.doCheckNodes(pnode, true);
          else {
            this.doCheckNodes(pnode, false);
          }

          this.fire("checkchanged", {nodes: [pnode], _nodes: [pnode]});
        }
      }
    }
    if (this.autoCheckParent && checked) {

      var ans = this.getAncestors(node);
      ans.reverse();
      for (var i = 0, l = ans.length; i < l; i++) {
        var pnode = ans[i];
        var checkable = this.getCheckable(pnode);
        if (checkable == false) return;
        pnode.checked = true;
        this.fire("checkchanged", {nodes: [pnode], _nodes: [pnode]});
      }
    }
  },
  doCheckNodes: function (nodes, checked, cascade) {

    if (!nodes) return;
    if (typeof nodes == "string") {
      nodes = nodes.split(",");
    }
    if (!mini.isArray(nodes)) nodes = [nodes];
    nodes = nodes.clone();
    var _nodes = [];
    checked = checked !== false;

    if (cascade === true) {
      if (this.checkModel == "single") {
        this.uncheckAllNodes();
      }
    }
    for (var i = nodes.length - 1; i >= 0; i--) {
      var node = this.getRecord(nodes[i]);
      if (
        !node
        || (checked && node.checked === true)
        || (!checked && node.checked !== true)
      ) {
        if (node) {
          if (cascade === true) {
            this._doUpdateNodeCheckState(node);
          }
        }
        continue;
      }
      node.checked = checked;
      _nodes.push(node);
      if (cascade === true) {
        this._doUpdateNodeCheckState(node);
      }

    }

    var me = this;
    setTimeout(function () {
      me.fire("checkchanged", {nodes: nodes, _nodes: _nodes, checked: checked});
    }, 1);
  },
  checkNode: function (node) {
    this.doCheckNodes([node], true, true);
  },
  uncheckNode: function (node) {
    this.doCheckNodes([node], false, true);
  },
  checkNodes: function (nodes) {
    if (!mini.isArray(nodes)) nodes = [];
    this.doCheckNodes(nodes, true, true);
  },
  uncheckNodes: function (nodes) {
    if (!mini.isArray(nodes)) nodes = [];
    this.doCheckNodes(nodes, false, true);
  },
  checkAllNodes: function () {
    var nodes = this.getList();
    this.doCheckNodes(nodes, true);
  },
  uncheckAllNodes: function () {
    var nodes = this.getList();
    this.doCheckNodes(nodes, false);
  },

  getCheckedNodes: function (mode) {
    var nodes = [];
    this.cascadeChild(this.root, function (node) {
      if (node.checked == true) {
        var isLeaf = this.isLeafNode(node);
        if (mode == "parent") {
          if (!isLeaf) {
            nodes.push(node);
          }
        } else if (node == "leaf") {
          if (isLeaf) {
            nodes.push(node);
          }
        } else {
          nodes.push(node);
        }
      }
    }, this);
    return nodes;
  },
  getCheckedNodesId: function (mode, delimiter) {
    var nodes = this.getCheckedNodes(mode);
    var vts = this.getValueAndText(nodes, delimiter);
    return vts[0];
  },
  getCheckedNodesText: function (mode, delimiter) {
    var nodes = this.getCheckedNodes(mode);
    var vts = this.getValueAndText(nodes, delimiter);
    return vts[1];
  },
  isChecked: function (node) {
    node = this.getRecord(node);
    if (!node) return null;
    return node.checked === true;
  },
  getCheckState: function (node) {

    node = this.getRecord(node);
    if (!node) return null;
    if (node.checked === true) return "checked";
    if (!node[this.nodesField]) return "unchecked";
    var children = this.getChildNodes(node);
    for (var i = 0, l = children.length; i < l; i++) {
      var node = children[i];
      if (node.checked === true) return "indeterminate";
    }
    return "unchecked";
  },
  getUnCheckableNodes: function () {
    var nodes = [];
    this.cascadeChild(this.root, function (node) {
      var checkable = this.getCheckable(node);
      if (checkable == false) {
        nodes.push(node);
      }
    }, this);
    return nodes;
  },
  setCheckable: function (nodes, checkable) {
    if (!nodes) return;
    if (!mini.isArray(nodes)) nodes = [nodes];
    nodes = nodes.clone();
    checkable = !!checkable;
    for (var i = nodes.length - 1; i >= 0; i--) {
      var node = this.getRecord(nodes[i]);
      if (!node) {
        continue;
      }
      node.checkable = checked;
    }

  },
  getCheckable: function (node) {
    node = this.getRecord(node);
    if (!node) return false;
    if (node.checkable === true) return true;
    if (node.checkable === false) return false;
    return this.isLeafNode(node) ? true : !this.onlyLeafCheckable;
  },
  showNodeCheckbox: function (node, show) {

  },

  isNodeLoading: function () {
    return !!this._loadingNode;
  },
  loadNode: function (node, expand) {
    this._loadingNode = node;
    var e = {node: node};
    this.fire("beforeloadnode", e);


    var time = new Date();

    var me = this;
    me._doLoadAjax(me.loadParams, null, null, null, function (e) {
      var t = new Date() - time;
      if (t < 60) t = 60 - t;

      setTimeout(function () {
        e.node = me._loadingNode;
        me._loadingNode = null;

        var oldNodes = node[me.nodesField];
        me.removeNodes(oldNodes);

        var nodes = e.data;
        if (nodes && nodes.length > 0) {
          me.addNodes(nodes, node);
          if (expand !== false) {
            me.expand(node, true);
          } else {
            me.collapse(node, true);
          }
        } else {
          delete node.isLeaf;
        }
        me.fire("loadnode", {node: node});
      }, t);
    }, true);
  }
});
mini.regClass(mini.DataTree, "datatree");