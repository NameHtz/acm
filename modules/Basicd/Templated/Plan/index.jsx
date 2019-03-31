import React, { Component } from 'react'
import style from './style.less'
import { Table, Radio } from 'antd'
import intl from 'react-intl-universal'
import _ from 'lodash'
import TopTags from './TopTags/index'
import RightTags from '../../../../components/public/RightTags/index'
/* *********** 引入redux及redux方法 start ************* */
import { connect } from 'react-redux'
import store from '../../../../store'
import { saveCurrentData, resetRightCurrentData } from '../../../../store/rightData/action'
import { curdCurrentData, resetCurrentData } from '../../../../store/curdData/action'
import { changeLocaleProvider } from '../../../../store/localeProvider/action'
/* *********** 引入redux及redux方法 end ************* */

const locales = {
  "en-US": require('../../../../api/language/en-US.json'),
  "zh-CN": require('../../../../api/language/zh-CN.json')
}

export class BasicdTemplated extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initDone: false,
      columns: [],
      rightData: null,
      rightTags: [
        // { icon: 'right-square', title: '基本信息', fielUrl: 'Basicd/Templated/Plan/PlanInfo' },
        // { icon: 'right-square', title: '模板权限', fielUrl: 'Basicd/Templated/Plan/PlanPermission' }
      ],
      data: [
        {
          id: 1,
          level: 1,
          key: 1,
          name: "ACM产品开发项目",
          code: "ZM",
          planDate: "--",
          planTime: "--",
          plantype: "--",
          planlevel: "--",
          children: [
            {
              id: 2,
              key: 2,
              level: 2,
              name: "ACM产品开发项目",
              code: "ZM",
              planDate: "--",
              planTime: "240h",
              plantype: "月度计划",
              planlevel: "一级",
              children: [
                {
                  id: 3,
                  key: 3,
                  level: 3,
                  name: "ACM产品开发项目",
                  code: "ZM",
                  planDate: "--",
                  planTime: "240h",
                  plantype: "月度计划",
                  planlevel: "一级",

                }
              ]
            }
          ]
        }
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
            title: intl.get('wsd.i18n.base.planTem.name'),
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: "代码",
            dataIndex: 'code',
            key: 'code',
          },
          {
            title: "计划工期",
            dataIndex: 'planDate',
            key: 'planDate',
          },
          {
            title: "计划工时",
            dataIndex: 'planTime',
            key: 'status',
          },
          {
            title: "计划类型",
            dataIndex: 'plantype',
            key: 'plantype',
          },
          {
            title: "计划级别",
            dataIndex: 'planlevel',
            key: 'planlevel',
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
  onChange = date => this.setState({ date })
  setClassName = (record, index) => {
    //判断索引相等时添加行的高亮样式
    return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
  }


  render() {
    const columns = [
      {
        title: intl.get('wsd.i18n.base.planTem.name'),
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: intl.get('wsd.i18n.base.planTem.iptname'),
        dataIndex: 'iptName',
        key: 'iptName',
      },
      {
        title: intl.get('wsd.i18n.base.planTem.username'),
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: intl.get('wsd.i18n.base.planTem.status'),
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: intl.get('wsd.i18n.base.planTem.creator'),
        dataIndex: 'creator',
        key: 'creator',
      },
      {
        title: intl.get('wsd.i18n.base.planTem.creattime'),
        dataIndex: 'creatTime',
        key: 'creatTime',
      },
      {
        title: intl.get('wsd.i18n.base.planTem.isglobal'),
        dataIndex: 'isGlobal',
        key: 'isGlobal',
        render: (isGlobal) => isGlobal == 1 && <Radio checked></Radio>
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
        <TopTags />
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
                    if (record.level == 1) {
                      this.setState({
                        rightTags: [
                          { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Basicd/Templated/Plan/PlanInfo' },
                        ]
                      }, () => {
                        this.getInfo(record, index)
                      })
                    } else if (record.level == 2) {
                      this.setState({
                        rightTags: [

                          { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Basicd/Templated/Plan/WbsInfo' },
                          { icon: 'iconquanxianguanli', title: '模板权限', fielUrl: 'Basicd/Templated/Plan/PlanPermission' },
                          { icon: 'icontuandui', title: '协作团队', fielUrl: 'Plot/Group/TeamInfo' },
                          { icon: 'iconjiaofuqingdan', title: '交付清单', fielUrl: 'Components/DeliveryList' },
                        ]
                      }, () => {
                        this.getInfo(record, index)
                      })
                    } else if (record.level == 3) {
                      this.setState({
                        rightTags: [

                          { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Basicd/Templated/Plan/TaskInfo' },
                          {
                            icon: 'iconquanxianguanli',
                            title: '模板权限',
                            fielUrl: 'Basicd/Templated/Plan/PlanPermission'
                          },
                          { icon: 'icontuandui', title: '协作团队', fielUrl: 'Plot/Group/TeamInfo' },
                          { icon: 'iconjiaofuqingdan', title: '交付清单', fielUrl: 'Components/DeliveryList' },
                          {
                            icon: 'iconguanxitu',
                            title: '逻辑关系',
                            fielUrl: 'Basicd/Templated/Plan/LogicalRelationship'
                          },

                        ]
                      }, () => {
                        this.getInfo(record, index)
                      })
                    }


                  }
                }
              }}
            />
          </div>
          <div className={style.rightBox} style={{ height: this.props.height }}>
            <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData} />
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
  })(BasicdTemplated);

/* *********** connect链接state及方法 end ************* */
