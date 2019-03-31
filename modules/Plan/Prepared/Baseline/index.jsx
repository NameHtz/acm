import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import intl from 'react-intl-universal'
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
class PlanPreparedBaseline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                baselineName: 'ACM产品开发项目',
                baselineCode: 'ZGYF',
                orgname: '研发部',
                userName: '孙博宇',
                startBaseline: '2018-11-02',
                endBaseline: '2018-12-02'
            }
        }
    }

    componentDidMount() {
        this.loadLocales();
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        })
            .then(() => {
                this.setState({
                    initDone: true
                });
            });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
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
        return (
            <div className={style.main}>
                <h3 className={style.listTitle}>进度基线</h3>
                <Form>
                    <div className={style.content}>
                        <Row gutter={24} type="flex">
                            <Col span={12}>
                                <Form.Item label={intl.get('wsd.i18n.plan.baseline.baselinename')} {...formItemLayout}>
                                    {getFieldDecorator('baselineName', {
                                        initialValue: this.state.info.baselineName,
                                        rules: [],
                                    })(
                                        <Input disabled={true} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="代码" {...formItemLayout}>
                                    {getFieldDecorator('baselineCode', {
                                        initialValue: this.state.info.baselineCode,
                                        rules: [],
                                    })(
                                        <Input disabled={true} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24} type="flex">
                            <Col span={12}>
                                <Form.Item label="基线责任主体" {...formItemLayout}>
                                    {getFieldDecorator('orgname', {
                                        initialValue: this.state.info.orgname,
                                        rules: [],
                                    })(
                                        <Input disabled={true} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="基线责任人" {...formItemLayout}>
                                    {getFieldDecorator('userName', {
                                        initialValue: this.state.info.userName,
                                        rules: [],
                                    })(
                                        <Input disabled={true} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24} type="flex">
                            <Col span={12}>
                                <Form.Item label="基线开始" {...formItemLayout}>
                                    {getFieldDecorator('startBaseline', {
                                        initialValue: this.state.info.startBaseline,
                                        rules: [],
                                    })(
                                        <Input disabled={true} />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="基线完成" {...formItemLayout}>
                                    {getFieldDecorator('endBaseline', {
                                        initialValue: this.state.info.endBaseline,
                                        rules: [],
                                    })(
                                        <Input disabled={true} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        )
    }
}
const PlanPreparedBaselines = Form.create()(PlanPreparedBaseline);
export default PlanPreparedBaselines