import React, {Component} from 'react'
import intl from 'react-intl-universal'
import {Table} from 'antd'
import style from './style.less'
import FooterPagination from "./FooterPagination"
import _ from 'lodash'
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
/* *********** 引入redux及redux方法 start ************* */
import {connect} from 'react-redux'
import store from '../../../store'
import {saveCurrentData, resetRightCurrentData} from '../../../store/rightData/action'
import {curdCurrentData, resetCurrentData} from '../../../store/curdData/action'
import {changeLocaleProvider} from '../../../store/localeProvider/action'
/* *********** 引入redux及redux方法 end ************* */
const locales = {
  "en-US": require('../../../api/language/en-US.json'),
  "zh-CN": require('../../../api/language/zh-CN.json')
}

class TableComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initDone: false,
      activeIndex: "",
      rightData: null,
      rightTags: [
        {icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Doc/Recycle/BasicInfo'},
      ],
      data: [{
        key: "[0]",
        id: "12",
        modeCode: "PUSALJS_AMJ_ADSDSXSD",
        wfCode: "SPPAXKZ",
        wfName: "01项目",
        wfUrl: "交付文档",
        wfEvents: "2018-12-23",
        man: "陈长青"
      }]
    },
      /* *********** 添加监听redux中store变化 start ************* */
      store.subscribe(() => {
        let storeState = store.getState();
        if (localStorage.getItem('name') == storeState.curdData.title) {
          if (storeState.curdData.status != '') {
            this.curdData(storeState.curdData.status, storeState.curdData.data)
          }
        }
      })
    /* *********** 添加监听redux中store变化 end ************* */
  }

  /**
   * curd data数据
   * @param {*} status curd
   * @param {*} data curd
   */
  curdData = (status, data) => {
    // 新增
    if (status == 'add') {
      alert(JSON.stringify(data))
    }

    // 修改
    if (status == 'update') {
      alert(JSON.stringify(data))
    }

    // 删除
    if (status == 'delete') {
      alert(JSON.stringify(data))
    }
    this.props.resetCurrentData()
    //let tempData
    // this.setState({
    //     width: this.props.width,
    //     data: tempData
    // })
  }

  componentDidMount() {
    this.loadLocales();

  }

  getInfo = (record, index) => {
    let id = record.id, records = record
    /* *********** 点击表格row执行更新state start ************* */
    if (this.state.activeIndex == id) {
      console.log("wwww")
      id = ''
      records = ''
      this.props.resetRightCurrentData()
    } else {

    }
    /* *********** 点击表格row执行更新state end ************* */
    this.setState({
      activeIndex: id,
      rightData: record
    })
  }

  setClassName = (record, index) => {
    //判断索引相等时添加行的高亮样式
    return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
  }


  loadLocales() {
    intl.init({
      currentLocale: this.props.currentLocale.currentLocale,
      locales,
    })
      .then(() => {
        // After loading CLDR locale data, start to render
        this.setState({initDone: true});
      });
  }

  render() {
    const columns = [
      {
        title: "文档标题",
        dataIndex: 'modeCode',
        key: 'modeCode',
      },
      {
        title: "文档编号",
        dataIndex: 'wfCode',
        key: 'wfCode',
      },
      {
        title: "所属项目",
        dataIndex: 'wfName',
        key: 'wfName',
      },
      {
        title: "原文件夹",
        dataIndex: 'wfUrl',
        key: 'wfUrl',
      },
      {
        title: "创建日期",
        dataIndex: 'wfEvents',
        key: 'wfEvents',
      },
      {
        title: "上传人",
        dataIndex: 'man',
        key: 'man',
      },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };
    return (
      <div>
        <TopTags/>
        <div className={style.main}>
          <div className={style.leftMain}>
            {this.state.initDone &&
            <div className={style.boxhieht}>
              <Table columns={columns} dataSource={this.state.data} pagination={false}
                     rowSelection={rowSelection}
                     rowClassName={this.setClassName}
                     rowKey={record => record.id}
                     onRow={(record, index) => {
                       return {
                         onClick: (event) => {
                           this.getInfo(record, index)
                         }
                       }
                     }
                     }/>
              {/* <footer className={style.footerpagination}>
                <FooterPagination/>
              </footer> */}

            </div>
            }
          </div>
          <div className={style.rightBox} style={{height: this.props.height}}>
            <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData}/>
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
})(TableComponent);
/* *********** connect链接state及方法 end ************* */
