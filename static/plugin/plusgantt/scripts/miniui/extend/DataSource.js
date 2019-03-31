mini.DataSource = function () {
  mini.DataSource.superclass.constructor.call(this);
  this._init();
};
mini.extend(mini.DataSource, mini.Component, {
  idField: "id",
  textField: "text",

  _init: function () {
    this.source = [];
    this.dataview = [];
    this.visibleRows = null;

    this._ids = {};
    this._removeds = [];
    this._originals = {};
    this._errors = {};

    this._selected = null;
    this._selecteds = [];
    this._idSelecteds = {};

    this.__changeCount = 0;
  },
  getSource: function () {
    return this.source;
  },
  getList: function () {
    return this.source.clone();
  },
  getDataView: function () {
    return this.dataview;
  },
  getVisibleRows: function () {

    if (!this.visibleRows) {
      this.visibleRows = this.getDataView().clone();
    }
    return this.visibleRows;
  },
  setData: function (data) {
    this.loadData(data);
  },
  loadData: function (data) {
    if (!mini.isArray(data)) data = [];


    this._init();
    this._doLoadData(data);

    this._dataChanged();
    this.fire("loaddata");
    return true;
  },
  _doLoadData: function (data) {
    this.source = data;
    this.dataview = data;

    var ds = this.source, ids = this._ids;
    for (var i = 0, l = ds.length; i < l; i++) {
      var record = ds[i];

      record._id = mini.DataSource.RecordId++;
      ids[record._id] = record;


      record._uid = record._id;
    }
  },
  clearData: function () {
    this._init();
    this._dataChanged();
    this.fire("cleardata");
  },
  clear: function () {
    this.clearData();
  },


  updateRecord: function (record, field, value) {
    if (mini.isNull(record)) return;

    if (typeof field == 'string') {
      var oldValue = record[field];
      if (mini.isEquals(oldValue, value)) {

        return false;
      }
      this.beginChange();
      record[field] = value;
      this._setModified(record, field, oldValue);
      this.endChange();


    } else {
      this.beginChange();
      for (var p in field) {
        var oldValue = record[p];
        var value = field[p];
        if (mini.isEquals(oldValue, value)) continue;
        record[p] = value;
        this._setModified(record, p, oldValue);
      }
      this.endChange();

    }

    this.fire("update", {record: record});
  },
  deleteRecord: function (record) {
    this._setDeleted(record);

    this._dataChanged();
    this.fire("delete", {record: record});
  },
  getby_id: function (id) {
    id = typeof id == "object" ? id._id : id;
    return this._ids[id];
  },
  getbyId: function (id) {
    var t = typeof id;
    if (t == "number") return this.getAt(id);
    if (typeof id == "object") return id;
    var data = this.getList();
    for (var i = 0, l = data.length; i < l; i++) {
      var o = data[i];
      if (o[this.idField] == id) return o;
    }
    return null;
  },
  getsByIds: function (value) {
    if (mini.isNull(value)) value = "";
    value = String(value);
    var nodes = [];
    var ids = String(value).split(",");
    for (var i = 0, l = ids.length; i < l; i++) {
      var node = this.getbyId(ids[i]);
      if (node) nodes.push(node);
    }
    return nodes;
  },
  getRecord: function (id) {
    return this.getRow(id);
  },
  getRow: function (index) {
    var t = typeof index;
    if (t == "string") return this.getbyId(index);
    else if (t == "number") return this.getAt(index);
    else if (t == "object") return index;
  },
  delimiter: ",",
  getValueAndText: function (records, delimiter) {
    if (mini.isNull(records)) records = [];
    delimiter = delimiter || this.delimiter;
    if (!mini.isArray(records)) {
      records = this.getsByIds(records);
    }
    var values = [];
    var texts = [];
    for (var i = 0, l = records.length; i < l; i++) {
      var record = records[i];
      if (record) {
        values.push(this.getItemValue(record));
        texts.push(this.getItemText(record));
      }
    }
    return [values.join(delimiter), texts.join(delimiter)];
  },
  getItemValue: function (item) {
    if (!item) return "";
    var t = item[this.idField];
    return mini.isNull(t) ? '' : String(t);
  },
  getItemText: function (item) {
    if (!item) return "";
    var t = item[this.textField];
    return mini.isNull(t) ? '' : String(t);
  },

  isModified: function (reocrd, field) {
    var or = this._originals[reocrd._id];
    if (!or) return false;
    if (mini.isNull(field)) return false;
    return or.hasOwnProperty(field);
  },
  hasRecord: function (record) {
    return !!this.getby_id(record);
  },
  findRecords: function (property, value) {
    var ifFn = typeof property == "function";
    var fn = property;
    var scope = value || this;
    var data = this.source;
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
  each: function (fn, scope) {
    var data = this.getDataView().clone();
    scope = scope || this;
    mini.forEach(data, fn, scope);
  },
  getCount: function () {
    return this.getDataView().length;
  },
  setIdField: function (value) {
    this.idField = value;
  },
  setTextField: function (value) {
    this.textField = value;
  },

  __changeCount: 0,
  beginChange: function () {
    this.__changeCount++;
  },
  endChange: function (raise) {
    this.__changeCount--;
    if (this.__changeCount < 0) this.__changeCount = 0;
    if ((raise !== false && this.__changeCount == 0) || raise == true) {
      this.__changeCount = 0;
      this._dataChanged();
    }
  },
  _dataChanged: function () {
    this.visibleRows = null;
    if (this.__changeCount == 0) {
      this.fire("datachanged");
    }
  },


  _setAdded: function (record) {
    record._id = mini.DataSource.RecordId++;


    record._uid = record._id;


    record._state = "added";
    this._ids[record._id] = record;
    delete this._originals[record._id];
  },
  _setModified: function (record, field, oldValue) {
    if (record._state != "added"
      && record._state != "deleted"
      && record._state != "removed"
    ) {
      record._state = "modified";
      var or = this._getOriginal(record);
      if (!or.hasOwnProperty(field)) {
        or[field] = oldValue;
      }
    }
  },
  _setDeleted: function (record) {
    if (record._state != "added"
      && record._state != "deleted"
      && record._state != "removed"
    ) {
      record._state = "deleted";
    }
  },
  _setRemoved: function (record) {
    delete this._ids[record._id];
    if (record._state != "added" && record._state != "removed") {
      record._state = "removed";
      delete this._originals[record._id];
      this._removeds.push(record);
    }
  },
  _getOriginal: function (record) {
    var rid = record._id;
    var or = this._originals[rid];
    if (!or) {
      or = this._originals[rid] = {};
    }
    return or;
  },

  _selected: null,
  _selecteds: [],
  _idSelecteds: null,
  multiSelect: false,
  isSelected: function (id) {
    if (!id) return false;
    if (typeof id != "string") id = id._id;
    return !!this._idSelecteds[id];
  },
  setSelected: function (record) {
    record = this.getby_id(record);
    var selected = this.getSelected();
    if (selected != record) {
      this._selected = record;
      if (record) {
        this.select(record);
      } else {
        this.deselect(this.getSelected());
      }

      this._OnCurrentChanged(record);
    }
  },
  getSelected: function () {
    if (this.isSelected(this._selected)) return this._selected;
    return this._selecteds[0];
  },
  setCurrent: function (record) {
    this.setSelected(record);
  },
  getCurrent: function () {
    return this.getSelected();
  },
  getSelecteds: function () {
    return this._selecteds.clone();
  },
  select: function (record) {
    if (mini.isNull(record)) return;
    this.selects([record]);
  },
  deselect: function (record) {
    if (mini.isNull(record)) return;
    this.deselects([record]);
  },
  selectAll: function () {
    this.selects(this.getList());
  },
  deselectAll: function () {
    this.deselects(this.getList());
  },
  selects: function (records) {
    if (!mini.isArray(records)) return;
    records = records.clone();


    if (this.multiSelect == false) {
      this.deselects(this.getSelecteds());
      if (records.length > 0) records.length = 1;
      this._selecteds = [];
      this._idSelecteds = {};
    }

    var _records = [];
    for (var i = 0, l = records.length; i < l; i++) {
      var record = this.getbyId(records[i]);
      if (!record) continue;
      if (!this.isSelected(record)) {
        this._selecteds.push(record);
        this._idSelecteds[record._id] = record;
        _records.push(record);
      }
    }
    this._OnSelectionChanged(records, true, _records);
  },
  deselects: function (records) {
    if (!mini.isArray(records)) return;
    records = records.clone();
    var _records = [];
    for (var i = records.length - 1; i >= 0; i--) {
      var record = this.getbyId(records[i]);
      if (!record) continue;
      if (this.isSelected(record)) {
        this._selecteds.remove(record);
        delete this._idSelecteds[record._id];
        _records.push(record);
      }
    }
    this._OnSelectionChanged(records, false, _records);
  },
  _OnSelectionChanged: function (records, select, _records) {
    var e = {
      records: records,
      select: select,
      selected: this.getSelected(),
      selecteds: this.getSelecteds(),
      _records: _records
    };
    this.fire("SelectionChanged", e);

    var current = this._current;
    var now = this.getCurrent();
    if (current != now) {
      this._current = now;
      this._OnCurrentChanged(now);
    }
  },
  _OnCurrentChanged: function (record) {
    if (this._currentTimer) {
      clearTimeout(this._currentTimer);
    }
    var me = this;
    this._currentTimer = setTimeout(function () {
      me._currentTimer = null;
      var e = {record: record};
      me.fire("CurrentChanged", e);
    }, 1);
  },
  _checkSelecteds: function () {
    for (var i = this._selecteds.length - 1; i >= 0; i--) {
      var record = this._selecteds[i];
      var r = this.getby_id(record._id);
      if (!r) {
        this._selecteds.removeAt(i);
        delete this._idSelecteds[record._id];
      }
    }
    if (this._selected && this.getby_id(this._selected._id) == null) {
      this._selected = null;
    }
  },
  setMultiSelect: function (value) {
    if (this.multiSelect != value) {
      this.multiSelect = value;
      if (value == false) {

      }
    }
  },
  getMultiSelect: function () {
    return this.multiSelect;
  },
  selectPrev: function () {
    var record = this.getSelected();
    if (!record) {
      record = this.getAt(0);
    } else {
      var index = this.indexOf(record);
      record = this.getAt(index - 1);
    }
    if (record) {
      this.deselectAll();
      this.select(record);
      this.setCurrent(record);
    }
  },
  selectNext: function () {
    var record = this.getSelected();
    if (!record) {
      record = this.getAt(0);
    } else {
      var index = this.indexOf(record);
      record = this.getAt(index + 1);
    }
    if (record) {
      this.deselectAll();
      this.select(record);
      this.setCurrent(record);
    }
  },
  selectFirst: function () {
    var record = this.getAt(0);
    if (record) {
      this.deselectAll();
      this.select(record);
      this.setCurrent(record);
    }
  },
  selectLast: function () {
    var data = this.getVisibleRows();
    var record = this.getAt(data.length - 1);
    if (record) {
      this.deselectAll();
      this.select(record);
      this.setCurrent(record);
    }
  },
  getSelectedsId: function (delimiter) {
    var nodes = this.getSelecteds();
    var vts = this.getValueAndText(nodes, delimiter);
    return vts[0];
  },
  getSelectedsText: function (delimiter) {
    var nodes = this.getSelecteds();
    var vts = this.getValueAndText(nodes, delimiter);
    return vts[1];
  },

  _filterInfo: null,
  _sortInfo: null,
  filter: function (fn, scope) {

    if (typeof fn != "function") return;
    scope = scope || this;

    this._filterInfo = [fn, scope];

    this._doFilter();

    this._doSort();

    this._dataChanged();

    this.fire("filter");
  },
  clearFilter: function () {
    if (!this._filterInfo) return;
    this._filterInfo = null;
    this._doFilter();
    this._doSort();
    this._dataChanged();
    this.fire("filter");
  },
  sort: function (fn, scope, reverse) {
    if (typeof fn != "function") return;
    scope = scope || this;
    this._sortInfo = [fn, scope, reverse];
    this._doSort();
    this._dataChanged();
    this.fire("sort");
  },
  clearSort: function () {
    this._sortInfo = null;

    this.sortField = this.sortOrder = null;

    this._doFilter();
    this._dataChanged();
    this.fire("filter");
  },
  _doClientSortField: function (sortField, sortOrder, dataType) {

    var sortFn = this._getSortFnByField(sortField, dataType);
    if (!sortFn) return;

    this.sortField = sortField;
    this.sortOrder = sortOrder;

    var reverse = sortOrder == "desc";
    this.sort(sortFn, this, reverse);
  },
  _getSortFnByField: function (field, sortType) {
    if (!field) return null;
    var sortFn = null;
    var typeFn = mini.sortTypes[sortType];
    if (!typeFn) typeFn = mini.sortTypes["string"];

    function sortBy(a, b) {
      var a1 = mini._getMap(field, a), b1 = mini._getMap(field, b);

      var nullA = mini.isNull(a1) || a1 === "";
      var nullB = mini.isNull(b1) || b1 === "";
      if (nullA) return -1;
      if (nullB) return 1;

      var v1 = typeFn(a1);
      var v2 = typeFn(b1);
      if (v1 > v2) return 1;
      else if (v1 == v2) return 0;
      else return -1;
    }

    sortFn = sortBy;
    return sortFn;
  },


  ajaxAsync: true,
  ajaxMethod: '',

  ajaxOptions: null,
  autoLoad: false,
  url: "",

  pageSize: 20,
  pageIndex: 0,
  totalCount: 0,
  totalPage: 0,

  sortField: "",
  sortOrder: "",

  loadParams: null,
  getLoadParams: function () {
    return this.loadParams || {};
  },


  sortMode: "server",

  pageIndexField: "pageIndex",
  pageSizeField: "pageSize",
  sortFieldField: "sortField",
  sortOrderField: "sortOrder",
  totalField: "total",
  dataField: "data",

  load: function (params, success, error, complete) {
    if (typeof params == "string") {
      this.setUrl(params);
      return;
    }
    if (this._loadTimer) clearTimeout(this._loadTimer);
    this.loadParams = params || {};
    if (this.ajaxAsync) {
      var me = this;
      this._loadTimer = setTimeout(function () {
        me._doLoadAjax(me.loadParams, success, error, complete);
        me._loadTimer = null;
      }, 1);
    } else {
      this._doLoadAjax(this.loadParams, success, error, complete);
    }
  },
  reload: function (success, error, complete) {
    this.load(this.loadParams, success, error, complete);
  },
  gotoPage: function (index, size) {
    var params = this.loadParams || {};
    if (mini.isNumber(index)) params.pageIndex = index;
    if (mini.isNumber(size)) params.pageSize = size;
    this.load(params);
  },
  sortBy: function (sortField, sortOrder) {
    this.sortField = sortField;
    this.sortOrder = sortOrder == "asc" ? "asc" : "desc";
    if (this.sortMode == "server") {
      var params = this.getLoadParams();
      params.sortField = sortField;
      params.sortOrder = sortOrder;
      params.pageIndex = this.pageIndex;
      this.load(params);
    } else {


    }
  },
  checkSelectOnLoad: true,
  selectOnLoad: false,
  _doLoadAjax: function (params, success, error, complete, _successHandler) {
    params = params || {};
    if (mini.isNull(params.pageIndex)) params.pageIndex = 0;
    if (mini.isNull(params.pageSize)) params.pageSize = this.pageSize;
    params.sortField = this.sortField;
    params.sortOrder = this.sortOrder;

    this.loadParams = params;

    var url = this._evalUrl();
    var type = this._evalType(url);

    var e = {
      url: url,
      async: this.ajaxAsync,
      type: type,
      data: params,
      params: params,
      cancel: false
    };

    if (e.data != e.params && e.params != params) {
      e.data = e.params;
    }


    mini.copyTo(e, this.ajaxOptions);

    this._OnBeforeLoad(e);
    if (e.cancel == true) return;


    var o = {};
    o[this.pageIndexField] = params.pageIndex;
    o[this.pageSizeField] = params.pageSize;
    if (params.sortField) o[this.sortFieldField] = params.sortField;
    if (params.sortOrder) o[this.sortOrderField] = params.sortOrder;
    delete params.pageIndex;
    delete params.pageSize;
    delete params.sortField;
    delete params.sortOrder;
    mini.copyTo(params, o);


    var selected = this.getSelected();
    this._selectedValue = selected ? selected[this.idField] : null;

    var me = this;
    me._resultObject = null;


    var options = {
      url: e.url,
      type: e.type,
      async: e.async,
      data: e.data,
      cache: false,
      dataType: "text",
      success: function (text, textStatus, xhr) {

        var result = null;
        try {
          result = mini.decode(text);
        } catch (ex) {
          if (mini_debugger == true) {
            alert(url + "\n json is error.");
          }
        }
        if (result == null) {
          result = {};
          result[me.dataField] = [];
          result[me.totalField] = 0;
        }

        if (mini.isArray(result)) {
          var r = {};
          r[me.dataField] = result;
          r[me.totalField] = result.length;
          result = r;
        }

        result.total = result[me.totalField];
        result.data = result[me.dataField];
        if (!result.data) result.data = [];
        if (!result.total) result.total = 0;

        me._resultObject = result;

        var ex = {
          xhr: xhr,
          text: text,
          textStatus: textStatus,
          result: result,
          total: result.total,
          data: result.data.clone(),

          pageIndex: params[me.pageIndexField],
          pageSize: params[me.pageSizeField]
        };

        if (mini.isNumber(result.error) && result.error != 0) {

          ex.textStatus = "servererror";
          ex.errorCode = result.error;
          ex.stackTrace = result.stackTrace;
          ex.errorMsg = result.errorMsg;
          if (mini_debugger == true) {
            alert(url + "\n" + ex.textStatus + "\n" + ex.stackTrace);
          }
          me.fire("loaderror", ex);
          if (error) error.call(me, ex);
        } else {
          if (_successHandler) {
            _successHandler(ex);
          } else {

            me._OnPreLoad(ex);


            me.pageIndex = ex.pageIndex;
            me.pageSize = ex.pageSize;
            me.setTotalCount(ex.total);


            me.setData(ex.data);


            if (me._selectedValue && me.checkSelectOnLoad) {
              var o = me.getbyId(me._selectedValue);
              if (o) {
                me.select(o);
              }
            }

            if (me.getSelected() == null && me.selectOnLoad && me.getDataView().length > 0) {
              me.select(0);
            }
            me.fire("load", ex);
            if (success) success.call(me, ex);
          }
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        var ex = {
          xhr: xhr,
          text: xhr.responseText,
          textStatus: textStatus
        };
        ex.errorMsg = xhr.responseText;
        ex.errorCode = xhr.status;

        if (mini_debugger == true) {
          alert(url + "\n" + ex.errorCode + "\n" + ex.errorMsg);
        }

        me.fire("loaderror", ex);
        if (error) error.call(me, ex);
      },
      complete: function (xhr, textStatus) {
        var ex = {
          xhr: xhr,
          text: xhr.responseText,
          textStatus: textStatus
        };
        me.fire("loadcomplete", ex);
        if (complete) complete.call(me, ex);
        me._xhr = null;
      }
    };
    if (this._xhr) {
      this._xhr.abort();
    }
    this._xhr = mini.ajax(options);
  },
  _OnBeforeLoad: function (e) {
    this.fire("beforeload", e);
  },
  _OnPreLoad: function (e) {
    this.fire("preload", e);
  },
  _evalUrl: function () {
    var url = this.url;
    if (typeof url == "function") {
      url = url();
    } else {
      try {
        url = eval(url);
      } catch (ex) {
        url = this.url;
      }
    }
    return url;
  },
  _evalType: function (url) {
    var type = this.ajaxMethod;
    if (!type) {
      type = 'post';
      if (url) {
        if (url.indexOf(".txt") != -1 || url.indexOf(".json") != -1) {
          type = "get";
        }
      } else {
        type = "get";
      }
    }
    return type;
  },
  setSortMode: function (value) {
    this.sortMode = value;
  },
  getSortMode: function () {
    return this.sortMode;
  },
  setAjaxOptions: function (value) {
    this.ajaxOptions = value;
  },
  getAjaxOptions: function () {
    return this.ajaxOptions;
  },
  setAutoLoad: function (value) {
    this.autoLoad = value;
  },
  getAutoLoad: function () {
    return this.autoLoad;
  },
  setUrl: function (value) {
    this.url = value;
    if (this.autoLoad) {
      this.load();
    }
  },
  getUrl: function () {
    return this.url;
  },
  setPageIndex: function (value) {
    this.pageIndex = value;
    this.fire("pageinfochanged");
  },
  getPageIndex: function () {
    return this.pageIndex;
  },
  setPageSize: function (value) {
    this.pageSize = value;
    this.fire("pageinfochanged");
  },
  getPageSize: function () {
    return this.pageSize;
  },
  setTotalCount: function (value) {
    this.totalCount = value;
    this.fire("pageinfochanged");
  },
  getTotalCount: function () {
    return this.totalCount;
  },
  getTotalPage: function () {
    return this.totalPage;
  },
  setCheckSelectOnLoad: function (value) {
    this.checkSelectOnLoad = value;
  },
  getCheckSelectOnLoad: function () {
    return this.checkSelectOnLoad;
  },
  setSelectOnLoad: function (value) {
    this.selectOnLoad = value;
  },
  getSelectOnLoad: function () {
    return this.selectOnLoad;
  }

});
mini.DataSource.RecordId = 1;