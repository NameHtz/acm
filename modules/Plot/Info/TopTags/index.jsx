/*
 * @Author: wihoo.wanghao 
 * @Date: 2019-01-17 11:43:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-14 17:35:39
 */

import React, { Component } from 'react'
import { Divider } from 'antd';
import Search from '../../../../components/public/Search'
import style from './style.less'
import AddModal from "../AddModal"
import TreeTileViewBtn from "../../../../components/public/TopTags/TreeTileViewBtn"
import AddTopBtn from "../../../../components/public/TopTags/AddTopBtn"
import DeleteTopBtn from "../../../../components/public/TopTags/DeleteTopBtn"
import MoveTDTopBtn from "../../../../components/public/TopTags/MoveTDTopBtn"
import CopyTopBtn from "../../../../components/public/TopTags/CopyTopBtn"
import axios from "../../../../api/axios"
import {deleteprolist} from "../../../../api/api"
export class PlanDefineTopTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roleBtnData: [
                {
                    id: 1,
                    name: "TreeTileViewBtn",
                    aliasName: "平铺树状切换"
                },
                {
                    id: 2,
                    name: 'AddTopBtn',
                    aliasName: '新增'
                },
                {
                    id: 3,
                    name: 'DeleteTopBtn',
                    aliasName: '删除'
                },
                {
                    id: 4,
                    name: 'MoveTDTopBtn',
                    aliasName: '移动'
                },
                {
                    id: 5,
                    name: 'CopyTopBtn',
                    aliasName: '复制'
                }
            ]
        }
    }
    onClickHandle = (name, menu) => {
        if (name === 'TreeTileViewBtn') {

            this.props.onClickHandle(menu)
            return
        }
        if (name == "AddTopBtn") {
            this.setState({
                showAddModal: true
            })
            return
        }
        if(name=="DeleteTopBtn"){
           
           this.props.deleteData()
        }
    }
    closeAddModal = () => {
        this.setState({
            showAddModal: false
        })
    }
    render() {


        return (
            <div className={style.main}>
                <div className={style.search}>
                    <Search search={this.props.search}/>
                </div>
                <div className={style.tabMenu}>
                    <TreeTileViewBtn onClickHandle={this.onClickHandle} />
                    <Divider type="vertical" />
                    <AddTopBtn onClickHandle={this.onClickHandle} />
                    <DeleteTopBtn onClickHandle={this.onClickHandle} />
                    <MoveTDTopBtn onClickHandle={this.onClickHandle} />
                    <Divider type="vertical" />
                    <CopyTopBtn onClickHandle={this.onClickHandle} />

                </div>
                {this.state.showAddModal && <AddModal title="新增项目信息"
                 handleCancel={this.closeAddModal.bind(this)} 
                 view={this.props.view} 
                 addprojectinfo={this.props.addprojectinfo}
                 data={this.props.data}></AddModal>}
            </div>

        )
    }
}

export default PlanDefineTopTags
