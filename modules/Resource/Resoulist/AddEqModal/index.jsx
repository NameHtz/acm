
import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal } from 'antd';
import emitter from '../../../../api/ev';
import moment from 'moment';
import intl from 'react-intl-universal'
import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
class MenuInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible: true,
            info: {
                key: "1",
                rsrcName: 1,
                rsrcCode: 1,
                rsrcRoleName: 1,
                rsrcType: 1,
                unit: 1,
                maxunit: 1,
                featureDesc: 1,
                calendarId: 1,
                status: 1,
                remark: 1,
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
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        this.props.handleCancel()
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.props.handleCancel()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        alert(1)
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.curdCurrentData({
                    title: localStorage.getItem('name'),
                    status: 'add',
                    data: values
                })
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

            <div >
                {this.state.initDone &&
                    <Modal title={this.props.title} visible={this.state.visible}
                        className={style.main}
                        onOk={this.handleOk} onCancel={this.handleCancel}

                        width="800px"
                        footer={
                            <div className="modalbtn">
                                <Button key={2} onClick={this.handleSubmit} type="primary" ghost>保存</Button>
                                <Button key={3} onClick={this.handleSubmit} type="primary">保存并继续</Button>
                            </div>
                        }
                    >
                        <div className={style.ResAddModal}>
                        <Form onSubmit={this.handleSubmit} className={style.mainScorll}>
                            <div className={style.content}>
                                <Row type="flex">
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.rsrc.rsrclist.rsrcname')} {...formItemLayout}>
                                            {getFieldDecorator('rsrcname', {
                                                initialValue: this.state.info.rsrcname,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.rsrc.rsrclist.rsrcname'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.rsrc.rsrclist.rsrccode')} {...formItemLayout}>
                                            {getFieldDecorator('rsrccode', {
                                                initialValue: this.state.info.rsrccode,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.rsrc.rsrclist.rsrccode'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >                                                  
                                      <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.rsrc.rsrclist.rsrctype')} {...formItemLayout}>
                                        {getFieldDecorator('rsrctype', {
                                            initialValue: this.state.info.rsrctype,
                                            rules: [],
                                        })(
                                            <Input disabled/>
                                        )}
                                    </Form.Item>
                                </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.rsrc.rsrclist.unit')} {...formItemLayout}>
                                            {getFieldDecorator('unit', {
                                                initialValue: this.state.info.unit ,
                                                rules: [],
                                            })(
                                                <Input disabled/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >                                                  
                                      <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.rsrc.rsrclist.maxunit')} {...formItemLayout}>
                                        {getFieldDecorator('maxunit', {
                                            initialValue: this.state.info.maxunit,
                                            rules: [],
                                        })(
                                            <Input disabled/>
                                        )}
                                    </Form.Item>
                                </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.rsrc.rsrclist.rsrcrolename')} {...formItemLayout}>
                                            {getFieldDecorator('rsrcrolename', {
                                                initialValue: this.state.info.rsrcrolename ,
                                                rules: [],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >                                                  
                                      <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.rsrc.rsrclist.rsrcaddress')} {...formItemLayout}>
                                        {getFieldDecorator('rsrcaddress', {
                                            initialValue: this.state.info.rsrcaddress,
                                            rules: [],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.rsrc.rsrclist.calendarid')} {...formItemLayout}>
                                            {getFieldDecorator('calendarid', {
                                                initialValue: this.state.info.calendarid ? moment(this.state.info.calendarid, 'YYYY-MM-DD') : null,
                                                rules: [],
                                            })(
                                                <DatePicker style={{ width: "100%" }} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >                                                  
                                      <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.rsrc.rsrclist.status')} {...formItemLayout}>
                                        {getFieldDecorator('status', {
                                            initialValue: this.state.info.status,
                                            rules: [],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                  
                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.rsrc.rsrclist.featuredesc')} {...formItemLayout1}>
                                            {getFieldDecorator('featuredesc', {
                                                initialValue: this.state.info.featuredesc,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.rsrc.rsrclist.featuredesc'),
                                                }],
                                            })(
                                                <TextArea  rows={2} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.rsrc.rsrclist.remark')} {...formItemLayout1}>
                                            {getFieldDecorator('remark', {
                                                initialValue: this.state.info.remark,
                                                rules: [],
                                            })(
                                                <TextArea  rows={2} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                              
                            </div>
                        </Form>
                        </div>
                    </Modal>}
            </div>
        )
    }
}
const MenuInfos = Form.create()(MenuInfo);
export default connect(null, {
    curdCurrentData
})(MenuInfos);