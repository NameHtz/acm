import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';
const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const Option = Select.Option;
class BasicdGlobaldTimeInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {}
        }
    }
    componentDidMount() {
        this.loadLocales();
        this.props.getTimeInfo()

        // 初始化字典-工时单位
        this.props.getBaseSelectTree('base.time.type')
        // 初始化字典-工期单位
        this.props.getBaseSelectTree('base.date.type')
        // 初始化字典-日期格式
        this.props.getBaseSelectTree('base.date.formate')
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            // After loading CLDR locale data, start to render
            this.setState({ initDone: true });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = {...values}
                this.props.updateSetTime(data)
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

        const initData = this.props.data
        const { selectData } = this.props

        return (
            <div className={style.main}>
                <div className={style.mainScorll}>
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            <Row >
                                <Col span={15}>
                                    <Form.Item label={intl.get('wsd.i18n.base.time.timewh')} {...formItemLayout}>
                                        {getFieldDecorator('timeUnit', {
                                            initialValue: initData.timeUnit,
                                            rules: [],
                                        })(
                                            <Select>
                                                {
                                                    selectData.timeType.map((v, i) => {
                                                        return <Option value={v.value} key={i}>{v.value}</Option>
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={15}>
                                    <Form.Item label={intl.get('wsd.i18n.base.time.timedrtn')} {...formItemLayout}>
                                        {getFieldDecorator('drtnUnit', {
                                            initialValue: initData.drtnUnit,
                                            rules: [],
                                        })(
                                            <Select>
                                                {
                                                    selectData.dateType.map((v, i) => {
                                                        return <Option value={v.value} key={i}>{v.value}</Option>
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row>
                                <Col span={15}>
                                    <Form.Item label={intl.get('wsd.i18n.base.time.timeformat')} {...formItemLayout}>
                                        {getFieldDecorator('dateFormat', {
                                            initialValue: initData.dateFormat,
                                            rules: [],
                                        })(
                                            <Select>
                                                {
                                                    selectData.dateFormate.map((v, i) => {
                                                        return <Option value={v.value} key={i}>{v.value}</Option>
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={15}>
                                    <Col span={8} offset={4}>
                                        <Button onClick={this.handleSubmit} type="primary" style={{width: 100, textAlign: 'center'}}>保存</Button>
                                    </Col>
                                </Col>
                            </Row>
                        </div>

                    </Form>
                </div>
            </div>
        )
    }
}

const BasicdGlobaldTimeInfos = Form.create()(BasicdGlobaldTimeInfo);
export default BasicdGlobaldTimeInfos