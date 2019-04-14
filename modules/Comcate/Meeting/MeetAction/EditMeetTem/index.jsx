import React, { Component } from 'react'
import style from './style.less'
import { Form, Modal, Row, Col, Input, InputNumber, Icon, Slider, Select, DatePicker, Button } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment'
import { meetingActionAdd, meetingActionUpdate} from '../../../../../api/api'
import axios from '../../../../../api/axios'

const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
class EditMeet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                key: 1,
                actionName: "会议项目计划111111111",
                actionCode: "ssddd",
                planStartTime: "2018-12-12",
                planEndTime: "2019-1-9",
                iptName: "研发部门",
                userName: "孙渤海",
                completeStatus: 60,
            }
        }
    }

    componentDidMount() {
        this.loadLocales();
        console.log('加载')
        console.log(this.props)
        this.setState({
            width: this.props.width
        })
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        })
            .then(() => {
                // After loading CLDR locale data, start to render
                this.setState({ initDone: true });
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);

                // actionCode: "ssddd"
                // actionName: "会议项目计划111111111"
                // completeStatus: 60
                // iptName: "研发部门"
                // planEndTime: 
                // planStartTime:
                // userName: "孙渤海"

                let data = {
                    actionCode: values.actionCode,
                    actionName: values.actionName,
                    completeStatus: values.completeStatus,
                    iptName:values.iptName,
                    planEndTime: values['planEndTime'].format('YYYY-MM-DD'),
                    planStartTime:values['planStartTime'].format('YYY-MM-DD'),
                    userName: values.userName,
                }
                

                let flag = this.props.flag;
                if(flag === '新增会议行动项'){
                // 新增会议行动项目

                axios.post(meetingActionAdd,data).then((result) => {
                    // console.log(result)
                }).catch((err) => {
                    // console.log(err)
                });

                }else if(flag === '修改会议行动项'){

                    //修改会议行动项
                    axios.put(meetingActionUpdate,data).then((result) => {
                        // console.log(result)
                    }).catch((err) => {
                        // console.log(err)
                    });
                }
                
            }
        });
    }
    // 关闭
    handleCancel = () => {
        this.props.handleCancel()
    }


    onChange = (value) => {
        this.setState({
            inputValue: value,
        });
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
        };
        const formLayout = {
            labelCol: {
                sm: { span: 4 }
            },
            wrapperCol: {
                sm: { span: 20 }
            }
        }
        return (
            <div className={style.main}>
                <Form onSubmit={this.props.getEdirMeetTem}>
                    <div className={style.content}>
                        <Row type="flex">
                            <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.comu.meetingaction.actionname')} {...formItemLayout}>
                                    {getFieldDecorator('actionName', {
                                        initialValue: this.state.info.actionName,
                                        rules: [],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.comu.meetingaction.actioncode')} {...formItemLayout}>
                                    {getFieldDecorator('actionCode', {
                                        initialValue: this.state.info.actionCode,
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.comu.meetingaction.actioncode'),
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row> <Col span={12}>
                            <Form.Item label={intl.get('wsd.i18n.comu.meetingaction.planstarttime')} {...formItemLayout}>
                                {getFieldDecorator('planStartTime', {
                                    initialValue: moment(this.state.info.planStartTime),
                                    rules: [{
                                        required: true,
                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.comu.meetingaction.planstarttime'),
                                    }],
                                })(
                                    <DatePicker style={{ width: '100%' }} />
                                )}
                            </Form.Item>
                        </Col>
                            <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.comu.meetingaction.planendtime')} {...formItemLayout}>
                                    {getFieldDecorator('planEndTime', {
                                        initialValue: moment(this.state.info.planEndTime),
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.comu.meetingaction.planendtime'),
                                        }],
                                    })(
                                        <DatePicker style={{ width: '100%' }} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.comu.meetingaction.iptname')} {...formItemLayout}>
                                    {getFieldDecorator('iptName', {
                                        initialValue: this.state.info.iptName,
                                        rules: [],
                                    })(
                                        <Select>
                                            <Option value="研发部">研发部</Option>
                                        </Select>

                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.comu.meetingaction.username')} {...formItemLayout}>
                                    {getFieldDecorator('userName', {
                                        initialValue: this.state.info.userName,
                                        rules: [],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="申请完成%" {...formItemLayout}>
                                    {getFieldDecorator('completeStatus', {
                                        initialValue: this.state.info.completeStatus,
                                        rules: [],
                                    })(
                                        <Row>
                                            <Col span={18}>
                                                <Slider
                                                    min={1}
                                                    max={100}
                                                    onChange={this.onChange}
                                                    value={typeof this.state.inputValue === 'number' ? this.state.inputValue : 0}
                                                />
                                            </Col>
                                            <Col span={6}>
                                                <InputNumber
                                                    value={this.state.inputValue}
                                                    min={1}
                                                    max={100}
                                                    onChange={this.onChange}
                                                    style={{ marginLeft: 10, width: "calc(100% - 10px)" }}
                                                    formatter={value => `${value}%`}
                                                    parser={value => value.replace('%', '')}

                                                />
                                            </Col>
                                        </Row>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Form>
                <div style={{ borderTop: '1px solid #e8e8e8', width: '100%', textAlign: 'right', paddingTop: '10px' }} className='modalbtn'>
                    <Button key={2} onClick={this.handleCancel} >关闭</Button>
                    <Button key={3} onClick={this.handleSubmit} type="primary">保存</Button>
                </div>
            </div>
        )
    }
}
const EditMeets = Form.create()(EditMeet);
export default EditMeets

