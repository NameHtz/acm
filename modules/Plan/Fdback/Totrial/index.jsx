import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Modal, Table, Button, Progress } from 'antd'
import style from './style.less'
import '../../../../asserts/antd-custom.less'
import SelectPlanTopBtn from '../../../../components/public/TopTags/SelectPlanTopBtn'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

export class PlanFdbackApprove extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalInfo: {
                title: '进展审批'
            },
            columns: [],
            data: [
                {
                    id: 1,
                    name: 'ACM产品开发计划1',
                    code: 'XM',
                    complete: 90,
                    children: [
                        {
                            id: 2,
                            name: 'ACM产品开发计划1-1',
                            code: 'XM2',
                            complete: 90
                        },
                        {
                            id: 3,
                            name: 'ACM产品开发计划1-2',
                            code: 'XM3',
                            complete: 80
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
                        title: "申请完成%",
                        dataIndex: 'complete',
                        key: 'complete',
                        render: number => (
                            <Progress key={1} percent={number} />
                        ),
                    }
                ]
            });
        });
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
            <Modal className={style.main} width="850px" forceRender={true} centered={true} title={this.state.modalInfo.title} visible={this.props.modalVisible} onCancel={this.props.handleCancel} footer={
                <div className="modalbtn">
                    <Button key="1" onClick={this.props.handleCancel}>取消</Button>
                    <Button key="2" type="primary" onClick={this.handleSubmit}>送审</Button>
                </div>
            }>
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

export default PlanFdbackApprove
