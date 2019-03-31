import React, { Component } from 'react'
import { Modal, Form, Row, Col, Input, Button, Icon, Select, DatePicker, Slider, InputNumber, Switch } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment'
import style from './style.less'
import '../../../../asserts/antd-custom.less'

import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

const { TextArea } = Input;

export class OperateDefineAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalInfo: {
                title: '新增计划'
            },
            initDone: false,
            inputValue: 0
        }
    }

    componentDidMount() {
        this.loadLocales();
    }

    loadLocales() {
        intl.init({
            currentLocale: this.props.currentLocale.currentLocale,
            locales,
        }).then(() => {
            this.setState({ initDone: true });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                this.props.curdCurrentData({
                    title: localStorage.getItem('name'),
                    status: 'add',
                    data: fieldsValue
                })

                alert(JSON.stringify(fieldsValue))
                // 清空表单项
                this.props.form.resetFields()
                // 关闭弹窗
                this.props.handleCancel()
            }
        })
    }

    onChange = (value) => {
        this.setState({
            inputValue: value,
        });
    }

    render() {
        let formData = {
            name: '',
            code: '',
            orgName: '',
            userName: '',
            year: '2019',
            status: '',
            remark: ''
        }
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
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
        const formItemLayout2 = {
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
                {this.state.initDone && (
                    <Modal className={style.formMain}
                        width="850px" forceRender={true} centered={true} title={this.state.modalInfo.title} visible={this.props.modalVisible} onCancel={this.props.handleCancel} footer={
                            <div className="modalbtn">
                                <Button key="1" onClick={this.handleSubmit}>保存并继续</Button>
                                <Button key="2" type="primary" onClick={this.handleSubmit}>保存</Button>
                            </div>
                        }>
                        <Form>
                            <div className={style.content}>
                                <Row type="flex">
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.define.name')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('name', {
                                                    initialValue: formData.name,
                                                    rules: [{
                                                        required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.define.name'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.define.code')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('code', {
                                                    initialValue: formData.code,
                                                    rules: [{
                                                        required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.define.code'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.define.orgName')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('orgName', {
                                                    initialValue: formData.orgName,
                                                    rules: [{
                                                        required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.define.orgName'),
                                                    }],
                                                })(
                                                    <Select>
                                                        <Select.Option value="1">总经办</Select.Option>
                                                        <Select.Option value="2">研发部</Select.Option>
                                                        <Select.Option value="3">研发部</Select.Option>
                                                    </Select>
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.define.userName')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('userName', {
                                                    initialValue: formData.userName,
                                                    rules: [],
                                                })(
                                                    <Select>
                                                        <Select.Option value="1">孙博宇</Select.Option>
                                                        <Select.Option value="2">孙博宇</Select.Option>
                                                        <Select.Option value="3">孙博宇</Select.Option>
                                                    </Select>
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.define.year')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('year', {
                                                    initialValue: moment(formData.year, 'YYYY-MM-DD'),
                                                    rules: [
                                                        { type: 'object', required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.define.year') }
                                                    ],
                                                })(
                                                    <DatePicker placeholder="请选择" style={{ width: '100%' }} />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.define.status')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('status', {
                                                    initialValue: formData.status,
                                                    rules: [
                                                        {
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.define.status'),
                                                        }
                                                    ],
                                                })(
                                                    <Select>
                                                        <Select.Option value="1">激活</Select.Option>
                                                        <Select.Option value="2">激活</Select.Option>
                                                        <Select.Option value="3">激活</Select.Option>
                                                    </Select>
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.define.remark')} {...formItemLayout2}>
                                            <div className={style.list}>
                                                {getFieldDecorator('remark', {
                                                    initialValue: formData.remark,
                                                    rules: [],
                                                })(
                                                    <TextArea rows={2} cols={10} />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </Modal>
                )}
            </div>
        )
    }
}
const OperateDefineAdds = Form.create()(OperateDefineAdd);
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {
        curdCurrentData
    })(OperateDefineAdds);
