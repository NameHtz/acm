import React, { Component } from 'react'
import style from './style.less'
import intl from 'react-intl-universal'
import { Table } from 'antd'
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
import _ from "lodash";

import {meetingList} from '../../../api/api'
import axios from '../../../api/axios'

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
export class ComcateMeeting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            columns: [],
            date: new Date(),
            data: [{
                id: 1,
                title: "会议会议",
                meetingType: "项目会议",
                projectName: "ACM产品项目开发",
                meetingRemark: "务必在要求之前完成",
                meetingAddress: "第一会议室",
                meetTime: "2018-10-20",
                meetingUser: "孙播忍",
                creator: "WSD",
                creatTime: 1,
                status: 1,
            },
            {
                id: 2,
                title: "会议会议",
                meetingType: "项目会议",
                projectName: "ACM产品项目开发",
                meetingRemark: "务必在要求之前完成",
                meetingAddress: "第一会议室",
                meetTime: "2018-10-20",
                meetingUser: "孙播忍",
                creator: "WSD",
                creatTime: 1,
                status: 1,
            }],
            activeIndex: "",
            rightData: [],
            rightTags: [
                { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Comcate/Meeting/MeetInfo' },
                { icon: 'iconwenjian', title: '文件信息', fielUrl: 'Components/FileInfo' },
                { icon: 'iconicon-1', title: '会议行动项', fielUrl: 'Comcate/Meeting/MeetAction' },
                { icon: 'iconrizhi', title: '进展日志', fielUrl: 'Comcate/Meeting/Log' },
                { icon: 'iconliuchengxinxi', title: '流程信息', fielUrl: 'Plot/Approval/Process' }
            ],
            /* *********** 初始化rightTag ************* */

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
    componentDidMount() {
        this.loadLocales();
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
                        title: intl.get('wsd.i18n.comu.meeting.title'),
                        dataIndex: 'title',
                        key: 'title',
                    },

                    {
                        title: intl.get('wsd.i18n.comu.meeting.projectname'),
                        dataIndex: 'projectName',
                        key: 'projectName',
                    },
                    {
                        title: intl.get('wsd.i18n.comu.meeting.meetingaddress'),
                        dataIndex: 'meetingAddress',
                        key: 'meetingAddress',
                    },
                    {
                        title: intl.get('wsd.i18n.comu.meeting.meettime'),
                        dataIndex: 'meetTime',
                        key: 'meetTime',
                    },
                    {
                        title: intl.get('wsd.i18n.comu.meeting.meetingtype'),
                        dataIndex: 'meetingType',
                        key: 'meetingType',
                    },
                    {
                        title: intl.get('wsd.i18n.comu.meeting.status'),
                        dataIndex: 'status',
                        key: 'status',
                    },
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


    onChange = date => this.setState({ date })
    onSelect = (value) => {
        console.log("==>" + value)
        this.setState({
            value,
            selectedValue: value,
        });
    };
    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    };

    // 获取会议管理列表
    // getMeetingList = ()=>{
    //     axios.get(meetingList(' ', ))
    // }


    render() {
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
        return (
            <div>
                <TopTags />
                <div className={style.main}>
                    <div className={style.leftMain} style={{ height: this.props.height }}>
                        <div style={{ minWidth: 'calc(100vw - 60px)' }}>
                            {this.state.initDone &&
                                <Table
                                    rowKey={record => record.id}
                                    rowSelection={rowSelection}
                                    defaultExpandAllRows={true}
                                    name={this.props.name}
                                    columns={this.state.columns}
                                    dataSource={this.state.data}
                                    pagination={false}
                                    rowClassName={this.setClassName}
                                    onRow={(record, index) => {
                                        return {
                                            onClick: (event) => {
                                                this.getInfo(record, index)
                                            }
                                        }
                                    }}
                                />
                            }
                        </div>


                    </div>
                    <div className={style.rightBox} style={{ height: this.props.height }}>
                        <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData} />
                    </div>
                </div>

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
    })(ComcateMeeting);
/* *********** connect链接state及方法 end ************* */