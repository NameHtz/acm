mini.DataTable = function () {
  mini.DataTable.superclass.constructor.call(this);
};
mini.extend(mini.DataTable, mini.DataSource, {
  _init: function () {
    mini.DataTable.superclass._init.call(this);
    this._filterInfo = null;
    this._sortInfo = null;
  },
  add: function (record) {
    return this.insert(this.source.length, record);
  },
  addRange: function (records) {
    this.insertRange(this.source.length, records);
  },
  insert: function (index, record) {
    if (!record) return null;
    if (!mini.isNumber(index)) {
      var insertRow = this.getRecord(index);
      if (insertRow) {
        index = this.indexOf(insertRow);
      } else {
        index = this.getDataView().length;
      }

    }

    var target = this.dataview[index];
    if (target) {
      this.dataview.insert(index, record);
    } else {
      this.dataview.add(record);
    }

    if (this.dataview != this.source) {
      if (target) {
        var sourceIndex = this.source.indexOf(target);
        this.source.insert(sourceIndex, record);
      } else {
        this.source.add(record);
      }
    }

    this._setAdded(record);

    this._dataChanged();

    var e = {
      index: index,
      record: record
    };
    this.fire("add", e);
  },
  insertRange: function (index, records) {
    if (!mini.isArray(records)) return;
    this.beginChange();
    for (var i = 0, l = records.length; i < l; i++) {
      var record = records[i];
      this.insert(index + i, record);
    }
    this.endChange();
  },
  remove: function (record, autoSelect) {
    var index = this.indexOf(record);
    return this.removeAt(index, autoSelect);
  },
  removeAt: function (index, autoSelect) {
    var record = this.getAt(index);
    if (!record) return null;

    var isSelected = this.isSelected(record);

    this.source.removeAt(index);
    if (this.dataview !== this.source) {
      this.dataview.removeAt(index);
    }

    this._setRemoved(record);

    this._checkSelecteds();

    this._dataChanged();

    var e = {
      record: record
    };
    this.fire("remove", e);

    if (isSelected && autoSelect) {
      var newSelected = this.getAt(index);
      if (!newSelected) newSelected = this.getAt(index - 1);
      this.deselectAll();
      this.select(newSelected);
    }
  },
  removeRange: function (records, autoSelect) {
    if (!mini.isArray(records)) return;
    this.beginChange();
    for (var i = 0, l = records.length; i < l; i++) {
      var o = records[i];
      this.remove(o, autoSelect);
    }
    this.endChange();
  },
  move: function (record, newIndex) {
    if (!record || !mini.isNumber(newIndex)) return;
    if (newIndex < 0) newIndex = this.dataview.length;
    if (mini.isArray(record)) {
      this.beginChange();

      var rs = record, targetRecord = this.getAt(newIndex);
      var sf = this;
      mini.sort(rs, function (a, b) {
        return sf.indexOf(a) > sf.indexOf(b);
      }, this);
      for (var i = 0, l = rs.length; i < l; i++) {
        var r = rs[i];
        var index = this.indexOf(targetRecord);
        this.move(r, index);
      }
      this.endChange();
      return;
    }

    var target = this.dataview[newIndex];

    this.dataview.remove(record);

    var _index = this.dataview.indexOf(target);
    if (_index != -1) {
      newIndex = _index;
    }
    if (target) {
      this.dataview.insert(newIndex, record);
    } else {
      this.dataview.add(record);
    }

    if (this.dataview != this.source) {
      this.source.remove(record);
      var _index = this.source.indexOf(target);
      if (_index != -1) {
        newIndex = _index;
      }
      if (target) {
        this.source.insert(newIndex, record);
      } else {
        this.source.add(record);
      }
    }

    this._dataChanged();

    var e = {
      index: newIndex,
      record: record
    };
    this.fire("move", e);
  },
  indexOf: function (record) {
    return this.dataview.indexOf(record);
  },
  getAt: function (index) {
    return this.dataview[index];
  },
  getRange: function (start, end) {
    if (start > end) {
      var t = start;
      start = end;
      end = t;
    }
    var range = [];
    for (var i = start, l = end; i <= l; i++) {
      var o = this.dataview[i];
      range.push(o);
    }
    return range;
  },
  selectRange: function (start, end) {
    if (!mini.isNumber(start)) start = this.indexOf(start);
    if (!mini.isNumber(end)) end = this.indexOf(end);
    if (mini.isNull(start) || mini.isNull(end)) return;

    var rs = this.getRange(start, end);
    this.selects(rs);
  },
  toArray: function () {
    return this.source.clone();
  },


  getChanges: function (rowState, onlyField) {
    var changes = [];
    if (rowState == "removed" || rowState == null) {
      changes.addRange(this._removeds.clone());
    }
    for (var i = 0, l = this.source.length; i < l; i++) {
      var record = this.source[i];
      if (!record._state) continue;
      if (record._state == rowState || rowState == null) {
        changes[changes.length] = record;
      }
    }

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

  accept: function () {
    this.beginChange();
    for (var i = 0, l = this.source.length; i < l; i++) {
      var record = this.source[i];
      this.acceptRecord(record);
    }
    this._removeds = [];
    this._originals = {};
    this.endChange();
  },
  reject: function () {
    this.beginChange();
    for (var i = 0, l = this.source.length; i < l; i++) {
      var record = this.source[i];
      this.rejectRecord(record);
    }
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


  _doFilter: function () {
    if (!this._filterInfo) {
      this.dataview = this.source;
      return;
    }
    var fn = this._filterInfo[0], scope = this._filterInfo[1];
    var view = [];
    var data = this.source;
    for (var i = 0, l = data.length; i < l; i++) {
      var r = data[i];
      var add = fn.call(scope, r, i, this);
      if (add !== false) {
        view.push(r);
      }
    }
    this.dataview = view;
  },
  _doSort: function () {
    if (!this._sortInfo) return;
    var fn = this._sortInfo[0], scope = this._sortInfo[1], reverse = this._sortInfo[2];
    var dv = this.getDataView().clone();
    mini.sort(dv, fn, scope);
    if (reverse) dv.reverse();
    this.dataview = dv;
  }
});
mini.regClass(mini.DataTable, "datatable");