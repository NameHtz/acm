import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Tabs } from 'antd'
import style from './style.less'
import DistributionBtn from "../../../../../components/public/TopTags/DistributionBtn"
import DeleteTopBtn from "../../../../../components/public/TopTags/DeleteTopBtn"
import EditableTable from "./EditableTable"
import LogDistribute from "./LogDistribute";
const TabPane = Tabs.TabPane;
const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}
class Process extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            data: [
                {
                    key: "121",
                    filename: "筑享云产品开发项目",
                    starttime: "2018-12-21",
                    endtime: "2019-11-21",
                    nodename: "计划员审核",
                    agent: "--",
                    executor: "王胜平",
                    status: "已审批",
                    oprate: "查看（1）"
                },
                {
                    key: "12211",
                    filename: "ACM产品开发项目",
                    starttime: "2018-12-21",
                    endtime: "2019-11-21",
                    nodename: "计划员审核",
                    agent: "--",
                    executor: "何文",
                    status: "已审批",
                    oprate: "查看（5）"
                }

            ]
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
        if(name=="DistributionBtn"){
            this.setState({
                isShowDistribute:true
            })
        }
    }
    closeLogDistribute=()=>{
        this.setState({
            isShowDistribute:false
        })
    }
    callback = () => {

    }
    render() {
        const columns = [
            {
                title: "计划名称",
                dataIndex: 'filename',
                key: 'filename',
            },
            {
                title: "后续任务代码",
                dataIndex: 'starttime',
                key: 'starttime',
            },
            {
                title: "后续任务名称",
                dataIndex: 'endtime',
                key: 'endtime',
            },
            {
                title: "责任主体",
                dataIndex: 'nodename',
                key: 'nodename',
            },
            {
                title: "责任人",
                dataIndex: 'enclosure',
                key: 'enclosure',
            },
            {
                title: "关系类型",
                dataIndex: 'agent',
                key: 'agent',
            },
            {
                title: "延时",
                dataIndex: 'executor',
                key: 'executor',
            },
            {
                title: "计划开始时间",
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: "计划完成时间",
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: "操作",
                dataIndex: 'oprate',
                key: 'oprate',
            },


        ];

        return (
            <div className={style.main}>
                {this.state.initDone &&
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>逻辑关系</h3>
                        <div className={style.rightTopTogs}>
                        <DistributionBtn onClickHandle={this.onClickHandle.bind(this)}></DistributionBtn>
                        <DeleteTopBtn onClickHandle={this.onClickHandle.bind(this)}></DeleteTopBtn>
                        {this.state.isShowDistribute && <LogDistribute visible={this.state.isShowDistribute} handleCancel={this.closeLogDistribute.bind(this)}></LogDistribute>}
                        </div>
                        <div className={style.mainScorll}>
                            <Tabs defaultActiveKey="1" onChange={this.callback} type="card"
                                tabBarStyle={{ position: "relative", top: "1px" }}>
                                <TabPane tab="后续任务" key="1">
                                    <EditableTable></EditableTable>
                                </TabPane>
                                <TabPane tab="前紧任务" key="2">
                                <EditableTable></EditableTable>
                                </TabPane>

                            </Tabs>
                            </div>
                    </div>}
            </div>
        )
    }
}

export default Process
