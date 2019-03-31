/*
 * @Author: wihoo.wanghao 
 * @Date: 2019-01-17 11:43:11 
 * @Last Modified by: wihoo.wanghao
 * @Last Modified time: 2019-03-20 14:32:59
 */

import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import Search from '../../../../components/public/Search'
import { Modal, message } from 'antd';
import ApproveList from '../Approve/index' //进展批准
import Totrial from '../Totrial' //进展审批
import style from './style.less'
import Approve from '../../../Operate/OpeFdback/Approve'

const Confirm = Modal.confirm

export class PlanFdbackTopTags extends Component {
    constructor (props) {
        super(props)
        this.state = {
            modalVisible: false,
            approveVisible: false,
            totrialVisible: false,
            roleBtnData: [
                {
                    id: 1,
                    name: 'SelectPlanTopBtn',
                    aliasName: '选择计划'
                },
                {
                    id:2,
                    name:"TreeTileViewBtn",
                    aliasName:"平铺树状切换"
                },
                {
                  id: 3,
                  name: 'ApproveTopBtn',
                  aliasName: '进展批准'
                },
                {
                  id: 4,
                  name: 'CancelApproveTopBtn',
                  aliasName: '取消批准'
                },
                {
                  id: 5,
                  name: 'ApprovalTopBtn',
                  aliasName: '进展审批'
                }
            ]
        }
    }

    approveHandleCancel = () => {
        this.setState({
            approveVisible: false
        })
    }

    totrialHandleCancel = () => {
        this.setState({
            totrialVisible: false
        })
    }

    // modal取消
    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }

    // modal取消
    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }

    render() {
        let topTags = this.state.roleBtnData.map((v, i) => {
            return dynamic(import('../../../../components/public/TopTags/' + v.name))
        })
        
        // 显示表单弹窗
        let handleShowModal = (name, title) => {
            if(name == 'ApproveTopBtn') {
                this.setState({
                    modalVisible: true
                })
            }

            if(name == 'ApprovalTopBtn') {
                console.log('111')
                this.setState({
                    totrialVisible: true
                })
            }

            if(name == 'TreeTileViewBtn') {
                this.props.toggleTableView(title)
            }

            if(name == 'DeleteTopBtn') {
               
            }

            if(name == 'CancelApproveTopBtn') {
                
            }
        }
        
        return (
            <div className={style.main}>
                <div className={style.search}>
                    <Search />
                </div>
                <div className={style.tabMenu}>
                    {
                        topTags.map((Component, i) => {
                            return <Component key={i} onClickHandle={handleShowModal} />
                        })
                    }
                </div>
                
                {/* 新增计划 */}
                <ApproveList modalVisible={this.state.modalVisible} handleOk={this.handleOk} handleCancel={this.handleCancel} />
                <Approve modalVisible={this.state.approveVisible} handleCancel={this.approveHandleCancel} />
                {/* 进展审批 */}
                <Totrial modalVisible={this.state.totrialVisible} handleCancel={this.totrialHandleCancel} />
            </div>
            
        )
    }
}

export default PlanFdbackTopTags