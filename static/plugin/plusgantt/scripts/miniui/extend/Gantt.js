mini.Gantt = function () {
  mini.Gantt.superclass.constructor.call(this);

  this.newProject();


  this.ganttView.showCriticalPath = this.showCriticalPath;
}
mini.extend(mini.Gantt, mini.Splitter, {

  allowLinkBars: true,

  width: 450,
  height: 200,

  expandOnLoad: true,
  baselinePosition: "bottom",

  baselineIndex: 0,
  viewModel: "gantt",
  setShowLinkLines: function (value) {
    this.ganttView.showLinkLines = value;
  },
  setViewModel: function (value) {
    this.viewModel = value;
    this.ganttView.setViewModel(value);
  },
  setBaselineIndex: function (value) {
    this.baselineIndex = value;
    this.ganttView.baselineIndex = value;
    this.ganttView.doLayout();
  },
  setBaselinePosition: function (value) {
    this.baselinePosition = value;
    this.ganttView.baselinePosition = value;
    this.ganttView.doLayout();
  },
  refresh: function () {
    this.syncTasks();
    this.doLayout();
  },
  editOnDblClick: false,
  setEditOnDblClick: function (value) {
    this.tableView.editOnDblClick = value;
  },

  data: null,

  headerHeight: 36,
  rowHeight: 21,
  columnWidth: 100,

  tableWidth: "50%",
  splitWidth: 4,
  minViewWidth: 100,

  treeColumn: null,
  columns: null,

  readOnly: false,
  allowDragDrop: false,
  multiSelect: false,

  showDirty: true,

  showGridLines: true,
  timeLines: null,

  showTableView: true,
  showGanttView: true,
  tableViewExpanded: true,
  ganttViewExpanded: true,

  allowResize: true,
  setAllowResize: function (value) {
    this.allowResize = value;
    this.doLayout();
  },

  uiCls: "mini-gantt",
  _create: function () {
    mini.Gantt.superclass._create.call(this);
    this._createTableView();
    this._createGanttView();

    this.pane1.showCollapseButton = true;
    this.pane2.showCollapseButton = true;


    this._resizeEl = mini.append(this._borderEl, '<div class="mini-resizer-trigger" style=""></div>');
    this._Resizer = new mini._Resizer(this);
  },
  tableViewType: "SuperTree",
  _createTableView: function () {
    this.tableView = new mini[this.tableViewType]();
    this.tableView.set({
      headerHeight: this.headerHeight,
      rowHeight: this.rowHeight,
      columnWidth: this.columnWidth,
      allowAlternating: false,
      borderStyle: "border:0;",
      style: "width:100%;height:100%;"


    });
    this.tableView.owner = this;
    this.tableView.render(this.getPaneEl(1));
  },
  ganttViewType: "GanttView",
  _createGanttView: function () {
    this.ganttView = new mini[this.ganttViewType]();
    this.ganttView.set({
      headerHeight: this.headerHeight,
      rowHeight: this.rowHeight,
      style: "width:100%;height:100%"
    });
    this.ganttView.isWorking = mini.createDelegate(this.isWorking, this);
    this.ganttView.owner = this;
    this.ganttView.render(this.getPaneEl(2));
  },
  _initEvents: function () {
    mini.Gantt.superclass._initEvents.call(this);
    var sf = this;

    this.tableView.on("scroll", this.__OnTableViewScroll, this);
    this.ganttView.on("scroll", this.__OnGanttViewScroll, this);

    this.tableView.on("beforeselect", function (e) {
      e.task = e.record;
      this.fire("beforeselect", e);
    }, this);

    this.tableView.on("drawcell", function (e) {
      e.task = e.record;
      this.fire("drawcell", e);
    }, this);


    this.ganttView.on("drawitem", function (e) {
      e.task = e.item;
      this.fire("drawitem", e);
    }, this);


    this.tableView.on("cellbeginedit", this.__OnTableViewCellBeginEdit, this);
    this.tableView.on("cellcommitedit", this.__OnTableViewCellCommitEdit, this);
    this.ganttView.on("itemdragstart", this.__OnGanttViewItemDragStart, this);
    this.ganttView.on("itemdragcomplete", this.__OnGanttViewItemDragComplete, this);


    this.ganttView.on("ScrollToolTipNeeded", this.__OnGanttViewScrollToolTipNeeded, this);
    this.ganttView.on("itemtooltipneeded", this.__OnGanttViewItemToolTipNeeded, this);
    this.ganttView.on("LinkToolTipNeeded", this.__OnGanttViewLinkToolTipNeeded, this);
    this.ganttView.on("ItemDragTipNeeded", this.__OnGanttViewItemDragTipNeeded, this);


    this.tableView.on("cellmousedown", function (e) {
      e.task = e.record;
      this.fire("taskmousedown", e);
    }, this);
    this.tableView.on("cellclick", function (e) {
      e.task = e.record;
      this.fire("taskclick", e);
    }, this);
    this.tableView.on("celldblclick", function (e) {
      e.task = e.record;
      this.fire("taskdblclick", e);
    }, this);

    this.ganttView.on("itemmousedown", function (e) {
      e.task = e.item;
      if (this.multiSelect) {
        if (this.isSelected(e.item)) {

        } else {
          this.deselectAll();
        }
        this.select(e.item, true, false);
      } else {
        this.deselectAll();
        this.select(e.item, true, false);
      }
      this.fire("taskmousedown", e);
    }, this);
    this.ganttView.on("itemclick", function (e) {
      e.task = e.item;
      this.fire("taskclick", e);
    }, this);
    this.ganttView.on("itemdblclick", function (e) {

      e.task = e.item;
      this.fire("taskdblclick", e);
    }, this);


    this.tableView.on("expand", function (e) {
      e.task = e.node;
      this.fire("expandtask", e);
    }, this);
    this.tableView.on("collapse", function (e) {
      e.task = e.node;
      this.fire("collapsetask", e);
    }, this);

    this.tableView.on("RowDragStart", function (e) {
      e.task = e.record;
      this.fire("taskdragstart", e);
    }, this);
    this.tableView.on("rowdragdrop", function (e) {
      e.tasks = e.records;
      e.targetTask = e.targetRecord;
      this.fire("taskdragdrop", e);

      if (e.cancel == false) {
        this.fire("dodragdrop", e);
      }
      e.cancel = true;
    }, this);

    this.on("beforecollapse", this.__OnBeforeCollapse, this);
    this.on("beforeexpand", this.__OnBeforeExpand, this);

  },
  __OnTableViewScroll: function (e) {
    if (e.direction == "vertical") {


      if (this.showGanttView == true && this.ganttViewExpanded == true) {
        this.ganttView.setScrollTop(this.tableView.scrollTop);
      }


    }
  },
  __OnGanttViewScroll: function (e) {
    if (e.direction == "vertical") {

      if (this.ganttView.refreshScrollComplete) {
      } else {
        if (this.showTableView == true && this.tableViewExpanded == true) {
          this.tableView.setScrollTop(this.ganttView.scrollTop);
        }
      }
    }
  },
  __OnTableViewCellBeginEdit: function (e) {
    e.task = e.record;
    this.fire("cellbeginedit", e);
  },
  __OnTableViewCellCommitEdit: function (e) {
    e.task = e.record;
    this.fire("cellcommitedit", e);

    if (e.cancel == false) {
      this.fire("aftercellcommitedit", e);
    }
  },
  __OnGanttViewItemDragStart: function (e) {
    this.fire("itemdragstart", e);
  },
  __OnGanttViewItemDragComplete: function (e) {
    this.fire("itemdragcomplete", e);
  },
  __OnGanttViewScrollToolTipNeeded: function (e) {
    e.tooltip = mini.Gantt.ID_Text + '：' + e.item.ID + "<br/>" + mini.Gantt.Name_Text + '：' + e.item.Name;
  },
  __OnGanttViewItemToolTipNeeded: function (e) {
    e.task = e.item;
    var task = e.item;

    function format(date) {
      if (mini.isDate(date)) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "";
      } else {
        return "";
      }
    };
    e.tooltip = "";

    var start = task.Start, finish = task.Finish, duration = task.Duration;
    if (e.baseline) {
      e.tooltip += "<div style='text-align:center;'><b >" + mini.Gantt.Baseline_Text + "</b></div>";
      start = e.baseline.Start;
      finish = e.baseline.Finish;

      if (!mini.isNull(e.baseline.Duration)) {
        duration = e.baseline.Duration;
      }

    } else if (task.Summary) {
      e.tooltip += "<div style='text-align:center;'><b >" + mini.Gantt.Summary_Text + "</b></div>";
    } else if (task.Critical) {
      e.tooltip += "<div style='text-align:center;'><b >" + mini.Gantt.Critical_Text + "</b></div>";
    } else {
      e.tooltip += "<div style='text-align:center;'><b >" + mini.Gantt.Task_Text + "</b></div>";
    }
    e.tooltip += "<div>" + mini.Gantt.Name_Text + "：" + task.Name + "</div>"
      + "<div ><div style='float:left;'>" + mini.Gantt.PercentComplete_Text + "：<b>" + task.PercentComplete + "%</b></div>"
      + "<div style='float:right;'>" + mini.Gantt.Duration_Text + "：" + duration + "</div></div>"
      + "<div style='clear:both;'>" + mini.Gantt.Start_Text + "：" + format(start) + "</div>"
      + "<div>" + mini.Gantt.Finish_Text + "：" + format(finish) + "</div>";
    this.fire("itemtooltipneeded", e);
  },
  __OnGanttViewLinkToolTipNeeded: function (e) {

    var fromItem = e.fromItem, toItem = e.toItem, link = e.link;
    var tip = "" + mini.Gantt.LinkType_Text + "：" + mini.Gantt.PredecessorLinkType[link.Type].Name
      + "<br/>" + mini.Gantt.LinkLag_Text + "：" + (link.LinkLag || 0) + ""
      + "<br/>" + mini.Gantt.From_Text + "：" + fromItem.Name + ""
      + "<br/>" + mini.Gantt.To_Text + "：" + toItem.Name + ""
    e.tooltip = tip;
    this.fire("linktooltipneeded", e);
  },
  __OnGanttViewItemDragTipNeeded: function (e) {
    var tip = "";
    var item = e.item;
    e.task = item;
    if (!item || !item.Start || !item.Finish) {

    } else {
      var d1 = this.ganttView.bottomTimeScale.tooltip(item.Start, "bottom", this.ganttView.bottomTimeScale.type);
      var d2 = this.ganttView.bottomTimeScale.tooltip(item.Finish, "bottom", this.ganttView.bottomTimeScale.type);
      tip = mini.Gantt.Name_Text + "：" + item.Name
        + "<br/>" + mini.Gantt.PercentComplete_Text + "：<b>" + item.PercentComplete + "%</b>"
        + "<br/>" + mini.Gantt.Start_Text + "：<b>" + d1 + "</b>"
        + "<br/>" + mini.Gantt.Finish_Text + "：<b>" + d2 + "</b>";
    }
    e.tooltip = tip;
    this.fire("TaskDragTipNeeded", e);
  },

  isWorking: function (date, timescale) {
    if (!this.data) return true;
    var type = timescale.type;
    if (
      (type == "day" && timescale.number > 1)
      || type == "week" || type == "month" || type == "quarter" || type == "halfyear"
    ) return true;

    var dayOfWeek = date.getDay(), dateTime = date.getTime();
    if (dayOfWeek == 6 || dayOfWeek == 0) return false;
    return true;
  },


  doLayout: function () {
    if (!this.canLayout()) return;

    this._resizeEl.style.display = this.allowResize ? "" : "none";

    mini.Gantt.superclass.doLayout.call(this);


    if (this.ganttViewExpanded == false || this.showGanttView == false) {

      this.tableView.setShowVScroll(true);
    } else {

      this.tableView.setShowVScroll(false);
    }
  },
  __OnBeforeExpand: function (e) {
    e.cancel = true;
    if (e.paneIndex == 1) {
      this.setTableViewExpanded(true);
    } else {
      this.setGanttViewExpanded(true);
    }
  },
  __OnBeforeCollapse: function (e) {
    e.cancel = true;
    if (e.paneIndex == 1) {
      this.setTableViewExpanded(false);
    } else {
      this.setGanttViewExpanded(false);
    }
  },
  setShowGanttView: function (value) {
    if (this.showGanttView != value) {
      this.showGanttView = value;
      this._allowLayout = false;
      if (value) {
        this.showPane(2);
      } else {
        this.hidePane(2);
      }

      this._doShow();
      this.ganttView.setScrollTop(this.tableView.getScrollTop());
    }
  },
  setShowTableView: function (value) {
    if (this.showTableView != value) {
      this.showTableView = value;
      this._allowLayout = false;
      if (value) {
        this.showPane(1);
      } else {
        this.hidePane(1);
      }
      this._doShow();
      this.tableView.setScrollTop(this.ganttView.getScrollTop());
    }
  },
  setGanttViewExpanded: function (value) {
    if (this.ganttViewExpanded != value) {
      this.ganttViewExpanded = value;
      this._allowLayout = false;
      if (value) {
        this.expandPane(2);
      } else {
        this.collapsePane(2);
      }

      this._doShow();
      this.ganttView.setScrollTop(this.tableView.getScrollTop());
    }
  },
  setTableViewExpanded: function (value) {
    if (this.tableViewExpanded != value) {
      this.tableViewExpanded = value;
      this._allowLayout = false;
      if (value) {
        this.expandPane(1);
      } else {
        this.collapsePane(1);
      }
      this._doShow();
      this.tableView.setScrollTop(this.ganttView.getScrollTop());
    }
  },
  _doShow: function () {

    this.tableViewExpanded = this.pane1.expanded;
    this.ganttViewExpanded = this.pane2.expanded;

    this.showTableView = this.pane1.visible;
    this.showGanttView = this.pane2.visible;


    this._allowLayout = true;

    this.doLayout();

    this.ganttView.doUpdate();
  },
  setTableViewWidth: function (value) {
    this.updatePane(1, {size: value});
  },
  setGanttViewWidth: function (value) {
    this.updatePane(2, {size: value});
  },

  setShowDirty: function (value) {
    if (this.showDirty != value) {
      this.showDirty = value;
      this.tableView.setShowDirty(value);
    }
  },
  setShowCriticalPath: function (value) {
    if (this.showCriticalPath != value) {
      this.showCriticalPath = value;
      this.ganttView.showCriticalPath = value;
      this.orderProject();
    }
  },
  setShowGridLines: function (value) {
    if (this.showGridLines != value) {
      this.showGridLines = value;
      this.ganttView.setShowGridLines(value);
    }
  },
  showLabel: true,
  setShowLabel: function (value) {
    if (this.showLabel != value) {
      this.showLabel = value;
      this.ganttView.setShowLabel(value);
    }
  },
  setTimeLines: function (value) {
    if (this.timeLines != value) {
      this.timeLines = value;
      this.ganttView.setTimeLines(value);
    }
  },
  setRowHeight: function (value) {
    value = parseInt(value);
    if (isNaN(value)) return;
    if (value != this.rowHeight) {
      this.rowHeight = value;
      this.tableView.setRowHeight(value);
      this.ganttView.setRowHeight(value);
    }
  },
  setMultiSelect: function (value) {
    if (this.multiSelect != value) {
      this.multiSelect = value;
      this.tableView.setMultiSelect(value);

    }
  },
  allowUnselect: false,
  setAllowUnselect: function (value) {
    this.allowUnselect = value;
    this.tableView.setAllowUnselect(value);
  },
  getAllowUnselect: function (value) {
    return this.allowUnselect;
  },
  setAllowDragDrop: function (value) {
    if (this.allowDragDrop != value) {
      this.allowDragDrop = value;
      this.tableView.setAllowDragDrop(value);
    }
  },
  scrollIntoView: function (task, toFinish, toTop) {
    this.ganttView.scrollIntoView(task, toFinish);
    if (toTop) {

      this.tableView.scrollIntoView(task);

      this.ganttView.setScrollTop(this.tableView.getScrollTop(), true);
    }
  },
  scrollToDate: function (date, toFinish) {
    this.ganttView.scrollToDate(date, toFinish);
  },
  zoomIn: function () {
    this.ganttView.zoomIn();
    var task = this.getSelected();
    if (task) {
      this.scrollIntoView(task);
    }
  },
  zoomOut: function () {
    this.ganttView.zoomOut();
    var task = this.getSelected();
    if (task) {
      this.scrollIntoView(task);
    }
  },
  setTopTimeScale: function (value) {
    this.ganttView.setTopTimeScale(value);
  },
  setBottomTimeScale: function (value) {
    this.ganttView.setBottomTimeScale(value);
  },


  frozenColumn: function (start, end) {
    this.tableView.frozenColumn(start, end);
  },
  unfrozenColumn: function () {
    this.tableView.unfrozenColumn();
  },
  getViewStartColumn: function () {
    return this.tableView.viewRegion.startColumn;
  },
  getViewEndColumn: function () {
    return this.tableView.viewRegion.endColumn;
  },
  getSelectedColumn: function () {
    var cell = this.tableView.getCurrentCell();
    return cell ? cell.column : null;
  },
  indexOfColumn: function (column) {
    column = this.tableView.getColumn(column);
    return this.tableView.viewColumns.indexOf(column);
  },

  setColumns: function (value) {
    this.tableView.setColumns(value);
  },
  getColumns: function () {
    return this.tableView.getColumns();
  },
  updateColumn: function (column, options) {
    this.tableView.updateColumn(column, options);
  },
  getColumn: function (name) {
    return this.tableView.getColumn(name);
  },
  getColumnAt: function (index) {
    return this.tableView.getColumnAt(index);
  },
  setTreeColumn: function (value) {
    this.tableView.setTreeColumn(value);
  },
  setRowHeight: function (value) {
    if (this.rowHeight != value) {
      this.rowHeight = value;
      this.tableView.setRowHeight(value);
      //注释原因：该方法原先是设置table、甘特图高度，现项目不需要设置甘特图高度。
      this.ganttView.setRowHeight(value);
    }
  },
  allowProjectDateRange: false,
  getDateRange: function () {
    var start = this.getStartDate(), finish = this.getFinishDate();
    if (this.allowProjectDateRange == false) {
      var start = null, finish = null;
    }
    var tasks = this.getTaskList();
    for (var i = 0, l = tasks.length; i < l; i++) {
      var node = tasks[i];
      if (node.Start) {
        if (!start || start > node.Start) start = node.Start;
      }
      if (node.Finish) {
        if (!finish || finish < node.Finish) finish = node.Finish;
      }
      if (this.viewModel != "gantt") {
        var bl = this.ganttView.getBaseline(node);
        if (bl) {
          if (bl.Start) {
            if (!start || start > bl.Start) start = bl.Start;
          }
          if (bl.Finish) {
            if (!finish || finish < bl.Finish) finish = bl.Finish;
          }
        }
      }


    }
    if (!start || !finish) return null;

    return [start, finish];
  },
  createDefaultCalendars: function () {
    return eval("[{UID: 1,IsBaseCalendar: 1,BaseCalendarUID:-1,Name: '',WeekDays: [{DayType: 1,DayWorking: 0},{DayType: 2,DayWorking: 1},{DayType: 3,DayWorking: 1},{DayType: 4,DayWorking: 1},{DayType: 5,DayWorking: 1},{DayType: 6,DayWorking: 1},{DayType: 7,DayWorking: 0}],Exceptions:[]}]");
  },
  getTask: function (uid) {
    if (uid === null || uid === undefined) return null;
    uid = typeof uid == "object" ? uid.UID : uid;
    return this._TaskUIDs[uid];
  },
  getTaskAt: function (index) {
    return this.tasks.getAt(index);
  },
  getTaskByID: function (taskID) {
    taskID = parseInt(taskID) - 1;

    return this.getTaskList()[taskID];
  },
  findTasks: function (field, value) {
    return this.tasks.findRecords(field, value);
  },

  eachChild: function (task, fn, scope) {
    this.tasks.eachChild(task, fn, scope);
  },
  cascadeChild: function (task, fn, scope) {
    this.tasks.cascadeChild(task, fn, scope);
  },
  bubbleParent: function (task, fn, scope) {
    this.tasks.bubbleParent(task, fn, scope);
  },

  collapseLevel: function (level, deep) {
    this.tasks.collapseLevel(level, deep);
  },
  expandLevel: function (level, deep) {
    this.tasks.expandLevel(level, deep);
  },
  isExpanded: function (task) {
    if (!task || this.tasks.hasChildNodes(task) == false) return false;
    return this.tasks.isExpandedNode(task);
  },
  collapse: function (node, deep) {
    this.tasks.collapse(node, deep);
  },
  expand: function (node, deep) {
    this.tasks.expand(node, deep);
  },
  toggle: function (node) {
    this.tasks.toggle(node);
  },
  collapseAll: function () {
    this.tasks.collapseAll();
    this.tableView.setScrollTop(0);
    this.ganttView.setScrollTop(0);
  },
  expandAll: function () {
    this.tasks.expandAll();
  },
  newProject: function () {
    var d = new Date();
    var startDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var finishDate = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate());


    this.data = {
      Name: "",
      StartDate: startDate,
      FinishDate: finishDate,
      CalendarUID: "1",
      Calendars: this.createDefaultCalendars(),
      Tasks: [],
      Resources: []
    };
    this._initProject(this.data);
    this.loadTasks([]);
  },
  _initProject: function (project) {
    if (!mini.isDate(project.StartDate)) throw new Error("StartDate must be Date type");
    if (!mini.isDate(project.FinishDate)) throw new Error("FinishDate must be Date type");
    if (project.StartDate >= project.FinishDate) throw new Error("StartDate not >= FinishDate");
    if (!project.CalendarUID || !project.Calendars) {
      project.CalendarUID = "1";
      project.Calendars = this.createDefaultCalendars();
    }
    this.startDate = project.StartDate;
    this.finishDate = project.FinishDate;

    this.rootTaskUID = -1;
    this._TaskUIDs = {};


    this._ResourceUIDs = {};
    var res = project.Resources || [];
    for (var i = 0, l = res.length; i < l; i++) {
      var re = res[i];
      this._ResourceUIDs[re.UID] = re;
    }

    if (!this._Validator) this._Validator = new MyProjectSchedule.Validator(this);
    if (!this._Critical) this._Critical = new MyProjectSchedule.Critical(this);
  },
  getRemovedTasks: function () {
    var tasks = this.tasks.getChanges("removed");
    for (var i = 0, l = tasks.length; i < l; i++) {
      delete tasks[i].children;
    }
    return tasks;
  },
  isChanged: function () {
    var list = this.getTaskList();
    for (var i = 0, l = list.length; i < l; i++) {
      var t = list[i];
      if (t._state) {
        return true;
      }
    }
    var removed = this.getRemovedTasks();
    if (removed.length > 0) return true;
    return false;
  },

  getTaskTree: function () {
    return this.tasks.toTree();
  },
  getTaskList: function () {
    return this.tasks.toArray();
  },
  getChangedTasks: function (rowState, onlyField) {
    var tasks = this.tasks.getChanges(rowState, onlyField);
    return tasks;
  },
  acceptChanges: function () {
    this.tasks.accept();
  },
  parseTasks: function (tasks, taskmap) {
    return tasks;
  },

  _taskParseDate: function (task) {
    if (task.Start && !mini.isDate(task.Start)) {
      task.Start = mini.parseDate(task.Start);
    }
    if (task.Finish && !mini.isDate(task.Finish)) {
      task.Finish = mini.parseDate(task.Finish);
    }

    if (!mini.isDate(task.Start)) {
      task.Start = null;
    }
    if (!mini.isDate(task.Finish)) {
      task.Finish = null;
    }

    var baseline = task.Baseline && task.Baseline[0];
    if (baseline) {
      if (baseline.Start && !mini.isDate(baseline.Start)) {
        baseline.Start = mini.parseDate(baseline.Start);
      }
      if (baseline.Finish && !mini.isDate(baseline.Finish)) {
        baseline.Finish = mini.parseDate(baseline.Finish);
      }
    }
  },

  loadTasks: function (tasks) {


    if (!mini.isArray(tasks)) tasks = [];

    this.parseTasks(tasks, this.data.TASKMAP);
    delete this.data.TASKMAP;

    this.allowTaskModified = false;

    this.data.Tasks = tasks;

    this.tasks = new mini.DataTree();
    this.tasks.expandOnLoad = this.expandOnLoad;
    this.tasks.idField = "UID";
    this.tasks.parentField = "ParentTaskUID";
    this.tasks.loadData(tasks);
    this.tasks.getRootNode().UID = this.rootTaskUID;


    var tasks = this.getTaskList();
    for (var i = 0, l = tasks.length; i < l; i++) {
      var task = tasks[i];
      this._taskParseDate(task);
    }

    this.tableView.setData(this.tasks);
    this.ganttView.setData(this.tasks);


    this.syncTasks();


    var task = this.getTaskAt(0);
    if (task) {
      this.scrollIntoView(task);
    }


    var tasks = this.getTaskList();
    for (var i = 0, l = tasks.length; i < l; i++) {
      var task = tasks[i];

      task._x = task.ID + ":" + task.OutlineNumber;
    }


    this.tasks.on("selectionchanged", function (e) {

    }, this);
    this.tasks.on("datachanged", function (e) {
      this.fire("datachanged", e);
    }, this);

    this.allowTaskModified = true;

  },

  _syncTasks2: function () {


    var nodesField = this.tasks.nodesField;
    var nodes = this.tasks.getRootNode()[nodesField];

    var uids = this._TaskUIDs = {};

    var __TaskID = 1;


    function eachTasks(nodes, parentTaskUID) {
      if (!nodes) return;
      for (var i = 0, l = nodes.length; i < l; i++) {
        var task = nodes[i];

        task["ID"] = __TaskID++;


        task["ParentTaskUID"] = parentTaskUID;

        uids[task.UID] = task;
        var childNodes = task[nodesField];
        if (childNodes != null && childNodes.length > 0) {


          eachTasks(childNodes, task.UID);
        } else {


        }
      }
    }


    eachTasks(nodes, this.rootTaskUID);

  },
  syncTasks: function (allowRange) {


    var tasks = this.getTaskList();
    this._TaskUIDs = {};
    for (var i = 0, l = tasks.length; i < l; i++) {
      var task = tasks[i];
      this._TaskUIDs[task.UID] = task;
    }

    var rootNodes = this.tasks.getRootNode()[this.tasks.nodesField];

    var sss = new Date();


    this._syncTaskNodes(rootNodes, 1, "", this.rootTaskUID);


    if (this._Validator && allowRange !== false) this._Validator.valid();


    if (allowRange !== false) {

      var dr = this.getDateRange();
      if (dr) {
        this.ganttView.setDateRange(dr[0], dr[1]);

        this.ganttView.doLayout(true);
      }
    }


    for (var i = 0, l = tasks.length; i < l; i++) {
      var task = tasks[i];

      if (task._x != task.ID + ":" + task.OutlineNumber) {

        this.setTaskModified(task, "ID", task._x);
      }
    }


  },
  __TaskID: 1,
  autoSyncSummary: true,
  allowSummaryLink: true,
  _syncTaskNodes: function (nodes, outlineLevel, outlineNumber, parentTaskUID) {
    if (parentTaskUID == this.rootTaskUID) {
      this.__TaskID = 1;

    }

    var event = {},
      nodesField = this.tasks.nodesField;

    var start = null, finish = null, work = 0;
    for (var i = 0, l = nodes.length; i < l; i++) {
      var task = nodes[i];

      task["ID"] = this.__TaskID++;
      task["OutlineLevel"] = outlineLevel;
      task["OutlineNumber"] = outlineNumber + (i + 1);
      task["ParentTaskUID"] = parentTaskUID;

      event.task = task;

      var childNodes = task[nodesField];
      if (childNodes != null && childNodes.length > 0) {


        if (task.Summary != 1) this.setTaskModified(task, "Summary");

        task.Summary = 1;

        var dd = this._syncTaskNodes(childNodes, outlineLevel + 1, task.OutlineNumber + ".", task.UID);
        if (this.autoSyncSummary) {
          if (dd[0]) task.Start = dd[0];
          if (dd[1]) {
            task.Finish = dd[1];
          }
          if (dd[2]) task.Work = dd[2];
        }


        this.fire("tasksync", event);
      }
      else {
        if (task.isLeaf === false) {
        } else {

          if (task.Summary != 0) this.setTaskModified(task, "Summary");

          task.Summary = 0;
        }

        this.fire("tasksync", event);
      }


      if ((task.Summary == 1 && this.allowSummaryLink == false) || !task.PredecessorLink) {
        task.PredecessorLink = [];
      }
      var links = task.PredecessorLink;

      for (var j = links.length - 1; j >= 0; j--) {
        var link = links[j];
        var preTask = this._TaskUIDs[link.PredecessorUID];

        if (preTask == null) {
          links.removeAt(j);
          this.setTaskModified(task, "PredecessorLink");
        }
        else if (this.tasks.isAncestor(task, preTask)
          || this.tasks.isAncestor(preTask, task)
        ) {

          if (this.enableValidTasks !== false) {
            links.removeAt(j);
            this.setTaskModified(task, "PredecessorLink");
          }
        }
      }

      if (this.autoSyncSummary) {
        if (task.Start && (!start || start.getTime() > task.Start.getTime())) {
          start = new Date(task.Start.getTime());
        }
        if (task.Finish && (!finish || finish.getTime() < task.Finish.getTime())) {
          finish = new Date(task.Finish.getTime());
        }
        if (!isNaN(task.Work)) work += task.Work;
      }
    }
    return this.autoSyncSummary ? [start, finish, work] : null;
  },

  getNextTask: function (task) {
    task = this.getTask(task);
    return this.tasks.getNextNode(task);
  },
  getPrevTask: function (task) {
    task = this.getTask(task);
    return this.tasks.getPrevNode(task);
  },
  getFirstTask: function (parentTask) {
    parentTask = this.getTask(parentTask);
    return this.tasks.getFirstNode(parentTask);
  },
  getLastTask: function (parentTask) {
    parentTask = this.getTask(parentTask);
    return this.tasks.getLastNode(parentTask);
  },
  getParentTask: function (task) {
    task = this.getTask(task);
    if (!task) return null;
    var parentTask = this.tasks.getParentNode(task);
    if (parentTask == this.tasks.getRootNode()) return null;
    return parentTask;
  },
  getChildTasks: function (task, all) {
    return this.tasks.getChildNodes(task, all, false);
  },
  getRoot: function () {
    return this.tasks.getRootNode();
  },
  getAllChildTasks: function (task) {
    return this.getChildTasks(task, true);
  },
  getAncestorTasks: function (task) {
    return this.tasks.getAncestors(task);
  },
  isAncestor: function (parentTask, task) {
    parentTask = this.getTask(parentTask);
    task = this.getTask(task);
    return this.tasks.isAncestor(parentTask, task);
  },
  getViewStartDate: function () {
    return this.ganttView.startDate;
  },
  getViewFinishDate: function () {
    return this.ganttView.finishDate;
  },
  getStartDate: function () {
    return this.data.StartDate;
  },
  getFinishDate: function () {
    return this.data.FinishDate;
  },

  newTask: function () {
    task = {};
    task.UID = UUID();
    task.Name = "";
    task.PercentComplete = 0;
    task.Work = 0;
    task.Weight = 0;
    task.ConstraintType = 0;

    var d = this.ganttView.startDate;
    task.Start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    task.Finish = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
    task.Duration = 1;
    task.Work = 0;
    var e = {task: task};
    this.fire("taskcreated", e);
    return e.task;
  },


  addTask: function (task, index, targetTask) {

    if (!task || typeof task != "object") return;
    if (index == "add") index = "append";
    if (!index) index = -1;
    targetTask = this.getTask(targetTask);
    if (!targetTask) targetTask = this.tasks.getRootNode();
    if (targetTask == this.tasks.getRootNode() && typeof index == "string") {
      index = "append";
    }


    this._taskParseDate(task);


    var _newTask = this.newTask();
    mini.copyTo(task, mini.copyTo(_newTask, task));


    if (!mini.isNull(task.UID)) this._TaskUIDs[task.UID] = task;

    this.tasks.beginChange();
    this.beginOrder();
    switch (index) {
      case "before":
        index = this.tasks.indexOfNode(targetTask);
        var parentTask = this.tasks.getParentNode(targetTask);
        this.tasks.insertNode(task, index, parentTask);
        break;
      case "after":
        index = this.tasks.indexOfNode(targetTask);
        var parentTask = this.tasks.getParentNode(targetTask);
        this.tasks.insertNode(task, index + 1, parentTask);
        break;
      case "append":
      case "add":
        this.tasks.addNode(task, targetTask);
        break;
      default:
        if (mini.isNumber(index)) {
          this.tasks.insertNode(task, index, targetTask);
        }
        break;
    }

    this.endOrder();
    this.tasks.endChange();
  },
  acceptTask: function (task) {
    if (!task) return;
    this.tasks.beginChange();
    this.tasks.acceptRecord(task);
    this.cascadeChild(task, function (t) {
      this.tasks.acceptRecord(t);
    }, this);
    this.tasks.endChange();
  },
  addTasks: function (tasks, index, targetTasks) {
    if (!mini.isArray(targetTasks)) {
      targetTasks = [targetTasks];
    }
    if (!mini.isArray(targetTasks) || !mini.isArray(tasks)) return;
    this.tasks.beginChange();

    this.beginOrder();


    for (var i = 0, l = tasks.length; i < l; i++) {
      var task = tasks[i];
      for (var j = 0, k = targetTasks.length; j < k; j++) {
        var targetTask = targetTasks[j];
        targetTask = this.getTask(targetTask);

        task = mini.clone(task);
        this.addTask(task, index, targetTask);
      }
    }


    this.endOrder();

    this.tasks.endChange()
  },
  removeTask: function (task) {
    task = this.getTask(task);
    if (!task) return null;
    if (task.UID == this.rootTaskUID) {
      this.clearTasks();
      return task;
    }
    this.tasks.beginChange();
    this.tasks.removeNode(task);

    this.orderProject();
    this.tasks.endChange();
  },
  clearTasks: function () {
    this.tasks.beginChange();
    this.data.Tasks = [];
    this.tasks.clear();
    this.syncTasks();
    this.tasks.endChange();
  },
  isModifiedField: function (task, field) {
    var task = this.getTask(task);
    if (!task || !field) return;
    return this.tasks.isModified(task, field);
  },
  updateTask: function (task, field, value) {

    var task = this.getTask(task);
    if (!task || !field) return;

    this.tasks.beginChange();

    this.tasks.updateRecord(task, field, value);

    this.orderProject();
    this.tasks.endChange();
  },
  updateTasks: function (tasks, newTask) {
    if (!mini.isArray(tasks) || typeof newTask != "object") return;
    this.tasks.beginChange();
    this.beginOrder();
    for (var i = 0, l = tasks.length; i < l; i++) {
      var task = tasks[i];
      task = this.getTask(task);
      var keyValue = mini.clone(newTask);
      this.tasks.updateRecord(task, keyValue);
    }
    this.endOrder();
    this.tasks.endChange();
  },
  moveTask: function (task, targetTask, action) {
    task = this.getTask(task);
    targetTask = this.getTask(targetTask);
    if (!task || !targetTask || mini.isNull(action)) return;
    this.tasks.beginChange();
    this.tasks.moveNode(task, targetTask, action);
    this.orderProject();
    this.tasks.endChange();
  },
  moveTasks: function (tasks, targetTask, action) {
    targetTask = this.getTask(targetTask);
    if (!tasks || tasks.length == 0 || !targetTask || mini.isNull(action)) return;
    this.tasks.beginChange();

    for (var i = 0, l = tasks.length; i < l; i++) {
      tasks[i] = this.getTask(tasks[i]);
    }
    this.tasks.moveNodes(tasks, targetTask, action);

    this.orderProject();
    this.tasks.endChange();
  },
  upgradeTask: function (task) {
    task = this.getTask(task);
    if (!task) return;
    this.tasks.beginChange();


    this.tasks.upGrade(task);

    this.orderProject();

    this.tasks.endChange();
  },
  downgradeTask: function (task) {
    task = this.getTask(task);
    if (!task) return;
    this.tasks.beginChange();
    this.tasks.downGrade(task);
    this.orderProject();
    this.tasks.endChange();
  },
  moveUpTask: function (task) {
    var parentTask = this.getParentTask(task);
    var prevTask = this.getPrevTask(task);
    if (prevTask) {
      this.moveTask(task, prevTask, "before");
    }
  },
  moveDownTask: function (task) {
    var parentTask = this.getParentTask(task);
    var nextTask = this.getNextTask(task);
    if (nextTask) {
      this.moveTask(task, nextTask, "after");
    }
  },
  removeTasks: function (tasks) {
    if (!mini.isArray(tasks)) return;

    for (var i = 0, l = tasks.length; i < l; i++) {
      tasks[i] = this.getTask(tasks[i]);
    }

    this.tasks.beginChange();
    this.tasks.removeNodes(tasks);
    this.orderProject();
    this.tasks.endChange();

    this.setScrollTop(0);
  },
  setScrollTop: function (value, must) {
    this.tableView.setScrollTop(value, must);
    this.ganttView.setScrollTop(value, must);
  },

  allowLinkLimit: false,
  getPredecessorLink: function (task, preTask) {
    task = this.getTask(task);
    preTask = this.getTask(preTask);
    if (task == null || !preTask) return null;
    var links = task.PredecessorLink;
    if (links != null && links.length > 0) {
      for (var i = 0, l = links.length; i < l; i++) {
        var link = links[i];
        if (link.PredecessorUID == preTask.UID) return link;
      }
    }
    return null;
  },
  getLinkString: function (links) {
    if (typeof links == "string") return links;
    if (!links) links = [];
    var sb = [];
    for (var i = 0, l = links.length; i < l; i++) {
      var link = links[i];
      if (!link.LinkLag) link.LinkLag = 0;
      var preTask = this.getTask(link.PredecessorUID);
      if (!preTask) continue;
      var s = preTask.ID;
      if (link.Type != 1 || link.LinkLag != 0) {
        s += mini.Gantt.PredecessorLinkType[link.Type].Short;
      }
      if (link.LinkLag != 0) {
        if (link.LinkLag > 0) {
          s += "+";
        }
        s += link.LinkLag;
      }

      if (this.allowLinkLimit) {
        if (!link.Limit) {
          s = "~" + s;
        }
      }

      sb.push(s);
    }
    return sb.join(',');
  },
  getLinksByString: function (linkString) {

    var links = [];

    if (mini.isArray(linkString)) links = linkString;
    if (typeof linkString == "string") {
      var lss = linkString.split(',');
      for (var i = 0, l = lss.length; i < l; i++) {
        var ls = lss[i];
        try {
          var PredecessorID = -1;
          var linkType = -1;
          var limit = true;
          var linkLag = 0;

          var s = ls.trim().toUpperCase();


          if (s.substring(0, 1) == "~") {
            limit = false;
            s = s.substring(1);
          }


          PredecessorID = parseInt(s);
          if (PredecessorID <= 0 || isNaN(PredecessorID)) continue;

          var preTask = this.getTaskByID(PredecessorID);
          if (preTask == null) continue;

          s = s.substring(PredecessorID.toString().length);


          if (s.indexOf("+") != -1) {
            var ss = s.split('+');
            s = ss[0];
            if (ss.length > 1) {
              linkLag = parseInt(ss[1]);
            }
          }
          else if (s.indexOf("-") != -1) {
            var ss = s.split('-');
            s = ss[0];
            if (ss.length > 1) {
              linkLag = -parseInt(ss[1]);
            }
          }


          if (s == "FF") linkType = 0;
          if (s == "FS" || s == "") linkType = 1;
          if (s == "SF") linkType = 2;
          if (s == "SS") linkType = 3;
          if (linkType == -1) continue;

          var link = {};
          link["PredecessorUID"] = preTask["UID"];
          link["Type"] = linkType;
          link["LinkLag"] = linkLag;
          link["Limit"] = limit;

          links.push(link);
        }
        catch (ex) {

        }
      }
    }
    return links;
  },
  removeLink: function (task, preTask) {
    if (!task) return;
    if (task.TaskUID) {
      preTask = task.PredecessorUID;
      task = task.TaskUID;
    }

    task = this.getTask(task);
    preTask = this.getTask(preTask);
    if (!task || !preTask) return;
    var links = task.PredecessorLink;
    if (links != null) {
      for (var i = links.length - 1; i >= 0; i--) {
        var link = links[i];
        if (link.PredecessorUID == preTask.UID) {
          links.removeAt(i);
        }
      }
    }

    this._Validator.valid();
    this.setTaskModified(task, "PredecessorLink");
    this.orderProject();
  },

  _checkLinks: function (links, task) {
    for (var i = links.length - 1; i >= 0; i--) {
      var link = links[i];


      var preTask = this.getTask(link.PredecessorUID);
      if (preTask == null) {
        links.removeAt(i);
        continue;
      }

      if (link.Type == null) link.Type = 1;
      if (link.LinkLag == null) link.LinkLag = 0;
      link.TaskUID = task.UID;

    }
  },

  addLink: function (task, link) {
    task = this.getTask(task);
    if (!task || !link) return;

    var oldLinks = task.PredecessorLink;

    try {
      var oldLink = this.getPredecessorLink(task, link.PredecessorUID);
      if (oldLink) throw new Error('不能加入相同的前置关系');

      var links = oldLinks ? oldLinks.clone() : [];
      links.push(link);
      this._checkLinks(links, task);

      task.PredecessorLink = links;
      this._Validator.valid();
      this.setTaskModified(task, "PredecessorLink");
      this.orderProject();
    } catch (ex) {
      task.PredecessorLink = oldLinks;
      throw ex;
    }

  },

  setLinks: function (task, links) {

    task = this.getTask(task);
    links = this.getLinksByString(links);
    if (task == null) return;


    var hashed = {}, _LINKS = [];
    for (var i = 0, l = links.length; i < l; i++) {
      var link = links[i];

      var preTask = this.getTask(link.PredecessorUID);
      if (!preTask && link.PredecessorID) {
        preTask = this.getTaskByID(link.PredecessorID);
      }

      if (!preTask || mini.isNull(link.Type)) continue;

      var preUID = preTask.UID;
      if (hashed[preUID]) continue;

      if (!link.LinkLag) link.LinkLag = 0;

      _LINKS.push(link);
      hashed[preUID] = link;
    }

    links = task.PredecessorLink;

    var s1 = this.getLinkString(links);
    var s2 = this.getLinkString(_LINKS);
    if (s1 == s2) return;
    try {
      task.PredecessorLink = _LINKS;
      this._Validator.valid();

      this.setTaskModified(task, "PredecessorLink");
      this.orderProject();
    }
    catch (ex) {
      task.PredecessorLink = links;
      throw ex;

    }
  },
  setAssignments: function (task, assignments) {
    task = this.getTask(task);
    if (task == null) return;
    if (!mini.isArray(assignments)) assignments = [];
    for (var i = assignments.length - 1; i >= 0; i--) {
      var asi = assignments[i];
      var resourceUID = asi.ResourceUID;
      var resource = this.getResource(resourceUID);
      if (resource == null) {
        assignments.removeAt(i);
      } else {
        resource.TaskUID = task.UID;
      }
    }
    task["Assignments"] = assignments;
    this.setTaskModified(task, "Assignments");
  },


  showCriticalPath: true,
  clearCriticalPath: function () {


  },
  createCriticalPath: function () {

  },


  beginUpdate: function () {
    this.tasks.beginChange();
    this.beginOrder();
  },
  endUpdate: function () {
    this.endOrder();
    this.tasks.endChange();
  },

  _orderCount: 0,
  allowOrderProject: false,
  beginOrder: function () {
    this._orderCount++;
  },
  endOrder: function (raise) {
    this._orderCount--;
    if (this._orderCount < 0) this._orderCount = 0;
    if ((raise !== false && this._orderCount == 0) || raise == true) {
      this._orderCount = 0;

      var tasks = null;
      if (raise && raise !== true) {
        tasks = raise;
      }
      this.orderProject(tasks);
    }
  },
  orderProject: function () {
    this.tasks.beginChange();

    this.syncTasks(false);
    if (this._orderCount == 0) {

      if (this.showCriticalPath) {

        this.createCriticalPath()
      } else {

      }


      var dr = this.getDateRange();
      if (dr) {
        this.ganttView.setDateRange(dr[0], dr[1]);
      }
    }
    this.tasks.endChange();

    this._deferLayout();

  },
  _deferLayout: function () {


    var me = this;
    if (this._layoutTimer) return;
    this._layoutTimer = setTimeout(function () {
      me.doLayout();
      me._layoutTimer = null;
    }, 1);
  },

  setTaskModified: function (task, field, oldValue) {
    if (this.allowTaskModified == false) return;

    if (field && mini.isNull(oldValue)) {
      oldValue = null;
    }
    this.tasks._setModified(task, field, oldValue);
  },


  getStartByCalendar: function (finish, workingDays) {
    return this._Calendar.getStart(finish, workingDays);
  },
  getFinishByCalendar: function (start, workingDays) {
    return this._Calendar.getFinish(start, workingDays);
  },
  getDurationByCalendar: function (start, finish) {
    return this._Calendar.getWorkingDays(start, finish);
  },
  getWorkingDateByCalendar: function (date, isBack) {
    return this._Calendar.getWorkingDate(date, isBack);
  },

  getSelected: function () {


    var cell = this.tableView.getCurrentCell();
    if (cell) {
      return cell.record;
    } else {
      return this.tasks.getSelected()
    }
    return null;
  },
  getSelecteds: function () {
    return this.tasks.getSelecteds()
  },
  isSelected: function (id) {
    return this.tasks.isSelected(id);
  },
  select: function (record, currentCell, selectRecord) {

    if (!record) return;
    if (typeof record == "number") record = this.tasks.getAt(record);
    if (currentCell) {
      var cell = this.tableView.getCurrentCell();
      var column = this.tableView.getViewColumns()[0];
      if (cell) {
        column = cell.column;
      }
      cell = {record: record, column: column};
      this.tableView.setCurrentCell(cell);
    }
    if (selectRecord !== false) {
      this.tasks.select(record);
    }
  },
  deselect: function (record) {


    this.tasks.deselect(record);
  },
  selectAll: function () {
    this.tasks.selectAll();
  },
  deselectAll: function () {

    this.tasks.deselectAll();
  },
  selects: function (records) {
    this.tasks.selects(records);
  },
  deselects: function (records) {
    this.tasks.deselects(records);
  },

  filter: function (fn, scope) {
    this.tasks.filter(fn, scope);

    var that = this;
    setTimeout(function () {

      that.setScrollTop(that.tableView.getScrollTop(), true);
    }, 50);
  },
  clearFilter: function () {
    this.tasks.clearFilter();
  },
  sort: function (fn) {
    this.tasks.sort(fn);
  },
  clearSort: function () {
    this.tasks.clearSort();
  },

  addTaskCls: function (task, cls) {
    this.tableView.addNodeCls(task, cls);
  },
  removeTaskCls: function (task, cls) {
    this.tableView.removeNodeCls(task, cls);
  },

  setTableHeaderMenu: function (menu) {
    menu = mini.getAndCreate(menu);
    this.tableHeaderMenu = menu;
    menu.owner = this;
    mini.on(this.tableView._headerEl, "contextmenu", function (e) {
      var ev = {

        htmlEvent: e,
        cancel: false
      };
      menu.fire("BeforeOpen", ev);
      if (ev.cancel) return false;

      menu.showAtPos(e.pageX, e.pageY);
      return false;
    }, this);
  },
  setTableBodyMenu: function (menu) {
    menu = mini.getAndCreate(menu);
    this.tableBodyMenu = menu;
    menu.owner = this;
    mini.on(this.tableView._viewportEl, "contextmenu", function (e) {
      var ev = {

        htmlEvent: e,
        cancel: false
      };
      menu.fire("BeforeOpen", ev);
      if (ev.cancel) return false;
      menu.showAtPos(e.pageX, e.pageY);
      return false;
    }, this);
  },
  setGanttHeaderMenu: function (menu) {
    menu = mini.getAndCreate(menu);
    this.ganttHeaderMenu = menu;
    menu.owner = this;
    mini.on(this.ganttView._headerEl, "contextmenu", function (e) {
      var ev = {

        htmlEvent: e,
        cancel: false
      };
      menu.fire("BeforeOpen", ev);
      if (ev.cancel) return false;
      menu.showAtPos(e.pageX, e.pageY);
      return false;
    }, this);
  },
  setGanttBodyMenu: function (menu) {
    menu = mini.getAndCreate(menu);
    this.ganttBodyMenu = menu;
    menu.owner = this;
    mini.on(this.ganttView._viewportEl, "contextmenu", function (e) {
      var ev = {

        htmlEvent: e,
        cancel: false
      };
      menu.fire("BeforeOpen", ev);
      if (ev.cancel) return false;
      menu.showAtPos(e.pageX, e.pageY);
      return false;
    }, this);
  },

  getHtmlCallback: function (callback) {
    var that = this,
      options = options || {},
      oldWidth = this.el.style.width,
      oldHeight = this.el.style.height,

      topTimeScale = that.ganttView.topTimeScale,
      bottomTimeScale = that.ganttView.bottomTimeScale;

    var headerHeight = that.tableView.getHeaderHeight(),
      rowsHeight = that.rowHeight * that.getTaskList().length,
      height = headerHeight + rowsHeight + 25,

      scrollTop = that.tableView.getScrollTop(),
      _tableWidth = that.pane1.size,
      tableWidth = that._pane1El.offsetWidth,
      width = tableWidth + that.ganttView.scrollWidth + 50;

    if (!this.ganttViewExpanded || !this.showGanttView) width = width - that.ganttView.scrollWidth + 50;
    if (!this.tableViewExpanded || !this.showTableView) {
      width = width - tableWidth;
      tableWidth = 0;
    }

    that.setTableViewWidth(tableWidth);

    that.setWidth(width);
    that.setHeight(height);

    setTimeout(function () {
      var html = jQuery(that.el).html();


      that.setWidth(oldWidth);
      that.setHeight(oldHeight);
      that.setTableViewWidth(_tableWidth);

      setTimeout(function () {

        that.setScrollTop(scrollTop, true);
      }, 50);

      if (callback) callback(html);

    }, 1000);
  },

  printServer: "",
  printCSS: "",
  print: function (options) {
    if (!this.printServer) {
      alert("printServer is error");
      return
    }
    if (!this.printCSS) {
      alert("printCSS is error");
      return
    }


    var that = this,
      options = options || {},
      oldWidth = this.el.style.width,
      oldHeight = this.el.style.height,

      topTimeScale = that.ganttView.topTimeScale,
      bottomTimeScale = that.ganttView.bottomTimeScale;

    var headerHeight = that.tableView.getHeaderHeight(),

      rowsHeight = that.rowHeight * that.tasks.getVisibleRows().length,
      height = headerHeight + rowsHeight + 25,

      scrollTop = that.tableView.getScrollTop(),
      _tableWidth = that.pane1.size,
      tableWidth = that._pane1El.offsetWidth,
      width = tableWidth + that.ganttView.scrollWidth + 50;

    if (!this.ganttViewExpanded || !this.showGanttView) width = width - that.ganttView.scrollWidth + 50;
    if (!this.tableViewExpanded || !this.showTableView) {
      width = width - tableWidth;
      tableWidth = 0;
    }


    that.setTableViewWidth(tableWidth);

    that.setWidth(width);
    that.setHeight(height);

    function submitForm(options) {
      var html = '<form target="_blank"  action="' + options.url + '" method="' + options.type + '" style="display:none;">';
      if (options.data) {
        for (var name in options.data) {
          var value = options.data[name];
          html += '<input type="hidden" name=\'' + name + '\' value=\'' + value + '\'/>';
        }
      }
      html += '</form>';

      var jq = $(html).appendTo(document.body);

      jq.submit();

      if (options.complete) setTimeout(function () {
        options.complete();
      }, 3000);
    }


    var imgType = options.type || "png";
    var url = this.printServer;
    var path = this.printServer.split("snapshot.")[0];


    var msgid = mini.loading(mini.Gantt.Printing_Wait, mini.Gantt.Printing_Text);


    var css = '<meta content="text/html; charset=gb2312" http-equiv="Content-Type" />';
    var cssArr = mini.isArray(this.printCSS) ? this.printCSS : [this.printCSS];
    for (var i = 0, l = cssArr.length; i < l; i++) {
      css += ' <link href="' + cssArr[i] + '" rel="stylesheet" type="te' + 'xt/css" />';
    }

    setTimeout(function () {
      var html = jQuery(that.el).html();
      html = '<!DOCTYPE html><html><head>' + css + '</head><body style="margin:0;">' + html + '</body></html>';


      html = html.replace(/\'/g, "");

      submitForm({
        url: url,
        data: {html: html, width: width, height: height, type: imgType},
        type: 'post',
        complete: function () {
          mini.hideMessageBox(msgid);
        }
      });


      that.setWidth(oldWidth);
      that.setHeight(oldHeight);
      that.setTableViewWidth(_tableWidth);

      setTimeout(function () {

        that.setScrollTop(scrollTop, true);
      }, 50);

    }, 1000);
  }


});
mini.regClass(mini.Gantt, "gantt");


mini.Gantt.PredecessorLinkType = [
  {ID: 0, Name: 'Finish-Finish(FF)', Short: 'FF'},
  {ID: 1, Name: 'Finish-Start(FS)', Short: 'FS'},
  {ID: 2, Name: 'Start-Finish(SF)', Short: 'SF'},
  {ID: 3, Name: 'Start-Start(SS)', Short: 'SS'}
];

mini.Gantt.ConstraintType = [
  {ID: 0, Name: 'The sooner the better'},
  {ID: 1, Name: 'The later the better'},
  {ID: 2, Name: 'Must be begin in'},
  {ID: 3, Name: 'Must be completed in'},
  {ID: 4, Name: 'Beginning no earlier than ...'},
  {ID: 5, Name: 'Beginning no later than ...'},
  {ID: 6, Name: 'Completed no earlier than ...'},
  {ID: 7, Name: 'Completed no later than ...'}
];

mini.copyTo(mini.Gantt, {
  ID_Text: "ID",
  Name_Text: "Name",
  PercentComplete_Text: "Progress",
  Duration_Text: "Duration",
  Start_Text: "Start",
  Finish_Text: "Finish",
  Critical_Text: "Critical",

  PredecessorLink_Text: "PredecessorLink",
  Work_Text: "Work",
  Priority_Text: "Priority",
  Weight_Text: "Weight",
  OutlineNumber_Text: "OutlineNumber",
  OutlineLevel_Text: "OutlineLevel",
  ActualStart_Text: "ActualStart",
  ActualFinish_Text: "ActualFinish",
  WBS_Text: "WBS",
  ConstraintType_Text: "ConstraintType",
  ConstraintDate_Text: "ConstraintDate",
  Department_Text: "Department",
  Principal_Text: "Principal",
  Assignments_Text: "Assignments",

  DeleteLink: 'Whether or not to delete this link?',

  Summary_Text: "Summary",
  Task_Text: "Task",
  Baseline_Text: "Baseline",
  LinkType_Text: "LinkType",
  LinkLag_Text: "LinkLag",
  From_Text: "From",
  To_Text: "To",

  Goto_Text: "Goto",
  UpGrade_Text: "UpGrade",
  DownGrade_Text: "DownGrade",
  Add_Text: "Add Task",
  Edit_Text: "Edit Task",
  Remove_Text: "Remove Task",
  ZoomIn_Text: "ZoomIn",
  ZoomOut_Text: "ZoomOut",
  Deselect_Text: "Un Select",
  Split_Text: "Split Task",

  NoCalendarID: "No calendar UID.",
  WeekDayError: "WeekDay error",
  ExceptionsError: "Exception date error",
  PredecessorError: "The relationship between task loop",
  SummaryPredecessorError: "The pre task of a summary task ({0}) \"{1}\" must be SS or FS",
  ManualCritical_Text: "Critical tasks (manual)",
  NoCalendar: "No project calendar was found.",
  NoCurrentCalendar: "Must have current project calendar",
  Printing_Wait: "Please print the Gantt chart, later...",
  Printing_Text: "Print Gantt chart"


});


PlusGantt = mini.Gantt;
