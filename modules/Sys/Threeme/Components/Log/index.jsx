import React, { Component } from 'react'
import { Icon, Menu, Layout, DatePicker, Button, Input, Table, Select } from 'antd';
import style from './style.less'
import axios from "../../../../../api/axios"
import { tmmAuditlist } from "../../../../../api/api"
import { connect } from 'react-redux';
import MyTable from "../../../../../components/Table"
const Option = Select.Option
const { TextArea } = Input;
const { MonthPicker, RangePicker } = DatePicker;
const Search = Input.Search;
class Log extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPageNum: 1,
            pageSize: 10,
            data: [],
            thisTime: 1
        }
    }
    componentDidMount() {
        this.getDataList()
    }
    //获取日志分页
    getDataList = () => {

        let url = `?thisTime=${this.state.thisTime}`
        if (this.state.startTime) {
            url = url + `&startTime=${this.state.startTime}&endTime=${this.state.endTime}`
        }
        if (this.state.searcher) {
            url = url + `&searcher=${this.state.searcher}`
        }
        axios.get(tmmAuditlist(this.state.pageSize, this.state.currentPageNum) + url).then(res => {
            console.log(res)
            this.setState({
                data: res.data.tableData.rows,
                total: res.data.tableData.total
              })
        })
    }
    //选择月
    selectChange = (v) => {
        this.setState({
            thisTime: v
        })
    }
    //选择时间段
    onRangePickerChange = (v) => {
        console.log(v)
        if(v.length>1){
            this.setState({
                startTime: v[0].format('YYYY-MM-DD'),
                endTime: v[1].format('YYYY-MM-DD')
            })
        }
        
    }
    render() {
        const { intl } = this.props.currentLocale
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',

                title: '应用名称',
                dataIndex: 'applicationName',
                key: 'applicationName',
            },
            {
                title: '日志类型',
                dataIndex: 'loggerType',
                key: 'loggerType',
            },
            {
                title: '模块名称',
                dataIndex: 'moduleName',
                key: 'moduleName',
            },
            {
                title: '操作时间',
                dataIndex: 'creatTime',
                key: 'creatTime',
            },
            {
                title: '操作名称',
                dataIndex: 'operationName',
                key: 'operationName',
            },
            {
                title: '操作人员',
                dataIndex: 'operationUser',
                key: 'operationUser',
            },
            {
                title: '访问IP地址',
                dataIndex: 'ipAddress',
                key: 'ipAddress',
            },
            {
                title: '操作描述',
                dataIndex: 'operationDesc',
                key: 'operationDesc',
            },
            {
                title: '操作结果',
                dataIndex: 'operationResult',
                key: 'operationResult',
            },
            {
                title: '异常信息',
                dataIndex: 'exception',
                key: 'exception',
            },
        ];
        let pagination = {
            total: this.state.total,
            // hideOnSinglePage: true,
            current: this.state.currentPageNum,
            pageSize: this.state.pageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `每页${this.state.pageSize}/共${Math.ceil(this.state.total / this.state.pageSize)}页`,
            onShowSizeChange: (current, size) => {
              this.setState({
                pageSize: size,
                currentPageNum: 1
              }, () => {
                this.getDataList()
              })
            },
            onChange: (page, pageSize) => {
              // console.log(this)
              this.setState({
                currentPageNum: page
              }, () => {
                this.getDataList()
              })
            }
          }
        return (
            <div className={style.main}>
                <div className={style.setroleAuditTitle}>
                    <h4>日志查询</h4>
                </div>
                <div className={style.setroleAuditSearchMod}>
                    <div className={style.setroleAuditSearch}>
                        <RangePicker onChange={this.onRangePickerChange} />
                        <Select style={{ width: 200 ,marginRight:20}} onChange={this.selectChange} value={this.state.thisTime}>
                            <Option value={1}>本年</Option>
                            <Option value={2}>本月</Option>
                            <Option value={3}>本周</Option>
                            <Option value={4}>本日</Option>
                        </Select>
                        {/* <MonthPicker onChange={this.onChange} placeholder="Select month" locale={zhCN}/> */}
                        <Search
                            placeholder="请输入查询内容"
                            enterButton="查询"
                            onSearch={value => {
                                if (!value || value.trim() != "") {
                                    this.setState({
                                        searcher: value
                                    }, () => {
                                        this.getDataList()
                                    })
                                } else {
                                    this.getDataList()
                                }

                            }}
                            style={{ width: 200 }}
                        />
                    </div>
                    <Button className={style.setroleAuditBtn}>
                        <Icon type="upload" />
                        导出
                      </Button>
                </div>
                <MyTable
                 scroll={{ x: true }} columns={columns} 
                   pagination={pagination}
                   rowKey={record => record.id}
                   dataSource={this.state.data}
                   size="small"/>
            </div>
        )
    }
}


export default connect(state => ({ currentLocale: state.localeProviderData }))(Log);