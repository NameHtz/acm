import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal, message, Switch } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';
import '../../../../asserts/antd-custom.less'

import emitter from '../../../../api/ev'
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const { TextArea } = Input;
export class PlanPreparedAddTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                key: 1,
                name: "",
                code: "",
                iptName: "",
                userName: "",
                planStartTime: '2019-01-28',
                planEndTime: '2019-01-28',
                planDrtn: "",
                planWorkHours: "",
                planType: "",
                planLevel: "",
                jobType: "",
                isCtrl: 1,
                drtnType: "",
                remark: "",
            }
        }
    }

    componentDidMount() {
        this.loadLocales()
        this.setState({
            width: this.props.width
        })
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
                alert(JSON.stringify(values))
            }
        });
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
        };
        const formItemLayout1 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 21 },
            },
        };
        return (
            <div className={style.main}>
                {/* <h2>{intl.get('wbs.add.name')}</h2>*/}
                <Modal className={style.formMain} width="850px" forceRender={true} centered={true}
                    title="新增任务" visible={this.props.modalVisible} onCancel={this.props.handleCancel} footer={
                        <div className="modalbtn">
                            <Button key="1" onClick={this.handleSubmit}>保存并继续</Button>
                            <Button key="2" type="primary" onClick={this.handleSubmit}>保存</Button>
                        </div>
                    }>
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            <Row gutter={24} type="flex">
                                <Col span={11}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddTask.name')} {...formItemLayout}>
                                        {getFieldDecorator('name', {
                                            initialValue: this.state.info.name,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddTask.name'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddTask.code')} {...formItemLayout}>
                                        {getFieldDecorator('code', {
                                            initialValue: this.state.info.code,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddTask.code'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}> <Col span={11}>
                                <Form.Item label={intl.get('wsd.i18n.base.planTemAddTask.iptname')} {...formItemLayout}>
                                    {getFieldDecorator('iptName', {
                                        initialValue: this.state.info.iptName,
                                        rules: [],
                                    })(
                                        <Select>
                                            <Option value="模块1">模块1</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={11}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddTask.username')} {...formItemLayout}>
                                        {getFieldDecorator('userName', {
                                            initialValue: this.state.info.userName,
                                            rules: [],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}> <Col span={11}>
                                <Form.Item
                                    label={intl.get('wsd.i18n.base.planTemAddTask.planstarttime')} {...formItemLayout}>
                                    {getFieldDecorator('planStartTime', {
                                        initialValue: moment(this.state.info.planStartTime),
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddTask.planstarttime'),
                                        }],
                                    })(
                                        <DatePicker style={{ width: '100%' }} />
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={11}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddTask.planendtime')} {...formItemLayout}>
                                        {getFieldDecorator('planEndTime', {
                                            initialValue: moment(this.state.info.planEndTime),
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddTask.planendtime'),
                                            }],
                                        })(
                                            <DatePicker style={{ width: '100%' }} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}> <Col span={11}>
                                <Form.Item
                                    label={intl.get('wsd.i18n.base.planTemAddTask.plandrtn')} {...formItemLayout}>
                                    {getFieldDecorator('planDrtn', {
                                        initialValue: this.state.info.planDrtn,
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddTask.plandrtn'),
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={11}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddTask.planworkhours')} {...formItemLayout}>
                                        {getFieldDecorator('planWorkHours', {
                                            initialValue: this.state.info.planWorkHours,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddTask.planworkhours'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}> <Col span={11}>
                                <Form.Item
                                    label={intl.get('wsd.i18n.base.planTemAddTask.plantype')} {...formItemLayout}>
                                    {getFieldDecorator('planType', {
                                        initialValue: this.state.info.planType,
                                        rules: [],
                                    })(
                                        <Select>
                                            <Option value="模块1">模块1</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={11}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddTask.planlevel')} {...formItemLayout}>
                                        {getFieldDecorator('planLevel', {
                                            initialValue: this.state.info.planLevel,
                                            rules: [],
                                        })(
                                            <Select>
                                                <Option value="一级">一级</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}> <Col span={11}>
                                <Form.Item label={intl.get('wsd.i18n.base.planTemAddTask.jobtype')} {...formItemLayout}>
                                    {getFieldDecorator('jobType', {
                                        initialValue: this.state.info.jobType,
                                        rules: [],
                                    })(
                                        <Select>
                                            <Option value="任务作业">任务作业</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={11}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddTask.drtntype')} {...formItemLayout}>
                                        {getFieldDecorator('drtnType', {
                                            initialValue: this.state.info.drtnType,
                                            rules: [],
                                        })(
                                            <Select>
                                                <Option value="固定资源用量">固定资源用量</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={22}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddTask.remark')} {...formItemLayout1}>
                                        {getFieldDecorator('remark', {
                                            initialValue: this.state.info.remark,
                                            rules: [],
                                        })(
                                            <TextArea rows={4} />
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
const PlanPreparedAddTasks = Form.create()(PlanPreparedAddTask);
export default PlanPreparedAddTasks
