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
        console.log(this.props.data)
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
            docTitle: '02-ACM产品需求规格说明书',
            docNum: 'A1201',
            category: '请选择类别',
            department: '请选择部门',
            classification: '',
            profession: '请选择专业',
            authors: '请输入作者',
            task: '',
            docName: '请输入文件名称',
            versions: '1.0',
            remark: ''
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
                                                        rules: [],
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
                                            <Form.Item label='所属部门' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('department ', {
                                                        initialValue: formData.department,
                                                        rules: [],
                                                    })(
                                                        <Select>
                                                            <Select.Option value="1">部门一</Select.Option>
                                                            <Select.Option value="2">部门二</Select.Option>
                                                            <Select.Option value="3">部门三</Select.Option>
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
                                            <Form.Item label='文档专业' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('profession', {
                                                        initialValue: formData.profession,
                                                        rules: [],
                                                    })(
                                                        <Select>
                                                            <Select.Option value="1">ACM需求计划模板1</Select.Option>
                                                            <Select.Option value="2">ACM需求计划模板2</Select.Option>
                                                            <Select.Option value="3">ACM需求计划模板3</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label='文档作者' {...formItemLayout}>
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
                                            <Form.Item label='文件名称' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('docName', {
                                                        initialValue: formData.docName,
                                                        rules: [{
                                                            required: true,
                                                        }],
                                                    })(
                                                        <Input addonAfter={<span style={{color:"#1890ff"}}>选择文件</span>} />
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
                                        <Col span={12}>
                                            <Form.Item label='WBS/任务' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('task', {
                                                        initialValue: formData.task,

                                                    })(
                                                        <Input addonAfter={<Icon type="branches" style={{color:"#1890ff"}}/>} disabled={true} />
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