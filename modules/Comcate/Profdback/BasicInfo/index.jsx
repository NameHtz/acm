import React, { Component } from 'react'
import { Button, Col, Form, Input, Row, Select,Icon } from 'antd'
import intl from 'react-intl-universal'
import style from './index.less'
import PlanTaskModal from "../PlanTaskModal"

import {questionInfo} from '../../../../api/api'
import axios from '../../../../api/axios'

const FormItem = Form.Item
const { TextArea } = Input
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

export default class BasicInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            data: {
                key: "1",
                title: "项目发布之前相关人士是否通知",
                questionType: "技术问题",
                questionPriority: "高",
                userName: "孙伯域",
                repGroup: '研发部',
                creatTime: "2018-9-9",
                project: 'ACM产品开发项目',
                task: '产品需求设计',
                questionRemark: "在项目编辑页面添加...",
                questionHandle: "务必在处理之前...",
                handleTime: "2018-10-29",
                creator: "WSD",
                status: '新建',
                presentDep: '研发部',
                additionRequest: '暂无'
            }
        }
    }
    componentDidMount() {
        this.loadLocales();
        console.log('加载')
        this.getQuestionInfo()
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
            console.log(values)
            if (!err) {
                console.log('Received values of form: ', values);
                // axios.put().then((result) => {
                    
                // }).catch((err) => {
                    
                // });
                console.log(values)
            }
        });
    }


    handleSaveBasicInfo() {
        const { form } = this.props
        form.validateFields((err, values) => {
            if (err) {
                return
            } else {
            
            }
            // form.resetFields()
        })
    }

    onClose() {
        this.props.closeRightBox()
    }
 //打开计划任务
 OpenTaskModal=()=>{
    this.setState({
        isShowTaskmodal:true
    })
}
closeTaskModal=()=>{
    this.setState({
        isShowTaskmodal:false
    })
}

// 获取到当前点击的一条问题的数据
getQuestionInfo=()=>{
    // axios.get(questionInfo()).then((result) => {
    //     this.setState({
    //         data:result.data.data,
    //     })
    // }).catch((err) => {
        
    // });

     let {data} = this.props

     if(data.length !== 0){
         this.setState({
             data,
         },()=>{
             console.log(this.state.data)
         })
     }

}



    render() {
        const { form } = this.props
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
        }
        const { getFieldDecorator } = form
        const { data } = this.state

        return (
            <div className={style.main}>
                {this.state.initDone && (
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>基本信息</h3>
                        <div className={style.mainScorll}>
                            <Form>
                                <div className={style.content}>
                                    <Row type='flex'>
                                        <Col span={11}>
                                            <FormItem label={intl.get('wsd.i18n.comu.question.title')} {...formItemLayout}>
                                                {getFieldDecorator('title', {
                                                    initialValue: data.title,
                                                    rules: [{ required: true, message: '请输入问题标签' }],
                                                })(
                                                    <Input style={{ overflow: 'hidden', textOverflow: 'ellipsis' }} />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={11}>
                                            <FormItem label={intl.get('wsd.i18n.comu.question.questiontype')} {...formItemLayout}>
                                                {getFieldDecorator('questionType', {
                                                    initialValue: data.questionType,
                                                })(
                                                    <Input />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col span={11}>
                                            <FormItem label={intl.get('wsd.i18n.comu.question.questionpriority')} {...formItemLayout}>
                                                {getFieldDecorator('questionPriority', {
                                                    initialValue: data.questionPriority,
                                                })(
                                                    <Select>
                                                        <Option value='低'>低</Option>
                                                        <Option value='高'>高</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={11}>
                                            <FormItem label={intl.get('wsd.i18n.comu.question.username')} {...formItemLayout}>
                                                {getFieldDecorator(' userName', {
                                                    initialValue: data.userName,
                                                })(
                                                    <Select>
                                                        <Option value='低'>孙波禹</Option>
                                                        <Option value='高'>张三</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col span={11}>
                                            <FormItem label={intl.get("wsd.i18n.comu.meetingaction.iptname")} {...formItemLayout}>
                                                {getFieldDecorator('iptname', {
                                                    initialValue: data.repGroup,
                                                })(
                                                    <Select>
                                                        <Option value='研发部'>研发部</Option>
                                                        <Option value='销售部'>销售部</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={11}>
                                            <FormItem label={intl.get('wsd.i18n.comu.question.handletime')} {...formItemLayout}>
                                                {getFieldDecorator(' handleTime', {
                                                    initialValue: data.handleTime,
                                                    rules: [{
                                                        required: true,
                                                        message: '请输入要求处理日期',
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col span={11}>
                                            <FormItem label={intl.get("wsd.i18n.comu.meeting.projectname")} {...formItemLayout}>
                                                {getFieldDecorator('projectname', {
                                                    initialValue: data.project,
                                                })(
                                                    <Select>
                                                        <Option value='研发部'>研发部</Option>
                                                        <Option value='销售部'>销售部</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={11}>
                                            <FormItem label={intl.get("wsd.i18n.comu.meeting.plantask")} {...formItemLayout}>
                                                {getFieldDecorator('plantask', {
                                                    initialValue: data.task,
                                                })(
                                                    <Input />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={2}>
                                            <Icon type="api" theme="twoTone" className={style.link} onClick={this.OpenTaskModal.bind(this)} />
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col span={11}>
                                            <FormItem label={intl.get("wsd.i18n.comu.question.status")} {...formItemLayout}>
                                                {getFieldDecorator('questionPriority', {
                                                    initialValue: data.status,
                                                })(
                                                    <Select>
                                                        <Option value='新建'>新建</Option>
                                                        <Option value='完成'>完成</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={11}>
                                            <FormItem label={intl.get('wsd.i18n.comu.question.creator')} {...formItemLayout}>
                                                {getFieldDecorator('creator', {
                                                    initialValue: data.creator,
                                                })(
                                                    <Input disabled={true} />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col span={11}>
                                            <FormItem label={intl.get("wsd.i18n.plan.projectquestion.applyipt")} {...formItemLayout}>
                                                {getFieldDecorator('applyipt', {
                                                    initialValue: data.presentDep,
                                                })(
                                                    <Input disabled={true} />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={11}>
                                            <FormItem label={intl.get('wsd.i18n.comu.question.creattime')} {...formItemLayout}>
                                                {getFieldDecorator('creatTime', {
                                                    initialValue: data.creatTime,
                                                })(
                                                    <Input disabled={true} />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={22}>
                                            <FormItem label={intl.get('wsd.i18n.comu.question.questionremark')}{...formItemLayout1}>
                                                {
                                                    getFieldDecorator('questionRemark', {
                                                        initialValue: data.questionRemark,
                                                        rules: [{
                                                            required: true,
                                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.role.roledesc'),
                                                        }],
                                                    })
                                                        (<TextArea rows={2} />)
                                                }
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={22}>
                                            <FormItem label={intl.get('wsd.i18n.comu.question.questionhandle')}
                                                {...formItemLayout1}>
                                                {
                                                    getFieldDecorator('additionRequest', {
                                                        initialValue: data.additionRequest,
                                                        rules: [{
                                                            required: true,
                                                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.role.roledesc'),
                                                        }],
                                                    })
                                                        (<TextArea rows={2} />)
                                                }
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col span={22}>
                                            <Col offset={4} >
                                                <Button onClick={this.handleSubmit} style={{ width: "100px" }} type="primary">保存</Button>
                                                <Button onClick={this.props.closeRightBox} style={{ width: "100px", marginLeft: "20px" }}>取消</Button>
                                            </Col>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </div>
                    </div>)}
                    {this.state.isShowTaskmodal &&<PlanTaskModal modalVisible={this.state.isShowTaskmodal} handleCancel={this.closeTaskModal.bind(this)}/>}
            </div>
        )
    }
}
BasicInfo = Form.create()(BasicInfo)
