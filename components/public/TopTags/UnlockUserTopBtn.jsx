import React from 'react'
import style from './style.less'
import { Icon } from 'antd'

class UnlockUserTopBtn extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <span  className={`topBtnActivity ${style.main}`} onClick={this.props.onClickHandle.bind(this, 'UnlockUserTopBtn')}>
            <span> <img src='../../../static/icons/Sys/UnlockUserTopBtn.png' /> </span>
            <a className="ant-dropdown-link" href="#"> 解锁用户</a>
        </span>
      )
    }
  }

  export default UnlockUserTopBtn
