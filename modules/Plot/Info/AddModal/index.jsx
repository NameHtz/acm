import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Select, Modal, DatePicker, TreeSelect } from 'antd';
import intl from 'react-intl-universal'

import { epsTree, orgTree, orgPer, planPrepa, getOrgAndUser, getUserByOrgId, addproject } from '../../../../api/api'
import axios from '../../../../api/axios'


import { connect } from 'react-redux'


const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
class AddSameLevel extends Component {
    constructor(props) {
        super(props)
        this.state = {

            userId: null,
            isUserId: true,

        }
    }

    componentDidMount() {
        this.getOrgAndUser()
        this.getEps()
    }
    //获取责任人主体、
    getOrgAndUser = () => {
        axios.get(orgTree).then(res => {

            this.setState({
                orglist: res.data.data
            })
        })
    }
    //责任人
    getUser = (id) => {
        axios.get(getUserByOrgId(id)).then(res => {
            console.log(res.data.data)
            this.setState({
                userlist: res.data.data
            })
        })
    }
    //选择责任主体联动责任人
    onTreeChange = (v) => {
        const { info } = this.state
        this.setState({
            userId: null,
            isUserId: false
        }, () => {
            this.getUser(v)
        })

    }
    //获取项目群
    getEps = () => {
        axios.get(epsTree).then(res => {
            // console.log(res)
            this.setState({ epsList: res.data.data })
        })
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.props.form.resetFields();
        this.props.handleCancel()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //平铺
                if (this.props.view == "tile") {
                    let data = {
                        ...values,
                        parentId: 0
                    }
                    axios.post(addproject, data, true).then(res => {
                        this.props.addprojectinfo(res.data.data)
                        this.props.form.resetFields();
                    })
                } else {
                    //树形
                    let data = {
                        ...values,
                        parentId: this.props.data.id
                    }
                    axios.post(addproject, data, true).then(res => {
                        this.props.addprojectinfo(res.data.data)
                        this.props.form.resetFields();
                    })
                }


            }
        });
    }




    render() {
        console.log(this.props.data)
        console.log(this.props.view)
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
            <div >

                <Modal className={style.main}
                    title={this.props.title} visible={true}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                    width="850px"
                    footer={
                        <div className="modalbtn">
                            <Button key={2} onClick={this.handleSubmit} type="primary" ghost>保存</Button>
                            <Button key={3} onClick={this.handleSubmit} type="primary">保存并继续</Button>
                        </div>
                    }

                >
                    <Form onSubmit={this.handleSubmit} className={style.info}>
                        <div className={style.content}>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.pre.project.projectname')} {...formItemLayout}>
                                        {getFieldDecorator('name', {

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
                                        {getFieldDecorator('code', {

                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.projectcode'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.pre.project.epsname')} {...formItemLayout}>
                                        {getFieldDecorator('parentId', {
                                            initialValue: this.props.view == "tile" ? null:(this.props.data?this.props.data.name:null ),
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.epsname'),
                                            }],
                                        })(
                                            this.props.view=="tile"?
                                            <Select >
                                                {this.state.epsList &&
                                                    this.state.epsList.map((val) => {
                                                        return (
                                                            <Option key={val.id} value={val.id}>{val.title}</Option>
                                                        )
                                                    })
                                                }

                                            </Select>
                                            :
                                            <Input disabled/>
                                        )}
                                    </Form.Item>
                                </Col>


                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.pre.project1.iptname')} {...formItemLayout}>
                                        {getFieldDecorator('orgId', {

                                            rules: [],
                                        })(
                                            <TreeSelect
                                                showSearch
                                                style={{ width: "100%" }}

                                                treeData={this.state.orglist}


                                                // allowClear
                                                treeDefaultExpandAll
                                                onChange={this.onTreeChange}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.pre.project1.username')} {...formItemLayout}>
                                        {getFieldDecorator('userId', {
                                            initialValue: this.state.userId,
                                            rules: [],
                                        })(
                                            <Select placeholder="请选择项目负责"
                                                disabled={this.state.isUserId}
                                            >
                                                {this.state.userlist &&
                                                    this.state.userlist.map((val) => {
                                                        return (
                                                            <Option key={val.id} value={val.id}>{val.name}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={intl.get("wsd.i18n.pre.project.plandrtn")} {...formItemLayout}>
                                        {getFieldDecorator('totalDrtn', {

                                            rules: [],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
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
                            <Row>

                                <Col span={12}>
                                    <Form.Item label={intl.get("wsd.i18n.pre.project1.projectEstimate")} {...formItemLayout}>
                                        {getFieldDecorator('projectBudget', {

                                            rules: [],
                                        })(
                                            <Input placeholder="请填写项目预算金额" />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={intl.get("wsd.i18n.pre.project1.budgetEstimate")} {...formItemLayout}>
                                        {getFieldDecorator('projectEstimate', {

                                            rules: [],
                                        })(
                                            <Input placeholder="请填写项目概算金额" />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label={intl.get("wsd.i18n.pre.project1.totalBudget")} {...formItemLayout}>
                                        {getFieldDecorator('totalBudget', {

                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project1.totalBudget'),
                                            }],
                                        })(
                                            <Input placeholder="请填写投资额" />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={intl.get("wsd.i18n.pre.project1.constructionScale")} {...formItemLayout}>
                                        {getFieldDecorator('scale', {

                                            rules: [],
                                        })(
                                            <Input placeholder="请填写建设规模" />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label={intl.get("wsd.i18n.pre.project1.projectLocation")} {...formItemLayout}>
                                        {getFieldDecorator('address', {

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

            </div>
        )
    }
}
const AddSameLevels = Form.create()(AddSameLevel);
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {

    })(AddSameLevels);