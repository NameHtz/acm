import React, { Component } from 'react'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Switch, Slider, InputNumber } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';
import emitter from '../../../../api/ev';
import style from './style.less'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const { TextArea } = Input;

export class PlanPreparedInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {},
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
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var data = values;
                data.key = this.state.info['key']
                emitter.emit('noticeUpdateEvents', { status: 'update', data: data })
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
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
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 22 },
                sm: { span: 20 },
            },
        };
        return (
            <div className={style.main}>
                <h3 className={style.listTitle}>基本信息</h3>
                <div style={{ overflow: 'auto', height: '85%' }}>
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            <Row type="flex">
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.planname')} {...formItemLayout}>
                                        {getFieldDecorator('name', {
                                            initialValue: this.state.info.name,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.planname'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.plancode')} {...formItemLayout}>
                                        {getFieldDecorator('code', {
                                            initialValue: this.state.info.code,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.plancode'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.orgname')} {...formItemLayout}>
                                        {getFieldDecorator('orgName', {
                                            initialValue: this.state.info.orgName,
                                            rules: [],
                                        })(
                                            <Select>
                                                <Option value="模块1">模块1</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.username')} {...formItemLayout}>
                                        {getFieldDecorator('userName', {
                                            initialValue: this.state.info.userName,
                                            rules: [],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.planstarttime')} {...formItemLayout}>
                                        {getFieldDecorator('Start', {
                                            initialValue: moment(this.state.info.Start),
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.planstarttime'),
                                            }],
                                        })(
                                            <DatePicker style={{ width: '100%' }} />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.planendtime')} {...formItemLayout}>
                                        {getFieldDecorator('Finish', {
                                            initialValue: moment(this.state.info.Finish),
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.planendtime'),
                                            }],
                                        })(
                                            <DatePicker style={{ width: '100%' }} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="计划工期" {...formItemLayout}>
                                        {getFieldDecorator('oldDay', {
                                            initialValue: this.state.info.oldDay,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.planstarttime'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="总工时" {...formItemLayout}>
                                        {getFieldDecorator('wartingDay', {
                                            initialValue: this.state.info.wartingDay,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.planendtime'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.plantype')} {...formItemLayout}>
                                        {getFieldDecorator('planType', {
                                            initialValue: this.state.info.planType,
                                            rules: [],
                                        })(
                                            <Select>
                                                <Option value="月度计划">月度计划</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="计划级别" {...formItemLayout}>
                                        {getFieldDecorator('planLever', {
                                            initialValue: this.state.info.planLever,
                                            rules: [],
                                        })(
                                            <Select>
                                                <Option value="一级">一级</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={12}>
                                    <Form.Item label="作业类型" {...formItemLayout}>
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
                                <Col span={12}>
                                    <Form.Item label="工期类型" {...formItemLayout}>
                                        {getFieldDecorator('durationType', {
                                            initialValue: this.state.info.durationType,
                                            rules: [],
                                        })(
                                            <Select>
                                                <Option value="固定资源用量">固定资源用量</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={12}>
                                    <Form.Item label="发布人" {...formItemLayout}>
                                        {getFieldDecorator('publictor', {
                                            initialValue: this.state.info.publictor,
                                            rules: [],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="创建人" {...formItemLayout}>
                                        {getFieldDecorator('creator', {
                                            initialValue: this.state.info.creator,
                                            rules: [],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={12}>
                                    <Form.Item label="发布日期" {...formItemLayout}>
                                        {getFieldDecorator('publicTime', {
                                            initialValue: moment(this.state.info.publicTime),
                                            rules: [],
                                        })(
                                            <DatePicker style={{ width: '100%' }} disabled={true} />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="创建日期" {...formItemLayout}>
                                        {getFieldDecorator('creattime', {
                                            initialValue: moment(this.state.info.creattime),
                                            rules: [],
                                        })(
                                            <DatePicker style={{ width: '100%' }} disabled={true} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={24}>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.remark')} {...formItemLayout2}>
                                        {getFieldDecorator('remark', {
                                            initialValue: this.state.remark,
                                        })(
                                            <TextArea />
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

const PlanPreparedInfos = Form.create()(PlanPreparedInfo)
export default PlanPreparedInfos
