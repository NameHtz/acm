import React, { Component } from 'react'
import { Table, Checkbox, Spin, Modal, notification } from 'antd'
import style from './style.less'
import DistributionBtn from "../../../../components/public/TopTags/DistributionBtn"
import DeleteTopBtn from "../../../../components/public/TopTags/DeleteTopBtn"
import Distribute from "../Distribute"
import { connect } from 'react-redux'
import axios from '../../../../api/axios'
import { cprtmList, cprtmDel } from '../../../../api/api'

const confirm = Modal.confirm

class TeamInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            selectedRowKeys: [],
        }
    }
    onClickHandle = (name) => {
        if (name == "DistributionBtn") {
            // console.log(this)
            this.setState({
                distributeType: true
            })
        }
        if (name == "DeleteTopBtn") {
            let { selectedRowKeys } = this.state;
            if (selectedRowKeys.length) {

                console.log(selectedRowKeys)

                axios.deleted(cprtmDel, {data: selectedRowKeys}, true).then(res => {
                    console.log(res);
                    //删除
                    let copyData = [...this.state.data]
                    selectedRowKeys.map((item) => {
                        let ind = copyData.findIndex(val => val.id == item)
                        if (ind != -1) {
                            copyData = [...copyData.slice(0, ind), ...copyData.slice(ind + 1)]
                        }
                    })
                    this.setState({
                        data: copyData,
                        selectedRowKeys: []
                    })
                })

            } else {
                //没有选择数据点击删除，提示
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
    }
    //控制分配弹窗开关
    closeDistributeModal = () => {
        this.setState({
            distributeType: false
        })
    }

    getDataList = () => {

        let { data, bizType } = this.props
        // console.log(data, bizType)
        axios.get(cprtmList(data.id, bizType)).then(res => {
            // console.log(res)
            this.setState({
                data: res.data.data
            })
        })
    }

    componentDidMount() {
        this.getDataList();
    }


    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? "tableActivty" : "";
    }
    getInfo = (record, index) => {

        this.setState({
            activeIndex: record.id
        })
    }
    render() {
        const { intl } = this.props.currentLocale;
        const columns = [
            {
                title: intl.get("wsd.i18n.operate.prepared.name"),//名称
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: intl.get("wsd.i18n.sys.menu.menucode"),//代码
                dataIndex: 'code',
                key: 'code',
            }


        ];
        let { selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys)
                this.setState({
                    selectedRowKeys,
                })
            }
        };

        return (
            <div className={style.main}>
                <div className={style.TeamTableB}>
                    <div className={style.listIcon}>
                        <DistributionBtn onClickHandle={this.onClickHandle}></DistributionBtn>
                        <DeleteTopBtn onClickHandle={this.onClickHandle}></DeleteTopBtn>
                        {this.state.distributeType && (
                            <Distribute visible={this.state.distributeType} handleCancel={this.closeDistributeModal.bind(this)}
                                bizType={this.props.bizType} data={this.props.data} getDataList={this.getDataList} />
                        )}
                    </div>
                    <Table
                        rowKey={record=>record.id}
                        className={style.table}
                        columns={columns}
                        dataSource={this.state.data}
                        pagination={false}
                        size='small'
                        name={this.props.name}
                        rowClassName={this.setClassName}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: (event) => {
                                    event.currentTarget.getElementsByClassName("ant-checkbox-wrapper")[0].click()
                                    this.getInfo(record, index)
                                }
                            }
                        }
                        }
                    />

                </div>
            </div>
        )
    }
}

export default connect(state => ({
    currentLocale: state.localeProviderData
}))(TeamInfo)
