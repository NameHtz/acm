import React, { Component } from 'react'
import style from './style.less'
import emitter from '../../../../api/ev';
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, message } from 'antd';
import intl from 'react-intl-universal'
import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'

import { roleUpdate2, getRoleInfoById } from '../../../../api/api';
import axios from '../../../../api/axios';

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const { TextArea } = Input;
class MenuInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {}
        }
    }

    getData = (id) => {
        axios.get(getRoleInfoById(id)).then(res => {
            this.setState({
                info: res.data.data,
            });
        });
    };

    componentDidMount() {
        this.loadLocales();
        this.props.data ? this.getData(this.props.data.id) : null;
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
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = {
                    ...this.props.data,
                    ...values
                }
                axios.put(roleUpdate2, data).then(res => {
                    message.success('修改成功');
                    // this.props.curdCurrentData({
                    //     title: localStorage.getItem('name'),
                    //     status: 'update',
                    //     data,
                    // });
                    this.props.updateSuccess(res.data.data);
                    this.props.closeRightBox();
                });
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
                                            <Form.Item label={intl.get('wsd.i18n.sys.role.rolename')} {...formItemLayout}>
                                                {getFieldDecorator('roleName', {
                                                    initialValue: this.state.info.roleName,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.role.rolename'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={intl.get('wsd.i18n.sys.role.rolecode')} {...formItemLayout}>
                                                {getFieldDecorator('roleCode', {
                                                    initialValue: this.state.info.roleCode,
                                                    rules: [{
                                                        required: true,
                                                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.role.rolecode'),
                                                    }],
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col span={24}>
                                            <Form.Item label={intl.get('wsd.i18n.sys.role.roledesc')} {...formItemLayout1}>
                                                {getFieldDecorator('roleDesc', {
                                                    initialValue: this.state.info.roleDesc,
                                                    rules: [],
                                                })(
                                                    <TextArea rows={2} />
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

                    </div>}
            </div>
        )
    }
}

const MenuInfos = Form.create()(MenuInfo);
export default connect(null, {
    curdCurrentData
})(MenuInfos);
