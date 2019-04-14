import React, { Component } from 'react'
import { Table, Progress, Icon, message } from 'antd'
import intl from 'react-intl-universal'
import style from './style.less'
import DeleteTopBtn from '../../../../components/public/TopTags/DeleteTopBtn' //删除按钮

import { meetingActionFeeDback } from '../../../../api/api'
import axios from '../../../../api/axios'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

export class PlanComponentsLog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'PlanComponentsLog',
            initDone: false,
            columns: [],
            data: [
                // {
                //     id: 1,
                //     endTime: '2018-11-11',
                //     progressTime: '2018-12-11',
                //     progress: ['1'],
                //     actStartTime: '2018-11-11',
                //     actEndTime: '2018-12-11',
                //     planComplete: '2018-12-11',
                //     status: '已批准',
                //     progressdesc: '--',
                // },
                // {
                //     id: 2,
                //     endTime: '2018-11-11',
                //     progressTime: '2018-12-11',
                //     progress: ['1'],
                //     actStartTime: '2018-11-11',
                //     actEndTime: '2018-12-11',
                //     planComplete: '2018-12-11',
                //     status: '审批中',
                //     progressdesc: '--',
                // }
            ]
        }
    }

    componentDidMount() {
        this.loadLocales()
        this.getFeeDback()
    }

    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
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

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            this.setState({
                initDone: true,
                columns: [

                    {
                        title: intl.get('wsd.i18n.plan.progressLog.endtime'),  //截止日期
                        dataIndex: 'endTime',
                        key: 'endTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.progressLog.progresstime'),  //"进展报告日期",
                        dataIndex: 'progressTime',
                        key: 'progressTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.progressLog.progress'),  //"进度",
                        dataIndex: 'progress',
                        key: 'progress',
                        render: progress => (
                            <span style={{ display: 'inline-block', width: '100px' }}>
                                {progress.map(tag => <Progress key={tag} percent={80} />)}
                            </span>
                        ),
                    },
                    {
                        title: intl.get('wsd.i18n.plan.progressLog.actstarttime'),  //"实际开始日期",
                        dataIndex: 'actStartTime',
                        key: 'actStartTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.progressLog.actendtime'),  //"实际完成日期",
                        dataIndex: 'actEndTime',
                        key: 'actEndTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.progressLog.plancomplete'),  //"估计完成",
                        dataIndex: 'planComplete',
                        key: 'planComplete',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.progressLog.progressdesc'),  //"进展说明",
                        dataIndex: 'progressdesc',
                        key: 'progressdesc',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.progressLog.status'),  //"状态",
                        dataIndex: 'status',
                        key: 'status',
                        render: (text) => {
                            if (text == '已批准') {
                                return (<span><Icon type="bulb" theme="filled" className={style.approve} /> {text}</span>)
                            } else if (text == '审批中') {
                                return (<span><Icon type="bulb" theme="filled" className={style.examineApprove} /> {text}</span>)
                            }

                        }
                    }
                ]
            });
        });
    }

    // 获取进展日志
    getFeeDback = () => {
        let propsData = this.props.data
        if(Array.isArray(propsData) === true){
            message.info('请选择一条会议')
            return 0;
        }
        axios.get(meetingActionFeeDback()).then((result) => {
            let data = result.data.data;
            if (data.length != 0) {
                this.setState({
                    data
                })
            }
        }).catch((err) => {

        });
    }

    render() {
        const showFormModal = () => {

        }

        return (
            <div className={style.main}>
                {this.state.initDone && <div className={style.mainHeight}>
                    <h3 className={style.listTitle}>进展日志</h3>
                    <div className={style.rightTopTogs}>
                        <DeleteTopBtn onClickHandle={showFormModal} />
                    </div>
                    <div className={style.mainScorll} >
                        <Table rowKey={record => record.id} columns={this.state.columns} dataSource={this.state.data} pagination={false}
                            rowClassName={this.setClassName} onRow={(record, index) => {
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

export default PlanComponentsLog
