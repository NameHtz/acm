import React, { Component } from 'react'
import style from './style.less'
import { Form, Modal, Row, Col, Input, InputNumber, Icon, Select, DatePicker, Table, Slider } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment'
const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
class FeedBack extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                key: 1,
                actStartTime: "2018-12-12",
                actEndTime: "2019-1-9",
                completeDrtn: 60,
                enClosure: "上传",
                progressDesc: '暂无',
            },
            data: [
                {
                    key: "[0]",
                    id: "1",
                    fileName: "需求计划",
                    fileType: "word",
                    oprate: <Icon type="close" />
                }, {
                    key: "[1]",
                    id: "2",
                    fileName: "需求计划",
                    fileType: "word",
                    operate: <Icon type="close" />
                }]
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
    onChange = (value) => {
        this.setState({
            inputValue: value,
        });
    }
    render() {
        const columns = [
            {
                title: intl.get('wsd.i18n.plan.fileinfo.filename'),
                dataIndex: 'fileName',
                key: 'fileName',
            },
            {
                title: intl.get('wsd.i18n.plan.fileinfo.filetype'),
                dataIndex: 'fileType',
                key: 'fileType',
            },
            {
                title: "",
                dataIndex: 'operate',
                key: 'operate',
            }
        ]
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
                        <Row>
                            <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.plan.thisfeedback.actstarttime')} {...formItemLayout}>
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
                                <Form.Item label="报告日期" {...formItemLayout}>
                                    {getFieldDecorator('planStartTime', {
                                        initialValue: moment(this.state.info.planStartTime),
                                        rules: [],
                                    })(
                                        <DatePicker style={{ width: '100%' }} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="截止日期" {...formItemLayout}>
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
                                <Form.Item label="申请完成%" {...formItemLayout}>
                                    {getFieldDecorator('completeDrtn', {
                                        initialValue: this.state.info.completeDrtn,
                                        rules: [{
                                            required: true,
                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.comu.meetingaction.planstarttime'),
                                        }],
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
                            <Col span={12}>
                                <Form.Item label="估计完成" {...formItemLayout}>
                                    {getFieldDecorator('enClosure', {

                                        rules: [],
                                    })(
                                        <DatePicker style={{ width: '100%' }} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label={intl.get('wsd.i18n.plan.thisfeedback.progressdesc')} {...formLayout}>
                                    {getFieldDecorator('progressDesc', {
                                        initialValue: this.state.info.progressDesc,
                                        rules: [],
                                    })(
                                        <TextArea rows={2} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>

                    </div>

                </Form>
                <div className={style.Modifytable}>
                    <div className={style.tip}>
                        <span>备注：文件支持Word、excal格式</span>
                        <p><Icon type="unlock" />上传文件</p>
                    </div>
                    <Table columns={columns} dataSource={this.state.data} pagination={false} name={this.props.name} />
                </div>
            </div>
        )
    }
}
const FeedBacks = Form.create()(FeedBack);
export default FeedBacks
/*{
    "wsd.i18n.plan.thisfeedback.actstarttime":"实际开始时间",
  "wsd.i18n.plan.thisfeedback.actendtime":"实际结束时间",
  "wsd.i18n.plan.thisfeedback.planstarttime":"计划开始时间",
  "wsd.i18n.plan.thisfeedback.planendtime":"计划结束时间",
  "wsd.i18n.plan.thisfeedback.applytime":"填报人",
  "wsd.i18n.plan.thisfeedback.applyname":"填报时间",
  "wsd.i18n.plan.thisfeedback.completedrtn":"完成比例",
  "wsd.i18n.plan.thisfeedback.progressdesc":"进展说明",
}*/
