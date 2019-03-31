import React, { Component } from 'react'
import style from './style.less'
import { Modal, Table } from 'antd';
import intl from 'react-intl-universal'
import SelectPlanTopBtn from '../../../../../components/public/TopTags/SelectPlanTopBtn'
import emitter from '../../../../../api/ev'

const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}

export class PlanPreparedPlanAccoDistribution extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            columns: [],
            data: [
                {
                    id: 1,
                    name: 'ACM产品开发计划1',
                    code: 'XM',
                    planStartTime: '2018-08-10',
                    planEndTime: '2018-08-10',
                    iptName: '研发部',
                    userName: '孙博宇',
                    children: [
                        {
                            id: 2,
                            name: 'ACM产品开发计划1-1',
                            code: 'XM2',
                            planStartTime: '2018-08-10',
                            planEndTime: '2018-08-10',
                            iptName: '研发部',
                            userName: '孙博宇',
                        },
                        {
                            id: 3,
                            name: 'ACM产品开发计划1-2',
                            code: 'XM3',
                            planStartTime: '2018-08-10',
                            planEndTime: '2018-08-10',
                            iptName: '研发部',
                            userName: '孙博宇',
                        }
                    ]
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
                        title: intl.get('wsd.i18n.plan.feedback.name'),
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.code'),
                        dataIndex: 'code',
                        key: 'code',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.planstarttime'),
                        dataIndex: 'planStartTime',
                        key: 'planStartTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.planendtime'),
                        dataIndex: 'planEndTime',
                        key: 'planEndTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.iptname'),
                        dataIndex: 'iptName',
                        key: 'iptName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.username'),
                        dataIndex: 'userName',
                        key: 'userName',
                    }
                ]
            });
        });
    }

    handleOk = () => {
        alert("分配计划")
    }

    render() {
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
                title="分配计划" visible={this.props.modalVisible} onOk={this.handleOk} onCancel={this.props.handleCancel} bodyStyle={{ padding: 0 }} cancelText="取消" okText="确定">
                <div className={style.tableMain}>
                    <div className={style.search}>
                        <SelectPlanTopBtn />
                    </div>
                    <Table rowKey={record => record.id} defaultExpandAllRows={true} pagination={false} name={this.props.name} columns={this.state.columns} rowSelection={rowSelection} dataSource={this.state.data} />
                </div>
            </Modal>
        )
    }
}


export default PlanPreparedPlanAccoDistribution
