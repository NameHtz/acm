import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, TreeSelect } from 'antd';
import axios from '../../../../api/axios'
import { prepaBas, epsTree, orgTree, orgPer, planPrepa } from '../../../../api/api'


import { connect } from 'react-redux'
import moment from 'moment';
import { curdCurrentData } from '../../../../store/curdData/action'




const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class MenuInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            optId: null,
            info: {},
            epsTree: [],
            orgTree: [],
            orgPer: [],
            userId: null,
        }
    }

    reqUrl = () => {

        axios.get(epsTree).then(res => {
            // console.log(res)
            this.setState({ epsTree: res.data.data })
        })
        axios.get(orgTree).then(res => {
            // console.log(res)
            this.setState({ orgTree: res.data.data })
        })
    }

    getData = (id) => {
        axios.get(prepaBas(id), {}).then(res => {
            this.setState({
                info: res.data.data,
                optId: id,
                userId: res.data.data.user.id
            }, () => {
                axios.get(orgPer(this.state.info.org.id)).then(res => {
                    // console.log(res)/
                    this.setState({ orgPer: res.data.data })
                })
            })
        })
    }

    componentDidMount() {
        this.reqUrl();
        this.getData(this.props.data.id)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                    id: this.state.optId,
                    planEndTime: values['planEndTime'] ? values['planEndTime'].format('YYYY-MM-DD') : '',
                    planStartTime: values['planStartTime'] ? values['planStartTime'].format('YYYY-MM-DD') : '',
                    creatTime: values['creatTime'] ? values['creatTime'].format('YYYY-MM-DD') : '',
                }
                axios.put(planPrepa, data, true).then(res => {
                    this.props.upData(res.data.data)
                })

            }
        });
    }

    change = (v) => {
        // console.log(v)
        axios.get(orgPer(v)).then(res => {
            // console.log(res)/
            this.setState({ orgPer: res.data.data, userId: null })
        })
    }

    render() {
        const { intl } = this.props.currentLocale;
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

                <div className={style.mainHeight}>
                    <h3 className={style.listTitle}>基本信息</h3>
                    <div className={style.mainScorll}>


                        <Form onSubmit={this.handleSubmit} className={style.content}>
                            <div >
                                <Row type="flex">
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.projectname')} {...formItemLayout}>
                                            {/* 项目名称 */}
                                            {getFieldDecorator('paName', {
                                                initialValue: this.state.info.paName,
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
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.projectcode')} {...formItemLayout}>
                                            {/* 项目代码 */}
                                            {getFieldDecorator('paCode', {
                                                initialValue: this.state.info.paCode,
                                                rules: [{
                                                    required: true,
                                                }],
                                            })(
                                                <Input disabled/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row >
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.starttime')} {...formItemLayout}>
                                            {/* 计划开始时间 */}
                                            {getFieldDecorator('planStartTime', {
                                                initialValue: this.state.info.planStartTime ? (moment(this.state.info.planStartTime, 'YYYY-MM-DD')) : null,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.starttime'),
                                                }],
                                            })(
                                                <DatePicker style={{ width: "100%" }} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.plan.plandefine.planendtime")} {...formItemLayout}>
                                            {/* 计划完成时间 */}
                                            {getFieldDecorator('planEndTime', {
                                                initialValue: this.state.info.planEndTime ? (moment(this.state.info.planEndTime, 'YYYY-MM-DD')) : null,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.endtime'),
                                                }],
                                            })(
                                                <DatePicker style={{ width: "100%" }} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.plandrtn')} {...formItemLayout}>
                                            {/* 预计工期 */}
                                            {getFieldDecorator('totalDrtn', {
                                                initialValue: this.state.info.totalDrtn,
                                                rules: [],
                                            })(
                                                <Input type='number' placeholder="请填写预期工期" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.pre.project1.totalBudget")} {...formItemLayout}>
                                            {/* 项目投资额(元) */}
                                            {getFieldDecorator('totalBudget', {
                                                initialValue: this.state.info.totalBudget,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.plantotalcost'),
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
                                            {/* 项目概算(元) */}
                                            {getFieldDecorator('budgetEstimate', {
                                                initialValue: this.state.info.budgetEstimate,
                                                rules: [],
                                            })(
                                                <Input type='number' placeholder="请填写项目概算金额" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.pre.project1.projectEstimate")} {...formItemLayout}>
                                            {/* 项目预算(元) */}
                                            {getFieldDecorator('projectEstimate', {
                                                initialValue: this.state.info.projectEstimate,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.plantotalcost'),
                                                }],
                                            })(
                                                <Input type='number' placeholder="请填写项目概算金额" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.iptname')} {...formItemLayout}>
                                            {/*责任主体 */}
                                            {getFieldDecorator('orgId', {
                                                initialValue: this.state.info.org ? this.state.info.org.id : null,
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
                                        <Form.Item label={intl.get("wsd.i18n.pre.project1.constructionScale")} {...formItemLayout}>
                                            {/* 建设规模 */}
                                            {getFieldDecorator('constructionScale', {
                                                initialValue: this.state.info.constructionScale,
                                                rules: [],
                                            })(
                                                <Input placeholder="请填写建设规模" />
                                            )}
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row >

                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.username')} {...formItemLayout}>
                                            {/* 责任人 */}
                                            {getFieldDecorator('userId', {
                                                initialValue: this.state.userId,
                                                rules: [],
                                            })(
                                                <Select placeholder="请选择项目负责人" >
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
                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.pre.project1.projectLocation")} {...formItemLayout}>
                                            {/* 项目地点 */}
                                            {getFieldDecorator('projectLocation', {
                                                initialValue: this.state.info.projectLocation,
                                                rules: [],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row >

                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.base.planTem.creator')} {...formItemLayout}>
                                            {/* 创建人 */}
                                            {getFieldDecorator('creator', {
                                                initialValue: this.state.info.creator ? this.state.info.creator.name : '',
                                                rules: [],
                                            })(
                                                <Input disabled />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get("wsd.i18n.sys.menu.creattime")} {...formItemLayout}>
                                            {/* 创建日期 */}
                                            {getFieldDecorator('creatTime', {
                                                initialValue: this.state.info.creatTime ? (moment(this.state.info.creatTime, 'YYYY-MM-DD')) : null,
                                                rules: [],
                                            })(
                                                <DatePicker style={{ width: "100%" }} disabled />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.epsname')} {...formItemLayout}>
                                            {/* 所属项目群 */}
                                            {getFieldDecorator('epsId', {
                                                initialValue: this.state.info.eps ? this.state.info.eps.id : null,
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
                                <Row>
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.projecttarget')} {...formItemLayout1}>
                                            {/* 项目目标 */}
                                            {getFieldDecorator('projectTarget', {
                                                initialValue: this.state.info.projectTarget,
                                                rules: [],
                                            })(
                                                <TextArea rows={2} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.projectpurpose')} {...formItemLayout1}>
                                            {/* 项目概况 */}
                                            {getFieldDecorator('projectOverview', {
                                                initialValue: this.state.info.projectOverview ? this.state.info.projectOverview : '',
                                                rules: [],
                                            })(
                                                <TextArea rows={2} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item label={intl.get("wsd.i18n.sys.ipt.remark")} {...formItemLayout1}>
                                            {/* 备注 */}
                                            {getFieldDecorator('remark', {
                                                initialValue: this.state.info.remark ? this.state.info.remark : "",
                                                rules: [],
                                            })(
                                                <TextArea rows={2} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Col offset={4} >
                                            <Button onClick={this.handleSubmit} style={{ width: "100px" }} type="primary">保存</Button>
                                            <Button onClick={this.props.closeRightBox} style={{ width: "100px", marginLeft: "20px" }}>取消</Button>
                                        </Col>
                                    </Col>
                                </Row>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
const MenuInfos = Form.create()(MenuInfo);
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {
        curdCurrentData
    })(MenuInfos);