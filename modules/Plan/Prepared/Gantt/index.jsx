import React, { Component } from 'react'
import { Form, Row, Col, Radio, Input, Button, Checkbox, Icon, Select, DatePicker, Modal, Switch } from 'antd';
import moment from 'moment';
import style from './style.less'
import GanttColor from '../GanttColor'

const CheckboxGroup = Checkbox.Group;

export class PlanPreparedSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {
                formData1: '2018-12-01',
                formData2: 1,
                formData3: '',
                formData4: 1
            },
            ganttColorVisible: false
        }
    }

    handleSubmit = () => {

    }

    handleCancel = () => {
        this.setState({
            ganttColorVisible: false
        })
    }

    showGanttColor = () => {
        this.setState({
            ganttColorVisible: true
        })
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
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
        const plainOptions = ['显示WBS横道', '显示计划横道', '显示基线横道', '显示关键路径'];
        return (
            <Modal className={style.main} title="横道设置" visible={this.props.modalVisible} width={466} onCancel={this.props.handleCancel} footer={[
                <Button key="1" onClick={this.handleSubmit}>恢复默认颜色</Button>,
                <Button key="2" type="primary" onClick={this.handleSubmit}>保存</Button>,
            ]}>
                <Form onSubmit={this.handleSubmit}>
                    <div className={style.content}>
                        <Form.Item label="尚需横道" {...formItemLayout}>
                            <span className={style.ganttc} onClick={this.showGanttColor}></span>
                        </Form.Item>
                        <Form.Item label="实际横道" {...formItemLayout}>
                            <span className={`${style.ganttc} ${style.ganttc1}`} onClick={this.showGanttColor}></span>
                        </Form.Item>
                        <Form.Item label="进度横道" {...formItemLayout}>
                            <span className={`${style.ganttc} ${style.ganttc2}`} onClick={this.showGanttColor}></span>
                        </Form.Item>
                        <Form.Item label="目标横道" {...formItemLayout}>
                            <span className={`${style.ganttc} ${style.ganttc3}`} onClick={this.showGanttColor}></span>
                        </Form.Item>
                        <Form.Item label="WBS横道" {...formItemLayout}>
                            <span className={`${style.ganttc} ${style.ganttc4}`} onClick={this.showGanttColor}></span>
                        </Form.Item>
                        <Form.Item label="顶层刻度" {...formItemLayout}>
                            <Select style={{width: 75}}>
                                <Option value="年">年</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="底层刻度" {...formItemLayout}>
                            <Select style={{width: 75}}>
                                <Option value="月">月</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className={style.select}>
                        <CheckboxGroup options={plainOptions}></CheckboxGroup> 
                    </div>
                </Form>
                <GanttColor modalVisible={this.state.ganttColorVisible} handleCancel={this.handleCancel} />
            </Modal>
        )
    }
}

const PlanPreparedSchedules = Form.create()(PlanPreparedSchedule);
export default PlanPreparedSchedules
