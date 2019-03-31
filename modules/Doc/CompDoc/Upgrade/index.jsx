import React, { Component } from 'react'
import { Modal, Button, Row, Col, Input, Icon, Select, Form } from 'antd'
import style from './style.less'
import intl from 'react-intl-universal'
import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'


const locales = {
    'en-US': require('../../../../api/language/en-US.json'),
    'zh-CN': require('../../../../api/language/zh-CN.json')
}

const { TextArea } = Input;

class UploadDoc extends Component {

    state = {
        initDone: false,
        modalInfo: {
            title: '文档升版'
        },
        inputValue: 0,

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
                // const values = {
                //     ...fieldsValue,
                //     'planStartTime': fieldsValue['planStartTime'].format('YYYY-MM-DD'),
                //     'planEndTime': fieldsValue['planEndTime'].format('YYYY-MM-DD'),
                // }
                // emitter.emit('noticeUpdateEvents', { status: 'add', data: values })
                // this.props.curdCurrentData({
                //     title: localStorage.getItem('name'),
                //     status: 'add',
                //     data: values
                // })
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



    handleCancel() {
        this.props.handleCancel('UpgradeVisible')
    }

    render() {

        let formData = {
            docTitle: 'EC00620-pmis.xls',
            docNum: '000',
            classification: '非密',
            docName: '请输入文件名称',
            versions: '1.0',
            authors: '任正华'
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
                                <Button key="b" type="submit" onClick={this.handleCancel.bind(this)} >关闭</Button>
                                <Button key="saveAndSubmit" onClick={this.handleSubmit}  type="primary">保存</Button>
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
                                                <Input disabled={true} />
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
                                                <Input disabled={true} />
                                            )}
                                        </div>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label='密级' {...formItemLayout}>
                                        <div className={style.list}>
                                            {getFieldDecorator('classification', {
                                                initialValue: formData.classification,
                                                rules: [],
                                            })(
                                                <Input disabled={true} />
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
                                                <Input disabled={true} />
                                            )}
                                        </div>
                                    </Form.Item>
                                </Col>


                                <Col span={12}>
                                    <Form.Item label='版本' {...formItemLayout}>
                                        <div className={style.list}>
                                            {getFieldDecorator('versions', {
                                                initialValue: formData.versions,
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

                            </Row>
                        </div>
                    </Form>

                </div>

                    </Modal>
        )
    }
            </div>
        )
    }

}


const UploadDocs = Form.create()(UploadDoc);
export default connect(null, {
    curdCurrentData
})(UploadDocs);



