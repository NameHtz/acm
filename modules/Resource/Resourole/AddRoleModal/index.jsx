import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal } from 'antd';
import intl from 'react-intl-universal'
import emitter from '../../../../api/ev';
import moment from 'moment';
import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class AddRoleModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible: true,
            info: {
                roleName: 1,
                roleCode: 1,
                roleType: 1,
                unit: 1,
                calendarId: 1,
                remark: 1,
            }
        }
    }

    componentDidMount() {
        this.loadLocales();
        console.log('加载')
        this.setState({
            width: this.props.width,
            // info: this.props.data
        })
    }

    loadLocales() {
        intl.init({
            currentLocale: this.props.currentLocale.currentLocale,
            locales,
        })
            .then(() => {
                // After loading CLDR locale data, start to render
                this.setState({ initDone: true });
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
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
                {this.state.initDone &&
                    <div>
                        <Modal title={this.props.title+"资源角色"} visible={this.state.visible}
                            onOk={this.handleOk} onCancel={this.handleCancel}
                            okText="确定"
                            cancelText="取消"
                            width="800px"
                            footer={ 
                                <div className="modalbtn">
                                <Button key={2}  onClick={this.handleSubmit} type="primary" ghost>保存</Button>
                                <Button key={3} onClick={this.handleSubmit} type="primary">保存并继续</Button>
                                </div>
                            }
                        >
                            <Form onSubmit={this.handleSubmit}>
                                <div className={style.content}>
                                    <Row  type="flex">
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.rsrc.rsrcrole.rolename')} {...formItemLayout}>
                                                {getFieldDecorator('roleName', {
                                                    initialValue: this.state.info.roleName,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.rsrc.rsrcrole.rolename'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.rsrc.rsrcrole.rolecode')} {...formItemLayout}>
                                                {getFieldDecorator('roleCode', {
                                                    initialValue: this.state.info.roleCode,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.rsrc.rsrcrole.rolecode'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>                                 <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.rsrc.rsrcrole.roletype')} {...formItemLayout}>
                                            {getFieldDecorator('roleType', {
                                                initialValue: this.state.info.roleType,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.rsrc.rsrcrole.roletype'),
                                                }],
                                            })(
                                                <Select>
                                                    <Option value="人工">人工</Option>
                                                    <Option value="人工">人工</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.rsrc.rsrcrole.unit')} {...formItemLayout}>
                                                {getFieldDecorator('unit', {
                                                    initialValue: this.state.info.unit,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.rsrc.rsrcrole.unit'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.rsrc.rsrcrole.calendarid')} {...formItemLayout}>
                                                {getFieldDecorator('calendarId', {
                                                    initialValue: this.state.info.calendarId ? moment(this.state.info.calendarId, 'YYYY-MM-DD') : null,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.rsrc.rsrcrole.calendarid'),
                                                    }],
                                                })(
                                                    <DatePicker style={{ width: "100%" }} />
                                                )}
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item label={intl.get('wsd.i18n.rsrc.rsrcrole.remark')} {...formItemLayout1}>
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
                        </Modal>
                    </div>}
            </div>
        )
    }
}
const AddRoleModals = Form.create()(AddRoleModal);
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {
    curdCurrentData
})(AddRoleModals);