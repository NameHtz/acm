import Head from 'next/head'
// import 'antd/dist/antd.less'
import React, { Component } from 'react'
import './layout.less'
//import Auth from "../components/Auth";

export default class Layout extends Component {

  render() {
    const { props } = this
    const { children } = props
    return (
      <div>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          {/*<link rel='stylesheet' href='/_next/static/style.css' />*/}
          <title>ACM</title>
          <script src="/static/plugin/plusgantt/scripts/jquery-1.6.2.min.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/miniui.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Window.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Control.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Container.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/DataBinding.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/DataSet.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Form.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/DataSource.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/DataTable.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/DataTree.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/MyProjectSchedule.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Splitter.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Gantt.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Calendar.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Button.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/MenuButton.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/SplitButton.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/ListControl.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/ListBox.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/CheckBoxList.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/RadioButtonList.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Container.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Popup.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Fit.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Panel.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Box.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/ToolBar.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Menu.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/MenuBar.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/ContextMenu.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/ValidatorBase.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/ButtonEdit.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Spinner.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/TimeSpinner.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/HtmlFile.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/FileUpload.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/PopupEdit.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/ComboBox.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/AutoComplete.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/DatePicker.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/TreeSelect.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Lookup.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/TextBox.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Password.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/TextArea.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/TextBoxList.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/OutlookBar.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/OutlookMenu.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/NavBarMenu.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/OutlookTree.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/NavBar.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/NavBarTree.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Hidden.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/CheckBox.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Layout.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Include.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Tabs.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/MenuItem.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Separator.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Pager.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/DataGrid.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/GridEditor.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/Tree.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/TreeGrid.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/SuperGrid.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/SuperTree.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/extend/GanttView.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/miniui/locale/zh_CN.js" type="text/javascript"></script>
          <link href="/static/plugin/plusgantt/scripts/miniui/themes/default/miniui.css" rel="stylesheet" type="text/css" />
          {/* <link href="/static/plugin/plusgantt/scripts/miniui/themes/blue/skin.css" rel="stylesheet" type="text/css" /> */}
          <link href="/static/plugin/plusgantt/scripts/miniui/themes/default/app.css" rel="stylesheet" type="text/css" />
          <link href="/static/plugin/plusgantt/scripts/miniui/themes/icons.css" rel="stylesheet" type="text/css" />
          <script src="/static/plugin/plusgantt/scripts/plusgantt/GanttMenu.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/plusgantt/GanttSchedule.js" type="text/javascript"></script>
          <script src="/static/plugin/plusgantt/scripts/plusgantt/GanttService.js" type="text/javascript"></script>
        </Head>
        <div className="main">
          {children}
        </div>
      </div>

    )
  }
}


/* export default ({ children }) =>

  <div>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <link rel='stylesheet' href='/_next/static/style.css' />
    </Head>
    <div className={layout.example}>布局1
      {children}
    </div>
  </div>
 */
