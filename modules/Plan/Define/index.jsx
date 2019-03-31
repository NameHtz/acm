/*
 * @Author: wihoo.wanghao
 * @Date: 2019-01-16 16:38:09
 * @Last Modified by: wihoo.wanghao
 * @Last Modified time: 2019-03-21 11:11:56
 */
import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { message } from 'antd';
import _ from 'lodash'

import { Table, Icon } from 'antd'
import { ContextMenu, MenuItem, ContextMenuTrigger, SubMenu } from "react-contextmenu"
import style from './style.less'
import '../../../static/css/react-contextmenu.global.css'
import moment from 'moment'
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
/* *********** 引入redux及redux方法 start ************* */
import { connect } from 'react-redux'
import store from '../../../store'
import { saveCurrentData, resetRightCurrentData } from '../../../store/rightData/action'
import { curdCurrentData, resetCurrentData } from '../../../store/curdData/action'
import { changeLocaleProvider } from '../../../store/localeProvider/action'
/* *********** 引入redux及redux方法 end ************* */

const locales = {
    "en-US": require('../../../api/language/en-US.json'),
    "zh-CN": require('../../../api/language/zh-CN.json')
}
export class PlanDefine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            value: moment('2019-01-25'),
            selectedValue: moment('2019-01-25'),
            name: 'planDefine',
            width: '',
            initDone: false,
            columns: [],
            /* *********** 初始化rightTag ************* */
            rightTag: [
                {
                    id: 0, list: [
                        { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Plan/Define/Edit' },
                        { icon: 'iconjixianguanli', title: '进度基线', fielUrl: 'Plan/Define/Baseline' },
                        { icon: 'icontuandui', title: '协作团队', fielUrl: 'Plot/Group/TeamInfo' },
                        { icon: 'iconset', title: '变量设置', fielUrl: 'Plan/Define/Setvar' },
                        { icon: 'iconwenjian', title: '文件信息', fielUrl: 'Components/FileInfo' },
                        { icon: 'iconfenleima', title: '分类码', fielUrl: 'Components/CategoryCode' }
                    ]
                },
                {
                    id: 1, list: [
                        { icon: 'right-square', title: '基本信息', fielUrl: 'Plan/Define/Edit' },
                        { icon: 'right-square', title: '协作团队', fielUrl: 'Plot/Group/TeamInfo' },
                        { icon: 'right-square', title: '分类码', fielUrl: 'Components/CategoryCode' }
                    ]
                },
            ],
            data: [
                {
                    id: 1,
                    planName: 'ACM产品开发项目',
                    planCode: 'XM',
                    orgName: '研发部',
                    userName: '孙博宇',
                    planStartTime: '2018-07-11',
                    planEndTime: '2018-07-11',
                    planType: '--',
                    creator: '马云飞',
                    creatTime: '2018-07-11',
                    status: '新建',
                    remark: '--',
                    key: '[0]',
                    children: [
                        {
                            id: 2,
                            planName: 'ACM产品开发项目',
                            planCode: 'XM',
                            orgName: '研发部',
                            userName: '孙博宇',
                            planStartTime: '2018-08-10',
                            planEndTime: '2018-12-21',
                            planType: '月度计划',
                            creator: '马云飞',
                            creatTime: '2018-07-11',
                            status: '激活',
                            remark: '--',
                            key: '[0].children[0]'
                        }
                    ],
                },
                {
                    id: 6,
                    planName: 'ACM产品开发项目',
                    planCode: 'XM',
                    orgName: '研发部',
                    userName: '孙博宇',
                    planStartTime: '2018-07-11',
                    planEndTime: '2018-07-11',
                    planType: '--',
                    creator: '马云飞',
                    creatTime: '2018-07-11',
                    status: '新建',
                    remark: '--',
                    key: '[3]',
                },
                {
                    id: 7,
                    planName: 'ACM产品开发项目',
                    planCode: 'XM',
                    orgName: '研发部',
                    userName: '孙博宇',
                    planStartTime: '2018-07-11',
                    planEndTime: '2018-07-11',
                    planType: '--',
                    creator: '马云飞',
                    creatTime: '2018-07-11',
                    status: '新建',
                    remark: '--',
                    key: '[3]',
                },
                {
                    id: 8,
                    planName: 'ACM产品开发项目',
                    planCode: 'XM',
                    orgName: '研发部',
                    userName: '孙博宇',
                    planStartTime: '2018-07-11',
                    planEndTime: '2018-07-11',
                    planType: '--',
                    creator: '马云飞',
                    creatTime: '2018-07-11',
                    status: '新建',
                    remark: '--',
                    key: '[3]',
                },
                {
                    id: 9,
                    planName: 'ACM产品开发项目',
                    planCode: 'XM',
                    orgName: '研发部',
                    userName: '孙博宇',
                    planStartTime: '2018-07-11',
                    planEndTime: '2018-07-11',
                    planType: '--',
                    creator: '马云飞',
                    creatTime: '2018-07-11',
                    status: '新建',
                    remark: '--',
                    key: '[3]',
                },
                {
                    id: 10,
                    planName: 'ACM产品开发项目',
                    planCode: 'XM',
                    orgName: '研发部',
                    userName: '孙博宇',
                    planStartTime: '2018-07-11',
                    planEndTime: '2018-07-11',
                    planType: '--',
                    creator: '马云飞',
                    creatTime: '2018-07-11',
                    status: '新建',
                    remark: '--',
                    key: '[3]',
                },
                {
                    id: 11,
                    planName: 'ACM产品开发项目',
                    planCode: 'XM',
                    orgName: '研发部',
                    userName: '孙博宇',
                    planStartTime: '2018-07-11',
                    planEndTime: '2018-07-11',
                    planType: '--',
                    creator: '马云飞',
                    creatTime: '2018-07-11',
                    status: '新建',
                    remark: '--',
                    key: '[3]',
                },
                {
                    id: 12,
                    planName: 'ACM产品开发项目',
                    planCode: 'XM',
                    orgName: '研发部',
                    userName: '孙博宇',
                    planStartTime: '2018-07-11',
                    planEndTime: '2018-07-11',
                    planType: '--',
                    creator: '马云飞',
                    creatTime: '2018-07-11',
                    status: '新建',
                    remark: '--',
                    key: '[3]',
                },
                {
                    id: 13,
                    planName: 'ACM产品开发项目',
                    planCode: 'XM',
                    orgName: '研发部',
                    userName: '孙博宇',
                    planStartTime: '2018-07-11',
                    planEndTime: '2018-07-11',
                    planType: '--',
                    creator: '马云飞',
                    creatTime: '2018-07-11',
                    status: '新建',
                    remark: '--',
                    key: '[3]',
                }
            ],

            activeIndex: "",
            rightData: [],
            rightTags: [
                { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Plan/Define/Edit' },
                { icon: 'iconjixianguanli', title: '进度基线', fielUrl: 'Plan/Define/Baseline' },
                { icon: 'icontuandui', title: '协作团队', fielUrl: 'Plot/Group/TeamInfo' },
                { icon: 'iconset', title: '变量设置', fielUrl: 'Plan/Define/Setvar' },
                { icon: 'iconwenjian', title: '文件信息', fielUrl: 'Components/FileInfo' },
                { icon: 'iconfenleima', title: '分类码', fielUrl: 'Components/CategoryCode' }
            ],
            selectData: []
        }

        /* *********** 添加监听redux中store变化 start ************* */
        store.subscribe(() => {
            let storeState = store.getState();
            if (localStorage.getItem('name') == storeState.curdData.title) {
                if (storeState.curdData.status != '') {
                    this.curdData(storeState.curdData.status, storeState.curdData.data)
                }
            }
        })
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
            alert(JSON.stringify(data))
        }

        // 修改
        if (status == 'update') {
            alert(JSON.stringify(data))
        }

        // 删除
        if (status == 'delete') {
            alert(JSON.stringify(data))
        }
        this.props.resetCurrentData()
        //let tempData
        // this.setState({
        //     width: this.props.width,
        //     data: tempData
        // })
    }

    componentDidMount() {
        this.loadLocales()
    }

    loadLocales() {
        intl.init({
            /* *********** 从redux中获取国家化语言 ************* */
            currentLocale: this.props.currentLocale.currentLocale,
            locales,
        }).then(() => {
            this.setState({
                initDone: true,
                columns: [
                    {
                        title: intl.get('wsd.i18n.plan.plandefine.planname'), //计划名称
                        dataIndex: 'planName',
                        key: 'planName',
                        width: 360,
                        render: text => (
                            <ContextMenuTrigger id="planDefine__rightContextMenu">
                                <div style={{ width: '100%' }}>
                                    {text}
                                </div>
                            </ContextMenuTrigger>
                        )
                    },
                    {
                        title: intl.get('wsd.i18n.plan.plandefine.plancode'), //代码
                        dataIndex: 'planCode',
                        key: 'planCode',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.plandefine.orgname'), //责任主体
                        dataIndex: 'orgName',
                        key: 'orgName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.plandefine.username'), //创建人
                        dataIndex: 'userName',
                        key: 'userName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.plandefine.planstarttime'), // 计划开始时间
                        dataIndex: 'planStartTime',
                        key: 'planStartTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.plandefine.planendtime'), //计划完成时间
                        dataIndex: 'planEndTime',
                        key: 'planEndTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.plandefine.plantype'), //计划类型
                        dataIndex: 'planType',
                        key: 'planType',
                    },


                    {
                        title: intl.get('wsd.i18n.plan.plandefine.creator'), //创建时间
                        dataIndex: 'creator',
                        key: 'creator',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.plandefine.creattime'), //创建日期
                        dataIndex: 'creatTime',
                        key: 'creatTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.plandefine.status'), //计划状态
                        dataIndex: 'status',
                        key: 'status',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.plandefine.remark'), //备注
                        dataIndex: 'remark',
                        key: 'remark',
                    }
                ]
            });
        });
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

    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    }

    onPanelChange = (value, mode) => {
        console.log(value, mode);
    }

    onSelect = (value) => {
        console.log("==>" + value)
        this.setState({
            value,
            selectedValue: value,
        });
    }
    onChange = date => this.setState({ date })

    handleRightMenuClick = (e, data) => {
        switch (data.action) {
            case 'spread':
                alert('展开')
                break;
            case 'projectPlan':
                alert('项目计划')
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
                <ContextMenu id="planDefine__rightContextMenu" rtl>
                    <MenuItem data={{ action: 'spread' }} onClick={this.handleRightMenuClick}><Icon type="caret-down" /> 展开</MenuItem>
                    <SubMenu title={<span><Icon type="folder-open" /> 打开</span>} rtl>
                        <MenuItem onClick={this.handleRightMenuClick} data={{ action: 'projectPlan' }}><Icon type="switcher" /> 项目计划</MenuItem>
                    </SubMenu>
                    <MenuItem data={{ action: 'hideShowColumns' }} onClick={this.handleRightMenuClick}><Icon type="menu-unfold" /> 隐藏/显示列</MenuItem>
                </ContextMenu>
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
    })(PlanDefine);
/* *********** connect链接state及方法 end ************* */

