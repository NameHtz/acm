import React, { Component } from 'react';
import style from './style.less';
import { Form, Tabs, Row, Col, Input, Checkbox, Button, Icon, Select, DatePicker, TreeSelect, InputNumber } from 'antd';

import intl from 'react-intl-universal';
import { getUserInfoById } from '../../../../../api/api';
import axios from "../../../../../api/axios"
import moment from 'moment';

const locales = {
    'en-US': require('../../../../../api/language/en-US.json'),
    'zh-CN': require('../../../../../api/language/zh-CN.json'),
};
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
export class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initDone: false,
            quitDate:null,
            isSetLeavedate:false,//离职日期可编辑
            userInfo: false,  // 控制点击用户信息的显隐
            
        };
        this.textInput = React.createRef();
    }

    componentDidMount() {
        this.loadLocales();
        axios.get("api/base/dict/comm.secutylevel/select/tree").then(res => {
            console.log(res)
            this.setState({
                secutylevellist: res.data.data
            })
        })
        axios.get("api/base/dict/sys.user.cardtype/select/tree").then(res => {
            this.setState({
                cardtypelist: res.data.data
            })
        })
        axios.get("api/sys/org/select/tree").then(res => {
            this.setState({
                orglist: res.data.data
            }, () => {
                axios.get("api/sys/role/list").then(res => {
                    this.setState({
                        rolelist: res.data.data
                    })
                })
            })
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
    //在岗状态处理
    changeStatus=(v)=>{
        console.log(this.textInput.current)
        if(v==1){
            this.setState({
                quitDate:null,
                isSetLeavedate:true 
            })
        }else{
            this.setState({
                isSetLeavedate:false
            })
        }
    }
    //取消关闭
    closeModal = () => {
        this.props.form.resetFields();
        this.props.closeBasicModal()
    }
    // 表单提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values)
                axios.post("api/sys/user/add", values,true).then(res => {
                    console.log(res.data.data)
                    console.log(this.props)
                    this.props.form.resetFields();
                    this.props.closeBasicModal()
                    this.props.addBasicUser(res.data.data)
                })
            }
        });
    };



    render() {

        console.log(this.state.info)
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
                sm: { span: 4 },
            },
            wrapperCol: {
                sm: { span: 20 },
            },
        };
        return (
            <div className={style.main}>
                {this.state.initDone && <div className={style.mainHeight}>
                
                    <div className={style.mainScorll}>

                        <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.user1.name')} {...formItemLayout}>
                                            {getFieldDecorator('actuName', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.name'),
                                                }],
                                            })(
                                                <Input />,
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.user.actuName')} {...formItemLayout}>
                                            {getFieldDecorator('userName', {

                                                rules: [],
                                            })(
                                                <Input />,
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            label={intl.get('wsd.i18n.sys.user1.actuname')} {...formItemLayout}>
                                            {getFieldDecorator('roles', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.actuname'),
                                                }],
                                            })(
                                                <Select mode="multiple" >
                                                    {this.state.rolelist && this.state.rolelist.map(item => {
                                                        return <Option value={item.id} key={id}>{item.roleDesc}</Option>
                                                    })}
                                                </Select>,
                                            )}

                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={intl.get('wsd.i18n.sys.user1.userlevel')} {...formItemLayout}>
                                            {getFieldDecorator('level', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.userlevel'),
                                                }],
                                            })(
                                                <Select>
                                                    {this.state.secutylevellist && this.state.secutylevellist.map(item => {
                                                        return <Option value={item.value} key={item.value}>{item.title}</Option>
                                                    })}
                                                </Select>
                                            )}

                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label="所属部门"
                                            {...formItemLayout}>
                                            {getFieldDecorator('orgId', {
                                                // initialValue: this.state.info.org ? this.state.info.org.id : null,
                                                rules: [],
                                            })(
                                                <TreeSelect
                                                    showSearch
                                                    style={{ width: "100%" }}

                                                    treeData={this.state.orglist}


                                                    allowClear
                                                    treeDefaultExpandAll
                                                    onChange={this.onChange}
                                                />

                                            )}

                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.user.sortNum')} {...formItemLayout}>
                                            {getFieldDecorator('sort', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user.sortNum'),
                                                }],
                                            })(
                                                <InputNumber style={{ width: "100%" }} />,
                                            )}

                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.user.staffStatues')}
                                            {...formItemLayout}>
                                            {getFieldDecorator('staffStatus', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user.staffStatues'),
                                                }],
                                            })(
                                                <Select onChange={this.changeStatus} ref={this.textInput} >
                                                    <Option value={1}>在岗</Option>
                                                    <Option value={0}>离职</Option>
                                                </Select>,
                                            )}

                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.user1.phone')} {...formItemLayout}>
                                            {getFieldDecorator('phone', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.phone'),
                                                }],
                                            })(
                                                <Input />,
                                            )}

                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            label={intl.get('wsd.i18n.sys.user1.sex')} {...formItemLayout}>
                                            {getFieldDecorator('sex', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.sex'),
                                                }],
                                            })(
                                                <Select>
                                                    <Option value={1}>男</Option>
                                                    <Option value={0}>女</Option>
                                                </Select>,
                                            )}

                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.user1.birth')} {...formItemLayout}>
                                            {getFieldDecorator('birth', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.birth'),
                                                }],
                                            })(
                                                <DatePicker placeholder="" style={{ width: '100%' }} />,

                                            )}

                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            label={intl.get('wsd.i18n.sys.user1.entryDate')} {...formItemLayout}>
                                            {getFieldDecorator('entryDate', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.entryDate'),
                                                }],
                                            })(
                                                <DatePicker placeholder=""
                                                    style={{ width: '100%' }} />,
                                            )}

                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={intl.get('wsd.i18n.sys.user1.leaveDate')}{...formItemLayout}>
                                            {getFieldDecorator('quitDate', {
                                                initialValue: this.state.quitDate,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.leaveDate'),
                                                }],
                                            })(
                                                <DatePicker placeholder=""
                                                    style={{ width: '100%' }}
                                                    disabled={this.state.isSetLeavedate} />,
                                            )}

                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            label={intl.get('wsd.i18n.sys.user1.cardType')} {...formItemLayout}>
                                            {getFieldDecorator('cardType', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.cardType'),
                                                }],
                                            })(
                                                <Select>
                                                    {this.state.cardtypelist && this.state.cardtypelist.map(item => {
                                                        return <Option value={item.value} key={item.value}>{item.title}</Option>
                                                    })}
                                                </Select>
                                            )}

                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            label={intl.get('wsd.i18n.sys.user1.cardNum')} {...formItemLayout}>
                                            {getFieldDecorator('cardNum', {

                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.cardNum'),
                                                }],
                                            })(
                                                <Input />,
                                            )}

                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.user1.flag')} {...formItemLayout}>
                                            {getFieldDecorator('flag', {

                                                rules: [],
                                            })(
                                                <Checkbox></Checkbox>,
                                            )}

                                        </Form.Item>
                                    </Col>
                                </Row>



                                <Row>
                                    <Form.Item wrapperCol={{ offset: 4 }}>
                                        <Button className="globalBtn" onClick={this.handleSubmit} style={{ marginRight: 20 }}
                                            type="primary">保存</Button>
                                        <Button className="globalBtn" onClick={this.closeModal}>取消</Button>
                                    </Form.Item>
                                </Row>


                            </div>
                        </Form>

                    </div>
                </div>
                }
            </div>
        );
    }
}

const UserInfos = Form.create()(UserInfo);
export default UserInfos
