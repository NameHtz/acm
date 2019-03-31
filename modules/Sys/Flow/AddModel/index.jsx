import React, { Component } from 'react'
import { Modal, Form, Row, Col, Input,  Select,Button} from 'antd';
import intl from 'react-intl-universal'
import emitter from '../../../../api/ev'
import style from './style.less'
import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

const { TextArea } = Input;
const FormItem = Form.Item;
export class SysFlowAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
          
            info: {
                bizModule:1,
                categoryType:1,
                planlevel:1,
                wfTitle:1,
                projectName:1,
                iptName:1,
                category:1,
            },
            initDone: false,
        }
    }

    componentDidMount() {
        this.loadLocales();
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
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
              sm: { span: 16},
            },
        }; 
        const formLayout = {
            labelCol: {
                sm: { span:4 },
              },
              wrapperCol: {
                sm: { span: 20},
              },
        }
        return (
            <div >
                {this.state.initDone && (
                    <Modal className={style.main}
                        width="850px" 
                        okText="确定"
                        cancelText="取消"
                           footer={<div className="modalbtn">
                             <Button key={1} onClick={this.props.onCancel}>取消</Button>
                             <Button key={2} onClick={this.handleSubmit} type="primary">保存</Button>
                           </div>}
                        // forceRender={true} 
                        centered={true} 
                        title={this.props.title} 
                        visible={this.props.addShow} 
                        onCancel={this.props.onCancel}>
                    <Form onSubmit={this.handleSubmit}>
                    <div className={style.content}>
                        <Row  type="flex">
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.plan.wfbizinfo.bizmodule')} {...formItemLayout}>
                                        {getFieldDecorator('bizmodule', {
                                            initialValue: this.state.info.bizmodule,
                                            rules: [{
                                                // required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.wfbizvar.bizmodule'),
                                            }],
                                        })(
                                            <Select>
                                                <Option value="模块1">模块1</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.plan.wfbizinfo.wftitle')} {...formItemLayout}>
                                        {getFieldDecorator('wftitle', {
                                            initialValue: this.state.info.wftitle,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.wfbizvar.wftitle'),
                                            }],
                                        })(
                                            <Select>
                                                <Option value="模块1">模块1</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                                                                   
                                    <Col span={12}>
                                    <Form.Item label={intl.get('wsd.i18n.plan.wfbizinfo.categorytype')} {...formItemLayout}>
                                        {getFieldDecorator('categorytype', {
                                            initialValue: this.state.info.categorytype,
                                            rules: [{
                                                // required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.wfbizvar.categorytype'),
                                            }],
                                        })(
                                            <Select>
                                                <Option value="模块1">模块1</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                               
                                                                              
                                <Col span={24}>
                                    <Form.Item label={intl.get('wsd.i18n.plan.wfbizinfo.projectname')} {...formLayout}>
                                        {getFieldDecorator('projectname', {
                                            initialValue: this.state.info.projectname,
                                            rules: [{
                                                // required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.wfbizvar.projectname'),
                                            }],
                                        })(
                                            <TextArea />
                                        )}
                                    </Form.Item>
                                </Col>
                                 <Col span={24}>
                                    <Form.Item label={intl.get('wsd.i18n.plan.wfbizinfo.iptname')} {...formLayout}>
                                        {getFieldDecorator('iptname', {
                                            initialValue: this.state.info.iptname,
                                            rules: [{
                                                // required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.wfbizvar.iptname'),
                                            }],
                                        })(
                                            <TextArea />
                                        )}
                                    </Form.Item>
                                </Col>
                                    <Col span={24}>
                                        <Form.Item label={intl.get('wsd.i18n.plan.wfbizinfo.category')} {...formLayout}>
                                            {getFieldDecorator('category', {
                                                initialValue: this.state.info.category,
                                                rules: [{
                                                    // required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.wfbizvar.category'),
                                                }],
                                            })(
                                                <TextArea />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={20} offset={4} className={style.tip}>选择项目或者部门后分类码将不起作用</Col>
                                </Row>                         
                            </div>
                        </Form>
                        
                    </Modal>
                )}
            </div>
        )
    }
}
const SysFlowAdds = Form.create()(SysFlowAdd);
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {
    curdCurrentData
})(SysFlowAdds);
