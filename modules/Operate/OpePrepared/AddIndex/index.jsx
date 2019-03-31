import React, { Component } from 'react'
import { Modal, Form, Row, Col, Input, Button, Icon, Select, DatePicker, Slider, InputNumber, Switch } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment'
import style from './style.less'

import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

const { TextArea } = Input;

export class OperatePreparedAddDimension extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalInfo: {
                title: '新增指标'
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
                        width="850px" forceRender={true} centered={true} title={this.state.modalInfo.title} visible={this.props.modalVisible} onCancel={this.props.handleCancel} footer={[
                            <Button key="saveAndSubmit" onClick={this.handleSubmit}>保存并继续</Button>,
                            <Button key="save" type="primary" onClick={this.handleSubmit}>保存</Button>,
                        ]}>
                        <Form>
                            <div className={style.content}>
                                <Row type="flex">
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.prepared.name')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('name', {
                                                    initialValue: formData.name,
                                                    rules: [{
                                                        required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.name'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.prepared.code')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('code', {
                                                    initialValue: formData.code,
                                                    rules: [{
                                                        required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.code'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.prepared.orgName')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('orgName', {
                                                    initialValue: formData.orgName,
                                                    rules: [{
                                                        required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.orgName'),
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
                                        <Form.Item label={intl.get('wsd.i18n.operate.prepared.userName')} {...formItemLayout}>
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
                                        <Form.Item label={intl.get('wsd.i18n.operate.prepared.planstarttime')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('planStartTime', {
                                                    initialValue: formData.planStartTime,
                                                    rules: [{
                                                        required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.planstarttime'),
                                                    }],
                                                })(
                                                    <DatePicker placeholder="请选择" style={{ width: '100%' }} />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.prepared.planendtime')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('planEndTime', {
                                                    initialValue: formData.planEndTime,
                                                    rules: [{
                                                        required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.planendtime'),
                                                    }],
                                                })(
                                                    <DatePicker placeholder="请选择" style={{ width: '100%' }} />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.prepared.planresource')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('planResource', {
                                                    initialValue: formData.planResource,
                                                    rules: [],
                                                })(
                                                    <Select>
                                                        <Select.Option value="1">主线</Select.Option>
                                                        <Select.Option value="2">主线</Select.Option>
                                                        <Select.Option value="3">主线</Select.Option>
                                                    </Select>
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.prepared.score')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('score', {
                                                    initialValue: formData.score,
                                                    rules: [],
                                                })(
                                                    <Input />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.prepared.checkpoint')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('checkPoint', {
                                                    initialValue: formData.checkPoint,
                                                    rules: [],
                                                })(
                                                    <Input />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.prepared.isfeedback')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('isFeedback', {
                                                    initialValue: formData.isFeedback,
                                                    rules: [],
                                                })(
                                                    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.prepared.assessment')} {...formItemLayout2}>
                                            <div className={style.list}>
                                                {getFieldDecorator('assessMent', {
                                                    initialValue: formData.assessMent,
                                                    rules: [],
                                                })(
                                                    <TextArea rows={4} cols={10} />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.prepared.scoretype')} {...formItemLayout2}>
                                            <div className={style.list}>
                                                {getFieldDecorator('scoreType', {
                                                    initialValue: formData.scoreType,
                                                    rules: [],
                                                })(
                                                    <TextArea rows={4} cols={10} />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.prepared.assesstarget')} {...formItemLayout2}>
                                            <div className={style.list}>
                                                {getFieldDecorator('assessTarget', {
                                                    initialValue: formData.assessTarget,
                                                    rules: [],
                                                })(
                                                    <TextArea rows={4} cols={10} />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.operate.prepared.remark')} {...formItemLayout2}>
                                            <div className={style.list}>
                                                {getFieldDecorator('remark', {
                                                    initialValue: formData.remark,
                                                    rules: [],
                                                })(
                                                    <TextArea rows={4} cols={10} />
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
const OperatePreparedAddDimensions = Form.create()(OperatePreparedAddDimension);
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {
    curdCurrentData
})(OperatePreparedAddDimensions);
