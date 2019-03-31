import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal, Switch } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment'
import '../../../../asserts/antd-custom.less'
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const { TextArea } = Input;
class PlanPreparedAddWbs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                name: '',
                code: '',
                iptName: '',
                userName: '',
                planStartTime: '2019-01-25',
                planEndTime: '2019-01-25',
                planDrtn: '',
                planWorkHours: '',
                planType: '',
                planLevel: '',
                isWbsFb: 1,
                isCtrl: 1,
                remark: '',
            }
        }
    }

    componentDidMount() {
        this.loadLocales()
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
                this.setState({ initDone: true });
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                alert(JSON.stringify(values))
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
                    title="新增WBS" visible={this.props.modalVisible} onCancel={this.props.handleCancel} footer={
                        <div className="modalbtn">
                            <Button key="submit" onClick={this.handleSubmit}>保存并继续</Button>
                            <Button key="submit" type="primary" onClick={this.handleSubmit}>保存</Button>
                        </div>
                    }>
                    {/* <h2>{intl.get('wbs.add.name')}</h2>*/}
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            <Row>
                                <Col span={11}>
                                    <Form.Item label={intl.get('wsd.i18n.base.planTemAddWBS.name')} {...formItemLayout}>
                                        {getFieldDecorator('name', {
                                            initialValue: this.state.info.name,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddWBS.name'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item label={intl.get('wsd.i18n.base.planTemAddWBS.code')} {...formItemLayout}>
                                        {getFieldDecorator('code', {
                                            initialValue: this.state.info.code,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddWBS.code'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={11}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddWBS.iptname')} {...formItemLayout}>
                                        {getFieldDecorator('iptName', {
                                            initialValue: this.state.info.iptName,
                                            rules: [],
                                        })(
                                            <Select>
                                                <Option value="模块1">模块1</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddWBS.username')} {...formItemLayout}>
                                        {getFieldDecorator('userName', {
                                            initialValue: this.state.info.userName,
                                            rules: [],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row> <Col span={11}>
                                <Form.Item
                                    label={intl.get('wsd.i18n.base.planTemAddWBS.planstarttime')} {...formItemLayout}>
                                    {getFieldDecorator('planStartTime', {
                                        initialValue: moment(this.state.info.planStartTime),
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddWBS.planstarttime'),
                                        }],
                                    })(
                                        <DatePicker style={{ width: '100%' }} />
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={11}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddWBS.planendtime')} {...formItemLayout}>
                                        {getFieldDecorator('planEndTime', {
                                            initialValue: moment(this.state.info.planEndTime),
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddWBS.planendtime'),
                                            }],
                                        })(
                                            <DatePicker style={{ width: '100%' }} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row> <Col span={11}>
                                <Form.Item label={intl.get('wsd.i18n.base.planTemAddWBS.plandrtn')} {...formItemLayout}>
                                    {getFieldDecorator('planDrtn', {
                                        initialValue: this.state.info.planDrtn,
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddWBS.plandrtn'),
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={11}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddWBS.planworkhours')} {...formItemLayout}>
                                        {getFieldDecorator('planWorkHours', {
                                            initialValue: this.state.info.planWorkHours,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddWBS.planworkhours'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row > <Col span={11}>
                                <Form.Item label={intl.get('wsd.i18n.base.planTemAddWBS.plantype')} {...formItemLayout}>
                                    {getFieldDecorator('planType', {
                                        initialValue: this.state.info.planType,
                                        rules: [],
                                    })(
                                        <Select>
                                            <Option value="模块1">模块1</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={11}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddWBS.planlevel')} {...formItemLayout}>
                                        {getFieldDecorator('planLevel', {
                                            initialValue: this.state.info.planLevel,
                                            rules: [],
                                        })(
                                            <Select>
                                                <Option value="模块1">模块1</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row > <Col span={11}>
                                <Form.Item label={intl.get('wsd.i18n.base.planTemAddWBS.iswbsfb')} {...formItemLayout}>
                                    {getFieldDecorator('isWbsFb', {
                                        initialValue: this.state.info.isWbsFb,
                                        rules: [],
                                    })(
                                        <Switch defaultChecked={false} checkedChildren="开" unCheckedChildren="关" />
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={11}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddWBS.isctrl')} {...formItemLayout}>
                                        {getFieldDecorator('isCtrl', {
                                            initialValue: this.state.info.isCtrl,
                                            rules: [],
                                        })(
                                            <Switch defaultChecked={true} checkedChildren="开" unCheckedChildren="关" />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={22}>
                                    <Form.Item label={intl.get('wsd.i18n.base.planTemAddWBS.remark')} {...formItemLayout1}>
                                        {getFieldDecorator('remark', {
                                            initialValue: this.state.info.remark,
                                            rules: [],
                                        })(
                                            <TextArea rows={4} />
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
const PlanPreparedAddWbss = Form.create()(PlanPreparedAddWbs);
export default PlanPreparedAddWbss
