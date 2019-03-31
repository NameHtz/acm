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

const Option = Select.Option

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
            workUnit: '小时',
            durationUnit: '小时',
            dateFormat: 'yyyy-MM-dd',
            calendar: '根据责任主体',
            noBreakUpperLayer: '默认日历',
            noBreakSuperior: '',
            confirmSynergy: '',
            allowExpire: '',
            cascadingChange: ''
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

        return (
            <div className={style.main}>
                {this.state.initDone && (
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>规则设置</h3>
                        <div className={style.mainScorll}>
                            <Form>
                                <div className={style.content}>
                                    <Row type="flex">
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.define.workunit')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('workUnit', {
                                                        initialValue: formData.workUnit,
                                                        rules: [],
                                                    })(
                                                        <Select defaultValue="1">
                                                            <Option value="1">小时</Option>
                                                            <Option value="2">分钟</Option>
                                                            <Option value="3">天</Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.define.durationunit')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('durationUnit', {
                                                        initialValue: formData.durationUnit,
                                                        rules: [],
                                                    })(
                                                        <Select defaultValue="1">
                                                            <Option value="1">小时</Option>
                                                            <Option value="2">分钟</Option>
                                                            <Option value="3">天</Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.define.dateformat')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('dateFormat', {
                                                        initialValue: formData.dateFormat,
                                                        rules: [],
                                                    })(
                                                        <Select defaultValue="1">
                                                            <Option value="1">yyyy-MM-dd</Option>
                                                            <Option value="2">dd-MM-yyyy</Option>
                                                            <Option value="3">MM-dd-yyyy</Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.define.calendar')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('calendar', {
                                                        initialValue: formData.calendar,
                                                        rules: [],
                                                    })(
                                                        <Select defaultValue="1">
                                                            <Option value="1">根据责任主体1</Option>
                                                            <Option value="2">根据责任主体2</Option>
                                                            <Option value="3">根据责任主体3</Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.define.nobreakupperlayer')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('noBreakUpperLayer', {
                                                        initialValue: formData.noBreakUpperLayer,
                                                        rules: [],
                                                    })(
                                                        <div className={style.switchSps}>
                                                            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                                                            <span title="不允许下层计划时间变更突破上层">【不允许下层计划时间变更突破上层】</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.define.nobreaksuperior')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('noBreakSuperior', {
                                                        initialValue: formData.noBreakSuperior,
                                                        rules: [],
                                                    })(
                                                        <div className={style.switchSps}>
                                                            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                                                            <span title="不允许下级计划时间变更突破上级">【不允许下级计划时间变更突破上级】</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.define.confirmsynergy')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('confirmSynergy', {
                                                        initialValue: formData.confirmSynergy,
                                                        rules: [],
                                                    })(
                                                        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.define.allowexpire')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('allowExpire', {
                                                        initialValue: formData.allowExpire,
                                                        rules: [],
                                                    })(
                                                        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.define.cascadingchange')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('cascadingChange', {
                                                        initialValue: formData.cascadingChange,
                                                        rules: [],
                                                    })(
                                                        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
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
