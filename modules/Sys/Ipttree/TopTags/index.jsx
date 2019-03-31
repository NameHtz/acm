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

export class PlanDefineTopTags extends Component {
    constructor (props) {
        super(props)
        this.state = {
            roleBtnData: [
                {
                    id: 1,
                    name: 'ValidTopBtn',
                    aliasName: '有效'
                },
                {
                    id: 2,
                    name: 'ImportTopBtn',
                    aliasName: '导入'
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
    onClickHandle=(value,menu)=>{
        
    }
    render() {
        let topTags = this.state.roleBtnData.map((v, i) => {
            return dynamic(import('../../../../components/public/TopTags/' + v.name))
        })
         // 显示表单弹窗
    let showFormModal = () => {
        this.setState({
            modalVisible: true
        })
    }
        return (
            <div className={style.main}>
                <div className={style.search}>
                    <Search search={this.props.search} />
                </div>
                <div className={style.tabMenu}>
                    {/* {
                        topTags.map((Component, i) => {
                            return <Component key={i} onClickHandle={this.onClickHandle}/>
                        })
                    } */}
                </div>
                
                
            </div>
            
        )
    }
}

export default PlanDefineTopTags
