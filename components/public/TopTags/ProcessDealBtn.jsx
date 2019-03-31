/*
 * @Author: wihoo.wanghao
 * @Date: 2019-01-17 11:35:16
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-22 13:49:06
 */

import React from 'react'
import { Icon } from 'antd';
import style from './style.less'
class ProcessDealBtn extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span  className={`topBtnActivity ${style.main}`} onClick={this.props.onClickHandle.bind(this, 'ProcessDealBtn')}>
         <Icon type="schedule" className={style.iconColor}/>
          <a className={style.iconColor} href="#"> 流程处理</a>
      </span>
    )
  }
}

export default ProcessDealBtn
