import React, { Component } from 'react'
import { Modal, Form, Row, Col, Input, Button, Icon, Select, DatePicker, Slider, InputNumber, Switch, Checkbox } from 'antd';
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
const CheckboxGroup = Checkbox.Group

export class OperatePreparedEdit extends Component {
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
        let formData = this.props.data
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
                                    {/* 维度 */}
                                    {formData.type == 1 && (
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
                                    )}
                                    {/* 指标 */}
                                    {formData.type == 2 && (
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
                                                            initialValue: moment(formData.planStartTime),
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
                                                            initialValue: moment(formData.planEndTime),
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
                                    )}
                                    {/* 任务 */}
                                    {formData.type == 3 && (
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
                                                            initialValue: moment(formData.planStartTime),
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
                                                            initialValue: moment(formData.planEndTime),
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
                                                <Form.Item label={intl.get('wsd.i18n.operate.prepared.duration')} {...formItemLayout}>
                                                    <div className={style.list}>
                                                        {getFieldDecorator('duration', {
                                                            initialValue: formData.duration,
                                                            rules: [{
                                                                required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.duration'),
                                                            }],
                                                        })(
                                                            <Input />
                                                        )}
                                                    </div>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label={intl.get('wsd.i18n.operate.prepared.tasktype')} {...formItemLayout}>
                                                    <div className={style.list}>
                                                        {getFieldDecorator('taskType', {
                                                            initialValue: formData.taskType,
                                                            rules: [],
                                                        })(
                                                            <CheckboxGroup options={[{ label: '任务', value: 1 }, { label: '开始里程碑', value: 2 }, { label: '完成里程碑', value: 3 }]} defaultValue={['任务']} />
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
                                    )}
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
const OperatePreparedEdits = Form.create()(OperatePreparedEdit);
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {
        curdCurrentData
    })(OperatePreparedEdits);
