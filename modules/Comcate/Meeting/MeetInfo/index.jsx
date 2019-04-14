import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';

import { meetingUpdate } from '../../../../api/api'
import axios from '../../../../api/axios'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const { TextArea } = Input;
//会议问题->基本信息
class ComcateMeetingInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                key: 1,
                title: 'sdf',
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
            width: this.props.width,
            info: this.props.data
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

        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                console.log('Received values of form: ', fieldsValue);

                // creatTime: Moment {_isAMomentObject: true, _i: 1, _isUTC: false, _pf: {…}, _locale: Locale, …}
                // creator: "WSD"
                // meetTime: Moment {_isAMomentObject: true, _i: "2018-10-20", _f: "YYYY-MM-DD", _isUTC: false, _pf: {…}, …}
                // meetingAddress: "第一会议室"
                // meetingRemark: "务必在要求之前完成"
                // meetingType: "项目会议"
                // meetingUser: "孙播忍"
                // projectName: "ACM产品项目开发"
                // time: "2018-10-20"
                // title: "会议会议"


                // 获取到form表单里的数据
                let data = {
                    meetTime: fieldsValue['meetTime'].format('YYYY-MM-DD'),
                    creatTime: fieldsValue['creatTime'].format('YYYY-MM-DD'),
                    meetingAddress:fieldsValue.meetingAddress,
                    meetingRemark:fieldsValue.meetingRemark,
                    meetingType:fieldsValue.meetingType,
                    meetingUser:fieldsValue.meetingUser,
                    projectName:fieldsValue.projectName,
                    title:fieldsValue.title,
                }
                //更新会议基本信息
                axios.put(meetingUpdate,data).then((result) => {
                    console.log(result)
                }).catch((err) => {
                    console.log(err)
                });
            }
        });
    }
    // 会议基本信息
    // getMeetingInfo = () => {
    //     axios.get(meetingInfo()).then((result) => {
    //         console.log(result)
    //         this.setState({
    //             info:result.data
    //         })
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }
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
                {this.state.initDone && (
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>基本信息</h3>
                        <div className={style.mainScorll}>
                            <Form onSubmit={this.handleSubmit}>
                                <div className={style.content}>
                                    <Row type="flex">
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
                                    <Row >
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.comu.meeting.projectname')} {...formItemLayout}>
                                                {getFieldDecorator('projectName', {
                                                    initialValue: this.state.info.projectName,
                                                    rules: [],
                                                })(

                                                    <Select>
                                                        <Option value="模块1">模块1</Option>
                                                    </Select>
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
                                    <Row>

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
                                    <Row > <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.comu.meeting.creator')} {...formItemLayout}>
                                            {getFieldDecorator('creator', {
                                                initialValue: this.state.info.creator,
                                                rules: [],
                                            })(
                                                <Input disabled />
                                            )}
                                        </Form.Item>
                                    </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.comu.meeting.creattime')} {...formItemLayout}>
                                                {getFieldDecorator('creatTime', {
                                                    initialValue: moment(this.state.info.creatTime),
                                                    rules: [],
                                                })(
                                                    <DatePicker style={{ width: '100%' }} disabled />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item label={intl.get('wsd.i18n.comu.meeting.meetingremark')} {...formItemLayout1}>
                                                {getFieldDecorator('meetingRemark', {
                                                    initialValue: this.state.info.meetingRemark,
                                                    rules: [],
                                                })(
                                                    <TextArea rows={4} />
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


const ComcateMeetingInfos = Form.create()(ComcateMeetingInfo);
export default ComcateMeetingInfos