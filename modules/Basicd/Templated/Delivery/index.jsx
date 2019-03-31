import React, {Component} from 'react'
import style from './style.less'
import intl from 'react-intl-universal'
import _ from 'lodash'
import {Table} from 'antd'
import TopTags from './TopTags/index'
import RightTags from '../../../../components/public/RightTags/index'

/* *********** 引入redux及redux方法 start ************* */
import {connect} from 'react-redux'
import store from '../../../../store'
import {saveCurrentData, resetRightCurrentData} from '../../../../store/rightData/action'
import {curdCurrentData, resetCurrentData} from '../../../../store/curdData/action'
import {changeLocaleProvider} from '../../../../store/localeProvider/action'
/* *********** 引入redux及redux方法 end ************* */

const locales = {
  "en-US": require('../../../../api/language/en-US.json'),
  "zh-CN": require('../../../../api/language/zh-CN.json')
}

export class BasicTemplatedDelivery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initDone: false,
      columns: [],
      data: [{
        id,
        key: 1,
        delvTitle: "APM产品需求说明书",
        delvNum: "001",
        delvVersion: "10",
        creator: "曹全",
        creatTime: "2018-07-10",
      }],
      /* *********** 初始化rightTag ************* */
      rightData: null,
      rightTags: [
        {icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Basicd/Templated/Delivery/DeliveryInfo'},
        {icon: 'right-square', title: '交付设置', fielUrl: 'Basicd/Templated/Delivery/DevSet'}
      ],
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

  componentDidMount() {
    this.loadLocales()
  }

  loadLocales() {
    intl.init({
      /* *********** 从redux中获取国家化语言 ************* */
      currentLocale: this.props.currentLocale.currentLocale,
      locales,
    }).then(() => {
      this.setState({
        initDone: true,
        columns: [
          {
            title: intl.get('wsd.i18n.base.tmpldelv.delvtitle'),
            dataIndex: 'delvTitle',
            key: 'delvTitle',
          },
          {
            title: intl.get('wsd.i18n.base.tmpldelv.delvnum'),
            dataIndex: 'delvNum',
            key: 'delvNum',
          },
          {
            title: intl.get('wsd.i18n.base.tmpldelv.delvversion'),
            dataIndex: 'delvVersion',
            key: 'delvVersion',
          },
          {
            title: "项目类型",
            dataIndex: 'protype',
            key: 'protype',
          },
          {
            title: intl.get('wsd.i18n.base.tmpldelv.creator'),
            dataIndex: 'creator',
            key: 'creator',
          },
          {
            title: intl.get('wsd.i18n.base.tmpldelv.creattime'),
            dataIndex: 'creatTime',
            key: 'creatTime',
          },
          {
            title: "备注",
            dataIndex: 'remark',
            key: 'remark',
          },
        ]
      });
    });
  }

  // 当表格数据选中时执行
  getInfo = (record, index) => {
    let id = record.id, records = record
    /* *********** 点击表格row执行更新state start ************* */
    if (this.state.activeIndex == id) {
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
  onSelect = (value) => {
    console.log("==>" + value)
    this.setState({
      value,
      selectedValue: value,
    });
  }
  onChange = date => this.setState({date})

  render() {
    const columns = [
      {
        title: intl.get('wsd.i18n.base.tmpldelv.delvtitle'),
        dataIndex: 'delvTitle',
        key: 'delvTitle',
      },
      {
        title: intl.get('wsd.i18n.base.tmpldelv.delvnum'),
        dataIndex: 'delvNum',
        key: 'delvNum',
      },
      {
        title: intl.get('wsd.i18n.base.tmpldelv.delvversion'),
        dataIndex: 'delvVersion',
        key: 'delvVersion',
      },
      {
        title: intl.get('wsd.i18n.base.tmpldelv.creator'),
        dataIndex: 'creator',
        key: 'creator',
      },
      {
        title: intl.get('wsd.i18n.base.tmpldelv.creattime'),
        dataIndex: 'creatTime',
        key: 'creatTime',
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
          <div className={style.leftMain} style={{height: this.props.height}}>
            <Table rowKey={record => record.id}
                   rowSelection={rowSelection}
                   defaultExpandAllRows={true}
                   name={this.props.name}
                   columns={columns}
                   dataSource={this.state.data}
                   pagination={false}
                   rowClassName={this.setClassName}
                   onRow={(record, index) => {
                     return {
                       onClick: (event) => {
                         this.getInfo(record, index)
                       }
                     }
                   }}
            />
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
})(BasicTemplatedDelivery);
/* *********** connect链接state及方法 end ************* */
