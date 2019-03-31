

mini._GanttViewToolTip = function (gantt) {
  this.gantt = gantt;
  mini.on(document.body, 'mousemove', this.__OnGanttMouseMove, this);

  this.gantt.on('ItemDragMove', this.__OnItemDragMove, this);
  this.gantt.on('ItemDragComplete', this.__OnItemDragComplete, this);

  this.gantt.on('scroll', this.__OnScroll, this);

  this.gantt.on('refresh', function (e) {
    this.draging = false;
    this.hideTip();
  }, this);
}
mini._GanttViewToolTip.prototype = {
  __OnScroll: function (e) {

    if (!this.gantt.isDisplay()) return;
    if (e.direction == "vertical") {
      this.toolTipEvent = '_OnScrollToolTipNeeded';
      var x = 0, y = 0;

      if (this.tooltipTimer) {
        clearTimeout(this.tooltipTimer);
        this.tooltipTimer = null;
      }
      var sf = this;
      var time = 30;
      if (mini.isFirefox) {
        var item = sf.gantt.getViewStartItem();
        sf.showTip(item, "right", "top", -1);
        sf.tooltipTimer = null;
        time = 0;
      } else {
        this.tooltipTimer = setTimeout(function () {

          var item = sf.gantt.getViewStartItem();
          sf.showTip(item, "right", "top", 0);
          sf.tooltipTimer = null;
        }, time);
      }

    } else {
      this.toolTipEvent = '_OnDateToolTipNeeded';
      var x = 0, y = 0;
      var date = this.gantt.getViewStartDate();
      this.showTip(date, "left", "bottom", 0);
    }
  },

  __OnItemDragMove: function (e) {

    this.toolTipEvent = '_OnItemDragTipNeeded';
    this.draging = true;
    var x = e.drag.init[0], y = e.drag.init[1];

    this.showTip(e.item, x, y + 10, 0, true);
  },
  __OnItemDragComplete: function (sender, e) {
    this.draging = false;
    this.hideTip();
  },

  __OnGanttMouseMove: function (e) {
    if (this.draging === true) return;
    var t = e.target, gantt = this.gantt;

    if (gantt.refreshScrollComplete == true) return;

    if (!gantt.within(e)) {
      this.hideTip();
      return;
    }

    var item = gantt.getItemByEvent(e);
    if (item) {
      var isBaseline = !!mini.findParent(t, "mini-gantt-baseline");
      item.isBaseline = isBaseline;

      this.toolTipEvent = '_OnItemToolTipNeeded';
      this.toolTipItem = item;


      this.showTip(item, e.pageX + 8, e.pageY + 15, this.showTipDelay);
    } else {
      var link = gantt.getLinkByEvent(e);
      if (link) {
        this.toolTipEvent = '_OnLinkToolTipNeeded';
        this.toolTipItem = link;

        this.showTip(link, e.pageX + 5, e.pageY + 8, this.showTipDelay);


      } else {
        this.hideTip();
      }
    }
  },
  showTipDelay: 700,
  showTip: function (item, x, y, delay, auto) {
    if (this._lastShowItem == item && delay != 0) {
      this._showXY = [x, y];
      return;
    }

    this.hideTip(false);
    if (this.hideTimer) {
      clearInterval(this.hideTimer);
      this.hideTimer = null;
    }

    var gantt = this.gantt;
    this._lastShowItem = item;
    var sf = this;
    this._showXY = [x, y];
    if (delay <= 0 && mini.isFirefox) {
      sf._showTipCore(item, auto);
    } else {

      this._showTipTimer = setTimeout(function () {

        sf._showTipCore(item, auto);
      }, delay);
    }
  },
  _showTipCore: function (item, auto) {

    var gantt = this.gantt;
    if (!this._tipEl) {

      this._tipEl = mini.append(document.body, '<div class="mini-ganttview-tooltip" style="display:none;"></div>');
    }
    if (auto == true) this._tipEl.style.width = "auto";

    var e = gantt[this.toolTipEvent](item);
    this._tipEl.innerHTML = e.tooltip;
    this._tipEl.style.display = 'block';
    var x = this._showXY[0], y = this._showXY[1];

    mini.setXY(this._tipEl, -1000, -1000);
    var size = mini.getSize(this._tipEl);

    var ganttBox = this.gantt.getViewportBox();
    if (x == "left") {
      x = ganttBox.x + 5;
    } else if (x == "right") {
      x = ganttBox.right - 20 - size.width;
    }
    if (y == "top") {
      y = ganttBox.y + 5;
    } else if (y == "bottom") {
      y = ganttBox.bottom - 20 - size.height;
    }

    var vbox = mini.getViewportBox();
    if (x + size.width > vbox.right) x = vbox.right - size.width;
    if (y + size.height > vbox.bottom) y = vbox.bottom - size.height;

    mini.setXY(this._tipEl, x, y);
  },
  hideTip: function (remove, clearShow) {
    var sf = this;

    if (sf._tipEl && remove !== false) {
      mini.removeNode(sf._tipEl);
      sf._tipEl = null;


    }


    sf._lastShowItem = null;
    clearInterval(sf._showTipTimer);

  }
};




mini._GanttViewDragDrop = function (gantt) {
  this.owner = gantt;
  this.owner.on('refresh', this.__OnGanttRefresh, this);
  mini.on(this.owner.el, 'mousedown', this.__OnGanttMouseDown, this);







}
mini._GanttViewDragDrop.prototype = {
  isDraging: function () {
    return !!this.dragAction;
  },
  originalItem: null,
  dragItem: null,
  dragAction: null,

  __OnGanttMouseDown: function (e) {

    var t = e.target, ganttview = this.owner;
    if (ganttview.isReadOnly()) return;

    if (!ganttview.allowDrag) return;


    var item = ganttview.getItemByEvent(e);

    if (!item) {
      return;


    }
    if (mini.findParent(t, "mini-gantt-baseline")) return;

    this.createLink = false;

    if (mini.MouseButton.Left == e.button) {
      this.dragItem = item;
      this.originalItem = mini.copyTo({}, item);
      if (mini.hasClass(t, 'mini-gantt-resize-start')) {
        this.dragAction = 'start';

        var ex = ganttview._OnItemDragStart(item, "start");
        if (!ex.cancel) {
          this.getDrag().start(e);
        }
      } else if (mini.hasClass(t, 'mini-gantt-resize-finish')) {
        this.dragAction = 'finish';
        var ex = ganttview._OnItemDragStart(item, "finish");
        if (!ex.cancel) {
          this.getDrag().start(e);
        }
      } else if (mini.hasClass(t, 'mini-gantt-resize-percentcomplete')) {
        this.dragAction = 'percentcomplete';
        var ex = ganttview._OnItemDragStart(item, "percentcomplete");
        if (!ex.cancel) {
          this.getDrag().start(e);
        }
      } else if (mini.findParent(t, 'mini-gantt-item')) {
        this.dragAction = 'move';
        this._BeforeDragMove(item, e);

        this.startCreateLink(item, e);
      }
    }
  },

  startCreateLink: function (item, clickEvent) {
    var me = this,
      ganttview = this.owner,
      gantt = ganttview.owner;

    if (!gantt.allowLinkBars) return;

    var ganttBox = mini.getBox(gantt.el);

    me.canLink = true;

    var suppertSVG = !!document.createElementNS;
    me.canLink = suppertSVG;

    var ns = "http:\/\/www.w3.org/2000/svg";
    var svg;

    if (!suppertSVG) return;


    if (suppertSVG) {

      svg = document.createElementNS(ns, 'svg');

      svg.style.cssText = 'position:absolute;left:0;top:0;display:none;width:100%;height:' + ganttBox.bottom + 'px;z-index:100000;pointer-events: none;';
      document.body.appendChild(svg);
      var line = document.createElementNS(ns, 'line');
      svg.appendChild(line);

      line.setAttribute("stroke", 'rgb(0,0, 0)');
      line.setAttribute("stroke-width", 1);
      line.setAttribute("x1", clickEvent.pageX);
      line.setAttribute("y1", clickEvent.pageY);









    }

    var endTask;

    function onMouseMove(event) {
      var xOffset = event.pageX - clickEvent.pageX,
        yOffset = event.pageY - clickEvent.pageY;

      var inX = Math.abs(xOffset) > 10,
        inY = gantt.allowLinkBars && Math.abs(yOffset) > 6;

      if (!moved && inY && me.canLink) {
        moved = true;
        me.createLink = true;

        $(document.body).addClass("mini-gantt-createlink");
        event.target.style.cursor = "pointer";
      }

      if (me.createLink) {
        if (suppertSVG) {
          svg.style.display = '';
          line.setAttribute("x2", event.pageX);
          line.setAttribute("y2", event.pageY);
        }

        endTask = null;

        if (event.target) {



          if ($(event.target).closest('.mini-gantt-item')[0]) {
            endTask = ganttview.getItemByEvent(event);
            if (endTask == item) {
              endTask = null;
            }
          }


        }
      }




    }

    function onMouseUp(event) {


      clearTimeout(timer);
      mini.un(document, 'mousemove', onMouseMove);
      mini.un(document, 'mouseup', onMouseUp);
      if (svg) $(svg).remove();
      $(document.body).removeClass("mini-gantt-createlink");

      if (moved) {

        if (me.createLink) {


          if (endTask) {

            var link = gantt.getPredecessorLink(item, endTask);
            if (!link) link = gantt.getPredecessorLink(endTask, item);



            if (link) {
              alert("已经存在Link关系");
            } else {

              var link = { PredecessorUID: item.UID, Type: 1 };

              try {

                gantt.addLink(endTask, link);

                gantt.fire("linkcreate", { link: link });
              } catch (ex) {
                alert(ex.message);
              }
            }













          }


        }

      }
    }

    var moved = false;

    var timer = setTimeout(function () {
      mini.on(document, 'mousemove', onMouseMove);
    }, 1);
    mini.on(document, 'mouseup', onMouseUp);




  },

  _BeforeDragMove: function (item, e) {

    var me = this;

    var ex = me.owner._OnItemDragStart(item, "move");
    if (!ex.cancel) {
      me.getDrag().start(e);
    }

  },

  getDrag: function () {
    if (!this.drag) {
      this.drag = new mini.Drag({
        delay: 180,
        capture: false,
        context: this.owner._viewportEl,
        onStart: mini.createDelegate(this._OnDragStart, this),
        onMove: mini.createDelegate(this._OnDragMove, this),
        onStop: mini.createDelegate(this._OnDragStop, this)
      });
    }
    return this.drag;
  },
  _GetCursor: function () {
    switch (this.dragAction) {
      case "start":
        return 'w-resize';
        break;
      case "finish":
        return 'w-resize';
        break;
      case "percentcomplete":



        return 'row-resize';
        break;
      case "move":
        return 'move';
        break;
      case "link":
        return 'move';
        break;
    }
  },
  _OnDragStart: function (drag) {
    if (this.createLink) return;

    var ganttview = this.owner, item = this.dragItem;
    this.viewBox = ganttview.getViewportBounds(ganttview.viewRegion);
    var itemBox = ganttview.getItemBox(item);
    this.MoveOffset = itemBox.left - drag.init[0];
    this.timeSpan = item.Finish - item.Start;
    this.itemBox = itemBox;







  },
  _OnDragMove: function (drag) {
    if (this.createLink) return;

    this.canLink = false;

    var ganttview = this.owner, item = this.dragItem;
    var viewBox = this.viewBox;
    var bodyBox = ganttview.getViewportBox();

    switch (this.dragAction) {
      case "start":
        var date = ganttview.getDateByPageX(drag.now[0]);

        item.Start = date;
        if (item.Start > item.Finish) item.Start = item.Finish;
        setTimeout(function () {
          ganttview.refreshItem(item);
        }, 10);
        break;
      case "finish":
        var date = ganttview.getDateByPageX(drag.now[0]);
        item.Finish = date;
        if (item.Start > item.Finish) item.Finish = item.Start;
        setTimeout(function () {
          ganttview.refreshItem(item);
        }, 1);

        break;
      case "percentcomplete":
        var itemWidth = this.itemBox.width;
        var offset = drag.now[0] - bodyBox.x + viewBox.left - this.itemBox.x;

        var percentComplete = parseInt(offset * 100 / itemWidth);

        if (percentComplete < 0) percentComplete = 0;
        if (percentComplete > 100) percentComplete = 100;

        item.PercentComplete = percentComplete;
        setTimeout(function () {
          ganttview.refreshItem(item, false);
        }, 10);

        break;
      case "move":

        var offset = drag.now[0] + this.MoveOffset;
        var date = ganttview.getDateByOffset(offset);
        item.Start = date;
        item.Finish = new Date(date.getTime() + this.timeSpan);
        setTimeout(function () {
          ganttview.refreshItem(item);
        }, 10);
        break;
      case "link":
        break;
    }

    ganttview._OnItemDragMove(item, drag, this.dragAction);
  },
  dropNode: null,
  _OnDragStop: function (drag, success) {
    if (this.createLink) return;

    var ganttview = this.owner, item = this.dragItem;
    if (success == false) {
      mini.copyTo(this.dragItem, this.originalItem);
    } else {
      var value = this.dragItem["Start"];
      switch (this.dragAction) {
        case "move":
          this.dropNode = ganttview.getDragRecord(drag.now[1]);
          var e = ganttview._OnItemDragDrop(this.dragItem, this.dropNode);
          if (e.cancel) success = false;
          break;
        case "start":

          break;
        case "finish":
          value = this.dragItem["Finish"];
          break;
        case "percentcomplete":
          value = this.dragItem["PercentComplete"];
          break;
        case "link":
          break;
      }
      mini.copyTo(this.dragItem, this.originalItem);

      if (success) {

        this._OnItemDragComplete(value);
      }

    }
    if (success == false) {

      drag.event.stopPropagation()
    }
    this.stopDrag(success);
  },
  _OnItemDragComplete: function (value) {
    if (this.createLink) return;

    var ganttview = this.owner, item = this.dragItem;
    ganttview._OnItemDragComplete(this.dragItem, this.dragAction, value, this.dropNode);
  },
  stopDrag: function (complete) {

    var ganttview = this.owner, item = this.dragItem;



    if (complete == false) {
      ganttview.refresh();
    }

    this.dragItem = this.originalItem = this.dragAction = this.dropNode = null;
  },

  __OnGanttRefresh: function (e) {

    if (this.___dragProxyTimer) {
      clearTimeout(this.___dragProxyTimer);
    }
    var sf = this;
    this.___dragProxyTimer = setTimeout(function () {
      sf.render_dragProxy();
      sf.___dragProxyTimer = null;
    }, 300);
  },
  renderItem_dragProxy: function (item, box, sb, id) {
    var ganttview = this.owner;

    var id = item._id;
    var ex = ganttview._OnItemDragStart(item, "start");
    if (!ex.cancel) {
      sb[sb.length] = '<div id="';
      sb[sb.length] = id;
      sb[sb.length] = '" class="mini-gantt-resize-start" style="left:';
      sb[sb.length] = box.x - 2;
      sb[sb.length] = 'px;top:';
      sb[sb.length] = box.y;
      sb[sb.length] = 'px;width:';
      sb[sb.length] = 5;
      sb[sb.length] = 'px;height:';
      sb[sb.length] = box.height;
      sb[sb.length] = 'px;"></div>';
    }
    var ex = ganttview._OnItemDragStart(item, "finish");
    if (!ex.cancel) {
      sb[sb.length] = '<div id="';
      sb[sb.length] = id;
      sb[sb.length] = '" class="mini-gantt-resize-finish" style="left:';
      sb[sb.length] = box.right - 2;
      sb[sb.length] = 'px;top:';
      sb[sb.length] = box.y;
      sb[sb.length] = 'px;width:';
      sb[sb.length] = 5;
      sb[sb.length] = 'px;height:';
      sb[sb.length] = box.height;
      sb[sb.length] = 'px;"></div>';
    }
    var ex = ganttview._OnItemDragStart(item, "percentcomplete");
    if (!ex.cancel) {
      var percentComplete = item.PercentComplete || 0;
      var percentWidth = parseInt((box.right - box.x) * percentComplete / 100);
      var right = box.x + percentWidth;
      var width = 4;
      if (percentComplete == 0) {
        width = 3;
      } else if (percentComplete == 100) {
        width = 3;
        right -= 3;
      } else {
        right -= 2;
      }
      sb[sb.length] = '<div id="';
      sb[sb.length] = id;
      sb[sb.length] = '" class="mini-gantt-resize-percentcomplete" style="left:';
      sb[sb.length] = right;
      sb[sb.length] = 'px;top:';
      sb[sb.length] = box.y;
      sb[sb.length] = 'px;width:';
      sb[sb.length] = width;
      sb[sb.length] = 'px;height:';
      sb[sb.length] = box.height;
      sb[sb.length] = 'px;"></div>';
    }
  },
  render_dragProxy: function () {

    var ganttview = this.owner;
    if (!ganttview.allowDrag || ganttview.isReadOnly()) return;

    var region = ganttview.viewRegion;
    var viewBox = ganttview.getViewportBounds(region);
    var VLeft = viewBox.left, VTop = viewBox.top, VWidth = viewBox.width, VHeight = viewBox.height;

    var data = ganttview.getVisibleRows();
    var startRow = region.startRow, endRow = region.endRow;

    var sb = [];
    for (var i = startRow, l = endRow; i <= l; i++) {
      var item = data[i];
      if (!item) continue;
      var box = ganttview.getItemBox(item, VLeft, VTop);
      this.renderItem_dragProxy(item, box, sb);
    }
    var s = '<div>' + sb.join('') + '</div>';
    mini.append(ganttview.barsEl, s);
  }
};



mini.GanttView = function () {
  mini.GanttView.superclass.constructor.call(this);

  this._TaskUIDs = {};
  this._TaskIndexs = {};
  this._linkHashed = {};


  this.topTimeScale = mini.GanttView.getTimeScale(this.topTimeScaleType);
  this.bottomTimeScale = mini.GanttView.getTimeScale(this.bottomTimeScaleType);

  this.zoomTimeScales = mini.GanttView.createZoomTimeScales();

  var d = new Date();
  this.startDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  this.finishDate = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate());
  this.setDateRange(this.startDate, this.finishDate);
  this.setData([]);
}
mini.extend(mini.GanttView, mini.Control, {
  virtualModel: false,
  viewModel: "gantt",
  setViewModel: function (value) {
    this.viewModel = value;
    this.layoutChanged();
  },
  isTrackModel: function () {
    return this.viewModel == "track";
  },
  baselineIndex: 0,
  getBaseline: function (item) {
    var bls = item.Baseline;
    return bls ? bls[this.baselineIndex] : null;
  },


  startDate: null,
  finishDate: null,
  weekStartDay: 0,

  rowHeight: 20,
  showGridLines: true,
  showLinkLines: true,
  showSummary: true,
  showCriticalPath: false,
  topTimeScaleType: "week",
  bottomTimeScaleType: "day",

  bottomTimeScaleFormatter: null,

  showLabel: true,
  labelField: "Name",
  labelAlign: "right",

  allowDrag: true,

  scrollLeft: 0,
  scrollTop: 0,
  scrollWidth: 0,
  scrollHeight: 0,
  headerHeight: 25,

  uiCls: "mini-ganttview",
  _create: function () {
    this.el = document.createElement("div");
    this.el.className = "mini-ganttview";

    this.el.innerHTML =
      '<div class="mini-ganttview-header"></div>' +
      '<div class="mini-ganttview-viewport">' +
      '<div class="mini-ganttview-gridlines"></div>' +
      '<div class="mini-ganttview-cells"><div class="mini-ganttview-bars"></div><div class="mini-ganttview-linklines"></div></div>' +

      '</div>' +
      '<div class="mini-supergrid-hscroller"><div class="mini-supergrid-hscrollercontent"></div></div>' +
      '<div class="mini-supergrid-vscroller"><div class="mini-supergrid-vscrollercontent"></div></div>';

    this._headerEl = this.el.firstChild;
    this._viewportEl = this.el.childNodes[1];
    this.cellsEl = this._viewportEl.childNodes[1];
    this.gridlinesEl = this._viewportEl.childNodes[0];

    this.barsEl = this.cellsEl.childNodes[0];
    this.linklinesEl = this.cellsEl.childNodes[1];

    this.hscrollerEl = this.el.childNodes[2];
    this.vscrollerEl = this.el.childNodes[3];
    this.hscrollerContentEl = this.hscrollerEl.firstChild;
    this.vscrollerContentEl = this.vscrollerEl.firstChild;

  },
  refreshScrollComplete: false,
  _initEvents: function () {
    mini.on(this.hscrollerEl, "scroll", this.__onHScroll, this);
    mini.on(this.vscrollerEl, "scroll", this.__onVScroll, this);


    if (mini.isFirefox) {
      var sf = this;

      function onmouseup() {

        document.onmouseup = null;


        sf.refreshScrollComplete = false;
        sf.setScrollTop(sf.scrollTop, true);

        sf.fire("scroll", {
          direction: "vertical"
        });
      }

      this.vscrollerEl.onmousedown = function (e) {
        sf.refreshScrollComplete = true;
        document.onmouseup = onmouseup;
      }
    } else if (!mini.isOpera) {
      var sf = this;

      function onvscrollmousemove() {

        document.onmousemove = null;


        sf.refreshScrollComplete = false;
        sf.setScrollTop(sf.scrollTop, true);
        sf.fire("scroll", {
          direction: "vertical"
        });

      }

      this.vscrollerEl.onmousedown = function (e) {
        sf.refreshScrollComplete = true;
        document.onmousemove = onvscrollmousemove;
      }
    }


    mini.on(this.el, "mousewheel", this.__OnMousewheel, this);
    mini.on(this.el, "click", this.__OnClick, this);
    mini.on(this.el, "dblclick", this.__OnDblClick, this);
    mini.on(this.el, "mousedown", this.__OnMouseDown, this);
    mini.on(this.el, "contextmenu", this.__OnContextMenu, this);


    this._initPlugins();
  },
  _initPlugins: function () {

    this._ToolTip = new mini._GanttViewToolTip(this);
    this._DragDrop = new mini._GanttViewDragDrop(this);
  },
  doLayout: function (must) {


    if (must !== false) {
      this._lastBodyWidth = this._lastBodyWidth = null;
    }
    if (this.canLayout() == false) return;

    mini.setHeight(this._headerEl, this.headerHeight);

    var vh = this.getViewportHeight();
    mini.setHeight(this._viewportEl, vh);

    this.viewportWidth = this.getViewportWidth();
    this.viewportHeight = this.getViewportHeight();

    this.bodyWidth = this.viewportWidth;
    this.bodyHeight = this.viewportHeight;

    var vheight = this.viewportHeight - 18;
    if (vheight < 0) vheight = 0;
    var vwidth = this.viewportWidth - 18
    if (vwidth < 0) vwidth = 0;

    this.vscrollerEl.style.top = this.getHeaderHeight() + "px";
    this.vscrollerEl.style.height = vheight + "px";
    this.hscrollerEl.style.width = vwidth + "px";

    this.hscrollerContentEl.style.width = this.scrollWidth + "px";
    this.vscrollerContentEl.style.height = this.scrollHeight + "px";


    if (!this._lastBodyWidth || this._lastBodyWidth != this.bodyWidth
      || !this._lastBodyHeight || this._lastBodyHeight != this.bodyHeight
    ) {
      this.refresh();

    }
    this._lastBodyWidth = this.bodyWidth;
    this._lastBodyHeight = this.bodyHeight;


  },
  getHeaderHeight: function () {
    return mini.getHeight(this._headerEl);

  },
  getViewportHeight: function () {
    var h = this.getHeight(true) - this.getHeaderHeight();
    return h;
  },
  getViewportWidth: function () {
    return this.getWidth(true);
  },

  setShowLabel: function (value) {
    if (this.showLabel != value) {
      this.showLabel = value;
      this.layoutChanged("showLabel");
    }
  },
  setShowCriticalPath: function (value) {
    if (this.showCriticalPath != value) {
      this.showCriticalPath = value;
      this.layoutChanged("showCriticalPath");
    }
  },
  setShowGridLines: function (value) {
    if (this.showGridLines != value) {
      this.showGridLines = value;
      this.layoutChanged("showGridLines");
    }
  },
  setTimeLines: function (value) {
    if (this.timeLines != value) {
      this.timeLines = value;
      this.layoutChanged("timeLines");
    }
  },
  setRowHeight: function (value) {
    value = parseInt(value);
    if (isNaN(value)) return;
    if (this.rowHeight != value) {
      this.rowHeight = value;

      this.__OnDataChanged();
    }
  },
  setScrollLeft: function (value) {
    if (value < 0) value = 0;
    if (value > this.scrollWidth) value = this.scrollWidth;
    if (this.scrollLeft != value) {

      this.allowScroll = false;
      this.hscrollerEl.scrollLeft = value;
      this.allowScroll = true;

      this.scrollLeft = this.hscrollerEl.scrollLeft;

      this.refresh();
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
        this.refresh();
      }

    }
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
  setHeaderHeight: function (value) {
    if (this.headerHeight != value) {
      this.headerHeight = value;


      mini.setHeight(this._headerEl, value);
      this.layoutChanged("headerheight");
    }
  },
  setTopTimeScale: function (value) {
    var ts = mini.GanttView.getTimeScale(value);
    if (this.bottomTimeScale.index <= ts.index) return;
    this.topTimeScale = ts;

    this.setDateRange(this._startDate, this._finishDate);
    this.layoutChanged();
  },
  setBottomTimeScale: function (value) {
    var ts = mini.GanttView.getTimeScale(value);
    if (this.topTimeScale.index >= ts.index) return;
    this.bottomTimeScale = ts;

    this.setDateRange(this._startDate, this._finishDate);
    this.layoutChanged();
  },
  isSummary: function (task) {

    if (this.showSummary) {


      return task.Summary || (task.children && task.children.length > 0) || task.TaskType == 1;


    } else {
      return false;
    }
  },
  isCritical: function (task) {
    if (this.showCriticalPath) {
      return task.Critical || task.Critical2;
    } else {
      return false;
    }
  },
  isMilestone: function (task) {
    return task.Milestone;
  },
  isWorking: function (date, timescale) {
    if (!timescale) return true;
    if (timescale.type == "day" && timescale.number == 1) {
      var day = date.getDay();
      if (day == 0 || day == 6) return false;
    }
    return true;
  },
  setDateRange: function (start, finish) {
    var sss = new Date();
    if (!mini.isDate(start)) throw new Error("start must be date type");
    if (!mini.isDate(finish)) throw new Error("finish must be date type");
    if (start.getTime() >= finish.getTime()) {
      finish = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);
    }
    if (start < new Date(1900, 0, 1)) throw new Error("date 1900 error ");

    var bType = this.bottomTimeScale.type,
      bNumber = this.bottomTimeScale.number,
      bWidth = this.bottomTimeScale.width;


    this._startDate = this._clearDate(start);
    this._finishDate = this._clearDate(finish);

    this.startDate = this.getTimeScaleStartDate(this._startDate, bType, bNumber);
    this.finishDate = this.getTimeScaleNextDate(this._finishDate, bType, 1);

    var scrollWidth = 0;

    var finishTime = this.finishDate.getTime();

    if (bType == "hour") {
      bWidth = (bWidth / bNumber) * 24;
      bType = "day";
      bNumber = 1;
    }
    if (bType == "minutes") {
      bWidth = (bWidth / bNumber) * 60 * 24;
      bType = "day";
      bNumber = 1;
    }
    if (bType == "seconds") {
      bWidth = (bWidth / bNumber) * 60 * 60 * 24;
      bType = "day";
      bNumber = 1;
    }

    for (var d = this._cloneDate(this.startDate); d.getTime() <= finishTime;) {
      scrollWidth += bWidth;

      d = this.getTimeScaleNextDate(d, bType, bNumber);

    }

    this.scrollWidth = scrollWidth;


  },


  setData: function (data) {
    if (this.data == data) return;
    if (typeof data == "string") {
      data = mini.get(data);
    }
    if (!data) data = [];
    if (data instanceof Array) {
      data = this._getSourceFromArray(data);
    }

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
  _getSourceFromArray: function (data) {
    if (!mini.isArray(data)) return data;
    var dataTree = new mini.DataTree();
    dataTree.loadData(data);
    return dataTree;
  },
  _bindSource: function () {
    this.data.on('datachanged', this.__OnDataChanged, this);
  },
  _unbindSource: function () {
    this.data.un('datachanged', this.__OnDataChanged, this);
  },
  showed: false,
  __OnDataChanged: function (e) {

    this._lastBodyWidth = this._lastBodyHeight = null;

    var taskUIDs = this._TaskUIDs = {};
    var indexs = this._TaskIndexs = {};
    var tops = this._TaskTops = {};

    var data = this.getVisibleRows();
    var scrollHeight = 0;

    for (var i = 0, l = data.length; i < l; i++) {
      var r = data[i];
      var h = mini.isNumber(r._height) ? r._height : this.rowHeight;

      taskUIDs[r.UID] = r;
      indexs[r._id] = i;
      tops[r._id] = scrollHeight;

      scrollHeight += h;
    }
    if (this.virtualModel == false) {
      this.scrollHeight = scrollHeight;
    }


    this.refresh();
  },
  refresh: function () {
    if (this.refreshTimer) clearTimeout(this.refreshTimer);
    var sf = this;
    this.refreshTimer = setTimeout(function () {
      sf.doRefresh();
    }, 1);
  },
  doRefresh: function () {

    if (this.refreshScrollComplete) return;


    var sss = new Date();

    this.vscrollerContentEl.style.height = this.scrollHeight + "px";


    var region = this.markRegion();

    this._refreshHeader(region);

    this._refreshViewport(region);


    this._doShowGridLines(region);


    this.linklinesEl.innerHTML = '';
    this._deferLinkLines();


    this.fire("refresh");
  },
  _deferLinkLines: function () {

    this.linklinesEl.innerHTML = '';
    var sf = this;
    if (this._drawLineTimer) clearTimeout(this._drawLineTimer);
    this._drawLineTimer = setTimeout(function () {
      var region = sf.markRegion();
      sf._doShowLinkLines(region);
    }, 100);
  },
  headerCellOffset: 2,
  _refreshHeader: function (region) {
    var startDate = region.startDate, endDate = region.endDate;
    var endTime = endDate.getTime();
    var h = this.headerHeight / 2;

    var boxModel = jQuery.boxModel;

    var bType = this.bottomTimeScale.type,
      bNumber = this.bottomTimeScale.number,
      bWidth = this.bottomTimeScale.width,
      balign = this.bottomTimeScale.align || "left",
      btooltip = this.bottomTimeScale.tooltip,
      bformatter = this.bottomTimeScale.formatter;
    var tType = this.topTimeScale.type,
      ttooltip = this.topTimeScale.tooltip,
      tformatter = this.topTimeScale.formatter,
      tNumber = this.topTimeScale.number,
      talign = this.topTimeScale.align || "left";

    var renderer = this.headerCellRenderer;
    var event = {};


    var sb = [];

    sb[sb.length] = '<div style="top:0px;height:' + h + 'px;" class="mini-ganttview-toptimescale">';
    var left = this.getOffsetByDate(startDate);

    event.timescale = this.topTimeScale;
    event.position = "top";

    for (var date = startDate; date.getTime() <= endTime;) {
      var next = this.getTimeScaleNextDate(date, tType, tNumber);

      var topLeft = this.getOffsetByDate(date);
      var topRight = this.getOffsetByDate(next);
      var offset = topLeft - left;
      var w = topRight - topLeft;

      var v = tformatter(date, "top");


      event.date = date;
      event.html = v;
      event.tooltip = ttooltip(date, "top");
      event.cls = "";
      event.style = "";
      if (renderer) renderer(event);


      sb[sb.length] = '<div time="';
      sb[sb.length] = date.getTime();
      sb[sb.length] = '" title="';
      sb[sb.length] = event.tooltip;
      sb[sb.length] = '" class="mini-ganttview-headercell ';
      sb[sb.length] = event.cls;
      sb[sb.length] = '" style="';
      sb[sb.length] = event.style;
      sb[sb.length] = ';left:';
      sb[sb.length] = offset;
      sb[sb.length] = 'px;width:';
      sb[sb.length] = boxModel ? w - 5 : w;
      sb[sb.length] = 'px;height:';
      sb[sb.length] = boxModel ? h - this.headerCellOffset : h;
      sb[sb.length] = 'px;top:0px;line-height:';
      sb[sb.length] = h - 3;
      sb[sb.length] = 'px;">';
      sb[sb.length] = event.html;
      sb[sb.length] = '</div>';

      date = next;
    }
    sb[sb.length] = '</div>';


    sb[sb.length] = '<div style="top:' + h + 'px;height:' + h + 'px;" class="mini-ganttview-bottomtimescale">';

    event.timescale = this.bottomTimeScale;
    event.position = "bottom";


    for (var date = startDate; date.getTime() <= endTime;) {
      var v = bformatter(date, "bottom", tType);
      var next = this.getTimeScaleNextDate(date, bType, bNumber);

      var topLeft = this.getOffsetByDate(date);
      var topRight = this.getOffsetByDate(next);
      var offset = topLeft - left;
      var w = topRight - topLeft;

      event.date = date;
      event.html = v;
      event.tooltip = btooltip(date, "bottom", tType);
      event.cls = "";
      event.style = "";
      if (renderer) renderer(event);

      sb[sb.length] = '<div time="';
      sb[sb.length] = date.getTime();
      sb[sb.length] = '" title="';
      sb[sb.length] = event.tooltip;
      sb[sb.length] = '" class="mini-ganttview-headercell ';
      sb[sb.length] = event.cls;
      sb[sb.length] = '" style="';
      sb[sb.length] = event.style;
      sb[sb.length] = ';left:';
      sb[sb.length] = offset;
      sb[sb.length] = 'px;width:';
      sb[sb.length] = boxModel ? w - 1 : w;
      sb[sb.length] = 'px;height:';
      sb[sb.length] = boxModel ? h - this.headerCellOffset : h;
      sb[sb.length] = 'px;top:0px;line-height:';
      sb[sb.length] = h - 3;
      sb[sb.length] = 'px;">';
      sb[sb.length] = event.html;
      sb[sb.length] = '</div>';


      date = next;
    }
    sb[sb.length] = '</div>';

    this._headerEl.innerHTML = sb.join("");
  },
  _refreshViewport: function (region, returns) {

    var rowHeight = this.rowHeight;
    var tType = this.topTimeScale.type, bType = this.bottomTimeScale.type;
    var data = this.getVisibleRows();
    var startRow = region.startRow, endRow = region.endRow;
    var offset = this.getOffsetByDate(region.startDate);
    this._ReadOnly = this.isReadOnly();

    var viewBox = this.getViewportBounds(region);
    var VLeft = viewBox.left, VTop = viewBox.top, VWidth = viewBox.width, VHeight = viewBox.height;

    var sb = [];

    var isTrack = this.isTrackModel();
    var isBaseline = false;

    var refreshItemID = this._refreshItem ? this._refreshItem._id : null;
    for (var i = startRow, l = endRow; i <= l; i++) {
      var record = data[i];
      if (!record) continue;
      if (!mini.isDate(record.Start) || !mini.isDate(record.Finish)
        || (refreshItemID && refreshItemID != record._id)
      ) {
        continue;
      }

      var itemBox = this.getItemBox(record, VLeft, VTop);
      this.createItem(record, itemBox, sb, refreshItemID, isTrack, false);
    }


    if (isTrack) {

      for (var i = startRow, l = endRow; i <= l; i++) {
        var record = data[i];
        if (!record) continue;
        var baseline = this.getBaseline(record);
        if (!baseline || !baseline.Start || !baseline.Finish) continue;
        var itemBox = this.getItemBox(record, VLeft, VTop, baseline);
        this.createItem(record, itemBox, sb, refreshItemID, isTrack, true);
      }
    }

    if (returns) return sb.join("");

    this.barsEl.innerHTML = sb.join("");
  },
  createItem: function (record, itemBox, sb, refreshItemID, isTrack, isBaseLine) {
    var h = itemBox.height;
    var top = itemBox.top;
    var left = itemBox.left;
    var right = itemBox.right;
    var w = right - left;
    if (w < 0) {
      return;
    }
    if (w < 2) w = 2;


    var boxModel = jQuery.boxModel;

    var percentComplete = record.PercentComplete || 0;
    var percentWidth = parseInt(w * percentComplete / 100);
    if (isBaseLine) percentWidth = 0;

    var isMilestone = this.isMilestone(record);

    var cls = "mini-gantt-item ";
    if (this.isCritical(record)) cls += " mini-gantt-critical ";
    var ex = this._OnItemDragStart(record, "move");
    if (!isBaseLine && !this._ReadOnly && !ex.cancel) cls += " mini-gantt-move ";
    if (isBaseLine) cls += " mini-gantt-baseline ";
    if (isTrack == true) cls += " mini-gantt-track ";

    var e = this._OnDrawItem(record, itemBox, isBaseLine);
    if (e.itemCls) {
      cls += " " + e.itemCls + " ";
    }
    if (e.itemHtml === null) {

      if (this.isSummary(record) && !isBaseLine) {

        sb[sb.length] = '<div id="';
        sb[sb.length] = record._id;
        sb[sb.length] = '" class="';
        sb[sb.length] = cls;
        sb[sb.length] = ' mini-gantt-summary" style="left:';
        sb[sb.length] = left;
        sb[sb.length] = 'px;top:';
        sb[sb.length] = top;
        sb[sb.length] = 'px;width:';
        sb[sb.length] = w;
        sb[sb.length] = 'px;"><div class="mini-gantt-summary-left"></div><div class="mini-gantt-summary-right"></div></div>';

      } else if (isMilestone) {
        if (isBaseLine) cls += " mini-gantt-baselinemilestone ";
        sb[sb.length] = '<div id="';
        sb[sb.length] = record._id;
        sb[sb.length] = '" class="';
        sb[sb.length] = cls;
        sb[sb.length] = ' mini-gantt-milestone" style="left:';
        sb[sb.length] = left;
        sb[sb.length] = 'px;top:';
        sb[sb.length] = top;
        sb[sb.length] = 'px;"></div>';
      } else {
        sb[sb.length] = '<div id="';
        sb[sb.length] = record._id;
        sb[sb.length] = '" class="';
        sb[sb.length] = cls;
        sb[sb.length] = '" style="left:';
        sb[sb.length] = left;
        sb[sb.length] = 'px;top:';
        sb[sb.length] = top;
        sb[sb.length] = 'px;height:';
        sb[sb.length] = boxModel ? h - 2 : h;
        sb[sb.length] = 'px;width:';
        sb[sb.length] = boxModel ? w - 2 : w;
        sb[sb.length] = 'px;"><div class="mini-gantt-percentcomplete" style="width:';
        sb[sb.length] = percentWidth;
        sb[sb.length] = 'px;"></div></div>';
      }
    } else {

      sb[sb.length] = e.itemHtml;
    }


    if (!isBaseLine && e.showLabel && !refreshItemID) {
      var label = mini.htmlEncode(e.label);
      var labelLeft = (right) + 5;
      if (isMilestone) {
        labelLeft += 10;
      }

      sb[sb.length] = '<div id="';
      sb[sb.length] = record._id;
      if (e.labelAlign == "left") {
        sb[sb.length] = '" class="mini-gantt-label" style="text-align:right;width:250px;left:';
        var labelRight = left - 255;
        sb[sb.length] = labelRight;
      } else {
        sb[sb.length] = '" class="mini-gantt-label" style="left:';
        sb[sb.length] = labelLeft;
      }

      sb[sb.length] = 'px;top:';
      sb[sb.length] = top - 4;
      sb[sb.length] = 'px;">';
      sb[sb.length] = label;
      sb[sb.length] = '</div>';


      if (e.label2) {
        sb[sb.length] = '<div id="';
        sb[sb.length] = record._id;
        if (e.label2Align == "left") {
          sb[sb.length] = '" class="mini-gantt-label" style="text-align:right;width:250px;left:';
          var labelRight = left - 255;
          sb[sb.length] = labelRight;
        } else {
          sb[sb.length] = '" class="mini-gantt-label" style="left:';
          sb[sb.length] = labelLeft;
        }

        sb[sb.length] = 'px;top:';
        sb[sb.length] = top - 4;
        sb[sb.length] = 'px;">';
        sb[sb.length] = mini.htmlEncode(e.label2);
        sb[sb.length] = '</div>';
      }
    }
  },
  refreshItem: function (item) {
    item = this.getItem(item);
    if (!item) return;
    this._refreshItem = item;
    var id = item._id;


    var region = this.markRegion();
    var doms = this.barsEl.getElementsByTagName('div');
    for (var i = 0, l = doms.length; i < l; i++) {
      var dom = doms[i];
      if (dom && (dom.id == this.id + "$" + id || dom.id == id)) {
        mini.removeNode(dom);
      }
    }


    var html = this._refreshViewport(region, true);
    mini.append(this.barsEl, html);

    this._doShowLinkLines(region);

    this._refreshItem = null;
  },
  _doShowGridLines: function (region) {

    var sss = new Date();
    var sb = [];
    var tType = this.topTimeScale.type,
      bType = this.bottomTimeScale.type,
      bNumber = this.bottomTimeScale.number;
    var rowHeight = this.rowHeight;
    var data = this.getVisibleRows();
    var boxModel = jQuery.boxModel;

    var startRow = region.startRow, endRow = region.endRow;
    var vwidth = this.viewportWidth, vheight = this.viewportHeight;
    if (this.showGridLines) {


      var top = 0;
      for (var i = startRow, l = endRow; i <= l; i++) {
        var record = data[i];
        if (!record) continue;
        var h = record._height ? record._height : rowHeight;


        var e = {row: record, cls: ''}
        this.fire('drawrow', e);

        sb[sb.length] = '<div id="';
        sb[sb.length] = record._id + "row";
        sb[sb.length] = '" class="mini-gantt-row ';
        sb[sb.length] = e.cls;
        sb[sb.length] = '" style="top:';
        sb[sb.length] = top;
        sb[sb.length] = 'px;height:';
        sb[sb.length] = boxModel ? h - 1 : h;
        sb[sb.length] = 'px;width:';
        sb[sb.length] = vwidth;
        sb[sb.length] = 'px;"></div>';

        top += h;
      }


      var startDate = region.startDate, endDate = region.endDate;

      var endTime = endDate.getTime();
      var left = this.getOffsetByDate(region.startDate);
      for (var date = startDate; date.getTime() <= endTime;) {
        var next = this.getTimeScaleNextDate(date, bType, bNumber);

        var topLeft = this.getOffsetByDate(date);
        var topRight = this.getOffsetByDate(next);
        var offset = topLeft - left;
        var w = topRight - topLeft;

        var cls = "mini-gantt-column ";
        var isWorking = this.isWorking(date, this.bottomTimeScale);
        if (!isWorking) {
          cls += "mini-gantt-offday ";
        }

        var e = {date: date, cls: ''}
        this.fire('drawcolumn', e);

        sb[sb.length] = '<div class="';
        sb[sb.length] = cls;
        sb[sb.length] = e.cls;
        sb[sb.length] = '" style="left:';
        sb[sb.length] = offset;
        sb[sb.length] = 'px;width:';
        sb[sb.length] = boxModel ? w - 1 : w;
        sb[sb.length] = 'px;height:';
        sb[sb.length] = vheight;
        sb[sb.length] = 'px;" ></div>';

        date = next;
      }


      var left = this.getOffsetByDate(region.startDate);
      var top = 0;
      for (var i = startRow, l = endRow; i <= l; i++) {
        var record = data[i];
        if (!record) continue;
        var h = record._height ? record._height : rowHeight;

        for (var date = startDate; date.getTime() <= endTime;) {
          var next = this.getTimeScaleNextDate(date, bType, bNumber);

          var topLeft = this.getOffsetByDate(date);
          var topRight = this.getOffsetByDate(next);
          var offset = topLeft - left;
          var w = topRight - topLeft;

          var e = {row: record, date: date, cls: '', html: ''}
          this.fire('drawcell', e);

          if (e.cls || e.html) {
            sb[sb.length] = '<div class="mini-gantt-cell ';
            sb[sb.length] = e.cls;
            sb[sb.length] = '" style="left:';
            sb[sb.length] = offset;
            sb[sb.length] = 'px;top:';
            sb[sb.length] = top;
            sb[sb.length] = 'px;height:';
            sb[sb.length] = boxModel ? h - 1 : h;
            sb[sb.length] = 'px;width:';
            sb[sb.length] = boxModel ? w - 1 : w;
            sb[sb.length] = 'px;">';
            sb[sb.length] = e.html;
            sb[sb.length] = '</div>';
          }

          date = next;
        }


        top += h;
      }
    }


    if (this.timeLines) {
      var LEFT = this.getOffsetByDate(region.startDate);
      for (var i = 0, l = this.timeLines.length; i < l; i++) {
        var tline = this.timeLines[i];
        var lineDate = tline.date;
        if (lineDate) {
          var title = tline.text || "";
          var style = tline.style || "";
          var left = this.getOffsetByDate(lineDate) - LEFT;
          var html = tline.html || '';
          sb[sb.length] = '<div title="' + title + '" style="' + style + ';left:' + left + 'px;height:' + (vheight - 18) + 'px;" class="mini-gantt-timeline">' + html + '</div>'

          var css = tline.position == 'top' ? "top: 2px;" : ("top:" + (vheight - 42) + "px;");
          if (tline.position == 'top' || tline.position == 'bottom') {
            sb[sb.length] = '<div style="' + css + 'left:' + (left + 4) + 'px;position:absolute;z-index:100;white-space:nowrap; " class="mini-gantt-timeline-label">' + title + '</div>'
          }

        }
      }
    }

    this.gridlinesEl.innerHTML = sb.join("");


  },
  markRegion: function () {

    var x = this.scrollLeft, y = this.scrollTop;
    if (mini.isNull(this.viewportWidth)) {
      this.viewportWidth = this.getViewportWidth();
      this.viewportHeight = this.getViewportHeight();
    }
    var width = this.viewportWidth, height = this.viewportHeight;
    var bottom = y + height, right = x + width;

    var rowHeight = this.rowHeight, timeScaleWidth = this.getBottomTimeScaleWidth();
    var tType = this.topTimeScale.type, bType = this.bottomTimeScale.type;
    var data = this.getVisibleRows();

    var startRow = 0, endRow = 0;


    var top = 0;
    for (var i = 0, l = data.length; i < l; i++) {
      var r = data[i];
      var h = r._height ? r._height : rowHeight;
      top += h;
      if (top >= y) {
        startRow = i;


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


    var startDate = this.getTimeScaleStartDate(this.getDateByOffset(x), bType, this.bottomTimeScale.number);
    var endDate = this.getTimeScaleStartDate(this.getDateByOffset(x + width), bType);

    var region = {
      startRow: startRow,
      endRow: endRow,
      startDate: startDate,
      endDate: endDate
    };

    if (this.inMaxTop) {

      var startRow = region.startRow;
      var count = data.length - region.endRow;
      region.startRow += count;
      region.endRow += count;


    }

    this.viewRegion = region;
    return region;
  },

  _vscrollTimer: null,
  _hscrollTimer: null,
  __onVScroll: function (e) {

    if (this.allowScroll === false) {

      return;
    }
    this._scrollLeft = this.hscrollerEl.scrollLeft;
    this._scrollTop = this.vscrollerEl.scrollTop;


    var sf = this;
    if (this._vscrollTimer) return;
    this._vscrollTimer = setTimeout(function () {
      sf.setScrollTop(sf._scrollTop);
      sf._vscrollTimer = null;

      sf.fire("scroll", {
        direction: "vertical"
      });
    }, 30);
  },
  __onHScroll: function (e) {
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
    }, 30);
  },
  __OnMousewheel: function (e, delta) {
    var oe = e;
    var e = e.wheelDelta ? e : e.originalEvent;

    var wheelDelta = e.wheelDelta || -e.detail * 24;
    var top = this.vscrollerEl.scrollTop;

    top -= wheelDelta;
    this.vscrollerEl.scrollTop = top;

    if (top == this.vscrollerEl.scrollTop) {
      oe.preventDefault();
    } else {

    }
  },

  getHeaderCellByEvent: function (event) {
    var t = mini.findParent(event.target, 'mini-ganttview-headercell');
    if (!t) return null;

    var position = mini.findParent(event.target, "mini-ganttview-toptimescale") ? "top" : "bottom";
    var timescale = position == "top" ? this.topTimeScale : this.bottomTimeScale;
    var date = new Date(parseInt($(t).attr("time")));
    return {
      position: position,
      timescale: timescale,
      date: date
    };
  },


  __OnClick: function (e) {
    var item = this.getItemByEvent(e);
    if (item) this._OnItemClick(item, e);

    var headerCell = this.getHeaderCellByEvent(e);
    if (headerCell) {
      if (this.headerCellClick) this.headerCellClick(headerCell);
    }

    if (mini.isAncestor(this._viewportEl, e.target) && !mini.findParent(e.target, 'mini-gantt-item')) {


      var date = this.getDateByPageX(e.pageX);

      var row = this.getRowByPageY(e.pageY);

      this.fire('cellclick', {date: date, row: row});

    }


  },
  __OnDblClick: function (e) {
    var item = this.getItemByEvent(e);
    if (item) this._OnItemDblClick(item, e);

    var link = this.getLinkByEvent(e);
    if (link) {
      if (confirm(mini.Gantt.DeleteLink)) {

        this.owner.removeLink(link);
        this.owner.fire("linkremove", {link: link});
      } else {

      }
      return;
    }

    if (mini.isAncestor(this._viewportEl, e.target) && !mini.findParent(e.target, 'mini-gantt-item')) {


      var date = this.getDateByPageX(e.pageX);

      var row = this.getRowByPageY(e.pageY);

      this.fire('celldblclick', {date: date, row: row});

    }
  },
  __OnMouseDown: function (e) {
    var item = this.getItemByEvent(e);
    if (item) this._OnItemMouseDown(item, e);
  },
  __OnContextMenu: function (e) {

    e.preventDefault();
    e.stopPropagation();

    var item = this.getItemByEvent(e);
    if (item) this._OnItemContextMenu(item, e);
  },


  getRowByPageY: function (y) {
    return this.getDragRecord(y);
  },

  getBottomTimeScaleWidth: function () {
    return this.bottomTimeScale.width;
  },
  getDateByPageX: function (x) {
    var region = this.viewRegion;
    var viewBox = this.getViewportBounds(region);
    var bodyBox = this.getViewportBox(region);
    var offset = x - bodyBox.x + viewBox.left;
    return this.getDateByOffset(offset);
  },
  getDragRecord: function (y) {
    var ganttview = this;
    var region = ganttview.markRegion();
    var viewBox = ganttview.getViewportBounds(region);
    var VLeft = viewBox.left, VTop = viewBox.top, VWidth = viewBox.width, VHeight = viewBox.height;

    var viewportBox = ganttview.getViewportBox();

    if (y < viewportBox.y || y > viewportBox.bottom) return null;
    var y = y - viewportBox.y;

    var dropNode = null;

    var data = ganttview.getVisibleRows();
    for (var i = region.startRow, l = region.endRow; i <= l; i++) {
      var node = data[i];
      if (!node) continue;

      var top = ganttview._TaskTops[node._id] - VTop;
      var height = mini.isNumber(node._height) ? node._height : ganttview.rowHeight;

      if (top <= y && y <= top + height) {
        dropNode = node;
        break;
      }
    }
    return dropNode;
  },
  getDateByOffset: function (offset) {


    var start = new Date(1900, 0, 1), finish = new Date(5000, 0, 1);

    var bType = this.bottomTimeScale.type;
    var sf = this;


    var width = this.bottomTimeScale.width / this.bottomTimeScale.number;

    function findDate() {
      var halfDate = new Date(start.getTime() + (finish - start) / 2);
      var nowOffset = sf.getOffsetByDate(halfDate);
      var jian = nowOffset - offset;
      if (Math.abs(jian) <= width) {

        switch (bType) {
          case "year":
            halfDate.setMonth(halfDate.getMonth() + -(12 / width) * jian);
            break;
          case "halfyear":
            halfDate.setMonth(halfDate.getMonth() + -(6 / width) * jian);
            break;
          case "quarter":
            halfDate.setMonth(halfDate.getMonth() + -(4 / width) * jian);
            break;
          case "month":
            halfDate.setDate(halfDate.getDate() + -(30 / width) * jian);
            break;
          case "tendays":
            halfDate.setDate(halfDate.getDate() + -(10 / width) * jian);
            break;
          case "week":
            halfDate.setDate(halfDate.getDate() + -(7 / width) * jian);
            break;
          case "day":
            halfDate.setHours(halfDate.getHours() + -(24 / width) * jian);
            break;
          case "hour":
            halfDate.setMinutes(halfDate.getMinutes() + -(60 / width) * jian);
            break;
          case "minutes":
            halfDate.setSeconds(halfDate.getSeconds() + -(60 / width) * jian);
            break;
          case "seconds":
            halfDate.setSeconds(halfDate.getSeconds() + -jian / width);
            break;
        }
        return halfDate;
      } else if (jian > 0) {
        finish = halfDate;
      } else if (jian < 0) {
        start = halfDate;
      }
      return findDate();
    }

    var date = findDate();
    return date;
  },

  getOffsetByDate: function (date) {
    var time = date - this.startDate;
    var oneWidth = this.bottomTimeScale.width / this.bottomTimeScale.number;
    switch (this.bottomTimeScale.type) {
      case "year":
        var Year = time / (1000 * 60 * 60 * 24 * 365);
        sw = oneWidth * Year;
        break;
      case "halfyear":
        var HalfYear = time / (1000 * 60 * 60 * 24 * 365 / 2);
        sw = oneWidth * HalfYear;
        break;
      case "quarter":
        var Quarter = time / (1000 * 60 * 60 * 24 * 365 / 4);
        sw = oneWidth * Quarter;
        break;
      case "month":
        var Month = time / (1000 * 60 * 60 * 24 * 30);
        sw = oneWidth * Month;
        break;
      case "tendays":
        var TenDays = time / (1000 * 60 * 60 * 24 * 10);
        sw = oneWidth * TenDays;
        break;
      case "week":
        var Week = time / (1000 * 60 * 60 * 24 * 7);
        sw = oneWidth * Week;
        break;
      case "day":
        var Day = time / (1000 * 60 * 60 * 24);
        sw = oneWidth * Day;
        break;
      case "hour":
        var Hour = time / (1000 * 60 * 60);
        sw = oneWidth * Hour;
        break;
      case "minutes":
        var Minutes = time / (1000 * 60);
        sw = oneWidth * Minutes;
        break;
      case "seconds":
        var Seconds = time / 1000;
        sw = oneWidth * Seconds;
        break;
    }

    return parseInt(sw);
  },
  _cloneDate: function (date) {
    return new Date(date.getTime());
  },
  _clearDate: function (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  },
  _addDate: function (date, type, num) {
    date = new Date(date.getTime());
    switch (type.toLowerCase()) {
      case "year":
        date.setFullYear(date.getFullYear() + num);
        break;


      case "month":
        date.setMonth(date.getMonth() + num);
        break;
      case "week":
        date.setDate(date.getDate() + (num * 7));
        break;
      case "day":
        date.setDate(date.getDate() + num);
        break;
      case "hour":
        date.setHours(date.getHours() + num);
        break;
      case "minutes":
        date.setMinutes(date.getMinutes() + num);
        break;
      case "seconds":
        date.setSeconds(date.getSeconds() + num);
        break;
    }
    return date;
  },
  getViewportBox: function () {

    var box = this.getBox(true);
    var headerHeight = this.getHeaderHeight();
    box.y += headerHeight;
    box.height -= headerHeight;
    box.bottom = box.y + box.height;
    return box;
  },
  getViewportBounds: function (region) {
    var row = this.getVisibleRows()[region.startRow];
    var box = {
      left: this.getOffsetByDate(region.startDate),
      top: row ? this._TaskTops[row._id] : 0,
      width: this.viewportWidth,
      height: this.viewportHeight
    };
    box.right = box.left + box.width;
    box.bottom = box.top + box.height;
    return box;
  },
  getItemTop: function (item) {
    return this._TaskTops[item._id];
  },
  getItemHeight: function (item) {
    var h = mini.isNumber(item._height) ? item._height : this.rowHeight;
    return h;
  },


  topOffset: 4,
  baselinePosition: 'bottom',

  baseLineBarHeight: 7,

  getItemBox: function (item, leftOffset, topOffset, baseline) {
    var start = baseline ? baseline.Start : item.Start;
    var finish = baseline ? baseline.Finish : item.Finish;

    var left = this.getOffsetByDate(start);


    if (this.isMilestone(item) && finish) {
      finish = new Date(finish.getFullYear(), finish.getMonth(), finish.getDate(), 23, 59, 59);
    }
    var right = this.getOffsetByDate(finish);
    var width = right - left;


    var height = this.getItemHeight(item);
    var top = this.getItemTop(item);

    leftOffset = leftOffset || 0;
    topOffset = topOffset || 0;
    left -= leftOffset;
    top -= topOffset;
    var box = {
      left: left,
      top: top + this.topOffset,
      width: width,
      height: height - 9,
      right: left + width,
      bottom: top + height
    };
    if (this.isMilestone(item) && !this.isSummary(item)) {
      box.width = 12;

      box.left = box.right - box.width;

      box.top = box.top - 3;
      box.height = 18;
      box.bottom = box.top + box.height;


    } else {
      if (this.isTrackModel()) {

        var barHeight = this.baseLineBarHeight;

        if (this.baselinePosition == 'bottom') {
          if (baseline) {
            box.top = top + height / 2 + 1;
            box.height = barHeight;
            box.bottom = box.top + box.height;
          } else {
            box.top = top + 2;
            box.height = barHeight;
            box.bottom = box.top + box.height;
          }
        } else {
          if (!baseline) {
            box.top = top + height / 2 + 1;
            box.height = barHeight;
            box.bottom = box.top + box.height;
          } else {
            box.top = top + 2;
            box.height = barHeight;
            box.bottom = box.top + box.height;
          }
        }
      }
    }
    box.x = box.left;
    box.y = box.top;

    return box;
  },
  getViewStartItem: function () {

    this.markRegion();

    return this.getVisibleRows()[this.viewRegion.startRow];
  },
  getViewStartDate: function () {
    return this.viewRegion.startDate;
  },

  getItem: function (id) {
    if (typeof id == "object") id = id._id;

    return this.data.getby_id(id);
  },
  getLink: function (item, preItem) {
    item = this.getItem(item);
    preItem = this.getItem(preItem);
    var link = this._linkHashed[item._id + "$$" + preItem._id];
    if (link) link.TaskUID = item.UID;
    if (!link) {
      link = this._linkHashed[preItem._id + "$$" + item._id];
      if (link) link.TaskUID = preItem.UID;
    }
    return link;
  },
  getItemByEvent: function (event) {
    var t = mini.findParent(event.target, 'mini-gantt-item');
    var id = t ? t.id : event.target.id;
    if (t) {
      var ids = id.split("$");
      id = ids[ids.length - 1];
    }
    var item = this.getItem(id);
    if (!item) {
      var t = mini.findParent(event.target, 'mini-gantt-item');
      if (t) {
        id = t.id;
        item = this.getItem(id);
      }
    }
    return item;
  },
  getLinkByEvent: function (event) {
    if (!mini.findParent(event.target, 'mini-gantt-line')) return;

    var id = event.target.id;
    var ids = id.split("$$");

    var link = this.getLink(ids[0], ids[1]);

    return link;
  },

  _doShowLinkLines: function (region) {
    if (!this.showLinkLines) return;
    var data = this.getVisibleRows();
    if (data.length == 0) return;
    var w = this.getBottomTimeScaleWidth();
    var rowHeight = this.rowHeight;
    var startRow = region.startRow, endRow = region.endRow;
    var startDate = region.startDate, endDate = region.endDate;
    var startTime = startDate.getTime(), endTime = endDate.getTime();


    var taskUIDs = this._TaskUIDs, indexs = this._TaskIndexs;
    var drawLinks = [];
    var linkHashed = this._linkHashed = {};
    var refreshItemId = this._refreshItem ? this._refreshItem._id : null;

    for (var i = 0, l = data.length; i < l; i++) {
      var task = data[i];
      var taskUID = task.UID;
      if (!task.Start || !task.Finish) continue;

      var start1 = task.Start.getTime(), finish1 = task.Finish.getTime();

      var index1 = indexs[task._id];
      var links = task.PredecessorLink;
      if (!links || links.length == 0) continue;

      for (var j = 0, k = links.length; j < k; j++) {
        var link = links[j];
        var preTask = taskUIDs[link.PredecessorUID];
        if (!preTask) continue;

        if (refreshItemId && (task._id != refreshItemId && preTask._id != refreshItemId)) continue;

        linkHashed[task._id + "$$" + preTask._id] = link;

        if (!preTask.Start || !preTask.Finish) continue;
        var start2 = preTask.Start.getTime(), finish2 = preTask.Finish.getTime();
        var index2 = indexs[preTask._id];


        if (
          (index1 >= startRow && index1 <= endRow)
          || (index2 >= startRow && index2 <= endRow)
          || (index1 < startRow && index2 > endRow)
          || (index2 < startRow && index1 > endRow)
        ) {

          if (start1 > endTime && start2 > endTime) {
          } else if (finish1 < startTime && finish2 < startTime) {
          } else {
            link.TaskUID = task.UID;
            drawLinks.push(link);
          }
        }
      }
    }


    this._doDrawLinks(drawLinks, region);
  },
  getFromTo: function (link) {
    var from = this._TaskUIDs[link.PredecessorUID];
    var to = this._TaskUIDs[link.TaskUID];
    return [from, to];
  },
  getLinkType: function (link) {
    return link.Type;
  },


  _doDrawLinks: function (drawLinks, region) {
    var data = this.getVisibleRows();
    if (data.length == 0) return;
    var timeWidth = this.getBottomTimeScaleWidth();
    var rowHeight = this.rowHeight;
    var startRow = region.startRow, endRow = region.endRow;
    var startDate = region.startDate, endDate = region.endDate;
    var startTime = startDate.getTime(), endTime = endDate.getTime();
    var taskUIDs = this._TaskUIDs, indexs = this._TaskIndexs;


    var viewBox = this.getViewportBounds(region);
    var VLeft = viewBox.left, VTop = viewBox.top, VWidth = viewBox.width, VHeight = viewBox.height;


    var drawLines = [];
    for (var i = 0, l = drawLinks.length; i < l; i++) {
      var link = drawLinks[i];
      var fromTo = this.getFromTo(link);
      var from = fromTo[0];
      var to = fromTo[1];


      if (!from || !to) continue;
      if (!from.Start || !from.Finish) continue;
      if (!to.Start || !to.Finish) continue;
      var fromBox = this.getItemBox(from, VLeft, VTop);
      var toBox = this.getItemBox(to, VLeft, VTop);


      if (fromBox.right < 0 && toBox.right < 0) continue;
      if (fromBox.bottom < 0 && toBox.bottom < 0) continue;
      if (fromBox.left > VWidth && toBox.left > VWidth) continue;
      if (fromBox.top > VHeight && toBox.top < VHeight) continue;

      var drawLine = [];
      drawLine.id = from._id + "$$" + to._id;

      switch (parseInt(this.getLinkType(link))) {
        case 0:
          if (fromBox.right < toBox.right) {
            var fromTop = fromBox.top + (fromBox.height / 2);
            var toTop = toBox.top;
            drawLine.arrowType = 'bottom';
            if (fromBox.top > toBox.top) {
              toTop = toBox.bottom;
              drawLine.arrowType = 'top';
            }

            var p1 = [fromBox.right, fromTop];
            var p2 = [toBox.right, fromTop];
            var p3 = [toBox.right, toTop];
            drawLine.push([p1, p2]);
            drawLine.push([p2, p3]);
          } else {
            var fromTop = fromBox.top + (fromBox.height / 2);
            var toTop = toBox.top + (toBox.height / 2);
            drawLine.arrowType = 'left';

            var p1 = [fromBox.right, fromTop];
            var p2 = [fromBox.right + 6, fromTop];
            var p3 = [fromBox.right + 6, toTop];
            var p4 = [toBox.right, toTop];
            drawLine.push([p1, p2]);
            drawLine.push([p2, p3]);
            drawLine.push([p3, p4]);
          }
          break;
        case 1:

          if (fromBox.right <= toBox.left) {
            var fromTop = fromBox.top + (fromBox.height / 2);
            var fromLeft = fromBox.right;
            var toTop = toBox.top;
            var toLeft = toBox.left;
            drawLine.arrowType = 'bottom';
            if (fromBox.top > toBox.top) {
              toTop = toBox.bottom;
              drawLine.arrowType = 'top';
            }
            var p1 = [fromLeft, fromTop];
            var p2 = [toLeft, fromTop];
            var p3 = [toLeft, toTop];

            if (fromBox.right == toBox.left) {
              p1 = [fromLeft, fromTop];
              p2 = [toLeft + 2, fromTop];
              p3 = [toLeft + 2, toTop];
            }

            drawLine.push([p1, p2]);
            drawLine.push([p2, p3]);
          } else {
            var fromTop = fromBox.top + (fromBox.height / 2);
            var fromLeft = fromBox.right;
            var toTop = toBox.top + (toBox.height / 2);
            var toLeft = toBox.left;
            var toTop2 = toBox.top - 4;
            drawLine.arrowType = 'right';
            if (fromBox.top > toBox.top) {
              toTop2 = toBox.bottom + 4;
            }

            var p1 = [fromLeft, fromTop];
            var p2 = [fromLeft + 6, fromTop];
            var p3 = [fromLeft + 6, toTop2];
            var p4 = [toLeft - 10, toTop2];
            var p5 = [toLeft - 10, toTop];
            var p6 = [toLeft, toTop];
            drawLine.push([p1, p2]);
            drawLine.push([p2, p3]);
            drawLine.push([p3, p4]);
            drawLine.push([p4, p5]);
            drawLine.push([p5, p6]);
          }
          break;
        case 3:
          if (fromBox.left < toBox.left) {
            var fromTop = fromBox.top + (fromBox.height / 2);
            var fromLeft = fromBox.left;
            var toTop = toBox.top + (toBox.height / 2);
            var toLeft = toBox.left;
            drawLine.arrowType = 'right';

            var p1 = [fromLeft, fromTop];
            var p2 = [fromLeft - 6, fromTop];
            var p3 = [fromLeft - 6, toTop];
            var p4 = [toLeft, toTop];
            drawLine.push([p1, p2]);
            drawLine.push([p2, p3]);
            drawLine.push([p3, p4]);
          } else {
            var fromTop = fromBox.top + (fromBox.height / 2);
            var fromLeft = fromBox.left;
            var toTop = toBox.top;
            var toLeft = toBox.left;
            drawLine.arrowType = 'bottom';
            if (fromBox.top > toBox.top) {
              toTop = toBox.bottom;
              drawLine.arrowType = 'top';
            }

            var p1 = [fromLeft, fromTop];
            var p2 = [toLeft, fromTop];
            var p3 = [toLeft, toTop];
            drawLine.push([p1, p2]);
            drawLine.push([p2, p3]);
          }
          break;
        case 2:
          if (fromBox.left < toBox.right) {
            var fromTop = fromBox.top + (fromBox.height / 2);
            var fromLeft = fromBox.left;
            var toTop = toBox.top + (toBox.height / 2);
            var toLeft = toBox.right;
            var toTop2 = toBox.top - 4;
            drawLine.arrowType = 'left';
            if (fromBox.top > toBox.top) {
              toTop2 = toBox.bottom + 4;
            }

            var p1 = [fromLeft, fromTop];
            var p2 = [fromLeft - 6, fromTop];
            var p3 = [fromLeft - 6, toTop2];
            var p4 = [toLeft + 10, toTop2];
            var p5 = [toLeft + 10, toTop];
            var p6 = [toLeft, toTop];
            drawLine.push([p1, p2]);
            drawLine.push([p2, p3]);
            drawLine.push([p3, p4]);
            drawLine.push([p4, p5]);
            drawLine.push([p5, p6]);
          } else {
            var fromTop = fromBox.top + (fromBox.height / 2);
            var fromLeft = fromBox.left;
            var toTop = toBox.top;
            var toLeft = toBox.right;
            drawLine.arrowType = 'bottom';
            if (fromBox.top > toBox.top) {
              toTop = toBox.bottom;
              drawLine.arrowType = 'top';
            }
            var p1 = [fromLeft, fromTop];
            var p2 = [toLeft, fromTop];
            var p3 = [toLeft, toTop];
            drawLine.push([p1, p2]);
            drawLine.push([p2, p3]);
          }
          break;
        default:
          throw new Error("");
          break;
      }
      drawLine.Critical = this.isCritical(from) && this.isCritical(to);

      drawLine.Cls = link.Cls;
      drawLines.push(drawLine);

      if (this.isCriticalLine && this.isCriticalLine(from, to, link)) {
        drawLine.Critical = true;
      }
    }


    this._doDrawLines(drawLines);

  },
  _doDrawLines: function (drawLines) {
    var Width = this.viewportWidth, Height = this.viewportHeight;
    var sb = [];
    for (var i = 0, l = drawLines.length; i < l; i++) {
      var lines = drawLines[i];
      var from = null;
      var to = null;
      var critical = lines.Critical;

      var cls = critical ? 'mini-gantt-line-critical' : '';
      if (lines.Cls) cls += " " + lines.Cls;

      var id = lines.id;
      for (var j = 0, k = lines.length; j < k; j++) {
        var line = lines[j];
        from = line[0];
        to = line[1];
        var left = from[0] < to[0] ? from[0] : to[0];
        var top = from[1] < to[1] ? from[1] : to[1];
        var width = Math.abs(to[0] - from[0]) + 1;
        var height = Math.abs(to[1] - from[1]) + 1;

        if (left > Width || left + width < 0) continue;
        if (top > Height || top + height < 0) continue;

        if (from[1] == to[1]) {
          if (left < 0) {
            width -= Math.abs(left)
            left = 0;
          }
          if (width + left > Width) width = Width - left;

          sb[sb.length] = '<div id="';
          sb[sb.length] = id;
          sb[sb.length] = '" style="left:';
          sb[sb.length] = left;
          sb[sb.length] = 'px;top:';
          sb[sb.length] = top
          sb[sb.length] = 'px;width:';
          sb[sb.length] = width;
          sb[sb.length] = 'px;" class="mini-gantt-line mini-gantt-line-h ';
          sb[sb.length] = cls;
          sb[sb.length] = '"></div>';
        } else {
          if (top < 0) {
            height -= Math.abs(top)
            top = 0;
          }
          if (height + top > Height) height = Height - top;

          sb[sb.length] = '<div id="';
          sb[sb.length] = id;
          sb[sb.length] = '" style="left:';
          sb[sb.length] = left;
          sb[sb.length] = 'px;top:';
          sb[sb.length] = top;
          sb[sb.length] = 'px;height:';
          sb[sb.length] = height;
          sb[sb.length] = 'px;" class="mini-gantt-line mini-gantt-line-v ';
          sb[sb.length] = cls;
          sb[sb.length] = '"></div>';
        }
      }
      sb[sb.length] = '<div id="';
      sb[sb.length] = id;
      sb[sb.length] = '" style="left:';
      sb[sb.length] = to[0];
      sb[sb.length] = 'px;top:';
      sb[sb.length] = to[1];
      sb[sb.length] = 'px;" class="mini-gantt-line mini-gantt-arrow-';
      sb[sb.length] = lines.arrowType;
      sb[sb.length] = critical ? ' mini-gantt-arrow-' + lines.arrowType + '-critical' : '';
      sb[sb.length] = '"></div>';

    }
    var lineString = sb.join('');

    this.linklinesEl.innerHTML = lineString;


  },

  getZoomTimeScale: function (noNumber) {
    var zoomTimeScales = this.zoomTimeScales;
    var zts = null;
    for (var i = 0, l = zoomTimeScales.length; i < l; i++) {
      var z = zoomTimeScales[i];
      var zt = z[0], zb = z[1];
      if (zt.type == this.topTimeScale.type && zt.number == this.topTimeScale.number
        && zb.type == this.bottomTimeScale.type && zb.number == this.bottomTimeScale.number
      ) {
        zts = z;
        break;
      }
      if (zb.type == this.bottomTimeScale.type && noNumber) {
        zts = z;
        break;
      }
    }
    if (!zts && noNumber) {
      zts = zoomTimeScales[6];
    }
    return zts;
  },
  zoomIn: function () {
    var ts = this.getZoomTimeScale();
    if (!ts) ts = this.getZoomTimeScale(true);
    var index = this.zoomTimeScales.indexOf(ts);
    index += 1;
    if (index >= this.zoomTimeScales.length) index = this.zoomTimeScales.length - 1;
    ts = this.zoomTimeScales[index];

    this.topTimeScale = ts[0];
    this.bottomTimeScale = ts[1];
    this.setDateRange(this._startDate, this._finishDate);

    this.layoutChanged();
  },
  zoomOut: function () {
    var ts = this.getZoomTimeScale();
    if (!ts) ts = this.getZoomTimeScale(true);
    var index = this.zoomTimeScales.indexOf(ts);
    index -= 1;
    if (index < 0) index = 0;
    ts = this.zoomTimeScales[index];

    this.topTimeScale = ts[0];
    this.bottomTimeScale = ts[1];
    this.setDateRange(this._startDate, this._finishDate);

    this.layoutChanged();
  },
  scrollIntoView: function (record, toFinish) {
    if (!record) return;
    var date = mini.isDate(record) ? record : record.Start;
    if (toFinish && !mini.isDate(record)) {
      date = record.Finish;
    }
    if (!date) return;

    this.markRegion();

    var offset = this.getOffsetByDate(date);
    var width = this.getWidth(true);
    if (toFinish) {

      this.setScrollLeft(offset - width / 2);

    } else {
      if (this.scrollLeft < offset && offset < this.scrollLeft + width) {
      } else {
        this.setScrollLeft(offset - width / 2);
      }
    }
  },
  scrollToDate: function (date, toFinish) {
    if (!mini.isDate(date)) return;
    var offset = this.getOffsetByDate(date);
    var width = this.getWidth(true);
    if (toFinish) {

      this.setScrollLeft(offset - width / 2);

    } else {
      if (this.scrollLeft < offset && offset < this.scrollLeft + width) {
      } else {
        this.setScrollLeft(offset - width / 2);
      }
    }
  },

  _OnItemDragTipNeeded: function (item) {
    var e = {
      item: item,
      tooltip: "",
      cls: ''
    }
    this.fire("ItemDragTipNeeded", e);
    return e;
  },
  _OnScrollToolTipNeeded: function (item) {
    var e = {
      item: item,
      tooltip: item ? item.Name : "",
      cls: ''
    };
    if (e.item) {
      this.fire("ScrollToolTipNeeded", e);
    }
    return e;
  },
  _OnDateToolTipNeeded: function (date) {
    var tip = this.bottomTimeScale.tooltip(date, "bottom", this.bottomTimeScale.type);
    var e = {date: date, tooltip: tip, cls: ''};
    this.fire("DateToolTipNeeded", e);
    return e;
  },
  _OnItemToolTipNeeded: function (item) {

    var baseline = item.isBaseline ? this.getBaseline(item) : null;
    delete item.isBaseline;

    var tip = item.Name;
    var e = {item: item, tooltip: tip, cls: '', baseline: baseline};
    this.fire("ItemToolTipNeeded", e);
    return e;
  },
  _OnLinkToolTipNeeded: function (link) {
    var fromItem = this._TaskUIDs[link.PredecessorUID];
    var toItem = this._TaskUIDs[link.TaskUID];
    var e = {link: link, tooltip: '', cls: '', fromItem: fromItem, toItem: toItem};
    this.fire("LinkToolTipNeeded", e);
    return e;
  },
  _OnItemMouseDown: function (item, event) {
    var e = {item: item, htmlEvent: event};
    this.fire("ItemMouseDown", e);
  },
  _OnItemClick: function (item, event) {
    var e = {item: item, htmlEvent: event};
    this.fire("ItemClick", e);
  },
  _OnItemDblClick: function (item, event) {
    var e = {item: item, htmlEvent: event};
    this.fire("ItemDblClick", e);
  },
  _OnItemContextMenu: function (item, event) {
    var e = {item: item, htmlEvent: event};
    this.fire("ItemContextMenu", e);
  },


  _OnDrawItem: function (item, itemBox, isBaseLine) {
    var e = {
      baseline: isBaseLine,
      item: item,
      itemBox: itemBox,
      itemCls: null,
      itemStyle: null,
      itemHtml: null,
      showLabel: this.showLabel,
      labelField: this.labelField,
      label: item[this.labelField],
      labelAlign: "right"
    };
    this.fire("DrawItem", e);
    return e;
  },

  _OnItemDragStart: function (item, action) {
    var cancel = false;
    action = action.toLowerCase();
    if (action == "start") {
      cancel = this.isSummary(item) || this.isMilestone(item);
    }
    if (action == "finish") {
      cancel = this.isSummary(item) || this.isMilestone(item);
    }
    if (action == "percentcomplete") {
      cancel = this.isSummary(item) || this.isMilestone(item);
    }

    if (action == "move") {
      cancel = this.isSummary(item);
    }
    var e = {
      item: item,
      action: action,
      cancel: cancel,
      dragUpdown: false
    };
    this.fire("ItemDragStart", e);
    return e;
  },
  _OnItemDragMove: function (item, drag, action) {
    var e = {
      item: item,
      drag: drag,
      action: action
    };
    this.fire("ItemDragMove", e);
    return e;
  },
  _OnItemDragDrop: function (item, dropNode) {
    var e = {
      item: item,
      dropNode: dropNode,
      cancel: false
    };
    this.fire("ItemDragDrop", e);
    return e;
  },
  _OnItemDragComplete: function (item, action, value, dropNode) {
    var e = {
      item: item,
      action: action.toLowerCase(),
      value: value,
      dropNode: dropNode
    };
    this.fire("ItemDragComplete", e);
    return e;
  }
});


mini.GanttView.prototype.getTimeScaleStartDate = function (date, type, number) {

  if (!number) number = 1;

  var y = date.getFullYear(), mo = date.getMonth(), d = date.getDate(), h = date.getHours(), m = date.getMinutes(),
    s = date.getSeconds();
  switch (type) {
    case "year":
      date = new Date(y, 0, 1);
      break;
    case "halfyear":
      if (mo < 6) {
        date = new Date(y, 0, 1);
      } else {
        date = new Date(y, 6, 1);
      }
      break;
    case "quarter":
      if (mo < 3) {
        date = new Date(y, 0, 1);
      } else if (mo < 6) {
        date = new Date(y, 3, 1);
      } else if (mo < 9) {
        date = new Date(y, 6, 1);
      } else {
        date = new Date(y, 9, 1);
      }
      break;
    case "month":
      date = new Date(y, mo, 1);
      break;
    case "tendays":

      if (d <= 10) {
        date = new Date(y, mo, 1);
      } else if (d <= 20) {
        date = new Date(y, mo, 11);
      } else {
        date = new Date(y, mo, 21);
      }
      break;
    case "week":

      date = mini.getWeekStartDate(date, this.weekStartDay);
      break;
    case "day":

      if (number > 1) {
        d = parseInt(d / number) * number;
      }

      date = new Date(y, mo, d);
      break;
    case "hour":

      if (number > 1) {
        h = parseInt(h / number) * number;
      }

      date = new Date(y, mo, d, h);

      break;
    case "minutes":
      if (number > 1) {
        m = parseInt(m / number) * number;
      }

      date = new Date(y, mo, d, h, m);
      break;
    case "seconds":
      if (number > 1) {
        s = parseInt(s / number) * number;
      }

      date = new Date(y, mo, d, h, m, s);
      break;
  }
  return date;
};
mini.GanttView.prototype.getTimeScaleNextDate = function (date, type, number) {
  var number = number || 1;
  weekStartDay = this.weekStartDay;
  var next;
  for (var i = 0; i < number; i++) {
    var y = date.getFullYear(), mo = date.getMonth(), d = date.getDate(), h = date.getHours(), m = date.getMinutes(),
      s = date.getSeconds();
    switch (type) {
      case "year":
        next = new Date(y + 1, 0, 1);
        break;
      case "halfyear":
        if (mo < 6) {
          next = new Date(y, 6, 1);
        } else {
          next = new Date(y + 1, 0, 1);
        }
        break;
      case "quarter":
        if (mo < 3) {
          next = new Date(y, 3, 1);
        } else if (mo < 6) {
          next = new Date(y, 6, 1);
        } else if (mo < 9) {
          next = new Date(y, 9, 1);
        } else {
          next = new Date(y + 1, 0, 1);
        }
        break;
      case "month":
        next = new Date(y, mo + 1, 1);
        break;
      case "tendays":

        if (d <= 10) {
          next = new Date(y, mo, 11);
        } else if (d <= 20) {
          next = new Date(y, mo, 21);
        } else {
          next = new Date(y, mo + 1, 1);
        }
        break;
      case "week":
        next = mini.getNextWeekStartDate(date, weekStartDay);
        break;
      case "day":
        next = new Date(y, mo, d + 1);
        break;
      case "hour":
        next = new Date(y, mo, d, h + 1);
        break;
      case "minutes":
        next = new Date(y, mo, d, h, m + 1);
        break;
      case "seconds":
        next = new Date(y, mo, d, h, m, s + 1);
        break;
    }
    date = next;
  }
  return next;
};





mini.GanttView.TimeScale = {
  year: {
    type: "year",
    width: 40,
    number: 1,
    align: "center",
    index: 0,
    tooltip: function (date, position) {
      return date.getFullYear();
    },
    formatter: function (date, position, topTimeScale) {
      if (position == "top") {
        return date.getFullYear();
      } else {
        return date.getFullYear();
      }
    }
  },
  halfyear: {
    type: "halfyear",
    width: 24,
    number: 1,
    align: "center",
    index: 1,
    tooltip: function (date, position) {
      return date.getFullYear() + "-" + String.leftPad(date.getMonth() + 1);
    },
    formatter: function (date, position, topTimeScale) {
      var s = "";
      var m = date.getMonth();
      if (m < 6) s += "H" + 1;
      else s += "H" + 2;

      return s;
    }
  },
  quarter: {
    type: "quarter",
    width: 24,
    number: 1,
    align: "center",
    index: 3,
    tooltip: function (date, position) {
      return date.getFullYear() + "-" + String.leftPad(date.getMonth() + 1);
    },
    formatter: function (date, position, topTimeScale) {
      var s = "";
      var m = date.getMonth();
      if (m < 3) s += "Q" + 1;
      else if (m < 6) s += "Q" + 2;
      else if (m < 9) s += "Q" + 3;
      else s += "Q" + 4;

      if (position == "top") s = date.getFullYear() + "" + s;
      return s;
    }
  },
  month: {
    type: "month",
    width: 24,
    number: 1,
    align: "center",
    index: 4,
    tooltip: function (date, position) {
      return date.getFullYear() + "-" + String.leftPad(date.getMonth() + 1);
    },
    formatter: function (date, position, topTimeScale) {
      var s = date.getMonth() + 1;
      if (position == "top") s = date.getFullYear() + "-" + String.leftPad(s);
      return s;
    }
  },
  week: {
    type: "week",
    width: 24,
    number: 1,
    align: "center",
    index: 5,
    tooltip: function (date, position) {
      var s = date.getFullYear() + "-" + String.leftPad(date.getMonth() + 1) + "-" + String.leftPad(date.getDate());
      var next = new Date(date.getTime());
      next.setDate(next.getDate() + 6);
      s += " ~ ";
      s += next.getFullYear() + "-" + String.leftPad(next.getMonth() + 1) + "-" + String.leftPad(next.getDate());
      return s;
    },
    formatter: function (date, position, topTimeScale) {
      if (position == "top") {
        return date.getFullYear() + "-" + String.leftPad(date.getMonth() + 1) + "-" + String.leftPad(date.getDate());
      } else {
        return date.getDate();
      }
    }
  },
  day: {
    type: "day",
    width: 24,
    number: 1,
    align: "center",
    index: 6,
    tooltip: function (date, position) {
      return date.getFullYear() + "-" + String.leftPad(date.getMonth() + 1) + "-" + String.leftPad(date.getDate())
        + " " + mini.GanttView.LongWeeks[date.getDay()];
    },
    formatter: function (date, position, topTimeScale) {
      if (position == "top") {
        return date.getFullYear() + "-" + String.leftPad(date.getMonth() + 1) + "-" + String.leftPad(date.getDate());
      } else {
        if (topTimeScale == "week") {
          return mini.GanttView.ShortWeeks[date.getDay()];
        } else {
          return date.getDate();
        }
      }
    }
  },
  hour: {
    type: "hour",
    width: 20,
    number: 1,
    align: "center",
    index: 7,
    tooltip: function (date, position) {
      return date.getFullYear() + "-" + String.leftPad(date.getMonth() + 1) + "-" + String.leftPad(date.getDate()) + " " + String.leftPad(date.getHours());
    },
    formatter: function (date, position, topTimeScale) {
      if (position == "top") {
        return date.getFullYear() + "-" + String.leftPad(date.getMonth() + 1) + "-" + String.leftPad(date.getDate()) + " " + String.leftPad(date.getHours());
      } else {
        return String.leftPad(date.getHours());
      }
    }
  },
  minutes: {
    type: "minutes",
    width: 20,
    number: 1,
    align: "center",
    index: 8,
    tooltip: function (date, position) {
      return date.getFullYear() + "-" + String.leftPad(date.getMonth() + 1) + "-" + String.leftPad(date.getDate()) + " " + String.leftPad(date.getHours()) + ":" + String.leftPad(date.getMinutes());
    },
    formatter: function (date, position, topTimeScale) {
      if (position == "top") {
        return date.getFullYear() + "-" + String.leftPad(date.getMonth() + 1) + "-" + String.leftPad(date.getDate()) + " " + String.leftPad(date.getHours()) + ":" + String.leftPad(date.getMinutes());
      } else {
        return String.leftPad(date.getMinutes());
      }
    }
  },
  seconds: {
    type: "seconds",
    width: 20,
    number: 1,
    align: "center",
    index: 9,
    tooltip: function (date, position) {
      return date.getFullYear() + "-" + String.leftPad(date.getMonth() + 1) + "-" + String.leftPad(date.getDate()) + " " + String.leftPad(date.getHours()) + ":" + String.leftPad(date.getMinutes()) + ":" + String.leftPad(date.getSeconds());
    },
    formatter: function (date, position, topTimeScale) {
      if (position == "top") {
        return date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      } else {
        return String.leftPad(date.getSeconds());
      }
    }
  }
};
mini.GanttView.ShortWeeks = [
  "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"
];
mini.GanttView.LongWeeks = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
mini.GanttView.getTimeScale = function (timescale) {
  var type = typeof timescale == "string" ? timescale : timescale.type;
  var o = mini.GanttView.TimeScale[type.toLowerCase()];
  if (o) {
    o = mini.copyTo({}, o);
  }
  if (o && typeof timescale != "string") {
    o = mini.copyTo(o, timescale);
  }

  return o;
}
mini.GanttView.createZoomTimeScales = function () {

  var zoomTimeScales = [];

  var top = mini.GanttView.getTimeScale("year");
  var bottom = mini.GanttView.getTimeScale("halfyear");
  zoomTimeScales.push([top, bottom]);


  var top = mini.GanttView.getTimeScale("year");
  var bottom = mini.GanttView.getTimeScale("quarter");
  zoomTimeScales.push([top, bottom]);


  var top = mini.GanttView.getTimeScale("year");
  var bottom = mini.GanttView.getTimeScale("month");
  zoomTimeScales.push([top, bottom]);


  var top = mini.GanttView.getTimeScale("quarter");
  var bottom = mini.GanttView.getTimeScale("month");
  bottom.width = 24;
  zoomTimeScales.push([top, bottom]);


  var top = mini.GanttView.getTimeScale("month");
  var bottom = mini.GanttView.getTimeScale("week");
  zoomTimeScales.push([top, bottom]);


  var top = mini.GanttView.getTimeScale("month");
  var bottom = mini.GanttView.getTimeScale("day");
  bottom.number = 3;
  zoomTimeScales.push([top, bottom]);


  var top = mini.GanttView.getTimeScale("week");
  var bottom = mini.GanttView.getTimeScale("day");
  zoomTimeScales.push([top, bottom]);


  var top = mini.GanttView.getTimeScale("day");
  var bottom = mini.GanttView.getTimeScale("hour");
  bottom.number = 6;
  zoomTimeScales.push([top, bottom]);


  var top = mini.GanttView.getTimeScale("day");
  var bottom = mini.GanttView.getTimeScale("hour");
  bottom.number = 2;
  zoomTimeScales.push([top, bottom]);


  var top = mini.GanttView.getTimeScale("day");
  var bottom = mini.GanttView.getTimeScale("hour");
  bottom.number = 1;
  zoomTimeScales.push([top, bottom]);

  return zoomTimeScales;
};


