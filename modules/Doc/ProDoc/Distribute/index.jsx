import React, { Component } from 'react'
import { Modal, Button, Row, Col, Input, Icon, Select, Form, Checkbox, Table } from 'antd'
import style from './style.less'
import intl from 'react-intl-universal'
import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'
import RichText from './RichText/index'



const locales = {
    'en-US': require('../../../../api/language/en-US.json'),
    'zh-CN': require('../../../../api/language/zh-CN.json')
}

class Distribute extends Component {

    state = {
        initDone: false,
        modalInfo: {
            title: '文档分发'
        },
        inputValue: 0,
        RightColumns: [{
            title: '文档标题',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '版本',
            dataIndex: 'edition',
            key: 'edition',
        }, {
            title: '',
            dataIndex: 'num',
            key: 'num',
            render: ()=><Icon type="close" />
        }],
        RightData: [{
            key: '1',
            num: '',
            edition: '1.0',
            name: 'EC00620-pmis.xls',
        }, {
            key: '2',
            num: '',
            edition: '1.0',
            name: 'EC00620.xls',
        }, {
            key: '3',
            num: '',
            edition: '1.0',
            name: 'EC00620.xls',
        }]

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
    click(){
        this.setState({task:true})
    }
    handleCancel(){
        this.props.handleCancel('DistributeVisible')
    }
    
    render() {

        let formData = {
            docTitle: '刘清; 任正华;',
            docNum: '请输入主题',
            department: '请选择',
            classification: '技术建议',
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
                            <Button key="b" type="submit" onClick={this.handleCancel.bind(this)} >关闭</Button>
                            <Button key="saveAndSubmit" type="primary" >发送</Button>
                            </div>
                        }
                    >

                        <div className={style.content}>
                            <Form>
                                <div className={style.content}>
                                    <Row type="flex">
                                        <Col span={24}>
                                            <Form.Item label='接收人' {...formItemLayout2}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('docTitle', {
                                                        initialValue: formData.docTitle,
                                                        rules: [],
                                                    })(
                                                        <Input />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label='主题' {...formItemLayout2}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('docNum', {
                                                        initialValue: formData.docNum,
                                                        rules: [],
                                                    })(
                                                        <Input />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label='文档类别' {...formItemLayout2}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('Checkbox', {
                                                        initialValue: ["D", "E", "F"]
                                
                                                    })(
                                                        <Checkbox.Group style={{ width: "100%" }}>
                                                            <Row>
                                                                <Col span={4}><Checkbox value="A">在线预览</Checkbox></Col>
                                                                <Col span={3}><Checkbox value="B">升版</Checkbox></Col>
                                                                <Col span={3}><Checkbox value="C">覆盖</Checkbox></Col>
                                                                <Col span={3}><Checkbox value="D">下载</Checkbox></Col>
                                                                <Col span={3}><Checkbox value="E">分发</Checkbox></Col>
                                                                <Col span={3}><Checkbox value="F">邮件</Checkbox></Col>
                                                                <Col span={4}><Checkbox value="G">关联文档</Checkbox></Col>
                                                            </Row>
                                                        </Checkbox.Group>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label='需要回复' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('department ', {
                                                        initialValue: formData.department,
                                                        rules: [],
                                                    })(
                                                        <Select>
                                                            <Select.Option value="1">回复一</Select.Option>
                                                            <Select.Option value="2">回复二</Select.Option>
                                                            <Select.Option value="3">回复三</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label='类型' {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('classification', {
                                                        initialValue: formData.classification,
                                                        rules: [],
                                                    })(
                                                        <Select>
                                                            <Select.Option value="1">类型一</Select.Option>
                                                            <Select.Option value="2">类型二</Select.Option>
                                                            <Select.Option value="3">类型三</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item label='文档' {...formItemLayout2}>
                                                <div className={style.list}>
                                                    
                                                    <Table rowKey={record=>record.key} columns={this.state.RightColumns} pagination={false} dataSource={this.state.RightData} />

                                                </div>
                                            </Form.Item>
                                        </Col>
                                       

                                        <Col span={24}>
                                            <Form.Item label='消息' {...formItemLayout2}>
                                                <div className={style.richText}>
                                                    <RichText />
                                                </div>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                </div>
                            </Form>

                        </div>
                    </Modal>
                )}
            </div>
        )
    }

}


const Distributes = Form.create()(Distribute);
export default connect(null, {
    curdCurrentData
})(Distributes);



