import React, {Component} from 'react';   //react引用
import {message} from 'antd';             //antd组件引用
import style from './index.less';        //css文件
import router from 'next/router';         //next路由
//登录模块
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',    //用户名
      password: '',    //密码
    }
  }
  //获取input内容，设置用户名、密码value
  getInputValue = (type, e) => {
    if(type =='userName'){
      this.setState({
        userName: e.target.value ? e.target.value : ''
      })
    }else {
      this.setState({
        password: e.target.value ? e.target.value : ''
      })
    }
  }
  //提交登录   发送事件callBackLogin(data)
  loginSubmit = () => {
    if (this.state.userName == '') {
      message.error('请输入用户名')
      return;
    }
    if(this.state.passWord ==''){
      message.error('请输入密码')
      return;
    }
    var data={}
    data.userName = this.state.userName
    data.password = this.state.password
    this.props.callBackLogin(data);
  }
  render() {
    return (
      <div className={style.main}>
        <div className={style.loginItem}>
          <input placeholder="请输入用户名" onChange={this.getInputValue.bind(this, 'userName')}/>
        </div>
        <div className={style.loginItem}>
          <input placeholder="请输入密码" type="password" onChange={this.getInputValue.bind(this, 'password')}/>
        </div>
        <div className={style.loginSub} onClick={this.loginSubmit}>登录</div>
      </div>
    )
  }
}

export default Login
