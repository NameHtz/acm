import React, { Component } from 'react'
import { Modal, Form, Row, Col, Input, Button, Icon, Select, DatePicker, Slider, InputNumber, Switch } from 'antd';
import style from './style.less'

const { TextArea } = Input

export class PlanDefineBaselineAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            formData: {
                baselineName: '',
                baselineType: '',
                remark: ''
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                alert(JSON.stringify(fieldsValue))
                // 清空表单项
                this.props.form.resetFields()
                // 关闭弹窗
                this.props.handleCancel()
            }
        })
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 21 },
            },
        };
        return (
            <div className={style.main}>
                <Modal className={style.formMain} width="850px" footer={null} forceRender={true} centered={true} title="新增基线" visible={this.props.modalVisible} onCancel={this.props.handleCancel} footer={[
                    <Button key="submit" onClick={this.handleSubmit}>保存并继续</Button>,
                    <Button key="submit" type="primary" onClick={this.handleSubmit}>保存</Button>,
                ]}>
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            <Row type="flex">
                                <Col span={12}>
                                    <Form.Item label="基线名称" {...formItemLayout}>
                                        <div className={style.list}>
                                            {getFieldDecorator('baselineName', {
                                                initialValue: this.state.formData.baselineName,
                                                rules: [{
                                                    required: true,
                                                    message: '请输入基线名称',
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </div>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="基线类型" {...formItemLayout}>
                                        <div className={style.list}>
                                            {getFieldDecorator('baselineType', {
                                                initialValue: this.state.formData.baselineType,
                                                rules: [{
                                                    required: true,
                                                    message: '请选择基线类型',
                                                }],
                                            })(
                                                <Select>
                                                    <Select.Option value="1">年度计划</Select.Option>
                                                    <Select.Option value="2">季度计划</Select.Option>
                                                    <Select.Option value="3">月计划</Select.Option>
                                                </Select>
                                            )}
                                        </div>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="备注" {...formItemLayout2}>
                                        <div className={style.list}>
                                            {getFieldDecorator('remark', {
                                                initialValue: this.state.formData.remark,
                                                rules: [],
                                            })(
                                                <TextArea rows={4} style={{width: '100%'}} />
                                            )}
                                        </div>
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

const PlanDefineBaselineAdds = Form.create()(PlanDefineBaselineAdd);
export default PlanDefineBaselineAdds
