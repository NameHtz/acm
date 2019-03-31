/**
 * Created by WUWEI on 2019/1/17.
 */
import React, { Component } from 'react'
import { Collapse, Table, Radio, Icon, Input, InputNumber, Popconfirm, Form } from 'antd'
import style from './style.less'
import Calendar from './Calendar'
import StandardSetModal from "./StandardSetModal"
import TopTags from './TopTags/index'
import { connect } from 'react-redux'
import axios from '../../../../api/axios'
import { calendarList, calendarDef, calendarUpdate } from '../../../../api/api'
// import { object } from 'prop-types';



const RadioGroup = Radio.Group;
const Panel = Collapse.Panel

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
            return <InputNumber />;
        }
        return <Input />;
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
                                            message: `Please Input ${title}!`,
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


class BasicdGlobald extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editingKey: '',
            data1: [],
            activeIndex: null,
            record: null,
            calendarDel: [],
            standData: null,
        }
    }
    //请求函数
    reqfun = () => {
        axios.get(calendarList).then(res => {
            this.setState({
                data1: res.data.data
            })
        })
    }

    componentDidMount() {
        this.reqfun()
    }

    radio = (record) => {

        axios.put(calendarDef(record.id), {}, true).then(res => {
            // console.log(res)
            if (res.data.status == 200) {
                var radIndex = this.state.data1.findIndex(v => v.id == record.id)
                record.isDefault = 1;
                var Data = [];

                this.state.data1.map((item, i) => {
                    // console.log('item', item)
                    if (i !== radIndex) {
                        item.isDefault = 0;
                        Data.push(item);
                    } else {
                        Data.push(record)
                    }
                })
                this.setState({
                    data1: Data
                })
            }
        })
    }

    collapseCallback = (key) => {
        // console.log(key)
    }
    handleClick = (record) => {
        this.setState({
            isShowStandardSet: true,
            standData: record
        })
    }
    closeStandardSet = () => {
        this.setState({
            isShowStandardSet: false
        })
    }

    isEditing = record => record.id === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data1];
            let reqdata = {
                id: key,
                calName: row.calName
            }
            axios.put(calendarUpdate, reqdata, true).then(res => {
                const index = newData.findIndex(item => key === item.id);
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, {
                        ...item,
                        ...row,
                    });
                    this.setState({ data1: newData, editingKey: '' }, () => {


                    });
                } else {
                    newData.push(row);
                    this.setState({ data1: newData, editingKey: '' });
                }
            })


        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    setClassName = (record, index) => {
        return record.id === this.state.activeIndex ? 'tableActivty' : '';
    }

    //新增
    calendarAdd = (v) => {
        // console.log('calendar', v)
        this.setState({
            data1: [...this.state.data1, v]
        })
    }
    //删除
    del = (v) => {
        if (Array.isArray(v)) {     //批量删除
            var copyData = [...this.state.data1]
            for (var i = 0; i < v.length; i++) {
                var ind = copyData.findIndex(val => val.id == v[i])
                if (ind != -1) {   //删除
                    copyData = [...copyData.slice(0, ind), ...copyData.slice(ind + 1)]
                }
            }
            this.setState({
                data1: copyData,
                calendarDel: []
            }, () => {
                copyData = null
            })

        }

    }
    getInfo = (record, index) => {  //table点击事件调用函数
        const { activeIndex } = this.state;
        const { id } = record;
        if (activeIndex === record.id) {
            this.setState({
                record: null,
                activeIndex: null,
            });
        } else {
            this.setState({
                record,
                activeIndex: id,
            });
        }
    }
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({
                calendarDel: selectedRowKeys
            })
        },
        onSelect: (record, selected, selectedRows) => {
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            //   console.log(selected, selectedRows, changeRows);
        },
    };

    render() {
        const { intl } = this.props.currentLocale;
        const columns1 = [
            {
                title: intl.get('wsd.i18n.operate.calendar.calendarname'), //日历名称
                dataIndex: 'calName',
                key: 'calName',
                editable: true,
            },
            {
                title: intl.get('wsd.i18n.base.planTem.isglobal'),//全局默认
                dataIndex: 'isDefault',
                key: 'isDefault',
                render: (text, record) => (
                    <span className={text == 1 ? style.radioT : style.radioF} onClick={this.radio.bind(this, record)}></span>
                )
            },
            {
                title: intl.get('wsd.i18n.operate.calendar.standardset'),//标准设置
                dataIndex: 'setStandard',
                key: 'setStandard',
                render: (text, record) => (
                    <Icon type="form" onClick={this.handleClick.bind(this, record)} />
                )
            },
            {
                title: intl.get('wsd.i18n.operate.calendar.operation'),//操作
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a
                                                href="javascript:;"
                                                onClick={() => this.save(form, record.id)}
                                                style={{ marginRight: 8 }}
                                            >
                                                保存 </a>
                                        )}
                                    </EditableContext.Consumer>
                                    <a
                                        href="javascript:;"
                                        onClick={() => this.cancel(record.id)}
                                    >取消</a>
                                </span>
                            ) : (
                                    <a onClick={() => this.edit(record.id)}>修改</a>
                                )}
                        </div>
                    );
                },
            },
        ];
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = columns1.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });


        return (
            <div>
                <TopTags calendarAdd={this.calendarAdd}
                    copy={this.state.record}
                    calendarDel={this.state.calendarDel}
                    del={this.del} />
                <div className={style.main}>
                    <div className={style.calendarSet}>
                        <div className={style.ca}>
                            <div className={style.caleft}>
                                <h3 className={style.listTitle2}>日历类型</h3>
                                <div className={style.tablescroll}>
                                    <Table
                                        components={components}
                                        rowKey={record => record.id}
                                        size="small"
                                        rowClassName={this.setClassName}
                                        rowSelection={this.rowSelection}
                                        dataSource={this.state.data1} columns={columns}
                                        pagination={false}
                                        // pagination={{
                                        //     onChange: this.cancel,
                                        // }}
                                        onRow={(record) => {
                                            return {
                                                onClick: this.getInfo.bind(this, record),
                                            }
                                        }}
                                    ></Table>
                                </div>
                                {this.state.isShowStandardSet && <StandardSetModal data={this.state.standData} handleCancel={this.closeStandardSet.bind(this)}></StandardSetModal>}
                            </div>
                            <div className={style.caright}>
                                <h3 className={style.listTitle}>个性设置</h3>
                                <div className={style.calendar}>
                                    <Calendar data={this.state.record} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}

const BasicdGlobalds = Form.create()(BasicdGlobald)
export default connect(state => ({
    currentLocale: state.localeProviderData
}))(BasicdGlobalds);
