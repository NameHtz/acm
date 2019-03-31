import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Modal, Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd'
import style from './style.less'

import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'
//接口引入
import axios from '../../../../api/axios'
import { iptAdd } from '../../../../api/api'


const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class ImportTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible: true,
            info: ""
        }
    }

    componentDidMount() {
        this.state = {
            info: this.props.data
        }
        this.loadLocales();
        console.log(this.props.data);

    }
    //iptAdd接口
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          
            if (!err) {
                const data = {
                    ...values,
                    iptName: values.iptName,
                    iptCode: values.iptCode,
                    parentId: values.parentId,
                    remark: values.remark,
                    level: values.level,
                    sort: values.sort,
                };
                axios.post(iptAdd, data).then(res => {
                    // console.log(res);
                    this.setState({
                        visible: false
                    });
                    this.props.closeNextAgency();
                    this.props.addSuccess(res.data.data);
                    this.props.form.resetFields()
                })
                    .catch(err => {
                        console.log(err);
                    })
                this.props.curdCurrentData({
                    title: localStorage.getItem('name'),
                    status: 'update',
                    data: values
                })
            }
        });
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
        this.props.closeNextAgency()
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.props.closeNextAgency()
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
                    <Modal title="新增下级机构" visible={this.state.visible}
                        className={style.main}
                        onOk={this.handleSubmit} onCancel={this.handleCancel}
                        footer={
                            <div className="modalbtn">
                                <Button key={3} onClick={this.handleSubmit} type="primary">保存</Button>
                                <Button key={2} onClick={this.handleCancel} >取消</Button>
                            </div>
                        }
                        width="800px"

                    >

                        <Form onSubmit={this.handleSubmit} >
                            <div className={style.content}>
                                <Row type="flex">
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.menu.menuname')} {...formItemLayout}>
                                            {getFieldDecorator('iptName', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.menu.menuname'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.ipt.iptcodej')} {...formItemLayout}>
                                            {getFieldDecorator('iptCode', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.iptcodej'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.ipt.parentipt')} {...formItemLayout}>
                                            {getFieldDecorator('parentId', {
                                                initialValue: this.props.data.id,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.parentipt'),
                                                }],
                                            })(
                                                <Input disabled />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.ipt.level')} {...formItemLayout}>
                                            {getFieldDecorator('level', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.level'),
                                                }],
                                            })(
                                                <Select>
                                                    <Option value="1">{intl.get('wsd.i18n.sys.ipt.levelone')}</Option>
                                                    <Option value="2">{intl.get('wsd.i18n.sys.ipt.leveltwo')}</Option>
                                                    <Option value="3">{intl.get('wsd.i18n.sys.ipt.levelthree')}</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row >


                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.ipt.sortnum')} {...formItemLayout}>
                                            {getFieldDecorator('sort', {
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.sortnum'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.ipt.remark')} {...formItemLayout1}>
                                            {getFieldDecorator('remark', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.remark'),
                                                }],
                                            })(
                                                <TextArea />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>

                            </div>

                        </Form>
                    </Modal>

                }

            </div>
        )
    }
}
const ImportTables = Form.create()(ImportTable);
export default connect(null, {
    curdCurrentData
})(ImportTables);
