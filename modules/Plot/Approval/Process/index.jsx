import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Spin,Icon} from 'antd'
import StandardTable from '../../../../components/Table'
import style from './style.less'
import ProcessDealBtn from "../../../../components/public/TopTags/ProcessDealBtn"

import dynamic from 'next/dynamic'

import { meetingWfList } from '../../../../api/api'
import axios from '../../../../api/axios';
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
class FileInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            currentPage: 1,
            pageSize: 10,
            ProcessLogData:'',
            data: [
                // {
                //     key: "121",
                //     filename: "筑享云产品开发项目",
                //     starttime: "2018-12-21",
                //     endtime: "2019-11-21",
                //     nodename: "计划员审核",
                //     agent: "--",
                //     executor: "王胜平",
                //     status: "已审批",
                 
                // },
                // {
                //     key: "12211",
                //     filename: "ACM产品开发项目",
                //     starttime: "2018-12-21",
                //     endtime: "2019-11-21",
                //     nodename: "计划员审核",
                //     agent: "--",
                //     executor: "何文",
                //     status: "已审批",
                   
                // }
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
    onClickHandle = () => {

    }
    callback = () => {

    }
    //显示流程日志
    showProocessLogModal=(val)=>{
        console.log("流程日志")
        
        this.setState({
            isShowLog:true,
            ProcessLogData:val,
        })
    }
    closeProocessLogModal=()=>{
        this.setState({
            isShowLog:false
        })
    }
    //
    showFlowChartModal=()=>{
        console.log("流程图")
        this.setState({
            isShowFlow:true
        })
    }
    closeFlowChartModal=()=>{
        this.setState({
            isShowFlow:false
        })
    }
    getMeetingWfList = () => {
        axios.get(meetingWfList(' ', this.state.pageSize,this.state.currentPage)).then(result=>{

        })
    }
    render() {
        const ProcessLogModal = dynamic(import('./ProcessLogModal/index'), {
            loading: () => <Spin size="small" />
        })
        const FlowChartModal = dynamic(import('./FlowChartModal/index'), {
            loading: () => <Spin size="small" />
        })
        const columns = [
            {
                title: intl.get('wsd.i18n.base.planTem.name'),
                dataIndex: 'filename',
                key: 'filename',
                render: (text, record) => (
                    <span> <Icon type="eye" onClick={this.showFlowChartModal.bind(this.record)} style={{marginRight:"5px"}}/>{text}</span>
                  )
            },
            {
                title: "开始时间",
                dataIndex: 'starttime',
                key: 'starttime',
            },
            {
                title: "完成时间",
                dataIndex: 'endtime',
                key: 'endtime',
            },
            {
                title: "当前所属节点",
                dataIndex: 'nodename',
                key: 'nodename',
            },
            {
                title: "待办人",
                dataIndex: 'agent',
                key: 'agent',
            },
            {
                title: "停留时间",
                dataIndex: 'executor',
                key: 'executor',
            },
            {
                title: "状态",
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: "日志",
                dataIndex: 'oprate',
                key: 'oprate',
                render: (text, record) => (
                    <span>
                      <a href="javascript:;" onClick={this.showProocessLogModal.bind(this,record)}>查看</a>
                    </span>
                  )
            },


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

        let pagination = {
            total: this.state.data.length,
            // hideOnSinglePage:true,
            current: this.state.currentPage,
            pageSize: this.state.pageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `每页${this.state.pageSize}/共${Math.ceil(this.state.data.length / this.state.pageSize)}页`,
            onChange: (page, pageSize) => {
      
              this.setState({
                currentPage: page,
                pageSize
              })
      
            }
          }

        return (
            <div className={style.main}>
                {this.state.initDone &&
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>流程信息</h3>
                        <div className={style.rightTopTogs}>
                            <ProcessDealBtn onClickHandle={this.onClickHandle.bind(this)}></ProcessDealBtn>
                        </div>
                        <div className={style.mainScorll} >
                        <StandardTable 
                        columns={columns} 
                        dataSource={this.state.data} 
                        pagination={pagination} 
                        name={this.props.name} 
                        rowSelection={rowSelection} />
                        </div>
                       
                        {this.state.isShowLog && <ProcessLogModal 
                        handleCancel={this.closeProocessLogModal.bind(this)} 
                        ProcessLogData={this.state.ProcessLogData}></ProcessLogModal>}
                        {this.state.isShowFlow && <FlowChartModal handleCancel={this.closeFlowChartModal.bind(this)} index={3}></FlowChartModal>}
                    </div>}
            </div>
        )
    }
}

export default FileInfo
