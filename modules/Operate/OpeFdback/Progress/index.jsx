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
                        <h3 className={style.listTitle}>进展填报</h3>
                        <div className={style.mainScorll}>
                            <Form>
                                <div className={style.content}>
                                    <Row type="flex">
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.fdback.actualstart')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('actualStart', {
                                                        initialValue: formData.actualStart,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.fdback.actualstart'),
                                                        }],
                                                    })(
                                                        <DatePicker placeholder="请选择" style={{ width: '100%' }} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.fdback.actualcompletion')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('actualCompletion', {
                                                        initialValue: formData.actualCompletion,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.fdback.actualcompletion'),
                                                        }],
                                                    })(
                                                        <DatePicker placeholder="请选择" style={{ width: '100%' }} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.fdback.completionratio')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('completionRatio', {
                                                        initialValue: formData.completionRatio,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.fdback.completionratio'),
                                                        }],
                                                    })(
                                                        <DatePicker placeholder="请选择" style={{ width: '100%' }} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.fdback.progressevaluation')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('progressEvaluation', {
                                                        initialValue: formData.progressEvaluation,
                                                        rules: [],
                                                    })(
                                                        <Select>
                                                            <Select.Option value="1">正常</Select.Option>
                                                            <Select.Option value="2">慢</Select.Option>
                                                            <Select.Option value="3">快</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.fdback.feedbacktime')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('feedbackTime', {
                                                        initialValue: moment(formData.feedbackTime),
                                                        rules: [],
                                                    })(
                                                        <DatePicker placeholder="请选择" style={{ width: '100%' }} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.fdback.currentcompletion')} {...formItemLayout2}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('currentCompletion', {
                                                        initialValue: formData.currentCompletion,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.fdback.currentcompletion'),
                                                        }],
                                                    })(
                                                        <TextArea rows={2} cols={10} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.fdback.causeanalysis')} {...formItemLayout2}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('causeanAlysis', {
                                                        initialValue: formData.causeanAlysis,
                                                        rules: [],
                                                    })(
                                                        <TextArea rows={2} cols={10} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.fdback.suggestion')} {...formItemLayout2}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('suggestion', {
                                                        initialValue: formData.suggestion,
                                                        rules: [],
                                                    })(
                                                        <TextArea rows={2} cols={10} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.fdback.remark')} {...formItemLayout2}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('remark', {
                                                        initialValue: formData.remark,
                                                        rules: [],
                                                    })(
                                                        <TextArea rows={2} cols={10} />
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
const OperatePreparedEdits = Form.create()(OperatePreparedEdit);
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {
        curdCurrentData
    })(OperatePreparedEdits);
