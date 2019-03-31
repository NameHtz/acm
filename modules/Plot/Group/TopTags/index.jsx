/*
 * @Author: wihoo.wanghao 
 * @Date: 2019-01-17 11:43:11 
 * @Last Modified by: wihoo.wanghao
 * @Last Modified time: 2019-01-17 15:04:28
 */

import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import Search from '../../../../components/public/Search'
import style from './style.less'
import AddSameLevel from "../AddSameLevel"
import { Modal } from 'antd'
import axios from '../../../../api/axios'
import { epsDel } from '../../../../api/api'
const confirm = Modal.confirm
export class PlanDefineTopTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            ]
        }
    }
    onClickHandle = (name) => {

        // 新增
        if (name == 'AddTopBtn') {
            this.setState({
                addSameLevel: true,
            })

        }

        //删除
        if (name == "DeleteTopBtn") {
            if (this.props.data) {
                axios.deleted(epsDel(this.props.data.id), {}, true).then(res => {
                    this.props.delData()
                })

            } else {
                notification.warning(
                    {
                        placement: 'bottomRight',
                        bottom: 50,
                        duration: 2,
                        message: '未选中数据',
                        description: '请选择数据进行操作'
                    }
                )
            }

        }
    }
    //取消新增同级
    closeAddSameLevel = () => {
        this.setState({
            addSameLevel: false,
        })
    }
    render() {
        let topTags = this.state.roleBtnData.map((v, i) => {
            return dynamic(import('../../../../components/public/TopTags/' + v.name))
        })

        return (
            <div className={style.main}>
                <div className={style.search}>
                    <Search />
                </div>
                <div className={style.tabMenu}>
                    {
                        topTags.map((Component, i) => {
                            return <Component key={i} onClickHandle={this.onClickHandle} />
                        })
                    }
                </div>
                {this.state.addSameLevel && <AddSameLevel handleCancel={this.closeAddSameLevel.bind(this)} visible={this.state.addSameLevel}
                    data={this.props.data} addData={this.props.addData} />}
            </div>

        )
    }
}

export default PlanDefineTopTags
