import React from 'react'
import style from './style.less'
import { Icon } from 'antd'

class CompleteMessage extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <span className={`topBtnActivity ${style.main}`} onClick={this.props.onClickHandle.bind(this, 'CompleteMessage')}>
           <Icon type="file-text" />
            <a className="ant-dropdown-link" href="#"> 完善信息</a>
        </span>
      )
    }
  }

  export default CompleteMessage
