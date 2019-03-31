/*
 * @Author: wihoo.wanghao
 * @Date: 2019-01-16 16:38:09
 * @Last Modified by: wihoo.wanghao
 * @Last Modified time: 2019-03-13 14:22:05
 */
import React, { Component } from 'react'
import intl from 'react-intl-universal'
import _ from 'lodash'
import { Table, Progress } from 'antd'
import style from './style.less'
import DeleteTopBtn from '../../../../components/public/TopTags/DeleteTopBtn' //删除按钮
import DistributionBtn from '../../../../components/public/TopTags/DistributionBtn' //分配按钮
import SpreadBtn from '../../../../components/public/TopTags/SpreadBtn' //展开
import DistributionModal from './Distribution'  //分配弹窗
import CheckModal from './CheckModal' //交付清单


const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

export class OpeparedPreparedPlanAcco extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'PlanPreparedPlanAcco',
            width: '',
            initDone: false,
            columns: [],
            distributionModaVisible: false,
            checkModalVisible: false,
            data: [
                {
                    id: 1,
                    planName: 'ACM产品开发项目',
                    planCode: 'XM',
                    orgName: '研发部',
                    userName: '孙博宇',
                    planStartTime: '--',
                    planEndTime: '--',
                    planType: '--',
                    creatTime: '2018-07-11',
                    status: '新建',
                    remark: '--',
                    key: '[0]',
                    weights: 1,
                    payList: ['1'],
                    creator: '曹计栓',
                    publictor: '曹计栓',
                    publicTime: '2018-11-10',
                    schedule: ['1'],
                    progressLog: ['1']
                },
                {
                    id: 4,
                    planName: 'ACM产品开发项目',
                    planCode: 'XM',
                    orgName: '研发部',
                    userName: '孙博宇',
                    planStartTime: '--',
                    planEndTime: '--',
                    planDrtn: '30d',
                    planType: '--',
                    creatTime: '2018-07-11',
                    status: '新建',
                    remark: '--',
                    key: '[1]',
                    weights: 1,
                    payList: ['1'],
                    creator: '曹计栓',
                    publictor: '曹计栓',
                    publicTime: '2018-11-10',
                    schedule: ['1'],
                    progressLog: ['1']
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
                        title: intl.get('wsd.i18n.plan.plandefine.planname'), //计划名称
                        dataIndex: 'planName',
                        key: 'planName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.plandefine.plancode'), //代码
                        dataIndex: 'planCode',
                        key: 'planCode',
                    },
                    {
                        title: "计划开始", // 计划开始时间 
                        dataIndex: 'planStartTime',
                        key: 'planStartTime',
                    },
                    {
                        title: "计划完成", //计划完成时间
                        dataIndex: 'planEndTime',
                        key: 'planEndTime',
                    },
                    {
                        title: "进度", //进度
                        dataIndex: 'schedule',
                        key: 'schedule',
                        render: progress => (
                            <span style={{ display: 'inline-block', width: '100px' }}>
                                {progress.map(tag => <Progress key={tag} percent={80} />)}
                            </span>
                        ),
                    },
                    {
                        title: intl.get('wsd.i18n.plan.plandefine.orgname'), //责任主体
                        dataIndex: 'orgName',
                        key: 'orgName',
                    },
                    {
                        title: "责任人", //责任人
                        dataIndex: 'userName',
                        key: 'userName',
                    },
                    {
                        title: "权重", //权重
                        dataIndex: 'weights',
                        key: 'weights',
                    },
                    {
                        title: "完成形式", //完成形式
                        dataIndex: 'completeType',
                        key: 'completeType',
                    },
                    {
                        title: "计划状态", //计划状态
                        dataIndex: 'status',
                        key: 'status',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.plandefine.remark'), //备注
                        dataIndex: 'remark',
                        key: 'remark',
                    } 
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

    viewPayList = () => {
        this.setState({
            checkModalVisible: true
        })
    }

    //Release弹窗关闭
    handleDistributionCancel = () => {
        this.setState({
            distributionModaVisible: false
        })
    }

    closeCheckModal = () => {
        this.setState({
            checkModalVisible: false
        })
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

        const showFormModal = (name, e) => {
            if (name == 'DistributionBtn') {
                this.setState({
                    distributionModaVisible: true
                })
            }
        }

        return (
            <div className={style.main}>
                <h3 className={style.listTitle}>计划关联</h3>
                <div className={style.rightTopTogs}>
                    <SpreadBtn onClickHandle={showFormModal} />
                    <DistributionBtn onClickHandle={showFormModal} />
                    <DeleteTopBtn onClickHandle={showFormModal} />
                </div>
                <div className={style.mainScorll}>
                    <Table rowKey={record => record.id} defaultExpandAllRows={true} pagination={false} name={this.props.name} columns={this.state.columns} rowSelection={rowSelection} dataSource={this.state.data} rowClassName={this.setClassName} onRow={(record, index) => {
                        return {
                            onClick: (event) => {
                                this.getInfo(record, index)
                            }
                        }
                    }
                    } />
                </div>
                <DistributionModal modalVisible={this.state.distributionModaVisible} handleCancel={this.handleDistributionCancel} />
                <CheckModal visible={this.state.checkModalVisible} handleCancel={this.closeCheckModal}/>
            </div>
        )
    }
}

export default OpeparedPreparedPlanAcco
