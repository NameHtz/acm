import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import Search from '../../../../../components/public/Search'
import style from './style.less'
import AddCalendar from "../AddCalendar"
import axios from '../../../../../api/axios'
import { calendarCopy, calendarDel } from '../../../../../api/api'

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
                    name: 'CopyTopBtn',
                    aliasName: '复制'
                },
                {
                    id: 3,
                    name: 'DeleteTopBtn',
                    aliasName: '删除'
                },
            ],
            modalVisible: false,
        }
    }
    handleCancel = (v) => {
        this.setState({
            modalVisible: false
        }, () => {
            this.props.calendarAdd(v)
        })

    }

    showFormModal = (name) => {
        // 新增文档模板按钮
        // console.log(name)
        if (name === 'AddTopBtn') {
            this.setState({
                modalVisible: true
            })
        } else if (name === 'CopyTopBtn') {
            if (this.props.copy) {
                axios.post(calendarCopy(this.props.copy.id), {}, true).then(res => {
                    res.data ? this.props.calendarAdd(res.data.data) : null
                })
            }

        } else if (name === 'DeleteTopBtn') {

            if (this.props.copy) {    //判断是否点击选择单行删除
                this.props.calendarDel.push(this.props.copy.id)
            }

            if (this.props.calendarDel.length) { //判断多选删除
                var id = this.props.delectData.join(",")
                axios.deleted(calendarDel(id), {}, true).then(res => {
                    this.props.del(this.props.calendarDel)
                })
            }

        }
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
                            return <Component key={key} onClickHandle={this.showFormModal} />
                        })
                    }
                </div>
                <AddCalendar visible={this.state.modalVisible} handleCancel={this.handleCancel.bind(this)} />

            </div>

        )
    }
}

export default PlanDefineTopTags
