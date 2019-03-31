/*
 * @Author: wihoo.wanghao 
 * @Date: 2019-01-17 11:43:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-01-26 11:09:01
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
                    name: 'BackBtn',
                    aliasName: '还原'
                },
                {
                    id: 2,
                    name: 'DeleteTopBtn',
                    aliasName: '删除'
                }
                
            ],
            modalVisible: false,
            modelTitle:'',
        }
    }
    // modal取消
    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }
    //
    handleOk = () => {
        this.setState({
            modalVisible: true
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
                    <Search />
                </div>
                <div className={style.tabMenu}>
                    {
                        topTags.map((Component, i) => {
                            return <Component key={i} onClickHandle={this.onClickHandle}/>
                        })
                    }
                </div>
             
            </div>
            
        )
    }
}

export default PlanDefineTopTags
