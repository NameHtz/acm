import React, { Component } from 'react'
import { Table, Progress, Spin, Modal, Input, Form, InputNumber, Popconfirm } from 'antd'
import intl from 'react-intl-universal'
import dynamic from 'next/dynamic'
import style from './style.less'
import DeleteTopBtn from '../../../../components/public/TopTags/DeleteTopBtn' //删除按钮
import DistributionBtn from '../../../../components/public/TopTags/DistributionBtn' //分配按钮

const Confirm = Modal.confirm

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

const data = [
    {
        id: 1,
        key: 1,
        rsrcName: '孙博宇',
        rsrcCode: 'A120',
        unit: '项目管理员',
        maxunit: '工时',
        budgetAmount: 8,
        budgetUnitPrice: 200,
        budgetCost: 100.00,
        actStartTime: '20,000.00',
        actEndTime: '--',
        actAmount: '--',
        actUnitPrice: '--',
        actCost: '--',
    },
    {
        id: 2,
        key: 2,
        rsrcName: '孙博宇',
        rsrcCode: 'A120',
        unit: '项目管理员',
        maxunit: '工时',
        budgetAmount: 8,
        budgetUnitPrice: 200,
        budgetCost: 100.00,
        actStartTime: '20,000.00',
        actEndTime: '--',
        actAmount: '--',
        actUnitPrice: '--',
        actCost: '--',
    },
]

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <Select style={{ width: "100%" }} size="small">
                <Option value="设计">设计</Option>
                <Option value="全职">全职</Option>
            </Select>;
        }
        return <Input size="small" />;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `请输入 ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

export class PlanComponentsResPlan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'PlanComponentsLog',
            initDone: false,
            distributeState: false, //分配弹窗状态
            columns: [],
            data,
            editingKey: ''
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
                        title: intl.get('wsd.i18n.plan.rsrcPlan.rsrcname'),
                        dataIndex: 'rsrcName',
                        key: 'rsrcName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.rsrcPlan.rsrccode'),
                        dataIndex: 'rsrcCode',
                        key: 'rsrcCode',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.rsrcPlan.unit'),
                        dataIndex: 'unit',
                        key: 'unit',
                    },
                    {
                        title: "单位最大用量(h)",
                        dataIndex: 'maxunit',
                        key: 'maxunit',
                    },
                    {
                        title: "预算用量(h)",
                        dataIndex: 'budgetAmount',
                        key: 'budgetAmount',
                        editable: true,
                        render: (text, record) => <div className="editable-row-text">{text}</div>
                    },
                    {
                        title: "预算单价(￥)",
                        dataIndex: 'budgetUnitPrice',
                        key: 'budgetUnitPrice',
                        editable: true,
                        render: (text, record) => <div className="editable-row-text">{text}</div>
                    },
                    {
                        title: "预算成本(￥)",
                        dataIndex: 'budgetCost',
                        key: 'budgetCost',
                        editable: true,
                        render: (text, record) => <div className="editable-row-text">{text}</div>
                    },
                    {
                        title: intl.get('wsd.i18n.plan.rsrcPlan.actstarttime'),
                        dataIndex: 'actStartTime',
                        key: 'actStartTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.rsrcPlan.actendtime'),
                        dataIndex: 'actEndTime',
                        key: 'actEndTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.rsrcPlan.actamount'),
                        dataIndex: 'actAmount',
                        key: 'actAmount',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.rsrcPlan.actunitprice'),
                        dataIndex: 'actUnitPrice',
                        key: 'actUnitPrice',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.rsrcPlan.actcost'),
                        dataIndex: 'actCost',
                        key: 'actCost',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (text, record) => {
                            const editable = this.isEditing(record);
                            return (
                                <div className="editable-row-operations">
                                    {editable ? (
                                        <span>
                                            <EditableContext.Consumer>
                                                {form => (
                                                    <a
                                                        href="javascript:;"
                                                        onClick={() => this.save(form, record.key)}
                                                        style={{ marginRight: 8 }}
                                                    >
                                                        保存
                                                    </a>
                                                )}
                                            </EditableContext.Consumer>
                                            <Popconfirm
                                                title="确定取消?"
                                                onConfirm={() => this.cancel(record.key)}
                                                okText="确认"
                                                cancelText="取消"
                                            >
                                                <a>取消</a>
                                            </Popconfirm>
                                        </span>
                                    ) : (
                                            <a onClick={() => this.edit(record.key)}>编辑</a>
                                        )}
                                </div>
                            );
                        },
                    },
                ]
            });
        });
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
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

    callBackDistribute = () => {
        alert('提交')
    }

    handleCancel = () => {
        this.setState({
            distributeState: false
        })
    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.state.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'intro' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        const showFormModal = (name, e) => {
            if (name == 'DistributionBtn') {
                this.setState({
                    distributeState: true
                })
            }
            if(name=="DeleteTopBtn"){
                Confirm({
                    title: '您确定要删除？',
                    cancelText: '取消',
                    okText: '确定',
                    onOk () {
                       
                    }
                });
            }
        }

        const Distribute = dynamic(import('./Distribute/index'), {
            loading: () => <Spin size="small" />
        })

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
                <h3 className={style.listTitle}>资源计划</h3>
                <div className={style.rightTopTogs}>
                    <DistributionBtn onClickHandle={showFormModal} />
                    <DeleteTopBtn onClickHandle={showFormModal} />
                </div>
                <div className={style.mainScorll}>
                    <Table rowKey={record => record.id} components={components} columns={columns} dataSource={data} pagination={false} rowClassName={this.setClassName} onRow={(record, index) => {
                        return {
                            onClick: (event) => {
                                this.getInfo(record, index)
                            }
                        }
                    }
                    } />
                </div>
                <Distribute visible={this.state.distributeState} handleCancel={this.handleCancel} distribute={this.callBackDistribute} />
            </div>
        )
    }
}

export default PlanComponentsResPlan
