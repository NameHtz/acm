import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal, InputNumber } from 'antd';
import { connect } from 'react-redux'
import axios from '../../../../api/axios'
import { prepaContactsAdd, prepaContactsById } from '../../../../api/api'


const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class LinkModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible: false,
            info: {}
        }
    }

    getData = (id) => {
        axios.get(prepaContactsById(id)).then(res => {
            this.setState({
                info: res.data.data
            })
        })
    }

    componentDidMount() {

        if (this.props.addBiz) {
            // addlinkman
            this.setState({
                width: this.props.width,
                biz: this.props.addBiz,
                visible: this.props.addlinkman
            })
        } else if (this.props.upDataBiz) {
            // modifylinkman
            this.getData(this.props.upDataBiz.id)
            this.setState({
                width: this.props.width,
                biz: this.props.upDataBiz,
                visible: this.props.modifylinkman
            })
        }

    }


    handleSubmit = (val, e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data1 = {
                    ...values,
                    bizId: this.state.biz.id,
                    bizType: 'prepa',
                }
                let data2 = {
                    ...values,
                    id: this.state.biz.id,
                }


                if (this.props.addBiz) {
                    axios.post(prepaContactsAdd, data1, true).then(res => {
                        this.props.linkAdd(res.data.data);
                        if (val == 'save') {
                            this.handleCancel();
                        } else if (val == 'goOn') {
                            this.props.form.resetFields();
                        }
                    })
                } else if (this.props.upDataBiz) {
                    axios.put(prepaContactsAdd, data2, true).then(res => {
                        // console.log(res)
                        this.props.upData(res.data.data)
                        if (val == 'save') {
                            this.handleCancel();
                        } else if (val == 'goOn') {
                            this.props.form.resetFields();
                        }
                    })
                }



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
        const { intl } = this.props.currentLocale
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
                <div>
                    <Modal title={this.props.title} visible={this.state.visible}
                        onOk={this.handleOk} onCancel={this.handleCancel}
                        okText="确定"
                        cancelText="取消"
                        width="800px"
                        footer={
                            <div className="modalbtn">
                                <Button key={2} onClick={this.handleSubmit.bind(this, 'save')} type="primary" ghost>保存</Button>
                                <Button key={3} onClick={this.handleSubmit.bind(this, 'goOn')} type="primary">保存并继续</Button>
                            </div>
                        }
                    >
                        <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                                <Row type="flex">
                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.sys.ipt.username")} {...formItemLayout}>
                                            {/* 联系人 */}
                                            {getFieldDecorator('contactName', {
                                                initialValue: this.state.info.contactName,
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
                                        <Form.Item label={intl.get("wsd.i18n.plot.approval.unit")} {...formItemLayout}>
                                            {/* 联系单位 */}
                                            {getFieldDecorator('contactUnit', {
                                                initialValue: this.state.info.contactUnit,
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
                                <Row >
                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.sys.ipt.phone")} {...formItemLayout}>
                                            {/* 联系电话 */}
                                            {getFieldDecorator('contactPhone', {
                                                initialValue: this.state.info.contactPhone,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.rsrc.rsrcrole.roletype'),
                                                }],
                                            })(
                                                <InputNumber style={{ width: '100%' }} />
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
                                                <TextArea rows={2} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>


                            </div>

                        </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}
const LinkModals = Form.create()(LinkModal);
export default connect(state => ({
    currentLocale: state.localeProviderData
}))(LinkModals)