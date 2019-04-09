import React, {Component} from 'react'
import style from './style.less'

import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal } from 'antd';

import intl from 'react-intl-universal'
import moment from 'moment'
import {meetingAdd} from '../../../../api/api'

import axios from '../../../../api/axios'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

export class Add extends Component {
    constructor (props) {
        super (props)
        this.state = {
            title:'基本信息',
            initDone: false,
            inputMeetTime:'',
            info: {
                title: 2,
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

        this.props.form.validateFieldsAndScroll((err, values) => {
            
             values.meetTime = this.state.inputMeetTime;
              let data = {
                "title": values.title,
                "meetingType": values.meetingType,
                
                "meetingAddress": values.meetingAddress,
                "meetingUser": values.meetingUser,
                "meetingTime": this.state.inputMeetTime,
                "meetingRemark": values.meetingRemark,
                "projectName":values.projectName,
              }      
              data = JSON.stringify(data)
            if (!err) {
                //添加会议
                axios.post(meetingAdd,data,true).then((result) => {
                    console.log(result)
                }).catch((err) => {
                    console.log(err)
                });
            }
        });
    }
   
    getDatePicker = (date,dateString) => {
        console.log(date)
        this.setState({
            inputMeetTime:dateString
        })
    }

    render () {


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
                <Modal
                    title={this.props.modelTitle}
                    visible={this.props.modalVisible}
                    onCancel={this.props.handleCancel}
                    footer= {null}
                    width="850px"
                    centered={true}
                    className={style.addFormInfo}
                    footer={ 
                        <div className="modalbtn">
                      
                        <Button key={3} onClick={this.handleSubmit} type="primary"  ghost>保存并继续</Button>
                        <Button key={2}  onClick={this.handleSubmit} type="primary" >保存</Button>
                        </div>
                    }
                >


              <div className={style.addcontentBox}>
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
                                        <DatePicker style={{ width: '100%' }} onChange={this.getDatePicker}/>
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
                    {/* <AddInfo /> */}






            </Modal>
            </div>
        )
    }
}

const Adds = Form.create()(Add)

export default Adds