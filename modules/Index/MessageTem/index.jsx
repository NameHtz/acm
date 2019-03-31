import React, { Component } from 'react';
import { Table ,Icon,Input, Col, DatePicker,Button} from 'antd';
import style from './style.less';
const InputGroup = Input.Group;
const Search = Input.Search;
const {RangePicker} = DatePicker;
import MyTable from "../../../components/Table"
//我的消息
export class MessageTem extends Component {
  constructor(props) {
    super( props );
    this.state={
      currentPage: 1,
      pageSize: 10,
       data:[
        {
          key: '1',
          msgstate: '已读',
          msgstitle: '[计划反馈]计划执行审批',
          msgstype: '计划',
          msgrevice: '杨柳',
          msgsend: '杨柳',
          msgsendtime: '2018-10-16 18:52:23',
          ifanswer: '是',
          msgoperation: <Button type="primary" size="small">处理</Button>
        }
      ]
    }
  }
  render() {
    const columns3=[
      {
        title: '状态',
        dataIndex: 'msgstate',
        sortOrder: 'desc',
        sorter: (a,b) => a.msgstate - b.msgstate,

      },{
        title: '标题',
        dataIndex: 'msgstitle',
        sortOrder: 'desc',
        sorter: (a,b) => a.msgstitle - b.msgstitle,
      },
      {
        title: '消息类型',
        dataIndex: 'msgstype',
        sortOrder: 'desc',
        sorter: (a,b) => a.msgstype - b.msgstype,
      },
      {
        title: '接收人',
        dataIndex: 'msgrevice',
        sortOrder: 'desc',
        sorter: (a,b) => a.msgrevice - b.msgrevice,
      },
      {
        title: '发送人',
        dataIndex: 'msgsend',
        sortOrder: 'desc',
        sorter: (a,b) => a.msgsend - b.msgsend,
      },
      {
        title: '发送时间',
        dataIndex: 'msgsendtime',
        sortOrder: 'desc',
        sorter: (a,b) => a.msgsendtime - b.msgsendtime,
      },
      {
        title: '需要回复',
        dataIndex: 'ifanswer',
        sortOrder: 'desc',
        sorter: (a,b) => a.ifanswer - b.ifanswer,
      },
      {
        title: '操作',
        dataIndex: 'msgoperation',
        sortOrder: 'desc',
      }
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    let pagination = {
      total: this.state.data.length,
      // hideOnSinglePage: true,
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
    return (
      <div >
          {/*我的消息*/}
              <MyTable
                rowSelection={rowSelection}
                columns={columns3}
                dataSource={this.state.data}
                bordered
                pagination={pagination}
              />
      </div>



    )
  }
}

export default MessageTem
