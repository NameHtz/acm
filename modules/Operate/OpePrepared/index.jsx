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

export class OperatePrepared extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: "",
            rightData: [],
            rightTags: [
                { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Operate/OpePrepared/Edit'},
                { icon: 'iconrizhi', title: '反馈记录', fielUrl: 'Operate/OpePrepared/Record'},
                { icon: 'iconjihuaguanlian', title: '计划关联', fielUrl: 'Operate/OpePrepared/PlanAcco'},
                { icon: 'icontuandui', title: '协作团队', fielUrl: 'Plot/Group/TeamInfo'},
                { icon: 'iconwenjian', title: '文件信息', fielUrl: 'Components/FileInfo'},
                { icon: 'iconbiangengxinxi', title: '变更记录', fielUrl: 'Operate/OpePrepared/ChangeInfo'},
                { icon: 'iconliuchengxinxi', title: '流程信息', fielUrl: 'Plot/Approval/Process'}
            ],
            columns: [],
            data: [
                {
                    id: 1,
                    name: '2019年经营目标',
                    code: 'XM',
                    planStartTime: '2018-08-12',
                    planEndTime: '2018-09-12',
                    orgName: '研发部',
                    userName: '孙博宇',
                    planResource: '--',
                    status: '--',
                    remark: '--',
                    type: 1, //1是维度 2 指标 3任务
                    children: [
                        {
                            id: 1001,
                            name: '型号',
                            code: 'ZGYF',
                            planStartTime: '2018-08-12',
                            planEndTime: '2018-09-12',
                            orgName: '研发部',
                            userName: '孙博宇',
                            planResource: '--',
                            status: '--',
                            remark: '--',
                            type: 2, //1是维度 2 指标 3任务
                        },
                        {
                            id: 1002,
                            name: '管理',
                            code: 'XM.1',
                            planStartTime: '2018-08-12',
                            planEndTime: '2018-09-12',
                            orgName: '研发部',
                            userName: '孙博宇',
                            planResource: '--',
                            status: '--',
                            remark: '--',
                            type: 2, //1是维度 2 指标 3任务
                            children: [
                                {
                                    id: 1002001,
                                    name: '指标1',
                                    code: 'A1007',
                                    planStartTime: '2018-08-12',
                                    planEndTime: '2018-09-12',
                                    orgName: '研发部',
                                    userName: '孙博宇',
                                    planResource: '--',
                                    status: '编制中',
                                    remark: '--',
                                    type: 3, //1是维度 2 指标 3任务
                                }
                            ]
                        }
                    ]
                },

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
                        title: intl.get('wsd.i18n.operate.prepared.name'),
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.prepared.code'),
                        dataIndex: 'code',
                        key: 'code',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.prepared.planstarttime'),
                        dataIndex: 'planStartTime',
                        key: 'planStartTime',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.prepared.planendtime'),
                        dataIndex: 'planEndTime',
                        key: 'planEndTime',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.prepared.orgName'),
                        dataIndex: 'orgName',
                        key: 'orgName',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.prepared.userName'),
                        dataIndex: 'userName',
                        key: 'userName',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.prepared.planresource'),
                        dataIndex: 'planResource',
                        key: 'planResource',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.prepared.status'),
                        dataIndex: 'status',
                        key: 'status',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.prepared.remark'),
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
    })(OperatePrepared);
