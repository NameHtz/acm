import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';

const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class MenuInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible: true,
            info: {
                fileName: '项目计划模块增加逻辑关系验证功能',
                fileVersion: '技术问题',
                plandelvnum: '高',
                delvtype: '研发部',
                completestatus: '孙博宇',
                completetime: '2018-12-02',
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
    showModal = () => {
        this.setState({
            visible: true,
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
                    <Modal title="新增项目问题" visible={this.props.visible}
                        onCancel={this.props.handleCancel}
                        okText="确定"
                        cancelText="取消"
                        width="800px"
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>保存并继续</Button>,
                            <Button key="submit" type="primary" onClick={this.handleSubmit}>
                                保存
                            </Button>,
                        ]}
                    >
                        <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                                <Row type="flex">
                                    <Col span={12}>
                                        <Form.Item label="问题标题" {...formItemLayout}>
                                            {getFieldDecorator('delvname', {
                                                initialValue: this.state.info.fileName,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + "问题标题",
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="问题类型" {...formItemLayout}>
                                            {getFieldDecorator('delvcode', {
                                                initialValue: this.state.info.fileVersion,
                                                rules: [],
                                            })(
                                                <Select>
                                                    <Option value="技术问题">技术问题</Option>
                                                    <Option value="技术问题">技术问题</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>                                                                     <Col span={12}>
                                    <Form.Item label="优先级" {...formItemLayout}>
                                        {getFieldDecorator('plandelvnum', {
                                            initialValue: this.state.info.plandelvnum,
                                            rules: [],
                                        })(
                                            <Select>
                                                <Option value="高">高</Option>
                                                <Option value="中">中</Option>
                                                <Option value="底">底</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                    <Col span={12}>
                                        <Form.Item label="责任主体" {...formItemLayout}>
                                            {getFieldDecorator('delvtype', {
                                                initialValue: this.state.info.delvtype,
                                                rules: [],
                                            })(
                                                <Select>
                                                    <Option value="研发部">研发部</Option>
                                                    <Option value="人事部">人事部</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="责任人" {...formItemLayout}>
                                            {getFieldDecorator('completestatus', {
                                                initialValue: this.state.info.completestatus,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + "责任人",
                                                }],
                                            })(
                                                <Select>
                                                    <Option value="孙博宇">孙博宇</Option>
                                                    <Option value="马克华菲">马克华菲</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="要求处理日期" {...formItemLayout}>
                                            {getFieldDecorator('completetime', {
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + "要求处理日期",
                                                }],
                                            })(
                                                <DatePicker style={{ width: "100%" }} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>

                            </div>

                        </Form>
                    </Modal>
                }
            </div>
        )
    }
}
const MenuInfos = Form.create()(MenuInfo);
export default MenuInfos
// {
//               "wsd.i18n.plan.fileinfo.filename" : "文件名称",
//             "wsd.i18n.plan.fileinfo.fileversion" : "版本号",
//             "wsd.i18n.plan.fileinfo.creattime" : "创建时间",
//             "wsd.i18n.plan.fileinfo.creator" : "创建人",
//             "wsd.i18n.plan.fileinfo.remark" : "备注",
//     }