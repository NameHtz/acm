import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Select, Modal } from 'antd';
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
class AddSameLevel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible: true,
            info: {
                key:1,
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
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        this.props.handleCancel()
    }
    handleCancel = (e) => {
      
        this.setState({
            visible: false,
        });
        this.props.handleCancel()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.curdCurrentData({
                    title: localStorage.getItem('name'),
                    status: 'add',
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
                    <Modal title={this.props.title} visible={this.props.visible}
                        onOk={this.handleOk} onCancel={this.props.handleCancel}
                        okText="确定"
                        cancelText="取消"
                        width="800px"
                        footer={ 
                            <div className="modalbtn">
                            <Button key={2}  onClick={this.handleSubmit} type="primary" ghost>保存</Button>
                            <Button key={3} onClick={this.handleSubmit} type="primary">保存并继续</Button>
                            </div>
                        }
                    >
                         <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                                <Row type="flex">
                                    <Col span={12}>
                                        <Form.Item label={intl.get('wsd.i18n.base.docTem.doctitle')} {...formItemLayout}>
                                            {getFieldDecorator('projectName', {
                                                initialValue: this.state.info.projectName,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.docTem.doctitle'),
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
                                        <Form.Item label={intl.get('wsd.i18n.plan.wfbizinfo.projectname')} {...formItemLayout}>
                                            {getFieldDecorator('username', {
                                                initialValue: this.state.info.username,
                                                rules: [],
                                            })(
                                                <Input disabled/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    
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
                                </Row>
                            </div>

                        </Form>
                    </Modal>
                }
            </div>
        )
    }
}
const AddSameLevels = Form.create()(AddSameLevel);
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {
    curdCurrentData
})(AddSameLevels);
