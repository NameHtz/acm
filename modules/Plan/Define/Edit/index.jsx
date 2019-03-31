import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Switch, Slider, InputNumber } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';

import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const Option = Select.Option
const { TextArea } = Input;
class MenuInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,                 //国际化初始化状态
            info: {},                        //基本信息
            inputValue: 1                      //权重
        }
    }
    componentDidMount() {
        this.loadLocales();
        console.log(this.props.data)
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
                // 发送数据
                // emitter.emit('noticeUpdateEvents', { status: 'update', data: data })
                this.props.curdCurrentData({
                    title: localStorage.getItem('name'),
                    status: 'update',
                    data: data
                })
            }
        });
    }
    onChange = (value) => {
        this.setState({
            inputValue: value,
        });
    }
    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
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
        const dateWidth = '100%'
        return (
            <div className={style.main}>
                {this.state.initDone && (
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>基本信息</h3>
                        <div className={style.mainScorll}>
                            <Form onSubmit={this.handleSubmit}>
                                <div className={style.content}>
                                    <Row type="flex">
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.plan.plandefine.planname')} {...formItemLayout}>
                                                {getFieldDecorator('planName', {
                                                    initialValue: this.state.info.planName,
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
                                                {getFieldDecorator('planCode', {
                                                    initialValue: this.state.info.planCode,
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
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.orgname'),
                                                    }],
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
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.username'),
                                                    }],
                                                })(
                                                    <Select>
                                                        <Option value="模块1">模块1</Option>
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.plan.plandefine.planstarttime')} {...formItemLayout}>
                                                {getFieldDecorator('planStartTime', {
                                                    initialValue: moment(this.state.info.planStartTime, 'YYYY-MM-DD'),
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.planstarttime'),
                                                    }],
                                                })(
                                                    <DatePicker style={{ width: dateWidth }} />
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.plan.plandefine.planendtime')} {...formItemLayout}>
                                                {getFieldDecorator('planEndTime', {
                                                    initialValue: moment(this.state.info.planEndTime, 'YYYY-MM-DD'),
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.planendtime'),
                                                    }],
                                                })(
                                                    <DatePicker style={{ width: dateWidth }} />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.plan.plandefine.plantype')} {...formItemLayout}>
                                                {getFieldDecorator('planType', {
                                                    initialValue: this.state.info.planType,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.plantype'),
                                                    }],
                                                })(
                                                    <Select>
                                                        <Option value="模块1">模块1</Option>
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.plan.plandefine.importtemplate')} {...formItemLayout}>
                                                {getFieldDecorator('importTemplate', {
                                                    initialValue: this.state.info.importTemplate,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.importtemplate'),
                                                    }],
                                                })(
                                                    <Select>
                                                        <Option value="模块1">模块1</Option>
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.plan.plandefine.creator')} {...formItemLayout}>
                                                {getFieldDecorator('creator', {
                                                    initialValue: this.state.info.creator,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.creator'),
                                                    }],
                                                })(
                                                    <Input disabled={true} />
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.plan.plandefine.status')} {...formItemLayout}>
                                                {getFieldDecorator('status', {
                                                    initialValue: this.state.info.status,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.status'),
                                                    }],
                                                })(
                                                    <Select>
                                                        <Option value="模块1">模块1</Option>
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.plan.plandefine.creattime')} {...formItemLayout}>
                                                {getFieldDecorator('creatTime', {
                                                    initialValue: moment(this.state.info.creatTime, 'YYYY-MM-DD'),
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.creattime'),
                                                    }],
                                                })(
                                                    <DatePicker disabled style={{ width: dateWidth }} />
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.plan.plandefine.creattime')} {...formItemLayout}>
                                                {getFieldDecorator('creatTime', {
                                                    initialValue: moment(this.state.info.creatTime, 'YYYY-MM-DD'),
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.creattime'),
                                                    }],
                                                })(
                                                    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={11}>
                                            <Form.Item label="权重" {...formItemLayout}>
                                                {getFieldDecorator('estWt', {
                                                    initialValue: typeof this.state.inputValue === 'number' ? this.state.inputValue : 0,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.creattime'),
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
                                                                style={{ width: '100%' }}
                                                                value={this.state.inputValue}
                                                                onChange={this.onChange}
                                                            />
                                                        </Col>
                                                    </Row>
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
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
                )}

            </div>
        )
    }
}

const MenuInfos = Form.create()(MenuInfo);
export default connect(null, {
    curdCurrentData
})(MenuInfos);