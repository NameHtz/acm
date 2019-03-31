import React, { Component } from 'react'
import style from './style.less'
import { Table, Icon } from 'antd';
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
import intl from 'react-intl-universal'
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
class TempDoc extends Component {

    state = {
        initDone: false,
        activeIndex: "",
        rightData: null,
        rightTags: [
            { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Sys/Menu/MenuInfo' },
        ],
        columns: [{
            title: '文件名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <span> <Icon type="eye" className={style.icon} />{text} </span>
        }, {
            title: '创建日期',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: '创建人',
            dataIndex: 'creator',
            key: 'creator',
        }],
        data: [{
            key: '1',
            id: 1,
            name: 'EC00620-pmis.xls',
            date: '2019-01-11 9:00:00',
            creator: '任正华',
        }, {
            key: '2',
            id: 2,
            name: 'EC00620.xls',
            date: '2019-01-11 9:00:00',
            creator: '谭义',
        }]

    }
    componentDidMount() {
        this.loadLocales();


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
            this.props.resetRightCurrentData()
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

    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
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
        return (
            <div >
                <TopTags />
                <div className={style.main}>
                    <div className={style.leftMain} style={{ height: this.props.height }}>
                        <Table rowSelection={this.rowSelection} columns={this.state.columns} dataSource={this.state.data}
                            rowKey={record => record.id} pagination={false}
                            rowClassName={this.setClassName}
                            onRow={(record, index) => {
                                return {
                                    onClick: (event) => {
                                        this.getInfo(record, index)
                                    }
                                }
                            }
                            } />
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
    })(TempDoc);
  /* *********** connect链接state及方法 end ************* */
