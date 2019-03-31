import React, {Component} from 'react'
import intl from 'react-intl-universal'
import {Table, Radio} from 'antd'
import style from './style.less'
import emitter from '../../../../api/ev'
import _ from 'lodash'
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

class BasicdCurreny extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [],
      initDone: false,
      data: [{
        id: 1,
        currName: "美元",
        currCode: "RMB",
        currSymbol: "$",
        rate: 0.1473,
        creatTime: "2018-10-03",
        creator: "WSD",
        currBase: 1,
      },
        {
          id: 2,
          currName: "人民币",
          currCode: "RAM",
          currSymbol: "$",
          rate: 0.1473,
          creatTime: "2018-10-03",
          creator: "WSD",
          currBase: 0,
        }],
      rightTags: [
        {icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Basicd/Globald/CurrenySet/CurInfo'}
      ],
      rightData:null,
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
            title: intl.get('wsd.i18n.base.currency.currname'),
            dataIndex: 'currName',
            key: 'currName',
          },
          {
            title: intl.get('wsd.i18n.base.currency.currcode'),
            dataIndex: 'currCode',
            key: 'currCode',
          },
          {
            title: intl.get('wsd.i18n.base.currency.currsymbol'),
            dataIndex: 'currSymbol',
            key: 'currSymbol',
          },

          {
            title: intl.get('wsd.i18n.base.currency.currbase'),
            dataIndex: 'currBase',
            key: 'currBase',
            render: (currBase) => currBase == 1 ? <Radio checked></Radio> : <Radio></Radio>
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

    // 发送数据
    // emitter.emit('noticeRightOrTop', records)

    this.setState({
      activeIndex: id,
      rightData:record
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
            <Table rowKey={record => record.id}
                   rowSelection={rowSelection}
                   defaultExpandAllRows={true}
                   name={this.props.name}
                   columns={this.state.columns}
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
})(BasicdCurreny);
/* *********** connect链接state及方法 end ************* */
