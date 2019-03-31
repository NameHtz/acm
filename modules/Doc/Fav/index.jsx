import React, { Component } from 'react'
import { Input, Table, Icon, Modal, Form, Button, Popconfirm } from 'antd'
import intl from 'react-intl-universal'
import style from './style.less'
import Drop from './Dropdown/index'
import { connect } from 'react-redux'
import store from '../../../store'
import { saveCurrentData, resetRightCurrentData } from '../../../store/rightData/action'
import { curdCurrentData, resetCurrentData } from '../../../store/curdData/action'
import { changeLocaleProvider } from '../../../store/localeProvider/action'
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'

const confirm = Modal.confirm
const locales = {
  "en-US": require('../../../api/language/en-US.json'),
  "zh-CN": require('../../../api/language/zh-CN.json')
}

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}


class ProjectDoc extends Component {

  state = {
    activeIndex: '',
    collectVisible: false,
    DroVisible: false,
    X: 0,
    Y: 0,
    rightHide: true,
    rightData: null,
    rightTags: [
      { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Doc/Fav/BasicInfo' },
    ],
    LeftColumns: [{
      title: '文件夹名称',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      render: text => <span><Icon type="folder" className={style.leftTableIcon} />{text}</span>
    }, {
      title: '文档数量',
      dataIndex: 'quantity',
      key: 'quantity',
    }],
    LeftData: [{
      id: 1,
      name: '项目招投标文件',
      quantity: 1,
      children: [{
        id: 11,
        name: '工程图纸文件',
        quantity: 0,
      }]
    }, {
      id: 2,
      name: '工程合同文件',
      quantity: 2,
      children: [{
        id: 21,
        name: '工程图纸文件',
        quantity: 0,
      }, {
        id: 22,
        name: '工程图纸文件',
        quantity: 0,
      }]
    }],
    RightColumns: [{
      title: '文档标题',
      dataIndex: 'name',
      key: 'name',
      render: text => <span> <Icon type="eye" className={style.icon} />{text}</span>
    }, {
      title: '文档编号',
      dataIndex: 'num',
      key: 'num',
    }, {
      title: '文档类别',
      dataIndex: 'category',
      key: 'category',
    }, {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    }, {
      title: '版本',
      dataIndex: 'edition',
      key: 'edition',
    }, {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    }, {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '最近更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    }, {
      title: '上传人',
      dataIndex: 'theHeir',
      key: 'theHeir',
    }, {
      title: '文档状态',
      dataIndex: 'docState',
      key: 'docState',
    }],
    RightData: [{
      id: '1',
      num: '0000',
      title: '',
      author: '',
      edition: '',
      updateTime: '2019-01-11 9:00:00',
      theHeir: '陈常青',
      docState: '新建',
      name: 'EC00620-pmis.xls',
      time: '2019-01-11 9:00:00',
      creator: '任正华',
    }, {
      id: '2',
      num: '0000',
      title: '',
      author: '',
      edition: '',
      updateTime: '2019-01-11 9:00:00',
      theHeir: '谭义',
      docState: '已发布',
      name: 'EC00620.xls',
      time: '2019-01-11 9:00:00',
      creator: '谭义',
    }, {
      id: '3',
      num: '0000',
      title: '',
      author: '',
      edition: '',
      updateTime: '2019-01-11 9:00:00',
      theHeir: '任正华',
      docState: '审批中',
      name: 'EC00620.xls',
      time: '2019-01-11 9:00:00',
      creator: '谭义',
    }]

  }

  componentDidMount() {
    this.loadLocales()
  }

  loadLocales() {
    intl.init({
      /* *********** 从redux中获取国家化语言 ************* */
      currentLocale: this.props.currentLocale.currentLocale,
      locales,
    }).then(() => {

    })
  }

  collect = () => {
    confirm({
      title: '您确定要移除该收藏吗？',
      cancelText: '取消',
      okText: '确定',
      content: "取消收藏后，您的收藏夹里将不会显示该文档信息",
      onOk() {


      }
    });
  }


  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },

  }
  setClassName = (record, index) => {
    //判断索引相等时添加行的高亮样式
    return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
  }

  getInfo(record) {
    // console.log(record)

    let id = record.id, records = record

    /* *********** 点击表格row执行更新state start ************* */
    if (this.state.activeIndex == id) {
      id = ''
      records = ''
      this.props.resetRightCurrentData()
    }
    /* *********** 点击表格row执行更新state end ************* */

    // 发送数据
    // emitter.emit('noticeRightOrTop', records)

    this.setState({
      activeIndex: id,
      rightData: records
    })

  }


  DropHandleCancel = () => {
    this.setState({ DroVisible: false })
  }

  clickRightMenu = (value) => {
    console.log(value)
    if (value == "modify") {
      this.DropHandleCancel()

      return
    }
    if (value == "delete") {
      this.DropHandleCancel()
      confirm({
        title: '您确定要删除收藏夹吗？',
        cancelText: '取消',
        okText: '确定',
        content: "删除收藏夹后，该收藏夹的文档信息也将一并删除",
        onOk() {


        }
      });
      return
    }
    if (value == "add") {
      this.DropHandleCancel()
      return
    }

  }

  RightHide = (v) => {
    // console.log(v)
    this.setState({ rightHide: false })

  }
  rightIconBtn = () => {
    this.setState({ rightHide: true })
  }

  handleSave = (row) => {
    const newData = [...this.state.LeftData];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ LeftData: newData });
  }

  render() {

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.state.LeftColumns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <div>
        <TopTags />
        <div className={style.main}>
          {this.state.rightHide &&
            <div className={style.leftMain} style={{ height: this.props.height }}>
              <Table rowKey={record => record.id} columns={columns} dataSource={this.state.LeftData}
                pagination={false} components={components}
                onRow={(record) => {
                  return {
                    onContextMenu: (event) => {
                      this.setState({ DroVisible: true, X: event.clientX, Y: event.clientY })
                      event.preventDefault()

                    }
                  }
                }}
              />
            </div>}
          {!this.state.rightHide &&
            <div className={style.rightIconBtn} onClick={this.rightIconBtn}><Icon type="double-right" /></div>
          }

          <div className={style.conMain} style={{ height: this.props.height }}>
            <Table rowKey={record => record.id} rowSelection={this.rowSelection} columns={this.state.RightColumns}
              dataSource={this.state.RightData} pagination={false}
              rowClassName={this.setClassName}
              onRow={(record, index) => {
                return {
                  onClick: (event) => {
                    // console.log(record)
                    this.getInfo(record)
                  }
                }
              }}
            />


            <Drop visible={this.state.DroVisible} handleCancel={this.DropHandleCancel.bind(this)} X={this.state.X}
              Y={this.state.Y} handleClick={this.clickRightMenu.bind(this)} />
          </div>
          <div className={style.rightBox} style={{ height: this.props.height }}>
            <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData} rightHide={this.RightHide} rightIconBtn={this.rightIconBtn} />
          </div>
        </div>
      </div>
    )
  }
}


/* *********** connect链接state及方法 start ************* */
export default connect(state => ({
  currentLocale: state.localeProviderData
}), {
    saveCurrentData,
    curdCurrentData,
    resetRightCurrentData,
    resetCurrentData,
    changeLocaleProvider
  })(ProjectDoc);
/* *********** connect链接state及方法 end ************* */
