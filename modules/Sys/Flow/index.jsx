import React, {Component} from 'react'
import intl from 'react-intl-universal'
import {Table, Spin} from 'antd'
import style from './style.less'
import emitter from '../../../api/ev'
import _ from 'lodash'
/* *********** 引入redux及redux方法 start ************* */
import {connect} from 'react-redux'
import store from '../../../store'
import {saveCurrentData, resetRightCurrentData} from '../../../store/rightData/action'
import {curdCurrentData, resetCurrentData} from '../../../store/curdData/action'
import {changeLocaleProvider} from '../../../store/localeProvider/action'
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
/* *********** 引入redux及redux方法 end ************* */
const locales = {
  "en-US": require('../../../api/language/en-US.json'),
  "zh-CN": require('../../../api/language/zh-CN.json')
}

class SysFlow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initDone: false,
      activeIndex: "",
      rightData: [],
      rightTags: [
        {icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Sys/Flow/Info'},
        {icon: 'iconliucheng', title: '业务变量', fielUrl: 'Sys/Flow/Work'},
        {icon: 'iconset', title: '流程设置', fielUrl: 'Sys/Flow/SetUp'},
        {icon: 'icongongzuoliuliuchengshili-', title: '流程实例', fielUrl: 'Sys/Flow/News'},
      ],
      data: [{
        key: "[0]",
        id: "12",
        wftitle: "PUSALJS_AMJ_ADSDSXSD",
        wfName: "wckklmkldkd",
        remark: "mnvndsk.fsghd.sdfsf.dfsdscc",
      }]
    }
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
    // 监听右侧
    this.eventEmitter = emitter.addListener('noticeLeft', (data) => {
      var list = this.state.data
      list[1] = data
      this.setState({
        data: list
      })
    })
    // 监听 添加 修改 删除事件
    this.eventEmitter2 = emitter.addListener('noticeUpdateEvents', (data) => {
      console.log(data)
      let tempData
      //导入
      if (data.status == "import") {
        this.setState({
          importMod: true
        })
        console.log("ssss")
      }
      // 删除
      if (data.status == 'delete') {
        if (this.state.selectData.length == 0) {
          message.info('请选择要删除的数据项')
          return
        }
        tempData = this.state.data
        this.state.selectData.map((v, i) => {
          _.remove(tempData, (sku) => {
            console.log(sku)
            console.log(v)
            return sku.id == v.id
          });
        })
        console.log(tempData)

        message.success('删除成功')
      }


    })
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
      console.log("Ssss")

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

  componentwillunmount() {
    emitter.removeListener(this.eventEmitter)
    emitter.removeListener(this.eventEmitter2)
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
        title: intl.get('wsd.i18n.plan.activitydefine.wftitle'),
        dataIndex: 'wftitle',
        key: 'wftitle',
      },
      {
        title: intl.get('wsd.i18n.plan.activitydefine.wfname'),
        dataIndex: 'wfname',
        key: 'wfname',
      },
      {
        title: intl.get('wsd.i18n.plan.activitydefine.remark'),
        dataIndex: 'remark',
        key: 'remark',
      },
    ];

    return (
      <div>
        <TopTags/>
        <div className={style.main}>
          <div className={style.leftMain}>
            {this.state.initDone &&
            <Table columns={columns} dataSource={this.state.data} pagination={false}
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
})(SysFlow);
/* *********** connect链接state及方法 end ************* */
