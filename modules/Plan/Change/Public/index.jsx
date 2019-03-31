import React, { Component } from 'react'
import style from './style.less'
import { Modal, Table, Form, Input, Icon, DatePicker, Select, Row, Col } from 'antd';
import intl from 'react-intl-universal'
import Search from '../../../../components/public/Search'
import emitter from '../../../../api/ev'
import moment from 'moment';

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const Option = Select.Option;

export class PlanChangePublic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            columns: [],
            data: [
                {
                    id: 1,
                    name: 'ACM产品开发计划',
                    code: 'XM',
                    oldPlanData: '计划类型：里程碑计划',
                    changePlanData: '计划类型：月度计划',
                    children: [
                        {
                            id: 2,
                            name: '产品需求计划',
                            code: 'ZGYF',
                            oldPlanData: '开始日期：2018-08-10',
                            changePlanData: '完成日期：2018-12-10',
                            children: [
                                {
                                    id: 3,
                                    name: '产品需求计划',
                                    code: 'ZGYF',
                                    oldPlanData: '开始日期：2018-08-10',
                                    changePlanData: '完成日期：2018-12-10',
                                }
                            ]
                        }
                    ]
                },

            ],
            info: {
                changeChangExp: '优化计划',
                changeAnalysis: '不影响项目最终计划',
                changeRemark: '调整项目时间节点'
            }
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
                        title: '名称',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: '代码',
                        dataIndex: 'code',
                        key: 'code',
                    },
                    {
                        title: '原计划数据',
                        dataIndex: 'oldPlanData',
                        key: 'oldPlanData',
                    },
                    {
                        title: '变更后计划数据',
                        dataIndex: 'changePlanData',
                        key: 'changePlanData',
                    },
                ]
            });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                alert(JSON.stringify(values))
            }
        })
    }

    handleOk = () => {
        alert(this.props.selectType == 1 ? '批准变更' : '变更审批')
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
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
                title={this.props.selectType == 1 ? '批准变更' : '变更审批'} visible={this.props.modalVisible} onOk={this.handleOk} onCancel={this.props.handleCancel} bodyStyle={{ padding: 0 }} cancelText="取消" okText="确定">
                <div className={style.tableMain}>
                    <div className={style.search}>
                        <Search />
                    </div>
                    <Table rowKey={record => record.id} defaultExpandAllRows={true} pagination={false} name={this.props.name} columns={this.state.columns} rowSelection={rowSelection} dataSource={this.state.data} />
                </div>
                <div className={style.publicMain}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item {...formItemLayout} label="申请变更原因">
                            {getFieldDecorator('changeChangExp', {
                                initialValue: this.state.info.changeChangExp,
                                rules: [
                                    { required: true, message: "请输入申请变更原因" },
                                ],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="变更影响分析">
                            {getFieldDecorator('changeAnalysis', {
                                initialValue: this.state.info.changeAnalysis,
                                rules: [
                                    { required: true, message: "请输入变更影响分析" },
                                ],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="采取措施说明">
                            {getFieldDecorator('changeRemark', {
                                initialValue: this.state.info.changeRemark,
                                rules: [
                                    { required: true, message: "采取措施说明" },
                                ],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        )
    }
}

const PlanChangePublics = Form.create()(PlanChangePublic)
export default PlanChangePublics
