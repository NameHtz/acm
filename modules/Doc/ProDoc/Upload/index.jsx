import React, { Component } from 'react'
import { Modal, Button, Row, Col, Input, Icon, Select, Form } from 'antd'
import style from './style.less'
import intl from 'react-intl-universal'
import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'
import UploadTask from '../UploadTask/index'


const locales = {
    'en-US': require('../../../../api/language/en-US.json'),
    'zh-CN': require('../../../../api/language/zh-CN.json')
}

class UploadDoc extends Component {

    state = {
        initDone: false,
        modalInfo: {
            title: '上传文档'
        },
        inputValue: 0,
        task: false

    }

    componentDidMount() {
        this.loadLocales();
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            this.setState({ initDone: true })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                    'planStartTime': fieldsValue['planStartTime'].format('YYYY-MM-DD'),
                    'planEndTime': fieldsValue['planEndTime'].format('YYYY-MM-DD'),
                }
                // emitter.emit('noticeUpdateEvents', { status: 'add', data: values })
                this.props.curdCurrentData({
                    title: localStorage.getItem('name'),
                    status: 'add',
                    data: values
                })
                //this.props.curdCurrentData('add', 'status')
                //this.props.curdCurrentData(values, 'data')

                // 清空表单项
                this.props.form.resetFields()
                // 关闭弹窗
                this.props.handleCancel()
            }
        })
    }

    onChange = (value) => {
        this.setState({
            inputValue: value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                    'planStartTime': fieldsValue['planStartTime'].format('YYYY-MM-DD'),
                    'planEndTime': fieldsValue['planEndTime'].format('YYYY-MM-DD'),
                }
                // emitter.emit('noticeUpdateEvents', { status: 'add', data: values })
                this.props.curdCurrentData({
                    title: localStorage.getItem('name'),
                    status: 'add',
                    data: values
                })
                //this.props.curdCurrentData('add', 'status')
                //this.props.curdCurrentData(values, 'data')

                // 清空表单项
                this.props.form.resetFields()
                // 关闭弹窗
                // this.props.handleCancel('UploadVisible')
                this.handleCancel.bind(this)
            }
        })
    }

    taskHandleCancel = () => {
        this.setState({
            task: false
        })
    }
    click() {
        this.setState({ task: true })
    }
    handleCancel() {
        this.props.handleCancel('UploadVisible')
    }

    render() {

        let formData = {
            docTitle: '02-ACM产品需求规格说明书',
            docNum: 'A1201',
            category: '请选择类别',
            department: '请选择部门',
            classification: '',
            profession: '请选择专业',
            authors: '请输入作者',
            task: '',
            docName: '请输入文件名称'
        }

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
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
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };

        return (
            <div>
                {this.state.initDone && (
                    <Modal
                        className={style.main}
                        width="850px"
                        title={this.state.modalInfo.title}
                        forceRender={true} centered={true}
                        visible={this.props.modalVisible}
                        onCancel={this.handleCancel.bind(this)}
                        footer={
                            <div className='modalbtn'>
                                <Button key="b" type="submit" onClick={this.handleSubmit} >保存</Button>
                                <Button key="saveAndSubmit" onClick={this.handleSubmit} type="primary" >保存并继续</Button>
                            </div>
                        }
                    >

                        <div className={style.content}>
                            <Form>
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
                                            <Form.Item label='WBS/任务' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('task', {
                                                        initialValue: formData.task,

                                                    })(
                                                        <Input addonAfter={<Icon type="branches" onClick={this.click.bind(this)} />} disabled={true} />
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
                                                        <Input addonAfter={<span>选择文件</span>} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                </div>
                            </Form>

                        </div>

                        <UploadTask modalVisible={this.state.task} handleCancel={this.taskHandleCancel} />
                    </Modal>
                )}
            </div>
        )
    }

}


const UploadDocs = Form.create()(UploadDoc);
export default connect(null, {
    curdCurrentData
})(UploadDocs);



