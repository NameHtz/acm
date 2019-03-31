import React from 'react'
import style from './style.less'
import { Icon } from 'antd'

class CancelCollection extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <span className={`topBtnActivity ${style.main}`} onClick={this.props.onClickHandle.bind(this, 'CancelCollection')}>
            <Icon type="star" />
            <a className="ant-dropdown-link" href="#"> 取消收藏</a>
        </span>
      )
    }
  }

  export default CancelCollection
