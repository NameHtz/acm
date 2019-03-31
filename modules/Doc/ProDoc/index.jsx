import React, { Component } from 'react'
import { Row, Col, Table, Icon, Menu, Dropdown } from 'antd'
import intl from 'react-intl-universal'
import style from './style.less'
import Collect from './Collect/index'
import Drop from './Dropdown/index'
import Manage from './Manage/index'
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
import { connect } from 'react-redux'
import store from '../../../store'
import { saveCurrentData, resetRightCurrentData } from '../../../store/rightData/action'
import { curdCurrentData, resetCurrentData } from '../../../store/curdData/action'
import { changeLocaleProvider } from '../../../store/localeProvider/action'


const locales = {
  "en-US": require('../../../api/language/en-US.json'),
  "zh-CN": require('../../../api/language/zh-CN.json')
}


class ProjectDoc extends Component {

  state = {
    activeIndex: '',
    collectVisible: false,
    DroVisible: false,
    MangageDocVisible: false,
    expandedRowKeys: [],
    rowKey: '',
    rightHide: true,
    rightData: null,
    rightTags: [
      { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Doc/ProDoc/Edit' },
      { icon: 'iconlishibanben', title: '历史版本', fielUrl: 'Doc/ProDoc/History' },
      { icon: 'iconfenleima', title: '分类码', fielUrl: 'Doc/ProDoc/Classify' },
      { icon: 'iconliuchengxinxi', title: '流程信息', fielUrl: 'Doc/ProDoc/ProcessInformation' }
    ],
    LeftColumns: [{
      title: '文件夹名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <span><Icon type="folder" className={style.leftTableIcon} />{text}</span>
    }, {
      title: '文档数量',
      dataIndex: 'quantity',
      key: 'quantity',
    }],
    LeftData: [{
      id: 1,
      name: '项目招投标文件',
      quantity: 1,
      children: [{
        id: 11,
        name: '工程图纸文件',
        quantity: 0,
      }]
    }, {
      id: 2,
      name: '工程合同文件',
      quantity: 2,
      children: [{
        id: 21,
        name: '工程图纸文件',
        quantity: 0,
      }, {
        id: 22,
        name: '工程图纸文件',
        quantity: 0,
      }]
    }],
    RightColumns: [{
      title: '文档标题',
      dataIndex: 'name',
      key: 'name',
      render: text => <span> <Icon type="star" onClick={this.collect.bind(this)} className={style.icon} /> <Icon
        type="eye" className={style.icon} />{text}</span>
    }, {
      title: '文档编号',
      dataIndex: 'num',
      key: 'num',
    }, {
      title: '文档类别',
      dataIndex: 'category',
      key: 'category',
    }, {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    }, {
      title: '版本',
      dataIndex: 'edition',
      key: 'edition',
    }, {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    }, {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '最近更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    }, {
      title: '上传人',
      dataIndex: 'theHeir',
      key: 'theHeir',
    }, {
      title: '文档状态',
      dataIndex: 'docState',
      key: 'docState',
    }],
    RightData: [{
      id: '1',
      num: '0000',
      title: '',
      author: '',
      edition: '',
      updateTime: '2019-01-11 9:00:00',
      theHeir: '陈常青',
      docState: '新建',
      name: 'EC00620-pmis.xls',
      time: '2019-01-11 9:00:00',
      creator: '任正华',
    }, {
      id: '2',
      num: '0000',
      title: '',
      author: '',
      edition: '',
      updateTime: '2019-01-11 9:00:00',
      theHeir: '谭义',
      docState: '已发布',
      name: 'EC00620.xls',
      time: '2019-01-11 9:00:00',
      creator: '谭义',
    }, {
      id: '3',
      num: '0000',
      title: '',
      author: '',
      edition: '',
      updateTime: '2019-01-11 9:00:00',
      theHeir: '任正华',
      docState: '审批中',
      name: 'EC00620.xls',
      time: '2019-01-11 9:00:00',
      creator: '谭义',
    }]

  }

  componentDidMount() {
    this.loadLocales()
  }

  loadLocales() {
    intl.init({
      /* *********** 从redux中获取国家化语言 ************* */
      currentLocale: this.props.currentLocale.currentLocale,
      locales,
    }).then(() => {

    })
  }

  collect() {
    this.setState({ collectVisible: true })
  }

  collectHandleCancel = () => {
    this.setState({
      collectVisible: false
    })
  }

  manageHandleCancel = () => {
    this.setState({
      MangageDocVisible: false
    })
  }

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },

  }
  setClassName = (record, index) => {
    //判断索引相等时添加行的高亮样式
    return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
  }

  getInfo(record) {
    // console.log(record)

    let id = record.id, records = record

    /* *********** 点击表格row执行更新state start ************* */
    if (this.state.activeIndex == id) {
      id = ''
      records = ''
      this.props.resetRightCurrentData()
    }
    /* *********** 点击表格row执行更新state end ************* */

    // 发送数据
    // emitter.emit('noticeRightOrTop', records)

    this.setState({
      activeIndex: id,
      rightData: record
    })

  }

  DropHandleCancel = (v, id) => {

    if (v == 'exdandDoc') {
      // console.log(id)
      this.setState({ DroVisible: false, expandedRowKeys: [ ...this.state.expandedRowKeys ,id] })
    } else if (v == 'mangageDoc') {
      this.setState({ DroVisible: false, MangageDocVisible: true })
    } else {
      this.setState({ DroVisible: false })
    }
  }

  RightHide = (v) => {
    // console.log(v)
    this.setState({ rightHide: false })

  }
  rightIconBtn = () => {
    this.setState({ rightHide: true })
  }

  render() {
    // console.log(this.state.defaultExpandedRowKeys)
    return (
      <div>
        <TopTags />
        <div className={style.main}>

          {this.state.rightHide &&
            <div className={style.leftMain} style={{ height: this.props.height }}>
              <Table rowKey={record => record.id} columns={this.state.LeftColumns} dataSource={this.state.LeftData}
                pagination={false} expandedRowKeys={this.state.expandedRowKeys}
                onRow={(record) => {
                  return {
                    onContextMenu: (event) => {
                      this.setState({ DroVisible: true, X: event.clientX, Y: event.clientY, rowKey: record.id })
                      event.preventDefault()
                    }}}}/>
            </div>}
          {!this.state.rightHide &&
            <div className={style.rightIconBtn} onClick={this.rightIconBtn}><Icon type="double-right" /></div>
          }

          <div className={style.conMain} style={{ height: this.props.height }}>
            <Table rowKey={record => record.id} rowSelection={this.rowSelection} columns={this.state.RightColumns}
              dataSource={this.state.RightData} pagination={false}
              rowClassName={this.setClassName}
              onRow={(record, index) => {
                return {
                  onClick: (event) => {
                    // console.log(record)
                    this.getInfo(record)
                  }
                }
              }}
            />


            {/* 收藏 */}
            <Collect modalVisible={this.state.collectVisible} handleCancel={this.collectHandleCancel} />
            {/* 右击弹出框 */}
            <Drop visible={this.state.DroVisible} handleCancel={this.DropHandleCancel.bind(this)} X={this.state.X}
              Y={this.state.Y} rowKey={this.state.rowKey} />
            {/* 管理文件夹 */}
            <Manage modalVisible={this.state.MangageDocVisible} handleCancel={this.manageHandleCancel} />
          </div>
          <div className={style.rightBox} style={{ height: this.props.height }}>
            <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData} rightHide={this.RightHide} rightIconBtn={this.rightIconBtn} />
          </div>
        </div>
      </div>
    )
  }
}


/* *********** connect链接state及方法 start ************* */
export default connect(state => ({
  currentLocale: state.localeProviderData
}), {
    saveCurrentData,
    curdCurrentData,
    resetRightCurrentData,
    resetCurrentData,
    changeLocaleProvider
  })(ProjectDoc);
/* *********** connect链接state及方法 end ************* */
