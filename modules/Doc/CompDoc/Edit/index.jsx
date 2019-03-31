import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Switch, Slider, InputNumber } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';

import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const Option = Select.Option
const { TextArea } = Input;
class MenuInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,                 //国际化初始化状态
            info: {},                        //基本信息
            inputValue: 1                      //权重
        }
    }
    componentDidMount() {
        this.loadLocales();
        console.log(this.props)
        this.setState({
            info: this.props.data
        })
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
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var data = values;
                data.key = this.state.info['key']
                // 发送数据
                // emitter.emit('noticeUpdateEvents', { status: 'update', data: data })
                this.props.curdCurrentData({
                    title: localStorage.getItem('name'),
                    status: 'update',
                    data: data
                })
            }
        });
    }
    onChange = (value) => {
        this.setState({
            inputValue: value,
        });
    }
    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
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
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 22 },
                sm: { span: 20 },
            },
        };
        const dateWidth = '100%'

        let formData = {
            docTitle: '基础工程文件图示',
            docNum: 'A1201',
            category: '请选择类别',
            department: '新建',
            classification: '',
            profession: '请选择专业',
            authors: '叶青',
            task: '',
            docName: '请输入文件名称',
            versions: '1.0',
            remark: '',
            theHeir: '请输入上传人'
        }

        return (
            <div className={style.main}>
                {this.state.initDone && (
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>基本信息</h3>
                        <div className={style.mainScorll}>
                            <Form onSubmit={this.handleSubmit}>
                                <div className={style.content}>

                                    <Row type="flex">
                                        <Col span={12}>
                                            <Form.Item label='文档标题' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('docTitle', {
                                                        initialValue: formData.docTitle,
                                                        rules: [{
                                                            required: true,
                                                        }],
                                                    })(
                                                        <Input />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label='文档编号' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('docNum', {
                                                        initialValue: formData.docNum,
                                                        rules: [{
                                                            required: true,
                                                        }],
                                                    })(
                                                        <Input />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label='文档类别' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('category', {
                                                        initialValue: formData.category,
                                                        rules: [{
                                                            required: true,
                                                        }],
                                                    })(
                                                        <Select>
                                                            <Select.Option value="1">一类</Select.Option>
                                                            <Select.Option value="2">二类</Select.Option>
                                                            <Select.Option value="3">三类</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label='密级' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('classification', {
                                                        initialValue: formData.classification,
                                                        rules: [{
                                                            required: true,
                                                        }],
                                                    })(
                                                        <Select>
                                                            <Select.Option value="1">非密</Select.Option>
                                                            <Select.Option value="2">保密</Select.Option>
                                                            <Select.Option value="3">绝密</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label='作者' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('authors', {
                                                        initialValue: formData.authors,
                                                        rules: [],
                                                    })(
                                                        <Input />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label='上传人' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('theHeir', {
                                                        initialValue: formData.theHeir,
                                                        rules: [],
                                                    })(
                                                        <Input />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="上传日期" validateStatus="success" {...formItemLayout} >
                                                <div className={style.list}>
                                                    {getFieldDecorator('time', {
                                                        // initialValue: this.state.info.time ? [moment(this.state.info.time, 'YYYY-MM-DD'), moment(this.state.info.time, 'YYYY-MM-DD')] : '',
                                                        rules: [],
                                                    })(
                                                        <DatePicker style={{ width: '100%' }} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="最近更新时间" validateStatus="success" {...formItemLayout} >
                                                <div className={style.list}>
                                                    {getFieldDecorator('updateTime', {
                                                        rules: [],
                                                    })(
                                                        <DatePicker style={{ width: '100%' }} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item label='状态' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('department ', {
                                                        initialValue: formData.department,
                                                        rules: [],
                                                    })(
                                                        <Select>
                                                            <Select.Option value="1">状态一</Select.Option>
                                                            <Select.Option value="2">状态二</Select.Option>
                                                            <Select.Option value="3">状态三</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label='发布范围' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('task', {
                                                        initialValue: formData.task,

                                                    })(
                                                        <Input addonAfter={<Icon type="user-add" style={{color:"#1890ff"}}/>} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item label='版本' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('versions', {
                                                        initialValue: formData.versions,
                                                        rules: [{
                                                            required: true,
                                                        }],
                                                    })(
                                                        <Input />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>


                                        <Col span={24}>
                                            <Form.Item label='备注' {...formItemLayout2}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('remark', {
                                                        initialValue: formData.remark
                                                    })(
                                                        <TextArea />
                                                    )}


                                                </div>
                                            </Form.Item>

                                        </Col>

                                    </Row>

                                    <Row >
                                        <Col span={24}>
                                            <Col offset={4} >
                                                <Button onClick={this.handleSubmit} style={{ width: "100px" }} type="primary">保存</Button>
                                                <Button onClick={this.props.closeRightBox} style={{ width: "100px", marginLeft: "20px" }}>取消</Button>
                                            </Col>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}

            </div>
        )
    }
}

const MenuInfos = Form.create()(MenuInfo);
export default connect(null, {
    curdCurrentData
})(MenuInfos);