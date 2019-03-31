import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Icon } from 'antd'
import style from './style.less'
import emitter from '../../../api/ev'
import AddModal from "./AddModal"
import _ from 'lodash'
/* *********** 引入redux及redux方法 start ************* */
import { connect } from 'react-redux'
import store from '../../../store'
import { saveCurrentData, resetRightCurrentData } from '../../../store/rightData/action'
import { curdCurrentData, resetCurrentData } from '../../../store/curdData/action'
import { changeLocaleProvider } from '../../../store/localeProvider/action'
/* *********** 引入redux及redux方法 end ************* */
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
const locales = {
    "en-US": require('../../../api/language/en-US.json'),
    "zh-CN": require('../../../api/language/zh-CN.json')
}


class Delivery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            activeIndex: "",
            currentPage: 1,
            pageSize: 10,
            rightData: [],
            rightTags: [
                { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Plot/Delivery/BasicInfo' },
                { icon: 'iconwenjian', title: '文件信息', fielUrl: 'Components/FileInfo' },
                { icon: 'iconxiangmujihua', title: '项目计划', fielUrl: 'Plot/Delivery/ProjectPlan' },
                { icon: 'iconfenleima', title: '分类码', fielUrl: 'Components/CategoryCodeTwo' },
            ],

            data: [
                {
                    key: "[0]",
                    id: "1",
                    projectName: <span><Icon type="file-text" />三一集团</span>,
                    projectCode: "PRCWDSF",

                    status: "审核中",
                    children: [
                        {
                            key: "[0].chilren[0]",
                            id: "2",
                            projectName: <span><Icon type="file-text" />三一集团</span>,
                            projectCode: "PRCWDSF",

                            status: "审核中",
                        },
                    ]
                },
                {
                    key: "[1]",
                    id: "3",
                    projectName: <span><Icon type="file-text" />三一集团</span>,
                    projectCode: "PRCWDSF",

                    status: "审核中",
                    children: [
                        {
                            key: "[1].chilren[0]",
                            id: "4",
                            projectName: <span><Icon type="file-text" />三一集团</span>,
                            projectCode: "PRCWDSF",

                            status: "审核中",
                        }
                    ]
                },
            ]
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

    render() {

        const columns = [
            {
                title: intl.get('wsd.i18n.pre.project1.projectname'),
                dataIndex: 'projectName',
                key: 'projectName',
            },
            {
                title: intl.get('wsd.i18n.pre.project1.projectcode'),
                dataIndex: 'projectCode',
                key: 'projectCode',
            },
            {
                title: "类别",
                dataIndex: 'type',
                key: 'type',
            },

            {
                title: "存放位置",
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: "交付项",
                dataIndex: 'creator',
                key: 'creator',
            },
            {
                title: intl.get('wsd.i18n.pre.project1.status'),
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: "编制状态",
                dataIndex: 'prepareStatus',
                key: 'prepareStatus',
            },
        ];
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
        let pagination = {
            total: this.state.data.length,
            hideOnSinglePage: true,
            current: this.state.currentPage,
            pageSize: this.state.pageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `每页${this.state.pageSize}/共${Math.ceil(this.state.data.length / this.state.pageSize)}页`,
            onChange: (page, pageSize) => {
                console.log(this)
                this.setState({
                    currentPage: page
                })
            }
        }
        return (

            <div>
                <TopTags />
                <div className={style.main}>
                    <div className={style.leftMain} style={{ height: this.props.height }}>
                        <div style={{ minWidth: 'calc(100vw - 60px)' }}>
                            {this.state.initDone && this.state.data &&
                                <Table className={style.Infotable1} columns={columns} dataSource={this.state.data} pagination={pagination}
                                    rowClassName={this.setClassName}
                                    rowSelection={rowSelection}
                                    rowKey={record => record.id}
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
    })(Delivery);
/* *********** connect链接state及方法 end ************* */
