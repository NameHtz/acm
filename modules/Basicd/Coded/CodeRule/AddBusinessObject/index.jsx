import React, { Component } from 'react';
import style from './style.less';
import { connect } from 'react-redux';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Select,
  DatePicker,
  Modal,
  message,
  Switch,
} from 'antd';
import intl from 'react-intl-universal';
import axios from '../../../../../api/axios';
import { addCoderulebo, updateCoderulebo,checkTableName,findTableFileds,getCoderuleboInfo} from '../../../../../api/api';


const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
export class AddBusinessObject extends Component {
  constructor(props) {
    super(props);
    this.state = {

      info: {},
      tableArray:null//表名
    };
  }
  initTableName=()=>{
    if(!this.state.tableArray){
      axios.get(checkTableName).then(res=>{
        this.setState({
          tableArray:res.data.data
        })
      })
    }
 
  }
  componentDidMount() {
    const { type, data } = this.props
    console.log(data)
    
    if (type == "add") {
      this.setState({
        info: {}
      })
      return
    }
    if (type == "modify") {
      axios.get(getCoderuleboInfo(data.id)).then(res1=>{
     
       
        axios.get(checkTableName).then(res2=>{
          this.setState({
            tableArray:res2.data.data
          },()=>{
            if(res1.data.data.tableName){
              axios.get(findTableFileds(res1.data.data.tableName)).then(res3=>{
                this.setState({
                  tableField:res3.data.data
                },()=>{
                  this.setState({
                     info:res1.data.data
                  })
                })
              })
            }
           
          })
        })
      })
     
    }

  }

  onchangeTable=(v)=>{
    axios.get(findTableFileds(v)).then(res=>{
      console.log(res)
      this.setState({
        tableField:res.data.data
      })
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    const { type, data } = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //新增
        if (type == "add") {
          let info = {
            // ...data,
            ...values
          }
          axios.post(addCoderulebo, info, true).then(res => {
            this.props.addCoderulebo(res.data.data)
            this.props.form.resetFields();
            this.props.handleCancel()
          })
          return
        }
        //修改
        if (type == "modify") {
          let info = {
            ...data,
            ...values
          }
          axios.put(updateCoderulebo, info, true).then(res => {
            this.props.updateCoderulebo(res.data.data)
            this.props.handleCancel()
          })
        }
      }
    });
  };

  render() {
    const { intl } = this.props.currentLocale
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div className={style.main}>
        {/* <h2>{intl.get('wbs.add.name')}</h2>*/}
        <Modal
          className={style.formMain}
          width="850px"

          centered={true}
          title={this.props.title}
          visible={true}
          onCancel={this.props.handleCancel}
          footer={
            <div className="modalbtn">
              {this.props.type == "add" &&
                <div>
                  <Button key="submit1" onClick={this.handleSubmit}>
                    保存并继续
              </Button>
                  <Button key="submit2" type="primary" onClick={this.handleSubmit}>
                    保存
              </Button>
                </div>
              }
              {this.props.type == "modify" &&
                <div>
                  <Button key="submit1" onClick={this.props.handleCancel}>
                    取消
              </Button>
                  <Button key="submit2" type="primary" onClick={this.handleSubmit}>
                    确定
              </Button>
                </div>
              }
            </div>
          }
        >
          <Form onSubmit={this.handleSubmit}>
            <div className={style.content}>
              <Row>
                <Col span={12}>
                  <Form.Item label="代码" {...formItemLayout}>
                    {getFieldDecorator('boCode', {
                      initialValue: this.state.info.boCode ? this.state.info.boCode : null,
                      rules: [
                        {
                          required: true,
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="名称" {...formItemLayout}>
                    {getFieldDecorator('boName', {
                      initialValue: this.state.info.boName ? this.state.info.boName : null,
                      rules: [
                        {
                          required: true,
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="表名" {...formItemLayout}>
                    {getFieldDecorator('tableName', {
                      initialValue: this.state.info.tableName&&this.state.tableArray ? this.state.info.tableName : null,
                      rules: [
                        {
                          required: true,
                          message:
                            intl.get('wsd.i18n.message.enter') +
                            intl.get('wsd.i18n.base.planTemAddTask.name'),
                        },
                      ],
                    })(
                      <Select onChange={this.onchangeTable} onDropdownVisibleChange={this.initTableName}>
                        {this.state.tableArray && this.state.tableArray.map(item=>{
                          return <Option value={item.value} key={item.value}>{item.title}</Option>
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="代码字段" {...formItemLayout}>
                    {getFieldDecorator('codeColumnName', {
                      initialValue: this.state.info.codeColumnName ? this.state.info.codeColumnName : null,
                      rules: [],
                    })(
                      <Select >
                      {this.state.tableField && this.state.tableField.map(item=>{
                        return <Option value={item.value} key={item.value}>{item.title}</Option>
                      })}
                    </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="流水号范围" {...formItemLayout}>
                    {getFieldDecorator('seqScope', {
                      initialValue: this.state.info.seqScope ? this.state.info.seqScope : null,
                      rules: [
                        {
                          required: true,
                          message:
                            intl.get('wsd.i18n.message.enter') +
                            intl.get('wsd.i18n.base.planTemAddTask.name'),
                        },
                      ],
                    })(
                      <Select>
                      {this.state.tableField && this.state.tableField.map(item=>{
                        return <Option value={item.value} key={item.value}>{item.title}</Option>
                      })}
                    </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="被分配字段" {...formItemLayout}>
                    {getFieldDecorator('assignColumnName', {
                      initialValue: this.state.info.assignColumnName &&this.state.tableField ? this.state.info.assignColumnName : null,
                      rules: [{
                        required: true,
                        message:
                          intl.get('wsd.i18n.message.enter') +
                          intl.get('wsd.i18n.base.planTemAddTask.name'),
                      }],
                    })(
                      <Select >
                        {this.state.tableField && this.state.tableField.map(item=>{
                          return <Option value={item.value} key={item.value}>{item.title}</Option>
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}
const AddBusinessObjects = Form.create()(AddBusinessObject);

export default connect(state => ({ currentLocale: state.localeProviderData }))(AddBusinessObjects);