
import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Modal, message, Divider  } from 'antd';
import Search from '../../../../components/public/Search'
import style from './style.less'
import UploadDoc from '../Upload/index'
import CompleteMessage from '../CompleteMessage/index'

const confirm = Modal.confirm

export class DocTempDoc extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            UploadVisible: false,
            ComMessageVidible: false,
            roleBtnData: [
                {
                    id: 1,
                    name: 'UploadTopBtn',
                    aliasName: '上传'
                },
                {
                    id: 2,
                    name: 'CompleteMessage',
                    aliasName: '完善信息'
                },
                {
                    id: 3,
                    name: 'DeleteTopBtn',
                    aliasName: '删除'
                },
                {
                    id: 4,
                    name: 'DownloadTopBtn',
                    aliasName: '下载'
                }
            ],
            planDefineSelectData: []
        }
    }


    // modal取消
    handleCancel = (v) => {
        if(v === 'UploadVisible'){
            this.setState({
                UploadVisible: false
            })
        } else if(v === 'ComMessageVidible'){
            this.setState({
                ComMessageVidible: false
            })
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

                    }
                });
            }

            if(name === 'UploadTopBtn'){
                this.setState({
                    UploadVisible: true
                })
            }

            if(name === 'CompleteMessage'){
                this.setState({
                    ComMessageVidible: true
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
                        topTags.map((Component,i) => {
                            if(i==3){
                                return <div key={i}> <Divider type="vertical" /> <Component onClickHandle={showFormModal} /></div>
                            }
                            return <Component key={i} onClickHandle={showFormModal} />
                        })
                    }
                </div>
                
                {/* 上传文件 */}
                <UploadDoc modalVisible={this.state.UploadVisible} handleOk={this.handleOk} handleCancel={this.handleCancel} />
                {/* 完善信息 */}
                <CompleteMessage modalVisible={this.state.ComMessageVidible} handleOk={this.handleOk} handleCancel={this.handleCancel} />

            </div>

        )
    }
}

export default DocTempDoc
