import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, Switch, Modal, message } from 'antd';
import { connect } from 'react-redux';

import axios from '../../../../../api/axios';
import { ruleAdd } from "../../../../../api/api"



const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option
class AddRule extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {

            }
        }
    }

    componentDidMount() {
      
    }

 

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
         
                let data={
                    ...values,
                    defaultFlag:values.defaultFlag? 1:0,
                    modified:values.modified? 1:0,
                    ruleBoId:this.props.ruleBoId
                }           
                console.log(data) 
                axios.post(ruleAdd,data,true)
                 .then(res => {
                     //通知表格新增
                  this.props.AddRule(res.data.data)
                  this.props.handleCancel() 
                 })
            }
        });
    }
    handleSubmit1 = (e) => {
        e.preventDefault();
        
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
         
                let data={
                    ...values,
                    defaultFlag:values.defaultFlag? 1:0,
                    modified:values.modified? 1:0,
                    ruleBoId:this.props.ruleBoId
                }           
                console.log(data) 
                axios.post(ruleAdd,data,true)
                 .then(res => {
                     //通知表格新增
                  this.props.AddRule(res.data.data)
                  this.props.form.resetFields();
                 })
            }
        });
    }
    render() {
        // const { inputType,indefaultFlag } =this.props
        const { intl } = this.props.currentLocale
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
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
                    width="450px"
                  
                    centered={true}
                    title="新增规则"
                    visible={this.props.visible} onCancel={this.props.handleCancel}
                    footer={
                        <div className='modalbtn'>
                            <Button key="submit1" onClick={this.handleSubmit1}>保存并继续</Button>
                            <Button key="submit2" type="primary" onClick={this.handleSubmit}>保存</Button>
                        </div>
                    }>
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            <Row  >
                                <Col span={24}>
                                    <Form.Item
                                        label="名称" {...formItemLayout}>
                                        {getFieldDecorator('ruleName', {

                                            rules: [{
                                                required: true,

                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="默认" {...formItemLayout}>
                                        {getFieldDecorator('defaultFlag', {

                                            rules: [],
                                        })(
                                            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked  />
                                        )}
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item
                                        label="可被修改" {...formItemLayout}>
                                        {getFieldDecorator('modified', {

                                            rules: [],
                                        })(
                                            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked  />
                                        )}
                                    </Form.Item>
                                </Col>

                            </Row>

                        </div>

                    </Form>
                </Modal>
            </div>
        )
    }
}
const AddRules = Form.create()(AddRule);
export default connect(state => ({ currentLocale: state.localeProviderData }))(AddRules);
