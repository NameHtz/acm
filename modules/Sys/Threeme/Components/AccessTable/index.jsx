import { Table, Input, InputNumber, Popconfirm, Form, Select } from 'antd';
import style from './style.less';
import axios from '../../../../../api/axios';
import { tmmList, tmmUpdate ,tmmDelete} from '../../../../../api/api';
import AddTopBtn from '../../../../../components/public/TopTags/AddTopBtn';
import DeleteTopBtn from '../../../../../components/public/TopTags/DeleteTopBtn';
import AddIp from '../AddIP';
const Option = Select.Option;
const data = [];
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'accessRule') {
      return (
        <Select style={{width:"100%"}}>
          <Option value={0}>禁止访问</Option>
          <Option value={1}>允许访问</Option>
        </Select>
      );
    }
    if (this.props.inputType === 'isEffect') {
      return (
        <Select style={{width:"100%"}}>
          <Option value={0}>否</Option>
          <Option value={1}>是</Option>
        </Select>
      );
    }
    return <Input />;
  };

  render() {
    const { editing, dataIndex, title, inputType, record, index, ...restProps } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `请输入 ${title}!`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isaddip: false,
      data,
      editingKey: '',
      selectedRowKeys: null, //被选中的角色
      activeIndex: '',
      selectData: [],
    };
    this.columns = [
      {
        title: '起始IP',
        dataIndex: 'startIP',
      
        render: (text, record) => <div className="editable-row-text">{text}</div>,
        editable: true,
      },
      {
        title: '结束IP',
        dataIndex: 'endIP',
       
        render: (text, record) => <div className="editable-row-text">{text}</div>,
        editable: true,
      },
      {
        title: '规则类型',
        dataIndex: 'accessRule',
        
        render: (text, record) => text==0?<div className="editable-row-text">禁止访问</div>:<div className="editable-row-text">允许访问</div>,
        editable: true,
      },
      {
        title: '是否生效',
        dataIndex: 'isEffect',
        width: '15%',
        render: (text, record) => text==0?<span className="editable-row-text">否</span>:<span className="editable-row-text">是</span>,
        editable: true,
      },
      {
        title: '备注',
        dataIndex: 'remark',
       
        render: (text, record) => <div className="editable-row-text">{text}</div>,
        editable: true,
      },
      {
        title: '操作',
       
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div className="editable-row-operations">
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record)}
                        style={{ marginRight: 8 }}
                      >
                        保存
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="确定取消?"
                    onConfirm={() => this.cancel(record.id)}
                    okText="确认"
                    cancelText="取消"
                  >
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.id)}>编辑</a>
              )}
            </div>
          );
        },
      },
    ];
  }

  componentDidMount() {
    axios
      .get(tmmList)
      .then(res => {
        console.log('获取成功' ,res);
        this.setState({
          data: res.data.data,
        });
      })
      .catch(err => {
        console.log('获取失败' + JSON.stringify(err));
      });
    // this.getTree();
  }
  isEditing = record => record.id === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, record) {
    // console.log(form);
    // console.log(key)
    form.validateFields((error, row) => {
      console.log(row)
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => record.id === item.id);
      if (index > -1) {
        const item = newData[index];
        console.log(item)
        console.log(row)
        axios.put(tmmUpdate,  {
          ...item,
          ...row,
        },true).then(res => {
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          this.setState({ data: newData, editingKey: '' });
        });
      
       
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
    return false;
    //ip保存接口
    // const data={
    //   "id": 0,
    //   "startIP": "string",
    //   "endIP": "string",
    //   "accessRule": 0,
    //   "remark": "string"
    // }
    
  }

  edit(key) {
    this.setState({ editingKey: key });
  }
  getInfo = (record, index) => {
    const { activeIndex } = this.state;
    const { id } = record;
    if (activeIndex === record.id) {
        this.setState({
            record: null,
            activeIndex: null,
        });
    } else {
        this.setState({
            record,
            activeIndex: id,
        });
    }
};

  setClassName = (record, index) => {
    //判断索引相等时添加行的高亮样式
    return record.id === this.state.activeIndex ? 'tableActivty' : '';
  };

  // rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     // console.log(selectedRowKeys);
  //     console.log(selectedRows);
  //   },
  // };

  onChange(row,item) {
    console.log(this.props)
    this.props.deleteFn(item)
  }
  showAddIpModal = () => {
    this.setState({
      isaddip: true,
    });
  };
  handleOk = e => {
    this.setState({
      visible: false,
    });
  };
  closeAddIpModal = () => {
    this.setState({
      isaddip: false,
    });
  };
  delete=()=>{
    const {record,data}=this.state
    if(record){
      axios
      .deleted(tmmDelete,{ data:[record.id]} , true)
      .then(res => {
        let index=data.findIndex(item=>item.id==record.id)
       
        this.setState(preState=>({
          data:[...preState.data.slice(0,index),...preState.data.slice(index+1)]
        }))
      })}

  }
  AddIpdata=(ipdata)=>{
    const {data}=this.state
    data.push(ipdata)
    this.setState({
      data
    })
  }
  render() {
    const rowSelection = {
      onChange:this.onChange.bind(this)
    };
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      if(col.dataIndex=='accessRule'){
        return{
          ...col,
          onCell: record => ({
            record,
  
            inputType:'accessRule',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      }
      if(col.dataIndex=="isEffect"){
        return {
          ...col,
          onCell: record => ({
            record,
  
            inputType:'isEffect',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      }
      return {
        ...col,
        onCell: record => ({
          record,

          inputType:'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <div className={style.main}>
       <div className={style.setroleAccessOperate}>
                      <AddTopBtn onClickHandle={this.showAddIpModal} />
                      <DeleteTopBtn onClickHandle={this.delete} />
                    </div>
        <Table
          onChange={this.onChange.bind(this)}
          pagination={false}
          rowClassName={this.setClassName}
          scroll={{ x: true }}
          rowSelection={rowSelection}
          components={components}
          bordered
          dataSource={this.state.data}
          rowKey={record => record.startIP}
          columns={columns}
          rowClassName={this.setClassName}
          onRow={(record, index) => {
            return {
              onClick: event => {
                this.getInfo(record, index);
              },
            };
          }}
        />
          <AddIp
          AddIp={this.AddIpdata}
                      visible={this.state.isaddip}
                      handleOk={this.handleOk.bind(this)}
                      handleCancel={this.closeAddIpModal.bind(this)}
                    />
      </div>
    );
  }
}

export default EditableTable;
