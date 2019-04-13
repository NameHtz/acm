import React, { Component } from 'react'
import style from './style.less'
import { Modal, Table ,Button, message} from 'antd';
import intl from 'react-intl-universal'
import Search from '../../../../components/public/Search'

import { orgSelectTree,meetingRelease } from '../../../../api/api'
import axios from '../../../../api/axios'

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
            //发布审批id
            selectRelease:"",
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

        //获取审批列表
        this.getOrgSelectTree()
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
        // alert(this.props.selectType == 1 ? '发布计划' : '发布审批')
        this.meetingReleae()
    }

    // 获取审审批列表
    getOrgSelectTree = () => {
        axios.get(orgSelectTree(''),'').then((result) => {
            console.log(result)
            let data = result.data.data;
            if(data.length != 0){
                this.setState({
                    data
                })
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    // 发布审批
    meetingReleae = () => {
        // 当前选中的id
        let data = this.state.selectRelease
        if(data !== ''){
            axios.put(meetingRelease,data).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
        }else{
            message.info('请选择发布项')
        }
    }


    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                this.setState({
                    selectRelease: selectedRows.map(val => val.id)
                },()=>{
                    console.log(this.state.selectRelease)
                })
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                // console.log(selected, selectedRows, changeRows);
                this.setState({
                    selectRelease:selectedRows.map(val => val.id)
                },()=>{
                    console.log(this.state.selectRelease)
                })
            },
        };
        return (
            <Modal className={style.main} width="850px" forceRender={true} centered={true}
                title={this.props.selectType == 1 ? '发布计划' : '发布审批'} visible={this.props.modalVisible}
                 onOk={this.handleOk} onCancel={this.props.handleCancel} bodyStyle={{ padding: 0 }}
                 footer={ 
                    <div className="modalbtn">
                    <Button key={2}  onClick={this.handleCancel} >关闭</Button>
                    <Button key={3} onClick={this.handleOk} type="primary">保存</Button>
                    </div>
                }>
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
