import React from 'react'
import style from './style.less'
import { Icon } from 'antd'

class TurnDSponTopBtn extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <span  className={`topBtnActivity ${style.main}`}>
            <Icon type="sync" />
            <a className="ant-dropdown-link" href="#"> 驳回到发起人</a>
        </span>
      )
    }
  }

  export default TurnDSponTopBtn
