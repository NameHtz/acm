import React from 'react'
import style from './style.less'
import { Icon } from 'antd'

class CancelPublicTopBtn extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <span className={`topBtnActivity ${style.main}`}>
            <Icon type="rollback" />
            <a className="ant-dropdown-link" href="#"> 取消发布</a>
        </span>
      )
    }
  }

  export default CancelPublicTopBtn
