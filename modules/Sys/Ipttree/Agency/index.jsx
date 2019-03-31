import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker ,InputNumber} from 'antd';


import { connect } from 'react-redux'


//接口引入
import axios from '../../../../api/axios';
import { iptUpdate ,iptInfo} from '../../../../api/api'

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
class AgencyInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
         
            info: {}
        }
    }

    componentDidMount() {
     
        axios.get(iptInfo(this.props.data.id)).then(res=>{
            console.log(res)
            this.setState({
                info: res.data.data
            })
        })
    }

 

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            const data = {
                ...values,
                id: this.state.info.id,
                iptName: values.iptName,
                iptCode: values.iptCode,
                parentId: values.parentId,
                remark: values.remark,
                level: values.level == "一级" ? 1 : 2 || values.level,
                sort: values.sort,

            };
            //   console.log(data);           
            if (!err) {
                //updata保存接口
                axios.put(iptUpdate, data, true).then(res => {
                    console.log("修改成功" + res);
                    const data = {
                        ...this.props.data,
                        ...values,
                    };
                    // this.props.closeRightBox();
                    this.props.updateSuccess(data);
                    this.props.form.resetFields()


                })
            }



        });
    }

    render() {
        const { intl } = this.props.currentLocale
        //用于数据的交互反馈
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        //表单布局
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
                            <Form onSubmit={this.handleSubmit} >
                                <div className={style.content}>
                                    <Row type="flex">
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.sys.menu.menuname')} {...formItemLayout}>
                                                {getFieldDecorator('iptName', {
                                                    initialValue: this.state.info.iptName,//子节点初始值
                                                    //校验规则
                                                    rules: [{
                                                        required: true,//是否必选
                                                        //校检文案
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.menu.menuname'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.sys.ipt.iptcodej')} {...formItemLayout}>
                                                {getFieldDecorator('iptCode', {
                                                    initialValue: this.state.info.iptCode,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.iptcodej'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.sys.ipt.parentipt')} {...formItemLayout}>
                                                {getFieldDecorator('parentId', {
                                                    initialValue: this.state.info.parent?  this.state.info.parent.name:null,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.parentipt'),
                                                    }],
                                                })(
                                                    <Input disabled />
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.sys.ipt.level')} {...formItemLayout}>
                                                {getFieldDecorator('level', {
                                                    initialValue: this.state.info.level? this.state.info.level.code:null,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.level'),
                                                    }],
                                                })(
                                                    <Select>
                                                        <Option value="1">{intl.get('wsd.i18n.sys.ipt.levelone')}</Option>
                                                        <Option value="2">{intl.get('wsd.i18n.sys.ipt.leveltwo')}</Option>
                                                        {/* <Option value="3">{intl.get('wsd.i18n.sys.ipt.levelthree')}</Option> */}
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row >


                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.sys.ipt.sortnum')} {...formItemLayout}>
                                                {getFieldDecorator('sort', {
                                                    initialValue: this.state.info.sort,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.sortnum'),
                                                    }],
                                                })(
                                                    <InputNumber  style={{width:"100%"}} />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={24}>
                                            <Form.Item label={intl.get('wsd.i18n.sys.ipt.remark')} {...formItemLayout1}>
                                                {getFieldDecorator('remark', {
                                                    initialValue: this.state.info.remark,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.remark'),
                                                    }],
                                                })(
                                                    <TextArea />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item wrapperCol={{ offset: 4 }}>
                                        <Button className="globalBtn" onClick={this.handleSubmit} style={{ marginRight: 20 }}
                                            type="primary">保存</Button>
                                        <Button className="globalBtn" onClick={this.props.closeRightBox}>取消</Button>
                                    </Form.Item>
                                </div>

                            </Form>
                        </div>

                    </div>
                
            </div>
        )
    }
}
const AgencyInfos = Form.create()(AgencyInfo);
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {
        
    })(AgencyInfos);