import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Modal, message } from 'antd';
import Public from "../Public"
import Search from '../../../../components/public/Search'
import style from './style.less'
import Add from '../Add'
import Release from '../../../Plan/Prepared/Release' //下达
import Reported from '../../../Plan/Prepared/Reported' //上报

const confirm = Modal.confirm

export class PlanDefineTopTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            releaseVisible: false,
            reportedVisible: false,
            modelTitle: '',
            roleBtnData: [
                {
                    id: 1,
                    name: 'AddTopBtn',
                    aliasName: '新增'
                },
                {
                    id: 2,
                    name: 'PublicTopBtn',
                    aliasName: '发布'
                },
                {
                    id: 3,
                    name: 'DeleteTopBtn',
                    aliasName: '删除'
                },
                {
                    id: 4,
                    name: 'SolveTopBtn',
                    aliasName: '解决'
                },
                {
                    id: 5,
                    name: 'ClosedTopBtn',
                    aliasName: '关闭'
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

    handleReleaseCancel = () => {
        this.setState({
            releaseVisible: false
        })
    }

    handleReportedCancel = () => {
        this.setState({
            reportedVisible: false
        })
    }
  
    handlePublicCancel = () => {
        this.setState({
            publicModalVisible: false
        })
    }
    render() {
        let topTags = this.state.roleBtnData.map((v, i) => {
            return dynamic(import('../../../../components/public/TopTags/' + v.name))
        })

        // 显示表单弹窗
        let showFormModal = (name, menu) => {
            let that = this
            // 新增
            if (name === 'AddTopBtn') {
                console.log('新增问题')
                this.setState({
                    modalVisible: true,
                    modelTitle: '新增项目问题'
                })
            }

            // 删除
            if (name === 'DeleteTopBtn') {
               this.props.deleteQuestion()
            }
            //发布
            if (name === 'PublicTopBtn') {
                // e.key 1发布计划 2发布审批
                console.log('发布问题')
                this.setState({
                    publicModalVisible: true,
                    topSelectBtnType: menu.key
                })
            }
            // 解决
            if (name === 'SolveTopBtn') {
                console.log('解决问题')
                this.setState({
                    releaseVisible: true
                })
            }
            // 关闭
            if (name === 'ClosedTopBtn') {
                console.log('关闭问题')
                this.setState({
                    reportedVisible: true
                })
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
                <Public selectType={this.state.topSelectBtnType} modalVisible={this.state.publicModalVisible} handleCancel={this.handlePublicCancel} />
                <Add modalVisible={this.state.modalVisible} handleCancel={this.handleCancel} modelTitle={this.state.modelTitle} />
                {/* 计划编制 -> 下达 */}
                <Release modalVisible={this.state.releaseVisible} handleCancel={this.handleReleaseCancel} />
                {/* 计划编制 -> 上报 */}
                <Reported modalVisible={this.state.reportedVisible} handleCancel={this.handleReportedCancel} />
            </div>

        )
    }
}

export default PlanDefineTopTags
