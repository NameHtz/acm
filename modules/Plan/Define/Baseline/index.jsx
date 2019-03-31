import React, { Component } from 'react'
import { Table, Progress, Checkbox, Modal, Radio } from 'antd'
import intl from 'react-intl-universal'
import style from './style.less'
import DeleteTopBtn from '../../../../components/public/TopTags/DeleteTopBtn' //删除按钮
import AddTopBtn from '../../../../components/public/TopTags/AddTopBtn' //新增按钮
import PlanDefineBaselineAdd from './Add' //新增进度基线
import { maintainData, initStructureCode } from '../../../../api/function'  //引入增删改查

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

const confirm = Modal.confirm
const RadioGroup = Radio.Group;

let dataCode = []

export class PlanDefineBaseline extends Component {
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
                    baselineName: '产品需求计划',
                    baselineType: 'A120',
                    creatTime: '2018-11-11',
                    planStartTime: '2018-11-11',
                    planEndTime: '2018-11-12',
                    creator: '孙博宇',
                    lastupdTime: '2018-12-11',
                    isExecute: true,
                    remark: '--',
                },
                {
                    id: 2,
                    baselineName: '产品需求计划2',
                    baselineType: 'A120',
                    creatTime: '2018-11-11',
                    planStartTime: '2018-11-11',
                    planEndTime: '2018-11-12',
                    creator: '孙博宇',
                    lastupdTime: '2018-12-11',
                    isExecute: false,
                    remark: '--',
                },
                {
                    id: 3,
                    baselineName: '产品需求计划3',
                    baselineType: 'A120',
                    creatTime: '2018-11-11',
                    planStartTime: '2018-11-11',
                    planEndTime: '2018-11-12',
                    creator: '孙博宇',
                    lastupdTime: '2018-12-11',
                    isExecute: false,
                    remark: '--',
                },
                {
                    id: 4,
                    baselineName: '产品需求计划3',
                    baselineType: 'A120',
                    creatTime: '2018-11-11',
                    planStartTime: '2018-11-11',
                    planEndTime: '2018-11-12',
                    creator: '孙博宇',
                    lastupdTime: '2018-12-11',
                    isExecute: false,
                    remark: '--',
                },
                {
                    id: 5,
                    baselineName: '产品需求计划3',
                    baselineType: 'A120',
                    creatTime: '2018-11-11',
                    planStartTime: '2018-11-11',
                    planEndTime: '2018-11-12',
                    creator: '孙博宇',
                    lastupdTime: '2018-12-11',
                    isExecute: false,
                    remark: '--',
                },
                {
                    id: 6,
                    baselineName: '产品需求计划3',
                    baselineType: 'A120',
                    creatTime: '2018-11-11',
                    planStartTime: '2018-11-11',
                    planEndTime: '2018-11-12',
                    creator: '孙博宇',
                    lastupdTime: '2018-12-11',
                    isExecute: false,
                    remark: '--',
                }
            ],
        }
    }

    componentDidMount() {
        this.loadLocales()
        dataCode = initStructureCode(this.state.data, '')
    }

    addBaselineCancelModal = () => {
        this.setState({
            addBaselineVisiable: false
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
                        title: intl.get('wsd.i18n.plan.baseline.baselinename'),
                        dataIndex: 'baselineName',
                        key: 'baselineName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.baseline.baselinetype'),
                        dataIndex: 'baselineType',
                        key: 'baselineType',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.baseline.creattime'),
                        dataIndex: 'creatTime',
                        key: 'creatTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.baseline.creator'),
                        dataIndex: 'creator',
                        key: 'creator',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.baseline.lastupdtime'),
                        dataIndex: 'lastupdTime',
                        key: 'lastupdTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.baseline.isexecute'),
                        dataIndex: 'isExecute',
                        key: 'isExecute',
                        render: (value) => (
                            <Radio></Radio>
                        )
                    },
                    {
                        title: intl.get('wsd.i18n.plan.baseline.remark'),
                        dataIndex: 'remark',
                        key: 'remark',
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
        const showFormModal = (name, e) => {
            let that = this
            if (name == 'AddTopBtn') {
                this.setState({
                    addBaselineVisiable: true
                })
            }
            if (name == 'DeleteTopBtn') {
                if (this.state.activeIndex) {
                    confirm({
                        title: '您确定要删除该基线？',
                        cancelText: '取消',
                        okText: '确定',
                        onOk() {
                            console.log(that.state.data)
                            console.log(that.state.activeIndex)
                            console.log(maintainData('delete', { list: that.state.data, structure: dataCode }, that.state.activeIndex))
                        }
                    });
                }

            }
        }
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
                <h3 className={style.listTitle}>进度基线</h3>
                <div className={style.rightTopTogs}>
                    <AddTopBtn onClickHandle={showFormModal} />
                    <DeleteTopBtn onClickHandle={showFormModal} />
                </div>
                <div className={style.mainScorll}>
                    <Table rowKey={record => record.id} columns={this.state.columns} defaultExpandAllRows={true} dataSource={this.state.data} pagination={false} rowClassName={this.setClassName} rowSelection={rowSelection} onRow={(record, index) => {
                        return {
                            onClick: (event) => {
                                this.getInfo(record, index)
                            }
                        }
                    }
                    } />
                </div>
                <PlanDefineBaselineAdd modalVisible={this.state.addBaselineVisiable} handleCancel={this.addBaselineCancelModal} />
            </div>
        )
    }
}

export default PlanDefineBaseline
