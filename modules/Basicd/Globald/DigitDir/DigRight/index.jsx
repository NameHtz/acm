import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, message, Button } from 'antd'

import AddTopBtn from "../../../../../components/public/TopTags/AddTopBtn"
import DeleteTopBtn from "../../../../../components/public/TopTags/DeleteTopBtn"
import EditTypeModal from "./EditTypeModal"
import style from "./style.less"

/* *********** 引入redux及redux方法 start ************* */
import { connect } from 'react-redux'
import store from '../../../../../store'
import { saveCurrentData, resetRightCurrentData } from '../../../../../store/rightData/action'
import { curdCurrentData, resetCurrentData } from '../../../../../store/curdData/action'
import { changeLocaleProvider } from '../../../../../store/localeProvider/action'
/* *********** 引入redux及redux方法 end ************* */
const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}

class TableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible: false,
            title: '',
            activeIndex: '',
            // data: [{
            //     id: 1,
            //     key: 1,
            //     typeName: "问题类型",
            //     digitCode: "字典类型代码",
            //     boName: "对应对象名称",
            //     boCode: "对应业务代码",
            //     creator: "孙玻璃",
            //     creatTime: "2017-09-07",
            // }],
            data: this.props.data,
            columns: [],
            rightTag: [{
                id: 0,
                list: [
                    { icon: 'right-square', title: '基本信息', fielUrl: 'Basicd/Globald/DigitDir/DigitInfo' },
                    { icon: 'right-square', title: '字典码值', fielUrl: 'Basicd/Globald/DigitDir/DigitType' }
                ]
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

    componentDidMount() {
        this.loadLocales()
    }

    onClickHandle = (name) => {
        if (name == "AddTopBtn") {
            console.log(name)
            this.setState(
                { title: '新增字典类型', visible: true })
        }
    }

    handleCancel = (e) => {
        this.setState({ visible: false })
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
                        title: intl.get('wsd.i18n.base.digitdir.digitname'),
                        dataIndex: 'typeName',
                        key: 'typeName',
                    },
                    {
                        title: intl.get('wsd.i18n.base.digitdir.digitcode'),
                        dataIndex: 'typeCode',
                        key: 'typeCode',
                    },

                    {
                        title: intl.get('wsd.i18n.base.digitdir.creator'),
                        dataIndex: 'creator',
                        key: 'creator',
                        render: data => data && data.name ? data.name: ''
                    },
                    {
                        title: intl.get('wsd.i18n.base.digitdir.creattime'),
                        dataIndex: 'creatTime',
                        key: 'creatTime',
                    },
                ]
            });
        });
    }

    getInfo = (record, index) => {
        let id = record.id, records = record
        /* *********** 点击表格row执行更新state start ************* */
        if (this.state.activeIndex == id) {
            id = ''
            records = ''
        }
        this.setState({
            activeIndex: id
        })
        this.props.getTableInfo(record);
    }
    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    }
    onSelect = (value) => {
        console.log("==>" + value)
        this.setState({
            value,
            selectedValue: value,
        });
    }
    onChange = date => this.setState({ date })
    //处理新增
    handleAddClick = (data) => {
        this.props.getadddata(data)
    }

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
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };

        return (
            <div className={style.main}>
                <div className={style.topButton}>
                    <AddTopBtn onClickHandle={this.onClickHandle} />
                    <DeleteTopBtn onClickHandle={this.props.onHandleDelete} />
                </div>
                <Table columns={this.state.columns}
                    rowKey={record => record.id}
                    rowSelection={rowSelection}
                    dataSource={this.props.data}
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
                <EditTypeModal
                    title={this.state.title}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    boCode={this.props.boCode}
                    handleClick={this.handleAddClick}
                />
            </div>
        )
    }
}

/*export default TableComponent*/

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
