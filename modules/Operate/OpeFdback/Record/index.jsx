import React, { Component } from 'react'
import { Table, Progress, Checkbox, Modal } from 'antd'
import intl from 'react-intl-universal'
import style from './style.less'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

export class OperatePreparedRecord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'PlanComponentsLog',
            initDone: false,
            columns: [],
            addBaselineVisiable: false,
            data: [
                {
                    id: 1,
                    progreStatus: '未开始',
                    progressEvaluation: '正常',
                    currentCompletion: 20,
                    problemSrisks: '--',
                    causeanAlysis: '--',
                    suggestion: '--',
                    feedbackTime: '2018-12-11',
                    feedbackPerson: '刘刘'
                },
                {
                    id: 2,
                    progreStatus: '未开始',
                    progressEvaluation: '正常',
                    currentCompletion: 50,
                    problemSrisks: '--',
                    causeanAlysis: '--',
                    suggestion: '--',
                    feedbackTime: '2018-12-11',
                    feedbackPerson: '刘刘'
                }
            ],
        }
    }

    componentDidMount() {
        this.loadLocales()
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            this.setState({
                initDone: true,
                columns: [
                    {
                        title: intl.get('wsd.i18n.operate.prepared.progressevaluation'),
                        dataIndex: 'progressEvaluation',
                        key: 'progressEvaluation',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.prepared.currentcompletion'),
                        dataIndex: 'currentCompletion',
                        key: 'currentCompletion',
                        render: text => (
                            <Progress percent={text} />
                        )
                    },
                    {
                        title: intl.get('wsd.i18n.operate.prepared.problemsrisks'),
                        dataIndex: 'problemSrisks',
                        key: 'problemSrisks',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.prepared.causeanalysis'),
                        dataIndex: 'causeanAlysis',
                        key: 'causeanAlysis',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.prepared.suggestion'),
                        dataIndex: 'suggestion',
                        key: 'suggestion',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.prepared.feedbackperson'),
                        dataIndex: 'feedbackPerson',
                        key: 'feedbackPerson',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.prepared.feedbacktime'),
                        dataIndex: 'feedbackTime',
                        key: 'feedbackTime',
                    },
                    {
                        title: intl.get('wsd.i18n.operate.fdback.progress'),
                        dataIndex: 'progress',
                        key: 'progress',
                        render: () => (
                            <a href="javascript:void(0)">查看</a>
                        )
                    },
                ]
            });
        });
    }

    getInfo = (record, index) => {
        let id = record.id, records = record
        if (this.state.activeIndex == id) {
            id = ''
            records = ''
        }
        this.setState({
            activeIndex: id
        })
    }

    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    }

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                this.setState({
                    selectData: selectedRows
                })
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };

        return (
            <div className={style.main}>
                <h3 className={style.listTitle}>反馈记录</h3>
                <div className={style.mainScorll}>
                    <Table rowKey={record => record.id} columns={this.state.columns} defaultExpandAllRows={true} dataSource={this.state.data} pagination={false} rowClassName={this.setClassName} onRow={(record, index) => {
                        return {
                            onClick: (event) => {
                                this.getInfo(record, index)
                            }
                        }
                    }
                    } />
                </div>
            </div>
        )
    }
}

export default OperatePreparedRecord
