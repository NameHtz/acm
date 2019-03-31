import React, { Component } from 'react'
import style from './style.less'
import { Modal, Table,Button } from 'antd';
import intl from 'react-intl-universal'
import Search from '../../../../components/public/Search'


const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

export class PlanPreparedRelease extends Component {
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

                    children: [
                        {
                            id: 2,
                            name: 'ACM产品开发计划1-1',
                            code: 'XM2',

                        },
                        {
                            id: 3,
                            name: 'ACM产品开发计划1-2',
                            code: 'XM3',

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


                ]
            });
        });
    }

    handleOk = () => {
        alert(this.props.selectType == 1 ? '发布计划' : '发布审批')
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
                title="所属计划任务" visible={this.props.modalVisible} onOk={this.handleOk} onCancel={this.props.handleCancel} bodyStyle={{ padding: 0 }}
                footer={
                    <div className="modalbtn">
                        <Button key={3}>取消</Button>
                        <Button key={2} type="primary" >确定</Button>
                    </div>
                }>
                <div className={style.tableMain}>
                    <Table rowKey={record => record.id} defaultExpandAllRows={true} pagination={false} name={this.props.name} columns={this.state.columns} dataSource={this.state.data} />
                </div>
            </Modal>
        )
    }
}


export default PlanPreparedRelease
