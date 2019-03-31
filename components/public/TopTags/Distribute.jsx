import React from 'react'
import style from './style.less'
import { Icon } from 'antd'

class Distribute extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <span  className={`topBtnActivity ${style.main}`} onClick={this.props.onClickHandle.bind(this, 'Distribute')}>
                <span> <img src='../../../static/icons/Doc/Distribute.png' /> </span>
                <a className="ant-dropdown-link" href="#"> 分发</a>
            </span>
        )
    }
}

export default Distribute
