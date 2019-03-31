import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import intl from 'react-intl-universal'
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const Option = Select.Option;
class VariableSet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                projectName: "智能住宅示范项目",
                projectCode: "ZADS",
                epsName: "三一集团",
                category: "ZASDF234533",
                startTime: null,
                endTime: null,
                planDrtn: "",
                planTotalCost: "",
                iptName: "WSD",
                userName: "刘宽",
                address: "南京空巷新城",
                projectTarget: "暂无",
                projectPurpose: "暂无",
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
                {this.state.initDone &&
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>变量设置</h3>
                        <div className={style.mainScorll}>
                        <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                                <Row >
                                    <Col span={12}>
                                        <Form.Item label="日历" {...formItemLayout}>
                                            {getFieldDecorator('projectName', {
                                                initialValue: this.state.info.projectName,
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
                                        <Form.Item label="时间格式" {...formItemLayout}>
                                            {getFieldDecorator('projectCode', {
                                                initialValue: this.state.info.projectCode,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.projectcode'),
                                                }],
                                            })(
                                                <Select>
                                                <Option value="ZASDF234533">ZASDF234533</Option>
                                                <Option value="ZASDF234533">ZASDF234533</Option>
                                                <Option value="ZASDF234533">ZASDF234533</Option>
                                            </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >                                                        <Col span={12}>
                                    <Form.Item label="工期类型" {...formItemLayout}>
                                        {getFieldDecorator('epsName', {
                                            initialValue: this.state.info.epsName,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.epsname'),
                                            }],
                                        })(
                                            <Select>
                                                <Option value="三一集团">三一集团</Option>
                                                <Option value="三一集团">三一集团</Option>
                                                <Option value="三一集团">三一集团</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                    <Col span={12}>
                                        <Form.Item label="工时单位" {...formItemLayout}>
                                            {getFieldDecorator('category', {
                                                initialValue: this.state.info.category,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.category'),
                                                }],
                                            })(
                                                <Select>
                                                    <Option value="ZASDF234533">ZASDF234533</Option>
                                                    <Option value="ZASDF234533">ZASDF234533</Option>
                                                    <Option value="ZASDF234533">ZASDF234533</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >                                                                     <Col span={12}>
                                    <Form.Item label="关键路径" {...formItemLayout}>
                                        {getFieldDecorator('startTime', {
                                            initialValue: this.state.info.startTime,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.starttime'),
                                            }],
                                        })(
                                            <Select>
                                                    <Option value="ZASDF234533">ZASDF234533</Option>
                                                    <Option value="ZASDF234533">ZASDF234533</Option>
                                                    <Option value="ZASDF234533">ZASDF234533</Option>
                                                </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                    <Col span={12}>
                                        <Form.Item label="币种" {...formItemLayout}>
                                            {getFieldDecorator('endTime', {
                                                initialValue: this.state.info.endTime,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.project.endtime'),
                                                }],
                                            })(
                                                <Select>
                                                    <Option value="ZASDF234533">ZASDF234533</Option>
                                                    <Option value="ZASDF234533">ZASDF234533</Option>
                                                    <Option value="ZASDF234533">ZASDF234533</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >                                                        <Col span={12}>
                                    <Form.Item label="总浮时" {...formItemLayout}>
                                        {getFieldDecorator('planDrtn', {
                                            initialValue: this.state.info.planDrtn,
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
                                            <Button onClick={this.handleSubmit} style={{width:"100px"}} type="primary">保存</Button>
                                            <Button onClick={this.props.closeRightBox} style={{width:"100px",marginLeft:"20px"}}>取消</Button>
                                        </Col>
                                    </Col>
                                </Row>
                            </div>

                        </Form>
                        </div>
                    </div>}
            </div>
        )
    }
}
const VariableSets = Form.create()(VariableSet);
export default VariableSets
// {
//             "wsd.i18n.pre.project.projectname":"项目名称",
//             "wsd.i18n.pre.project.projectcode":"项目代码",
//             "wsd.i18n.pre.project.epsname":"所属项目群",
//             "wsd.i18n.pre.project.category":"分类码",
//             "wsd.i18n.pre.project.starttime":"计划开始时间",
//             "wsd.i18n.pre.project.endtime":"计划结束时间",
//             "wsd.i18n.pre.project.plandrtn":"预计工期",
//             "wsd.i18n.pre.project.plantotalcost":"项目投资额",
//             "wsd.i18n.pre.project.iptname":"责任主体",
//             "wsd.i18n.pre.project.username":"责任人",
//             "wsd.i18n.pre.project.address":"项目地址",
//             "wsd.i18n.pre.project.projecttarget":"项目目标",
//             "wsd.i18n.pre.project.projectpurpose":"项目概况",

//     }