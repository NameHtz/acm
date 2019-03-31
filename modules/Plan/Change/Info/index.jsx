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

export class PlanChangeInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {},
            oldInfo: Object.assign([],this.props.data),
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
                alert(JSON.stringify(values))
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
        return (
            <div className={style.main}>
                <h3 className={style.listTitle}>基本信息</h3>
                <div className={style.mainScorll}>
                    <div className={style.content}>
                        <Row type="flex">
                            <Col span={12}>
                                <h4>变更后</h4>
                                <Form onSubmit={this.handleSubmit}>
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
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.username')} {...formItemLayout}>
                                        {getFieldDecorator('userName', {
                                            initialValue: this.state.info.userName,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.username'),
                                                }
                                            ],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
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
                                    <Form.Item label="计划工期" {...formItemLayout}>
                                        {getFieldDecorator('oldDay', {
                                            initialValue: this.state.info.oldDay,
                                            rules: [{
                                                required: true,
                                                message: '请输入计划工期',
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="计划级别" {...formItemLayout}>
                                        {getFieldDecorator('planLever', {
                                            initialValue: this.state.info.planLever,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入计划级别',
                                                }
                                            ],
                                        })(
                                            <Select>
                                                <Option value="一级">一级</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.plantype')} {...formItemLayout}>
                                        {getFieldDecorator('planType', {
                                            initialValue: this.state.info.planType,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择计划类型',
                                                }
                                            ],
                                        })(
                                            <Select>
                                                <Option value="月度计划">月度计划</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
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
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.remark')} {...formItemLayout}>
                                        {getFieldDecorator('remark', {
                                            initialValue: this.state.remark,
                                        })(
                                            <TextArea />
                                        )}
                                    </Form.Item>


                                    <Form.Item label="变更类型" {...formItemLayout}>
                                        {getFieldDecorator('changeType', {
                                            initialValue: this.state.info.changeType,
                                            rules: [],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="变更状态" {...formItemLayout}>
                                        {getFieldDecorator('changeStatus', {
                                            initialValue: this.state.info.changeType,
                                            rules: [],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="创建人" {...formItemLayout}>
                                        {getFieldDecorator('creator', {
                                            initialValue: this.state.info.creator,
                                            rules: [],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="创建日期" {...formItemLayout}>
                                        {getFieldDecorator('createTime', {
                                            initialValue: this.state.info.createTime,
                                            rules: [],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="发布人" {...formItemLayout}>
                                        {getFieldDecorator('pubictor', {
                                            initialValue: this.state.info.creator,
                                            rules: [],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="发布日期" {...formItemLayout}>
                                        {getFieldDecorator('pubicTime', {
                                            initialValue: this.state.info.createTime,
                                            rules: [],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Row>
                                        <Col span={8} offset={8}>
                                            <Button onClick={this.handleSubmit} type="primary">保存</Button>
                                        </Col>
                                        <Col span={8}>
                                            <Button onClick={this.props.closeRightBox}>取消</Button>
                                        </Col>
                                    </Row>

                                </Form>
                            </Col>
                            <Col span={12}>
                                <h4>变更前</h4>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.planname')} {...formItemLayout}>
                                        {getFieldDecorator('oldname', {
                                            initialValue: this.state.oldInfo.name,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.planname'),
                                            }],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.plancode')} {...formItemLayout}>
                                        {getFieldDecorator('oldcode', {
                                            initialValue: this.state.oldInfo.code,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.plancode'),
                                            }],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.orgname')} {...formItemLayout}>
                                        {getFieldDecorator('oldorgName', {
                                            initialValue: this.state.oldInfo.orgName,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.orgname'),
                                                }
                                            ],
                                        })(
                                            <Select disabled={true}>
                                                <Option value="模块1">模块1</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.username')} {...formItemLayout}>
                                        {getFieldDecorator('olduserName', {
                                            initialValue: this.state.oldInfo.userName,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.username'),
                                                }
                                            ],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.planstarttime')} {...formItemLayout}>
                                        {getFieldDecorator('oldStart', {
                                            initialValue: moment(this.state.oldInfo.Start),
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.planstarttime'),
                                            }],
                                        })(
                                            <DatePicker disabled={true} style={{ width: '100%' }} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.planendtime')} {...formItemLayout}>
                                        {getFieldDecorator('oldFinish', {
                                            initialValue: moment(this.state.oldInfo.Finish),
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.planendtime'),
                                            }],
                                        })(
                                            <DatePicker disabled={true} style={{ width: '100%' }} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="计划工期" {...formItemLayout}>
                                        {getFieldDecorator('oldoldDay', {
                                            initialValue: this.state.oldInfo.oldDay,
                                            rules: [{
                                                required: true,
                                                message: '请输入计划工期',
                                            }],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="计划级别" {...formItemLayout}>
                                        {getFieldDecorator('oldplanLever', {
                                            initialValue: this.state.oldInfo.planLever,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入计划级别',
                                                }
                                            ],
                                        })(
                                            <Select disabled={true}>
                                                <Option value="一级">一级</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.plantype')} {...formItemLayout}>
                                        {getFieldDecorator('oldplanType', {
                                            initialValue: this.state.oldInfo.planType,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择计划类型',
                                                }
                                            ],
                                        })(
                                            <Select disabled={true}>
                                                <Option value="月度计划">月度计划</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                    <Form.Item label="作业类型" {...formItemLayout}>
                                        {getFieldDecorator('oldjobType', {
                                            initialValue: this.state.oldInfo.jobType,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入作业类型',
                                                }
                                            ],
                                        })(
                                            <Select disabled={true}>
                                                <Option value="任务作业">任务作业</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                    <Form.Item label={intl.get('wsd.i18n.plan.plandefine.remark')} {...formItemLayout}>
                                        {getFieldDecorator('oldremark', {
                                            initialValue: this.state.oldInfo.remark,
                                        })(
                                            <TextArea disabled={true} />
                                        )}
                                    </Form.Item>


                                    <Form.Item label="变更类型" {...formItemLayout}>
                                        {getFieldDecorator('oldchangeType', {
                                            initialValue: this.state.oldInfo.changeType,
                                            rules: [],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="变更状态" {...formItemLayout}>
                                        {getFieldDecorator('oldchangeStatus', {
                                            initialValue: this.state.oldInfo.changeType,
                                            rules: [],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="创建人" {...formItemLayout}>
                                        {getFieldDecorator('oldcreator', {
                                            initialValue: this.state.oldInfo.creator,
                                            rules: [],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="创建日期" {...formItemLayout}>
                                        {getFieldDecorator('oldcreateTime', {
                                            initialValue: this.state.oldInfo.createTime,
                                            rules: [],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="发布人" {...formItemLayout}>
                                        {getFieldDecorator('oldpubictor', {
                                            initialValue: this.state.oldInfo.creator,
                                            rules: [],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="发布日期" {...formItemLayout}>
                                        {getFieldDecorator('oldpubicTime', {
                                            initialValue: this.state.oldInfo.createTime,
                                            rules: [],
                                        })(
                                            <Input disabled={true} />
                                        )}
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

const PlanChangeInfos = Form.create()(PlanChangeInfo)
export default PlanChangeInfos
