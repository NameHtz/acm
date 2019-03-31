import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import intl from 'react-intl-universal'
import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
class MenuInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                modeCode: 1,
                wfCode: 1,
                wfName: 1,
                wfUrl: 1,
                wfEvents: 1,
                formModeCode: 1,
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
        alert(1)
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.curdCurrentData({
                    title: localStorage.getItem('name'),
                    status: 'update',
                    data: values
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
                        <Form onSubmit={this.handleSubmit} className={style.mainScorll}>
                            <div className={style.content}>
                                <Row  type="flex">
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.wfbusiness.modecode')} {...formItemLayout}>
                                            {getFieldDecorator('modeCode', {
                                                initialValue: this.state.info.modeCode,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.wfbusiness.modecode'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.wfbusiness.wfcode')} {...formItemLayout}>
                                            {getFieldDecorator('wfCode', {
                                                initialValue: this.state.info.wfCode,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.wfbusiness.wfcode'),
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.wfbusiness.wfname')} {...formItemLayout}>
                                            {getFieldDecorator('wfName', {
                                                initialValue: this.state.info.wfName,
                                                rules: [],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.wfbusiness.wfurl')} {...formItemLayout}>
                                            {getFieldDecorator('wfUrl', {
                                                initialValue: this.state.info.wfUrl,
                                                rules: [],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.wfbusiness.wfevents')} {...formItemLayout}>
                                            {getFieldDecorator('wfEvents', {
                                                initialValue: this.state.info.wfEvents,
                                                rules: [],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.sys.wfbusiness.formmodecode')} {...formItemLayout}>
                                            {getFieldDecorator('formModeCode', {
                                                initialValue: this.state.info.formModeCode,
                                                rules: [],
                                            })(
                                                <Input />
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
                    </div>}
            </div>
        )
    }
}
const WfbusinessBasicInfos = Form.create()(MenuInfo);

export default connect(null, {
    curdCurrentData
})(WfbusinessBasicInfos);
// {
//     "wsd.i18n.sys.wfbusiness.modecode": "模块代码",
//         "wsd.i18n.sys.wfbusiness.wfcode": "业务代码",
//             "wsd.i18n.sys.wfbusiness.wfname": "业务名称",
//                 "wsd.i18n.sys.wfbusiness.wfurl": "表单地址",
//                     "wsd.i18n.sys.wfbusiness.wfevents": "流程事件",
//                         "wsd.i18n.sys.wfbusiness.formmodecode": "表单模块代码",
//     }
