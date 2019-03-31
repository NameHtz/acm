import React from 'react'
import style from './style.less'
import { Icon, Popconfirm } from 'antd'

class CancelApproveTopBtn extends React.Component {
  constructor(props) {
    super(props)
  }

  confirm = () => {
    this.props.onClickHandle('CancelApproveTopBtn');
  };

  render() {
    return (
      <span  className={`topBtnActivity ${style.main}`}>
          <Icon type="rollback" />
          <a className="ant-dropdown-link" href="javascript:void(0);"> 取消批准</a>
        </span>
      )
  }
}

export default CancelApproveTopBtn
