import React, {Component} from 'react'
import style from './style.less'
import {Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal,Switch} from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment'
const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const { TextArea } = Input;
class BasicdTemplatedPlanAddWbs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                name: 1,
                code: 1,
                iptName: 1,
                userName: 1,
                planStartTime: 1,
                planEndTime: 1,
                planDrtn: 1,
                planWorkHours: 1,
                planType: 1,
                planLevel: 1,
                isWbsFb: 1,
                isCtrl: 1,
                creatTime: 1,
                creator: 1,
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
                this.setState({initDone: true});
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
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const formItemLayout1 = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        return (
            <div className={style.main}>
                <Modal className={style.formMain} width="850px" forceRender={true} centered={true}
                       title="新增WBS" visible={this.props.modalVisible} onCancel={this.props.handleCancel} footer={[
                    <Button key="submit1" onClick={this.handleSubmit}>保存并继续</Button>,
                    <Button key="submit2" type="primary" onClick={this.handleSubmit}>保存</Button>,
                ]}>
                    {/* <h2>{intl.get('wbs.add.name')}</h2>*/}
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            <Row gutter={24} type="flex">
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.base.planTemAddWBS.name')} {...formItemLayout}>
                                        {getFieldDecorator('name', {
                                            initialValue: this.state.info.name,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddWBS.name'),
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.base.planTemAddWBS.code')} {...formItemLayout}>
                                        {getFieldDecorator('code', {
                                            initialValue: this.state.info.code,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddWBS.code'),
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                           
                            <Row gutter={24}> <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.base.planTemAddWBS.plandrtn')} {...formItemLayout}>
                                    {getFieldDecorator('planDrtn', {
                                        initialValue: this.state.info.planDrtn,
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddWBS.plandrtn'),
                                        }],
                                    })(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="计划工时" {...formItemLayout}>
                                        {getFieldDecorator('planWorkHours', {
                                            initialValue: this.state.info.planWorkHours,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddWBS.planworkhours'),
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}> <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.base.planTemAddWBS.plantype')} {...formItemLayout}>
                                    {getFieldDecorator('planType', {
                                        initialValue: this.state.info.planType,
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddWBS.plantype'),
                                        }],
                                    })(
                                        <Select>
                                            <Option value="模块1">模块1</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddWBS.planlevel')} {...formItemLayout}>
                                        {getFieldDecorator('planLevel', {
                                            initialValue: this.state.info.planLevel,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddWBS.planlevel'),
                                            }],
                                        })(
                                            <Select>
                                                <Option value="模块1">模块1</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}> <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.base.planTemAddWBS.iswbsfb')} {...formItemLayout}>
                                    {getFieldDecorator('isWbsFb', {
                                        initialValue: this.state.info.isWbsFb,
                                        rules: [],
                                    })(
                                        <Switch defaultChecked={false} checkedChildren='开' unCheckedChildren='关' />
                                    )}
                                </Form.Item>
                            </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddWBS.isctrl')} {...formItemLayout}>
                                        {getFieldDecorator('isCtrl', {
                                            initialValue: this.state.info.isCtrl,
                                            rules: [],
                                        })(
                                            <Switch defaultChecked={true} checkedChildren='开' unCheckedChildren='关' />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item label={intl.get('wsd.i18n.base.planTemAddWBS.remark')} {...formItemLayout1}>
                                        {getFieldDecorator('remark', {
                                            initialValue: this.state.info.remark,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddWBS.remark'),
                                            }],
                                        })(
                                           <TextArea rows={2}/>
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
const BasicdTemplatedPlanAddWbss = Form.create()(BasicdTemplatedPlanAddWbs);
export default BasicdTemplatedPlanAddWbss
