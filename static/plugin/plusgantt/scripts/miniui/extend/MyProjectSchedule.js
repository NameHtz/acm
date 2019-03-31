
MyProjectSchedule = function (project) {
  this.project = project;

  project.on("cellbeginedit", this.__OnCellBeginEdit, this);
  project.on("aftercellcommitedit", this.__OnCellCommitEdit, this);
  project.on("itemdragstart", this.__OnItemDragStart, this);
  project.on("itemdragcomplete", this.__OnItemDragComplete, this);
  project.on("dodragdrop", this.__OnDoTaskDragDrop, this);
  project.set({
    readOnly: false,
    allowDragDrop: true
  });
}
MyProjectSchedule.prototype = {
  __OnDoTaskDragDrop: function (e) {
    if (this.project.scheduleEnabled === false) return;

    var dragRecords = e.tasks, targetRecord = e.targetTask, action = e.action;
    this.project.moveTasks(dragRecords, targetRecord, action);
  },
  __OnCellBeginEdit: function (e) {
    if (this.project.scheduleEnabled === false) return;

    var task = e.record, field = e.field;
    if (task.Summary && task.FixedDate != 1) {
      if (field == 'Start' || field == 'Finish' || field == 'Duration') {
        if (this.project.autoSyncSummary) {
          e.cancel = true;
        }
      }
    }
    if (field == "Start" || field == "Finish"
      || field == "ActualStart" || field == "ActualFinish"
      || field == "ConstraintDate"
    ) {
      if (!mini.isDate(e.value) && e.editor) {
        e.editor.setViewDate(e.sender.getStartDate());
      }
    }
  },
  __OnCellCommitEdit: function (e) {
    if (this.project.scheduleEnabled === false) return;

    e.cancel = true;
    var task = e.record, field = e.field, value = e.value, oldValue = task[field], column = e.column;

    if (mini.isEquals(oldValue, value)) return;

    try {
      if (column.displayField) {
        var o = {};
        o[column.field] = e.value;
        o[column.displayField] = e.text;
        this.project.updateTask(task, o);
      } else {
        this.project.updateTask(task, field, value);
      }
    } catch (ex) {

      alert(ex.message);
    }
  },
  __OnItemDragStart: function (e) {
    if (this.project.scheduleEnabled === false) return;

    if (e.action == "start") {
      e.cancel = true;
    }
  },
  __OnItemDragComplete: function (e) {
    if (this.project.scheduleEnabled === false) return;

    var action = e.action, value = e.value, task = e.item;
    var sss = new Date();
    if (action == "finish") {

      this.project.updateTask(task, "Finish", value);
    }
    if (action == "percentcomplete") {
      this.project.updateTask(task, "PercentComplete", value);
    }
    if (action == "move") {
      this.project.updateTask(task, "Start", value);
    }

  }
};

MyProjectSchedule.Calendar = function (project) {
  this.project = project;
  this.calendar = project.getProjectCalendar();

  this.validCalendar(this.calendar);

  this.WeekDays = this.calendar["WeekDays"];
  this.Exceptions = this.calendar["Exceptions"];


  mini.sort(this.WeekDays, function (a, b) {
    return a.DayType > b.DayType;
  });


  this.caches = {};
}
MyProjectSchedule.Calendar.prototype = {
  validCalendar: function (calendar) {
    if (calendar.UID == null) {

      throw new Error(mini.Gantt.NoCalendarID);
    }
    var weekDays = calendar["WeekDays"];
    var exceptions = calendar["Exceptions"];
    if (weekDays == null || weekDays.length != 7) {

      throw new Error(mini.Gantt.WeekDayError);
    }
    if (exceptions == null) {
      calendar["Exceptions"] = exceptions = [];
    }

    var workingDay = false;
    for (var i = 0; i < 7; i++) {
      var weekday = weekDays[i];
      var dayType = parseInt(weekday["DayType"]);
      var dayWorking = parseInt(weekday["DayWorking"]);
      if ((dayWorking != 0 && dayWorking != 1)
        || dayType < 1 || dayType > 7
      ) {

        throw new Error(mini.Gantt.WeekDayError);
      }
      if (dayWorking == 1) {
        workingDay = true;
      }
    }

    if (workingDay == false) throw new Error(mini.Gantt.WeekDayError);
    for (var i = 0, l = exceptions.length; i < l; i++) {
      var ex = exceptions[i];
      var dayType = parseInt(ex["DayType"]);
      var dayWorking = parseInt(ex["DayWorking"]);
      if ((dayWorking != 0 && dayWorking != 1)
        || dayType != 0
      ) {

        throw new Error(mini.Gantt.ExceptionsError);
      }
      if (dayWorking == 1) {
        var tp = ex["TimePeriod"];
        if (tp == null || !mini.isDate(tp["FromDate"]) || !mini.isDate(tp["ToDate"])) {

          throw new Error(mini.Gantt.ExceptionsError);
        }
        var fd = tp["FromDate"];
        var td = tp["ToDate"];
        tp["FromDate"] = mini.clearTime(fd);
        tp["ToDate"] = mini.maxTime(td);
      }
    }
  },

  isWorkingDate: function (date) {
    var weekday = this.getDay(date.getDay(), date);
    return weekday.DayWorking == 1;
  },

  getDay: function (dayOfWeek, date) {
    var cacheid = "getDay$" + date.getTime() + dayOfWeek;
    var cache = this.caches[cacheid];
    if (cache) return cache;

    var weekday = this.WeekDays[dayOfWeek];

    if (date != null) {

      var time = date.getTime();
      for (var i = 0, l = this.Exceptions.length; i < l; i++) {
        var ex = this.Exceptions[i];
        var tp = ex["TimePeriod"];
        var fromtime = tp["FromDate"].getTime();
        var totime = tp["ToDate"].getTime();

        if (fromtime <= time && time <= totime) {
          weekday = ex;
          break;
        }
      }
    }
    this.caches[cacheid] = weekday;
    return weekday;
  },

  getStart: function (finish, workingDays) {
    if (workingDays <= 0) return new Date(finish.getTime());

    var cacheid = "getstart" + finish.getTime() + workingDays;
    var cache = this.caches[cacheid];
    if (cache) {
      return new Date(cache);
    }

    var date = new Date(finish.getFullYear(), finish.getMonth(), finish.getDate());
    while (workingDays > 0) {
      var isWorking = this.isWorkingDate(date);
      if (isWorking) {
        workingDays--;
        if (workingDays == 0) break;
      }
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);

    }

    this.caches[cacheid] = date.getTime();
    return date;
  },
  getFinish: function (start, workingDays) {
    if (workingDays <= 0) return new Date(start.getTime());

    var cacheid = "getfinish" + start.getTime() + workingDays;
    var cache = this.caches[cacheid];
    if (cache) {
      return new Date(cache);
    }

    var date = new Date(start.getFullYear(), start.getMonth(), start.getDate());

    while (workingDays > 0) {
      var isWorking = this.isWorkingDate(date);
      if (isWorking) {
        workingDays--;
        if (workingDays == 0) break;
      }
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);


    }

    var date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
    this.caches[cacheid] = date.getTime();
    return date;
  },

  getWorkingDays: function (start, finish) {
    if (start.getTime() == finish.getTime()) return 0;

    var cacheid = "getWorkingDays" + start.getTime() + finish.getTime();
    var cache = this.caches[cacheid];
    if (cache !== undefined) {
      return cache;
    }

    var isF = start > finish;
    if (isF) {
      var t = start;
      start = finish;
      finish = start;
    }

    start = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    finish = new Date(finish.getFullYear(), finish.getMonth(), finish.getDate(), 23, 59, 59);


    var days = 0;
    var finishTime = finish.getTime();
    for (var date = start; date.getTime() < finishTime;) {
      var isWorking = this.isWorkingDate(date);
      if (isWorking) {
        days++;
      }
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);


    }

    this.caches[cacheid] = days;
    return isF ? -days : days;
  },

  getWorkingDate: function (date, isBack) {
    var cacheid = "getWorkingDate" + date.getTime() + isBack;
    var cache = this.caches[cacheid];
    if (cache) {
      return new Date(cache);
    }

    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    var day = isBack ? 1 : -1;
    while (true) {
      var isWorking = this.isWorkingDate(date);
      if (isWorking) {
        break;
      }
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + day);

    }
    date = isBack ? date : new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
    this.caches[cacheid] = date.getTime();
    return date;
  },
  getWorkingStartDate: function (date, days) {
    if (days == 0) return date;
    var cacheid = "getWorkingStartDate" + date.getTime() + days;
    var cache = this.caches[cacheid];
    if (cache) {
      return new Date(cache);
    }

    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    var dayAdd = days > 0 ? 1 : -1;
    while (true) {
      if (days == 0) break;

      date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + dayAdd);


      var isWorking = this.isWorkingDate(date);

      if (isWorking) {
        days -= dayAdd;
      }
    }

    this.caches[cacheid] = date.getTime();
    return date;
  }

}

MyProjectSchedule.Validator = function (project) {
  this.project = project;
}
MyProjectSchedule.Validator.prototype = {

  createSuccessorTasks: function () {
    var tasks = this.project.getTaskList();
    if (tasks == null) return;
    for (var i = 0, l = tasks.length; i < l; i++) {
      var t = tasks[i];
      t.SuccessorTasks = [];
    }
    for (var i = 0, l = tasks.length; i < l; i++) {
      var t = tasks[i];
      var lks = t.PredecessorLink;
      if (lks != null && lks.length > 0) {
        for (var j = 0, k = lks.length; j < k; j++) {
          var lk = lks[j];
          var task = this.project.getTask(lk.PredecessorUID);
          if (task != null) {
            task.SuccessorTasks.push(t);
          }
        }
      }
    }
  },
  clearSuccessorTasks: function () {
    var tasks = this.project.getTaskList();
    for (var i = 0, l = tasks.length; i < l; i++) {
      var t = tasks[i];
      delete t.SuccessorTasks;
    }
  },


  valid: function () {
    var tasks = this.project.getTaskList();
    this.validTasks(tasks);
  },
  validTasks: function (tasks) {

    if (this.project.enableValidTasks === false) return;

    this.validedTasks = {};
    tasks = tasks.clone();

    this.createSuccessorTasks();

    try {
      for (var i = 0, l = tasks.length; i < l; i++) {
        var linkChains = {};
        var task = tasks[i];


        this.validTask(task, linkChains);
      }
    }
    finally {
      this.clearSuccessorTasks();
    }
  },
  validTask: function (task, linkChains) {

    var taskUID = task.UID;

    if (linkChains[taskUID] != null) {


      throw new Error(mini.Gantt.PredecessorError);

    }


    if (this.validedTasks[taskUID] != null) return;

    linkChains[taskUID] = task;


    this.validTaskProperties(task);


    linkChains[taskUID + "toSuccessor"] = task;
    var SuccessorTasks = task.SuccessorTasks;
    if (SuccessorTasks != null && SuccessorTasks.length > 0) {
      for (var i = 0, l = SuccessorTasks.length; i < l; i++) {
        var t = SuccessorTasks[i];
        this.validTask(t, linkChains);
        delete linkChains[t.UID];
      }
    }
    delete linkChains[taskUID + "toSuccessor"];


    linkChains[taskUID + "toParent"] = task;
    var parentTask = this.project.getParentTask(taskUID);
    if (parentTask && parentTask.UID != this.project.rootTaskUID) {
      if (!linkChains[parentTask.UID + "toChildren"]) {
        this.validTask(parentTask, linkChains);
        delete linkChains[parentTask.UID];
      }
    }
    delete linkChains[taskUID + "toParent"];


    linkChains[taskUID + "toChildren"] = task;
    var children = task[this.project.tasks.nodesField];
    if (children && children.length > 0) {
      var isChildrenUp = false;
      for (var i = 0, l = children.length; i < l; i++) {
        var childTask = children[i];
        if (linkChains[childTask.UID + "toParent"]) {
          isChildrenUp = true;
          break;
        }
      }


      if (!isChildrenUp) {
        for (var i = 0, l = children.length; i < l; i++) {
          var childTask = children[i];
          this.validTask(childTask, linkChains, false);
          delete linkChains[childTask.UID];
        }
      }
    }
    delete linkChains[taskUID + "toChildren"];

    this.validedTasks[taskUID] = task;
  },


  validTaskProperties: function (task) {

    if (task.Name === null || task.Name === undefined) task.Name = "";

    task.Duration = parseInt(task.Duration);
    task.PercentComplete = parseFloat(task.PercentComplete);

    if (isNaN(task.Duration)) task.Duration = 0;
    if (isNaN(task.PercentComplete)) task.PercentComplete = 0;
    if (isNaN(task.Work)) task.Work = 0;

    if (task.PercentComplete < 0) task.PercentComplete = 0;
    if (task.PercentComplete > 100) task.PercentComplete = 100;


    if (isNaN(task.Critical)) task.Critical = 0;
    if (this.project.keeyConstraint) {
      if (isNaN(task.ConstraintType)) task.ConstraintType = 0;
    } else {
      if (isNaN(task.ConstraintType) || !task.ConstraintDate) task.ConstraintType = 0;
    }

    if (task.ConstraintDate) {
      var cd = task.ConstraintDate;
      task.ConstraintDate = new Date(cd.getFullYear(), cd.getMonth(), cd.getDate());
    }

    if (!mini.isDate(task.Start)) task.Start = null;
    if (!mini.isDate(task.Finish)) task.Finish = null;

    if (!mini.isDate(task.ActualStart)) task.ActualStart = null;
    if (!mini.isDate(task.ActualFinish)) task.ActualFinish = null;

    task.FixedDate = parseInt(task.FixedDate);
    if (isNaN(task.FixedDate)) task.FixedDate = 0;

    var children = task[this.project.tasks.nodesField]

    var links = task.PredecessorLink;
    if (links && links.length > 0) {
      var taskUID = task.UID;

      for (var i = links.length - 1; i >= 0; i--) {
        var link = links[i];
        link.Type = parseInt(link.Type);
        link.LinkLag = parseInt(link.LinkLag);
        if (isNaN(link.LinkLag)) link.LinkLag = 0;

        link.TaskUID = task.UID;

        var preTaskUID = link.PredecessorUID;


        var preTask = this.project.getTask(preTaskUID);
        if (!preTask) {
          links.removeAt(i);
          continue;
        }


        if (this.project.isAncestor(taskUID, preTaskUID)
          || this.project.isAncestor(preTaskUID, taskUID)) {
          links.removeAt(i);
          continue;
        }


        if (task.Summary && (link.Type == 0 || link.Type == 2)) {


          alert(String.format(mini.Gantt.SummaryPredecessorError, task.ID, task.Name));
          links.removeAt(i);
        }


      }
    }


  },

  isFixedTask: function (task) {
    return !!task.Summary && !!task.FixedDate;
  },
  isLimitTask: function (task) {
    return !(task.ConstraintType == 0 || task.ConstraintType == 1 || !task.ConstraintDate);
  },
  validLimit: function (task) {


    var fixed = this.isFixedTask(task), limit = this.isLimitTask(task);
    if (!fixed && !limit) return;

    if (fixed) {

    }

    if (limit) {

    }

  }
}

MyProjectSchedule.PercentComplete = function (project) {
  this.project = project;
}
MyProjectSchedule.PercentComplete.prototype = {
  syncComplete: function (task) {
    this.syncParentComplete(task);
    this.syncChildrenComplete(task);
  },
  syncParentComplete: function (task) {
    var percentCompleteProperty = "Duration";

    var taskUID = task.UID;
    var parentTask = this.project.getParentTask(taskUID);
    if (parentTask != null && parentTask.UID != this.project.rootTaskUID) {
      var _PercentComplete = parentTask.PercentComplete;

      var cs = this.getChildrenAll(parentTask);
      var allDuration = 0, completeDuration = 0;
      for (var i = 0, l = cs.length; i < l; i++) {
        var c = cs[i];

        var duration = parseInt(c[percentCompleteProperty]);
        if (isNaN(duration)) duration = 0;
        var percentComplete = parseFloat(c["PercentComplete"]);
        if (isNaN(percentComplete)) percentComplete = 0;

        allDuration += duration;
        completeDuration += duration * percentComplete / 100;
      }
      parentTask["PercentComplete"] = parseInt(completeDuration / allDuration * 100);
      if (isNaN(parentTask["PercentComplete"])) parentTask["PercentComplete"] = 0;
      this.syncParentComplete(parentTask);

      if (_PercentComplete != parentTask.PercentComplete) {
        this.project.setTaskModified(parentTask, "PercentComplete");
      }
    }


  },
  syncChildrenComplete: function (task) {
    var percentCompleteProperty = "Duration";
    var children = this.getChildrenAll(task);

    var allDuration = 0, completeDuration = 0;
    for (var i = 0, l = children.length; i < l; i++) {
      var c = children[i];
      var duration = parseInt(c[percentCompleteProperty]);
      allDuration += duration;
    }
    completeDuration = allDuration * parseInt(task["PercentComplete"]) / 100;

    var isCompleteAll = allDuration == completeDuration;

    for (var i = 0, l = children.length; i < l; i++) {
      var c = children[i];
      var _PercentComplete = c.PercentComplete;

      var duration = parseInt(c[percentCompleteProperty]);
      if (isNaN(duration)) duration = 0;

      if (completeDuration <= 0) {
        c["PercentComplete"] = 0;
      }
      else {
        var d = completeDuration - duration;
        if (d >= 0) c["PercentComplete"] = 100;
        else {
          c["PercentComplete"] = parseInt(completeDuration / duration * 100);

          if (isNaN(c["PercentComplete"])) c["PercentComplete"] = 0;
        }
        completeDuration = d;
      }


      if (isCompleteAll) {
        c["PercentComplete"] = 100;
      }

      if (_PercentComplete != c.PercentComplete) {
        this.project.setTaskModified(c, "PercentComplete");
      }
    }


    for (var i = 0, l = children.length; i < l; i++) {
      var c = children[i];
      this.syncParentComplete(c);
    }
  },

  getChildrenAll: function (task) {
    var children = this.project.getChildTasks(task, true);
    var nodes = [];
    for (var i = 0, l = children.length; i < l; i++) {
      var c = children[i];
      if (c.Summary == 0) {
        nodes.push(c);
      }
    }
    return nodes;
  }
}


MyProjectSchedule.Critical = function (project) {
  this.project = project;
}
MyProjectSchedule.Critical.prototype = {
  clearCritical: function () {
    this.Tasks = this.project.getTaskList();
    this.clearCriticalTasks(this.Tasks);
  },
  createCritical: function () {
    this.nodesField = this.project.tasks.nodesField;
    this.Tasks = this.project.getTaskList();
    this.StartDate = this.project.getStartDate();
    this.FinishDate = this.project.getFinishDate();
    this.Calendar = this.project._Calendar;

    var tasks = this.Tasks;


    var olds = {};
    for (var i = 0, l = tasks.length; i < l; i++) {
      var task = tasks[i];
      olds[task.UID] = task.Critical;
    }

    this.doCreateCritical();


    for (var i = 0, l = tasks.length; i < l; i++) {
      var task = tasks[i];
      if (olds[task.UID] !== task.Critical) {
        this.project.setTaskModified(task, "Critical");
      }
    }
  },
  doCreateCritical: function () {

    var tasks = this.Tasks;
    this.clearCriticalTasks(tasks);


    var lastTasks = this.getLastTasks();
    var chains = this.getTaskChains(lastTasks);


    for (var i = 0, l = chains.length; i < l; i++) {
      var chain = chains[i];
      for (var j = 0, k = chain.length; j < k; j++) {
        var task = chain[j];
        if (task.Name == "1") {

        }
        var taskDays = task.Duration;

        var PredecessorIndex = j + 1;
        if (0 <= PredecessorIndex && PredecessorIndex <= k - 1) {
          var preTask = chain[PredecessorIndex];
          var preStart = mini.cloneDate(preTask.Start);
          var preFinish = mini.cloneDate(preTask.Finish);
          if (!preStart || !preFinish) continue;

          var link = this.project.getPredecessorLink(task, preTask);
          var linkType = link.Type;
          switch (linkType) {
            case 0:
              task.EarlyFinish = preFinish;
              task.EarlyStart = this.Calendar.getStart(task.EarlyFinish, taskDays);
              break;
            case 1:
              preFinish.setDate(preFinish.getDate() + 1);
              task.EarlyStart = this.Calendar.getWorkingDate(preFinish, true);
              task.EarlyFinish = this.Calendar.getFinish(task.EarlyStart, taskDays);
              break;
            case 2:
              preStart.setDate(preStart.getDate() - 1);
              task.EarlyFinish = this.Calendar.getWorkingDate(preStart, false);
              task.EarlyStart = this.Calendar.getStart(task.EarlyFinish, taskDays);
              break;
            case 3:
              task.EarlyStart = preStart;
              task.EarlyFinish = this.Calendar.getFinish(task.EarlyStart, taskDays);
              break;
          }


          var LinkLag = parseInt(link.LinkLag);
          if (isNaN(LinkLag)) LinkLag = 0;
          if (LinkLag != 0) {
            task.EarlyStart = this.Calendar.getWorkingStartDate(task.EarlyStart, LinkLag);
            task.EarlyFinish = this.Calendar.getFinish(task.EarlyStart, taskDays);
          }

        }
        else {
          task.EarlyStart = task.Start;
          task.EarlyFinish = task.Finish;
        }


        var SuccessorIndex = j - 1;
        if (0 <= SuccessorIndex && SuccessorIndex <= k - 1) {
          var succTask = chain[SuccessorIndex];
          var succStart = mini.cloneDate(succTask.Start);
          var succFinish = mini.cloneDate(succTask.Finish);
          if (!succStart || !succFinish) continue;

          var link = this.project.getPredecessorLink(succTask, task);
          var linkType = link.Type;


          var LinkLag = parseInt(link.LinkLag);
          if (isNaN(LinkLag)) LinkLag = 0;

          switch (linkType) {
            case 0:
              task.LateFinish = succFinish;
              task.LateStart = this.Calendar.getStart(task.LateFinish, taskDays);
              break;
            case 1:
              succStart.setDate(succStart.getDate() - 1);
              task.LateFinish = this.Calendar.getWorkingDate(succStart, false);
              task.LateStart = this.Calendar.getStart(task.LateFinish, taskDays);
              break;
            case 2:
              succFinish.setDate(succFinish.getDate() + 1);
              task.LateStart = this.Calendar.getWorkingDate(succFinish, true);
              task.LateFinish = this.Calendar.getFinish(task.LateStart, taskDays);
              break;
            case 3:
              task.LateStart = succStart;
              task.LateFinish = this.Calendar.getFinish(task.LateStart, taskDays);
              break;
          }


          var LinkLag = parseInt(link.LinkLag);
          if (isNaN(LinkLag)) LinkLag = 0;
          if (LinkLag != 0) {
            task.LateStart = this.Calendar.getWorkingStartDate(task.LateStart, -LinkLag);
            task.LateFinish = this.Calendar.getFinish(task.LateStart, taskDays);
          }
        }
        else {
          task.LateStart = task.Start;
          task.LateFinish = task.Finish;
        }
      }

      var criticalDifference = (this.project.criticalDifference || 0) * (1000 * 60 * 60 * 24);


      for (var j = 0, k = chain.length; j < k; j++) {
        var task = chain[j];
        if (task.Name == "确定项目范围") {

        }
        if (task.Critical == 1) continue;


        var EarlyStart = task.EarlyStart;
        var LateStart = task.LateStart;
        if (!EarlyStart || !LateStart) continue;


        if (EarlyStart.getTime() + criticalDifference >= LateStart.getTime()) {
          task.Critical = 1;
        }


        var SuccessorIndex = j - 1;
        if (0 > SuccessorIndex || SuccessorIndex > k - 1) {
          task.Critical = 1;
        }

        if (task.Milestone != null && task.Milestone == 1) {
          task.Critical = 1;
        }
        if (task.Critical == null || task.Critical == 0) {
          break;
        }
      }
    }


  },
  chains: null,
  chain: null,
  getTaskChains: function (tasks) {
    this.chains = [];
    this.chain = [];

    for (var i = 0, l = tasks.length; i < l; i++) {
      var task = tasks[i];
      this.createTaskChain(task);
    }

    return this.chains;
  },

  clearCriticalTasks: function (tasks) {
    for (var i = 0, l = tasks.length; i < l; i++) {
      var task = tasks[i];
      delete task.EarlyStart;
      delete task.EarlyFinish;
      delete task.LateStart;
      delete task.LateFinish;
      task.Critical = 0;
    }
  },

  createTaskChain: function (task) {
    if (task == null || task.Start == null || task.Finish == null) return;
    this.chain.add(task);

    var links = task.PredecessorLink;
    if (links != null && links.length > 0) {
      for (var i = 0, l = links.length; i < l; i++) {
        var link = links[i];
        var preTask = this.project.getTask(link.PredecessorUID);
        this.createTaskChain(preTask);
      }
    } else {
      var chain2 = this.chain.clone();

      this.chains.add(chain2);
    }
    this.chain.removeAt(this.chain.length - 1);
  },
  getLastTasks: function () {
    var lastTasks = [];
    var tasks = this.Tasks;


    var lastTime = -1;
    for (var i = 0, l = tasks.length; i < l; i++) {
      var task = tasks[i];
      if (task == null || task.Finish == null) continue;
      var time = task.Finish.getTime();

      if (time > lastTime) {
        lastTime = time;
      }
    }


    for (var i = 0, l = tasks.length; i < l; i++) {
      var task = tasks[i];
      if (task == null || task.Finish == null) continue;
      var time = task.Finish.getTime();

      if (time == lastTime) {
        lastTasks.add(task);
      }
    }

    return lastTasks;
  }
}

