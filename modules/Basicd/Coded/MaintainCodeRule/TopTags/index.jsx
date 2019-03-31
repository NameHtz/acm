import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import Search from '../../../../../components/public/Search'
import { notification } from 'antd';
import style from './style.less'
import AddOrModifyModal from "../ShowAddOrModifyModal"
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
                    name: 'ModifyTopBtn',
                    aliasName: '修改'
                },
                {
                    id: 3,
                    name: 'DeleteTopBtn',
                    aliasName: '删除'
                },
            ]
        }
    }
    onClickHandle = (name) => {
        if (name == "AddTopBtn") {
            this.setState({
                isShowAddOrModifyModal: true,
                modalTitle: "新增规则类型",
                type: "add"
            })
            return
        }
        if (name == "ModifyTopBtn") {
            if (this.props.data.length == 0) {
                notification.warning(
                    {
                        placement: 'bottomRight',
                        bottom: 50,
                        duration: 2,
                        message: '未选中数据',
                        description: '请选择数据进行操作'
                    }
                )
                return
            }
            if (this.props.data.length > 1) {
                notification.warning(
                    {
                        placement: 'bottomRight',
                        bottom: 50,
                        duration: 2,
                        message: '选中多条数据',
                        description: '请选择单条数据进行操作'
                    }
                )
                return
            }
            let vlaue = this.props.data[0]
            this.setState({
                isShowAddOrModifyModal: true,
                modalTitle: "修改规则类型",
                type: "modify",
                selectData: vlaue
            })
            return
        }
        if(name=="DeleteTopBtn"){
            if (this.props.data.length == 0) {
                notification.warning(
                    {
                        placement: 'bottomRight',
                        bottom: 50,
                        duration: 2,
                        message: '未选中数据',
                        description: '请选择数据进行操作'
                    }
                )
                return
            }
           
            this.props.deleteData()
        }
    }
    closeAddOrModifyModal = () => {
        this.setState({
            isShowAddOrModifyModal: false,

        })
    }
    render() {
        let topTags = this.state.roleBtnData.map((v, i) => {
            return dynamic(import('../../../../../components/public/TopTags/' + v.name))
        })



        return (
            <div className={style.main}>
                <div className={style.search}>
                    <Search />
                </div>
                <div className={style.tabMenu}>
                    {
                        topTags.map((Component, key) => {
                            return <Component key={key} onClickHandle={this.onClickHandle.bind(this)} />
                        })
                    }
                </div>
                {this.state.isShowAddOrModifyModal &&
                    <AddOrModifyModal
                        adddData={this.props.adddData}
                        updateData={this.props.updateData}
                        codeRule={this.props.codeRule}
                        title={this.state.modalTitle}
                        type={this.state.type}
                        selectData={this.state.selectData}
                        handleCancel={this.closeAddOrModifyModal.bind(this)}
                        visible={this.state.isShowAddOrModifyModal} />}

            </div>

        )
    }
}

export default PlanDefineTopTags
