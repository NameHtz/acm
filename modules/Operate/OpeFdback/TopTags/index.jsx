
import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Modal, message, Table, Checkbox, Button } from 'antd';
import Search from '../../../../components/public/Search'
import BussPlanViewTopBtn from '../../../../components/public/TopTags/BussPlanViewTopBtn'
import style from './style.less'

import Approve from '../Approve'

const confirm = Modal.confirm

export class OperateFdbackTopTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            approveVisible: false,
            roleBtnData: [
                {
                    id: 1,
                    name: 'SelectBussPlanTopBtn',
                    aliasName: '选择经营计划'
                },
                {
                    id: 2,
                    name: 'TreeTileViewBtn',
                    aliasName: '树形模式'
                },
                {
                    id: 3,
                    name: 'ProgressApprovalTopBtn',
                    aliasName: '进展审批'
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

    approveHandleCancel = () => {
        this.setState({
            approveVisible: false
        })
    }

    render() {
        let topTags = this.state.roleBtnData.map((v, i) => {
            return dynamic(import('../../../../components/public/TopTags/' + v.name))
        })

        // 显示表单弹窗
        let showFormModal = (name,title) => {
            let that = this
            // 删除
            if(name === 'ProgressApprovalTopBtn') {
                this.setState({
                    approveVisible: true
                })
            }
            if(name == 'TreeTileViewBtn') {
                this.props.toggleTableView(title)
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
                <Approve modalVisible={this.state.approveVisible} handleCancel={this.approveHandleCancel} />
            </div>

        )
    }
}

export default OperateFdbackTopTags
