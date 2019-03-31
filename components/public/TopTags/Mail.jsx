import React from 'react'
import style from './style.less'
import { Icon } from 'antd'

class Mail extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <span  className={`topBtnActivity ${style.main}`} onClick={this.props.onClickHandle.bind(this, 'Mail')}>
           <span> <img src='../../../static/icons/Doc/Mail.png' /> </span>
            <a className="ant-dropdown-link" href="#"> 邮件</a>
        </span>
      )
    }
  }

  export default Mail
