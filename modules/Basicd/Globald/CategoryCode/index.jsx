import React, { Component } from 'react'

import style from './style.less'
import axios from "../../../../api/axios"
import { getClassifyByBoCode, getClassifyWf, deleteClassify } from "../../../../api/api"
import TopTags from './TopTags/index'
import RightTags from '../../../Components/RightTags'
import { Table, message, Button } from 'antd'
import { connect } from 'react-redux';

import SpreadBtn from "../../../../components/public/TopTags/SpreadBtn"
import MoveTDLRTopBtn from "../../../../components/public/TopTags/MoveTDLRTopBtn"
import AddCategoryCodeBtn from "../../../../components/public/TopTags/AddCategoryCodeBtn"
import AddCodeValueBtn from "../../../../components/public/TopTags/AddCodeValueBtn"
import DeleteTopBtn from "../../../../components/public/TopTags/DeleteTopBtn"
import AddCategoryCode from "./AddCategoryCode"
import AddCodeValue from "./AddCodeValue"
import * as util from '../../../../utils/util';

// Basicd/Globald/CategoryCode/CodeValueCodeInfo
class CategoryCode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initDone: false,
      rightData: [],
      dataMap: [],
      rightDataList: [],
      activeIndex2: [],
      rightTags: [
        { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Basicd/Globald/CategoryCode/CategoryCodeInfo' },
      ],
    }
  }
  //获取业务对象列表
  getList = () => {
    axios.get(getClassifyWf).then(res => {
      console.log(res.data.data)
      this.setState({
        Menudata: res.data.data
      }, () => {
        //默认选着第一行
        if (!this.state.leftmenu) {
          this.setState(preState => ({
            activeIndex1: preState.Menudata[0].id,
            leftmenu: preState.Menudata[0]
          }), () => {
            this.getListrightdata()
          })
        }
      });
    });
  };
  getListrightdata = () => {
    const { leftmenu } = this.state
    axios.get(getClassifyByBoCode(leftmenu.boCode)).then(res => {
      console.log(res.data.data)
      if (res.data.data) {
        const dataMap = util.dataMap(res.data.data);
        this.setState({
          rightDataList: res.data.data,
          dataMap: dataMap
        });
      }else{
        this.setState({
          rightDataList:[],
          dataMap: []
        });
      }

    });
  }
  componentDidMount() {

    this.getList()
  }


  //新增分类码
  // AddClassifyName = (data) => {
  //   const { rightDataList, dataMap, rightData } = this.state
  //   dataMap.push({ parentKey: data.id, id: data.id });
  //   this.setState(preState => ({
  //     rightDataList: [...preState.rightDataList, data],
  //     rightData: [],
  //     activeIndex2: [],
  //   }))
  // }
  //
  AddCodeValue = (data) => {
    const { rightDataList, dataMap, rightData } = this.state;
    util.create(rightDataList, dataMap, rightData[0], data);
    this.setState({
      rightDataList,
      dataMap,
      rightData: [],
      activeIndex2: [],
    });
  }
  //更新数据
  updateSuccess = (data) => {
    const { rightDataList, dataMap, rightData } = this.state;
    util.modify(rightDataList, dataMap, rightData[0], data);
    // this.props.changeMenuData(data)
    this.setState({
      rightDataList,
      // rightData: [],
      // activeIndex2: [],
    });
  }
  onClickHandle = (name) => {
    const { rightDataList, dataMap, rightData } = this.state
    if (name == "AddCategoryCodeBtn") {
      this.setState({
        isShowAddCategoryCode: true
      })
      return
    }
    if (name == "AddCodeValueBtn") {
      if (rightData.length == 0) {
        message.warning("未选择数据")
        return
      }
      if (rightData.length > 1) {
        message.warning("选择单行数据")
        return
      }
      this.setState({
        isShowAddCodeValue: true
      })
      return
    }
    if (name == "DeleteTopBtn") {

      if (rightData.length == 0) {
        message.warning("未选择数据")
        return
      }
      let id = rightData.map(item => item.id)
      let isSuccess = true
      axios.deleted(deleteClassify, {data:id}, isSuccess).then(res => {
        // rightData.forEach(item => {
        //   console.log(rightDataList)
        //   util.deleted(rightDataList, dataMap, item);
        //   console.log(rightDataList)
         
        // })
        console.log(dataMap)
        util.deleted(rightDataList, dataMap, rightData[0]);
        console.log(dataMap)
        this.setState({
          rightDataList,
          rightData: [],
          activeIndex2: [],
        });
      })
      return
    }
  }
  closeAddCategoryCode = () => {
    this.setState({
      isShowAddCategoryCode: false
    })
  }
  closeAddCodeValue = () => {
    this.setState({
      isShowAddCodeValue: false
    })
  }

  getInfo1 = (record, index) => {
    let id = record.id

    /* *********** 点击表格row执行更新state start ************* */
    if (this.state.activeIndex1 == id) {
      id = ''
      record = null
    }
    this.setState({
      activeIndex1: id,
      leftmenu: record
    }, () => {
      if (this.state.leftmenu) {
        this.getListrightdata()
      }

    })

  }
  getInfo2 = (record, event) => {
    let id = record.id
    let currentIndex = this.state.activeIndex2.findIndex(item => item == id)
    /* *********** 点击表格row执行更新state start ************* */
    if (currentIndex > -1) {
      this.setState((preState, props) => ({
        activeIndex2: [...preState.activeIndex2.slice(0, currentIndex), ...preState.activeIndex2.slice(currentIndex + 1)],
        rightData: [...preState.rightData.slice(0, currentIndex), ...preState.rightData.slice(currentIndex + 1)]
      }))
    } else {
      // console.log(event)
      // if (event.ctrlKey || event.shiftKey) {
      //   this.setState((preState, props) => ({
      //     activeIndex2: [...preState.activeIndex2, id],
      //     rightData: [...preState.rightData, record]
      //   }))
      // } else {
      //   this.setState({
      //     activeIndex2: [id],
      //     rightData: [record]
      //   })
      // }

      this.setState({
        activeIndex2: [id],
        rightData: [record]
      })
    }

  }
  setClassName2 = (record, index) => {
    //判断索引相等时添加行的高亮样式
    if (this.state.activeIndex2.findIndex(value => record.id === value) > -1) {
      return `${style['clickRowStyl']}`
    } else {
      return "";
    }

  }
  setClassName1 = (record, index) => {
    //判断索引相等时添加行的高亮样式(业务列表)
    return record.id === this.state.activeIndex1 ? 'tableActivty' : "";
  }
  onSelect = (value) => {
    console.log("==>" + value)
    this.setState({
      value,
      selectedValue: value,
    });
  }
  render() {
    const { intl } = this.props.currentLocale
    const columns1 = [
      {
        title: intl.get("wsd.i18n.base.docTem.docobject1"),
        dataIndex: 'boName',
        key: 'boName',
      },
    ]
    const columns2 = [
      {
        title: intl.get("wsd.i18n.plan.activitydefineinfo.category"),
        dataIndex: 'classifyCode',
        key: 'classifyCode',
      },
      {
        title: intl.get("wsd.i18n.plan.activitydefine.remark"),
        dataIndex: 'classifyName',
        key: 'classifyName',
      },

    ]
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
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };
    return (
      <div>
        <TopTags />
        <div className={style.main}>
          <div className={style.leftMain}>
            <section className={style.leftbox}>
              <Table columns={columns1} dataSource={this.state.Menudata} pagination={false} rowKey={record => record.id} rowClassName={this.setClassName1}
                size="small"
                onRow={(record, index) => {
                  return {
                    onClick: (event) => {
                      this.getInfo1(record, index)
                    }
                  }
                }} />
            </section>
            <section className={style.rightbox}>
              <div className={style.topButton}>
                <SpreadBtn onClickHandle={this.onClickHandle} />
                <MoveTDLRTopBtn onClickHandle={this.onClickHandle} />
                <AddCategoryCodeBtn onClickHandle={this.onClickHandle} />
                <AddCodeValueBtn onClickHandle={this.onClickHandle} />
                <DeleteTopBtn onClickHandle={this.onClickHandle} />

                <AddCategoryCode
                  visible={this.state.isShowAddCategoryCode}
                  AddClassifyName={this.AddCodeValue}
                  boCode={this.state.leftmenu ? this.state.leftmenu.boCode : null}
                  handleCancel={this.closeAddCategoryCode.bind(this)} />

                <AddCodeValue
                  data={this.state.rightData.length > 0 ? this.state.rightData[0] : null}
                  visible={this.state.isShowAddCodeValue}
                  AddCodeValue={this.AddCodeValue}
                  boCode={this.state.leftmenu ? this.state.leftmenu.boCode : null}
                  handleCancel={this.closeAddCodeValue.bind(this)} />
              </div>
              <Table columns={columns2}
                size="small"
                rowKey={record => record.id}
                rowSelection={rowSelection}
                dataSource={this.state.rightDataList}
                pagination={false}
                rowClassName={this.setClassName2}
                onRow={(record, index) => {
                  return {
                    onClick: (event) => {
                      let e = event
                      if (record.classifyType == 1) {
                        this.setState({
                          rightTags: [
                            { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Basicd/Globald/CategoryCode/CategoryCodeInfo' },
                          ]
                        }, () => {
                          this.getInfo2(record, e)
                        })
                        return
                      }
                      if (record.classifyType == 2) {
                        this.setState({
                          rightTags: [
                            { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Basicd/Globald/CategoryCode/CodeValueCodeInfo' },
                          ]
                        }, () => {
                          this.getInfo2(record, e)
                        })
                        return
                      }


                    }
                  }
                }}
              />
            </section>
          </div>
          <div className={style.rightBox} style={{ height: this.props.height }}>
            <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData.length > 0 ? this.state.rightData[0] : null} updateSuccess={this.updateSuccess} />
          </div>
        </div>
      </div >
    )
  }
}


export default connect(state =>
  ({
    currentLocale: state.localeProviderData,
  }))(CategoryCode);
