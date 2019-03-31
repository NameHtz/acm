/*
 * @Author: wihoo.wanghao
 * @Date: 2019-01-16 16:38:09
 * @Last Modified by: wihoo.wanghao
 * @Last Modified time: 2019-01-27 17:28:30
 */
import React, { Component } from 'react'
import intl from 'react-intl-universal'
import _ from 'lodash'
import { Table, Progress, Form, Input, Popconfirm, DatePicker } from 'antd'
import style from './style.less'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

const data = [
    {
        id: 1,
        key: 1,
        lfName: '孙博宇',
        lfCode: 'A120',
        lfRoleName: '项目管理员',
        lfUnit: '工时',
        lfMaxUnit: '8',
        lfStartTime: '',
        lfEndTime: '',
        lfActualNum: '',
        lfActualPrice: '',
        lfActualCost: '',
    },
    {
        id: 2,
        key: 2,
        lfName: '孙博宇',
        lfCode: 'A120',
        lfRoleName: '项目管理员',
        lfUnit: '工时',
        lfMaxUnit: '8',
        lfStartTime: '',
        lfEndTime: '',
        lfActualNum: '',
        lfActualPrice: '',
        lfActualCost: '',
    }
];

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
        if (this.props.inputType === 'date') {
            return <DatePicker style={{width: '140px'}} size="small" />
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

export class PlanPreparedPlanAcco extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'PlanPreparedPlanAcco',
            width: '',
            initDone: false,
            columns: [],
            data,
            activeIndex: '',
            selectData: [],
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
                        title: '资源名称',
                        dataIndex: 'lfName',
                        key: 'questionName',
                    },
                    {
                        title: '资源代码',
                        dataIndex: 'lfCode',
                        key: 'lfCode',
                    },
                    {
                        title: '资源角色',
                        dataIndex: 'lfRoleName',
                        key: 'lfRoleName',
                    },
                    {
                        title: '计量单位',
                        dataIndex: 'lfUnit',
                        key: 'lfUnit',
                    },
                    {
                        title: '单位最大用量(h)',
                        dataIndex: 'lfMaxUnit',
                        key: 'lfMaxUnit',
                    },
                    {
                        title: '实际开始时间',
                        dataIndex: 'lfStartTime',
                        width: 120,
                        key: 'lfStartTime',
                        editable: true,
                        render: (text, record) => <div className="editable-row-text">{text}</div>
                    },
                    {
                        title: '实际结束时间',
                        dataIndex: 'lfEndTime',
                        width: 120,
                        key: 'lfEndTime',
                        editable: true,
                        render: (text, record) => <div className="editable-row-text">{text}</div>
                    },
                    {
                        title: '实际用量(h)',
                        dataIndex: 'lfActualNum',
                        key: 'lfActualNum',
                        editable: true,
                        render: (text, record) => <div className="editable-row-text">{text}</div>
                    },
                    {
                        title: '实际单价(￥)',
                        dataIndex: 'lfActualPrice',
                        key: 'lfActualPrice',
                        editable: true,
                        render: (text, record) => <div className="editable-row-text">{text}</div>
                    },
                    {
                        title: '实际成本(￥)',
                        dataIndex: 'lfActualCost',
                        key: 'lfActualCost',
                        editable: true,
                        render: (text, record) => <div className="editable-row-text">{text}</div>
                    },
                    {
                        title: '操作',
                        key: 'actions',
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
                        }
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
                    inputType: (col.dataIndex === 'lfStartTime' || col.dataIndex === 'lfEndTime') ? 'date' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    width: col.width,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <div className={style.main}>
                <h3 className={style.listTitle}>资源消耗</h3>
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
            </div>
        )
    }
}

export default PlanPreparedPlanAcco
