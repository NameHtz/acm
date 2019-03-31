import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Switch, Slider, InputNumber } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';

import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const Option = Select.Option
const { TextArea } = Input;
class PlanDefineSetvar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,                 //国际化初始化状态
            info: {
                formValue1: '固定工期',
                formValue2: '实际',
                formValue3: '关键路径',
                formValue4: '',
                formValue5: '2d',
            },                        //基本信息
            inputValue: 1                      //权重
        }
    }
    componentDidMount() {
        this.loadLocales();
        console.log(this.props.data)
        this.setState({
            info: this.props.data
        })
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            this.setState({ initDone: true });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var data = values;
                data.key = this.state.info['key']
                // 发送数据
                // emitter.emit('noticeUpdateEvents', { status: 'update', data: data })
                this.props.curdCurrentData({
                    title: localStorage.getItem('name'),
                    status: 'update',
                    data: data
                })
            }
        });
    }
    onChange = (value) => {
        this.setState({
            inputValue: value,
        });
    }
    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
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
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 22 },
                sm: { span: 20 },
            },
        };
        const dateWidth = '100%'
        return (
            <div className={style.main}>
                {this.state.initDone && (
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>变量设置</h3>
                        <div className={style.mainScorll}>
                            <Form onSubmit={this.handleSubmit}>
                                <div className={style.content}>
                                    <Row type="flex">
                                        <Col span={12}>
                                            <Form.Item label="工期类型" {...formItemLayout}>
                                                {getFieldDecorator('formValue1', {
                                                    initialValue: this.state.info.formValue1,
                                                    rules: [],
                                                })(
                                                    <Select>
                                                        <Option value="固定工期">固定工期</Option>
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="任务完成%类型" {...formItemLayout}>
                                                {getFieldDecorator('formValue2', {
                                                    initialValue: this.state.info.formValue2,
                                                    rules: [],
                                                })(
                                                    <Select>
                                                        <Option value="实际">实际</Option>
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row type="flex">
                                        <Col span={12}>
                                            <Form.Item label="关键路径" {...formItemLayout}>
                                                {getFieldDecorator('formValue3', {
                                                    initialValue: this.state.info.formValue3,
                                                    rules: [],
                                                })(
                                                    <Select>
                                                        <Option value="总浮时">总浮时</Option>
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="启用内部共享" {...formItemLayout}>
                                                {getFieldDecorator('formValue4', {
                                                    initialValue: this.state.info.formValue4,
                                                    rules: [],
                                                })(
                                                    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row type="flex">
                                        <Col span={12}>
                                            <Form.Item label="总浮时<=" {...formItemLayout}>
                                                {getFieldDecorator('formValue5', {
                                                    initialValue: this.state.info.formValue5,
                                                    rules: [],
                                                })(
                                                    <Input />
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
                )}

            </div>
        )
    }
}

const PlanDefineSetvars = Form.create()(PlanDefineSetvar);
export default connect(null, {
    curdCurrentData
})(PlanDefineSetvars);