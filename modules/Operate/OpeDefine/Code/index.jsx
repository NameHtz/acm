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
                        <h3 className={style.listTitle}>编码设置</h3>
                        <div className={style.mainScorll}>
                            <Form>
                                <div className={style.content}>
                                    <Row type="flex">
                                        <Col span={24}>
                                            <Form.Item label={intl.get('wsd.i18n.operate.define.index')} {...formItemLayout2}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('index', {
                                                        initialValue: formData.index,
                                                        rules: [],
                                                    })(
                                                        <div>
                                                            <Select style={{ width: '48%', marginRight: '4%' }}>
                                                                <Option value="1">默认</Option>
                                                                <Option value="2">其他</Option>
                                                            </Select>
                                                            <Select style={{ width: '48%' }}>
                                                                <Option value="1">可修改</Option>
                                                                <Option value="2">不可修改</Option>
                                                            </Select>
                                                        </div>
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.define.task')} {...formItemLayout2}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('task', {
                                                        initialValue: formData.task,
                                                        rules: [],
                                                    })(
                                                        <div>
                                                            <Select style={{ width: '48%', marginRight: '4%' }}>
                                                                <Option value="1">默认</Option>
                                                                <Option value="2">其他</Option>
                                                            </Select>
                                                            <Select style={{ width: '48%' }}>
                                                                <Option value="1">可修改</Option>
                                                                <Option value="2">不可修改</Option>
                                                            </Select>
                                                        </div>
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
