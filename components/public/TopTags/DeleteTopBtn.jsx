/*
 * @Author: wihoo.wanghao
 * @Date: 2019-01-17 11:35:25
 * @Last Modified by: wihoo.wanghao
 * @Last Modified time: 2019-01-27 15:32:40
 */

import React from 'react';
import {Icon, Popconfirm, Modal} from 'antd';
import style from './style.less';

const confirm = Modal.confirm;

//该组件，如需修改删除文字，请传入 this.props.deleteDesc 不传则显示默认文字
class DeleteTopBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  showDeleteConfirm = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  handleOk = () => {
    this.setState({
      visible: !this.state.visible
    })
    this.props.onClickHandle('DeleteTopBtn');
  }

  render() {
    return (
      <span>
           <span  className={`topBtnActivity ${style.main}`} onClick={this.showDeleteConfirm}>
             <span className="iconfont">&#xe614;</span>
             <a className="ant-dropdown-link" href="#"> 删除</a>
          </span>
           <Modal
             width={350}
             title="删除"
             visible={this.state.visible}
             onOk={this.handleOk}
             onCancel={this.showDeleteConfirm}
           >
          <p style={{textAlign: 'center', fontSize: 18, paddingTop: 10, paddingBottom: 10}}>
            <Icon type="warning"
                  style={{
                    fontSize: 30,
                    color: '#faad14'
                  }}/> &nbsp;{this.props.deleteDesc ? this.props.deleteDesc : '确认要删除此项吗？'}
          </p>
        </Modal>
      </span>
    );
  }
}

export default DeleteTopBtn;
