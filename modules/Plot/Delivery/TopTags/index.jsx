/*
 * @Author: wihoo.wanghao 
 * @Date: 2019-01-17 11:43:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-14 17:35:39
 */

import React, { Component } from 'react'
import { Divider } from 'antd';
import AddPBSBtn from "../../../../components/public/TopTags/AddPBSBtn"
import AddDeliveryBtn from "../../../../components/public/TopTags/AddDeliveryBtn"
import DeleteTopBtn from "../../../../components/public/TopTags/DeleteTopBtn"
import MoveTDTopBtn from "../../../../components/public/TopTags/MoveTDTopBtn"
import CompleteBtn from "../../../../components/public/TopTags/CompleteBtn"
import PublicTopBtn from "../../../../components/public/TopTags/PublicTopBtn"

import Search from '../../../../components/public/Search'
import style from './style.less'
import AddModal from "../AddModal"
import SelectProjectBtn from "../SelectProjectBtn"
export class PlanDefineTopTags extends Component {
    constructor (props) {
        super(props)
        this.state = {
            roleBtnData: [
               
                {
                    id: 2,
                    name: 'AddPBSBtn',
                    aliasName: '新增PBS'
                },
                {
                    id: 3,
                    name: 'AddDeliveryBtn',
                    aliasName: '新增交付物'
                },
                {
                    id:4,
                    name: 'DeleteTopBtn',
                    aliasName: '删除'
                },
                {
                    id: 5,
                    name: 'MoveTDTopBtn',
                    aliasName: '移动'
                },
                {
                    id: 6,
                    name: 'PublicTopBtn',
                    aliasName: '发布'
                }
            ]
        }
    }
    onClickHandle=(name,menu)=>{
        if(name === 'AddPBSBtn') {
          
            this.setState({
                showAddModal: true,
                modalTitile: menu
            })
            
        }
        if(name=="AddDeliveryBtn"){
            this.setState({
                showAddModal: true,
                modalTitile: "新增交付物"
            })
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
                    <Search />
                </div>
                <div className={style.tabMenu}>
                    <SelectProjectBtn onClickHandle={this.onClickHandle} ></SelectProjectBtn>
                    <AddPBSBtn onClickHandle={this.onClickHandle}/>
                    <AddDeliveryBtn onClickHandle={this.onClickHandle}/>
                    <DeleteTopBtn onClickHandle={this.onClickHandle}/>
                    <MoveTDTopBtn onClickHandle={this.onClickHandle}/>
                    <Divider type="vertical" />
                    <CompleteBtn onClickHandle={this.onClickHandle}/>
                    <PublicTopBtn onClickHandle={this.onClickHandle}/>
                 
                </div>
              {this.state.showAddModal && <AddModal title={this.state.modalTitile} visible={this.state.showAddModal} handleCancel={this.closeAddModal}/>}
            </div>
            
        )
    }
}

export default PlanDefineTopTags
