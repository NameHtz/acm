import React, {Component} from 'react'
import style from './style.less'
import Header from '../../components/public/HeaderEps/index'   //头部组件，包含菜单
// import MainBox from '../../components/public/Main/index'       //主模块
import HomeBox from '../../modules/Index/index'
import {Table, Tabs} from 'antd';
import router from 'next/router'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import axios from '../../api/axios'
const TabPane = Tabs.TabPane;
import { connect } from 'react-redux';
// import { changeMenuData } from '../../store/menuData/action';
import {bindActionCreators} from 'redux';
import * as sysMenuAction from '../../store/sysMenu/action';
var CryptoJS = require("crypto-js");
var CRYPTOJSKEY = CryptoJS.enc.Utf8.parse("wisdom!QAZ!@#123");


class Home extends React.Component {
  constructor(props) {
    super(props)
    const panes = [                                   //tab集合，默认加载首页，不可关闭页签
      {title: '首页', content: <HomeBox fileUrl='Index'/>, key: '1', closable: false,parentId:0},
    ];
    this.state = {
      panes: panes,                                               //tab集合
      activeKey: panes[0].key,                                    //tab当前显示位置
      activityId:'',
    }
  }

  encrypt = (word) => {
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, CRYPTOJSKEY, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  decrypt = (word) => {
    var decrypt = CryptoJS.AES.decrypt(word, CRYPTOJSKEY, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
  componentDidMount() {

    // var data = {"id": 1,
    //   "userName": "userName100",
    //   "actuName": "actuName100",
    //   "sex": 9999,
    //   "phone": "phone100",
    //   "cardType": "cardType100",
    //   "cardNum": "cardNum100",
    //   "birth": "2019-12-12",
    //   "entryDate": "2019-12-12",
    //   "quitDate": "2019-12-12",
    //   "level": "level100",
    //   "sort": 9999,
    //   "staffStatus": 9999,
    //   "roles": [1,2],
    //   "orgId": 9999}
    //
    // var info = this.encrypt(JSON.stringify(data));
    // axios.post('api/sys/encrypt/save', info).then(res=>{
    //   console.log(this.decrypt(res))
    // })



    localStorage.setItem('name','首页')
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    if(!userInfo){
      router.push('/login')
      return
    }
    this.props.actions.setSysMenu(userInfo.menus)
  }
  //监听导航栏操作，添加页签 name=当前菜单名称，ComponentName=模块文件位置
  callBackBanner = (menuInfo) => {
    //判断是否已存在，如存在，切换tab当前点击元素位置
    localStorage.setItem('name',menuInfo.menuName)
    for (var i = 0; i < this.state.panes.length; i++) {
      if (menuInfo.menuName == this.state.panes[i].title) {
        this.setState({
          activeKey: this.state.panes[i].key.toString(),
        })
        return;
      }
    }
    const ComponentNames = dynamic(() => import('../../components/public/Main/index'))
    const panes = this.state.panes;
    const activeKey =  menuInfo.id;
    panes.push({title: menuInfo.menuName, content: <ComponentNames menuInfo={menuInfo} callBackBanner={this.callBackBanner}/>, key: activeKey.toString(),parentId:menuInfo.parentId});
    this.setState({
      panes: panes,
      activeKey: activeKey.toString(),
      activityId:menuInfo.parentId
    });
  }

  //操作当前tab
  onChangeTab = (activeKey) => {
    this.setState({activeKey});
    for (var i = 0; i < this.state.panes.length; i++) {
      if (activeKey == this.state.panes[i].key) {
        this.setState({
          activityId: this.state.panes[i].parentId
        })
        localStorage.setItem('name',this.state.panes[i].title)
        return
      }
    }

  }
  //关闭当前tab
  onEdit = (targetKey, action) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
        this.setState({
          activityId: this.state.panes[lastIndex].parentId
        })
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
      this.setState({
        activityId: this.state.panes[lastIndex].parentId
      })
      localStorage.setItem('name',panes[lastIndex].title)
    }
    this.setState({panes, activeKey});
  }

  render() {
    return (
      <div className={style.main}>
        <Header callBackBanner={this.callBackBanner} menuData={this.props.menuData} activityId={this.state.activityId}/>
        <Tabs tabPosition="bottom"
              onChange={this.onChangeTab}
              hideAdd={true}
              type="editable-card"
              onEdit={this.onEdit}
              activeKey={this.state.activeKey}
              tabBarGutter={0}
              animated={true}
        >
          {this.state.panes.map(pane =>
            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // currentLocale: state.localeProviderData,
    // menuData: state.menuData,
    // record:state.sysMenu.record,
    menuData:state.sysMenu.menuData,
  }
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, sysMenuAction), dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default connect(state=>({
//   menuData: state.menuData
// }),{changeMenuData})(Home)

