import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment'
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
class AddMeet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                title: 1,
                meetingType: 1,
                projectName: 1,
                meetingAddress: 1,
                meetTime: 1,
                meetingUser: 1,
                creator: 1,
                creatTime: 1,
                meetingRemark: 1,
            }
        }
    }

    componentDidMount() {
        this.loadLocales();
        console.log('加载')
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
        alert(1)
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
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
                <Form onSubmit={this.handleSubmit}>
                    <div className={style.content}>
                        <Row gutter={24} type="flex">
                            <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.comu.meeting.title')} {...formItemLayout}>
                                    {getFieldDecorator('title', {
                                        initialValue: this.state.info.title,
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.comu.meeting.title'),
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.comu.meeting.meetingtype')} {...formItemLayout}>
                                    {getFieldDecorator('meetingType', {
                                        initialValue: this.state.info.meetingType,
                                        rules: [],
                                    })(
                                        <Select>
                                            <Option value="模块1">模块1</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}> <Col span={12}>
                            <Form.Item label={intl.get('wsd.i18n.comu.meeting.projectname')} {...formItemLayout}>
                                {getFieldDecorator('projectName', {
                                    initialValue: this.state.info.projectName,
                                    rules: [],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                            <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.comu.meeting.meetingaddress')} {...formItemLayout}>
                                    {getFieldDecorator('meetingAddress', {
                                        initialValue: this.state.info.meetingAddress,
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.comu.meeting.meetingaddress'),
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.comu.meeting.meetinguser')} {...formItemLayout}>
                                    {getFieldDecorator('meetingUser', {
                                        initialValue: this.state.info.meetingUser,
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.comu.meeting.meetinguser'),
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.comu.meeting.meettime')} {...formItemLayout}>
                                    {getFieldDecorator('meetTime', {
                                        initialValue: moment(this.state.info.meetTime),
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.comu.meeting.meettime'),
                                        }],
                                    })(
                                        <DatePicker style={{ width: '100%' }} />
                                    )}
                                </Form.Item>
                            </Col>

                        </Row>
                        {/* <Row gutter={24}> <Col span={12}>
                            <Form.Item label={intl.get('wsd.i18n.comu.meeting.creator')} {...formItemLayout}>
                                {getFieldDecorator('creator', {
                                    initialValue: this.state.info.creator,
                                    rules: [],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                            <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.comu.meeting.creattime')} {...formItemLayout}>
                                    {getFieldDecorator('creatTime', {
                                        initialValue: moment(this.state.info.creatTime),
                                        rules: [],
                                    })(
                                        <DatePicker style={{ width: '100%' }} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row> */}
                        <Row gutter={24}> <Col span={24}>
                            <Form.Item label={intl.get('wsd.i18n.comu.meeting.meetingremark')} {...formLayout}>
                                {getFieldDecorator('meetingRemark', {
                                    initialValue: this.state.info.meetingRemark,
                                    rules: [{
                                        required: true,
                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.comu.meeting.meetingremark'),
                                    }],
                                })(
                                    <TextArea />
                                )}
                            </Form.Item>
                        </Col>
                        </Row>
                    </div>

                </Form>
            </div>
        )
    }
}
const AddMeets = Form.create()(AddMeet);
export default AddMeets
/*{
 "wsd.i18n.comu.meeting.title":"会议标题",
 "wsd.i18n.comu.meeting.meetingtype":"会议类型",
 "wsd.i18n.comu.meeting.projectname":"所属项目",
 "wsd.i18n.comu.meeting.meetingaddress":"会议地点",
 "wsd.i18n.comu.meeting.meettime":"会议时间",
 "wsd.i18n.comu.meeting.meetinguser":"主持人",
 "wsd.i18n.comu.meeting.creator":"创建人",
 "wsd.i18n.comu.meeting.creattime":"创建时间",
 "wsd.i18n.comu.meeting.meetingremark":"会议内容说明",
 }*/
