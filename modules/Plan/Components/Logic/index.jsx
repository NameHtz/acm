import React, { Component } from 'react'
import { Table, Progress, Spin, Modal, Input, Form, InputNumber, Popconfirm, Select,  } from 'antd'
import intl from 'react-intl-universal'
import style from './style.less'
import DistributionBtn from "../../../../components/public/TopTags/DistributionBtn"
import DeleteTopBtn from "../../../../components/public/TopTags/DeleteTopBtn"
import DistributionModal from './Distribution'  //分配弹窗

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

const Confirm = Modal.confirm;

const data = [
    {
        id: 1,
        key: 1,
        planName: '产品需求计划',
        subTaskName: '产品需求规格说明书编写',
        subTaskCode: 'B001',
        iptName: '产品部',
        userName: '王胜平',
        relationType: 'FS',
        timeDelay: '2d',
        planStartTime: '2018-11-11',
        planEndTime: '2018-12-11'
    },
    {
        id: 2,
        key: 2,
        planName: '产品需求计划',
        subTaskName: '产品需求规格说明书编写',
        subTaskCode: 'B001',
        iptName: '产品部',
        userName: '王胜平',
        relationType: 'FS',
        timeDelay: '2d',
        planStartTime: '2018-11-11',
        planEndTime: '2018-12-11'
    }
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
        if (this.props.inputType === 'select') {
            return <Select style={{ width: "100%" }} size="small">
                <Option value="FS">FS</Option>
                <Option value="SS">SS</Option>
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

export class PlanComponentsLog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'PlanComponentsLog',
            initDone: false,
            columns: [],
            data,
            editingKey: '',
            distributionModaVisible: false
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
                        title: intl.get('wsd.i18n.plan.subTask.planname'),
                        dataIndex: 'planName',
                        key: 'planName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.subTask.subtaskname'),
                        dataIndex: 'subTaskName',
                        key: 'subTaskName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.subTask.subtaskcode'),
                        dataIndex: 'subTaskCode',
                        key: 'subTaskCode',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.subTask.iptname'),
                        dataIndex: 'iptName',
                        key: 'iptName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.subTask.username'),
                        dataIndex: 'userName',
                        key: 'userName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.subTask.relationtype'),
                        dataIndex: 'relationType',
                        key: 'relationType',
                        editable: true,
                        render: (text, record) => <div className="editable-row-text">{text}</div>
                    },
                    {
                        title: intl.get('wsd.i18n.plan.subTask.timedelay'),
                        dataIndex: 'timeDelay',
                        key: 'timeDelay',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.subTask.planstarttime'),
                        dataIndex: 'planStartTime',
                        key: 'planStartTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.subTask.planendtime'),
                        dataIndex: 'planEndTime',
                        key: 'planEndTime',
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
                    }
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

    onClickHandle = (name) => {
        if (name == "DistributionBtn") {
            this.setState({
                distributionModaVisible: true
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

    //Release弹窗关闭
    handleDistributionCancel = () => {
        this.setState({
            distributionModaVisible: false
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
                    inputType: col.dataIndex === 'relationType' ? 'select' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <div className={style.main}>
                <h3 className={style.listTitle}>逻辑关系</h3>
                <div className={style.rightTopTogs}>
                    <DistributionBtn onClickHandle={this.onClickHandle} />
                    <DeleteTopBtn onClickHandle={this.onClickHandle} />
                </div>
                <div className={style.tabsToggle}>
                    <a href="javascript:void(0)" className={style.active}>后续任务</a>
                    <a href="javascript:void(0)">紧前任务</a>
                </div>
                <div className={style.mainScorll} style={{ height: 'calc(100% - 57px)' }}>
                    <Table rowKey={record => record.id} components={components} columns={columns} dataSource={this.state.data} pagination={false} />
                </div>
                <DistributionModal  modalVisible={this.state.distributionModaVisible} handleCancel={this.handleDistributionCancel} />
            </div>
        )
    }
}

export default PlanComponentsLog
