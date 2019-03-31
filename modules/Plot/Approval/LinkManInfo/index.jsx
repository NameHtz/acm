import React, { Component } from 'react'
// import intl from 'react-intl-universal'
import { Table, Icon, Spin, notification } from 'antd'
import style from './style.less'
import ModeTable from '../../../../components/Table/index'
import { connect } from 'react-redux'
import AddTopBtn from "../../../../components/public/TopTags/AddTopBtn"
import ModifyTopBtn from "../../../../components/public/TopTags/ModifyTopBtn"
import DeleteTopBtn from "../../../../components/public/TopTags/DeleteTopBtn"
import SearchTopBtn from "../../../../components/public/TopTags/SearchTopBtn"
import LinkModal from '../LinkModal/index'
import axios from '../../../../api/axios'
import { prepaContactsList, prepaContactsDel } from '../../../../api/api'

// const locales = {
//     "en-US": require('../../../../api/language/en-US.json'),
//     "zh-CN": require('../../../../api/language/zh-CN.json')
// }
class FileInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            addlinkman: false,//新增联系人
            modifylinkman: false,//
            data: [],
            record: null,
            currentPage: 1,
            pageSize: 10,
            selectedRowKeys: [],
            total: null,
        }
    }

    getDataList = () => {
        axios.get(prepaContactsList(this.props.data.id, this.state.pageSize, this.state.currentPage)).then(res => {
            console.log(res)
            this.setState({
                data: res.data.data,
                total: res.data.total
            })
        })
    }

    componentDidMount() {

        this.getDataList()

    }

    onClickHandle = () => {

    }
    showAddLinkMan = () => {
        this.setState({
            addlinkman: true
        })
    }
    closeAddLinkMan = () => {
        this.setState({
            addlinkman: false
        })
    }

    showModifylinkman = () => {
        if (this.state.record) {
            this.setState({
                modifylinkman: true
            })
        } else {
            notification.warning(
                {
                    placement: 'bottomRight',
                    bottom: 50,
                    duration: 2,
                    message: '未选中数据',
                    description: '请选择数据进行操作'
                }
            )
        }

    }
    closeModifylinkman = () => {
        this.setState({
            modifylinkman: false
        })
    }

    getInfo = (record, index) => {

        // this.setState({
        //     activeIndex: record.id,
        //     record
        // })
        let id = record.id, records = record
        const { activeIndex } = this.state
        if (activeIndex === record.id) {
            this.setState({
                activeIndex: null,
                record: null
            })
        } else {
            this.setState({
                activeIndex: id,
                record
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
    //更新函数
    upData = (data) => {
        let index = this.state.data.findIndex(v => v.id == data.id)
        this.setState((preState, props) => ({
            data: [...preState.data.slice(0, index), data, ...preState.data.slice(index + 1)],
        }))
    }
    //删除
    showDelete = () => {
        let record = this.state.record
        let data = []
        data = this.state.selectedRowKeys;
        if (record) { //判断是否传值
            data.push(record.id)
        }
        if (data.length) { //判断数组里面是否有值
            axios.deleted(prepaContactsDel, { data }, true).then(res => {

                var copyData = [...this.state.data]
                data.map(item => {
                    let i = copyData.findIndex(val => val.id == item)
                    if (i != -1) {
                        copyData = [...copyData.slice(0, ind), ...copyData.slice(ind + 1)]
                    }
                })


                this.setState({
                    selectedRowKeys: [],
                    data: copyData
                })
            })
        }
    }


    render() {
        // console.log(this.state.selectedRowKeys)
        const { intl } = this.props.currentLocale
        const columns = [
            {
                title: intl.get("wsd.i18n.sys.ipt.username"),//联系人
                dataIndex: 'contactName',
                key: 'contactName',
            },
            {
                title: intl.get("wsd.i18n.plot.approval.unit"),//联系单位
                dataIndex: 'contactUnit',
                key: 'contactUnit',
            },
            {
                title: intl.get("wsd.i18n.sys.ipt.phone"),//联系电话
                dataIndex: 'contactPhone',
                key: 'contactPhone',
            },
            {
                title: intl.get("wsd.i18n.sys.ipt.remark"),//备注
                dataIndex: 'remark',
                key: 'remark',
            },

        ];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys
                })
            },
            onSelect: (record, selected, selectedRows) => {
                // console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                // console.log(selected, selectedRows, changeRows);
            },
        };
        let pagination = {
            total: this.state.total,
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
                this.setState({
                    currentPage: page
                }, () => {
                    this.getDataList()
                })
            }
        }
        return (
            <div className={style.main}>
                <div className={style.mainHeight}>
                    <h3 className={style.listTitle}>联系人信息</h3>
                    <div className={style.rightTopTogs}>
                        <AddTopBtn onClickHandle={this.showAddLinkMan.bind(this)}></AddTopBtn>
                        <ModifyTopBtn onClickHandle={this.showModifylinkman.bind(this)}></ModifyTopBtn>
                        <DeleteTopBtn onClickHandle={this.showDelete.bind(this)}></DeleteTopBtn>
                        <SearchTopBtn onClickHandle={this.onClickHandle}></SearchTopBtn>
                        {this.state.addlinkman && <LinkModal addlinkman={this.state.addlinkman} handleCancel={this.closeAddLinkMan.bind(this)} addBiz={this.props.data} linkAdd={this.addData} title="新增联系人"></LinkModal>}
                        {this.state.modifylinkman && <LinkModal modifylinkman={this.state.modifylinkman} handleCancel={this.closeModifylinkman.bind(this)} upDataBiz={this.state.record} upData={this.upData} title="修改联系人"></LinkModal>}
                    </div>
                    <div className={style.mainScorll}>
                        <Table columns={columns} dataSource={this.state.data} pagination={pagination}
                            size='small' rowKey={record => record.id}
                            name={this.props.name}
                            rowSelection={rowSelection}
                            rowClassName={this.setClassName}
                            onRow={(record, index) => {
                                return {
                                    onClick: (event) => {
                                        event.currentTarget.getElementsByClassName("ant-checkbox-wrapper")[0].click()
                                        this.getInfo(record, index)
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    currentLocale: state.localeProviderData
}))(FileInfo)
