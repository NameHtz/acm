import react, { Component } from 'react'
import { Modal, Form, Input, Select, Button, Col, Row } from 'antd'


import style from "./style.less";
import intl from "react-intl-universal";
import { connect } from 'react-redux'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input
const locales = {
    "en-US": require('../../../../api/language/en-US'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

class AddRoleModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
        }
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        })
            .then(() => {
                // After loading CLDR locale data, start to render
                this.setState({ initDone: true })
            })
    }

    cancel() {
        const { form, onCancel } = this.props
        form.resetFields()
        onCancel()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                this.props.onSubmit(fieldsValue)

                // 清空表单项
                this.props.form.resetFields()

            }
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
        }
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
                <Modal visible={this.props.visible}
                    title='新增角色'
                    footer={
                        <div className="modalbtn">
                            <Button key={1} onClick={this.props.onCancel}>取消</Button>
                            <Button key={2} onClick={this.handleSubmit} type="primary">保存</Button>
                        </div>
                    }
                    centered={true}
                    onCancel={this.props.onCancel}
                    width='850px'>
                    <Form>
                        <div className={style.content}>
                            <Row type='flex'>
                                <Col span={12}>
                                    <FormItem label={intl.get('wsd.i18n.sys.role.rolename')}
                                        {...formItemLayout}>
                                        {
                                            getFieldDecorator('roleName', {
                                                rules: [{ required: true, message: '请输入角色名称' }],
                                            })(<Input placeholder='请输入角色名称' />)
                                        }
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem label={intl.get('wsd.i18n.sys.role.rolecode')}
                                        {...formItemLayout}>
                                        {
                                            getFieldDecorator('roleCode', {
                                                rules: [{ required: true, message: '请输入角色代码' }],
                                            })(<Input placeholder='请输入角色代码' />)
                                        }
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={24}>
                                    <Form.Item label={intl.get('wsd.i18n.sys.role.roledesc')} {...formItemLayout1}>
                                        {getFieldDecorator('roleDesc', {
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
const AddRoleModals = Form.create()(AddRoleModal)
export default AddRoleModals
