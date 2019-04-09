/*
 * @Author: wihoo.wanghao 
 * @Date: 2019-01-17 11:43:11 
 * @Last Modified by: wihoo.wanghao
 * @Last Modified time: 2019-01-21 21:57:41
 */

import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Modal, message } from 'antd';
import Public from "../Public"
import Search from '../../../../components/public/Search'
import style from './style.less'
import Add from '../Add'

import { meetingActionDelete } from '../../../../api/api';
import axios from '../../../../api/api'


const confirm = Modal.confirm

export class PlanDefineTopTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
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
    handlePublicCancel = () => {
        this.setState({
            publicModalVisible: false
        })
    }

    //删除
    deleteMeetingAction = () => {
        let body = {

        }

        axios.deleted(meetingActionDelete, body).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
    }


    render() {
        let topTags = this.state.roleBtnData.map((v, i) => {
            return dynamic(import('../../../../components/public/TopTags/' + v.name))
        })

        // 显示表单弹窗
        let showFormModal = (name, e) => {
            console.log(name);
            let that = this
            // 新增
            if (name === 'AddTopBtn') {
                this.setState({
                    modalVisible: true,
                    modelTitle: '新增项目会议'
                })
                return
            }
            //发布
            if (name === 'PublicTopBtn') {
                // e.key 1发布计划 2发布审批
                this.setState({
                    publicModalVisible: true,
                    topSelectBtnType: e.key
                })
            }
            // 删除
            if (name === 'DeleteTopBtn') {

                return
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

            </div>

        )
    }
}

export default PlanDefineTopTags
