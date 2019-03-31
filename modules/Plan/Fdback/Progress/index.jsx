import React, { Component } from 'react'
import { Modal, Form, Row, Col, Input, Button, Icon, Select, DatePicker, Slider, InputNumber, Switch } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment'
import style from './style.less'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

const { TextArea } = Input;

export class PlanFdbackProgress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalInfo: {
                title: '本期进展'
            },
            initDone: false,
            info: {},
            inputValue: 1
        }
    }

    componentDidMount() {
        this.loadLocales();
        this.setState({
            info: this.props.data
        })
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            this.setState({ initDone: true });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                    'planStartTime': fieldsValue['planStartTime'].format('YYYY-MM-DD'),
                    'planEndTime': fieldsValue['planEndTime'].format('YYYY-MM-DD'),
                }
                alert(JSON.stringify(values))
                // 清空表单项
                //this.props.form.resetFields()
                // 关闭弹窗
                //this.props.handleCancel()
            }
        })
    }

    onChange = (value) => {
        this.setState({
            inputValue: value,
        });
    }

    render() {
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
                <h3 className={style.listTitle}>{this.state.modalInfo.title}</h3>
                <div className={style.formContent}>
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            <Row type="flex">
                                <Col span={12}>
                                    <Form.Item label="实际开始时间" {...formItemLayout}>
                                        {getFieldDecorator('actStartTime', {
                                            initialValue: moment(this.state.info.actStartTime),
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + "实际开始时间"
                                            }],
                                        })(
                                            <DatePicker style={{ width: '100%' }} />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="实际完成时间" {...formItemLayout}>
                                        {getFieldDecorator('actEndTime', {
                                            initialValue: moment(this.state.info.actEndTime),
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + "实际完成时间",
                                            }],
                                        })(
                                            <DatePicker style={{ width: '100%' }} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row type="flex">
                                <Col span={12}>
                                    <Form.Item label="报告日期" {...formItemLayout}>
                                        {getFieldDecorator('planStartTime', {
                                            initialValue: moment(this.state.info.planStartTime),
                                            rules: [],
                                        })(
                                            <DatePicker style={{ width: '100%' }} />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="截止日期" {...formItemLayout}>
                                        {getFieldDecorator('planEndTime', {
                                            initialValue: moment(this.state.info.planEndTime),
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + "截止日期",
                                            }],
                                        })(
                                            <DatePicker style={{ width: '100%' }} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row type="flex">
                                <Col span={12}>
                                    <Form.Item label="申请完成%" {...formItemLayout}>
                                        {getFieldDecorator('applyTime', {
                                            initialValue: moment(this.state.info.applyTime),
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + "申请完成%",
                                            }],
                                        })(
                                            <Row>
                                                <Col span={14}>
                                                    <Slider
                                                        min={1}
                                                        max={20}
                                                        onChange={this.onChange}
                                                    />
                                                </Col>
                                                <Col span={10}>
                                                    <InputNumber
                                                        min={1}
                                                        max={20}
                                                        style={{width: '100%' }}
                                                        value={this.state.inputValue}
                                                        onChange={this.onChange}
                                                    />
                                                </Col>
                                            </Row>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="估计完成" {...formItemLayout}>
                                        {getFieldDecorator('applyName', {
                                            initialValue: moment(this.state.info.applyName),
                                            rules: [],
                                        })(
                                            <DatePicker style={{ width: '100%' }} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={24}>
                                    <Form.Item label="进展说明" {...formItemLayout2}>
                                        {getFieldDecorator('progressDesc', {
                                            initialValue: this.state.info.progressDesc,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + "进展说明"
                                            }],
                                        })(
                                            <TextArea span={2} />
                                        )}
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
        )
    }
}

const PlanFdbackProgresss = Form.create()(PlanFdbackProgress);

export default PlanFdbackProgresss
