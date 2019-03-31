import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Checkbox, Select, DatePicker, TreeSelect } from 'antd';

import moment from 'moment';
import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'
import axios from '../../../../api/axios'
import { epsInfo, orgPer, orgTree, epsAlter } from '../../../../api/api'

const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
class MenuInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {},
            orgTree: [],
            orgPer: [],
            orgPerKey: '',

        }
    }

    getDataList = () => {
        axios.get(epsInfo(this.props.data.id)).then(res => {
            console.log(res)
            this.setState({
                info: res.data.data,
                orgPerKey: res.data.data.user ? res.data.data.user.id : ''
            }, () => {
                axios.get(orgPer(res.data.data.org.id)).then(res => {
                    // console.log(res)/
                    this.setState({ orgPer: res.data.data })
                })
            })
        })

        //获取责任主体下拉列表
        axios.get(orgTree).then(res => {
            this.setState({ orgTree: res.data.data })
        })
    }

    componentDidMount() {
        this.getDataList();
        this.setState({
            width: this.props.width,
        })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                    id: this.state.info.id,
                    creatTime: values['creatTime'] ? values['creatTime'].format('YYYY-MM-DD') : ''
                }
                // console.log(data)
                axios.put(epsAlter, data, true).then(res => {
                    // console.log(res)
                    this.props.updata(res.data.data)
                })
            }
        });
    }

    change = (v) => {
        // console.log(v)
        this.setState({
            orgPerKey: ''
        })

        axios.get(orgPer(v)).then(res => {
            // console.log(res)/
            this.setState({ orgPer: res.data.data })
        })
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
                <div className={style.mainHeight}>
                    <h3 className={style.listTitle}>基本信息</h3>
                    <div className={style.mainScorll}>
                        <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                                <Row type="flex">
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.epsInfo.projectname')} {...formItemLayout}>
                                            {getFieldDecorator('name', {
                                                initialValue: this.state.info.name,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.epsInfo.projectname'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.epsInfo.projectcode')} {...formItemLayout}>
                                            {getFieldDecorator('code', {
                                                initialValue: this.state.info.code,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.epsInfo.projectcode'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.epsInfo.iptname')} {...formItemLayout}>
                                            {getFieldDecorator('orgId', {
                                                initialValue: this.state.info.org ? this.state.info.org.id : '',
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.epsInfo.iptname'),
                                                }],
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
                                        <Form.Item label={intl.get('wsd.i18n.base.planTemAddTask.username')} {...formItemLayout}>
                                            {getFieldDecorator('userId', {
                                                initialValue: this.state.orgPerKey,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddTask.username'),
                                                }],
                                            })(
                                                <Select>
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
                                        <Form.Item label={intl.get('wsd.i18n.pre.epsInfo.creator')} {...formItemLayout}>
                                            {getFieldDecorator('creator', {
                                                initialValue: this.state.info.creator ? (this.state.info.creator.name ? this.state.info.creator.name : '') : '',
                                                rules: [],
                                            })(
                                                <Input disabled />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.epsInfo.creattime')} {...formItemLayout}>
                                            {getFieldDecorator('creatTime', {

                                                initialValue: moment(this.state.info.creatTime, 'YYYY-MM-DD'),
                                                rules: [],
                                            })(
                                                <DatePicker style={{ width: "100%" }} disabled />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.epsInfo.remark')} {...formItemLayout1}>
                                            {getFieldDecorator('remark', {
                                                initialValue: this.state.info.remark,
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