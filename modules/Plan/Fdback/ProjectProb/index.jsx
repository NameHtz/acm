/*
 * @Author: wihoo.wanghao
 * @Date: 2019-01-16 16:38:09
 * @Last Modified by: wihoo.wanghao
 * @Last Modified time: 2019-02-18 16:51:38
 */
import React, { Component } from 'react'
import intl from 'react-intl-universal'
import _ from 'lodash'
import emitter from '../../../../api/ev'
import { Table, Progress, Modal } from 'antd'
import style from './style.less'
import AddTopBtn from '../../../../components/public/TopTags/AddTopBtn' //新增按钮
import ModifyTopBtn from '../../../../components/public/TopTags/ModifyTopBtn' //修改按钮
import DeleteTopBtn from '../../../../components/public/TopTags/DeleteTopBtn' //删除按钮
import PublicdTopBtn from '../../../../components/public/TopTags/PublicdTopBtn' //发布按钮
import CancelPublicTopBtn from '../../../../components/public/TopTags/CancelPublicTopBtn' //取消发布按钮
import AddModal from "./AddModal"

const Confirm = Modal.confirm

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

export class PlanPreparedPlanAcco extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'PlanPreparedPlanAcco',
            width: '',
            initDone: false,
            columns: [],
            addModal: false,
            data: [
                {
                    id: 1,
                    questionName: 'ACM产品视觉设计文档未上传',
                    questionType: '技术问题',
                    priority: '高',
                    iptName: '研发部',
                    userName: '孙博宇',
                    dealTime: '2018-12-11',
                    applyIpt: '咨询部',
                    applyTime: '2018-11-11',
                    status: '已解决',
                    solveTime: '2018-11-11',
                    creator: '孙博宇',
                    children: [
                        {
                            id: 3,
                            questionName: 'ACM产品视觉设计文档未上传',
                            questionType: '技术问题',
                            priority: '高',
                            iptName: '研发部',
                            userName: '孙博宇',
                            dealTime: '2018-12-11',
                            applyIpt: '咨询部',
                            applyTime: '2018-11-11',
                            status: '已解决',
                            solveTime: '2018-11-11',
                            creator: '孙博宇',
                        }
                    ]
                },
                {
                    id: 2,
                    questionName: 'ACM产品视觉设计文档未上传',
                    questionType: '技术问题',
                    priority: '高',
                    iptName: '研发部',
                    userName: '孙博宇',
                    dealTime: '2018-12-11',
                    applyIpt: '咨询部',
                    applyTime: '2018-11-11',
                    status: '已解决',
                    solveTime: '2018-11-11',
                    creator: '孙博宇',
                }
            ],
            activeIndex: '',
            selectData: []
        }
    }

    componentDidMount() {
        this.loadLocales()
    }

    closeAddModal = () => {
        this.setState({
            addModal: false
        })
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
                        title: intl.get('wsd.i18n.plan.projectquestion.questionname'),
                        dataIndex: 'questionName',
                        key: 'questionName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.projectquestion.questiontype'),
                        dataIndex: 'questionType',
                        key: 'questionType',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.projectquestion.priority'),
                        dataIndex: 'priority',
                        key: 'priority',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.projectquestion.iptname'),
                        dataIndex: 'iptName',
                        key: 'iptName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.projectquestion.username'),
                        dataIndex: 'userName',
                        key: 'userName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.projectquestion.dealtime'),
                        dataIndex: 'dealTime',
                        key: 'dealTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.projectquestion.applyipt'),
                        dataIndex: 'applyIpt',
                        key: 'applyIpt',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.projectquestion.applytime'),
                        dataIndex: 'applyTime',
                        key: 'applyTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.projectquestion.status'),
                        dataIndex: 'status',
                        key: 'status',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.projectquestion.solvetime'),
                        dataIndex: 'solveTime',
                        key: 'solveTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.projectquestion.creator'),
                        dataIndex: 'creator',
                        key: 'creator',
                    },
                ]
            });
        });
    }

    getInfo = (record, index) => {
        let id = record.id, records = record
        if (this.state.activeIndex == id) {
            id = ''
            records = ''
        }
        this.setState({
            activeIndex: id
        })
    }

    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
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

        const showFormModal = (name, e) => {
            if(name == 'AddTopBtn') {
                this.setState({
                    addModal: true
                })
            }
            if(name == 'ModifyTopBtn') {
                this.setState({
                    addModal: true
                })
            }
             // 删除
             if(name === 'DeleteTopBtn') {
                Confirm({
                    title: '您确定要删除？',
                    cancelText: '取消',
                    okText: '确定',
                    onOk () {
                        
                    }
                });
            }
        }

        return (
            <div className={style.main}>
                <h3 className={style.listTitle}>项目问题</h3>
                <div className={style.rightTopTogs}>
                    <AddTopBtn onClickHandle={showFormModal} />
                    <ModifyTopBtn onClickHandle={showFormModal} />
                    <DeleteTopBtn onClickHandle={showFormModal} />
                    <PublicdTopBtn onClickHandle={showFormModal} />
                    <CancelPublicTopBtn onClickHandle={showFormModal} />
                </div>
                <div className={style.mainScorll}>
                    <Table
                    rowKey={record => record.id}
                    defaultExpandAllRows={true}
                    pagination={false}
                    name={this.props.name}
                    columns={this.state.columns}
                    rowSelection={rowSelection}
                    dataSource={this.state.data}
                    rowClassName={this.setClassName}
                    onRow={(record, index) => {
                        return {
                            onClick: (event) => {
                                this.getInfo(record, index)
                            }
                        }
                    }
                    } />
                </div>
                <AddModal visible={this.state.addModal} handleCancel={this.closeAddModal}></AddModal>
            </div>
        )
    }
}

export default PlanPreparedPlanAcco
