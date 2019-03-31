import React, { Component } from 'react';
import style from './style.less';
import intl from 'react-intl-universal';
import { Icon, Menu, Layout, DatePicker, Button, Input, Table, Select } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import AccessTable from './Components/AccessTable';
import SysAgreement from './Components/SysAgreement';
import Log from "./Components/Log"
import PasswardInfos from './Components/PasswardInfo';


//接口引入
import axios from '../../../api/axios';
import { tmmAuditlist, tmmDelete, tmmList } from '../../../api/api';
/* *********** 引入redux及redux方法 start ************* */
import { connect } from 'react-redux';
import store from '../../../store';
import { saveCurrentData, resetRightCurrentData } from '../../../store/rightData/action';
import { curdCurrentData, resetCurrentData } from '../../../store/curdData/action';
import { changeLocaleProvider } from '../../../store/localeProvider/action';
/* *********** 引入redux及redux方法 end ************* */
const locales = {
  'en-US': require('../../../api/language/en-US.json'),
  'zh-CN': require('../../../api/language/zh-CN.json'),
};
const { Content, Sider } = Layout;
const { MonthPicker, RangePicker } = DatePicker;
const Search = Input.Search;
const Option = Select.Option;
export class Threeme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initDone: false,
      //是否同意
      isagree: false,
      visible: false,
      visible1: false,
      currentPageNum: 1,
      pageSize: 10,
      confirmLoading: false,
      //菜单选位置
      currentIndex: 1,
      operatetime: '',
      //被删除的id
      params: [],
    };
    /* *********** 添加监听redux中store变化 start ************* */
    store.subscribe(() => {
      let storeState = store.getState();
      if (localStorage.getItem('name') == storeState.curdData.title) {
        if (storeState.curdData.status != '') {
          this.curdData(storeState.curdData.status, storeState.curdData.data);
        }
      }
    });
    /* *********** 添加监听redux中store变化 end ************* */
  }

  /**
   * curd data数据
   * @param {*} status curd
   * @param {*} data curd
   */
  curdData = (status, data) => {
    // 新增
    if (status == 'add') {
      alert(JSON.stringify(data));
    }

    // 修改
    if (status == 'update') {
      alert(JSON.stringify(data));
    }

    // 删除
    if (status == 'delete') {
      alert(JSON.stringify(data));
    }
    this.props.resetCurrentData();
    //let tempData
    // this.setState({
    //     width: this.props.width,
    //     data: tempData
    // })
  };

  componentDidMount() {
    this.loadLocales();
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(userInfo.isOpen==1){
      this.setState({
        isagree:true
      })
    }
    
   
  }

  loadLocales() {
    intl
      .init({
        currentLocale: this.props.currentLocale.currentLocale,
        locales,
      })
      .then(() => {
        // After loading CLDR locale data, start to render
        this.setState({ initDone: true });
      });
  }

  
 
  //数据搜索事件
  datSearch = e => {
    console.log(e);
    const body = {
      srartTime: '',
      endTime: '',
      searcher: '',
      thisTime: '',
    };
    axios
      .post(tmmAuditlist, {}, true)
      .then(res => {
        console.log(res);
      })
      // .then(res=> this.data)
      .catch(err => {
        console.log('查询不到所输入的信息');
      });
  };
  ishasagree() {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!this.state.isagree){
      userInfo.isOpen=1
    }else{
      userInfo.isOpen=0
    }
    sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
      this.setState((prevState, props) => ({
        isagree: !prevState.isagree,
      }));
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  showModal1 = () => {
    this.setState({
      visible1: true,
    });
  };
  
  handleOk1 = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible1: false,
        confirmLoading: false,
      });
    }, 2000);
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancel1 = e => {
    console.log(e);
    this.setState({
      visible1: false,
    });
  };
  //删除ip
  deleteSuccess = row => {
    let params = [];
    row.forEach(item => {
      params.push(item.id);
    });
    this.setState({
      params: params,
    });
  };
  delete = () => {
    // console.log("删除");
    if (!this.state.params.length) {
      return;
    }
    
    axios
      .deleted(tmmDelete, this.state.params, true)
      .then(res => {
        console.log('删除成功', res);
      })
      .catch(res => {
        console.log(res);
      });
  };

  onchangeCurrentIndex(index) {
    this.setState({
      currentIndex: index,
    });
  }

  render() {
    
    // const data = [{
    //   key: '1',
    //   id: '1',
    //   name: 'John Brown',
    //   date: "2018-01-02",
    //   module: 'New York',
    //   operatetime: "2018-01-22",
    //   operate: "日志查询",
    //   operator: "audit安全审计员",
    //   ip: "127.237.148.156",
    //   describe: "查询日志十一条",
    //   result: "成功",
    //   error: "--"
    // },
    // {
    //   key: '2',
    //   id: '1',
    //   name: 'John Brown',
    //   date: "2018-01-02",
    //   module: 'New York',
    //   operatetime: "2018-01-22",
    //   operate: "日志查询",
    //   operator: "audit安全审计员",
    //   ip: "127.237.148.156",
    //   describe: "查询日志十一条",
    //   result: "成功",
    //   error: "--"
    // },
    // {
    //   key: '3',
    //   id: '1',
    //   name: 'John Brown',
    //   date: "2018-01-02",
    //   module: 'New York',
    //   operatetime: "2018-01-22",
    //   operate: "日志查询",
    //   operator: "audit安全审计员",
    //   ip: "127.237.148.156",
    //   describe: "查询日志十一条",
    //   result: "成功",
    //   error: "--"
    // }];

    const formItemLayout3 = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    const buttonItemLayout = {
      wrapperCol: { span: 14, offset: 2 },
    };
    let height = this.props.height + 40;
    return (
      <div className={style.main} style={{ height }}>
        {!this.state.isagree && (
          //协议模块
          <SysAgreement isagree={this.state.isagree} ishasagree={this.ishasagree.bind(this)} />
        )}

        {this.state.isagree && (
          <Layout className={style.setroleMain} style={{ height: '100%' }}>
            <Sider width={200} style={{ background: '#fff', height: '100%' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <Menu.Item key="1" onClick={this.onchangeCurrentIndex.bind(this, 1)}>
                  状态管理
                </Menu.Item>
                <Menu.Item key="2" onClick={this.onchangeCurrentIndex.bind(this, 2)}>
                  操作审计
                </Menu.Item>
                <Menu.Item key="3" onClick={this.onchangeCurrentIndex.bind(this, 3)}>
                  访问设置
                </Menu.Item>
                <Menu.Item key="4" onClick={this.onchangeCurrentIndex.bind(this, 4)}>
                  密码设置
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Content
                style={{
                  background: '#fff',
                  padding: '0 24px',
                  margin: 0,
                  minHeight: 280,
                }}
              >
                {/* 状态管理 */}
                {this.state.currentIndex == 1 && (
                  <div className={style.setroleState}>
                    {this.state.isagree && (
                      //协议模块
                      <SysAgreement
                        isagree={this.state.isagree}
                        ishasagree={this.ishasagree.bind(this)}
                      />
                    )}
                  </div>
                )}
                {/* 操作审计 */}
                {this.state.currentIndex == 2 && (
                  <div className={style.setroleAudit}>
                   
                  <Log></Log>
                  </div>
                )}
                {/* 访问设置 */}
                {this.state.currentIndex == 3 && (
                  <div className={style.setroleAccess}>
                   
                    {/* {访问表单} */}
                    <AccessTable deleteFn={this.deleteSuccess.bind(this)} />
                  
                  </div>
                )}
                {/* 密码设置 */
                this.state.currentIndex == 4 && (
                  <div className={style.setrolePassword}>
                    {/* {passward表单} */}
                    <PasswardInfos />
                  </div>
                )}
              </Content>
            </Layout>
          </Layout>
        )}
      </div>
    );
  }
}

/* *********** connect链接state及方法 start ************* */
export default connect(
  state => ({
    currentLocale: state.localeProviderData,
  }),
  {
    saveCurrentData,
    curdCurrentData,
    resetRightCurrentData,
    resetCurrentData,
    changeLocaleProvider,
  }
)(Threeme);
/* *********** connect链接state及方法 end ************* */
