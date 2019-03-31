/*
 * @Author: wihoo.wanghao 
 * @Date: 2019-01-17 11:43:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-23 16:02:18
 */

import React, { Component } from 'react'
import Search from '../../../../components/public/Search'
import style from './style.less'
import { Divider } from 'antd';
import ResourceBtn from "../../../../components/public/TopTags/ResourceBtn"
import AddTopBtn from "../../../../components/public/TopTags/AddTopBtn"
import DeleteTopBtn from "../../../../components/public/TopTags/DeleteTopBtn"
import AddKindBtn from "../../../../components/public/TopTags/AddKindBtn"
import AddEquipBtn from "../../../../components/public/TopTags/AddEquipBtn"
import AddMaterialBtn from "../../../../components/public/TopTags/AddMaterialBtn"
import ImportTopBtn from "../ImportTopBtn/"
export class PlanDefineTopTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            select: true,
            view: "人力资源",
            roleBtnData: [
                {
                    id: 1,
                    name: 'ResourceBtn',
                    aliasName: '资源'
                },
                {
                    id: 2,
                    name: 'NewDropdownBtn',
                    aliasName: '新增(下拉)'
                },
                {
                    id: 3,
                    name: 'DeleteTopBtn',
                    aliasName: '删除'
                }

            ]
        }
    }
    // modal取消
    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }
    onClickHandle = (name, title) => {
        if(name=="ResourceBtn"){
            this.setState({
                view: title
            }, () => {
                this.props.onClickHandle(name, title)
            })
        }
    }
    render() {
        return (
            <div className={style.main}>
                <div className={style.search}>
                    <Search />
                </div>
                <div className={style.tabMenu}>

                    <ResourceBtn onClickHandle={this.onClickHandle} ></ResourceBtn>
                    <Divider type="vertical" />
                    {this.state.view == "人力资源" && <AddTopBtn onClickHandle={this.props.onClickHandle}></AddTopBtn>}
                    {this.state.view == "人力资源" && <ImportTopBtn onClickHandle={this.props.onClickHandle}></ImportTopBtn>}
                    {this.state.view != "人力资源" && <AddKindBtn onClickHandle={this.props.onClickHandle}></AddKindBtn>}
                    {this.state.view == "设备资源" && <AddEquipBtn onClickHandle={this.props.onClickHandle}></AddEquipBtn>}
                    {this.state.view == "材料资源" && <AddMaterialBtn onClickHandle={this.props.onClickHandle}></AddMaterialBtn>}
                    <DeleteTopBtn onClickHandle={this.props.onClickHandle}></DeleteTopBtn>
                </div>


            </div>

        )
    }
}

export default PlanDefineTopTags
