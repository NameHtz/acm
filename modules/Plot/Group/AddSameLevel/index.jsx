import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Select, Modal, TreeSelect } from 'antd';
import intl from 'react-intl-universal'

import moment from 'moment';
import { connect } from 'react-redux'
import axios from '../../../../api/axios'
import { epsAdd, orgTree, orgPer } from '../../../../api/api'

const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
class AddSameLevel extends Component {
    constructor(props) {
        super(props)
        this.state = {

            info: {},
            orgTree: [],
            orgPer: [],
            orgTreeKey: '',
            selectChange: null,
        }
    }

    getData = () => {
        axios.get(orgTree).then(res => {
            // console.log(res)
            this.setState({ orgTree: res.data.data })
        })
    }

    componentDidMount() {
        this.getData();
    }

    handleCancel = (e) => {

        this.props.handleCancel()
    }
    handleSubmit = (val, e) => {
        console.log(val)
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                let data = {
                    ...values,
                    parentId: this.props.data ? this.props.data.id : 0
                }

                console.log(data)
                axios.post(epsAdd, data, true).then(res=>{
                    this.props.addData(res.data.data)
                    if(val == 'save'){
                        this.props.handleCancel();
                    } else{
                        this.props.form.resetFields();
                    }
                })

            }
        });
    }

    change = (v) => {
        // console.log(v)
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
                <Modal title="新增" visible={this.props.visible}
                    onCancel={this.handleCancel}
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
                                            initialValue: this.state.orgPer.length ? this.state.orgPer[0].id : '',
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
                            <Row>
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
}))(AddSameLevels);