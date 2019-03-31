import React, { Component } from 'react'
import { Divider, notification } from 'antd';
import Search from '../../../../components/public/Search'
import AddTopBtn from "../../../../components/public/TopTags/AddTopBtn"
import DeleteTopBtn from "../../../../components/public/TopTags/DeleteTopBtn"
import MoveTDTopBtn from "../../../../components/public/TopTags/MoveTDTopBtn"
import PlotPublicTopBtn from "../../../../components/public/TopTags/PlotPublicTopBtn"
import ClosedTopBtn from "../../../../components/public/TopTags/ClosedTopBtn"
import style from './style.less'
import AddModal from "../AddModal"
import axios from '../../../../api/axios'
import { planDel, prepaRelease } from '../../../../api/api'


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
                },
                {
                    id: 4,
                    name: "PlotPublicTopBtn",
                    aliasName: '发布'
                },
                {
                    id: 5,
                    name: "ClosedTopBtn",
                    aliasName: '关闭'
                }
            ]
        }
    }
    //头部操作按键调用函数
    onClickHandle = (name) => {
        console.log(name)
        // 新增
        if (name == "AddTopBtn") {
            this.setState({
                showAddModal: true
            })
        } else if (name == 'DeleteTopBtn') { //删除

            if (this.props.data) {    //判断是否有删除数据

                axios.deleted(planDel(this.props.data.id), {}, true).then(res => {
                    this.props.del(this.props.data.id)
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

        } else if (name == 'direct') {

            let data = this.props.data;
            if (data) {
                axios.post(prepaRelease(data.id), {}, true).then(res => {
                    console.log(res)
                })
            }

        }
    }
    closeAddModal = () => {
        this.setState({
            showAddModal: false
        })
    }

    search = (val) => {
        this.props.search(val)
    }

    render() {
        return (
            <div className={style.main}>
                <div className={style.search}>
                    <Search search={this.search} />
                </div>
                <div className={style.tabMenu}>
                    <AddTopBtn onClickHandle={this.onClickHandle} />
                    <DeleteTopBtn onClickHandle={this.onClickHandle} />
                    <MoveTDTopBtn onClickHandle={this.onClickHandle} />
                    <Divider type="vertical" />
                    <PlotPublicTopBtn onClickHandle={this.onClickHandle} />
                    <Divider type="vertical" />
                    <ClosedTopBtn onClickHandle={this.onClickHandle} />
                </div>
                {this.state.showAddModal && <AddModal title="新增立项" handleCancel={this.closeAddModal.bind(this)} addData={this.props.addData}></AddModal>}
            </div>

        )
    }
}

export default PlanDefineTopTags
