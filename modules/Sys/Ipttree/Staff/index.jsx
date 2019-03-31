import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Icon, Select,message } from 'antd'
import dynamic from 'next/dynamic'
import style from './style.less'
import ValidTopBtn from "../../../../components/public/TopTags/ValidTopBtn"
import SearchTopBtn from "../../../../components/public/TopTags/SearchTopBtn"
import DeleteTopBtn from "../../../../components/public/TopTags/DeleteTopBtn"
import Distribute from "../../../Components/Distribute"
import DistributionBtn from "../../../../components/public/TopTags/DistributionBtn"

// 接口引入
import axios from '../../../../api/axios';
import { iptgetUser } from '../../../../api/api';
import * as util from '../../../../utils/util';
import { select } from 'redux-saga/effects';

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const Option = Select.Option;
class StaffInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            distributeType: false,
            //     data: [
            //         {
            //             key: "123",
            //             id: 1,
            //             name: "刘清风",
            //             code: "txg",
            //             lgname: "tsg",
            //             role: "项目经理",
            //             sex: "男",
            //             status: "在岗",
            //             userstatus: <Select defaultValue="有效">
            //                 <Option value="有效">有效</Option>
            //                 <Option value="无效">无效</Option>
            //             </Select>
            //         },
            //         {
            //             key: "1233333",
            //             id: 2,
            //             name: "刘清风",
            //             code: "txg",
            //             lgname: "tsg",
            //             role: "项目经理",
            //             sex: "男",
            //             status: "在岗",
            //             userstatus: <Select defaultValue="有效">
            //                 <Option value="有效">有效</Option>
            //                 <Option value="无效">无效</Option>
            //             </Select>
            //         },
            //         {
            //             key: "122343",
            //             id: 3,
            //             name: "刘清风",
            //             code: "txg",
            //             lgname: "tsg",
            //             role: "项目经理",
            //             sex: "男",
            //             status: "在岗",
            //             userstatus: <Select defaultValue="有效">
            //                 <Option value="有效">有效</Option>
            //                 <Option value="无效">无效</Option>
            //             </Select>
            //         },

            //     ]
        }
    }

    componentDidMount() {
        this.loadLocales();
        this.getU();
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
            // console.log(this)        
            this.setState({
                distributeType: true
            })

        }
        if (name == "SearchTopBtn") {

        }
        if (name == "DeleteTopBtn") {
            const {data,selectData}=this.state
            let index= data.findIndex(item=>item.id==selectData.id)
            this.setState(preStae=>({
                data:[...preStae.data.slice(0,index),...preStae.data.slice(index+1)]
            }))
            message.success("删除成功")
        }
    }
    //获取ipt人员列表
    getU = () => {
        console.log(this.props.data);
        axios.get(iptgetUser(this.props.data.id, 30, 1))
            .then(res => {
                console.log(res);
                // return false;
                this.setState({
                    data: res.data.tableData.rows,
                });

            })
           
    }
    getInfo = (record, index) => {
        let id=record.id
        if( this.state.activeIndex==id){
            record=null,
            id=null
        }
        this.setState({
            activeIndex: id,
            selectData:record
        })
    }
    closeDistribute = () => {
        this.setState({
            distributeType: false
        })
    }
    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    }
    render() {
        const columns = [
            {
                title: intl.get("wsd.i18n.sys.user.username"),
                dataIndex: 'actuName',
                key: 'actuName',
            },
            {
                title: intl.get("wsd.i18n.sys.ipt.loginname"),
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: intl.get("wsd.i18n.sys.ipt.rolename"),
                dataIndex: 'role',
                key: 'role',
                render: (text, record) => (
                    <span style={{ width: "100%" }} >
                        {text && text.map((item,i) => {
                            if(i==0){
                                return item.name
                            }
                            else{
                                return `，${item.name}`
                            }
                        })}
                    </span>
                )

            }

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

        return (
            <div className={style.main}>
                {this.state.initDone &&
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>员工列表</h3>
                        <div className={style.rightTopTogs}>

                          
                            <DistributionBtn onClickHandle={this.onClickHandle.bind(this)}></DistributionBtn>
                            <DeleteTopBtn onClickHandle={this.onClickHandle.bind(this)}></DeleteTopBtn>
                        </div>
                        <div className={style.mainScorll}>
                            <Table columns={columns} dataSource={this.state.data} pagination={true} name={this.props.name} rowSelection={rowSelection} rowKey={record => record.id}
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

                        {this.state.distributeType && (
                            <Distribute handleCancel={this.closeDistribute.bind(this)}  iptID={this.props.data.id} refushList={this.getU}/>
                        )}
                    </div>}
            </div>
        )
    }
}

export default StaffInfo
