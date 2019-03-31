import React, { Component } from 'react'
import intl from 'react-intl-universal'
import _ from 'lodash'
import { Table, Progress } from 'antd'
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

const data1 = [
    {
        id: 1,
        type: '指标',
        parentPath: '--',
        name: '指标1',
        planStartTime: '2018-08-10',
        planEndTime: '2018-12-11',
        orgName: '研发部',
        userName: '孙博宇',
        complete: 80,
        children: [
            {
                id: 2,
                type: '任务1',
                parentPath: '--',
                name: '指标1',
                planStartTime: '2018-08-10',
                planEndTime: '2018-12-11',
                orgName: '研发部',
                userName: '孙博宇',
                complete: 30
            }
        ]
    }
]

const data2 = [
    {
        id: 1,
        type: '指标',
        parentPath: '--',
        name: '指标1',
        planStartTime: '2018-08-10',
        planEndTime: '2018-12-11',
        orgName: '研发部',
        userName: '孙博宇',
        complete: 80
    },
    {
        id: 2,
        type: '任务1',
        parentPath: '--',
        name: '指标1',
        planStartTime: '2018-08-10',
        planEndTime: '2018-12-11',
        orgName: '研发部',
        userName: '孙博宇',
        complete: 30
    }
]

export class OperateFdback extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: "",
            rightData: [],
            rightTags: [
                { icon: 'iconjindujixian', title: '进展填报', fielUrl: 'Operate/OpeFdback/Progress' },
                { icon: 'iconrizhi', title: '反馈记录', fielUrl: 'Operate/OpeFdback/Record' },
                { icon: 'iconliuchengxinxi', title: '流程信息', fielUrl: 'Plot/Approval/Process' }
            ],
            columns: [],
            data: data2,

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
                        title: intl.get('wsd.i18n.operate.fdback.type'),
                        dataIndex: 'type',
                        key: 'type',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.fdback.parentpath'),
                        dataIndex: 'parentPath',
                        key: 'parentPath',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.fdback.name'),
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.fdback.planstarttime'),
                        dataIndex: 'planStartTime',
                        key: 'planStartTime',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.fdback.planendtime'),
                        dataIndex: 'planEndTime',
                        key: 'planEndTime',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.fdback.orgname'),
                        dataIndex: 'orgName',
                        key: 'orgName',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.fdback.username'),
                        dataIndex: 'userName',
                        key: 'remark',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.fdback.complete'),
                        dataIndex: 'complete',
                        key: 'complete',
                        render: text => (
                            <Progress percent={text} />
                        )
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

    toggleTableView = (title) => {
        console.log(title)
        this.setState({
            data: title == '平铺视图' ? data2 : data1
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
                <TopTags toggleTableView={this.toggleTableView} />
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
    })(OperateFdback);
