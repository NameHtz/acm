import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Checkbox, Select, DatePicker } from 'antd';
import intl from 'react-intl-universal'
import emitter from '../../../../api/ev';
import moment from 'moment';
import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
class MenuInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                projectName: "智能住宅示范项目",
                projectCode: "ZGYS",
                creatTime: null,
                creator: "WSD",
                iptName: "WSD",
                categoryCode: "ZYWS12332353444",
                calnId: 1,
                remark: "暂无",
            }
        }
    }

    componentDidMount() {
        this.loadLocales();
        console.log('加载')
        this.setState({
            width: this.props.width,
            // info: this.props.data
        })

    }

    loadLocales() {
        intl.init({
            currentLocale: this.props.currentLocale.currentLocale,
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
                this.props.curdCurrentData({
                    title: localStorage.getItem('name'),
                    status: 'update',
                    data: data
                })
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
                        <h3 className={style.listTitle}>基本信息</h3>
                        <div className={style.mainScorll}>
                        <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                                <Row type="flex">
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.epsInfo.projectname')} {...formItemLayout}>
                                            {getFieldDecorator('projectName', {
                                                initialValue: this.state.info.projectName,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.epsInfo.projectname'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.pre.epsInfo.projectcode')} {...formItemLayout}>
                                            {getFieldDecorator('projectCode', {
                                                initialValue: this.state.info.projectCode,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.epsInfo.projectcode'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={12}>
                                        <Form.Item label="存放位置" {...formItemLayout}>
                                            {getFieldDecorator('iptName', {
                                                initialValue: this.state.info.iptName,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.pre.epsInfo.iptname'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.plan.wfbizinfo.projectname')} {...formItemLayout}>
                                            {getFieldDecorator('username', {
                                                initialValue: this.state.info.username,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.wfbizinfo.projectname'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >

                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.menu.menutype')} {...formItemLayout}>
                                            {getFieldDecorator('creator', {
                                                initialValue: this.state.info.creator,
                                                rules: [],
                                            })(
                                                <Select>
                                                <Option value="模块">模块</Option>
                                            </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                 
                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.plan.activitydefine.remark')} {...formItemLayout1}>
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
const MenuInfos = Form.create()(MenuInfo);
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {
    curdCurrentData
})(MenuInfos);