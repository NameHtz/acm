
import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Modal, message, Table, Checkbox, Button } from 'antd';
import Search from '../../../../components/public/Search'
import BussPlanViewTopBtn from '../../../../components/public/TopTags/BussPlanViewTopBtn'
import style from './style.less'

import AddIndex from '../../OpePrepared/AddIndex' //新增指标
import AddTask from '../../OpePrepared/AddTask' //新增任务
import Change from '../Change' //变更送审你

const confirm = Modal.confirm

export class OperatePreparedTopTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addIndexVisible: false,
            addTaskVisible: false,
            changeVisible: false,
            roleBtnData: [
                {
                    id: 1,
                    name: 'SelectBussPlanTopBtn',
                    aliasName: '选择经营计划'
                },
                {
                    id: 2,
                    name: 'SpreadBtn',
                    aliasName: '展开'
                },
                {
                    id: 3,
                    name: 'AddIndexTopBtn',
                    aliasName: '新增指标'
                },
                {
                    id: 4,
                    name: 'AddTaskTopBtn',
                    aliasName: '新增任务'
                },
                {
                    id: 5,
                    name: 'DeleteTopBtn',
                    aliasName: '删除'
                },
                {
                    id: 6,
                    name: 'CancelTopBtn',
                    aliasName: '取消'
                },
                {
                    id: 7,
                    name: 'ChangeReviewTopBtn',
                    aliasName: '变更送审'
                }
                
            ],
            columns: [
                {
                    title: "代码",
                    dataIndex: 'code',
                    key: 'code',
                },
                {
                    title: "名称",
                    dataIndex: 'name',
                    key: 'name',
                },
            ],
            data: [
                {
                    id: 1,
                    code: '2019-001',
                    name: '2019年经营目标'
                },
                {
                    id: 2,
                    code: '2019-002',
                    name: '2019年经营目标2'
                }
            ]
        }
    }

    addIndexHandleCancel = () => {
        this.setState({
            addIndexVisible: false
        })
    }

    addTaskHandleCancel = () => {
        this.setState({
            addTaskVisible: false
        })
    }

    changeHandleCancel = () => {
        this.setState({
            changeVisible: false
        })
    }

    render() {
        let topTags = this.state.roleBtnData.map((v, i) => {
            return dynamic(import('../../../../components/public/TopTags/' + v.name))
        })

        // 显示表单弹窗
        let showFormModal = (name, e) => {
            let that = this
            // 新增指标
            if (name === 'AddIndexTopBtn') {
                this.setState({
                    addIndexVisible: true
                })
            }
            // 新增任务
            if (name === 'AddTaskTopBtn') {
                this.setState({
                    addTaskVisible: true
                })
            }
            
            // 变更送审
            if (name === 'ChangeReviewTopBtn') {
                this.setState({
                    changeVisible: true
                })
            }

            // 删除
            if (name === 'DeleteTopBtn') {
                confirm({
                    title: '您确定要删除经营计划定义？',
                    cancelText: '取消',
                    okText: '确定',
                    onOk() {
                        alert('删除')
                    }
                });
            }
            // 取消
            if (name === 'CancelTopBtn') {
                confirm({
                    title: '您确定要取消变更？',
                    cancelText: '取消',
                    okText: '确定',
                    onOk() {
                        alert('取消成功')
                    }
                });
            }
        }

        const popoverContent = (
            <div className={style.main} style={{padding: 0}}>
                <div className={style.popheader}>
                    <BussPlanViewTopBtn />
                    <Search />
                </div>
                <div className={style.popbody}>
                    <Table pagination={false} columns={this.state.columns} dataSource={this.state.data} />
                </div>
                <div className={style.popfooter}>
                    <span><Checkbox defaultChecked></Checkbox> 包含已关闭经营计划</span>
                    <div className={style.btns}>
                        <Button>打开经营计划</Button> &nbsp;&nbsp;
                        <Button>关闭经营计划</Button>
                    </div>
                </div>
            </div>
        )

        return (
            <div className={style.main}>
                <div className={style.search}>
                    <Search />
                </div>
                <div className={style.tabMenu}>
                    {
                        topTags.map((Component, i) => {
                            if(i == 0) {
                                return <Component key={i} popoverContent={popoverContent} onClickHandle={showFormModal} />
                            }
                            return <Component key={i} onClickHandle={showFormModal} />
                        })
                    }
                </div>
                {/* 新增指标 */}
                <AddIndex modalVisible={this.state.addIndexVisible} handleCancel={this.addIndexHandleCancel} />
                {/* 新增任务 */}
                <AddTask modalVisible={this.state.addTaskVisible} handleCancel={this.addTaskHandleCancel} />
                {/* 发布审批 */}
                <Change modalVisible={this.state.changeVisible} handleCancel={this.changeHandleCancel} />
            </div>
        )
    }
}

export default OperatePreparedTopTags
