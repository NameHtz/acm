import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, notification } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';
import axios from "../../../../../api/axios"
const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}

//api
import { getInfoByBoId, updateDigitDirBo } from '../../../../../api/api'

const FormItem = Form.Item;
class DigitInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                id: 1,
                digitName: 1,
                digitCode: 1,
                boName: 1,
                boCode: 1,
                creator: 'zbj',
                creatTime: 1,
            }
        }
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
                // After loading CLDR locale data, start to render
                this.setState({ initDone: true });
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    ...this.state.info,
                    ...values
                }
                axios.put(updateDigitDirBo, data).then(res => {
                    this.props.submitData(res.data.data)
                    notification.success(
                        {
                            placement: 'bottomRight',
                            bottom: 50,
                            duration: 2,
                            message: '操作提醒',
                            description: res.data.message
                        }
                    )
                })
            }
        });
    }
    componentDidMount() {
        this.loadLocales();
        this.getdata()
    }
    getdata = () => {
        axios.get(getInfoByBoId(this.props.data.id)).then(res => {
            console.log(res.data)
            this.setState({
                info: res.data.data
            })
        })
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
                                            <Form.Item label={intl.get('wsd.i18n.base.digitdir.digitname')} {...formItemLayout}>
                                                {getFieldDecorator('typeName', {
                                                    initialValue: this.state.info.typeName,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.digitdir.digitname'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="字典类型代码" {...formItemLayout}>
                                                {getFieldDecorator('typeCode', {
                                                    initialValue: this.state.info.typeCode,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.digitdir.digitcode'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row> <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.base.digitdir.creator')} {...formItemLayout}>
                                            {getFieldDecorator('creator', {
                                                initialValue: this.state.info.creator,
                                                rules: [],
                                            })(
                                                <Input disabled />
                                            )}
                                        </Form.Item>
                                    </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.base.digitdir.creattime')} {...formItemLayout}>
                                                {getFieldDecorator('creatTime', {
                                                    initialValue: moment(this.state.info.creatTime),
                                                    rules: [],
                                                })(
                                                    <DatePicker style={{ width: '100%' }} disabled />
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
const DigitInfoForms = Form.create()(DigitInfoForm);
export default DigitInfoForms
