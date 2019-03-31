/*
 * @Author: wihoo.wanghao 
 * @Date: 2019-01-17 11:43:11 
 * @Last Modified by: wihoo.wanghao
 * @Last Modified time: 2019-03-18 11:43:48
 */

import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import AddRoleModal from '../AddRoleModal/index'
import { Modal, message } from 'antd';
import emitter from '../../../../api/ev'
import Search from '../../../../components/public/Search'

import style from './style.less'

const confirm = Modal.confirm

import axios from '../../../../api/axios';
import { roleAdd, roleUpdate, roleDelete } from '../../../../api/api';

export default class PlanDefineTopTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
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
                }
            ]
        }
    }

    btnClicks(name) {
        const { delSuccess, record } = this.props;
        if (name == 'AddTopBtn') {
            this.setState({ modalVisible: true })
        }
        if (name == 'DeleteTopBtn') {
            if (record) {
                axios.deleted(roleDelete, {data: [record.id]}).then(res => {
                    message.success('删除成功');
                    // 执行前端删除
                    delSuccess()
                })
            } else {
                message.warning('请选择数据');
            }

        }
    }

    onSubmit = (value) => {
        const data = {
            ...value
        }
        axios.post(roleAdd, data).then(res => {
            message.success('新增成功');
            this.setState({
                modalVisible: false
            })
            // 执行前端新增
            this.props.addSuccess(res.data.data);
        })
    }

    render() {
        let topTags = this.state.roleBtnData.map((v, i) => {
            return dynamic(import('../../../../components/public/TopTags/' + v.name))
        })
        const { modalVisible } = this.state
        return (
            <div className={style.main}>
                <div className={style.search}>
                    <Search />
                </div>
                <div className={style.tabMenu}>
                    {
                        topTags.map((Component, i, item) => {
                            return <Component key={i} onClickHandle={(item) => this.btnClicks(item)} />
                        })
                    }
                </div>

                <AddRoleModal visible={modalVisible} onCancel={() => this.setState({ modalVisible: false })} onSubmit={this.onSubmit} />
            </div>

        )
    }
}
