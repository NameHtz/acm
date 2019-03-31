/*
 * @Author: wihoo.wanghao
 * @Date: 2019-01-16 16:38:09
 * @Last Modified by: wihoo.wanghao
 * @Last Modified time: 2019-03-13 15:10:30
 */
import React, { Component } from 'react'
import intl from 'react-intl-universal'
import _ from 'lodash'
import emitter from '../../../../api/ev'
import { Table, Select, Icon } from 'antd'
import style from './style.less'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

const Option = Select.Option

export class OpeparePreparedChangeInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'PlanPreparedChangeInfo',
            width: '',
            initDone: false,
            columns: [],
            data: [
                {
                    id: 1,
                    type: '调整',
                    beforeChangeData: '计划类型：里程碑计划',
                    afterChangeData: '计划类型：月度计划',
                    status: '已批准',
                    changeType: '主动变更',
                    changePlanRes: '优化计划',
                    changeImpact: '不影响项目最终计划',
                    takeMeasures: '调整时间节点',
                    applyor: '刘建',
                    applyTime: '2018-07-11',
                },
                {
                    id: 2,
                    type: '调整',
                    beforeChangeData: '开始日期：2018-08-10，完成日期：2018-09-10，交付物，',
                    afterChangeData: '开始日期：2018-10-10，完成日期：2018-12-10，交付物：需求计划',
                    status: '已批准',
                    changeType: '主动变更',
                    changePlanRes: '对技术难度估算不足，综合考虑决定调整计划',
                    changeImpact: '不影响项目最终计划',
                    takeMeasures: '调整开发计划',
                    applyor: '刘建',
                    applyTime: '2018-08-11',
                }
            ],
            activeIndex: '',
            selectData: []
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
                        title: "变更类型", //变更类型
                        dataIndex: 'type',
                        key: 'type',
                        width: 80
                    },
                    {
                        title: "变更前数据", //变更前数据
                        dataIndex: 'beforeChangeData',
                        key: 'beforeChangeData',
                        width: 200
                    },
                    {
                        title: "变更后数据", //变更后数据
                        dataIndex: 'afterChangeData',
                        key: 'afterChangeData',
                        width: 200
                    },
                    {
                        title: "变更依据", // 变更依据 
                        dataIndex: 'changeType',
                        key: 'changeType',
                        width: 120
                    },
                    {
                        title: "变更状态", //变更状态
                        dataIndex: 'status',
                        key: 'status',
                        width: 120
                    },
                    {
                        title: "附件", //附件
                        key: 'action',
                        width: 120,
                        render: () => (
                            <Icon type="eye" />
                        )
                    },

                    {
                        title: "发起人", //申请人
                        dataIndex: 'applyor',
                        key: 'applyor',
                        width: 100
                    },
                    {
                        title: "发起时间", //申请时间
                        dataIndex: 'applyTime',
                        key: 'applyTime',
                        width: 100
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
        return (
            <div className={style.main}>
                <h3 className={style.listTitle}>变更记录</h3>
                <div className={style.mainScorll}>
                    <Table rowKey={record => record.id} style={{width:'100%'}} defaultExpandAllRows={true} pagination={false} name={this.props.name} columns={this.state.columns} dataSource={this.state.data} rowClassName={this.setClassName} onRow={(record, index) => {
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

export default OpeparePreparedChangeInfo
