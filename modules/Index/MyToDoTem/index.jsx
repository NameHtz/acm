import React, { Component } from 'react';
import { Table ,Icon,Input, Col, DatePicker,Button} from 'antd';
import style from './style.less';
const InputGroup = Input.Group;
const Search = Input.Search;
const {RangePicker} = DatePicker;
import MyTable from "../../../components/Table"
//我的待办
class MyToDoTem extends Component {
  constructor(props) {
    super( props );
    this.state={
      currentPage: 1,
      pageSize: 10,
       data:[
        {
          key: 1,
          itemname: '[计划反馈]计划执行审批',
          approve: 'SPC全周期计划',
          sponsor: '杨柳',
          time:'2018-10-16 18:52:23',
          node:'项目办审批',
          nodestate:'运行',
          operation: <Button type="primary" size="small">处理</Button>
        }
      ]
    }
  }
  render() {
    const columns = [ {
      title: '项目名称',
      dataIndex: 'itemname',
      sortOrder: 'desc',
      sorter: (a,b) => a.itemname - b.itemname,
    },{
      title: '审批内容',
      dataIndex: 'approve',
      sortOrder: 'desc',
      sorter: (a,b) => a.approve - b.approve,

    },{
      title: '流程发起人',
      dataIndex: 'sponsor',
      sortOrder: 'desc',
      sorter: (a,b) => a.sponsor - b.sponsor,

    },{
      title: '时间',
      dataIndex: 'time',
      sortOrder: 'desc',
      sorter: (a,b) => a.time - b.time,
    },{
      title: '所在节点',
      dataIndex: 'node',
      sortOrder: 'desc',
      sorter: (a,b) => a.node - b.node,

    },{
      title: '节点状态',
      dataIndex: 'nodestate',
      sortOrder: 'desc',
      sorter: (a,b) => a.nodestate - b.nodestate,

    },{
      title: '操作',
      dataIndex: 'operation',
      sortOrder: 'desc',
    }

    ];
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
          {/*我的代办*/}
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

export default MyToDoTem
