import React from 'react'
import style from './style.less'
import Link from 'next/link'
import {Menu, Dropdown, Icon, Select} from 'antd';
import {connect} from 'react-redux';
import {initLocaleProvider} from "../../../store/localeProvider/action"

let lessNodesAppended;

class HeaderEps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          name: '策划管理',
          list: [
            {
              id: 1, name: '项目群', fileUrl: 'Plot/Group', rightTagList: [
              {icon: 'right-square', title: '基本信息', fielUrl: 'Plot/Group/BasicInfo'},
              {icon: 'right-square', title: '文件信息', fielUrl: 'Components/FileInfo'},
              {icon: 'right-square', title: '协作团队', fielUrl: 'Plot/Group/TeamInfo'},
            ],
              authCode: [1001, 1002, 1003, 1004, 1005]
            },
            {
              id: 2, name: '项目立项', fileUrl: 'Plot/Approval', rightTagList: [
              {icon: 'right-square', title: '基本信息', fielUrl: 'Plot/Info/InfoForm'},
              {icon: 'right-square', title: '联系人信息', fielUrl: 'Plot/Approval/LinkManInfo'},
              {icon: 'right-square', title: '协作团队', fielUrl: 'Plot/Approval/TeamInfo'},
              {icon: 'right-square', title: '文件信息', fielUrl: 'Components/FileInfo'},
              {icon: 'right-square', title: '流程信息', fielUrl: 'Plot/Approval/Process'},

            ],
              authCode: [1001, 1002, 1003, 1004, 1005]
            },
            {
              id: 3, name: '项目信息', fileUrl: 'Plot/Info', rightTagList: [
              {icon: 'right-square', title: '基本信息', fielUrl: 'Plot/Info/InfoForm'},
              {icon: 'right-square', title: '联系人信息', fielUrl: 'Plot/Approval/LinkManInfo'},
              {icon: 'right-square', title: '文件信息', fielUrl: 'Components/FileInfo'},
              {icon: 'right-square', title: '协作团队', fielUrl: 'Plot/Info/TeamInfo'},
              {icon: 'right-square', title: '变量设置', fielUrl: 'Plot/Info/VariableSet'},
              {icon: 'right-square', title: '分类码', fielUrl: 'Components/CategoryCodeTwo'}
            ],
              authCode: [1001, 1002, 1003, 1004, 1005]
            },
            {
              id: 4, name: '项目交付物', fileUrl: 'Plot/Delivery',
              rightTagList: [
                {icon: 'right-square', title: '基本信息', fielUrl: 'Plot/Delivery/BasicInfo'},
                {icon: 'right-square', title: '文件信息', fielUrl: 'Components/FileInfo'},
                {icon: 'right-square', title: '项目计划', fielUrl: 'Plot/Delivery/ProjectPlan'},
                {icon: 'right-square', title: '分类码', fielUrl: 'Components/CategoryCodeTwo'},

              ],
              authCode: [1001, 1002, 1003, 1004, 1005]
            }
          ]
        },
        {
          name: '经营管理',
          list: [
            {id: 1, name: '经营计划定义', fileUrl: 'Operate/OpeDefine'},
            {id: 2, name: '经营计划编制', fileUrl: 'Operate/OpePrepared'},
            {id: 3, name: '经营计划变更', fileUrl: 'Operate/OpeChange'},
            {id: 4, name: '经营计划反馈', fileUrl: 'Operate/OpeFdback'},
          ]
        },
        {
          name: '计划管理',
          list: [
            {id: 1, name: '计划定义', fileUrl: 'Plan/Define'},
            {id: 2, name: '计划编制', fileUrl: 'Plan/Prepared'},
            {id: 3, name: '计划变更', fileUrl: 'Plan/Change'},
            {id: 4, name: '计划反馈', fileUrl: 'Plan/Fdback'}
          ]
        },
        {
          name: '沟通管理',
          list: [{
            id: 1, name: '问题管理', fileUrl: 'Comcate/Profdback'
          },
            {
              id: 1, name: '会议管理', fileUrl: 'Comcate/Meeting',
            }]
        },
        {
          name: '资源管理',
          list: [
            {
              id: 1, name: '资源角色', fileUrl: 'Resource/Resourole',
              rightTagList: [
                {icon: 'right-square', title: '编码规则', fielUrl: 'Resource/Resourole/BasicInfo'},

              ]
            },
            {
              id: 1, name: '资源分析', fileUrl: 'Resource/Analysis',
              rightTagList: [
                {icon: 'right-square', title: '资源清单', fielUrl: 'Resource/Analysis/BasicInfo'},
                {icon: 'right-square', title: '编码规则', fielUrl: 'Resource/Analysis/ChartAnalysis'},

              ]
            },
            {
              id: 1, name: '资源清单', fileUrl: 'Resource/Resoulist',
              rightTagList: [
                {icon: 'right-square', title: '资源清单', fielUrl: 'Resource/Resoulist/ListInfo'},
                {icon: 'right-square', title: '资源角色', fielUrl: 'Resource/Resoulist/RoleInfo'},
                {icon: 'right-square', title: '分类码', fielUrl: 'Components/CategoryCodeTwo'}
              ]
            }
          ]
        },
        {
          name: '文档管理',
          list: [
            {id: 1, name: '临时文档列表', fileUrl: 'Doc/TempDoc'},
            {id: 2, name: '项目文档', fileUrl: 'Doc/ProDoc'},
            {id: 3, name: '企业文档', fileUrl: 'Doc/CompDoc'},
            {id: 4, name: '收藏夹', fileUrl: 'Doc/Fav'},
            {id: 5, name: '回收站', fileUrl: 'Doc/TempDoc'},
          ]
        },
        {
          name: '基础数据',
          list: [
            {
              id: 1, name: '数据字典',
              fileUrl: 'Basicd/Globald/DigitDir',
              rightTagList: [
                {icon: 'right-square', title: '基本信息', fielUrl: 'Basicd/Globald/DigitDir/DigitInfo'},
                {icon: 'right-square', title: '字典码值', fielUrl: 'Basicd/Globald/DigitDir/DigitType'}
              ],
            },
            {
              id: 2, name: '分类码', fileUrl: 'Basicd/Globald/CategoryCode',
            },
            {
              id: 3, name: '日历设置', fileUrl: 'Basicd/Globald/CalendarSet',
            },
            {
              id: 4, name: '货币设置',
              fileUrl: 'Basicd/Globald/CurrenySet', rightTagList: [
              {icon: 'right-square', title: '基本信息', fielUrl: 'Basicd/Globald/CurrenySet/CurInfo'},
            ]
            },
            {
              id: 5, name: '全局设置', fileUrl: 'Basicd/Globald/GlobaldSet',
            },

            {
              id: 6, name: '计划模板', fileUrl: 'Basicd/Templated/Plan', rightTagList: [
              {icon: 'right-square', title: '基本信息', fielUrl: 'Basicd/Templated/Plan/PlanInfo'},
              {icon: 'right-square', title: '模板权限', fielUrl: 'Basicd/Templated/Plan/PlanPermission'}
            ]
            },
            {
              id: 7, name: '文档模板', fileUrl: 'Basicd/Templated/Doc', rightTagList: [
              {icon: 'right-square', title: '基本信息', fielUrl: 'Basicd/Templated/Doc/DocInfo'}
            ]
            },
            {
              id: 8, name: '交付物模板', fileUrl: 'Basicd/Templated/Delivery', rightTagList: [
              {icon: 'right-square', title: '基本信息', fielUrl: 'Basicd/Templated/Delivery/DeliveryInfo'},
              {icon: 'right-square', title: '交付设置', fielUrl: 'Basicd/Templated/Delivery/DevSet'}
            ]
            },
            {
              id: 9, name: '编码规则', fileUrl: 'Basicd/Coded/CodeRule',
            },
            {
              id: 10, name: '规则类型', fileUrl: 'Basicd/Coded/MaintainCodeRule',
            },
          ]
        },
        {
          name: '系统管理',
          list: [
            {
              id: 1, name: '菜单管理',
              fileUrl: 'Sys/Menu',
              rightTagList: [
                {icon: 'right-square', title: '基本信息', fielUrl: 'Sys/Menu/MenuInfo'},
              ],
              authCode: [1001, 1002, 1003, 1004, 1005]
            },
            {id: 2, name: '组织机构', fileUrl: 'Sys/Role'},
            {
              id: 3, name: '用户管理',
              fileUrl: 'Sys/User',
              rightTagList: [
                {icon: 'contacts', title: '员工信息', fielUrl: 'Sys/User/Info'},
              ],
            },
            {
              id: 1, name: 'IPT全局树',
              fileUrl: "Sys/Ipttree",
              rightTagList: [
                {icon: 'cluster', title: '基本信息', fielUrl: 'Sys/Ipttree/Agency'},
                {icon: 'right-square', title: '员工列表', fielUrl: 'Sys/Ipttree/Staff'},
              ],
              authCode: [1001, 1002, 1003, 1004, 1005]
            }, {id: 4, name: '三员管理', fileUrl: 'Sys/Threeme'},
            {
              id: 5, name: '角色管理', fileUrl: 'Sys/Part', rightTagList: [
              {icon: 'right-square', title: '基本信息', fielUrl: 'Sys/Part/BasicInfo'},
              {icon: 'insurance', title: '功能权限', fielUrl: 'Sys/Part/Authority'},
              // {icon: 'right-square', title: '协作团队',fielUrl:'Sys/Role/TeamInfo'},
            ],
              authCode: [1001, 1002, 1003, 1004, 1005]
            }, {
              id: 6, name: '流程定义',
              fileUrl: 'Sys/Flow',
              rightTagList: [
                {icon: 'right-square', title: '基本信息', fielUrl: 'Sys/Flow/Info'},
                {icon: 'right-square', title: '业务变量', fielUrl: 'Sys/Flow/Work'},
                {icon: 'setting', title: '流程设置', fielUrl: 'Sys/Flow/SetUp'},
                {icon: 'right-square', title: '流程实例', fielUrl: 'Sys/Flow/News'},
              ],
            },
            {
              id: 7, name: '流程业务定义',
              fileUrl: 'Sys/Wfbusiness',
              rightTagList: [
                {icon: 'right-square', title: '基本信息', fielUrl: 'Sys/Wfbusiness/BasicInfo'},

              ],
              authCode: [1001, 1002, 1003, 1004, 1005]
            },
            {
              id: 8, name: '流程变量定义',
              fileUrl: 'Sys/Wfvariable',
              rightTagList: [
                {icon: 'right-square', title: '基本信息', fielUrl: 'Sys/Wfvariable/BasicInfo'},

              ],
              authCode: [1001, 1002, 1003, 1004, 1005]
            }
          ]
        },
      ]
    }
  };

  componentDidMount() {
    this.setColor('color')
  }

  addTab = (menuInfo) => {
    this.props.callBackBanner(menuInfo)
  }
  setColor = (color) => {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link');
    const colorId = document.getElementById('clolor')
    const scriptId = document.getElementById('scriptId')
    if (colorId) {
      document.body.removeChild(colorId)
      document.body.removeChild(scriptId)
    }
    const lessConfigNode = document.createElement('script');
    const lessScriptNode = document.createElement('script');
    lessStyleNode.setAttribute('rel', 'stylesheet/less');
    var timestamp2 = (new Date()).valueOf();
    lessStyleNode.href = '/static/' + color + '.less?times=' + timestamp2
    lessStyleNode.id = 'clolor'
    //lessStyleNode.setAttribute('href', 'http://www.wisdomicloud.com/group1/M00/00/43/CkgAA1xtDdWAXwG5AAQnJVZOoqQ48.less');
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `;
    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js';
    lessScriptNode.async = true;
    lessScriptNode.id = 'scriptId';
    lessScriptNode.onload = () => {
      lessScriptNode.onload = null;
    };
    document.body.appendChild(lessStyleNode);
    document.body.appendChild(lessConfigNode);
    document.body.appendChild(lessScriptNode);
    lessNodesAppended = true;
  }
  changeZhorEg = (value) => {
    this.props.initLocaleProvider(value)
  }
  onChangeSetColor = (value) => {
    this.setColor(value)
  }

  render() {
    // 执行添加子菜单操作
    let addChildTab = (list) => {
      let childData = []
      if (list) {
        list.map((v, i) => {
          childData.push(
            <Menu.Item key={i}>
              <span onClick={this.addTab.bind(this, v)}>{v.menuName}</span>
            </Menu.Item>
          )
        })
        return (
          <Menu>
            {childData}
          </Menu>
        )
      } else {
        return (
          <Menu></Menu>
        )
      }

    }
    const Option = Select.Option;
    return (
      <div className={style.main}>
        <div className={style.content}>
          <div className={style.head}>
            {/*头部左侧*/}
            <div className={style.headLeft}>
              <Icon type="search" style={{fontSize: 18}}/>
              <input placeholder="搜索项目"/>
              <span className={style.searchSubIcon}>+</span>
            </div>
            {/*头部中间*/}
            <div className={style.headCenter}>
              <i className={style.acm}>ACM</i>
            </div>
            {/*头部右侧*/}
            <div className={style.headRight}>
              <Link href="">
                <a>工作台</a>
              </Link>
              <Select onChange={this.changeZhorEg} defaultValue='中文' style={{marginRight: 30}} size='small'>
                <Option value="zh-CN">中文</Option>
                <Option value="en-US">En</Option>
              </Select>
              <Select onChange={this.onChangeSetColor} defaultValue='换肤' style={{marginRight: 30}} size='small'>
                <Option value="color"><span
                  style={{width: 20, height: 20, display: 'block', backgroundColor: '#1890ff'}}></span></Option>
                <Option value="color2"><span
                  style={{width: 20, height: 20, display: 'block', backgroundColor: 'red'}}></span></Option>
                <Option value="color3"><span
                  style={{width: 20, height: 20, display: 'block', backgroundColor: 'green'}}></span></Option>
              </Select>
              <img className={style.headRightIcon} src="/static/images/wh.png"/>
              <img className={style.headRightIcon} src="/static/images/ld.png"/>
              <img className={style.headRightIcon} src="/static/images/xj.png"/>
              <div className={style.headImgBox}>
                <div className={style.headImgUrl}>
                  <img
                    src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3677979722,2022079017&fm=27&gp=0.jpg"/>
                </div>
                <span>WSD</span>
              </div>
            </div>
          </div>

          <div className={style.menuList}>
            {this.props.menuData && (
              this.props.menuData.map((item, index) => {
                return (
                  <Dropdown key={index} overlay={addChildTab(item.children)} placement='bottomCenter'>
                    <a
                      className={this.props.activityId == item.id ? 'ant-dropdown-link activityBottom' : 'ant-dropdown-link aaaa'}
                      href="javascript:;">{item.menuName} <Icon type="caret-down"/></ a>
                  </Dropdown>
                )
              })
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  currentLocale: state.localeProviderData
}), {initLocaleProvider})(HeaderEps)
