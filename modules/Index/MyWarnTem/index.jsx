import React, { Component } from 'react';
import { Table ,Icon,Input, Col, DatePicker,Button} from 'antd';
import style from './style.less';
const InputGroup = Input.Group;
const Search = Input.Search;
const {RangePicker} = DatePicker;
import MyTable from "../../../components/Table"
//我的预警
class MyWarnTem extends Component {
  constructor(props) {
    super( props );
    this.state={
      currentPage: 1,
      pageSize: 10,
       data:[
        {
          key: '1',
          task: '建筑工董事会及集团职能部门评审项目，完成整套上会材料',
          planstarttime: '2018-12-3 18:30:56',
          planendtime: '2019-12-4 18:30:56',
          ownplan: '江苏董事会评审商业计划表',
          ownProject: '江苏正宇建筑资质收费项目',
          operation: <Button type="primary" size="small">处理</Button>
        }
      ]
    }
  }
  render() {
    const columns4=[
      {
        title: '任务',
        dataIndex: 'task',
        sortOrder: 'desc',
        sorter: (a,b) => a.msgstate - b.msgstate,

      },{
        title: '计划开始时间',
        dataIndex: 'planstarttime',
        sortOrder: 'desc',
        sorter: (a,b) => a.planstarttime - b.planstarttime,
      },
      {
        title: '计划完成时间',
        dataIndex: 'planendtime',
        sortOrder: 'desc',
        sorter: (a,b) => a.planendtime - b.planendtime,
      },
      {
        title: '所属计划',
        dataIndex: 'ownplan',
        sortOrder: 'desc',
        sorter: (a,b) => a.ownplan - b.ownplan,
      },
      {
        title: '所属项目',
        dataIndex: 'ownProject',
        sortOrder: 'desc',
        sorter: (a,b) => a.msgsend - b.msgsend,
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
                columns={columns4}
                dataSource={this.state.data}
                bordered
                pagination={pagination}
              />
      </div>



    )
  }
}

export default MyWarnTem
