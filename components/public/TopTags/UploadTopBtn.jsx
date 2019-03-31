import React from 'react'
import style from './style.less'
import { Icon } from 'antd'

class UploadTopBtn extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <span  className={`topBtnActivity ${style.main}`} onClick={this.props.onClickHandle.bind(this, 'UploadTopBtn')}>
            <Icon type="upload" />
            <a className="ant-dropdown-link" href="#"> 上传</a>
        </span>
      )
    }
  }

  export default UploadTopBtn
