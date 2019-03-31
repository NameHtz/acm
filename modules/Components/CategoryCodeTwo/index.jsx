import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Spin, Modal } from 'antd'
import DistributionBtn from "../../../components/public/TopTags/DistributionBtn"
import DeleteTopBtn from "../../../components/public/TopTags/DeleteTopBtn"

import dynamic from 'next/dynamic'
import style from "./style.less"
const confirm = Modal.confirm
const locales = {
    "en-US": require('../../../api/language/en-US.json'),
    "zh-CN": require('../../../api/language/zh-CN.json')
}
class CategoryCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            showDistribute: false,

        }
    }

    componentDidMount() {
        this.loadLocales();
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
    onClickHandle = (name) => {


        if (name == "DistributionBtn") {
            this.setState({
                showDistribute: true
            })
        }

        if (name == "DeleteTopBtn") {
            confirm({
                title: '您确定要删除分类码？',
                cancelText: '取消',
                okText: '确定',
                onOk() {

                }
            });
        }


    }
    closeDistributeModal = () => {
        this.setState({
            showDistribute: false
        })
    }
    getInfo = (record, index) => {
       
        this.setState({
            activeIndex: record.id
        })
    }

    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    }
    render() {
        const DistributeModal = dynamic(import('./DistributeModal/index'), {
            loading: () => <Spin size="small" />
        })
        const columns = [
            {
                title: '分类码',
                dataIndex: 'categoryCode',
                key: 'categoryCode',
            },
            {
                title: '码值',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: '说明',
                dataIndex: 'intro',
                key: 'intro',
            },
        ]
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
            <div className={style.main}>
                {this.state.initDone &&
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>分类码</h3>
                        <div className={style.rightTopTogs}>
                            <DistributionBtn onClickHandle={this.onClickHandle.bind(this)}></DistributionBtn>
                            <DeleteTopBtn onClickHandle={this.onClickHandle.bind(this)}></DeleteTopBtn>
                            {this.state.showDistribute && <DistributeModal handleCancel={this.closeDistributeModal.bind(this)}></DistributeModal>}

                        </div>
                        <div className={style.mainScorll} >
                            <Table  columns={columns} dataSource={this.state.data} pagination={false} name={this.props.name} rowSelection={rowSelection} rowClassName={this.setClassName}
                                rowClassName={this.setClassName}
                               onRow={(record, index) => {
                                    return {
                                        onClick: (event) => {
                                            this.getInfo(record, index)
                                        }
                                    }
                                }
                                }
                            />
                        </div>


                    </div>}
            </div>
        )
    }
}

export default CategoryCode
