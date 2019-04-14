import React, { Component } from 'react'
import style from './style.less'
import { Modal, Table, Button, message } from 'antd';
import intl from 'react-intl-universal'
import Search from '../../../../components/public/Search'

import {questionRelease,questionCancelRelease} from '../../../../api/api'
import axios from '../../../../api/axios';


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
            selectDataId:[],
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
        console.log(this.props.title)
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

    // 获取发布列表
     
    //发布审批操作
    handleOk = () => {
        // console.log(this.props.selectType)
        // alert(this.props.selectType == 1 ? '发布计划' : '发布审批')
        console.log(this.props.publicTitle)
        let selectDataId = this.state.selectDataId;

        // 当前要操作数据不可以为空
        if(selectDataId.length === 0){
            message.error('您还没选择问题');
            return 0;
        };

        当前的操作
        let title = this.props.publicTitle;
        if(title === '直接发布'){

            axios.put(questionRelease,selectDataId).then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            });

        }else if(title === '发布审批'){

            axios.put(questionSolve,selectDataId).then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            });

        }else if(title === '取消发布'){

            axios.put(questionCancelRelease,selectDataId).then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            });
        }


    }

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                // console.log(record, selected, selectedRows)
                this.setState({
                    selectDataId: selectedRows.map(val=>val.id)
                })
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                // console.log(selected, selectedRows, changeRows);
                this.setState({
                    selectDataId:selectedRows.map(val=>val.id)
                })
            },
        };
        return (
            <Modal className={style.main} width="850px"
                forceRender={true}
                centered={true}
                // title={this.props.selectType == 1 ? '发布计划' : '发布审批'}
                title={this.props.publicTitle}
                visible={this.props.modalVisible}
                onOk={this.handleOk}
                onCancel={this.props.handleCancel}
                bodyStyle={{ padding: 0 }}
                footer={
                    <div className="modalbtn">
                        <Button key={2} onClick={this.handleCancel} >关闭</Button>
                        <Button key={3} onClick={this.handleOk} type="primary">保存</Button>
                    </div>
                }
            >
                <div className={style.tableMain}>
                    <div className={style.search}>
                        <Search />
                    </div>
                    <Table rowKey={record => record.id} defaultExpandAllRows={true} pagination={false} name={this.props.name} columns={this.state.columns} rowSelection={rowSelection} dataSource={this.state.data} />
                </div>
            </Modal>
        )
    }
}


export default PlanPreparedRelease
