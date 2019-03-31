import React from 'react'
import style from './style.less'
import { Icon } from 'antd'

class DownloadTopBtn extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <span   className={`topBtnActivity ${style.main}`}>
            <Icon type="download" />
            <a className="ant-dropdown-link" href="#"> 下载</a>
        </span>
      )
    }
  }

  export default DownloadTopBtn
