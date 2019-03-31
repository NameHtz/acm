import React, { Component } from 'react'
import style from './style.less'
import { Icon, Table, Modal, message } from 'antd'
import intl from 'react-intl-universal'
import AddStaffModel from '../AddStaffModel'  // 新增员工列表弹窗
import StandardTable from '../../../../components/Table/index';
import AddTopBtn from "../../../../components/public/TopTags/AddTopBtn"
import ModifyTopBtn from "../../../../components/public/TopTags/ModifyTopBtn"
import DeleteTopBtn from "../../../../components/public/TopTags/DeleteTopBtn"
import axios from '../../../../api/axios'
import { userList, deleteUser } from "../../../../api/api";
import * as util from '../../../../utils/util';
import ModeTable from '../../../../components/Table/index';

const locales = {
  "en-US": require('../../../../api/language/en-US.json'),
  "zh-CN": require('../../../../api/language/zh-CN.json')
}
const confirm = Modal.confirm


export class RoleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initDone: false,
      selectStatus: 0,
      addStaffShow: false,  // 控制新增员工列表弹窗
      total: '',
      current: '',
      pageSize: 10,
      currentPage: 1,
      data: [],
      submit: '',
    }
  }

  componentDidMount() {
    this.getUserList();
    this.loadLocales();
  }

  loadLocales() {
    intl.init({
      currentLocale: 'zh-CN',
      locales,
    })
      .then(() => {
        // After loading CLDR locale data, start to render
        this.setState({ initDone: true });
      });
  }

  getUserList = () => {
    axios.get(userList(this.props.rightData.id, 10, 1), {}).then(res => {
      this.setState({
        data: res.data.tableData.rows,
      })
    })
  }
  onCancel = () => {
    this.setState({
      addStaffShow: false
    })
  }
  onClickHandle = (name) => {
    if (name == "AddTopBtn") {
      this.setState({
        addStaffShow: true,
        title: "新增员工",
        submit: 'add'
      })
      return
    }
    if (this.state.selectStatus == 0) {
      message.warning("请选择数据")
    } else {
      if (name == "ModifyTopBtn") {
        if (this.state.selectStatus == 2) {
          message.warning("请选择单条数据,")
        } else {
          this.setState({
            title: "修改员工",
            addStaffShow: true,
            submit: 'put'
          })
        }
        return;
      }
      if (name == "DeleteTopBtn") {
        let data = []
        for (var i = 0; i < this.state.selectData.length; i++) {
          data.push(this.state.selectData[i].id)
        }
        axios.deleted(deleteUser, { data: data }, true).then(res => {
          var datas = this.state.data;
          for (var i = 0; i < datas.length; i++) {
            for (var q = 0; q < data.length; q++) {
              if (datas[i].id === data[q]) {
                datas.splice(i, 1)
              }
            }
          }
          this.setState({
            data: datas,
            rightData: '',
          });
        })
      }
    }
  }
  //点击行
  getInfo = (record, index) => {
    // console.log(record)
    this.setState({
      activeIndex: record.id
    })
  }

  //设置class
  setClassName = (record, index) => {
    //判断索引相等时添加行的高亮样式
    return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
  }
  addUser = (value) => {
    let data = this.state.data
    data.push(value)
    this.setState({
      data: data,
      addStaffShow: false
    })
  }
  updateUser = (value) => {
    // console.log(value)
    // console.log(this.state.data)
    var data = this.state.data;
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id === value.id) {
        data[i] = value
      }
    }
    this.setState({
      data: data,
      rightData: value,
      addStaffShow: false
    });
  }

  render() {
    let pagination = {
      total: this.state.data.length,
      // hideOnSinglePage:true,
      current: this.state.currentPage,
      pageSize: this.state.pageSize,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `每页${this.state.pageSize}/共${Math.ceil(this.state.data.length / this.state.pageSize)}页`,
      onChange: (page, pageSize) => {
        // console.log(this)
        this.setState({
          currentPage: page
        })
      }
    }
    const columns = [
      {
        title: intl.get('wsd.i18n.sys.user.username'),
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: intl.get('wsd.i18n.sys.user.actuName'),
        dataIndex: 'actuName',
        key: 'actuName',
      },
      {
        title: intl.get('wsd.i18n.sys.user.rolename'),
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: intl.get('wsd.i18n.sys.user.sex'),
        dataIndex: 'sex',
        key: 'sex',
        render: text => <span>{text.name} </span>
      },
      {
        title: intl.get('wsd.i18n.sys.user.staffStatues'),
        dataIndex: 'staffStatues',
        key: 'staffStatues',
      },
      {
        title: intl.get('wsd.i18n.sys.user.status'),
        dataIndex: 'status',
        key: 'status',
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys)
        console.log(selectedRows)
        if (selectedRowKeys.length > 0) {
          if (selectedRowKeys.length == 1) {
            this.setState({
              selectStatus: 1,
              selectData: selectedRows
            })
          } else {
            this.setState({
              selectStatus: 2,
              selectData: selectedRows
            })
          }

        } else {
          this.setState({
            selectStatus: 0
          })
        }
      },
      onSelect: (record, selected, selectedRows) => {
        // console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected, selectedRows, changeRows);
      },
    };

    return (
      <div className={style.main}>
        {this.state.initDone &&
          <div className={style.mainHeight}>
            <h3 className={style.listTitle}>员工列表</h3>
            <div className={style.rightTopTogs}>
              <AddTopBtn onClickHandle={this.onClickHandle}></AddTopBtn>
              <ModifyTopBtn onClickHandle={this.onClickHandle}></ModifyTopBtn>
              <DeleteTopBtn onClickHandle={this.onClickHandle.bind(this)}></DeleteTopBtn>
            </div>
            <div className={style.mainScorll}>
              <Table
                columns={columns}
                dataSource={this.state.data}
                rowSelection={rowSelection}
                pagination={pagination}
                rowKey={record => record.id}
                rowClassName={this.setClassName}
                onRow={(record, index) => {
                  return {
                    onClick: (event) => {
                      event.currentTarget.getElementsByClassName("ant-checkbox-wrapper")[0].click()
                      this.getInfo(record, index)
                    }
                  }
                }
                }

              />
            </div>
            {
              this.state.addStaffShow && (
                <AddStaffModel addUser={this.addUser} selectData={this.state.selectData} rightData={this.props.rightData}
                  updateUser={this.updateUser}
                  submit={this.state.submit} title={this.state.title}
                  staffModelShow={this.state.addStaffShow}
                  onCancel={this.onCancel} />
              )
            }

          </div>
        }
      </div>
    )
  }
}

export default RoleList
