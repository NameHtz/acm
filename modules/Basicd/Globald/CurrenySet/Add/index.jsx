import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Upload, message, Modal } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';
import emitter from '../../../../../api/ev'
const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
export class BasicdGlobalCurAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                key: "1",
                currCode: "ACM",
                currName: "002",
                currSymbol: "1.0",
                rate: "文件模板",
                creator: "合同管理",
                creatTime: "2017-10-08",

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
        return (
            <div className={style.main}>
                <Modal className={style.formMain} width="850px" forceRender={true} centered={true}
                    title="新增货币" visible={this.props.modalVisible} onCancel={this.props.handleCancel}
                    footer={
                        <div className='modalbtn'>
                            <Button key="submit" onClick={this.handleSubmit}>保存并继续</Button>
                            <Button key="submit1" type="primary" onClick={this.handleSubmit}>保存</Button>
                        </div>
                    }>
                    {/*<h2>{intl.get('wbs.add.name')}</h2>*/}
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            {/*  <Row gutter={24} type="flex">
                                <Col span={11}>
                                    <Form.Item label={intl.get('wsd.i18n.base.currency.currCode')} {...formItemLayout}>
                                        {getFieldDecorator('currCode', {
                                            initialValue: this.state.info.currCode,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.currency.currcode'),
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item label={intl.get('wsd.i18n.base.currency.currname')} {...formItemLayout}>
                                        {getFieldDecorator('currName', {
                                            initialValue: this.state.info.docNum,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.currency.currname'),
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}> <Col span={11}>
                                <Form.Item label={intl.get('wsd.i18n.base.currency.currsymbol')} {...formItemLayout}>
                                    {getFieldDecorator('currSymbol', {
                                        initialValue: this.state.info.docVersion,
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.currency.currsymbol'),
                                        }],
                                    })(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={11}>
                                    <Form.Item label={intl.get('wsd.i18n.base.currency.rate')} {...formItemLayout}>
                                        {getFieldDecorator('rate', {
                                            initialValue: this.state.info.docType,
                                            rules: [],
                                        })(
                                           <Input/>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={11}>
                                    <Form.Item label={intl.get('wsd.i18n.base.currency.creator')} {...formItemLayout}>
                                        {getFieldDecorator('creator', {
                                            initialValue: this.state.info.creator,
                                            rules: [],
                                        })(
                                            <Input/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item label={intl.get('wsd.i18n.base.currency.creattime')} {...formItemLayout}>
                                        {getFieldDecorator('creatTime', {
                                            initialValue: moment(this.state.info.creatTime),
                                            rules: [],
                                        })(
                                            <DatePicker style={{"width":"100%"}}/>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>*/}
                            <Row type="flex">

                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.base.currency.currcode')} {...formItemLayout}>
                                        {getFieldDecorator('currCode', {
                                            initialValue: this.state.info.currCode,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.currency.currcode'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.base.currency.currname')} {...formItemLayout}>
                                        {getFieldDecorator('currName', {
                                            initialValue: this.state.info.currName,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.currency.currname'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>                                                        <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.base.currency.currsymbol')} {...formItemLayout}>
                                    {getFieldDecorator('currSymbol', {
                                        initialValue: this.state.info.currSymbol,
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.currency.currsymbol'),
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>

                            </Row>

                        </div>

                    </Form>
                </Modal>
            </div>
        )
    }
}
const BasicdGlobalCurAdds = Form.create()(BasicdGlobalCurAdd);
export default BasicdGlobalCurAdds
