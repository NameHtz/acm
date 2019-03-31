import React, { Component } from 'react'
import { Modal, Form, Row, Col, Input, Button, Icon, Select, DatePicker, Slider, InputNumber, Switch } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment'
import style from './style.less'

import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'
import '../../../../asserts/antd-custom.less'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

const { TextArea } = Input;

export class PlanDefineAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalInfo: {
                title: '新增计划'
            },
            initDone: false,
            inputValue: 1
        }
    }

    componentDidMount() {
        this.loadLocales();
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
                // emitter.emit('noticeUpdateEvents', { status: 'add', data: values })
                this.props.curdCurrentData({
                    title: localStorage.getItem('name'),
                    status: 'add',
                    data: values
                })
                //this.props.curdCurrentData('add', 'status')
                //this.props.curdCurrentData(values, 'data')

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
            planName: '',
            planCode: '',
            orgName: '',
            userName: '',
            planStartTime: '2019-01-25',
            planEndTime: '2019-01-26',
            planType: '',
            importTempPlan: '',
            weights: 6,
            switch: true,
            remark: ''
        }
        /* 
         * getFieldDecorator 用于和表单进行双向绑定
         * getFieldError 获取某个输入控件的 Error
         * getFieldsError 获取一组输入控件的 Error ，如不传入参数，则获取全部组件的 Error
         * getFieldsValue 获取一组输入控件的值，如不传入参数，则获取全部组件的值
         * isFieldTouched 判断一个输入控件是否经历过 getFieldDecorator 的值收集时机 options.trigger
         * getFieldValue 获取一个输入控件的值
         * isFieldsTouched 判断是否任一输入控件经历过 getFieldDecorator 的值收集时机 options.trigger
         */
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
                        width="850px" forceRender={true} centered={true} title={this.state.modalInfo.title} visible={this.props.modalVisible} onCancel={this.props.handleCancel} footer={<div className="modalbtn">
                            <Button key="1" onClick={this.handleSubmit}>保存并继续</Button>
                            <Button key="2" type="primary" onClick={this.handleSubmit}>保存</Button>
                        </div>}>
                        <Form>
                            <div className={style.content}>
                                <Row type="flex">
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.plan.plandefine.planname')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('planName', {
                                                    initialValue: formData.planName,
                                                    rules: [{
                                                        required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.planname'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.plan.plandefine.plancode')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('planCode', {
                                                    initialValue: formData.planCode,
                                                    rules: [{
                                                        required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.plancode'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.plan.plandefine.orgname')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('orgName', {
                                                    initialValue: formData.orgName,
                                                    rules: [],
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
                                        <Form.Item label={intl.get('wsd.i18n.plan.plandefine.username')} {...formItemLayout}>
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
                                        <Form.Item label={intl.get('wsd.i18n.plan.plandefine.planstarttime')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('planStartTime', {
                                                    initialValue: moment(formData.planStartTime, 'YYYY-MM-DD'),
                                                    rules: [
                                                        { type: 'object', required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.planstarttime') }
                                                    ],
                                                })(
                                                    <DatePicker placeholder="请选择" style={{ width: '100%' }} />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.plan.plandefine.planendtime')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('planEndTime', {
                                                    initialValue: moment(formData.planEndTime, 'YYYY-MM-DD'),
                                                    rules: [{
                                                        required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.plandefine.planendtime'),
                                                    }],
                                                })(
                                                    <DatePicker placeholder="请选择" style={{ width: '100%' }} />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.plan.plandefine.plantype')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('planType', {
                                                    initialValue: formData.planType,
                                                    rules: [],
                                                })(
                                                    <Select>
                                                        <Select.Option value="1">计划类型1</Select.Option>
                                                        <Select.Option value="2">计划类型2</Select.Option>
                                                        <Select.Option value="3">计划类型3</Select.Option>
                                                    </Select>
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.plan.plandefine.importtemplate')} {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('importTempPlan', {
                                                    initialValue: formData.importTempPlan,
                                                    rules: [],
                                                })(
                                                    <Select>
                                                        <Select.Option value="1">ACM需求计划模板1</Select.Option>
                                                        <Select.Option value="2">ACM需求计划模板2</Select.Option>
                                                        <Select.Option value="3">ACM需求计划模板3</Select.Option>
                                                    </Select>
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="权重" {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('weights', {
                                                    initialValue: this.state.inputValue,
                                                    rules: [],
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
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="主控开关" {...formItemLayout}>
                                            <div className={style.list}>
                                                {getFieldDecorator('switch', {
                                                    initialValue: formData.switch,
                                                    rules: [],
                                                })(
                                                    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.plan.plandefine.remark')} {...formItemLayout2}>
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
const PlanDefineAdds = Form.create()(PlanDefineAdd);
export default connect(null, {
    curdCurrentData
})(PlanDefineAdds);
