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

export class PlanDefineEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false
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
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>基本信息</h3>
                        <div className={style.mainScorll}>
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
                                                        <TextArea rows={4} cols={10} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col span={24}>
                                            <Col offset={4} >
                                                <Button onClick={this.handleSubmit} style={{ width: "100px" }} type="primary">保存</Button>
                                                <Button onClick={this.props.closeRightBox} style={{ width: "100px", marginLeft: "20px" }}>取消</Button>
                                            </Col>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
const PlanDefineEdits = Form.create()(PlanDefineEdit);
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {
        curdCurrentData
    })(PlanDefineEdits);
