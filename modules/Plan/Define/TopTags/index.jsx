
import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Modal, message } from 'antd';
import emitter from '../../../../api/ev'
import Search from '../../../../components/public/Search'
import AddForm from '../Add/index'
import style from './style.less'

const confirm = Modal.confirm

export class PlanDefineTopTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            roleBtnData: [
                {
                    id: 1,
                    name: 'AddTopBtn',
                    aliasName: '新增'
                },
                {
                    id: 2,
                    name: 'DeleteTopBtn',
                    aliasName: '删除'
                },
                {
                    id: 3,
                    name: 'MoveTDTopBtn',
                    aliasName: '移动'
                }
            ],
            planDefineSelectData: []
        }
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
        let showFormModal = (name) => {
            let that = this
            // 新增
            if(name === 'AddTopBtn') {
                this.setState({
                    modalVisible: true
                })
            }

            // 删除
            if(name === 'DeleteTopBtn') {
                confirm({
                    title: '您确定要删除计划？',
                    cancelText: '取消',
                    okText: '确定',
                    onOk () {
                        emitter.emit('noticeUpdateEvents', {status: 'delete', data: {}})
                    }
                });
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
                            return <Component key={i} onClickHandle={showFormModal} />
                        })
                    }
                </div>
                
                {/* 新增计划 */}
                <AddForm modalVisible={this.state.modalVisible} handleOk={this.handleOk} handleCancel={this.handleCancel} />
            </div>

        )
    }
}

export default PlanDefineTopTags
