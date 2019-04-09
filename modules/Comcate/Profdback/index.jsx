import React, { Component } from 'react'
import style from './style.less'
import intl from 'react-intl-universal'
import { Table, Radio, message, Spin, Pagination } from 'antd'
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
import dynamic from 'next/dynamic'
import _ from "lodash";
import StandardTable from '../../../components/Table/index';

import {questionList,questionDelete} from '../../../api/api'
import axios from '../../../api/axios'

/* *********** 引入redux及redux方法 start ************* */
import { connect } from 'react-redux'
import store from '../../../store'
import { saveCurrentData, resetRightCurrentData } from '../../../store/rightData/action'
import { curdCurrentData, resetCurrentData } from '../../../store/curdData/action'
import { changeLocaleProvider } from '../../../store/localeProvider/action'
/* *********** 引入redux及redux方法 end ************* */

const locales = {
  "en-US": require('../../../api/language/en-US.json'),
  "zh-CN": require('../../../api/language/zh-CN.json')
}

export class ComcateProfdback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      initDone: false,
      currentPage: 1,
      pageSize: 10,
      columns: [],
      addRelease: false, //直接发布
      addApproval: false,//发布审批
      data: [{
        id: 1,
        title: "项目发布之前相关人士是否通知",
        questionType: "技术问题",
        questionPriority: "高",
        userName: "孙伯域",
        questionRemark: "在项目编辑页面添加...",
        questionHandle: "务必在处理之前...",
        handleTime: "2018-10-29",
        creator: "WSD",
        creatTime: "2018-9-9",
        status: "1"
      },
      {
        id: 9,
        title: "项目发布之前相关人士是否通知",
        questionType: "技术问题",
        questionPriority: "高",
        userName: "孙伯域1",
        questionRemark: "在项目编辑页面添加...",
        questionHandle: "务必在处理之前...",
        handleTime: "2018-10-29",
        creator: "WSD",
        creatTime: "2018-9-9",
        status: "1"
      },
      {
        id: 8,
        title: "项目发布之前相关人士是否通知",
        questionType: "技术问题",
        questionPriority: "高",
        userName: "孙伯域2",
        questionRemark: "在项目编辑页面添加...",
        questionHandle: "务必在处理之前...",
        handleTime: "2018-10-29",
        creator: "WSD",
        creatTime: "2018-9-9",
        status: "1"
      },
      {
        id: 7,
        title: "项目发布之前相关人士是否通知",
        questionType: "技术问题",
        questionPriority: "高",
        userName: "孙伯域3",
        questionRemark: "在项目编辑页面添加...",
        questionHandle: "务必在处理之前...",
        handleTime: "2018-10-29",
        creator: "WSD",
        creatTime: "2018-9-9",
        status: "1"
      }
    ],
      activeIndex: "",
      rightData: [],
      rightTags: [
        { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Comcate/Profdback/BasicInfo' },
        { icon: 'iconwenjian', title: '文件信息', fielUrl: 'Components/FileInfo' },
        { icon: 'iconjilu', title: '处理记录', fielUrl: 'Comcate/Profdback/ProfdBackInfo' },
        { icon: 'iconliuchengxinxi', title: '流程信息', fielUrl: 'Plot/Approval/Process' },
      ],
      deleteQuestionIdList:'',
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
    this.closeApprovalModal = this.closeApprovalModal.bind(this), this.closeReleaseModal = this.closeReleaseModal.bind(this)
  }


  componentDidMount() {
    this.loadLocales();

    //初始化问题列表数据
    this.getQuestionList()
  }

  componentwillunmount() {

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
            title: intl.get('wsd.i18n.comu.question.title'),
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: intl.get('wsd.i18n.comu.question.questiontype'),
            dataIndex: 'questionType',
            key: 'questionType',
          },
          {
            title: intl.get('wsd.i18n.comu.question.questionpriority'),
            dataIndex: 'questionPriority',
            key: 'questionPriority',
          },
          {
            title: intl.get('wsd.i18n.comu.question.username'),
            dataIndex: 'userName',
            key: 'userName',
          },
          {
            title: intl.get('wsd.i18n.comu.question.questionremark'),
            dataIndex: 'questionRemark',
            key: 'questionRemark',
          },
          {
            title: intl.get('wsd.i18n.comu.question.questionhandle'),
            dataIndex: 'questionHandle',
            key: 'questionHandle',
          },
          {
            title: intl.get('wsd.i18n.comu.question.handletime'),
            dataIndex: 'handleTime',
            key: 'handleTime',
          },
          {
            title: intl.get('wsd.i18n.comu.question.creator'),
            dataIndex: 'creator',
            key: 'creator',
          },
          {
            title: intl.get('wsd.i18n.comu.question.creattime'),
            dataIndex: 'creatTime',
            key: 'creatTime',
          },
          {
            title: intl.get('wsd.i18n.comu.question.status'),
            dataIndex: 'status',
            key: 'status',
            render: (status) => status == 1 ? <Radio checked>已处理</Radio> : null
          }]

      })
        ;
    });
  }

  //获取 获取问题列表
  getQuestionList = () => {
    
    axios.get(questionList(' ',this.state.pageSize,this.state.currentPage)).then((result) => {
      console.log(result)
      // 获取到的列表数据
      this.setState({
        // 获取问题列表
        // data:result.data.data,
      })

    }).catch((err) => {
      console.log(err,'问题列表') 
    });
  }

  /**
   * 删除问题
   */
  deleteQuestion = ()=>{

    //要删除的问题id
    let params = this.state.deleteQuestionIdList;
    axios.deleted(questionDelete,params,false).then((result) => {
      message.success('This is a normal message');
      console.log(resule)
    }).catch((err) => {
      message.error('This is a normal message');
      console.log(err)
    });
  }
  

  getInfo = (record, index) => {

    let id = record.id, records = record
    /* *********** 点击表格row执行更新state start ************* */
    if (this.state.activeIndex == id) {
      console.log("wwww")
      id = ''
      records = ''
      this.setState({
        rightData: []
      })
      this.props.resetRightCurrentData()
    } else {
      console.log("Ssss")
      // this.props.saveCurrentData({
      //   title: localStorage.getItem('name'),
      //   rightTag: this.state.rightTag[0].list,
      //   data: record
      // })
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
  };
  closeApprovalModal = () => { this.setState({ addApproval: false }) }
  closeReleaseModal = () => { this.setState({ addRelease: false }) }
  onChange = date => this.setState({ date })

  render() {

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        // console.log(record, selected, selectedRows);
        this.setState({
          deleteQuestionIdList:selectedRows.map(item=>{
            return item.id;
          })
        })
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected,selectedRows,changeRows)
        this.setState({
          deleteQuestionIdList:selectedRows.map(item=>{
            return item.id
          })
        })
      },
    };
    const ApplyModal = dynamic(
      import
        ('./ApplyModal/index'), {
        loading: () => <Spin size="small" />
      }
    )
    let pagination = {
      total: this.state.data.length,
      // hideOnSinglePage:true,
      current: this.state.currentPage,
      pageSize: this.state.pageSize,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `每页${this.state.pageSize}/共${Math.ceil(this.state.data.length / this.state.pageSize)}页`,
      onChange: (page, pageSize) => {
        
        this.setState({
          currentPage: page,
          pageSize
        })

      }
    }
    return (
      <div>
        <TopTags  deleteQuestion={this.deleteQuestion}/>
        <div className={style.main}>
          <div className={style.leftMain} style={{ height: this.props.height }}>
            <div style={{ minWidth: 'calc(100vw - 60px)' }}>
              {
                this.state.initDone &&
                <StandardTable columns={this.state.columns}
                  rowSelection={rowSelection}
                  dataSource={this.state.data}
                  pagination={pagination}
                  rowClassName={(record) => this.setClassName(record)}
                  rowKey={record => record.id}
                  onRow={(record, index) => {
                    return {
                      onClick: (event) => {
                        this.getInfo(record, index)
                      }
                    }
                  }}
                />
              }
            </div>



            {this.state.addApproval && <ApplyModal handleCancel={this.closeApprovalModal} title={this.state.title} />}
            {this.state.addRelease && <ApplyModal handleCancel={this.closeReleaseModal} title={this.state.title} />}
          </div>
          <div className={style.rightBox} style={{ height: this.props.height }}>
            <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData} />
          </div>
        </div>

      </div>

    )
  }
}

//export default ComcateProfdback

/* *********** connect链接state及方法 start ************* */
export default connect(state => ({
  currentLocale: state.localeProviderData
}), {
    saveCurrentData,
    curdCurrentData,
    resetRightCurrentData,
    resetCurrentData,
    changeLocaleProvider
  })(ComcateProfdback);
/* *********** connect链接state及方法 end ************* */