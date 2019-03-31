import React, {Component} from 'react'
import style from './index.less'
import axios from '../../api/axios'
import router from 'next/router'
import LoginTpl from "../../components/Login/index";    //登录模块
import {getToken,getUserInfo} from "../../api/api";     //
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as sysMenuAction from '../../store/sysMenu/action';
//登录页面
class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  //回调监听 提交登录接口
  callBackLogin=(data)=>{
    axios.post(getToken,data).then(res=>{                 //获取token
      sessionStorage.setItem('token',res.data.data)       //token存储到sessionStorage
      this.props.actions.getSysMenu().then(res=>{                  //获取用户信息、我的项目、菜单
        sessionStorage.setItem('userInfo',JSON.stringify(res))
        router.push('/home')
      })
    })
   
  }
componentDidMount(){
  
}

  render() {
    
    return (
      <div className={style.main}>
        <div className={style.mmp}>
          <div className={style.loginBox}>
            <div className={style.logo}>
              <img src="/static/images/logo.gif"/>
            </div>
            <div className={style.loginForm}>
              <h1>敏捷协同管理平台</h1>
              <span>Agile Cooperation Management</span>
              {/*登录模块*/}
              <LoginTpl callBackLogin={this.callBackLogin}/>
            </div>
          </div>
        </div>
        <style global jsx>{`
          body {
            background-color: #EFEFEF;
          }
    `}</style>
      </div>
    )
  }
}
// export default Login

const mapStateToProps = state => {
  return {
    // currentLocale: state.localeProviderData,
    // menuData: state.menuData,
    // record:state.sysMenu.record,
  }
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, sysMenuAction), dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);