import React, { Component } from 'react'
import RightTags from "../../../Components/RightDragAndDrop"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as codeRuleAction from '../../../../store/base/codeRule/action';
import { Table, Icon, Modal } from 'antd';
import AddTopBtn from '../../../../components/public/TopTags/AddTopBtn';
import ModifyTopBtn from '../../../../components/public/TopTags/ModifyTopBtn';
import DeleteTopBtn from '../../../../components/public/TopTags/DeleteTopBtn';
import AddBusinessObject from './AddBusinessObject';
import CheckBtn from '../../../../components/public/TopTags/CheckBtn';
import MaintRuleTypeTopBtn from '../../../../components/public/TopTags/MaintRuleTypeTopBtn';
import AddRule from './AddRule/';
import CheckModal from './CheckModal';
import style from './style.less';
import { baseCoderuleboList, deleteCoderulebo, ruleList, deleteRule, checkRule } from "../../../../api/api";
import axios from "../../../../api/axios"
class CodeRule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wfList: [],//业务列表
            selectedRowKeys1: [],//业务对象复选框
            leftmenu: [],//业务列表选择对象
            wftype: "add",
            ruleList: [],
            activeIndex2: [],//规则选择行颜色标记
            rightData: []//规则选择数据
        }
    }
    //获取业务列表
    getWfList = () => {
        axios.get(baseCoderuleboList).then(res => {
            console.log("wf", res)
            this.setState({
                wfList: res.data.data,
                selectedRowKeys1: [res.data.data[0].id],
                activeIndex1: res.data.data[0].id,
                leftmenu: res.data.data[0],
            }, () => {
                this.getRuleList()
                this.props.actions.saveCodeRuleBo(this.state.leftmenu)
            })
        })
    }
    //获取右侧数据
    getRuleList = () => {
        const { leftmenu } = this.state
        axios.get(ruleList(leftmenu.id)).then(res => {
            console.log(res.data.data)
            this.setState({
                ruleList: res.data.data
            })
        })
    }
    componentDidMount() {
        this.getWfList()


    }
    //业务列表选择
    getInfo1 = (record, event) => {
        let id = record.id
        record = record;
        /* *********** 点击表格row执行更新state start ************* */
        if (this.state.activeIndex1 == id) {
            return
        } else {
            this.setState({
                activeIndex1: id,
                leftmenu: record,
                selectedRowKeys1: [id]
            }, () => {
                this.props.actions.saveCodeRuleBo(record)
                this.getRuleList()
            });
        }

    };
    //业务表行颜色
    setClassName1 = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex1 ? 'tableActivty' : '';
    };
    //规则表行颜色
    setClassName2 = (record, index) => {
        // 判断索引相等时添加行的高亮样式
        //判断索引相等时添加行的高亮样式
        if (this.state.activeIndex2.findIndex(value => record.id === value) > -1) {
            return 'tableActivty'
        } else {
            return "";
        }

    };
    //新增业务对象
    addCoderulebo = (data) => {
        const { wfList } = this.state
        wfList.push(data)
        this.setState({
            wfList,

        })
    }
    //更新业务对象
    updateCoderulebo = (data) => {
        const { wfList } = this.state
        let index = wfList.findIndex(item => item.id == data.id)
        wfList[index] = data
        this.setState({
            wfList,
            //更新当前数据
            leftmenu: data
        })
    }
    onClickHandle1 = name => {
        if (name == 'AddTopBtn') {
            this.setState({
                isShowModal: true,
                wftype: "add",
                ModalTitle: '新增业务对象',
            });
            return;
        }
        if (name == 'ModifyTopBtn') {
            this.setState({
                isShowModal: true,
                wftype: "modify",
                ModalTitle: '修改业务对象',
            });
            return;
        }
        if (name = "DeleteTopBtn") {
            const { leftmenu, wfList } = this.state
            let index = wfList.findIndex(item => item.id == leftmenu.id)

            axios.deleted(deleteCoderulebo(leftmenu.id), null, true).then(res => {
                this.setState(preState => ({
                    wfList: [...preState.wfList.slice(0, index), ...preState.wfList.slice(index + 1)]
                }), () => {
                    if (index > 1) {
                        this.setState({
                            activeIndex1: wfList[index - 1].id,
                            leftmenu: wfList[index - 1],
                            selectedRowKeys1: [wfList[index - 1].id]
                        }, () => {
                            this.getRuleList()
                        })
                        return
                    }
                    if (index == 0 && wfList.length > 1) {
                        this.setState({
                            activeIndex1: wfList[0].id,
                            leftmenu: wfList[0],
                            selectedRowKeys1: [wfList[0].id]
                        }, () => {
                            this.getRuleList()
                        })
                        return
                    }
                })
            })
        }
    };
    closeAddBusinessObjectModal = () => {
        this.setState({
            isShowModal: false,
        });
    };

    AddRule = (data) => {
        const { ruleList } = this.state
        ruleList.push(data)
        this.setState({
            ruleList
        })
    }
    onClickHandle2 = name => {
        if (name == 'AddTopBtn') {
            this.setState({
                isShowAddRule: true,
            });
            return;
        }
        if (name == 'DeleteTopBtn') {
            const { activeIndex2, ruleList } = this.state
            let array = ruleList
            console.log(activeIndex2)
            axios.deleted(deleteRule, { data: activeIndex2 }, true).then(res => {

                activeIndex2.forEach(item => {
                    let index = ruleList.findIndex(v => v.id == item)
                    if (index > -1) {
                        array.splice(index, 1)
                    }
                })
                this.setState({
                    ruleList: array,
                    activeIndex2: [],
                    rightData: []
                })
            })

            return;
        }
        if (name == "CheckBtn") {
            const { rightData,ruleList } = this.state
            if (rightData.length == 1) {
                axios.put(checkRule(rightData[0].id), {}).then(res => {
                    let index=ruleList.findIndex(item=>item.id==rightData[0].id)
                    ruleList[index].status=res.data.data.status
                    this.setState({
                        ruleList
                    })
                })
            }

            return
        }
        if ((name == 'MaintRuleTypeTopBtn')) {
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            let menu = userInfo.menus;
            const basic = menu.find((v, i) => {
                return v.menuName == '基础数据';
            });
            console.log(basic);
            const rule = basic.children.find((v, i) => {
                return v.menuName == '规则类型';
            });
            console.log(rule);
            this.props.callBackBanner(rule);
            return;
        }
    };
    closeAddRule = () => {
        this.setState({
            isShowAddRule: false,
        });
    };
    //查看节点新增
    onClickCheck1 = (ruleId, position) => {
        this.setState({
            isShowCheckModal: true,
            nodetype: "add",
            position: position,
            ruleId: ruleId,
        });
    }
    //查看节点修改
    onClickCheck = (ruleId, position) => {
        this.setState({
            isShowCheckModal: true,
            ruleId: ruleId,
            position: position,
            nodetype: "modify"
        });
    };
    closeCheckModal = () => {
        this.setState({
            isShowCheckModal: false,

        });
    };
    //刷新节点
    updateNode=(value)=>{
        const {ruleList,ruleId,position} = this.state
        let index= ruleList.findIndex(item=>item.id==ruleId)
        ruleList[index][`position${position}`]={id:value.id,name:value.ruleCellName}
    }
    render() {
        const { intl } = this.props.currentLocale
        const columns1 = [
            {
                title: <h3>业务对象</h3>,
                dataIndex: 'boName',
                key: 'boName',
            },
        ]
        const columns2 = [
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '规则名称',
                dataIndex: 'ruleName',
                key: 'ruleName',
            },
            {
                title: '第1阶段',
                dataIndex: 'position1',
                key: 'position1',
                render: (text, record) => {
                    if (text) {
                        return <a onClick={this.onClickCheck.bind(this, record.id, 1)}>{text.name}</a>
                    } else {
                        return <a onClick={this.onClickCheck1.bind(this, record.id, 1)}>查看</a>
                    }
                }
            },
            {
                title: '第2阶段',
                dataIndex: 'position2',
                key: 'position2',
                render: (text, record) => {
                    if (text) {
                        return <a onClick={this.onClickCheck.bind(this, record.id, 2)}>{text.name}</a>
                    } else {
                        return <a onClick={this.onClickCheck1.bind(this, record.id, 2)}>查看</a>
                    }
                }
            },

            {
                title: '第3阶段',
                dataIndex: 'position3',
                key: 'position3',
                render: (text, record) => {
                    if (text) {
                        return <a onClick={this.onClickCheck.bind(this, record.id, 3)}>{text.name}</a>
                    } else {
                        return <a onClick={this.onClickCheck1.bind(this, record.id, 3)}>查看</a>
                    }
                }
            },
            {
                title: '第4阶段',
                dataIndex: 'position4',
                key: 'position4',
                render: (text, record) => {
                    if (text) {
                        return <a onClick={this.onClickCheck.bind(this, record.id, 4)}>{text.name}</a>
                    } else {
                        return <a onClick={this.onClickCheck1.bind(this, record.id, 4)}>查看</a>
                    }
                }
            },
            {
                title: '第5阶段',
                dataIndex: 'position5',
                key: 'position5',
                render: (text, record) => {
                    if (text) {
                        return <a onClick={this.onClickCheck.bind(this, record.id, 5)}>{text.name}</a>
                    } else {
                        return <a onClick={this.onClickCheck1.bind(this, record.id, 5)}>查看</a>
                    }
                }
            },
            {
                title: '第6阶段',
                dataIndex: 'position6',
                key: 'position6',
                render: (text, record) => {
                    if (text) {
                        return <a onClick={this.onClickCheck.bind(this, record.id, 6)}>{text.name}</a>
                    } else {
                        return <a onClick={this.onClickCheck1.bind(this, record.id, 6)}>查看</a>
                    }
                }
            },
            {
                title: '第7阶段',
                dataIndex: 'position7 ',
                key: 'position7',
                render: (text, record) => {
                    if (text) {
                        return <a onClick={this.onClickCheck.bind(this, record.id, 7)}>{text.name}</a>
                    } else {
                        return <a onClick={this.onClickCheck1.bind(this, record.id, 7)}>查看</a>
                    }
                }
            },
        ]
        const { selectedRowKeys1 } = this.state
        const rowSelection1 = {
            //去掉全选和反选
            hideDefaultSelections: true,
            selectedRowKeys: selectedRowKeys1,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({

                    selectedRowKeys1: selectedRowKeys
                })
            },
            onSelect: (record, selected, selectedRows) => {
                // console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                // console.log(selected, selectedRows, changeRows);
            },
        };
        const rowSelection2 = {

            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    activeIndex2: selectedRowKeys,
                    rightData: selectedRows,
                })
            },
            onSelect: (record, selected, selectedRows) => {
                // console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                // console.log(selected, selectedRows, changeRows);
            },
        };
        return (
            <div className={style.main}>
                <section className={style.leftbox}>
                    <div className={style.topButton}>
                        <AddTopBtn onClickHandle={this.onClickHandle1} />
                        <ModifyTopBtn onClickHandle={this.onClickHandle1} />
                        <DeleteTopBtn onClickHandle={this.onClickHandle1} />
                        {/* {this.state.isShowModal && <AddBusinessObject title={this.state.ModalTitle}
                         visible={this.state.isShowModal}
                         handleCancel={this.closeAddBusinessObjectModal.bind(this)}/>} */}
                        {this.state.isShowModal && <AddBusinessObject
                            data={this.state.leftmenu}
                            type={this.state.wftype}
                            title={this.state.ModalTitle}
                            handleCancel={this.closeAddBusinessObjectModal.bind(this)}
                            addCoderulebo={this.addCoderulebo}
                            updateCoderulebo={this.updateCoderulebo}
                        />}

                    </div>
                    <Table
                        rowKey={record => record.id}
                        columns={columns1}
                        size="small"
                        dataSource={this.state.wfList}
                        pagination={false}
                        rowSelection={rowSelection1}
                        rowClassName={this.setClassName1}
                        onRow={(record, index) => {
                            return {
                                onClick: event => {

                                    this.getInfo1(record, event);
                                },
                            };
                        }}
                    />
                </section>
                <div>
                    <RightTags >
                        <section className={style.rightbox}>
                            {/* <RightBox callBackBanner={this.props.callBackBanner} data={this.state.leftValues}></RightBox> */}
                            <div className={style.topButton}>
                                <AddTopBtn onClickHandle={this.onClickHandle2} />
                                <DeleteTopBtn onClickHandle={this.onClickHandle2} />
                                <CheckBtn onClickHandle={this.onClickHandle2} />
                                <MaintRuleTypeTopBtn onClickHandle={this.onClickHandle2} />
                                {/* {this.state.isShowAddRule && <AddRule visible={this.state.isShowAddRule}
                        handleCancel={this.closeAddRule.bind(this)} />} */}

                                <AddRule visible={this.state.isShowAddRule} handleCancel={this.closeAddRule.bind(this)} ruleBoId={this.state.leftmenu.id} AddRule={this.AddRule} />
                            </div>
                            <Table
                                size="small"
                                columns={columns2}
                                rowKey={record => record.id}
                                rowSelection={rowSelection2}
                                dataSource={this.state.ruleList}

                                pagination={false}
                                rowClassName={this.setClassName2}
                                onRow={(record, index) => {
                                    return {
                                        onClick: event => {
                                            event.currentTarget.getElementsByClassName("ant-checkbox-wrapper")[0].click()
                                        },
                                    };
                                }}
                            />
                            {this.state.isShowCheckModal && (
                                <CheckModal
                                    updateNode={this.updateNode}
                                    boId={this.state.leftmenu.id}
                                    position={this.state.position}
                                    ruleId={this.state.ruleId}
                                    handleCancel={this.closeCheckModal.bind(this)}
                                    type={this.state.nodetype}
                                />
                            )}
                        </section>
                    </RightTags>
                </div>

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        currentLocale: state.localeProviderData,
    }
};
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Object.assign({}, codeRuleAction), dispatch)
});
// export default connect(state => ({ currentLocale: state.localeProviderData }))(CodeRule);
export default connect(mapStateToProps, mapDispatchToProps)(CodeRule);