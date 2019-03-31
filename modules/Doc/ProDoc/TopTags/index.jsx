
import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Modal, message, Divider, Icon, Popover, Table, Button } from 'antd';
import Search from '../../../../components/public/Search'
import style from './style.less'
import SelectProjectBtn from '../SelectProjectBtn/index'


import UploadDoc from '../Upload/index'
import Publicd from '../Publicd/index'
import Upgrade from '../Upgrade/index'
import Distribute from '../Distribute/index'
import Mail from '../Mail/index'

// import UploadDoc from '../Upload/index'

const confirm = Modal.confirm

export class DocTempDoc extends Component {
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
                    name: 'AllDocuments',
                    aliasName: '全部文档'
                },
                {
                    id: 2,
                    name: 'UploadTopBtn',
                    aliasName: '上传'
                },
                {
                    id: 3,
                    name: 'PublicdTopBtn',
                    aliasName: '发布'
                },
                {
                    id: 4,
                    name: 'Distribute',
                    aliasName: '分发'
                },
                {
                    id: 5,
                    name: 'Upgrade',
                    aliasName: '升版'
                },
                {
                    id: 6,
                    name: 'Mail',
                    aliasName: '邮件'
                },
                {
                    id: 7,
                    name: 'DownloadTopBtn',
                    aliasName: '下载'
                },
                {
                    id: 8,
                    name: 'DeleteTopBtn',
                    aliasName: '删除'
                }
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
        } else if(v == 'DistributeVisible'){
            this.setState({DistributeVisible: false})
        } else if(v == 'MailVisible'){
            this.setState({MailVisible: false})
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
            } else if(name === 'Distribute'){
                this.setState({DistributeVisible: true})
            } else if(name === 'Mail'){
                this.setState({MailVisible: true})
            }
        }


        return (
            <div className={style.main}>
                <div className={style.search}>
                    <Search />
                </div>
                <div className={style.tabMenu}>
                    <SelectProjectBtn />
                    {
                        topTags.map((Component, i) => {
                            if (i == 1) {
                                return <div key={i}> <Divider type="vertical" /> <Component onClickHandle={showFormModal} /></div>
                            }

                            return <Component key={i} onClickHandle={showFormModal} />
                        })
                    }
                </div>

                {/* 上传文档 */}
                <UploadDoc modalVisible={this.state.UploadVisible} handleOk={this.handleOk} handleCancel={this.handleCancel} />
                {/* 发布 */}
                <Publicd modalVisible={this.state.PublicdVisible} handleOk={this.handleOk} handleCancel={this.handleCancel} />
                {/* 分发 */}
                <Distribute modalVisible={this.state.DistributeVisible} handleOk={this.handleOk} handleCancel={this.handleCancel} />
                {/* 升版 */}
                <Upgrade modalVisible={this.state.UpgradeVisible} handleOk={this.handleOk} handleCancel={this.handleCancel} />
                {/* 邮件 */}
                <Mail modalVisible={this.state.MailVisible} handleOk={this.handleOk} handleCancel={this.handleCancel}/>

            </div>

        )
    }
}

export default DocTempDoc
