import React from 'react'
import style from './style.less'
import { Icon, Menu, Dropdown } from 'antd'

class PublicdTopBtn extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
        return (
            <span  className={`topBtnActivity ${style.main}`} onClick={this.props.onClickHandle.bind(this, 'PublicdTopBtn')}>
                <Icon type="copy" />
                <a className="ant-dropdown-link" href="#"> 发布</a>
            </span>
        )
    }
  }

  export default PublicdTopBtn
