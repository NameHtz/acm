
mini.SuperGrid = function () {
  mini.SuperGrid.superclass.constructor.call(this);

  this.columns = [];
  this.viewColumns = [];
  this.setData([]);
}
mini.extend(mini.SuperGrid, mini.Control, {
  width: 300,
  height: 150,

  virtualModel: false,
  data: null,

  _rowIdField: "_id",

  editOnDblClick: false,

  multiSelect: false,
  allowRowSelect: true,
  allowCellSelect: true,
  allowAlternating: true,
  allowResizeColumn: true,
  allowMoveColumn: true,
  allowSortColumn: true,
  allowDragDrop: false,
  showDirty: true,

  allowUnselect: false,

  scrollLeft: 0,
  scrollTop: 0,
  scrollWidth: 0,
  scrollHeight: 0,
  headerHeight: 23,
  showHScroll: true,
  showVScroll: true,

  columnWidth: 100,
  rowHeight: 21,
  columnMinWidth: 10,
  columnMaxWidth: 800,

  enterEditAction: "nextrowcell",


  _rowCls: "mini-supergrid-row",
  cellCls: "mini-supergrid-cell",
  _rowSelectedCls: 'mini-supergrid-rowselected',
  cellSelectedCls: 'mini-supergrid-cellselected',
  _alternatingCls: 'mini-supergrid-alternating',

  scrollIntoView: function (record) {
    var list = this.data.getVisibleRows();
    var index = list.indexOf(record);
    var top = index * this.rowHeight;
    this.setScrollTop(top);
  },

  uiCls: "mini-supergrid",
  _create: function () {
    this.el = document.createElement("div");
    this.el.className = "mini-supergrid";

    var s = '<div class="mini-supergrid-border">' +
      '<div class="mini-supergrid-header"></div>' +
      '<div class="mini-supergrid-viewport">' +
      '<div class="mini-supergrid-cells"></div>' +
      '<div class="mini-supergrid-lockedcells"></div>' +
      '<div class="mini-supergrid-tooltip"></div>' +
      '</div>' +
      '<div class="mini-supergrid-hscroller"><div class="mini-supergrid-hscrollercontent"></div></div>' +
      '<div class="mini-supergrid-vscroller"><div class="mini-supergrid-vscrollercontent"></div></div>' +
      '</div>';
    this.el.innerHTML = s;

    this.el.tabIndex = 0;

    this._borderEl = this.el.firstChild;

    this._headerEl = this._borderEl.firstChild;

    this._viewportEl = this._borderEl.childNodes[1];
    this.cellsEl = this._viewportEl.childNodes[0];
    this.lockedcellsEl = this._viewportEl.childNodes[1];

    this.tooltipEl = this._viewportEl.childNodes[2];
    this.tooltipEl.style.display = "none";
    var sf = this;




    this.hscrollerEl = this._borderEl.childNodes[2];
    this.vscrollerEl = this._borderEl.childNodes[3];
    this.hscrollerContentEl = this.hscrollerEl.firstChild;
    this.vscrollerContentEl = this.vscrollerEl.firstChild;


    this._Select = new mini._SuperGridSelect(this);
    this._Splitter = new mini._SuperGridSplitter(this);
    this._ColumnDragger = new mini._SuperGridColumnMove(this);
    this._Sort = new mini._SuperGridSort(this);
    this._DragDrop = new mini._GridDragDrop(this);
  },
  _initEvents: function () {


    mini.on(this.el, 'click', this.__OnClick, this);
    mini.on(this.el, 'dblclick', this.__OnDblClick, this);
    mini.on(this.el, 'mousedown', this.__OnMouseDown, this);
    mini.on(this.el, 'mousewup', this.__OnMouseUp, this);
    mini.on(this.el, 'contextmenu', this.__OnContextMenu, this);
    mini.on(this.el, 'keydown', this.__OnKeyDown, this);

    mini.on(this.el, "mousewheel", this.__OnMousewheel, this);


    mini.on(this.hscrollerEl, "scroll", this.__OnHScroll, this);
    mini.on(this.vscrollerEl, "scroll", this.__OnVScroll, this);


    if (mini.isFirefox) {
      var sf = this;

      function onmouseup() {

        document.onmouseup = null;


        sf.refreshScrollComplete = false;
        sf.setScrollTop(sf.vscrollerEl.scrollTop, true);

        sf.fire("scroll", {
          direction: "vertical"
        });
      }
      this.vscrollerEl.onmousedown = function (e) {
        sf.refreshScrollComplete = true;
        sf.tooltipEl.style.display = "block";
        document.onmouseup = onmouseup;
      }
    } else if (!mini.isOpera) {
      var sf = this;
      function onvscrollmousemove() {

        document.onmousemove = null;


        sf.refreshScrollComplete = false;

        sf.setScrollTop(sf.vscrollerEl.scrollTop, true);
        sf.fire("scroll", {
          direction: "vertical"
        });

      }
      this.vscrollerEl.onmousedown = function (e) {
        sf.refreshScrollComplete = true;
        sf.tooltipEl.style.display = "block";
        document.onmousemove = onvscrollmousemove;
      }
    }
  },
  doLayout: function () {
    if (!this.canLayout()) return;



    var h = this.getHeight(true);
    var w = this.getWidth(true);


    mini.setHeight(this._headerEl, this.headerHeight);

    var vh = this.getViewportHeight();
    mini.setHeight(this._viewportEl, vh);

    this.viewportWidth = this.getViewportWidth();
    this.viewportHeight = this.getViewportHeight();




    if (this.showHScroll) {
      this.hscrollerEl.style.bottom = 0;
    } else {
      this.hscrollerEl.style.bottom = '-2000px';
    }
    if (this.showVScroll) {
      this.vscrollerEl.style.right = 0;
    } else {
      this.vscrollerEl.style.right = '-2000px';
    }

    this.vscrollerEl.style.top = this.getHeaderHeight() + "px";
    this.vscrollerEl.style.height = this.getVScrollHeight() + "px";
    this.hscrollerEl.style.width = this.getHScrollWidth() + "px";

    var scrollWidth = this.getViewScrollWidth();

    this.hscrollerContentEl.style.width = scrollWidth + "px";
    this.vscrollerContentEl.style.height = this.scrollHeight + "px";

    this.cellsEl.style.width = this.viewportWidth + "px";
    this.cellsEl.style.height = this.viewportHeight + "px";

    this.scrollLeft = this.hscrollerEl.scrollLeft;
    this.scrollTop = this.vscrollerEl.scrollTop;
    var vwidth = this.getHScrollWidth();
    if (this.scrollLeft > this.scrollWidth - vwidth) this.scrollLeft = this.scrollWidth - vwidth;



    var aw = this.getAllFrozenColumnWidth();
    this.cellsEl.style.left = aw + "px";
    this.lockedcellsEl.style.width = aw + "px";
    this.lockedcellsEl.style.height = this.viewportHeight + "px";

    this._refreshViewport(true);




  },

  setScrollLeft: function (value) {
    if (value < 0) value = 0;
    if (value > this.scrollWidth) value = this.scrollWidth;
    if (this.scrollLeft != value) {

      this.allowScroll = false;
      this.hscrollerEl.scrollLeft = value;

      this.scrollLeft = this.hscrollerEl.scrollLeft;

      this.allowScroll = true;


      this.inMaxLeft = (this.scrollLeft + parseInt(this.hscrollerEl.style.width)) == this.scrollWidth;


      this._refreshViewport();

    }
  },
  setScrollTop: function (value, must) {
    if (value < 0) value = 0;
    if (value > this.scrollHeight) value = this.scrollHeight;
    if (this.scrollTop != value || must === true) {
      this.scrollTop = value;

      this.allowScroll = false;
      this.vscrollerEl.scrollTop = value;
      if (this.isDisplay() && this.vscrollerEl.style.display != "none") {
        this.scrollTop = this.vscrollerEl.scrollTop;
      }
      this.allowScroll = true;

      this.inMaxTop = (this.scrollTop + parseInt(this.vscrollerEl.style.height)) == this.scrollHeight;


      if (this.virtualModel == false) {
        this._refreshViewport();
      }
    }
    this.tooltipEl.style.display = "none";
  },
  getScrollTop: function () {
    return this.scrollTop;
  },
  getScrollLeft: function () {
    return this.scrollLeft;
  },
  setScrollHeight: function (value) {
    value = parseInt(value);
    if (isNaN(value)) value = 0;
    if (this.scrollHeight != value) {
      this.scrollHeight = value;
      this.layoutChanged();
    }
  },
  setShowHScroll: function (value) {
    if (this.showHScroll != value) {
      this.showHScroll = value;
      this.layoutChanged();
    }
  },
  setShowVScroll: function (value) {
    if (this.showVScroll != value) {
      this.showVScroll = value;
      this.layoutChanged();
    }
  },

  setData: function (data) {
    if (this.data == data) return;
    if (typeof data == "string") {
      data = mini.get(data);
    }
    if (!data) data = [];

    data = this._getSource(data);

    if (this.data) this._unbindSource();
    if (this.data) this.data.destroy();
    this.data = data;
    this._bindSource();

    this.fire('datachanged');

    this.__OnDataChanged();
  },
  getVisibleRows: function () {
    return this.data.getVisibleRows();
  },
  _getSource: function (data) {
    if (!mini.isArray(data)) return data;
    var dataTable = new mini.DataTable();
    dataTable.loadData(data);
    return dataTable;
  },
  _bindSource: function () {
    this.data.on('datachanged', this.__OnDataChanged, this);
    this.data.on('SelectionChanged', this.__OnDataSelectionChanged, this);
    this.data.setMultiSelect(this.multiSelect);

    this.data.on('collapse', this.__OnTreeCollapse, this);
    this.data.on('expand', this.__OnTreeExpand, this);
  },
  _unbindSource: function () {
    this.data.un('datachanged', this.__OnDataChanged, this);
    this.data.un('SelectionChanged', this.__OnDataSelectionChanged, this);

    this.data.un('collapse', this.__OnTreeCollapse, this);
    this.data.un('expand', this.__OnTreeExpand, this);
  },

  __OnDataChanged: function (e) {

    if (this._commitEditing !== true) {

      this.cancelEdit();
    }


    var data = this.getVisibleRows();
    var scrollHeight = 0;
    for (var i = 0, l = data.length; i < l; i++) {
      var r = data[i];
      var h = parseInt(mini.isNull(r._height) ? this.rowHeight : r._height);
      if (isNaN(h)) h = this.rowHeight;
      scrollHeight += h;
    }
    if (this.virtualModel == false) {
      this.scrollHeight = scrollHeight;
    }


    this.vscrollerContentEl.style.height = this.scrollHeight + "px";


    this._refreshViewport(true);

  },
  __OnDataSelectionChanged: function (e) {
    var data = this.getVisibleRows();
    if (!this.viewRegion) return;

    var views = {};
    for (var i = this.viewRegion.startRow, l = this.viewRegion.endRow; i <= l; i++) {
      var record = data[i];
      if (!record) continue;
      views[record._id] = record;
    }

    var grid = this;
    var removes = [];

    var dataSource = this.data;
    var rows = e.records;
    for (var i = 0, l = rows.length; i < l; i++) {
      var record = rows[i];
      if (!views[record._id]) {
        continue;
      }





      if (e.select) {
        this.addRowCls(record, this._rowSelectedCls);
      } else {


        this.removeRowCls(record, this._rowSelectedCls);
      }

    }








    this.fire("selectionchanged", e);
    var e = {
      sender: this,
      selecteds: this.getSelecteds(),
      selected: this.getSelected()
    };
    var bottomColumns = this.columns;
    for (var i = 0, l = bottomColumns.length; i < l; i++) {
      var column = bottomColumns[i];
      if (column.onselectionchanged) {

        column.onselectionchanged.call(this, e);
      }
    }
  },
  refresh: function () {

    this.scrollWidth = this.getAllColumnWidth();


    this.doLayout();
  },
  _createHeaderCell: function (col) {
    var s = col.header;
    if (typeof s == "function") s = s.call(this, col);
    if (mini.isNull(s)) {
      s = '&nbsp;';
    }
    return s;
  },
  _refreshHeader: function () {
    var sb = [];
    var columns = this.viewColumns;
    var left = 0;

    var region = this.viewRegion;
    var startRow = region.startRow, endRow = region.endRow,
      startColumn = region.startColumn, endColumn = region.endColumn;

    var grid = this;

    var boxModel = jQuery.boxModel;

    function drawColumn(column, index) {
      var width = column.width;
      sb[sb.length] = '<div id="';
      sb[sb.length] = column._id;
      sb[sb.length] = '" class="mini-supergrid-headercell ';
      if (column.headerCls) sb[sb.length] = column.headerCls;

      if (index == this.frozenEndColumn) {
        sb[sb.length] = "mini-supergrid-frozenCell ";
      }

      sb[sb.length] = '" style="left:';
      sb[sb.length] = left;
      sb[sb.length] = 'px;width:';
      sb[sb.length] = boxModel ? width - 1 : width;
      sb[sb.length] = 'px;height:';
      sb[sb.length] = boxModel ? this.headerHeight - 1 : this.headerHeight;

      sb[sb.length] = 'px;';

      if (column.headerAlign) {
        sb[sb.length] = "text-align:"
        sb[sb.length] = column.headerAlign || "left";
        sb[sb.length] = ";";
      }
      if (column.headerStyle) sb[sb.length] = column.headerStyle;

      sb[sb.length] = '"><div class="mini-supergrid-headercell-inner" style="line-height:' + (this.headerHeight) + 'px;">';
      sb[sb.length] = this._createHeaderCell(column);
      sb[sb.length] = '</div></div>';

      left += width;


      if (this.allowResizeColumn && column.allowResize) {
        sb[sb.length] = '<div cid="';
        sb[sb.length] = column._id;
        sb[sb.length] = '" class="mini-supergrid-splitter" style="left:';
        sb[sb.length] = left - 3;
        sb[sb.length] = 'px;height:';
        sb[sb.length] = this.headerHeight;
        sb[sb.length] = 'px;top:0px;"></div>';
      }
    }


    if (this.isFrozen()) {
      for (var i = this.frozenStartColumn, l = this.frozenEndColumn; i <= l; i++) {
        var column = columns[i];
        if (column) {
          drawColumn.call(this, column, i);
        }
      }

    }
    var append = false;
    for (var i = startColumn, l = endColumn; i <= l; i++) {
      var column = columns[i];
      if (column) {
        append = true;
        drawColumn.call(this, column, i);
      }
    }

    if (append) {
      sb[sb.length] = '<div class="mini-supergrid-headercell" style="left:' + left + 'px;width:500px;height:' + this.headerHeight + 'px;"></div>';
    }
    this._headerEl.innerHTML = sb.join("");
  },
  _refreshViewport: function (must) {

    if (this.refreshTimer) clearTimeout(this.refreshTimer);
    var sf = this;
    this.refreshTimer = setTimeout(function () {
      sf._doRefreshViewport(must);
    }, 1);
  },
  _doRefreshViewport: function (must) {

    var rowHeight = this.rowHeight, columnWidth = this.columnWidth;
    var data = this.getVisibleRows();
    var columns = this.viewColumns;
    var dataSource = this.data;


    var region = this.markRegion();
    this.viewRegion = region;



    if (this._lastRegion && must === false) {
      if (this._lastRegion.startRow == region.startRow
        && this._lastRegion.endRow == region.endRow
        && this._lastRegion.startColumn == region.startColumn
        && this._lastRegion.endColumn == region.endColumn
      ) {
        return;
      }
    }

    this._lastRegion = region;


    this._refreshHeader();


    var startRow = region.startRow, endRow = region.endRow,
      startColumn = region.startColumn, endColumn = region.endColumn;

    var currentRecord = this.currentCell ? this.currentCell.record : null;
    var currentColumn = this.currentCell ? this.currentCell.column : null;

    var boxModel = jQuery.boxModel;


    function drawRows(startColumn, endColumn, isFrozen) {
      var sb = [];
      var top = 0;
      for (var i = startRow, l = endRow; i <= l; i++) {
        var record = data[i];
        if (!record) continue;
        var h = record._height ? record._height : rowHeight;

        var rowClsIndex = -1;
        var rowCls = " ";
        var rowStyleIndex = -1;
        var rowStyle = " ";

        var cls = "mini-supergrid-row";
        if (this.allowAlternating && i % 2 == 1) {
          cls += " " + this._alternatingCls;
        }

        var isSelected = dataSource.isSelected(record);
        if (isSelected) cls += " " + this._rowSelectedCls;

        sb[sb.length] = '<div id="';
        sb[sb.length] = this._createRowId(record, isFrozen);
        sb[sb.length] = '" class="';
        sb[sb.length] = cls;
        sb[sb.length] = ' ';

        rowClsIndex = sb.length;
        sb[rowClsIndex] = rowCls;

        sb[sb.length] = '" style="top:';
        sb[sb.length] = top;
        sb[sb.length] = 'px;height:';
        sb[sb.length] = h;
        sb[sb.length] = 'px;';

        rowStyleIndex = sb.length;
        sb[rowStyleIndex] = rowStyle;

        sb[sb.length] = '">';

        var left = 0;
        for (var j = startColumn, k = endColumn; j <= k; j++) {
          var column = columns[j];
          if (!column) continue;
          var w = column.width;

          var e = this._OnDrawCell(record, column, i, j);

          sb[sb.length] = '<div  id="';
          sb[sb.length] = this._createCellId(record, column);
          sb[sb.length] = '" class="mini-supergrid-cell ';

          if (isFrozen && j == this.frozenEndColumn) {
            sb[sb.length] = "mini-supergrid-frozenCell ";
          }

          var dirty = this.showDirty ? dataSource.isModified(record, column.field) : false;
          if (dirty) {
            sb[sb.length] = "mini-supergrid-cell-dirty ";
          }

          if (currentRecord == record && currentColumn == column) {
            sb[sb.length] = this.cellSelectedCls + " ";
          }
          if (e.cellCls) sb[sb.length] = e.cellCls;
          sb[sb.length] = '" style="left:';
          sb[sb.length] = left;
          sb[sb.length] = 'px;width:';
          sb[sb.length] = boxModel ? w - 1 : w;
          sb[sb.length] = 'px;height:';
          sb[sb.length] = boxModel ? h - 1 : h;
          sb[sb.length] = 'px;';

          if (column.align) {
            sb[sb.length] = "text-align:"
            sb[sb.length] = column.align || "left";
            sb[sb.length] = ";";
          }
          if (e.cellStyle) sb[sb.length] = e.cellStyle;

          sb[sb.length] = '"><div class="mini-supergrid-cell-inner" >';

          sb[sb.length] = e.cellHtml;

          if (dataSource.isModified(record, column.field)) {
            sb[sb.length] = '</div><div class="mini-supergrid-cell-dirtytip"></div></div>';
          } else {
            sb[sb.length] = '</div></div>';
          }

          left += w;

          if (e.rowCls !== null) {
            rowCls = e.rowCls;
          }
          if (e.rowStyle !== null) {
            rowStyle = e.rowStyle;
          }
        }

        if (record._cls) rowCls += " " + record._cls;
        sb[rowClsIndex] = rowCls;
        sb[rowStyleIndex] = rowStyle;

        sb[sb.length] = '</div>';

        top += h;

      }
      return sb;
    }


    var x = this.scrollLeft, y = this.scrollTop;




    var sb = drawRows.call(this, startColumn, endColumn);
    this.cellsEl.innerHTML = sb.join("");


    var sb = drawRows.call(this, this.frozenStartColumn, this.frozenEndColumn, true);
    this.lockedcellsEl.innerHTML = sb.join("");



    var oldEl = this.cellsEl;

















  },
  getHeaderHeight: function () {
    return mini.getHeight(this._headerEl);

  },
  getViewportHeight: function () {
    var h = this.getHeight(true) - this.getHeaderHeight();
    return h >= 0 ? h : 0;
  },
  getViewportWidth: function () {
    var v = this.getWidth(true);
    return v >= 0 ? v : 0;
  },
  getViewportBox: function () {
    return mini.getBox(this._viewportEl);
  },
  getHScrollWidth: function () {
    this.viewportWidth = this.getViewportWidth();
    var vwidth = this.viewportWidth
    if (this.showVScroll) vwidth -= 18;
    if (vwidth < 0) vwidth = 0;
    return vwidth;
  },
  getVScrollHeight: function () {
    this.viewportHeight = this.getViewportHeight();
    var vheight = this.viewportHeight;
    if (this.showHScroll) vheight -= 18;
    if (vheight < 0) vheight = 0;
    return vheight;
  },
  markRegion: function () {
    var x = this.scrollLeft, y = this.scrollTop;



    if (this.viewportWidth == null) {
      this.viewportWidth = this.getViewportWidth();
      this.viewportHeight = this.getViewportHeight();
    }
    var width = this.viewportWidth - this.getAllFrozenColumnWidth(), height = this.viewportHeight;
    var bottom = y + height, right = x + width;

    var rowHeight = this.rowHeight, columnWidth = this.columnWidth;
    var data = this.getVisibleRows();
    var columns = this.viewColumns;

    var startRow = 0, endRow = 0, startColumn = 0, endColumn = 0;


    var top = 0;
    var yOffset = 0;
    for (var i = 0, l = data.length; i < l; i++) {
      var r = data[i];
      var h = r._height ? r._height : rowHeight;
      top += h;
      if (top >= y) {
        startRow = i;
        yOffset = top - h;

        break;
      }
    }


    for (var i = startRow, l = data.length; i < l; i++) {
      var r = data[i];
      var h = r._height ? r._height : rowHeight;
      if (top > bottom) {
        endRow = i;
        break;
      }
      top += h;
    }
    if (endRow == 0) endRow = data.length - 1;


    var xOffset = 0;



    var left = 0;
    var _start = 0;
    if (this.isFrozen()) _start = this.frozenEndColumn + 1;
    for (var i = _start, l = columns.length; i < l; i++) {
      var column = columns[i];
      var w = column.width;
      left += w;
      if (left >= x) {
        startColumn = i;
        xOffset = left - w;
        left -= w;
        break;
      }
    }



    for (var i = startColumn, l = columns.length; i < l; i++) {
      var column = columns[i];
      var w = column.width;
      left += w;
      if (left >= right) {
        endColumn = i;
        break;
      }

    }

    if (endColumn == 0) endColumn = columns.length - 1;

    var region = {
      startRow: startRow,
      endRow: endRow,
      startColumn: startColumn,
      endColumn: endColumn,
      xOffset: xOffset,
      yOffset: yOffset
    };

    if (this.inMaxLeft) {
      var startColumn = region.startColumn;
      var count = columns.length - region.endColumn;
      region.startColumn += count;
      region.endColumn += count;

      for (var i = startColumn, l = region.startColumn; i < l; i++) {
        var column = columns[i];
        var w = column.width;
        region.xOffset += w;
      }
    }
    if (this.inMaxTop) {
      var startRow = region.startRow;
      var count = data.length - region.endRow;
      region.startRow += count;
      region.endRow += count;

      for (var i = startRow, l = region.startRow; i < l; i++) {
        var r = data[i];
        if (r) {
          var h = r._height ? r._height : rowHeight;
          region.yOffset += h;
        }
      }
    }


    return region;
  },
  getRecord: function (id) {
    if (typeof id == "object") return id;
    if (mini.isNumber(id)) {
      return this.data.getAt(id);
    }
    return this.data.getby_id(id);
  },
  getRowHeight: function (row) {
    if (mini.isNumber(row)) row = this.data.getAt(row);
    return mini.isNumber(row.__height) ? row.__height : this.rowHeight;
  },
  getRowBox: function (rowIndex) {
    var data = this.getVisibleRows();
    if (!mini.isNumber(rowIndex)) rowIndex = data.indexOf(rowIndex);

    var rowHeight = this.rowHeight, columnWidth = this.columnWidth;

    var columns = this.viewColumns;

    var top = 0, height = 0;
    for (var i = 0, l = rowIndex; i <= l; i++) {
      var r = data[i];
      var h = r._height ? r._height : rowHeight;
      top += h;
      if (i == l) {
        top -= h;
        height = h;
      }
    }
    top -= this.viewRegion.yOffset;

    var box = this.getViewportBox();
    box.height = height;
    box.y += top;
    box.bottom = box.y + box.height;
    return box;
  },
  getColumnBox: function (columnIndex) {
    if (!mini.isNumber(columnIndex)) columnIndex = this.viewColumns.indexOf(columnIndex);

    var rowHeight = this.rowHeight, columnWidth = this.columnWidth;

    var columns = this.viewColumns;

    var left = 0, width = 0;
    var left = 0;
    for (var i = 0, l = columnIndex; i <= l; i++) {
      var column = columns[i];
      var w = column.width;
      left += w;
      if (i == l) {
        left -= w;
        width = w;
      }
    }
    left -= this.viewRegion.xOffset;

    if (this.isFrozen()) {
      if (this.frozenStartColumn <= columnIndex && columnIndex <= this.frozenEndColumn) {
        var left = 0, width = 0;
        var left = 0;
        for (var i = this.frozenStartColumn, l = columnIndex; i <= l; i++) {
          var column = columns[i];
          var w = column.width;
          left += w;
          if (i == l) {
            left -= w;
            width = w;
          }
        }
      } else if (columnIndex > this.frozenEndColumn) {
        var w = this.getColumnsWidth(0, this.frozenStartColumn - 1);
        left -= w;
      }
    }

    var box = this.getBox(true);
    box.width = width;
    box.x += left;
    box.right = box.x + box.width;

    box.height = this.getHeaderHeight();
    box.bottom = box.y + box.height;

    return box;
  },
  getCellBox: function (record, column) {
    var rowBox = this.getRowBox(record);
    var columnBox = this.getColumnBox(column);
    var box = {
      x: columnBox.x,
      y: rowBox.y,
      width: columnBox.width,
      height: rowBox.height
    };
    box.right = box.x + box.width;
    box.bottom = box.y + box.height;
    return box;
  },

  _frozenCellCls: "mini-supergrid-frozenCell",
  frozenStartColumn: -1,
  frozenEndColumn: -1,
  isFrozen: function () {
    return this.frozenStartColumn >= 0 && this.frozenEndColumn >= this.frozenStartColumn;
  },
  frozenColumn: function (startColumn, endColumn) {
    if (typeof startColumn == "object") startColumn = this.viewColumns.indexOf(startColumn);
    if (typeof endColumn == "object") endColumn = this.viewColumns.indexOf(endColumn);
    if (!mini.isNumber(startColumn) || !mini.isNumber(endColumn) || startColumn == -1 || endColumn == -1) return;
    if (startColumn > endColumn) {
      var t = startColumn;
      startColumn = endColumn;
      endColumn = t;
    }
    this.frozenStartColumn = startColumn;
    this.frozenEndColumn = endColumn;
    this.setColumns(this.columns);
  },
  unfrozenColumn: function () {
    this.frozenStartColumn = this.frozenEndColumn = -1;
    this.setColumns(this.columns);
  },
  getAllFrozenColumnWidth: function () {
    var w = 0;
    var columns = this.getViewColumns();
    for (var i = this.frozenStartColumn; i <= this.frozenEndColumn; i++) {
      var c = columns[i];
      if (c) {
        w += c.width;
      }
    }
    return w;
  },
  getColumnsWidth: function (start, end) {
    var w = 0;
    var columns = this.getViewColumns();
    for (var i = start; i <= end; i++) {
      var c = columns[i];
      if (c) {
        w += c.width;
      }
    }
    return w;
  },
  getViewScrollWidth: function () {
    var scrollWidth = this.scrollWidth;




    return scrollWidth;
  },

  _vscrollTimer: null,
  _hscrollTimer: null,
  __OnVScroll: function (e) {

    if (this.allowScroll === false) return;

    this.scrollTop = this.vscrollerEl.scrollTop;


    var sf = this;
    if (!this.tooltipShowTimer) {
      this.tooltipShowTimer = setTimeout(function () {
        var region = sf.markRegion();

        sf.tooltipEl.innerHTML = "行号：" + (region.startRow + 1);
        sf.tooltipShowTimer = null;
      }, 30);
    }
















  },
  __OnHScroll: function (e) {
    if (this.allowScroll === false) return;
    this._scrollLeft = this.hscrollerEl.scrollLeft;
    this._scrollTop = this.vscrollerEl.scrollTop;

    var sf = this;
    if (this._hscrollTimer) return;
    this._hscrollTimer = setTimeout(function () {
      sf.setScrollLeft(sf._scrollLeft);
      sf._hscrollTimer = null;

      sf.fire("scroll", {
        direction: "horizontal"
      });
    }, 25);
  },
  __OnMousewheel: function (e, delta) {
    var oe = e;
    var e = e.wheelDelta ? e : e.originalEvent;

    var wheelDelta = e.wheelDelta || -e.detail * 24;
    var top = this.scrollTop;

    this.endEdit();

    top -= wheelDelta;
    this.setScrollTop(top);

    this.fire("scroll", {
      direction: "vertical"
    });


    if (top == this.vscrollerEl.scrollTop) {
      oe.preventDefault();
    } else {

    }
  },

  setHeaderHeight: function (value) {
    this.headerHeight = value;
    mini.setHeight(this._headerEl, value);
    this.layoutChanged();
  },

  __OnClick: function (e) {
    this._fireChildEvent(e, 'Click');
  },
  __OnDblClick: function (e) {
    this._fireChildEvent(e, 'Dblclick');
  },
  __OnMouseDown: function (e) {
    this._fireChildEvent(e, 'MouseDown');
  },
  __OnMouseUp: function (e) {
    this._fireChildEvent(e, 'MouseUp');
  },
  __OnContextMenu: function (e) {
    this._fireChildEvent(e, 'ContextMenu');
  },
  __OnKeyDown: function (e) {
    this._fireChildEvent(e, 'KeyDown');
  },


  getAttrs: function (el) {

    var attrs = mini.SuperGrid.superclass.getAttrs.call(this, el);

    var cs = mini.getChildNodes(el);
    for (var i = 0, l = cs.length; i < l; i++) {
      var node = cs[i];
      var property = jQuery(node).attr("property");
      if (!property) continue;
      property = property.toLowerCase();
      if (property == "columns") {
        attrs.columns = mini._ParseColumns(node);
      } else if (property == "data") {
        attrs.data = node.innerHTML;
      }
    }
























    return attrs;
  }
});



mini._SuperDataTableApplys = {
  clear: function () {
    this.data.clear();
  },
  loadData: function (data) {
    this.setData(data);
  },
  getCount: function () {
    return this.data.getCount();
  },
  getChanges: function () {
    return this.data.getChanges();
  },
  getData: function () {
    return this.data.toArray();
  },
  toArray: function () {
    return this.data.toArray();
  },
  getRows: function () {
    return this.data.toArray();
  },
  updateRow: function (record, field, value) {
    this.data.updateRecord(record, field, value);
  },
  addRow: function (record) {
    return this.data.add(record);
  },
  insertRow: function (index, record) {
    return this.data.insert(index, record);
  },
  removeRow: function (record) {
    return this.data.remove(record);
  },
  removeRowAt: function (index) {
    return this.data.removeAt(index);
  },
  moveRow: function (row, index) {
    this.data.move(row, index);
  },
  indexOf: function (record) {
    return this.data.indexOf(record);
  },
  getAt: function (index) {
    return this.data.getAt(index);
  },
  findRows: function (field, value) {
    return this.findRecords(field, value);
  },
  findRecords: function (field, value) {
    return this.data.findRecords(field, value);
  },
  removeSelected: function (select) {
    var row = this.getSelected();
    var index = this.indexOf(row);
    this.removeRow(row);
    if (select !== false) {
      row = this.getAt(index);
      this.select(row ? index : index - 1);
    }
  },
  getSelected: function () {
    return this.data.getSelected();
  },
  getSelecteds: function () {
    return this.data.getSelecteds();
  },
  select: function (record) {
    this.data.select(record);
  },
  selects: function (records) {
    this.data.selects(records);
  },
  deselect: function (record) {
    this.data.deselect(record);
  },
  deselects: function (records) {
    this.data.deselects(records);
  },
  selectAll: function () {
    this.data.selectAll();
  },
  deselectAll: function () {
    this.data.deselectAll();
  },
  isSelected: function (record) {
    return this.data.isSelected(record);
  },
  getRange: function (start, end) {
    if (mini.isNull(start) || mini.isNull(end)) return;
    return this.data.getRange(start, end);
  },
  selectRange: function (start, end) {
    this.data.selectRange(start, end);
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


mini.copyTo(mini.SuperGrid.prototype, mini._SuperDataTableApplys);


mini.regClass(mini.SuperGrid, "supergrid");


mini.GridColumnModel = {

  addColumn: function (column, index, targetColumn) {
    if (!column) return;
    targetColumn = this.getColumn(targetColumn);
    if (!targetColumn) {
      targetColumn = this;
      if (typeof action == "string") action = "append";
    }
    if (mini.isNull(index) || index < 0) index = 1000;

    switch (index) {
      case "before":
        parentColumn = this.getParentColumn(targetColumn);
        index = parentColumn.columns.indexOf(targetColumn);
        parentColumn.columns.insert(index, column);
        break;
      case "after":
        parentColumn = this.getParentColumn(targetColumn);
        index = parentColumn.columns.indexOf(targetColumn);
        parentColumn.columns.insert(index + 1, column);
        break;
      case "append":
      case "add":
        if (!targetColumn.columns) targetColumn.columns = [];
        targetColumn.columns.push(column);
        break;
      default:
        if (mini.isNumber(index)) {
          if (!targetColumn.columns) targetColumn.columns = [];
          targetColumn.columns.insert(index, column);
        }
        break;
    }
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
  updateColumn: function (column, options) {
    column = this.getColumn(column);
    mini.copyTo(column, options);
    this.setColumns(this.columns);
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
  getColumn: function (name) {
    if (typeof name == "object") return name;
    var column = this._nameColumns[name];
    if (!column) column = this._idColumns[name];
    return column;
  },
  getParentColumn: function (column) {
    column = this.getColumn(column);
    var pcolumn = column ? this._idColumns[column._pid] : null;
    if (column && !pcolumn) pcolumn = this;
    return pcolumn;
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


  getViewColumns: function () {
    return this.viewColumns;
  },

  getColumns: function (pcolumn) {
    pcolumn = this.getColumn(pcolumn);
    if (!pcolumn) pcolumn = this;
    return pcolumn.columns;
  },
  isVisibleColumn: function (column) {
    column = this.getColumn(column);
    if (!column.visible) return false;
    var pcolumn = this.getParentColumn(column);
    if (pcolumn == this) return true;
    return this.isVisibleColumn(pcolumn);
  },
  getDisplayColumns: function (pcolumn) {
    pcolumn = this.getColumn(pcolumn);
    if (!pcolumn) pcolumn = this;
    return pcolumn.displayColumns || [];
  },
  eachColumns: function (column, fn, scope) {
    var columns = this.getColumns(column);
    if (columns) {
      var list = columns.clone();
      for (var i = 0, l = list.length; i < l; i++) {
        var o = list[i];
        if (fn.call(scope, o, i, column) === false) break;
      }
    }
  },
  eachDisplayColumns: function (column, fn, scope) {
    var columns = this.getDisplayColumns(column);
    if (columns) {
      var list = columns.clone();
      for (var i = 0, l = list.length; i < l; i++) {
        var o = list[i];
        if (fn.call(scope, o, i, column) === false) break;
      }
    }
  },
  _columnId: 0,

  setColumns: function (columns) {
    if (!mini.isArray(columns)) columns = [];
    this.columns = columns;

    this.displayColumns = [];
    this.viewColumns = [];
    this._idColumns = {};
    this._nameColumns = {};

    var maxLevel = 0;
    var level = 0;
    function init(column, index, pcolumn) {

      this._initColumn(column);

      column.__id = this._columnId++;
      column._id = this.id + "$column$" + column.__id;
      column._pid = pcolumn._id;


      var cname = column.name
      if (cname) {
        this._nameColumns[cname] = column;
      }

      this._idColumns[column._id] = column;

      column.level = level;
      level += 1;
      this.eachColumns(column, init, this);
      level -= 1;


      column.displayColumns = (column.columns || []).clone();
      for (var i = column.displayColumns.length - 1; i >= 0; i--) {
        var c = column.displayColumns[i];
        if (c.visible == false) {
          column.displayColumns.removeAt(i);
        }
      }


      if (column.displayColumns.length == 0 && this.isVisibleColumn(column)) {
        this.viewColumns.push(column);

      }

      if (column.level > maxLevel) maxLevel = column.level;
    }
    this.eachColumns(this, init, this);


    this.displayColumns = columns.clone();
    for (var i = this.displayColumns.length - 1; i >= 0; i--) {
      var c = this.displayColumns[i];
      if (c.visible == false) {
        this.displayColumns.removeAt(i);
      }
    }



    this.maxColumnLevel = maxLevel;

    this.refresh();
  },
  _initColumn: function (column) {
    column._gridUID = this.uid;
    column._rowIdField = this._rowIdField;
    if (column.type && column.inited != true) {
      column.typeInited = true;

      var col = mini._getColumn(column.type);
      var _column = mini.copyTo({}, column);
      mini.copyTo(column, col);
      mini.copyTo(column, _column);
    }

    column.width = parseInt(column.width)
    if (mini.isNull(column.width) || isNaN(column.width)) column.width = this.columnWidth;

    column.visible = column.visible !== false;
    column.allowResize = column.allowResize !== false;
    column.allowMove = column.allowMove !== false;
    column.allowSort = column.allowSort === true;
    column.allowDrag = !!column.allowDrag;
    column.readOnly = !!column.readOnly;



    if (column.editor) {
      if (typeof column.editor == "string") {
        var cls = mini.getClass(column.editor);
        if (cls) {
          column.editor = { type: column.editor };
        } else {
          column.editor = eval('(' + column.editor + ')');
        }
      }

      if (column.editor && !mini.isControl(column.editor)) {
        column.editor = mini.create(column.editor);
      }
    }

    if (column.editor) {
      column.editor.setVisible(false);
    }

    if (typeof column.init == "function" && column.inited != true) {
      column.init(this);
    }

    delete column.colspan;
    delete column.rowspan;

    column.inited = true;
  },

  getDisplayColumnRows: function () {
    var maxLevel = this.getMaxColumnLevel();

    var dcs = [];
    for (var i = 0, l = maxLevel; i <= l; i++) {
      dcs.push([]);
    }

    function getColSpan(col) {
      var subColumns = mini.treeToArray(col.displayColumns, "displayColumns");
      var colSpan = 0;
      for (var i = 0, l = subColumns.length; i < l; i++) {
        var c = subColumns[i];
        if (c.displayColumns.length == 0) {
          colSpan += 1;
        }
      }
      return colSpan;
    }

    var list = mini.treeToArray(this.displayColumns, "displayColumns");

    for (var i = 0, l = list.length; i < l; i++) {
      var column = list[i];
      var cols = dcs[column.level];

      if (column.displayColumns.length > 0) {
        column.colspan = getColSpan(column);
      }
      if (column.displayColumns.length == 0 && column.level < maxLevel) {
        column.rowspan = maxLevel - column.level + 1;
      }

      cols.push(column);
    }

    return dcs;
  },
  getMaxColumnLevel: function () {
    return this.maxColumnLevel;
  },
  getAllColumnWidth: function () {
    var columns = this.getViewColumns();
    var all = 0;
    var columnWidth = this.columnWidth;
    for (var i = 0, l = columns.length; i < l; i++) {
      var col = columns[i];
      var w = mini.isNull(col.width) ? columnWidth : col.width;
      all += w;
    }
    return all;
  }
};

mini.copyTo(mini.SuperGrid.prototype, mini.GridColumnModel);





mini.GridCellEditModel = {
  addRowCls: function (record, cls) {

    record = this.getRecord(record);
    if (!record) return;


    var rowEl = this._getRowEl(record);
    if (rowEl) mini.addClass(rowEl, cls);

    var rowEl = this._getRowEl(record, true);
    if (rowEl) mini.addClass(rowEl, cls);
  },
  removeRowCls: function (record, cls) {

    record = this.getRecord(record);
    if (!record) return;
    if (record._cls == cls) delete record._cls;
    var rowEl = this._getRowEl(record);
    if (rowEl) mini.removeClass(rowEl, cls);

    var rowEl = this._getRowEl(record, true);
    if (rowEl) mini.removeClass(rowEl, cls);
  },
  _createRowId: function (record, isFrozen) {
    var id = typeof record == "string" ? record : record._id;
    if (isFrozen) return this.id + "$locked$" + id;
    return this.id + "$" + id;
  },
  _createCellId: function (record, column) {
    return this.id + "$" + record._id + "$" + column.__id;
  },
  _getRowEl: function (row, isFrozen) {
    if (!row) return null;
    var id = this._createRowId(row, isFrozen);
    return document.getElementById(id);
  },
  _getHeaderCellEl: function (column) {
    return document.getElementById(column._id);
  },
  _getCellEl: function (record, column) {
    column = this.getColumn(column);
    if (!column) return null;
    var id = this._createCellId(record, column);
    return document.getElementById(id);
  },
  _getRecordByEvent: function (e) {
    var t = mini.findParent(e.target, this._rowCls);
    if (!t) return null;
    var ids = t.id.split("$");
    var rid = ids[ids.length - 1];
    return this.data.getby_id(rid);
  },
  _getColumnByEvent: function (e) {
    var t = mini.findParent(e.target, this.cellCls);
    if (t) {
      var ids = t.id.split("$");
      var column__id = parseInt(ids[ids.length - 1]);
      var column_id = this.id + "$column$" + column__id;
      return this.getColumn(column_id);
    } else {
      t = mini.findParent(e.target, "mini-supergrid-headercell");
      if (t) {
        return this.getColumn(t.id);
      }
    }
    return null;
  },
  _getCellByEvent: function (e) {
    var record = this._getRecordByEvent(e);
    var column = this._getColumnByEvent(e);
    return {
      record: record,
      column: column
    };
  },
  _fireChildEvent: function (e, name) {
    if (this.disabled) return;
    var cell = this._getCellByEvent(e);
    var record = cell.record, column = cell.column;
    if (record) {
      var fn = this['_OnRow' + name];
      if (fn) {
        fn.call(this, record, e);
      } else {
        var eve = {
          record: record,
          htmlEvent: e
        };
        this.fire("row" + name, eve);
      }
    }
    if (column) {
      var fn = this['_OnColumn' + name];
      if (fn) {
        fn.call(this, column, e);
      } else {
        var eve = {
          column: column,
          field: column.field,
          htmlEvent: e
        };
        this.fire("column" + name, eve);
      }
    }

    if (record && column) {
      var fn = this['_OnCell' + name];
      if (fn) {
        fn.call(this, record, column, e);
      } else {
        var eve = {
          record: record,
          column: column,
          field: column.field,
          htmlEvent: e
        };
        this.fire("cell" + name, eve);
      }

    }
    if (!record && column) {
      var fn = this['_OnHeaderCell' + name];
      if (fn) {
        fn.call(this, column, e);
      } else {
        var eve = {
          sender: this,
          column: column,
          htmlEvent: e
        };
        var evName = "onHeaderCell" + name;
        if (column[evName]) {
          eve.sender = this;
          column[evName](eve);
        }

        this.fire("headercell" + name, eve);
      }
    }
  },


  currentCell: null,
  editingCell: null,
  editControl: null,
  editWrap: null,
  _doCurrentCell: function (select) {
    if (this.currentCell) {
      var record = this.currentCell.record, column = this.currentCell.column;
      var cellId = this._createCellId(record, column);
      var cellEl = document.getElementById(cellId);
      if (cellEl) {
        if (select) {
          mini.addClass(cellEl, this.cellSelectedCls);
        } else {
          mini.removeClass(cellEl, this.cellSelectedCls);
        }
      }
    }
  },
  setCurrentCell: function (cell) {
    if (this.currentCell != cell) {
      this._doCurrentCell(false);
      this.currentCell = cell;
      this._doCurrentCell(true);
      this.fire("currentcellchanged");
    }
  },
  getCurrentCell: function () {
    var cc = this.currentCell;
    if (cc) {
      if (!this.data.hasRecord(cc.record)) {
        this.currentCell = null;
        cc = null;
      }
    }
    return cc;
  },
  allowCellEdit: true,
  allowCellSelect: true,
  beginEdit: function (selectAll) {
    if (this.editingCell) this.endEdit();
    var cell = this.getCurrentCell();
    if (cell) {
      var canEdit = this._OnCellBeginEdit(cell.record, cell.column);
      if (canEdit !== false) {
        this.editingCell = cell;
        this._OnCellShowingEdit(cell.record, cell.column);
      }
    }
  },
  commitEdit: function (value) {
    var cell = this.editingCell;
    if (cell) {
      this._commitEditing = true;
      this._OnCellCommitEdit(cell.record, cell.column, value);
      this._commitEditing = false;
    }
  },
  endEdit: function () {
    var cell = this.editingCell;
    if (cell) {
      this.commitEdit();
      this._OnCellEndEdit(cell.record, cell.column);
      this.editingCell = null;
    }
  },
  cancelEdit: function () {
    var cell = this.editingCell;
    if (cell) {
      this._OnCellEndEdit(cell.record, cell.column);
      this.editingCell = null;
    }
  },
  focus: function () {

    var me = this;
    setTimeout(function () {
      try {
        me.el.focus();






      } catch (e) { };
    }, 10);


  },
  getEditWrap: function (box) {
    if (!this.editWrap) {
      this.editWrap = mini.append(document.body, '<div class="mini-supergrid-editwrap" style="position:absolute;"></div>');

      mini.on(this.editWrap, "keydown", this.___OnEditControlKeyDown, this);
    }
    this.editWrap.style.zIndex = 1000000000;
    this.editWrap.style.display = 'block';
    mini.setXY(this.editWrap, box.x, box.y);

    mini.setWidth(this.editWrap, box.width);

    this.editWrap.style.zIndex = mini.getMaxZIndex();

    return this.editWrap;
  },

  _startEditNextRowCell: function (next) {
    var me = this;

    var currentCell = me.getCurrentCell();
    if (!currentCell) return;

    var column = currentCell.column;
    var record = currentCell.record;

    var rowIndex = me.indexOf(record) + (next ? 1 : -1);
    var nextRecord = me.getAt(rowIndex);

    if (this.viewRegion) {
      if (rowIndex < this.viewRegion.startRow || rowIndex >= this.viewRegion.endRow) {
        nextRecord = null;
      }
    }

    if (nextRecord) {
      currentCell = { record: nextRecord, column: column };
      me.setCurrentCell(currentCell);
      me.beginEdit();

      me.data.deselectAll();
      me.data.select(nextRecord);


    }
  },

  _startEditNextColumnCell: function (next) {
    var me = this;

    var currentCell = me.getCurrentCell();
    if (!currentCell) return;

    var column = currentCell.column;
    var record = currentCell.record;

    var columns = me.getViewColumns();
    var columnIndex = columns.indexOf(column) + (next ? 1 : -1);
    var nextColumn = columns[columnIndex];

    if (nextColumn) {
      currentCell = { record: record, column: nextColumn };
      me.setCurrentCell(currentCell);
      me.beginEdit();
    }
  },

  ___OnEditControlKeyDown: function (e) {
    var me = this;

    if (e.keyCode == 13) {
      var cell = this.editingCell;
      if (cell && cell.column && cell.column.enterCommit === false) return;
      this.endEdit();
      this.focus();

      if (me.enterEditAction == "nextrowcell") {
        me._startEditNextRowCell(e.shiftKey == false);
      } else if (me.enterEditAction == "nextcolumncell") {
        me._startEditNextColumnCell(e.shiftKey == false);
      }

    } else if (e.keyCode == 27) {
      this.cancelEdit();
      this.focus();
    } else if (e.keyCode == 9) {
      this.cancelEdit();

      e.preventDefault();
      me._startEditNextColumnCell(e.shiftKey == false);

    }
  },
  __OnBodyMouseDown: function (e) {
    if (this.editingControl) {
      var within = this.editingControl.within(e);
      if (within == false) {
        var sf = this;




        sf.endEdit();


        mini.un(document, 'mousedown', this.__OnBodyMouseDown, this);
      }
    }
  },
  _OnCellBeginEdit: function (record, column) {
    var e = {
      sender: this,
      source: this,
      record: record,
      column: column,
      field: column.field,
      editor: column.editor,
      value: record[column.field],
      cancel: false
    };
    if (column.oncellbeginedit) {
      column.oncellbeginedit(e);
    }
    this.fire("cellbeginedit", e);
    if (e.cancel) {
      return false;
    }

    if (!e.editor) return false;
    var editor = this.editingControl = e.editor;
    if (editor.setValue) {
      editor.setValue(e.value);
    }

    if (column.displayField && editor.setText) {
      var text = record[column.displayField];
      editor.setText(text);
    }

    return true;
  },
  _OnCellShowingEdit: function (record, column) {
    if (!this.editingControl) return false;

    var cellBox = this.getCellBox(record, column);
    var e = {
      sender: this,
      source: this,
      record: record,
      column: column,
      field: column.field,
      cellBox: cellBox,
      editor: this.editingControl
    };
    if (column.oncellshowingedit) {
      column.oncellshowingedit(e);
    }
    this.fire("cellshowingedit", e);

    var editWrap = this.getEditWrap(cellBox);
    var editor = e.editor;
    if (editor.render) {
      editor.render(this.editWrap);
      editor.focus();
      setTimeout(function () {
        editor.focus();
        if (editor.selectText) editor.selectText();
      }, 10);
      editor.setVisible(true);
    } else if (editor.el) {
      this.editWrap.appendChild(editor.el);
      try {
        editor.el.focus();
      } catch (e) {
      }
      setTimeout(function () {
        try {
          editor.el.focus();
        } catch (e) {
        }
      }, 10);
    }

    if (editor.setWidth) {
      var width = cellBox.width;
      if (mini.isNumber(editor.minWidth)) {
        if (width < editor.minWidth) width = editor.minWidth;
      }
      editor.setWidth(width);
    }





    mini.on(document, 'mousedown', this.__OnBodyMouseDown, this);

    if (column.autoShowPopup && editor.showPopup) {

      editor.showPopup();
    }
  },
  _OnCellCommitEdit: function (record, column, value) {

    var e = {
      sender: this,
      source: this,
      record: record,
      column: column,
      field: column.field,
      editor: this.editingControl,
      value: value,
      cancel: false
    };
    if (e.editor && e.editor.getValue && value === undefined) {
      try {
        e.editor.blur();
      } catch (ex) {
        try {
          e.editor.el.blur();
        } catch (e) {

        }
      }
      e.value = e.editor.getValue();
      if (e.editor.getText) {
        e.text = e.editor.getText();
      }
    }
    if (column.oncellcommitedit) {
      column.oncellcommitedit(e);
    }
    this.fire("cellcommitedit", e);
    if (e.cancel == false) {
      if (column.displayField) {
        var o = {};
        o[column.field] = e.value;
        o[column.displayField] = e.text;
        this.data.updateRecord(record, o);
      } else {
        this.data.updateRecord(record, column.field, e.value);
      }
    }
  },
  _OnCellEndEdit: function (record, column) {
    var e = {
      sender: this,
      source: this,
      record: record,
      column: column,
      field: column.field,
      editor: this.editingControl,
      value: record[column.field]
    };
    if (column.oncellendedit) {
      column.oncellendedit(e);
    }
    this.fire("cellendedit", e);
    if (this.editWrap) this.editWrap.style.display = 'none';
    var childNodes = this.editWrap.childNodes;
    for (var i = childNodes.length - 1; i >= 0; i--) {
      var el = childNodes[i];
      this.editWrap.removeChild(el);
    }

    var editor = e.editor;
    if (editor && editor.hidePopup) {
      editor.hidePopup();
    }
    if (editor && editor.clearValue) {
      editor.clearValue();
    }
    this.editingControl = null;
  },

  _OnDrawCell: function (record, column, rowIndex, columnIndex) {
    var value = record[column.field];

    var e = {
      sender: this,
      source: this,
      rowIndex: rowIndex,
      columnIndex: columnIndex,
      record: record,
      column: column,
      field: column.field,
      value: value,
      cellHtml: value,
      rowCls: null,
      cellCls: column.cellCls || '',
      rowStyle: null,
      cellStyle: column.cellStyle || '',
      autoEscape: column.autoEscape
    };

    if (column.dateFormat) {
      if (mini.isDate(e.value)) e.cellHtml = mini.formatDate(value, column.dateFormat);
      else e.cellHtml = "";
    }


    if (column.displayField) {
      e.cellHtml = record[column.displayField];
    }
    if (e.autoEscape == true) {
      e.cellHtml = mini.htmlEncode(e.cellHtml);
    }

    var renderer = column.renderer;
    if (renderer) {
      fn = typeof renderer == "function" ? renderer : window[renderer];
      if (fn) {
        e.cellHtml = fn.call(column, e);
      }
    }
    this.fire("drawcell", e);

    if (e.cellHtml === null || e.cellHtml === undefined) e.cellHtml = "";



    return e;
  },
  setRowHeight: function (value) {


    if (value != this.rowHeight) {
      this.rowHeight = value;
      this.layoutChanged();
    }
  },
























  getMultiSelect: function () {
    return this.multiSelect;
  },
  setMultiSelect: function (value) {
    if (this.multiSelect != value) {
      this.multiSelect = value;
      this.data.setMultiSelect(value);
      this.layoutChanged();
    }
  },
  setAllowUnselect: function (value) {
    this.allowUnselect = value;
  },
  getAllowUnselect: function (value) {
    return this.allowUnselect;
  },
  setAllowCellSelect: function (value) {
    if (this.allowCellSelect != value) {
      this.allowCellSelect = value;
      this.layoutChanged();
    }
  },
  setAllowRowSelect: function (value) {
    if (this.allowRowSelect != value) {
      this.allowRowSelect = value;
      this.layoutChanged();
    }
  },
  setAllowAlternating: function (value) {
    if (this.allowAlternating != value) {
      this.allowAlternating = value;
      this.layoutChanged();
    }
  },
  setAllowResizeColumn: function (value) {
    if (this.allowResizeColumn != value) {
      this.allowResizeColumn = value;
      this.layoutChanged();
    }
  },
  setAllowMoveColumn: function (value) {
    if (this.allowMoveColumn != value) {
      this.allowMoveColumn = value;
    }
  },
  setAllowSortColumn: function (value) {
    if (this.allowSortColumn != value) {
      this.allowSortColumn = value;
    }
  },

  setAllowDragDrop: function (value) {
    if (this.allowDragDrop != value) {
      this.allowDragDrop = value;
      this.layoutChanged();
    }
  },
  setShowDirty: function (value) {
    if (this.showDirty != value) {
      this.showDirty = value;
      this.layoutChanged();
    }
  },

  _getDragData: function () {
    return this.data.getSelecteds().clone();
  },
  _getDragText: function (dragRecords) {
    return "Rows " + dragRecords.length;
  },
  _OnRowDragStart: function (record, column) {
    var e = {
      record: record,
      column: column,
      cancel: false
    };
    this.fire("RowDragStart", e);
    return e;
  },
  _OnRowDragDrop: function (dragRecords, dropRecord, dragAction) {
    dragRecords = dragRecords.clone();
    var e = {
      records: dragRecords,
      targetRecord: dropRecord,
      action: dragAction,
      cancel: false
    };
    this.fire("RowDragDrop", e);
    return e;
  },
  _OnGiveFeedback: function (effect, dragRecords, dropRecord) {
    var e = {};
    e.effect = effect;
    e.records = dragRecords;
    e.targetRecord = dropRecord;
    this.fire("GiveFeedback", e);
    return e;
  },
  isAllowDragDrop: function (record, column) {
    if (!this.allowDragDrop) return false;
    if (column.allowDrag !== true) return false;
    var e = this._OnRowDragStart(record, column);
    return !e.cancel;
  }
};

mini.copyTo(mini.SuperGrid.prototype, mini.GridCellEditModel);




mini._SuperGridSort = function (grid) {
  this.grid = grid;
  this.grid.on("headercellclick", this.__onGridHeaderCellClick, this);
  this.grid.on("headercellmousedown", this.__OnGridHeaderCellMouseDown, this);

  mini.on(grid._headerEl, "mousemove", this.__OnGridHeaderMouseMove, this);
  mini.on(grid._headerEl, "mouseout", this.__OnGridHeaderMouseOut, this);
};
mini._SuperGridSort.prototype = {
  __OnGridHeaderMouseOut: function (e) {
    if (this._focusedColumnEl) {
      mini.removeClass(this._focusedColumnEl, "mini-supergrid-headercell-hover");
    }
  },
  __OnGridHeaderMouseMove: function (e) {
    var t = mini.findParent(e.target, "mini-supergrid-headercell");
    if (t) {
      mini.addClass(t, "mini-supergrid-headercell-hover");
      this._focusedColumnEl = t;
    }
  },
  __onGridHeaderCellClick: function (e) {
    var grid = this.grid;

    var t = mini.findParent(e.target, "mini-supergrid-headercell");
    if (t) {
      var column = grid.getColumn(t.id.split("$")[2]);
      if (grid.allowMoveColumn && column && column.allowDrag) {
        this.dragColumn = column;
        this._columnEl = t;
        this.getDrag().start(e);
      }
    }
  }
};




mini._SuperGridSelect = function (grid) {

  this.grid = grid;
  this.grid.on("cellmousedown", this.__onGridCellMouseDown, this);
  this.grid.on("cellclick", this.__onGridCellClick, this);
  this.grid.on("celldblclick", this.__onGridCellDblClick, this);

  mini.on(this.grid.el, "keydown", this.__OnGridKeyDown, this);
};
mini._SuperGridSelect.prototype = {
  __OnGridKeyDown: function (e) {


    var grid = this.grid;
    var currentCell = grid.getCurrentCell();

    if (e.shiftKey || e.ctrlKey || e.altKey) {
      return;
    }

    if (!currentCell) return;
    if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
      e.preventDefault();
    }

    var columns = grid.getViewColumns();
    var column = currentCell.column, record = currentCell.record;
    var columnIndex = columns.indexOf(column);
    var rowIndex = grid.indexOf(record);
    var count = grid.getCount();



    switch (e.keyCode) {

      case 9:




        break;
      case 27:

        break;
      case 13:
        if (column.readOnly != true) {
          grid.beginEdit();
        }
        break;
      case 37:
        if (columnIndex > 0) {
          columnIndex -= 1;
        }
        break;
      case 38:
        if (rowIndex > 0) rowIndex -= 1;
        break;
      case 39:

        if (columnIndex < columns.length - 1) {
          columnIndex += 1;
        }
        break;
      case 40:
        if (rowIndex < count - 1) rowIndex += 1;
        break;
      default:
        return;
    }
    column = columns[columnIndex];
    record = grid.getAt(rowIndex);

    if (column && record && grid.allowCellSelect) {
      var currentCell = { record: record, column: column };
      grid.setCurrentCell(currentCell);
    }

    if (record && grid.allowRowSelect) {
      grid.deselectAll();
      grid.select(record);
    }
  },
  __onGridCellClick: function (e) {

    var record = e.record, column = e.column;


    if (!column.readOnly && !this.grid.isReadOnly()) {
      if (e.htmlEvent.shiftKey || e.htmlEvent.ctrlKey) {
      } else {
        if (!this.grid.editOnDblClick) {
          this.grid.beginEdit();
        }
      }
    }
  },
  __onGridCellDblClick: function (e) {

    var record = e.record, column = e.column;

    if (!column.readOnly && !this.grid.isReadOnly()) {
      if (e.htmlEvent.shiftKey || e.htmlEvent.ctrlKey) {
      } else {
        if (this.grid.editOnDblClick) {
          this.grid.beginEdit();
        }
      }
    }
  },
  __onGridCellMouseDown: function (e) {
    var record = e.record, column = e.column;


    if (this.grid.allowCellSelect) {
      var cell = {
        record: record,
        column: column
      };
      this.grid.setCurrentCell(cell);
    }


    if (!this.grid.allowRowSelect) return;



    var ex = {
      record: record,
      column: column,
      cancel: false
    };
    this.grid.fire("beforeselect", ex);
    if (ex.cancel == true) return;
    var grid = this.grid;

    if (this.grid.getMultiSelect()) {
      this.grid.el.onselectstart = function () { };
      if (e.htmlEvent.shiftKey) {
        this.grid.el.onselectstart = function () { return false };
        e.htmlEvent.preventDefault();

        if (!this.currentRecord) {
          this.grid.data.select(record);
          this.currentRecord = this.grid.getSelected();
        } else {

          this.grid.deselectAll();
          this.grid.selectRange(this.currentRecord, record);
        }

      } else {
        this.grid.el.onselectstart = function () { };
        if (e.htmlEvent.ctrlKey) {
          this.grid.el.onselectstart = function () { return false };
          e.htmlEvent.preventDefault();
        }


        if (column._multiRowSelect || e.htmlEvent.ctrlKey || grid.allowUnselect) {
          if (this.grid.data.isSelected(record) && (column._multiRowSelect || e.htmlEvent.ctrlKey)) {
            if (e.htmlEvent.button != 2) {
              this.grid.data.deselect(record);

              this.grid.setCurrentCell(null);

            }
          } else {
            this.grid.data.select(record);
          }

        } else {
          if (this.grid.data.isSelected(record)) {

          } else {
            this.grid.data.deselectAll();
            this.grid.data.select(record);
          }
        }

        this.currentRecord = this.grid.getSelected();

      }

    }
    else {
      if (!this.grid.data.isSelected(record)) {
        this.grid.data.select(record);
      }
    }







  }
};




mini._SuperGridSplitter = function (grid) {
  this.grid = grid;
  mini.on(this.grid.el, "mousedown", this.__onGridMouseDown, this);
};
mini._SuperGridSplitter.prototype = {
  __onGridMouseDown: function (e) {
    var grid = this.grid;
    var t = e.target;
    if (mini.hasClass(t, "mini-supergrid-splitter")) {
      var cid = mini.getAttr(t, "cid");

      var column = grid.getColumn(cid);
      if (grid.allowResizeColumn && column) {
        this.splitterColumn = column;
        this.getDrag().start(e);
      }
    }
  },
  getDrag: function () {
    if (!this.drag) {
      this.drag = new mini.Drag({
        capture: true,
        onStart: mini.createDelegate(this._OnDragStart, this),
        onMove: mini.createDelegate(this._OnDragMove, this),
        onStop: mini.createDelegate(this._OnDragStop, this)
      });
    }
    return this.drag;
  },
  _OnDragStart: function (drag) {
    var grid = this.grid;
    var columnBox = grid.getColumnBox(this.splitterColumn);
    this.columnBox = columnBox;
    this._dragProxy = mini.append(document.body, '<div class="mini-supergrid-proxy"></div>');


    var box = grid.getBox(true);
    box.x = columnBox.x;
    box.width = columnBox.width;
    box.right = columnBox.right;
    mini.setBox(this._dragProxy, box);
  },
  _OnDragMove: function (drag) {
    var grid = this.grid;
    var box = mini.copyTo({}, this.columnBox);
    var width = box.width + (drag.now[0] - drag.init[0]);
    if (width < grid.columnMinWidth) width = grid.columnMinWidth;
    if (width > grid.columnMaxWidth) width = grid.columnMaxWidth;

    mini.setWidth(this._dragProxy, width);
  },
  _OnDragStop: function (drag) {
    var grid = this.grid;
    var box = mini.getBox(this._dragProxy);
    jQuery(this._dragProxy).remove();
    this._dragProxy = null;
    grid.updateColumn(this.splitterColumn, { width: box.width });
  }
};




mini._SuperGridColumnMove = function (grid, headerCellCls, splitterCls) {
  this.grid = grid;
  this.headerCellCls = headerCellCls;
  this.splitterCls = splitterCls;
  mini.on(this.grid.el, "mousedown", this.__onGridMouseDown, this);
};
mini._SuperGridColumnMove.prototype = {
  __onGridMouseDown: function (e) {

    var grid = this.grid;
    if (mini.hasClass(e.target, "mini-supergrid-splitter")) return;

    if (e.button == mini.MouseButton.Right) return;

    var t = mini.findParent(e.target, "mini-supergrid-headercell");
    if (t) {
      var column = grid.getColumn(t.id);
      if (grid.allowMoveColumn && column && column.allowMove) {
        this.dragColumn = column;
        this._columnEl = t;
        this.getDrag().start(e);
      }
    }
  },
  getDrag: function () {
    if (!this.drag) {
      this.drag = new mini.Drag({
        capture: isIE9 ? false : true,
        onStart: mini.createDelegate(this._OnDragStart, this),
        onMove: mini.createDelegate(this._OnDragMove, this),
        onStop: mini.createDelegate(this._OnDragStop, this)
      });
    }
    return this.drag;
  },
  _OnDragStart: function (drag) {
    var grid = this.grid;
    this._dragProxy = mini.append(document.body, '<div class="mini-supergrid-columnproxy"></div>');
    this._dragProxy.innerHTML = '<div class="mini-supergrid-columnproxy-inner">' + grid._createHeaderCell(this.dragColumn) + '</div>';
    mini.setXY(this._dragProxy, drag.now[0] + 15, drag.now[1] + 18);
    mini.addClass(this._dragProxy, "mini-supergrid-no");

    this.moveTop = mini.append(document.body, '<div class="mini-supergrid-movetop"></div>');
    this.moveBottom = mini.append(document.body, '<div class="mini-supergrid-movebottom"></div>');
  },
  _OnDragMove: function (drag) {
    var grid = this.grid;
    var x = drag.now[0];
    mini.setXY(this._dragProxy, x + 15, drag.now[1] + 18);

    this.targetColumn = this.insertAction = null;
    var t = mini.findParent(drag.event.target, "mini-supergrid-headercell");

    if (t) {

      var column = grid.getColumn(t.id);
      if (column && column != this.dragColumn
        && !grid.isAncestorColumn(this.dragColumn, column)
      ) {
        this.targetColumn = column;
        this.insertAction = "before";
        var columnBox = grid.getColumnBox(this.targetColumn);

        if (x > columnBox.x + columnBox.width / 2) {

          this.insertAction = "after";
        }
      }
    }

    if (this.targetColumn) {
      mini.addClass(this._dragProxy, "mini-supergrid-ok");
      mini.removeClass(this._dragProxy, "mini-supergrid-no");

      var box = grid.getColumnBox(this.targetColumn);

      this.moveTop.style.display = 'block';
      this.moveBottom.style.display = 'block';
      if (this.insertAction == "before") {

        mini.setXY(this.moveTop, box.x - 4, box.y - 9);
        mini.setXY(this.moveBottom, box.x - 4, box.bottom);
      } else {

        mini.setXY(this.moveTop, box.right - 4, box.y - 9);
        mini.setXY(this.moveBottom, box.right - 4, box.bottom);
      }
    } else {
      mini.removeClass(this._dragProxy, "mini-supergrid-ok");
      mini.addClass(this._dragProxy, "mini-supergrid-no");

      this.moveTop.style.display = 'none';
      this.moveBottom.style.display = 'none';
    }
  },
  _OnDragStop: function (drag) {
    var grid = this.grid;
    mini.removeNode(this._dragProxy);
    mini.removeNode(this.moveTop);
    mini.removeNode(this.moveBottom);
    grid.moveColumn(this.dragColumn, this.targetColumn, this.insertAction);
    this._dragProxy = this.moveTop = this.moveBottom = this.dragColumn = this.targetColumn = null;


  }
};






mini._GridDragDrop = function (grid) {
  this.owner = grid;
  this.owner.on('CellMouseDown', this.__OnGridCellMouseDown, this);



}
mini._GridDragDrop.prototype = {
  __OnGridCellMouseDown: function (e) {

    if (e.htmlEvent.button == mini.MouseButton.Right) return;
    var grid = this.owner;
    if (grid.isReadOnly() || grid.isAllowDragDrop(e.record, e.column) == false) return;
    var record = e.record;

    this.isTree = grid.data.isTree;
    this.dragData = grid._getDragData();

    if (this.dragData.indexOf(record) == -1) {
      this.dragData.push(record);
    }


    var drag = this._getDrag();
    drag.start(e.htmlEvent);
  },
  _OnDragStart: function (drag) {
    var grid = this.owner;

    this.feedbackEl = mini.append(document.body, '<div class="mini-feedback"></div>');
    this.feedbackEl.innerHTML = grid._getDragText(this.dragData);
    this.lastFeedbackClass = "";
  },
  _OnDragMove: function (drag) {
    var grid = this.owner;

    var x = drag.now[0], y = drag.now[1];
    mini.setXY(this.feedbackEl, x + 15, y + 18);

    var targetRecord = grid._getRecordByEvent(drag.event);
    this.dropRecord = targetRecord;

    if (targetRecord) {
      if (this.isTree) {
        this.dragAction = this.getFeedback(targetRecord, y, 3);
      } else {
        this.dragAction = this.getFeedback(targetRecord, y, 2);
      }
    } else {
      this.dragAction = "no";
    }

    this.lastFeedbackClass = "mini-feedback-" + this.dragAction;
    this.feedbackEl.className = "mini-feedback " + this.lastFeedbackClass;

    if (this.dragAction == "no") targetRecord = null;
    this.setRowFeedback(targetRecord, this.dragAction);

  },
  _OnDragStop: function (drag) {
    var grid = this.owner;
    mini.removeNode(this.feedbackEl);

    this.feedbackEl = null;
    this.setRowFeedback(null);


    if (this.isTree) {
      var dragRecords = [];
      for (var i = 0, l = this.dragData.length; i < l; i++) {
        var dragRecord = this.dragData[i];

        var hasParent = false;
        for (var j = 0, k = this.dragData.length; j < k; j++) {
          var dr = this.dragData[j];
          if (dr != dragRecord) {
            hasParent = grid.data.isAncestor(dr, dragRecord);
            if (hasParent) break;
          }
        }

        if (!hasParent) {
          dragRecords.push(dragRecord);
        }
      }
      this.dragData = dragRecords;
    }

    if (this.dropRecord && this.dragAction != "no") {
      var e = grid._OnRowDragDrop(this.dragData, this.dropRecord, this.dragAction);

      if (!e.cancel) {
        var dragRecords = e.records, targetRecord = e.targetRecord, action = e.action;
        if (grid.data.isTree) {
          grid.data.moveNodes(dragRecords, targetRecord, action);
        } else {
          var index = grid.data.indexOf(targetRecord);
          if (action == "after") index += 1;
          grid.data.move(dragRecords, index);
        }
      }
    }
    this.dropRecord = null;
    this.dragData = null;
  },
  setRowFeedback: function (record, feedback) {



    var grid = this.owner;
    if (this.lastAddDomRow) {

      grid.removeRowCls(this.lastAddDomRow, "mini-supergrid-feedback-add");
    }
    if (record == null || this.dragAction == "add") {
      mini.removeNode(this.feedbackLine);
      this.feedbackLine = null;
    }

    this.lastRowFeedback = record;

    if (record != null) {
      if (feedback == "before" || feedback == "after") {
        if (!this.feedbackLine) {
          this.feedbackLine = mini.append(document.body, "<div class='mini-feedback-line'></div>");
        }
        this.feedbackLine.style.display = "block";
        var rowBox = grid.getRowBox(record);
        var x = rowBox.x, y = rowBox.y - 1;
        if (feedback == "after") {
          y += rowBox.height;
        }
        mini.setXY(this.feedbackLine, x, y);

        var box = grid.getBox(true);
        mini.setWidth(this.feedbackLine, box.width);
      } else {
        grid.addRowCls(record, "mini-supergrid-feedback-add");
        this.lastAddDomRow = record;


      }
    }
  },
  getFeedback: function (dropRecord, y, way) {

    var grid = this.owner;

    var rowBox = grid.getRowBox(dropRecord);


    var h = rowBox.height;
    var t = y - rowBox.y;

    var effect = null;


    if (this.dragData.indexOf(dropRecord) != -1) return "no";
    var IsLeaf = false;
    if (way == 3) {
      IsLeaf = grid.isLeaf(dropRecord);


      for (var i = 0, l = this.dragData.length; i < l; i++) {
        var dragRecord = this.dragData[i];

        var isAncestor = grid.isAncestor(dragRecord, dropRecord);
        if (isAncestor) {
          effect = "no";
          break;
        }
      }
    }
    if (effect == null) {
      if (way == 2) {
        if (t > h / 2) effect = "after";
        else effect = "before";
      } else {
        if (IsLeaf) {
          if (t > h / 2) effect = "after";
          else effect = "before";
        } else {
          if (t > (h / 3) * 2) effect = "after";
          else if (h / 3 <= t && t <= (h / 3 * 2)) effect = "add";
          else effect = "before";
        }
      }
    }
    var e = grid._OnGiveFeedback(effect, this.dragData, dropRecord);
    return e.effect;
  },
  _getDrag: function () {
    if (!this.drag) {
      this.drag = new mini.Drag({
        capture: false,
        onStart: mini.createDelegate(this._OnDragStart, this),
        onMove: mini.createDelegate(this._OnDragMove, this),
        onStop: mini.createDelegate(this._OnDragStop, this)
      });
    }
    return this.drag;
  }
};
