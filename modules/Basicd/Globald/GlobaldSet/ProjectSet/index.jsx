import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Switch, Select, DatePicker } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';
const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const Option = Select.Option;
class ProjectSet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {}
        }
    }

    componentDidMount() {
        this.loadLocales();
        this.props.getProjectInfo()
        // 初始化字典-工期类型
        this.props.getBaseSelectTree('plan.project.taskdrtntype')
        // 初始化字典-关键路径
        this.props.getBaseSelectTree('plan.project.cpmtype')
    }

    // 国际化
    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            // After loading CLDR locale data, start to render
            this.setState({ initDone: true });
        });
    }

    // 提交数据
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = {
                    ...values,
                    enableProjectTeam: values.enableProjectTeam ? 1 : 0,
                    shareWbs: values.shareWbs ? 1 : 0,
                    message: values.message ? 1 : 0
                }
                this.props.updateSetProject(data)
            }
        });
    }

    // 初始化渲染
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
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
            wrapperCol: {
                xs: { span: 22 },
                sm: { span: 10 },
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
                                    <Form.Item label="工期类型" {...formItemLayout}>
                                        {getFieldDecorator('taskDrtnType', {
                                            initialValue: initData.taskDrtnType,
                                            rules: [],
                                        })(
                                            <Select>
                                                {
                                                    selectData.taskDrtnType.map((v, i) => {
                                                        return <Option value={v.value} key={i}>{v.value}</Option>
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={9}>
                                    <Form.Item label="启用项目管理团队" {...formItemLayout2}>
                                        {getFieldDecorator('enableProjectTeam', {
                                            initialValue: initData.enableProjectTeam == 1 ? true : false,
                                            valuePropName: 'checked',
                                        })(
                                            <Switch checkedChildren="开" unCheckedChildren="关" />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={15}>
                                    <Form.Item label="关键路径" {...formItemLayout}>
                                        {getFieldDecorator('cpmType', {
                                            initialValue: initData.cpmType,
                                            rules: [],
                                        })(
                                            <Select>
                                                {
                                                    selectData.cpmType.map((v, i) => {
                                                        return <Option value={v.value} key={i}>{v.value}</Option>
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={9}>
                                    <Form.Item label="启用WBS内部共享" {...formItemLayout2}>
                                        {getFieldDecorator('shareWbs', {
                                            initialValue: initData.shareWbs == 1 ? true : false,
                                            valuePropName: 'checked',
                                        })(
                                            <Switch checkedChildren="开" unCheckedChildren="关" />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={15}>
                                    <Form.Item label="总浮时<=" {...formItemLayout}>
                                        {getFieldDecorator('cpmFloat', {
                                            initialValue: initData.cpmFloat,
                                            rules: [],
                                        })(
                                            <Input type="number" />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={9}>
                                    <Form.Item label="启用消息推送" {...formItemLayout2}>
                                        {getFieldDecorator('message', {
                                             initialValue: initData.message == 1 ? true : false,
                                             valuePropName: 'checked',
                                        })(
                                            <Switch checkedChildren="开" unCheckedChildren="关" />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={15}>
                                    <Col span={8} offset={4}>
                                        <Button onClick={this.handleSubmit} type="primary">更新设置</Button>
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

const ProjectSets = Form.create()(ProjectSet);
export default ProjectSets