import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Select, Modal, DatePicker, TreeSelect, InputNumber } from 'antd';
import intl from 'react-intl-universal'
import emitter from '../../../../api/ev';
import moment from 'moment';
import { epsTree, orgTree, orgPer, planPrepa } from '../../../../api/api'
import axios from '../../../../api/axios'


import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
class AddSameLevel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible: true,
            selectDisabled: true,
            info: {},
            epsTree: [],
            orgTree: [],
            orgPer: [],
            orgTreeKey: '',
        }
    }

    getData = () => {
        axios.get(epsTree).then(res => {
            console.log(res)
            this.setState({ epsTree: res.data.data })
        })
        axios.get(orgTree).then(res => {
            console.log(res)
            this.setState({ orgTree: res.data.data })
        })
    }

    componentDidMount() {
        this.getData()
        this.loadLocales();
        // console.log('加载')
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
        // console.log(e);
        this.setState({
            visible: false,
        });
        this.props.handleCancel()
    }
    handleSubmit = (val, e) => {

        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                const value = {
                    "orgId": values['orgId'],
                    "userId": values['userId'],
                    "epsId": values['epsId'],
                    "paCode": values['paCode'],
                    "paName": values['paName'],
                    "planStartTime": values['planStartTime'].format('YYYY-MM-DD'),
                    "planEndTime": values['planEndTime'].format('YYYY-MM-DD'),
                    "totalBudget": values['totalBudget'],
                    "budgetEstimate": values['budgetEstimate'],
                    "projectTarget": values['projectTarget'],
                    "projectOverview": values['projectOverview'],
                    "remark": values['remark'],
                    "projectEstimate": values['projectEstimate'],
                    "constructionScale": values['constructionScale'],
                    "projectLocation": values['projectLocation'],
                    "totalDrtn": values['totalDrtn']
                }
                // console.log(value)

                axios.post(planPrepa, value, true).then(res => {
                    this.props.addData(res.data.data)
                    if (val == 'save') {
                        this.props.handleCancel();
                    } else if (val == 'goOn') {
                        this.props.form.resetFields();
                    }

                })
            }
        });
    }

    reqUrl = (url, v) => {
        if (v == 'epsTree') {

        } else if (v == 'orgTree') {

        } else if (v == 'orgPer') {
            // axios.get(url).then(res => {
            //     this.setState({ orgPer: [...res.data.data] })
            // })
        }

    }

    focusSelect = (v) => {
        if (v == 'eps') {
            this.reqUrl(epsTree, 'epsTree')
        } else if (v == 'org') {
            this.reqUrl(orgTree, 'orgTree')
        } else if (v == 'orgPer') {
            this.reqUrl(orgPer(this.state.orgTreeKey), 'orgPer')
        }
    }
    change = (v) => {
        // console.log(v)
        axios.get(orgPer(v)).then(res => {
            // console.log(res)/
            this.setState({ orgPer: res.data.data })
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
                    <Modal className={style.main}
                        title={this.props.title} visible={this.state.visible}
                        onOk={this.handleOk} onCancel={this.handleCancel}

                        width="850px"
                        footer={
                            <div className="modalbtn">
                                <Button key={2} onClick={this.handleSubmit.bind(this, 'save')} type="primary" ghost>保存</Button>
                                <Button key={3} onClick={this.handleSubmit.bind(this, 'goOn')} type="primary">保存并继续</Button>
                            </div>
                        }
                    >
                        <Form onSubmit={this.handleSubmit} className={style.info}>
                            <div className={style.content}>
                                <Row type="flex">
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.projectname')} {...formItemLayout}>
                                            {getFieldDecorator('paName', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.projectname'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.epsname')} {...formItemLayout}>
                                            {getFieldDecorator('epsId', {
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.epsname'),
                                                }],
                                            })(
                                                <TreeSelect
                                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                    treeData={this.state.epsTree}
                                                    treeDefaultExpandAll
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project1.iptname')} {...formItemLayout}>
                                            {getFieldDecorator('orgId', {

                                                rules: [],
                                            })(
                                                <TreeSelect
                                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                    treeData={this.state.orgTree}
                                                    treeDefaultExpandAll
                                                    onChange={this.change}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project1.username')} {...formItemLayout}>
                                            {getFieldDecorator('userId', {
                                                initialValue: this.state.orgPer.length ? this.state.orgPer[0].id : '',
                                                rules: [],
                                            })(
                                                <Select placeholder="请选择项目负责人">
                                                    {this.state.orgPer.length &&
                                                        this.state.orgPer.map((val) => {
                                                            return (
                                                                <Option key={val.id} value={val.id}>{val.title}</Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.pre.project1.starttime")} {...formItemLayout}>
                                            {getFieldDecorator('planStartTime', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project1.starttime'),
                                                }],
                                            })(
                                                <DatePicker style={{ width: "100%" }} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.pre.project1.endtime")} {...formItemLayout}>
                                            {getFieldDecorator('planEndTime', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project1.endtime'),
                                                }],
                                            })(
                                                <DatePicker style={{ width: "100%" }} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.pre.project1.totalDrtn")} {...formItemLayout}>
                                            {getFieldDecorator('totalDrtn', {

                                                rules: [],
                                            })(
                                                <Input type='number' />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.pre.project1.totalBudget")} {...formItemLayout}>
                                            {getFieldDecorator('totalBudget', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project1.totalBudget'),
                                                }],
                                            })(
                                                <Input type='number' placeholder="请填写投资额" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.pre.project1.budgetEstimate")} {...formItemLayout}>
                                            {getFieldDecorator('budgetEstimate', {

                                                rules: [],
                                            })(
                                                <Input type='number' placeholder="请填写项目概算金额" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.pre.project1.projectEstimate")} {...formItemLayout}>
                                            {getFieldDecorator('projectEstimate', {

                                                rules: [],
                                            })(
                                                <Input type='number' placeholder="请填写项目预算金额" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >

                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.pre.project1.constructionScale")} {...formItemLayout}>
                                            {getFieldDecorator('constructionScale', {

                                                rules: [],
                                            })(
                                                <Input placeholder="请填写建设规模" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.pre.project1.projectLocation")} {...formItemLayout}>
                                            {getFieldDecorator('projectLocation', {

                                                rules: [],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item label={intl.get("wsd.i18n.pre.project1.projectTarget")} {...formItemLayout1}>
                                            {getFieldDecorator('projectTarget', {
                                                rules: [],
                                            })(
                                                <TextArea rows={2} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item label={intl.get("wsd.i18n.pre.project1.projectOverview")} {...formItemLayout1}>
                                            {getFieldDecorator('projectOverview', {

                                                rules: [],
                                            })(
                                                <TextArea rows={2} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item label={intl.get("wsd.i18n.pre.epsInfo.remark")} {...formItemLayout1}>
                                            {getFieldDecorator('remark', {

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
                }
            </div>
        )
    }
}
const AddSameLevels = Form.create()(AddSameLevel);
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {
        curdCurrentData
    })(AddSameLevels);