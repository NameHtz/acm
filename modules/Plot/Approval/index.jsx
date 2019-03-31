import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Spin, Icon } from 'antd'
import StandardTable from '../../../components/Table/index';
import _ from 'lodash'
import style from './style.less'
import dynamic from 'next/dynamic'
/* *********** 引入redux及redux方法 start ************* */
import { connect } from 'react-redux'
import store from '../../../store'
import { saveCurrentData, resetRightCurrentData } from '../../../store/rightData/action'
import { curdCurrentData, resetCurrentData } from '../../../store/curdData/action'
import { changeLocaleProvider } from '../../../store/localeProvider/action'
/* *********** 引入redux及redux方法 end ************* */
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
import axios from '../../../api/axios'
import { prepaList, prepaSeek } from '../../../api/api'

const locales = {
    "en-US": require('../../../api/language/en-US.json'),
    "zh-CN": require('../../../api/language/zh-CN.json')
}
class Approval extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            activeIndex: "",
            currentPage: 1,
            pageSize: 10,
            currentPageNum: '',
            total: '',
            rightData: null,
            delectData: [],
            rightTags: [

                { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Plot/Approval/InfoForm' },
                { icon: 'iconlianxiren1', title: '联系人信息', fielUrl: 'Plot/Approval/LinkManInfo' },
                { icon: 'icontuandui', title: '协作团队', fielUrl: 'Plot/Approval/TeamInfo' },
                { icon: 'iconwenjian', title: '文件信息', fielUrl: 'Components/FileInfo' },
                { icon: 'iconliuchengxinxi', title: '流程信息', fielUrl: 'Plot/Approval/Process' },
            ],
            data: []
        }
    }
    getDataList = () => {
        axios.get(prepaList(this.state.pageSize, this.state.currentPage)).then(res => {
            console.log(res)
            this.setState({
                data: res.data.data,
                total: res.data.total,
                currentPageNum: this.state.pageSize
            })
        })
    }

    componentDidMount() {
        this.getDataList();//列表请求函数

    }
    getInfo = (record, index) => {
        //table点击事件调用函数
        let id = record.id, records = record
        const { activeIndex } = this.state
        if (activeIndex === record.id) {
            this.setState({
                activeIndex: null,
                rightData: null
            })
        } else {
            this.setState({
                activeIndex: id,
                rightData: record
            })
        }

    }


    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? "tableActivty" : "";
    }

    //新增函数
    addData = (data) => {
        this.setState({
            data: [...this.state.data, data]
        })
    }
    //删除数据函数
    delectData = (v) => {
        let changecurrentPageNum = ((this.state.currentPageNum - 1) == 0) && this.state.currentPage > 1
        var copyData = [...this.state.data]
        var ind = copyData.findIndex(val => val.id == v)
        if (ind != -1) {
            copyData = [...copyData.slice(0, ind), ...copyData.slice(ind + 1)]
        }

        if (changecurrentPageNum) {
            this.setState({
                data: copyData,
                currentPage: this.state.currentPage - 1,
                total: this.state.total - 1
            })
        } else {
            this.setState({
                data: copyData,
                currentPageNum: this.state.currentPageNum - 1
            }, () => {
                copyData = null
            })
        }



    }
    //修改函数
    upData = (data) => {
        let index = this.state.data.findIndex(val => val.id == data.id)
        if (index > -1) {
            this.setState({
                data: [...this.state.data.slice(0, index), data, ...this.state.data.slice(index + 1)]
            })
        }
    }

    //搜索
    search = (val) => {
        axios.get(prepaSeek(10, 1, val)).then(res => {
            // console.log(res)
            this.setState({
                data: res.data.tableData.rows
            })
        })
    }


    //table复选框调用
    // rowSelection = {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //         this.setState({
    //             delectData: selectedRowKeys
    //         })
    //     },
    //     onSelect: (record, selected, selectedRows) => { },
    //     onSelectAll: (selected, selectedRows, changeRows) => { },
    // };

    render() {
        const { intl } = this.props.currentLocale;
        const columns = [
            {
                title: intl.get('wsd.i18n.pre.proreview.name'),
                dataIndex: 'paName',
                key: 'paName',
                render: text => <span> <Icon type="folder" /> {text}</span>
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.code'),
                dataIndex: 'paCode',
                key: 'paCode',
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.epsname'),
                dataIndex: 'eps',
                key: 'eps',
                render: (text) => <span>{text.name}</span>
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.iptname'),
                dataIndex: 'org',
                key: 'org',
                render: (text) => <span>{text.name}</span>
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.username'),
                dataIndex: 'user',
                key: 'user',
                render: (text) => <span>{text.name}</span>
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.starttime'),
                dataIndex: 'planStartTime',
                key: 'planStartTime',
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.endtime'),
                dataIndex: 'planEndTime',
                key: 'planEndTime',
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.creattime'),
                dataIndex: 'creatTime',
                key: 'creatTime',
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.creator'),
                dataIndex: 'creator',
                key: 'creator',
                render: (text) => {
                    return text ? <span>{text.name}</span> : ''
                }
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.status'),
                dataIndex: 'status',
                key: 'status',
                render: (text) => <span>{text.name}</span>
            },
        ];
        //分页调用
        let pagination = {
            total: this.state.total,
            // hideOnSinglePage: true,
            current: this.state.currentPageNum,
            pageSize: this.state.pageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `每页${this.state.pageSize}/共${Math.ceil(this.state.data.length / this.state.pageSize)}页`,
            onShowSizeChange: (current, size) => {
                this.setState({
                    pageSize: size,
                    currentPage: 1
                }, () => {
                    this.getDataList()
                })
            },
            onChange: (page, pageSize) => {
                // console.log(this)
                this.setState({
                    currentPage: page
                }, () => {
                    this.getDataList()
                })
            }
        }
        return (
            <div>
                <TopTags addData={this.addData} data={this.state.rightData} del={this.delectData} search={this.search} />
                <div className={style.main}>
                    <div className={style.leftMain} style={{ height: this.props.height }}>
                        {/* <div style={{minWidth:800,overflow:"auto"}}> */}
                        <div style={{ minWidth: 'calc(100vw - 60px)' }}>
                            {this.state.data &&

                                <StandardTable columns={columns} dataSource={this.state.data}
                                    pagination={pagination}
                                    // rowSelection={this.rowSelection}
                                    rowKey={record => record.id}
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

                        {/* </div> */}
                    </div>
                    <div className={style.rightBox} style={{ height: this.props.height }}>
                        <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData} upData={this.upData} />
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
    })(Approval);
/* *********** connect链接state及方法 end ************* */