import React, { Component } from 'react'
import style from './style.less'
import { Menu, Icon } from 'antd';

export class RightClickMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roleVisible: false
        }
    }

    

    render() {
        const MenuItems = () => {
                
                return (
                    <Menu>
                        <Menu.Item onClick={this.props.handleClick.bind(this,"删除本机机构")}>
                            <Icon type="delete" />
                            删除本机机构
                        </Menu.Item>
                        <Menu.Item  onClick={this.props.handleClick.bind(this,"新增下级机构")}>
                            <Icon type="plus-square"/>
                             新增下级机构
                        </Menu.Item>
                        <Menu.Item onClick={this.props.handleClick.bind(this,"刷新")}>
                            <Icon type="reload" />
                            刷新
                        </Menu.Item>
                    </Menu>
                )
            


        }
        return (
            <div className={style.main} style={{ left: this.props.x, top: this.props.y }}>
                <div>
                    <MenuItems />
                </div>


            </div>

        )
    }
}

export default RightClickMenu