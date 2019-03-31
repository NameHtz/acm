import React from 'react'
import style from './style.less'
import { Icon, Menu, Dropdown } from 'antd'

class TasksTopBtn extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
        const menu = (
            <Menu onClick={this.props.onClickHandle.bind(this, 'TasksTopBtn')}>
                <Menu.Item key="1">
                    <Icon type="plus" />新增作业任务
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="plus" />新增开始里程碑任务
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="plus" />新增完成里程碑任务
                </Menu.Item>
            </Menu>
        );
        return (
            <span  className={`topBtnActivity ${style.main}`}>
                <Icon type="copy" />
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#"> 任务  <Icon type="caret-down" /></a>
                </Dropdown>
            </span>
        )
    }
  }

  export default TasksTopBtn
