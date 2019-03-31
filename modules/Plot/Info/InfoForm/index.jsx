import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker,TreeSelect,InputNumber } from 'antd';

import { connect } from 'react-redux'
import moment from 'moment';

import axios from "../../../../api/axios"
import { getproInfo, orgTree,getUserByOrgId ,updateproInfo} from "../../../../api/api"
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class MenuInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userlist:[],
            orglist:[],
            info: {
       
            }
        }
      
    }
    //获取责任人主体、
    getOrgAndUser=()=>{
        axios.get(orgTree).then(res=>{
            console.log(res.data.data)
            this.setState({
                orglist: res.data.data
            },()=>{
                this.getUser(this.state.info.org.id)
            })
        })
    }
    //责任人
    getUser=(id)=>{
        axios.get(getUserByOrgId(id)).then(res=>{
            console.log(res.data.data)
            this.setState({
                userlist:res.data.data
            })
        })
    }
    //获取列表
    intilData = () => {
      
        axios.get(getproInfo(this.props.data.id)).then(res => {
            console.log(res.data.data)
           this.setState({
               info:res.data.data
           },()=>{
               this.getOrgAndUser()
           })
        })
    }
    componentDidMount() {
        this.intilData()
    }

    //选择责任主体联动责任人
    onTreeChange=(v)=>{
       const {info}=this.state
       info.user=null
        this.setState({
            info:info
        },()=>{
            this.getUser(v)
        })
        
    }
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
             
                let data={
                    ...values,
                    id:this.props.data.id,
                    parentId:this.state.info.parent.id
                }
                console.log(data)
                axios.put(updateproInfo,data,true).then(res=>{
                    console.log(res)
                    this.props.updateSuccess(res.data.data)
                })
            }
        });
    }

    render() {
        const { intl } = this.props.currentLocale
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

                <div className={style.mainHeight}>
                    <h3 className={style.listTitle}>基本信息</h3>
                    <div className={style.mainScorll}>


                        <Form onSubmit={this.handleSubmit} className={style.content}>
                            <div >
                                <Row type="flex">
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.projectname')} {...formItemLayout}>
                                            {getFieldDecorator('name', {
                                                initialValue: this.state.info.name,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.projectname'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.projectcode')} {...formItemLayout}>
                                            {getFieldDecorator('code', {
                                                initialValue: this.state.info.code,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.projectcode'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row >
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.starttime')} {...formItemLayout}>
                                            {getFieldDecorator('planStartTime', {
                                                initialValue: this.state.info.planStartTime ? moment(this.state.info.planStartTime.substr(0, 10), 'YYYY-MM-DD') : null,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.starttime'),
                                                }],
                                            })(
                                                <DatePicker style={{ width: "100%" }} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="计划完成时间" {...formItemLayout}>
                                            {getFieldDecorator('planEndTime', {
                                                initialValue: this.state.info.planEndTime ? moment(this.state.info.planEndTime.substr(0, 10), 'YYYY-MM-DD') : null,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.endtime'),
                                                }],
                                            })(
                                                <DatePicker style={{ width: "100%" }} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.plandrtn')} {...formItemLayout}>
                                            {getFieldDecorator('totalDrtn', {
                                                initialValue: this.state.info.totalDrtn,
                                                rules: [],
                                            })(
                                                <InputNumber placeholder="请填写预期工期" style={{width:"100%"}}/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="项目投资额(元)" {...formItemLayout}>
                                            {getFieldDecorator('totalBudget', {
                                                initialValue: this.state.info.totalBudget,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.plantotalcost'),
                                                }],
                                            })(
                                                <InputNumber placeholder="请填写投资额" style={{width:"100%"}}/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label="项目概算(元)" {...formItemLayout}>
                                            {getFieldDecorator('projectEstimate', {
                                                initialValue: this.state.info.projectEstimate,
                                                rules: [],
                                            })(
                                                <InputNumber placeholder="请填写项目概算金额" style={{width:"100%"}}/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="项目预算(元)" {...formItemLayout}>
                                            {getFieldDecorator('projectBudget', {
                                                initialValue: this.state.info.projectBudget,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.plantotalcost'),
                                                }],
                                            })(
                                                <InputNumber placeholder="请填写项目概算金额" style={{width:"100%"}}/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >

                                    <Col span={12}>
                                        <Form.Item label="建设规模" {...formItemLayout}>
                                            {getFieldDecorator('scale', {
                                                initialValue: this.state.info.scale,
                                                rules: [],
                                            })(
                                                <Input placeholder="请填写建设规模" />
                                            )}
                                        </Form.Item>
                                    </Col>                                               <Col span={12}>
                                        <Form.Item label="项目地点" {...formItemLayout}>
                                            {getFieldDecorator('address', {
                                                initialValue: this.state.info.address,
                                                rules: [],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.iptname')} {...formItemLayout}>
                                            {getFieldDecorator('orgId', {
                                                initialValue: this.state.info.org ? this.state.info.org.id : null,
                                                rules: [],
                                            })(
                                                <TreeSelect
                                                    showSearch
                                                    style={{ width: "100%" }}

                                                    treeData={this.state.orglist}

                                                   
                                                    // allowClear
                                                    treeDefaultExpandAll
                                                    onChange={this.onTreeChange}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.username')} {...formItemLayout}>
                                            {getFieldDecorator('userId', {
                                                initialValue: this.state.info.user ? this.state.info.user.id : null,
                                                rules: [],
                                            })(
                                                <Select ref={this.textInput}>
                                                    {this.state.userlist.map(item=>{
                                                        return <Option key={item.id} value={item.id}>{item.title}</Option>
                                                    })}
                                                </Select>

                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row >
                                    <Col span={12}>
                                        <Form.Item label="状态" {...formItemLayout}>
                                            {getFieldDecorator('status', {
                                                initialValue: this.state.info.status?this.state.info.status.id:null,
                                                rules: [],
                                            })(
                                                <Select>
                                                    <Option value="active">激活</Option>
                                                    <Option value="unactive">未激活</Option>
                                                </Select>
                                             
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.base.planTem.creator')} {...formItemLayout}>
                                            {getFieldDecorator('creator', {
                                                initialValue: this.state.info.creator? this.state.info.creator.name:null,
                                                rules: [],
                                            })(
                                                <Input disabled/>
                                            )}
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label="创建日期" {...formItemLayout}>
                                            {getFieldDecorator('creatTime', {
                                                initialValue:this.state.info.creatTime ? moment(this.state.info.creatTime.substr(0, 10), 'YYYY-MM-DD') : null,
                                                rules: [],
                                            })(
                                                <DatePicker style={{ width: "100%" }} disabled/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.epsname')} {...formItemLayout}>
                                            {getFieldDecorator('parentId', {
                                                initialValue: this.state.info.parent? this.state.info.parent.name:null,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.epsname'),
                                                }],
                                            })(
                                                <Input disabled/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.projecttarget')} {...formItemLayout1}>
                                            {getFieldDecorator('projectTarget', {
                                                initialValue: this.state.info.projectTarget,
                                                rules: [],
                                            })(
                                                <TextArea rows={2} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.project.projectpurpose')} {...formItemLayout1}>
                                            {getFieldDecorator('projectOverview', {
                                                initialValue: this.state.info.projectOverview,
                                                rules: [],
                                            })(
                                                <TextArea rows={2} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item label="备注" {...formItemLayout1}>
                                            {getFieldDecorator('remark', {
                                                initialValue: this.state.info.remark,
                                                rules: [],
                                            })(
                                                <TextArea rows={2} />
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
            </div>
        )
    }
}
const MenuInfos = Form.create()(MenuInfo);
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {

    })(MenuInfos);
