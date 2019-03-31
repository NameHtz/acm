/*
 * @Author: wihoo.wanghao 
 * @Date: 2019-01-17 11:43:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-01-25 11:17:47
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
                    name: 'ResourceBtn',
                    aliasName: '资源'
                },
                {
                    id: 2,
                    name: 'SetDateBtn',
                    aliasName: '设置日期'
                },
                {
                    id: 4,
                    name: 'OpenProjectBtn',
                    aliasName: '打开项目'
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
    onClickHandle=(name,title)=>{
       // 删除
       if(name === 'PerEquBtn') {
       
             
                
            }
        
    
       
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
                            return <Component key={i} onClickHandle={this.onClickHandle}/>
                        })
                    }
                </div>
                
                
            </div>
            
        )
    }
}

export default PlanDefineTopTags
