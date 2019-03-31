import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Spin } from 'antd'

import style from './style.less'
import DistributionBtn from "../../../../components/public/TopTags/DistributionBtn"
import DeleteTopBtn from "../../../../components/public/TopTags/DeleteTopBtn"
import DistributionBtnModal from "../Distribute"
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
class TableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            data: [{
                key: "123",
                id: 1,
                rsrcName: 1,
                rsrcCode: 1,
                rsrcRoleName: 1,
                rsrcType: 1,
                unit: 1,
                maxunit: 1,
                featureDesc: 1,
                calendarId: 1,
                status: 1,
                remark: 1,
            },
            {
                key: "122",
                id: 2,
                rsrcName: 1,
                rsrcCode: 1,
                rsrcRoleName: 1,
                rsrcType: 1,
                unit: 1,
                maxunit: 1,
                featureDesc: 1,
                calendarId: 1,
                status: 1,
                remark: 1,
            }]
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
                isShowDistribute: true
            })
        }
    }
    closeDistributionBtnModal = () => {
        this.setState({
            isShowDistribute: false
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
      
        const columns = [
            {
                title: intl.get('wsd.i18n.rsrc.rsrclist.rsrcname'),
                dataIndex: 'rsrcName',
                key: 'rsrcName',
            },
            {
                title: intl.get('wsd.i18n.rsrc.rsrclist.rsrccode'),
                dataIndex: 'rsrcCode',
                key: 'rsrcCode',
            },
            {
                title: intl.get('wsd.i18n.rsrc.rsrclist.rsrcrolename'),
                dataIndex: 'rsrcRoleName',
                key: 'rsrcRoleName',
            }
        ];

        return (
            <div className={style.main}>
                {this.state.initDone &&
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>资源角色</h3>
                        <div className={style.rightTopTogs}>

                            <DistributionBtn onClickHandle={this.onClickHandle.bind(this, "DistributionBtn")}></DistributionBtn>
                            <DeleteTopBtn onClickHandle={this.onClickHandle.bind(this, "DeleteTopBtn")}></DeleteTopBtn>
                            {this.state.isShowDistribute && <DistributionBtnModal handleCancel={this.closeDistributionBtnModal.bind(this)}></DistributionBtnModal>}
                        </div>
                        <div className={style.mainScorll} >
                            <Table className={style.table} columns={columns} dataSource={this.state.data} pagination={false}
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

                    </div>}
            </div>
        )
    }
}

export default TableComponent
// {
//             "wsd.i18n.rsrc.rsrclist.rsrcname" : "资源名称",
//             "wsd.i18n.rsrc.rsrclist.rsrccode" : "资源代码",
//             "wsd.i18n.rsrc.rsrclist.rsrcrolename" : "资源角色",
//             "wsd.i18n.rsrc.rsrclist.rsrctype" : "资源类型",
//             "wsd.i18n.rsrc.rsrclist.unit" : "计量单位",
//             "wsd.i18n.rsrc.rsrclist.maxunit" : "单位最大用量",
//             "wsd.i18n.rsrc.rsrclist.featuredesc" : "特征描述",
//             "wsd.i18n.rsrc.rsrclist.calendarid" : "资源日历",
//             "wsd.i18n.rsrc.rsrclist.status" : "状态",
//             "wsd.i18n.rsrc.rsrclist.remark" : "备注",
//     }