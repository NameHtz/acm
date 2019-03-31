import React, { Component } from 'react'
import intl from 'react-intl-universal'
import _ from 'lodash'
import { Table } from 'antd'
import moment from 'moment'
import style from './style.less'
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
// 引入redux方法
import { connect } from 'react-redux'
import store from '../../../store'
import { saveCurrentData, resetRightCurrentData } from '../../../store/rightData/action'
import { curdCurrentData, resetCurrentData } from '../../../store/curdData/action'
import { changeLocaleProvider } from '../../../store/localeProvider/action'

const locales = {
    "en-US": require('../../../api/language/en-US.json'),
    "zh-CN": require('../../../api/language/zh-CN.json')
}

export class OperateDefine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: "",
            rightData: [],
            rightTags: [
                { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Operate/OpeDefine/Edit'},
                { icon: 'iconbianmaguize', title: '规则设置', fielUrl: 'Operate/OpeDefine/Rule'},
                { icon: 'icontuandui', title: '协作团队', fielUrl: 'Plot/Group/TeamInfo'},
                { icon: 'iconconfig-rule', title: '编码设置', fielUrl: 'Operate/OpeDefine/Code'}
            ],
            columns: [],
            data: [
                {
                    id: 1,
                    name: '经营计划001',
                    code: 'XM',
                    year: '2019',
                    orgName: '研发部',
                    userName: '孙博宇',
                    status: 1,
                    remark: '考核计划'
                },
                {
                    id: 2,
                    name: '经营计划002',
                    code: 'XM',
                    year: '2019',
                    orgName: '研发部',
                    userName: '孙博宇',
                    status: 1,
                    remark: '考核计划'
                }
            ],
        
        }
    }

    componentDidMount() {
        this.loadLocales()
    }

    loadLocales() {
        intl.init({
            currentLocale: this.props.currentLocale.currentLocale,
            locales,
        }).then(() => {
            this.setState({
                initDone: true,
                columns: [
                    {
                        title: intl.get('wsd.i18n.operate.define.name'),
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.define.code'),
                        dataIndex: 'code',
                        key: 'code',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.define.year'),
                        dataIndex: 'year',
                        key: 'year',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.define.orgName'),
                        dataIndex: 'orgName',
                        key: 'orgName',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.define.userName'),
                        dataIndex: 'userName',
                        key: 'userName',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.define.remark'),
                        dataIndex: 'remark',
                        key: 'remark',
                    }
                ]
            });
        });
    }

    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    }

    getInfo = (record, index) => {

        let id = record.id, records = record
        /* *********** 点击表格row执行更新state start ************* */
        if (this.state.activeIndex == id) {
            console.log("wwww")
            id = ''
            records = ''
            this.setState({
                rightData: []
            })
            this.props.resetRightCurrentData()
        } else {
            console.log("Ssss")
            // this.props.saveCurrentData({
            //   title: localStorage.getItem('name'),
            //   rightTag: this.state.rightTag[0].list,
            //   data: record
            // })
        }
        /* *********** 点击表格row执行更新state end ************* */
        this.setState({
            activeIndex: id,
            rightData: record
        })
    }

    // modal取消
    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => { },
            onSelect: (record, selected, selectedRows) => {
                this.setState({
                    selectData: selectedRows
                })
            },
            onSelectAll: (selected, selectedRows, changeRows) => { },
        };

        return (
              <div>
              <TopTags />
              <div className={style.main}>
                  <div className={style.leftMain} style={{ height: this.props.height }}>
                      {this.state.initDone && this.state.data &&
                        <Table rowKey={record => record.id} defaultExpandAllRows={true} pagination={false}
                        name={this.props.name} columns={this.state.columns} rowSelection={rowSelection}
                        dataSource={this.state.data} rowClassName={this.setClassName} onRow={(record, index) => {
                            return {
                                onClick: (event) => {
                                    this.getInfo(record, index)
                                }
                            }
                        }
                        } />
                      }
                  </div>
                  <div className={style.rightBox} style={{ height: this.props.height }}>
                      <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData} />
                  </div>
              </div>
  
          </div>
        )
    }
}

export default connect(state => ({
    currentLocale: state.localeProviderData
}), {
        saveCurrentData,
        curdCurrentData,
        resetRightCurrentData,
        resetCurrentData,
        changeLocaleProvider
    })(OperateDefine);
