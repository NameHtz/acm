import React, { Component } from 'react';
import { Table ,Icon,Input, Col, DatePicker,Button} from 'antd';
import style from './style.less';
import MyTable from "../../../components/Table"
const InputGroup = Input.Group;
const Search = Input.Search;
const {RangePicker} = DatePicker;
//我的任务
export class TaskTem extends Component {
  constructor(props) {
    super( props );
    this.state={
      currentPage: 1,
      pageSize: 10,
        data:[{
          key: '1',
          name: 'SPCX测试启动会',
          starttime: '2018-12-17',
          endtime:'2018-12-08',
          plannanme: 'SPCX全周期计划',
          project:'SPCX全周期计划',
          processing:'100%',
          deviation:'正常',
          backstate:'已反馈',
          operation: <Button type="primary" size="small">处理</Button>

      },{
          key: '2',
          name: 'SPCX全周期计划',
          starttime: '2018-12-17',
          endtime:'2018-12-25',
          plannanme: 'SPCX全周期计划',
          project:'SPCX全周期计划',
          processing:'100%',
          deviation:'正常',
          backstate:'已反馈',
          operation: <Button type="primary" size="small">处理</Button>
      },
          {
            key: '3',
            name: 'SPCX全周期计划',
            starttime: '2018-12-17',
            endtime: '2018-12-28',
            plannanme: 'SPCX全周期计划',
            project:'SPCX全周期计划',
            processing:'100%',
            deviation:'正常',
            backstate:'已反馈',
            operation: <Button type="primary" size="small">处理</Button>
          }]
    }
  }

  render() {
    const columns = [ {
      title: '任务',
      dataIndex: 'name',
      sortOrder: 'desc',
      sorter: (a,b) => a.name - b.name,
      /* render: text => <a href="#">{text}</a>,*/
    },{
      title: '开始时间',
      dataIndex: 'starttime',
      sortOrder: 'desc',
      sorter: (a,b) => a.starttime - b.starttime,
    },{
      title: '完成时间',
      dataIndex: 'endtime',
      sortOrder: 'desc',
      sorter: (a,b) => a.starttime - b.starttime,
    },
      {
        title: '计划名称',
        dataIndex: 'plannanme',
        sortOrder: 'desc',
        sorter: (a,b) => a.plannanme - b.plannanme,
      },
      {
        title: '项目名称',
        dataIndex: 'project',
        sortOrder: 'desc',
        sorter: (a,b) => a.project - b.project,

      },{
        title: '进度完成',
        dataIndex: 'processing',
        sortOrder: 'desc',
        sorter: (a,b) => a.project - b.project,

      },
      {
        title: '偏差',
        dataIndex: 'deviation',
        sortOrder: 'desc',
        sorter: (a,b) => a.deviation - b.deviation,
      },
      {
        title: '反馈状态',
        dataIndex: 'backstate',
        sortOrder: 'desc',
        sorter: (a,b) => a.backstate - b.backstate,
        render: text => <span style={{color: '#1890ff'}}>{text}</span>
      },
      {
        title: '操作',
        dataIndex: 'operation',
      } ];
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
          {/*我的任务*/}
              <MyTable
                columns={columns}
                dataSource={this.state.data}
                bordered
                pagination={pagination}
              />
      </div>



    )
  }
}

export default TaskTem
