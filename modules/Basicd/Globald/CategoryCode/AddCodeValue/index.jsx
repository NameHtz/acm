import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal, message, Switch } from 'antd';
import axios from "../../../../../api/axios"
import {addClassifyValue} from "../../../../../api/api"
import { connect } from 'react-redux';
const FormItem = Form.Item;
const { TextArea } = Input;
class AddCodeValue extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible:true,
            info: {

            }
        }
    }

    componentDidMount() {
      
        this.setState({
            width: this.props.width
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data={
                    ...values,
                    parentId:this.props.data.id,
                    boCode:this.props.boCode
                }
                let isSuccess=true
             axios.post(addClassifyValue,data,isSuccess).then(res=>{
                 console.log(res)
                 this.props.form.resetFields();
                 this.props.handleCancel()
                 this.props.AddCodeValue(res.data.data)
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
                    parentId:this.props.data.id,
                    boCode:this.props.boCode
                }
                let isSuccess=true
             axios.post(addClassifyValue,data,isSuccess).then(res=>{
                 console.log(res)
                 this.props.form.resetFields();
                 this.props.AddCodeValue(res.data.data)
             })
            }
        });
    }
    handleCancel=()=>{
        this.props.form.resetFields();
        this.props.handleCancel()
    }
    render() {
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
                    width="850px"
                    forceRender={true}
                    centered={true}
                    title="新增码值"
                    visible={this.props.visible} onCancel={this.handleCancel}
                    footer={
                        <div className='modalbtn'>
                            <Button key="submit1" onClick={this.handleSubmit1}>保存并继续</Button>
                            <Button key="submit2" type="primary" onClick={this.handleSubmit}>保存</Button>
                        </div>
                    }>
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            <Row type="flex">
                                <Col span={12}>
                                    <Form.Item
                                        label={intl.get("wsd.i18n.base.gbtype.categoryCodes")} {...formItemLayout}>
                                        {getFieldDecorator('classifyCode', {

                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.gbtype.categoryCodes'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={intl.get("wsd.i18n.base.gbtype.remark")} {...formItemLayout}>
                                        {getFieldDecorator('classifyName', {

                                            rules: [],
                                        })(
                                            <Input />
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
const AddCodeValues = Form.create()(AddCodeValue);
export default connect(state =>
    ({
      currentLocale: state.localeProviderData,
    }))(AddCodeValues);
  
