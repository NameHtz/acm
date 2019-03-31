import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Calendar, Row, Col } from 'antd'
import emitter from '../../../api/ev'
import _ from 'lodash'
import style from "./style.less"
import moment from 'moment';
/* *********** 引入redux及redux方法 start ************* */
import { connect } from 'react-redux'
import store from '../../../store'
import { saveCurrentData, resetRightCurrentData } from '../../../store/rightData/action'
import { curdCurrentData, resetCurrentData } from '../../../store/curdData/action'
import { changeLocaleProvider } from '../../../store/localeProvider/action'
/* *********** 引入redux及redux方法 end ************* */
import TopTags from './TopTags/index'
import RightTags from "../../Components/RightDragAndDrop"
const locales = {
    "en-US": require('../../../api/language/en-US.json'),
    "zh-CN": require('../../../api/language/zh-CN.json')
}
class TableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            value: moment('2017-01-25'),
            selectedValue: moment('2017-01-25'),
            data1: [
                {
                    key: 1,
                    rsrcname: "人力资源",
                    rsrccode: "HR",
                    children: [
                        {
                            key: 2,
                            rsrcname: "人力资源",
                            rsrccode: "HR",
                        },
                        {
                            key: 3,
                            rsrcname: "人力资源",
                            rsrccode: "HR",
                        }
                    ]
                }
            ],

            data: [{
                key: "[0]",
                id: "1",
                projectName: "人力资源",
                wbsName: 1,
                taskName: 1,
                planStartTime: "2018-12-23",
                planEndTime: "2019-03-12",
                rsrcName: "",
                rsrcRole: "",
                unit: "g/h",
                maxUnitNum: "",
                planNum: "",
                actStartTime: "",
                actEndTime: "",
                actNum: "",
            },
            {
                key: "[1]",
                id: "2",
                projectName: "人力资源",
                wbsName: 1,
                taskName: 1,
                planStartTime: "2018-12-23",
                planEndTime: "2019-03-12",
                rsrcName: "",
                rsrcRole: "",
                unit: "g/h",
                maxUnitNum: "",
                planNum: "",
                actStartTime: "",
                actEndTime: "",
                actNum: "",
            }]
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
        this.loadLocales();

    }
    getInfo = (record, index) => {
        emitter.emit('noticeRightOrTop', record)
        this.setState({
            activeIndex: record.id,

        })
    }

    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        })
            .then(() => {
                // After loading CLDR locale data, start to render
                this.setState({ initDone: true });
            });
    }
    onSelect = (value) => {
        this.setState({
            value,
            selectedValue: value,
        });
    }

    onPanelChange = (value) => {
        this.setState({ value });
    }
    render() {
        const columns1 = [
            {
                title: intl.get('wsd.i18n.rsrc.rsrclist.rsrcname'),
                dataIndex: 'rsrcname',
                key: 'rsrcname',
            },
            {
                title: intl.get('wsd.i18n.rsrc.rsrclist.rsrccode'),
                dataIndex: 'rsrccode',
                key: 'rsrccode',
            },
        ]
        const columns = [
            {
                title: intl.get('wsd.i18n.rsrc.analysis.projectname'),
                dataIndex: 'projectName',
                key: 'projectName',
            },
            {
                title: intl.get('wsd.i18n.rsrc.analysis.wbsname'),
                dataIndex: 'wbsName',
                key: 'wbsName',
            },
            {
                title: intl.get('wsd.i18n.rsrc.analysis.taskname'),
                dataIndex: 'taskName',
                key: 'taskName',
            },
            {
                title: intl.get('wsd.i18n.rsrc.analysis.planstarttime'),
                dataIndex: 'planStartTime',
                key: 'planStartTime',
            },
            {
                title: intl.get('wsd.i18n.rsrc.analysis.planendtime'),
                dataIndex: 'planEndTime',
                key: 'planEndTime',
            },
            {
                title: "资源类别",
                dataIndex: 'rsrcName',
                key: 'rsrcName',
            },
            {
                title: intl.get('wsd.i18n.rsrc.analysis.rsrcrole'),
                dataIndex: 'rsrcRole',
                key: 'rsrcRole',
            },
            {
                title: intl.get('wsd.i18n.rsrc.analysis.unit'),
                dataIndex: 'unit',
                key: 'unit',
            },
            {
                title: intl.get('wsd.i18n.rsrc.analysis.maxunitnum'),
                dataIndex: 'maxUnitNum',
                key: 'maxUnitNum',
            },
            {
                title: intl.get('wsd.i18n.rsrc.analysis.plannum'),
                dataIndex: 'planNum',
                key: 'planNum',
            },
            {
                title: intl.get('wsd.i18n.rsrc.analysis.actstarttime'),
                dataIndex: 'actStartTime',
                key: 'actStartTime',
            },
            {
                title: intl.get('wsd.i18n.rsrc.analysis.actendtime'),
                dataIndex: 'actEndTime',
                key: 'actEndTime',
            },
            {
                title: intl.get('wsd.i18n.rsrc.analysis.actnum'),
                dataIndex: 'actNum',
                key: 'actNum',
            },
        ];

        return (
            <div>
                <TopTags />
                <div className={style.main}>
                    <div className={style.leftMain} style={{ height: this.props.height }}>
                        {this.state.initDone &&

                            <Table columns={columns1} dataSource={this.state.data1} pagination={false}
                                rowClassName={this.setClassName3}
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
                        <RightTags>
                            <section>
                                <span className={style.time}>{`当前日期：${this.state.selectedValue && this.state.selectedValue.format('YYYY-MM-DD')}`}</span>
                                <Calendar value={this.state.value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />


                                <Table columns={columns} dataSource={this.state.data} pagination={false}

                                    scroll={{ x: true }}
                                    rowClassName={this.setClassName3}
                                    onRow={(record, index) => {
                                        return {
                                            onClick: (event) => {
                                                this.getInfo(record, index)
                                            }
                                        }
                                    }
                                    } />
                            </section>
                        </RightTags>
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
    })(TableComponent);
/* *********** connect链接state及方法 end ************* */
// {
//             "wsd.i18n.rsrc.analysis.projectname" : "项目名称",
//             "wsd.i18n.rsrc.analysis.wbsname" : "wbs名称",
//             "wsd.i18n.rsrc.analysis.taskname" : "任务名称",
//             "wsd.i18n.rsrc.analysis.planstarttime" : "计划开始时间",
//             "wsd.i18n.rsrc.analysis.planendtime" : "计划结束时间",
//             "wsd.i18n.rsrc.analysis.rsrcname" : "资源名称",
//             "wsd.i18n.rsrc.analysis.rsrcrole" : "资源角色",
//             "wsd.i18n.rsrc.analysis.unit" : "计量单位",
//             "wsd.i18n.rsrc.analysis.maxunitnum" : "单位最大用量",
//             "wsd.i18n.rsrc.analysis.plannum" : "计划用量",
//             "wsd.i18n.rsrc.analysis.actstarttime" : "实际开始时间",
//             "wsd.i18n.rsrc.analysis.actendtime" : "实际结束时间",
//             "wsd.i18n.rsrc.analysis.actnum" : "实际用量",
//     }