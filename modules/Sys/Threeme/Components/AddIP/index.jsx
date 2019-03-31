import React, { Component } from 'react'
import { Modal, Input, Form, Row, Col, Select, Button, Checkbox } from "antd"
import style from './style.less'
import axios from "../../../../../api/axios"
import { tmmAdd } from "../../../../../api/api"
import intl from 'react-intl-universal'
const Option = Select.Option
const { TextArea } = Input;

const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}
class AddIp extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        this.loadLocales();
    }
    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        })
            .then(() => {
                // After loading CLDR locale data, start to render
                this.setState({ initDone: true });
            });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.tmmIP(values);
            }
        });
    }
    tmmIP = (e) => {
        const body = ({
            "startIP": e.startIP,
            "endIP": e.endIP,
            "accessRule": e.accessRule,
            "remark": e.remark
        })
        axios.post(tmmAdd, body,true).then(res => {
            console.log("增加成功" + JSON.stringify(res));
            this.props.handleCancel();
            //通知表单更新
             this.props.AddIp(res.data.data)
        })
            .catch(err => {
                console.log("增加失败" + JSON.stringify(err));
            })
    }
    render() {
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
        }
        const formItemLayout1 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        return (
            <div className={style.main}>
                <Modal

                    title="新增IP访问规则"
                    visible={this.props.visible}
                    //   onOk={this.handleOk}
                    onCancel={this.props.handleCancel}
                    width="800px"
                    footer={
                        <div className="modalbtn">
                            <Button key={3} type="primary" onClick={this.handleSubmit}>确定</Button>
                            <Button key={2} onClick={this.props.handleCancel} >取消</Button>
                        </div>
                    }
                >
                    <div >
                        <Form className={style.addip}
                            onSubmit={this.handleSubmit}>
                            <Row >
                                <Col span={11}>
                                    <Form.Item
                                        label="起始IP"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('startIP', {
                                            rules: [{
                                                required: true,
                                                message: "请输入起始IP",
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={11} >
                                    <Form.Item
                                        label="结束IP"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('endIP', {
                                            rules: [{
                                                required: true,
                                                message: "请输入结束IP",
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={11} >
                                    <Form.Item
                                        label="规则类型"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('accessRule', {
                                            rules: [{
                                                required: true,
                                                message: "请输入规则类型",
                                            }],
                                        })(
                                            <Select
                                            >
                                                <Option value="0">禁止访问</Option>
                                                <Option value="1">允许访问</Option>
                                            </Select>
                                        )}

                                    </Form.Item>
                                </Col>
                                {/* <Col span={11} >
                                    <Form.Item
                                      label="是否生效"
                                      {...formItemLayout}
                                    >
                                        <Checkbox></Checkbox>
                                    </Form.Item>
                                </Col> */}
                            </Row>
                            <Row >
                                <Col span={22}>
                                    <Form.Item
                                        label="备注"
                                        {...formItemLayout1}
                                    >     {getFieldDecorator('remark', {
                                        rules: [{
                                            required: true,
                                            message: "请输入备注",
                                        }],
                                    })(
                                        <TextArea />
                                    )}

                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}
const AddIps = Form.create()(AddIp);
export default AddIps
// export default AddIp