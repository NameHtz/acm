import React, { Component } from 'react'
import style from './style.less'
import { Modal, Table, Form, Input, Icon, DatePicker, Select, Row, Col, Steps, Button } from 'antd';
import intl from 'react-intl-universal'
import Search from '../../../../components/public/Search'
import moment from 'moment';
import Distribute from '../../../Plan/Prepared/Distribute'

const Option = Select.Option;
const Step = Steps.Step;
const { TextArea } = Input;

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

export class OperateChangeChange extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            step: 1,
            columns: [],
            data: [
                {
                    id: 1,
                    name: '2019年经营目标',
                    code: '2019-001',
                    applyValue: '2018-08-10',
                    applyComplete: '2018-08-10',
                    orgName: '研发部',
                    userName: '孙博宇'
                }
            ]
        }
    }

    componentDidMount() {
        this.loadLocales()
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            this.setState({
                initDone: true,
                columns: [
                    {
                        title: intl.get('wsd.i18n.operate.change.name'),
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.change.code'),
                        dataIndex: 'code',
                        key: 'code',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.change.applyvalue'),
                        dataIndex: 'applyValue',
                        key: 'applyValue',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.change.applycomplete'),
                        dataIndex: 'applyComplete',
                        key: 'applyComplete',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.change.orgname'),
                        dataIndex: 'orgName',
                        key: 'orgName',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.change.username'),
                        dataIndex: 'userName',
                        key: 'userName',
                    }
                ]
            });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState((proState, state) => ({
            step: proState.step + 1
        }))
    }

    backone = (e) => {
        e.preventDefault();
        this.setState((proState, state) => ({
            step: proState.step - 1
        }))
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formData = {
            applyNo: '',
            applyAccord: ''
        }
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                this.setState({
                    selectData: selectedRows
                })
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };
        return (
            <Modal className={style.main} width="850px" forceRender={true} centered={true}
                title="变更送审" visible={this.props.modalVisible} onCancel={this.props.handleCancel} footer={[
                    this.state.step > 1 && <span style={{ float: 'left' }}><Button key="backone" onClick={this.backone}>上一步</Button></span>,
                    <Button key="back" onClick={this.props.handleCancel}>取消</Button>,
                    <Button key="submit" type="primary" onClick={this.handleSubmit}>下一步</Button>
                ]}>
                <div className={style.steps}>
                    <Steps size="small" current={this.state.step - 1}>
                        <Step title="选择计划" />
                        <Step title="启动流程" />
                        <Step title="完成" />
                    </Steps>
                </div>
                {/* step1 */}
                {this.state.step == 1 && (<div className={style.tableMain}>
                    <div className={style.search}>
                        <Search />
                    </div>
                    <Table rowKey={record => record.id} defaultExpandAllRows={true} pagination={false} name={this.props.name} columns={this.state.columns} rowSelection={rowSelection} dataSource={this.state.data} />
                </div>)}
                {/* step2 */}
                {this.state.step == 2 && (<div className={style.tableMain}>
                    <div className={style.search}>
                        <Search />
                    </div>
                    <Distribute />
                    <div style={{ marginTop: '15px' }}>
                        <Form>
                            <Form.Item label="变更申请单编号" {...formItemLayout}>
                                <div className={style.list}>
                                    {getFieldDecorator('applyNo', {
                                        initialValue: formData.applyNo,
                                        rules: [],
                                    })(
                                        <Input />
                                    )}
                                </div>
                            </Form.Item>
                            <Form.Item label="变更依据" {...formItemLayout}>
                                <div className={style.list}>
                                    {getFieldDecorator('applyAccord', {
                                        initialValue: formData.applyAccord,
                                        rules: [],
                                    })(
                                        <Input />
                                    )}
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>)
                }
            </Modal>

        )
    }
}

const OperateChangeChanges = Form.create()(OperateChangeChange)

export default OperateChangeChanges
