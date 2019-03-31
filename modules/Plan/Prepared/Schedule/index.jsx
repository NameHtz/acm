import React, { Component } from 'react'
import { Form, Row, Col, Radio, Input, Button, Checkbox, Icon, Select, DatePicker, Modal, Switch } from 'antd';
import moment from 'moment';
import style from './style.less'

const RadioGroup = Radio.Group;

export class PlanPreparedSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {
                formData1: '2018-12-01',
                formData2: 1,
                formData3: '',
                formData4: 1
            }
        }
    }

    handleOk = () => {

    }

    handleCancel = () => {

    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
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
        return (
            <Modal className={style.main} title="进度计算" visible={this.props.modalVisible} width={495} onCancel={this.props.handleCancel} footer={null}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="当前数据日期" {...formItemLayout}>
                        {getFieldDecorator('formData1', {
                            initialValue: moment(this.state.info.formData1),
                            rules: [],
                        })(
                            <DatePicker style={{ width: '100%' }} />
                        )}
                    </Form.Item>
                    <Form.Item label="计算范围" {...formItemLayout}>
                        {getFieldDecorator('formData2', {
                            initialValue:this.state.info.formData2,
                            rules: [],
                        })(
                            <RadioGroup defaultValue={this.state.info.formData2}>
                                <Radio className={style.radioStyle} value={1}>视图中的所有任务</Radio>
                                <Radio className={style.radioStyle} value={2}>选择WBS下的任务</Radio>
                                <Radio className={style.radioStyle} value={3}>选择的任务的所有后续任务</Radio>
                                <Radio className={style.radioStyle} value={3}>选择的任务的所有紧前任务</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item label="计算方式" {...formItemLayout}>
                        {getFieldDecorator('formData3', {
                            initialValue: this.state.info.formData3,
                            rules: [],
                        })(
                            <Checkbox>进度跨越</Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item label="关键路径" {...formItemLayout}>
                        {getFieldDecorator('formData4', {
                            initialValue: this.state.info.formData4,
                            rules: [],
                        })(
                            <RadioGroup defaultValue={this.state.info.formData4}>
                                <Radio className={style.radioStyle} value={1}>最长路径</Radio>
                                <Radio className={style.radioStyle} value={2}>总浮时等于0</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                </Form>
                <div style={{padding: 25, textAlign: 'center'}}>
                    <Button key="1">进度计算</Button> &nbsp; &nbsp;
                    <Button key="1">模拟计算</Button>
                </div>
            </Modal>
        )
    }
}

const PlanPreparedSchedules = Form.create()(PlanPreparedSchedule);
export default PlanPreparedSchedules
