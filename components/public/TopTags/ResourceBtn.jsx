/*
 * @Author: wihoo.wanghao
 * @Date: 2019-01-17 11:35:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-14 16:25:09
 */

import React from 'react'
import style from './style.less'
import { Menu, Dropdown, Icon, Spin } from 'antd'

class ResourceBtn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "人力资源"
        }
    }
    onClickHandle=(title)=>{
        console.log(title)
            this.setState({
                title:title
            },()=>{
                this.props.onClickHandle('ResourceBtn',title)
            })

    }
    render() {

        const menu = (
            <Menu>
                {
                    !(this.state.title == "人力资源") &&
                    <Menu.Item onClick={this.onClickHandle.bind(this, '人力资源')}>
                        <a href="#">人力资源</a>
                    </Menu.Item>
                }
                {
                    !(this.state.title == "设备资源") &&
                    <Menu.Item onClick={this.onClickHandle.bind(this, '设备资源')}>
                        <a href="#">设备资源</a>
                    </Menu.Item >
                }
                {
                    !(this.state.title == "材料资源") &&
                    <Menu.Item onClick={this.onClickHandle.bind(this, '材料资源')}>
                        <a href="#">材料资源</a>
                    </Menu.Item>
                }

            </Menu>
        );
        return (
            <span  className={`topBtnActivity ${style.main}`}>
                <Icon type="drag" />
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#"> {this.state.title} <Icon type="down" /></a>
                </Dropdown>
            </span>
        )
    }
}

export default ResourceBtn
