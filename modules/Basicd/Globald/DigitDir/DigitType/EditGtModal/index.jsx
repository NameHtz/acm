import React, { Component } from 'react'
import { Modal, Form, Row, Col, Input, Button, Icon, notification } from 'antd';
import intl from 'react-intl-universal'
import style from './style.less'

const FormItem = Form.Item;

const locales = {
    "en-US": require('../../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../../api/language/zh-CN.json')
}

class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            initDone: false,
            info: {
                gbCode: 1,
                gbName: 1,
                remark: 1,
            }
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

    // 提交表单
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const { currentLData } = this.props
                const currentRow = {...this.props.getCurrentRow(), typeCode: currentLData.typeCode}
                console.log(currentLData)
                if (this.props.title == '新增同级') {
                    if (currentRow.id) {
                        delete currentRow.id
                        const data = {
                            ...currentRow,
                            ...fieldsValue
                        }
                        this.props.addDictTypeCode(data)
                        this.props.updateDictTableData(data, {type: 'add'})
                    } else {
                        delete currentRow.id
                        const data = {
                            parentId: 0,
                            ...currentRow,
                            ...fieldsValue
                        }
                        this.props.addDictTypeCode(data)
                        this.props.updateDictTableData(data, {type: 'addTop'})
                    }
                } else {
                    // 新增下级
                    if (currentRow.id) {
                        const data = {
                            parentId: currentRow.id,
                            ...currentRow,
                            ...fieldsValue
                        }
                        delete data.id
                        this.props.addDictTypeCode(data)
                        this.props.updateDictTableData(data, {type: 'addChild'})
                    } else {
                        notification.warning(
                            {
                                placement: 'bottomRight',
                                bottom: 50,
                                duration: 2,
                                message: '操作提醒',
                                description: '请选中数据！'
                            }
                        )
                        return
                    }
                }
                // 清空表单项
                this.props.form.resetFields()
                // 关闭弹窗
                this.props.onCancel();
            }
        })
    }

    handleCancel = (e) => {
        this.setState({ visible: false, }, () => { console.log(this.state.flag); });
        this.props.onCancel();
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
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

        return (
            <div className={style.main}>
                <Modal
                    title={this.props.title}
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width="850px"
                    centered={true}
                    className={style.addFormInfo}
                    footer={
                        <div className='modalbtn'>
                            <Button key="submit2" type="primary" onClick={this.handleSubmit}>确定</Button>
                            <Button key="back" onClick={this.handleCancel}>关闭</Button>
                        </div>
                    }
                >
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            <Row type="flex">
                                <Col span={11}>
                                    <Form.Item label={intl.get('wsd.i18n.base.gbtype.gbcode')} {...formItemLayout}>
                                        {getFieldDecorator('dictCode', {
                                            initialValue: this.state.info.dictCode,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.gbtype.gbcode'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item label={intl.get('wsd.i18n.base.gbtype.remark')} {...formItemLayout}>
                                        {getFieldDecorator('dictName', {
                                            initialValue: this.state.info.dictName,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.gbtype.remark'),
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
            </div>
        )
    }
}


const Adds = Form.create()(Add);
export default Adds