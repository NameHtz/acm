import React, { Component } from 'react';
import style from './style.less';
import intl from 'react-intl-universal';
import { Table } from 'antd';
import RightClickMenu from './RightClickMenu'; // 左侧机构树右键事件
import RoleAddModel from './AddModel';   // 新增弹框
import TopTags from './TopTags/index';
import RightTags from '../../../components/public/RightTags/index';
import RoleInfo from './RoleInfo';
import { roleTree, deleteRole } from "../../../api/api";
import axios from '../../../api/axios'
/* *********** 引入redux及redux方法 start ************* */
import { connect } from 'react-redux';
import store from '../../../store';
import * as util from '../../../utils/util';
import { saveCurrentData, resetRightCurrentData } from '../../../store/rightData/action';
import { curdCurrentData, resetCurrentData } from '../../../store/curdData/action';
import { changeLocaleProvider } from '../../../store/localeProvider/action';
/* *********** 引入redux及redux方法 end ************* */
const locales = {
  'en-US': require('../../../api/language/en-US.json'),
  'zh-CN': require('../../../api/language/zh-CN.json'),
};

class sysRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rightClickShow: false, // 鼠标右键事件的菜单显示和隐藏
      roleVisible: false,  // 控制弹窗的显示隐藏
      rightImgShow: true,  // 控制右边的图片显示和隐藏
      modelTitle: '',      // 弹框标题
      activeIndex: '',
      dataMap: [],
      rightData: null,
      rightTags: [
        { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Sys/Role/RoleInfo' },
        { icon: 'iconyuangongliebiao', title: '员工列表', fielUrl: 'Sys/Role/RoleList' },
      ],
      columns: [{
        title: '组织机构树',
        dataIndex: 'orgName',
        key: 'id',
      }],
      data: [{
        id: 0,
        key: 1,
        orgName: '全局机构树',
        children: null,
      }],
      clickTreeName: '全局机构树',

    };
  }

  componentDidMount() {
    document.addEventListener('click', this.closeRight)
    this.getRoleTree();
    this.loadLocales();
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeRight, false);
  }
  closeRight = () => {
    this.setState({
      rightClickShow: false
    })
  }
  //获取组织机构
  getRoleTree = () => {
    axios.get(roleTree).then(res => {
      if (res.data.data) {
        const dataMap = util.dataMap(res.data.data);
        const data = this.state.data;
        data[0].children = res.data.data;
        this.setState({
          data: data,
          dataMap: dataMap
        })
      }
    })
  }

  // 控制弹窗的显示隐藏方法
  addShow = (modelTitle) => {
    this.setState({
      roleVisible: true,
      rightClickShow: false,
      modelTitle: modelTitle,
    });
  };
  handleCancel = () => {
    this.setState({
      roleVisible: false,
    });
  };

  //点击行
  getInfo = (record, index) => {
    let id = record.id, records = record;
    if (this.state.activeIndex == id) {
      id = '';
      records = '';
    } else {
    }
    this.setState({
      activeIndex: id,
      rightData: record,
    });
  };

  //删除组织机构
  deleteRole = () => {
    axios.deleted(deleteRole, { data: [this.state.rightData.id] }, true).then(res => {
      const { data, dataMap, rightData } = this.state;
      util.deleted(data[0].children, dataMap, rightData);
      this.setState({
        data,
        rightData: '',
      });
    })
  }

  //table添加class
  setClassName = (record, index) => {
    //判断索引相等时添加行的高亮样式
    return record.id === this.state.activeIndex ? 'tableActivty' : '';
  };
  //监听更新
  updateSuccess = (v) => {
    const { data, dataMap, rightData } = this.state;
    util.modify(data[0].children, dataMap, rightData, v);
    this.setState({
      data,
    });
  };

  //国际化
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
  //新增
  addSuccess = (value) => {
    const { data, dataMap, rightData } = this.state;
    // console.log(value);
    util.create(data, dataMap, rightData, value);
    this.setState({
      data,
      dataMap,
      roleVisible: false,
    });
  };

  //搜索
  search = (val) => {
    this.setState({
      data: val
    })
  }

  render() {
    return (
      <div>
        <TopTags search={this.search} />
        <div className={style.main}>
          {/* 左侧组织机构树 */}
          <div className={this.state.rightImgShow ? style.leftTree : style.leftTree100}
            style={{ height: this.props.height }}>
            <Table columns={this.state.columns}
              dataSource={this.state.data}
              rowClassName={this.setClassName}
              pagination={false}
              defaultExpandAllRows={true}
              rowKey={record => record.id}
              onRow={(record, index) => {
                return {
                  // 鼠标右键事件
                  onContextMenu: (event) => {
                    event.preventDefault();
                    if (record.name == '全局机构树') {
                      this.setState({
                        clickTreeName: record.name,
                      });
                    } else {
                      this.setState({
                        clickTreeName: '',
                      });
                    }
                    this.getInfo(record, index);
                    this.setState({
                      rightClickShow: true,
                      x: event.clientX,
                      y: event.clientY - 150,
                    });
                    if (record.status == 4) {
                      this.setState({
                        rightClickShow: false,
                      });
                    }
                  },
                  // 点击全局树下面第一级的子元素
                  onClick: (event) => {
                    if (record.name == '全局机构树') {
                      this.setState({
                        rightImgShow: true,
                        rightData: null
                      });

                    } else {
                      this.setState({
                        rightImgShow: false,
                      });
                      this.getInfo(record, index);
                    }
                  },
                };
              }}
            />
            {this.state.rightClickShow &&
              <RightClickMenu name={this.state.clickTreeName} x={this.state.x} y={this.state.y}
                deleteRole={this.deleteRole} addShow={this.addShow} getRoleTree={this.getRoleTree} />}
          </div>

          {
            this.state.rightImgShow &&
            <div className={style.rightTable}>
              <div>
                <div className={style.rightTitle}>系统操作说明</div>
                <div className={style.rightImg}>
                  <img src="./../../../static/images/show.png" alt="" />
                </div>
              </div>
            </div>
          }
          {/* 新增弹框 */}
          <RoleAddModel addSuccess={this.addSuccess} rightData={this.state.rightData} roleVisible={this.state.roleVisible}
            handleCancel={this.handleCancel}
            modelTitle={this.state.modelTitle} />
          <div className={style.rightBox} style={{ height: this.props.height }}>
            <RightTags updateSuccess={this.updateSuccess} rightTagList={this.state.rightTags}
              rightData={this.state.rightData} />
          </div>
        </div>

      </div>
    );
  }
}


/* *********** connect链接state及方法 start ************* */
export default connect(state => ({
  currentLocale: state.localeProviderData,
}), {
    saveCurrentData,
    curdCurrentData,
    resetRightCurrentData,
    resetCurrentData,
    changeLocaleProvider,
  })(sysRole);
/* *********** connect链接state及方法 end ************* */
