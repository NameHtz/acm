import React, { Component } from 'react';
import { Table ,Icon,Input, Col, DatePicker,Button} from 'antd';
import style from './style.less';
const InputGroup = Input.Group;
const Search = Input.Search;
const {RangePicker} = DatePicker;
import MyTable from "../../../components/Table"
//我的问题
class MyQuestionTem extends Component {
  constructor(props) {
    super( props );
    this.state={
      currentPage: 1,
      pageSize: 10,
       data:[
        {
          key: '1',
          ownProject: '祖享云平台开发/SPCX-1',
          task: '',
          title: '问题测试',
          type: '技术问题',
          level: '',
          creator: '蒋燕青',
          createtime: '2017-12-13 17:34:23',
          mainobj:'数字化本部',
          mainperson:'WSD',
          operation: <Button type="primary" size="small">处理</Button>
        },
         {
           key: '2',
           ownProject: '祖享云平台开发/SPCX-1',
           task: '',
           title: '问题测试-2阶段',
           type: '技术问题',
           level: '',
           creator: '蒋燕青',
           createtime: '2017-12-13 17:34:23',
           mainobj:'数字化本部',
           mainperson:'WSD',
           operation: <Button type="primary" size="small">处理</Button>
         }
      ]
    }
  }
  render() {
    const columns5=[
      {
        title: '所属项目',
        dataIndex: 'ownProject',
        sortOrder: 'desc',
        sorter: (a,b) => a.ownProject - b.ownProject,

      },{
        title: 'WBS/任务',
        dataIndex: 'task',
        sortOrder: 'desc',
        sorter: (a,b) => a.task - b.task,
      },
      {
        title: '标题',
        dataIndex: 'title',
        sortOrder: 'desc',
        sorter: (a,b) => a.title - b.title,
      },
      {
        title: '类型',
        dataIndex: 'type',
        sortOrder: 'desc',
        sorter: (a,b) => a.type - b.type,
      },
      {
        title: '优先级',
        dataIndex: 'level',
        sortOrder: 'desc',
        sorter: (a,b) => a.level - b.level,
      },
      {
        title: '创建人',
        dataIndex: 'creator',
        sortOrder: 'desc',
        sorter: (a,b) => a.creator - b.creator,
      },
      {
        title: '创建时间',
        dataIndex: 'createtime',
        sortOrder: 'desc',
        sorter: (a,b) => a.createtime - b.createtime,
      },
      {
        title: '责任主体',
        dataIndex: 'mainobj',
        sortOrder: 'desc',
        sorter: (a,b) => a.mainobj - b.mainobj,
      },
      {
        title: '责任人',
        dataIndex: 'mainperson',
        sortOrder: 'desc',
        sorter: (a,b) => a.mainperson - b.mainperson,
      },
      {
        title: '操作',
        dataIndex: 'operation',
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
                columns={columns5}
                dataSource={this.state.data}
                bordered
                pagination={pagination}
              />
      </div>



    )
  }
}

export default MyQuestionTem
