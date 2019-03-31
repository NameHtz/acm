import React, { Component } from 'react'
import intl from 'react-intl-universal'
import style from './style.less'

import _ from 'lodash'
import { Table, Spin } from 'antd'
import dynamic from 'next/dynamic'
import MyTable from "../../../components/Table"
//引入第三方组件
import Import from "./Import"
import NewNextAgency from './NewNextAgency/index'
import RightClickMenu from "./RightClickMenu"
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
/* *********** 引入redux及redux方法 start ************* */
import { connect } from 'react-redux'//将store的指定属性，方法注入到组件的this.props中
import store from '../../../store'//取出初始化的store文件

import { saveCurrentData, resetRightCurrentData } from '../../../store/rightData/action'
import { curdCurrentData, resetCurrentData } from '../../../store/curdData/action'
import { changeLocaleProvider } from '../../../store/localeProvider/action'
/* *********** 引入redux及redux方法 end ************* */
// 接口引入
import axios from '../../../api/axios';
import { iptTree, iptDelete, iptTreeSearch } from '../../../api/api';
//处理函数
import * as util from '../../../utils/util';
//国际化处理
const locales = {
  "en-US": require('../../../api/language/en-US.json'),
  "zh-CN": require('../../../api/language/zh-CN.json')
}

class TableComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      record: {},
      initDone: false,//是否国际化
      activeIndex: "",
      rightData: null,
      rightTags: [
        { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Sys/Ipttree/Agency' },
        { icon: 'iconyuangongliebiao', title: '员工信息', fielUrl: 'Sys/Ipttree/Staff' },
      ],
      nextAgency: false,//新增下级机构
      importMod: false,//从组织导入显隐
      rightClickShow: false,//右击菜单显隐
    }

  }




  componentDidMount() {
    document.addEventListener('click', this.closeRight)
    this.loadLocales();
    this.getTree();
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeRight, false);
  }

  closeRight = () => {
    this.setState({
      rightClickShow: false
    })
  }
  //搜索
  search = (value) => {

    if (value != null || value.trim() != "") {
      this.setState({
        searcher:value
      },()=>{
        this.getTree()
      })
     
    } else {
      this.setState({
        searcher:null
      },()=>{
        this.getTree()
      })
    }

  }
  //获取ipt全局树
  getTree = () => {
    
      if(this.state.searcher){
        axios.get(`${iptTreeSearch}?searcher=${this.state.searcher}`).then(res => {
          // console.log(res);
          const dataMap = util.dataMap(res.data.data);
          this.setState({
            data: res.data.data,
            dataMap,
          });
  
        });
      }else{
        axios.get(iptTreeSearch).then(res => {
          // console.log(res);
          const dataMap = util.dataMap(res.data.data);
          this.setState({
            data: res.data.data,
            dataMap,
          });
  
        });
      }
      
   
  }
  //新增
  addSuccess = (value) => {
    const { data, dataMap, rightData } = this.state;
    console.log(value);
    util.create(data, dataMap, rightData, value);
    this.setState({
      data,
      dataMap,
      roleVisible: false,
    });
  };
  //监听更新
  updateSuccess = (v) => {
    const { data, dataMap, rightData } = this.state;
    util.modify(data, dataMap, rightData, v);
    this.setState({
      data,
      rightData: v,
    });
  };

  //删除本机机构
  iptdelete = () => {
    // console.log(this.state.record.id);
    axios.deleted(iptDelete, { data: [this.state.record.id] }).then(res => {
      console.log("删除成功" + res);
      const { data, dataMap, rightData } = this.state;
      util.deleted(data, dataMap, rightData);
      this.setState({
        data,
        rightData: '',
      });

    })
      .catch(err => {
        console.log("删除失败" + err);
      })
  }
  //点击行事件
  getInfo = (record, index) => {
    //console.log(record);
    let id = record.id, records = record
    /* *********** 点击表格row执行更新state start ************* */
    if (this.state.activeIndex == id) {
      console.log("开始")
      id = ''
      records = null
      this.props.resetRightCurrentData()
    } else {
      console.log("结束")
    }
    /* *********** 点击表格row执行更新state end ************* */
    this.setState({
      activeIndex: id,
      rightData: record
    })
  }
  //	表格行的类名
  setClassName = (record, index) => {
    //判断索引相等时添加行的高亮样式
    return record.id === this.state.activeIndex ? 'tableActivty' : "";
  }


  loadLocales() {
    intl.init({
      currentLocale: this.props.currentLocale.currentLocale,
      locales,
    })
      .then(() => {
        // After loading CLDR locale data, start to render
        this.setState({ initDone: true });
      });
  }

  //关闭导入mod
  closeImport = () => {
    this.setState({
      importMod: false
    })
  }
  //右击菜单选项
  rightClickMenu = (menu) => {
    console.log(menu)
    if (menu == "新增下级机构") {
      this.setState({
        nextAgency: true
      })
    }
    if (menu == "删除本机机构") {
      this.iptdelete();
    }
    if (menu == "刷新") {
      this.getTree();
    }
    //关闭右击菜单
    this.setState({
      rightClickShow: false
    })
  }
  //取消新增下级机构
  closeNextAgency = () => {
    this.setState({
      nextAgency: false
    })
  }

  render() {
    const columns = [
      {
        title: intl.get('wsd.i18n.sys.menu.menuname'),
        dataIndex: 'iptName',
        key: 'iptName',
      },
      {
        title: intl.get('wsd.i18n.sys.ipt.iptcodej'),
        dataIndex: 'iptCode',
        key: 'iptCode',
      },
      {
        title: intl.get('wsd.i18n.sys.ipt.level'),
        dataIndex: 'level',
        key: 'level',
      },
      {
        title: intl.get('wsd.i18n.sys.ipt.remark'),
        dataIndex: 'remark',
        key: 'remark',
      }

    ];
    //表格行是否可选择，配置项
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };
    // const NewNextAgency = dynamic(import('./NewNextAgency/index'), {
    //   loading: () => <Spin size="small" />
    // })
    return (
      <div>
        <TopTags search={this.search} />
        {this.state.initDone &&
          <div className={style.main}>

            <div className={style.leftMain}>
              <div style={{ minWidth: 'calc(100vw - 60px)' }}>
                <MyTable rowKey={record => record.id} columns={columns} dataSource={this.state.data} pagination={false}
                  //表格行是否可选择，配置项
                  rowSelection={rowSelection}
                  size={"small"}
                  //设置表格行的类名
                  rowClassName={this.setClassName}
                  //设置行属性
                  onRow={(record, index) => {
                    return {
                      //点击行事件
                      onClick: (event) => {
                        this.getInfo(record, index)
                      },
                      //右击事件
                      onContextMenu: (event) => {
                        //取消事件的默认动作
                        event.preventDefault()
                        if (record.key != '[0]') {
                          console.log(this.state.record)
                          this.setState({
                            rightClickShow: true,
                            record: record,
                            x: event.clientX,
                            y: event.clientY - 120,
                          })
                        }

                      }
                    }
                  }
                  } />
              </div>

              {this.state.rightClickShow &&
                <RightClickMenu name={this.state.clickTreeName} x={this.state.x} y={this.state.y}
                  handleClick={this.rightClickMenu.bind(this)} />}
              <Import visible={this.state.importMod} handleCancel={this.closeImport.bind(this)}></Import>
              {this.state.nextAgency &&
                <NewNextAgency addSuccess={this.addSuccess} data={this.state.record} closeNextAgency={this.closeNextAgency.bind(this)}></NewNextAgency>}

            </div>
            <div className={style.rightBox} style={{ height: this.props.height }}>
              <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData} updateSuccess={this.updateSuccess} />
            </div>
          </div>
        }
      </div>
    )
  }
}

/* *********** connect链接state及方法 start ************* */
export default connect(state => ({
  currentLocale: state.localeProviderData
}), {
    saveCurrentData,
    curdCurrentData,
    resetRightCurrentData,
    resetCurrentData,
    changeLocaleProvider
  })(TableComponent);
/* *********** connect链接state及方法 end ************* */
