import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import style from './style.less';

import { Table } from 'antd';
import TopTags from './TopTags/index';
import RightTags from '../../../components/public/RightTags/index';
import StandardTable from '../../../components/Table/index';
import axios from "../../../api/axios"
import { getUserInfoList } from "../../../api/api"
/* *********** 引入redux及redux方法 end ************* */
const locales = {
  'en-US': require('../../../api/language/en-US.json'),
  'zh-CN': require('../../../api/language/zh-CN.json'),
};

// const

class SysUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: 'SysUser',
      initDone: false,
      currentPageNum: 1,
      pageSize: 10,
      activeIndex: [],
      rightData: [],
      rightTags: [
        { icon: 'iconyuangongliebiao', title: '员工信息', fielUrl: 'Sys/User/Info' },
      ],
      selectedRowKeys:[],
      data: [
        {
          id: 1,
          sex: 1,
          roleName: 1,
          actuName: 1,
          userName: 1,
          status: 1,
          lastUpTime: 1,
          code: 1,
          staffStatus: 1,
          sortNum: 1,
          visitNum: 1,
        },
      ],
    };

  }
  //搜索
  search = (value) => {

    if (value != null || value.trim() != "") {
      this.setState({
        searcher:value,
        currentPageNum: 1,
      },()=>{
        this.getListData()
      })
     
    } else {
      this.setState({
        searcher:null,
        currentPageNum: 1,
      },()=>{
        this.getListData()
      })
    }

  }
  getListData = () => {
    if(this.state.searcher){
      axios.get(getUserInfoList(this.state.pageSize, this.state.currentPageNum)+"?searcher="+this.state.searcher).then(res => {
        console.log(res)
        this.setState({
          rightData: [],
          activeIndex: [],
          data: res.data.data,
          total: res.data.total
        })
      })
    }else{
      axios.get(getUserInfoList(this.state.pageSize, this.state.currentPageNum)).then(res => {
        console.log(res)
        this.setState({
          rightData: [],
          activeIndex: [],
          data: res.data.data,
          total: res.data.total
        },()=>{
          console.log("qqqq")
          this.setState({
            selectedRowKeys:[]
          })
        })
      })
    }
   
  }
  componentDidMount() {

    this.getListData()
  }
  setClassName = (record, index) => {
    // 判断索引相等时添加行的高亮样式
     //判断索引相等时添加行的高亮样式
     if (this.state.activeIndex.findIndex(value => record.id === value) > -1) {
      return 'tableActivty'
    } else {
      return "";
    }

  };

  getInfo = (record, index) => {
    let id = record.id
    let currentIndex = this.state.activeIndex.findIndex(item => item == id)
    /* *********** 点击表格row执行更新state start ************* */
    if (currentIndex > -1) {
      this.setState((preState, props) => ({
        activeIndex: [...preState.activeIndex.slice(0, currentIndex), ...preState.activeIndex.slice(currentIndex + 1)],
        rightData: [...preState.rightData.slice(0, currentIndex), ...preState.rightData.slice(currentIndex + 1)]
      }))
    } else {
      // console.log(event)
      this.setState((preState, props) => ({
        activeIndex: [...preState.activeIndex, id],
        rightData: [...preState.rightData, record]
      }))
    }
  };
  //删除
  deleteData = () => {
    let changecurrentPageNum=(this.state.data.length==this.state.rightData.length)&&this.state.currentPageNum>1&&Math.ceil(this.state.total / this.state.pageSize)
    this.state.rightData.forEach(value=>{
      let i=this.state.data.findIndex(item=>item.id==value.id)
      console.log(this.state.data)
      this.state.data=[...this.state.data.slice(0,i),...this.state.data.slice(i+1)]
      console.log(this.state.data)
    })
    console.log(changecurrentPageNum,this.state.data)
    if(changecurrentPageNum){
      this.setState((preState, props) => ({
        data: preState.data,
        rightData: [],
        activeIndex: [],
        currentPageNum:preState.currentPageNum-1,
        total:preState.total-this.state.rightData.length
      }),()=>{
        this.getListData()
      })
    }else{
      this.setState((preState, props) => ({
        data: preState.data,
        rightData: [],
        activeIndex: [],
      }))
    }
    
  }
  //新增员工
  addBasicUser = (data) => {
    
    this.setState((preState, props) => ({
      data: [...preState.data, data],
      total:preState.total+1
    }))
  }
  //修改基本信息
  updateSuccess = (data) => {
    let index = this.state.data.findIndex(v => v.id == data.id)
    this.setState((preState, props) => ({
      data: [...preState.data.slice(0, index), data, ...preState.data.slice(index + 1)],
    }))
  }

  render() {
    const {selectedRowKeys}=this.state
    const { intl } = this.props.currentLocale
    const columns = [
      {
        title: intl.get('wsd.i18n.sys.user.username'),
        dataIndex: 'actuName',
        key: 'actuName',
      }, {
        title: intl.get('wsd.i18n.sys.user.actuName'),
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: intl.get('wsd.i18n.sys.user.rolename'),
        dataIndex: 'retRole',
        key: 'retRole',
      },
      {
        title: intl.get('wsd.i18n.sys.user.sex'),
        dataIndex: 'sex',
        key: 'sex',
        render: (text) => {
          if (text) {
            return <span>{text.name}</span>
          } else {
            return null
          }
        }
      },
      {
        title: intl.get('wsd.i18n.sys.user.staffStatus'),
        dataIndex: 'staffStatus',
        key: 'staffStatus',
        render: (text) => {
          if (text) {
            return <span>{text.name}</span>
          } else {
            return null
          }
        }
      },

      {
        title: intl.get('wsd.i18n.sys.user.status'),
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
          if (text) {
            return <span>{text.name}</span>
          } else {
            return null
          }
        }
      },
      {
        title: intl.get('wsd.i18n.sys.user.sortNum'),
        dataIndex: 'sort',
        key: 'sort',
      },
      {
        title: intl.get('wsd.i18n.sys.user.lastuptime'),
        dataIndex: 'lastloginTime',
        key: 'lastloginTime',
      },
      {
        title: intl.get('wsd.i18n.sys.user.visitNum'),
        dataIndex: 'visits',
        key: 'visits',
      },

    ]
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log("selectedRowKeys:",selectedRowKeys);
        console.log('selectedRows: ', selectedRows)
        this.setState({
          activeIndex:selectedRowKeys,
          rightData:selectedRows,
          selectedRowKeys
        })
      },
      onSelect: (record, selected, selectedRows) => {
        // console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected, selectedRows, changeRows);
      },
    };
    let pagination = {
      total: this.state.total,
      // hideOnSinglePage: true,
      current: this.state.currentPageNum,
      pageSize: this.state.pageSize,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `每页${this.state.pageSize}/共${Math.ceil(this.state.total / this.state.pageSize)}页`,
      onShowSizeChange: (current, size) => {
        this.setState({
          pageSize: size,
          currentPageNum: 1
        }, () => {
          this.getListData()
        })
      },
      onChange: (page, pageSize) => {
        // console.log(this)
        this.setState({
          currentPageNum: page
        }, () => {
          this.getListData()
        })
      }
    }
    return (
      <div>
        {
          // initDone && (
          <div>
            <TopTags addBasicUser={this.addBasicUser} data={this.state.rightData.length>0? this.state.rightData:null} deleteData={this.deleteData}
              refresh={this.getListData} 
              search={this.search}/>
            <div className={style.main}>
              <div className={style.leftMain}>
                {/* <Table  columns={this.state.userTable} dataSource={this.state.tableData} rowSelection={rowSelection} rowKey={record => record.userName}/> */}
                <Table
                  pagination={pagination}
                  rowKey={record => record.id}
                  name={this.props.name}
                  size="small"
                  columns={columns}
                  rowSelection={rowSelection}
                  dataSource={this.state.data}
                  rowClassName={this.setClassName}
                  onRow={(record, index) => {
                    return {
                      onClick: (event) => {
                        event.currentTarget.getElementsByClassName("ant-checkbox-wrapper")[0].click()
                        // this.getInfo(record, index);
                      },
                    };
                  }
                  }
                />
              </div>
              <div className={style.rightBox} style={{ height: this.props.height }}>
                <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData.length==1? this.state.rightData[0]:null} updateSuccess={this.updateSuccess} />
              </div>
            </div>
          </div>
          // )
        }
      </div>

    );
  }
}

export default connect(state => ({ currentLocale: state.localeProviderData }))(SysUser);

