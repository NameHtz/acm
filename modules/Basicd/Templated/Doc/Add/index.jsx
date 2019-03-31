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
export class BasicdTemplatedDocAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                key: "1",
                docTitle: "ACM",
                docNum: "002",
                docVersion: "1.0",
                docType: "文件模板",
                docObject: "合同管理",
                creator: "曹计渲",
                creatTime: "2017-10-08",
                enclosure: 1

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
                    title="新增文档模板" visible={this.props.modalVisible} onCancel={this.props.handleCancel} footer={[
                        <Button key="submit1" onClick={this.handleSubmit}>保存并继续</Button>,
                        <Button key="submit2" type="primary" onClick={this.handleSubmit}>保存</Button>,
                    ]}>
                    {/*<h2>{intl.get('wbs.add.name')}</h2>*/}
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            <Row gutter={24} type="flex">
                                <Col span={11}>
                                    <Form.Item label={intl.get('wsd.i18n.base.docTem.doctitle')} {...formItemLayout}>
                                        {getFieldDecorator('docTitle', {
                                            initialValue: this.state.info.docTitle,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.docTem.doctitle'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item label={intl.get('wsd.i18n.base.docTem.docnum')} {...formItemLayout}>
                                        {getFieldDecorator('docNum', {
                                            initialValue: this.state.info.docNum,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.docTem.docnum'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}> <Col span={11}>
                                <Form.Item label={intl.get('wsd.i18n.base.docTem.docversion')} {...formItemLayout}>
                                    {getFieldDecorator('docVersion', {
                                        initialValue: this.state.info.docVersion,
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.docTem.docversion'),
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={11}>
                                    <Form.Item label={intl.get('wsd.i18n.base.docTem.doctype')} {...formItemLayout}>
                                        {getFieldDecorator('docType', {
                                            initialValue: this.state.info.docType,
                                            rules: [],
                                        })(
                                            <Select>
                                                <Option value="模块1">模块1</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={11}>
                                    <Form.Item label={intl.get('wsd.i18n.base.docTem.docobject')} {...formItemLayout}>
                                        {getFieldDecorator('docObject', {
                                            initialValue: this.state.info.docObject,
                                            rules: [],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item label={intl.get('wsd.i18n.base.docTem.enclosure')} {...formItemLayout}>
                                        {getFieldDecorator('enclosure', {
                                            initialValue: this.state.info.enclosure,
                                        })(
                                            <Upload >
                                                <Button>
                                                    <Icon type="upload" />上传
                                                </Button>
                                            </Upload>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={3} offset={3}>
                                    <Button onClick={this.handleSubmit} type="primary">保存并继续</Button>
                                </Col>
                                <Col span={3} offset={1}>
                                    <Button>取消</Button>
                                </Col>
                            </Row>
                        </div>

                    </Form>
                </Modal>
            </div>
        )
    }
}
const BasicdTemplatedDocAdds = Form.create()(BasicdTemplatedDocAdd);
export default BasicdTemplatedDocAdds
