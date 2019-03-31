import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Select, Modal, DatePicker } from 'antd';
import emitter from '../../../../api/ev';
import moment from 'moment';
import { connect } from 'react-redux'
import axios from '../../../../api/axios'
import { prepaProjectteamAdd, prepaProjectteamUpdata } from '../../../../api/api'

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
            addRecord: null,
            modifyRecord: null,
            data: null,
            info: {

            }
        }
    }

    getData = () => {
        axios.get(prepaProjectteamUpdata(this.props.record.id)).then(res=>{
            // console.log(res)
            this.setState({
                info: res.data.data
            })
        })
    }

    componentDidMount() {
        //判断是新增表单还是修改表单
        if (this.props.title == '新增项目团队') {
            this.setState({
                addRecord: this.props.record ? this.props.record.id : 0,
                data: this.props.data,
            })
        } else if (this.props.title == '修改项目团队') {
            // console.log(this.props.record)
            this.getData()
            this.setState({
                modifyRecord: this.props.record
            })
        }
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

        this.props.handleCancel()
    }
    handleSubmit = (val, e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.props.title == '新增项目团队') {
                    let data = {
                        ...values,
                        parentId: this.state.addRecord,
                        bizType: 'prepa',
                        bizId: this.state.data.id
                    }
                    console.log(data)
                    axios.post(prepaProjectteamAdd, data, true).then(res => {
                        console.log(res)
                        this.props.addData(res.data.data)
                        if (val == 'save') {
                            this.props.handleCancel()
                        } else if (val == 'goOn') {
                            this.props.form.resetFields()
                        }
                    })
                } else if (this.props.title == '修改项目团队') {
                    let data = {
                        ...values,
                        id:this.state.modifyRecord.id
                    }
                    console.log(data)
                    axios.put(prepaProjectteamAdd, data, true).then(res=>{
                        this.props.upData(res.data.data);
                        this.props.handleCancel();
                    })
                }

            }
        });
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
            <div >
                <Modal className={style.main}
                    title={this.props.title} visible={this.props.visible}
                    onOk={this.handleOk} onCancel={this.props.handleCancel}
                    width="850px"
                    footer={
                        <div className="modalbtn">
                            {this.props.title == '新增项目团队' ?
                                <Button key={3} onClick={this.handleSubmit.bind(this, 'goOn')} type="primary">保存并继续</Button>
                                :
                                <Button key={3} onClick={this.props.handleCancel}>取消</Button>
                            }

                            <Button key={2} onClick={this.handleSubmit.bind(this, 'save')} type="primary" ghost>保存</Button>
                        </div>
                    }

                >
                    <Form onSubmit={this.handleSubmit} className={style.info}>
                        <div className={style.content}>
                            <Row type="flex">
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.base.planTemAddTask.name')} {...formItemLayout}>
                                        {getFieldDecorator('teamName', {
                                            initialValue: this.state.info.teamName,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddTask.name'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.base.planTemAddTask.code')} {...formItemLayout}>
                                        {getFieldDecorator('teamCode', {
                                            initialValue: this.state.info.teamCode,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddTask.code'),
                                            }],
                                        })(
                                            <Input />
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
}))(AddSameLevels)
