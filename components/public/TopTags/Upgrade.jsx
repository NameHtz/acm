import React from 'react'
import style from './style.less'
import { Icon } from 'antd'

class Upgrade extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <span  className={`topBtnActivity ${style.main}`} onClick={this.props.onClickHandle.bind(this, 'Upgrade')}>
           <span> <img src='../../../static/icons/Doc/Upgrade.png' /> </span>
            <a className="ant-dropdown-link" href="#"> 升版</a>
        </span>
      )
    }
  }

  export default Upgrade
