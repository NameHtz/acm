
import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Modal, message, Divider, Icon, Popover, Table, Button } from 'antd';
import Search from '../../../../components/public/Search'
import style from './style.less'


// import UploadDoc from '../Upload/index'
// import Publicd from '../Publicd/index'
// import Upgrade from '../Upgrade/index'


const confirm = Modal.confirm

export class CompDocTop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            UploadVisible: false,
            PublicdVisible: false,
            UpgradeVisible: false,
            DistributeVisible: false,
            MailVisible: false,
            visible: false,
            roleBtnData: [
                {
                    id: 1,
                    name: 'CancelCollection',
                    aliasName: '取消收藏'
                },
                {
                    id: 2,
                    name: 'DownloadTopBtn',
                    aliasName: '下载'
                },
                
            ],
        }
    }


    // modal取消
    handleCancel = (v) => {
        // console.log(v)
        if(v == 'UploadVisible'){
            this.setState({UploadVisible: false})
        } else if(v == 'PublicdVisible'){
            this.setState({PublicdVisible: false})
        } else if(v == 'UpgradeVisible'){
            this.setState({UpgradeVisible: false})
        } 
    }

    render() {
        let topTags = this.state.roleBtnData.map((v, i) => {
            return dynamic(import('../../../../components/public/TopTags/' + v.name))
        })

        // 显示表单弹窗
        let showFormModal = (name) => {
            let that = this
            // 新增
            if (name === 'AddTopBtn') {
                this.setState({
                    modalVisible: true
                })
            }

            // 删除
            if (name === 'DeleteTopBtn') {
                confirm({
                    title: '您确定要删除计划？',
                    cancelText: '取消',
                    okText: '确定',
                    onOk() {

                    }
                });
            }
            if (name === 'UploadTopBtn') {
                this.setState({UploadVisible: true})
            } else if(name === 'PublicdTopBtn'){
                this.setState({PublicdVisible: true})
            } else if(name === 'Upgrade'){
                this.setState({UpgradeVisible: true})
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

                {/* 上传文档 */}
                {/* <UploadDoc modalVisible={this.state.UploadVisible} handleOk={this.handleOk} handleCancel={this.handleCancel} /> */}
                {/* 发布 */}
                {/* <Publicd modalVisible={this.state.PublicdVisible} handleOk={this.handleOk} handleCancel={this.handleCancel} /> */}
                {/* 升版 */}
                {/* <Upgrade modalVisible={this.state.UpgradeVisible} handleOk={this.handleOk} handleCancel={this.handleCancel} /> */}

            </div>

        )
    }
}

export default CompDocTop
