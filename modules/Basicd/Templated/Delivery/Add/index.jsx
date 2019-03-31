import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';
import emitter from '../../../../../api/ev'
const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const { TextArea } = Input;
export class BasicdTemplatedDeliveryAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                key: "1",
                delvTitle: "ACM产品设计规范",
                delvNum: "002",
                delvVersion: "1.0",
                delvType: "研究项目",
                creator: "曹文轩",
                creatTime: "2018-12-10",
                remark: "无",
            }
        }
    }

    componentDidMount() {
        this.loadLocales();
        console.log('加载')
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
        alert(1)
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        return (
            <div className={style.main}>
                <Modal className={style.formMain} width="850px" forceRender={true} centered={true}
                    title="新增交付模板" visible={this.props.modalVisible} onCancel={this.props.handleCancel}
                    footer={
                        <div className='modalbtn'>
                            <Button key="submit" onClick={this.handleSubmit}>保存并继续</Button>
                            <Button key="submit1" type="primary" onClick={this.handleSubmit}>保存</Button>
                        </div>
                    }>
                    {/* <h2>{intl.get('wbs.add.name')}</h2>*/}
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            <Row type="flex">
                                <Col span={12}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.tmpldelv1.delvtitle')} {...formItemLayout}>
                                        {getFieldDecorator('delvTitle', {
                                            initialValue: this.state.info.delvTitle,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.tmpldelv1.delvtitle'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.base.tmpldelv1.delvnum')} {...formItemLayout}>
                                        {getFieldDecorator('delvNum', {
                                            initialValue: this.state.info.delvNum,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.tmpldelv1.delvnum'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row> <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.base.tmpldelv1.delvversion')} {...formItemLayout}>
                                    {getFieldDecorator('delvVersion', {
                                        initialValue: this.state.info.delvVersion,
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.tmpldelv1.delvversion'),
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.base.tmpldelv1.delvtype')} {...formItemLayout}>
                                        {getFieldDecorator('delvType', {
                                            initialValue: this.state.info.delvType,
                                            rules: [],
                                        })(
                                            <Select>
                                                <Option value="模块1">模块1</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Form.Item label={intl.get('wsd.i18n.base.tmpldelv1.remark')} {...formItemLayout1}>
                                        {getFieldDecorator('remark', {
                                            initialValue: this.state.info.remark,
                                            rules: [],
                                        })(
                                            <TextArea rows={2} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </Modal>
            </div>)
    }
}
const BasicdTemplatedDeliveryAdds = Form.create()(BasicdTemplatedDeliveryAdd);
export default BasicdTemplatedDeliveryAdds
