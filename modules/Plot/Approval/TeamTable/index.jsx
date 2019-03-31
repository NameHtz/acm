import React, { Component } from 'react'
import { Table, Checkbox, Spin, notification, Select } from 'antd'
import style from './style.less'
import dynamic from 'next/dynamic'
import AddTopBtn from "../../../../components/public/TopTags/AddTopBtn"
import ModifyTopBtn from "../../../../components/public/TopTags/ModifyTopBtn"
import DistributionBtn from "../../../../components/public/TopTags/DistributionBtn"
import DeleteTopBtn from "../../../../components/public/TopTags/DeleteTopBtn"
import ImportDropdownBtn from "../../../../components/public/TopTags/ImportDropdownBtn"
import AddTeamModal from "../AddTeamModal"
import ImportOneModal from "../ImportOneModal"
import ImportTwoModal from "../ImportTwoModal"
import Distribute from '../Distribute'
import { connect } from 'react-redux'
import axios from '../../../../api/axios'
import { prepaTree, prepaProjectteamDel, prepaProjectteamUserList, prepaProjectteamUserUpdate, prepaProjectteamUserDel } from '../../../../api/api'
import * as util from '../../../../utils/util'


const Option = Select.Option;

class TeamInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            modify: false,
            addmodal: false,
            activeIndex1: null,
            record1: null,
            activeIndex2: null,
            record2: null,
            isShowImportModal: false,
            isShowImporTwotModal: false,
            dataMap: [],
            selectedRowKeys: [],
            selectedRows1: [],
            data1: [],
            data2: [],
        }
    }

    getDataList = () => {
        // console.log(this.props.data)
        axios.get(prepaTree(this.props.data.id)).then(res => {
            // console.log(res)
            if (res.data.data) {
                let dataMap = util.dataMap(res.data.data)
                this.setState({
                    data1: res.data.data,
                    dataMap
                })
            }
        })

        //获取用户角色
        axios.get("api/sys/role/list").then(res => {
            this.setState({
                rolelist: res.data.data
            })
        })
    }

    componentDidMount() {
        this.getDataList()
    }

    getRightData = () => {
        let { record1 } = this.state;
        // console.log(record1)
        if (record1) {
            axios.get(prepaProjectteamUserList(record1.id)).then(res => {
                let data = res.data.data;
                if (res.data.data.length) {
                    let arr = [];
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].roles) {
                            for (let j = 0; j < data[i].roles.length; j++) {
                                arr.push(data[i].roles[j].id);
                            }
                            data[i].roles = arr;
                            arr = [];
                        }
                    }
                }
                console.log(data)
                this.setState({
                    data2: data
                })
            })
        }

    }


    onClickHandle = (name, type) => {
        console.log(name, type)
        if (name == "AddTopBtn") {
            this.setState({
                addmodal: true
            })
            return
        }
        if (name == 'ModifyTopBtn') {
            if (this.state.record1) {
                this.setState({
                    modify: true
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
            return
        }

        if (name == 'DeleteTopBtn') {
            let { record1 } = this.state;
            if (record1) {
                // console.log(record1)
                axios.deleted(prepaProjectteamDel, { data: [record1.id] }, true).then(res => {
                    // console.log(res)
                    let { data1, dataMap } = this.state
                    util.deleted(data1, dataMap, record1);
                    this.setState({
                        data1,
                        record1: null
                    })
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
            return
        }

        if (name == "DistributionBtn") {
            if (this.state.record1) {
                this.setState({
                    distributeType: true
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

            return
        }
        if (name == "ImportDropdownBtn") {
            if (type == "组织机构导入") {
                this.setState({
                    isShowImportModal: true,
                    ImportModaltitle: type
                })
                return
            }
            if (type == "IPT导入") {
                this.setState({
                    isShowImportModal: true,
                    ImportModaltitle: type
                })
                return
            }
            if (type == "其他项目导入") {
                this.setState({
                    isShowImporTwotModal: true,
                    ImportModaltitle: type
                })
                return
            }
        }
    }
    clickHandle = (name) => {

        if (name == 'DeleteTopBtn') {
            let { selectedRowKeys } = this.state;
            if (selectedRowKeys.length) {
                // console.log(record1)
                axios.deleted(prepaProjectteamUserDel, { data: selectedRowKeys }, true).then(res => {
                    console.log(res)

                    let copyData = [...this.state.data2]
                    selectedRowKeys.map((item) => {
                        let ind = copyData.findIndex(val => val.id == item)
                        if (ind != -1) {
                            copyData = [...copyData.slice(0, ind), ...copyData.slice(ind + 1)]
                        }
                    })


                    this.setState({
                        data2: copyData,
                        selectedRowKeys: []
                    })
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
            return
        }
    }
    closeImportOneModal = () => {
        this.setState({
            isShowImportModal: false
        })
    }
    closeImportTwoModal = () => {
        this.setState({
            isShowImporTwotModal: false
        })
    }
    closeAddModal = () => {
        this.setState({
            addmodal: false
        })
    }
    closeModifyModal = () => {
        this.setState({
            modify: false
        })
    }
    closeDistributeModal = () => {
        this.setState({
            distributeType: false
        })
    }
    getInfo1 = (record, index) => {
        if (this.state.activeIndex1 == record.id) {
            this.setState({
                activeIndex1: null,
                record1: null
            })
        } else {
            this.setState({
                activeIndex1: record.id,
                record1: record
            }, () => {
                this.getRightData()
            })

        }

    }

    setClassName1 = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex1 ? "tableActivty" : "";
    }
    getInfo2 = (record, index) => {

        if (this.state.activeIndex2 == record.id) {
            this.setState({
                activeIndex2: null,
                record2: null
            })
        } else {
            this.setState({
                activeIndex2: record.id,
                record2: record.id
            })
        }

    }

    setClassName2 = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex2 ? "tableActivty" : "";
    }

    /**
     *新增
     * @val 新增的数据
     */
    addData = (val) => {
        const { data1, dataMap, record1 } = this.state;
        util.create(data1, dataMap, record1, val)
        this.setState({
            data1,
            dataMap
        })
    }

    //修改
    upData = (val) => {
        const { data1, dataMap, record1 } = this.state;
        util.modify(data1, dataMap, record1, val);
        this.setState({
            data1
        })
    }

    handleSelectdata = (record, val) => {
        const { record1 } = this.state;
        axios.put(prepaProjectteamUserUpdate(record1.id, record.id), val, true).then(res => {
            console.log(res)
        })

    }




    render() {
        const { intl } = this.props.currentLocale;
        const columns1 = [
            {
                title: intl.get("wsd.i18n.plan.prepa.teamName"),//部门名称
                dataIndex: 'teamName',
                key: 'teamName',
            },
            {
                title: intl.get("wsd.i18n.plan.prepa.teamCode"),//部门代码
                dataIndex: 'teamCode',
                key: 'teamCode',
            }
        ];
        const columns2 = [
            {
                title: intl.get("wsd.i18n.plan.prepa.username"),//用户名称
                dataIndex: 'user',
                key: 'user',
                render: text => <span>{text.name}</span>
            },
            {
                title: intl.get("wsd.i18n.plan.prepa.userid"),//用户账号
                dataIndex: 'user',
                key: 'user',
                render: text => <span>{text.code}</span>
            },

            {
                title: intl.get("wsd.i18n.plan.prepa.userrole"),//用户角色
                dataIndex: 'roles',
                key: 'roles',
                render: (text, record) => {
                    return <Select style={{ width: "100%" }} defaultValue={text} onChange={this.handleSelectdata.bind(this, record)}
                        mode="multiple"
                    // onBlur={this.selectBlur} onFocus={this.selectFocus.bind(this, record)}
                    >
                        {this.state.rolelist && this.state.rolelist.map(item => {
                            return <Option value={item.id} key={item.id}>{item.roleDesc}</Option>
                        })}
                    </Select>
                }
            },


        ];

        const { selectedRowKeys } = this.state;
        const rowSelection2 = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys, selectedRows);
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
        // const Distribute = dynamic(import('../Distribute/index'), {
        //     loading: () => <Spin size="small" />
        // })

        return (
            <div className={style.main}>
                <div className={style.cotent}>
                    <div className={style.left}>
                        <h3 className={style.listTitle}><p>部门</p></h3>
                        <div className={style.listIcon}>
                            <AddTopBtn onClickHandle={this.onClickHandle}></AddTopBtn>
                            <ModifyTopBtn onClickHandle={this.onClickHandle}></ModifyTopBtn>
                            <DeleteTopBtn onClickHandle={this.onClickHandle.bind(this)}></DeleteTopBtn>
                            <ImportDropdownBtn onClickHandle={this.onClickHandle}></ImportDropdownBtn>
                            {this.state.addmodal && (
                                <AddTeamModal title="新增项目团队" handleCancel={this.closeAddModal} visible={this.state.addmodal}
                                    record={this.state.record1} addData={this.addData}
                                    data={this.props.data} />
                            )}
                            {this.state.modify && (
                                <AddTeamModal title="修改项目团队" handleCancel={this.closeModifyModal} visible={this.state.modify}
                                    record={this.state.record1} upData={this.upData} />
                            )}

                            {this.state.isShowImportModal && <ImportOneModal title={this.state.ImportModaltitle} visible={this.state.isShowImportModal}
                                handleCancel={this.closeImportOneModal.bind(this)} data={this.props.data} record={this.state.record1}
                                getDataList={this.getDataList} />}

                            {this.state.isShowImporTwotModal && <ImportTwoModal title={this.state.ImportModaltitle} visible={this.state.isShowImporTwotModal}
                                handleCancel={this.closeImportTwoModal.bind(this)} data={this.props.data} getDataList={this.getDataList} />}

                        </div>
                        <div className={style.table}>
                            <Table columns={columns1} dataSource={this.state.data1}
                                pagination={false} name={this.props.name}
                                size='small'
                                // rowSelection={rowSelection1} 
                                rowKey={(record, index) => (record.id + 'cen' + index)}
                                rowClassName={this.setClassName1}
                                defaultExpandAllRows={true}
                                onRow={(record, index) => {
                                    return {
                                        onClick: (event) => {
                                            this.getInfo1(record, index)
                                        }
                                    }
                                }
                                } />
                        </div>
                    </div>
                    <div className={style.right}>
                        <h3 className={style.listTitle}><p className={style.textcolor}>用户</p></h3>
                        <div className={style.listIcon}>
                            <DistributionBtn onClickHandle={this.onClickHandle}></DistributionBtn>
                            <DeleteTopBtn onClickHandle={this.clickHandle.bind(this)}></DeleteTopBtn>
                            {this.state.distributeType &&
                                <Distribute visible={this.state.distributeType} record={this.state.record1} getRightData={this.getRightData}
                                    handleCancel={this.closeDistributeModal.bind(this)} />
                            }
                        </div>
                        <div className={style.table}>
                            <Table columns={columns2} dataSource={this.state.data2}
                                pagination={false} name={this.props.name}
                                rowSelection={rowSelection2}
                                size='small'
                                rowClassName={this.setClassName2}
                                rowKey={(record, index) => (record.id)}
                                onRow={(record, index) => {
                                    return {
                                        onClick: (event) => {
                                            event.currentTarget.getElementsByClassName("ant-checkbox-wrapper")[0].click()
                                            this.getInfo2(record, index)
                                        }
                                    }
                                }
                                } />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    currentLocale: state.localeProviderData
}))(TeamInfo)
