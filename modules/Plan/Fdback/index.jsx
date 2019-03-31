import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { message, Progress, Table, Icon } from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import _ from 'lodash'
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
import MyTable from "../../../components/Table"
import style from './style.less'
import '../../../static/css/react-contextmenu.global.css'

import { connect } from 'react-redux'
import { saveCurrentData } from '../../../store/rightData/action'

const locales = {
    "en-US": require('../../../api/language/en-US.json'),
    "zh-CN": require('../../../api/language/zh-CN.json')
}

const data1 = [
    {
        id: 1,
        name: 'ACM产品开发项目1',
        applyComplete: ['1'],
        pzComplete: ['1'],
        planLevel: '季度计划',
        iptName: '研发部',
        userName: '孙博宇',
        planStartTime: '2018-07-11',
        planEndTime: '2018-07-11',
        startTime: '2018-07-11',
        endTime: '2018-07-11',
        status: '进行中',
        actStartTime: '2019-01-26',
        actEndTime: '2019-01-28',
        applyTime: '2019-01-26',
        applyName: '孙博宇',
        completeDrtn: '90',
        progressDesc: '进展顺利，可如期完成',
        children: [
            {
                id: 2,
                name: 'ACM产品开发项目1-1',
                applyComplete: ['1'],
                pzComplete: ['1'],
                planLevel: '季度计划',
                iptName: '研发部',
                userName: '孙博宇',
                planStartTime: '2018-07-11',
                planEndTime: '2018-07-11',
                startTime: '2018-07-11',
                endTime: '2018-07-11',
                status: '进行中',
                actStartTime: '2019-01-26',
                actEndTime: '2019-01-28',
                applyTime: '2019-01-26',
                applyName: '孙博宇',
                completeDrtn: '91',
                progressDesc: '进展顺利，可如期完成1',
            }, {
                id: 3,
                name: 'ACM产品开发项目1-2',
                applyComplete: ['1'],
                pzComplete: ['1'],
                planLevel: '季度计划',
                iptName: '研发部',
                userName: '孙博宇',
                planStartTime: '2018-07-11',
                planEndTime: '2018-07-11',
                startTime: '2018-07-11',
                endTime: '2018-07-11',
                status: '进行中',
                actStartTime: '2019-01-26',
                actEndTime: '2019-01-28',
                applyTime: '2019-01-26',
                applyName: '孙博宇',
                completeDrtn: '92',
                progressDesc: '进展顺利，可如期完成2',
            }
        ]
    }
]
const data2 = [
    {
        id: 1,
        name: 'ACM产品开发项目1',
        applyComplete: ['1'],
        pzComplete: ['1'],
        planLevel: '季度计划',
        iptName: '研发部',
        userName: '孙博宇',
        planStartTime: '2018-07-11',
        planEndTime: '2018-07-11',
        startTime: '2018-07-11',
        endTime: '2018-07-11',
        status: '进行中',
        actStartTime: '2019-01-26',
        actEndTime: '2019-01-28',
        applyTime: '2019-01-26',
        applyName: '孙博宇',
        completeDrtn: '90',
        progressDesc: '进展顺利，可如期完成',
    },
    {
        id: 2,
        name: 'ACM产品开发项目2',
        applyComplete: ['1'],
        pzComplete: ['1'],
        planLevel: '季度计划',
        iptName: '研发部',
        userName: '孙博宇',
        planStartTime: '2018-07-11',
        planEndTime: '2018-07-11',
        startTime: '2018-07-11',
        endTime: '2018-07-11',
        status: '进行中',
        actStartTime: '2019-01-26',
        actEndTime: '2019-01-28',
        applyTime: '2019-01-26',
        applyName: '孙博宇',
        completeDrtn: '91',
        progressDesc: '进展顺利，可如期完成1',
    },
    {
        id: 3,
        name: 'ACM产品开发项目3',
        applyComplete: ['1'],
        pzComplete: ['1'],
        planLevel: '季度计划',
        iptName: '研发部',
        userName: '孙博宇',
        planStartTime: '2018-07-11',
        planEndTime: '2018-07-11',
        startTime: '2018-07-11',
        endTime: '2018-07-11',
        status: '进行中',
        actStartTime: '2019-01-26',
        actEndTime: '2019-01-28',
        applyTime: '2019-01-26',
        applyName: '孙博宇',
        completeDrtn: '92',
        progressDesc: '进展顺利，可如期完成2',
    }
]

export class PlanFdback extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'planDefine',
            columns: [],
            currentPage: 1,
            pageSize: 10,
            rightTag: [
                {
                    id: 0, list: [
                        // { icon: 'right-square', title: '基本信息', fielUrl: 'Plan/Fdback/Info' },
                        { icon: 'right-square', title: '本期进展', fielUrl: 'Plan/Fdback/Progress' },
                        { icon: 'right-square', title: '交付清单', fielUrl: 'Components/DeliveryList' },
                        { icon: 'right-square', title: '资源消耗', fielUrl: 'Plan/Fdback/ResourceF' },
                        { icon: 'right-square', title: '进展日志', fielUrl: 'Plan/Components/Log' },
                        { icon: 'right-square', title: '项目问题', fielUrl: 'Plan/Fdback/ProjectProb' },
                        { icon: 'right-square', title: '审批流程', fielUrl: 'Plot/Approval/Process' },  //原来是 Components/Process
                    ]
                },
                {
                    id: 1, list: [
                        // { icon: 'right-square', title: '基本信息', fielUrl: 'Plan/Fdback/Info' },
                        { icon: 'right-square', title: '本期进展', fielUrl: 'Plan/Fdback/Progress' },
                        { icon: 'right-square', title: '交付清单', fielUrl: 'Components/DeliveryList' },
                    ]
                },
            ],
            data: data2,
            width: '',
            initDone: false,
            activeIndex: "",
            rightData: [],
            rightTags: [
                { icon: 'iconjindujixian', title: '本期进展', fielUrl: 'Plan/Fdback/Progress' },
                { icon: 'iconjiaofuqingdan', title: '交付清单', fielUrl: 'Components/DeliveryList' },
                { icon: 'iconiconziyuan6', title: '资源消耗', fielUrl: 'Plan/Fdback/ResourceF' },
                { icon: 'iconrizhi', title: '进展日志', fielUrl: 'Plan/Components/Log' },
                { icon: 'iconhelp', title: '项目问题', fielUrl: 'Plan/Fdback/ProjectProb' },
                { icon: 'iconliuchengxinxi', title: '流程信息', fielUrl: 'Plot/Approval/Process' },  //原来是 Components/Process
            ],
            selectData: []
        }
    }
    componentDidMount() {
        this.loadLocales()
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            this.setState({
                initDone: true,
                columns: [
                    {
                        title: intl.get('wsd.i18n.plan.feedback.name'),
                        dataIndex: 'name',
                        key: 'name',
                        width: 240,
                        render: text => (
                            <ContextMenuTrigger id="planFdback__rightContextMenu">
                                <div style={{width: '100%'}}>
                                    {text}
                                </div>
                            </ContextMenuTrigger>
                        )
                    },
                    {
                        title: '申请完成%',
                        dataIndex: 'applyComplete',
                        render: progress => (
                            <span>
                                {progress.map(tag => <Progress key={tag} percent={80} />)}
                            </span>
                        ),
                    },
                    {
                        title: '批准完成%',
                        dataIndex: 'pzComplete',
                        key: 'pzComplete',
                        render: progress => (
                            <span>
                                {progress.map(tag => <Progress key={tag} percent={80} />)}
                            </span>
                        ),
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.iptname'),
                        dataIndex: 'iptName',
                        key: 'iptName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.username'),
                        dataIndex: 'userName',
                        key: 'userName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.planstarttime'),
                        dataIndex: 'planStartTime',
                        key: 'planStartTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.planendtime'),
                        dataIndex: 'planEndTime',
                        key: 'planEndTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.plantype'),
                        dataIndex: 'planType',
                        key: 'planType',
                    },
                    {
                        title: '实际开始时间',
                        dataIndex: 'startTime',
                        key: 'startTime'
                    },
                    {
                        title: '实际完成时间',
                        dataIndex: 'endTime',
                        key: 'endTime'
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.status'), //计划状态
                        dataIndex: 'status',
                        key: 'status',
                    },
                ]
            });
        });
    }

    toggleTableView = (title) => {
        console.log(title)
        this.setState({
            data: title == '平铺视图' ? data2 : data1
        })
    }

    getInfo = (record, index) => {
        let id = record.id, records = record
        /* *********** 点击表格row执行更新state start ************* */
        if (this.state.activeIndex == id) {
            id = ''
            records = ''
            this.setState({
                rightData: []
            })
        } else {
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

    //判断索引相等时添加行的高亮样式	
    setClassName = (record, index) => {
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    }

    handleRightMenuClick = (e, data) => {
        switch (data.action) {
            case 'refresh':
                alert('刷新')
                break;
            case 'hideShowColumns':
                alert('隐藏/显示列')
                break;
            default:
                break;
        }
    }

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                this.setState({
                    selectData: selectedRows
                })
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        }

        let pagination = {
            total: this.state.data.length,
            // hideOnSinglePage: true,
            current: this.state.currentPage,
            pageSize: this.state.pageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `每页${this.state.pageSize}/共${Math.ceil(this.state.data.length / this.state.pageSize)}页`,
            onChange: (page, pageSize) => {
                // console.log(this)
                this.setState({
                    currentPage: page
                })
            }
        }

        return (
            <div>
                <TopTags toggleTableView={this.toggleTableView} />
                <div className={style.main}>
                    <div className={style.leftMain} style={{ height: this.props.height }}>
                        {this.state.initDone && this.state.data &&
                            <MyTable rowKey={record => record.id} defaultExpandAllRows={true} pagination={pagination} name={this.props.name} columns={this.state.columns} rowSelection={rowSelection} dataSource={this.state.data}
                                rowClassName={this.setClassName}
                                onRow={(record, index) => {
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
                <ContextMenu id="planFdback__rightContextMenu">
                    <MenuItem data={{ action: 'refresh' }} onClick={this.handleRightMenuClick}><Icon type="sync" /> 刷新</MenuItem>
                    <MenuItem data={{ action: 'hideShowColumns' }} onClick={this.handleRightMenuClick}><Icon type="menu-unfold" /> 隐藏/显示列</MenuItem>
                </ContextMenu>
            </div>
        )
    }
}

export default connect(null, {
    saveCurrentData
})(PlanFdback);