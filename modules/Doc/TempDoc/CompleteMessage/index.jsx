import React, { Component } from 'react'
import { Modal, Button, Table, Input, Popconfirm, Form } from 'antd'
import style from './style.less'
import intl from 'react-intl-universal'


const locales = {
    'en-US': require('../../../../api/language/en-US.json'),
    'zh-CN': require('../../../../api/language/zh-CN.json')
}


const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    }

    componentDidMount() {
        console.log(this.props)
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    save = () => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            console.log("error", error)
            if (error) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0, width: 100 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <Input
                                                ref={node => (this.input = node)}
                                                onPressEnter={this.save}
                                                onBlur={this.save}
                                            />
                                        )}
                                    </FormItem>
                                ) : (
                                        <div
                                            className="editable-cell-value-wrap"
                                            // style={{ paddingRight: 24 }}
                                            onClick={this.toggleEdit}
                                        >
                                            {restProps.children}
                                        </div>
                                    )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}


class CompleteMessage extends Component {

    state = {
        initDone: false,
        modalInfo: {
            title: '完善信息'
        },

        dataSource: [{
            key: '0',
            name: 'EC00620-pmis.xls',
            age: 'EC00620-pmis.xls',
            address: '项目文档',
            operation: '请选择项目',
            folder: '请选择文件夹',
            docClassif: '请选择分类',
            proDoc: '请选择专业',
            department: '请选择部门',
            versions: '1.0',
            author: '作者'
        }, {
            key: '1',
            name: 'EC00620-pmis.xls',
            age: 'EC00620-pmis.xls',
            address: '项目文档',
            operation: '请选择项目',
            folder: '请选择文件夹',
            docClassif: '请选择分类',
            proDoc: '请选择专业',
            department: '请选择部门',
            versions: '1.0',
            author: '作者'
        }],
        count: 2,
    }

    columns = [{
        title: '文件名称',
        dataIndex: 'name',
    }, {
        title: '文档标题',
        dataIndex: 'age',
        editable: true,
    }, {
        title: '文档类型',
        dataIndex: 'address',
        editable: true,
    }, {
        title: '选择项目',
        dataIndex: 'operation',
        editable: true,
    }, {
        title: '文件夹',
        dataIndex: 'folder',
        editable: true,
    }, {
        title: '文档分类',
        dataIndex: 'docClassif',
        editable: true,
    }, {
        title: '文档专业',
        dataIndex: 'proDoc',
        editable: true,
    }, {
        title: '部门',
        dataIndex: 'department',
        editable: true,
    }, {
        title: '版本',
        dataIndex: 'versions',
        editable: true,
    }, {
        title: '作者',
        dataIndex: 'author',
        editable: true,
    }]



    componentDidMount() {
        this.loadLocales();
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            this.setState({ initDone: true })
        })
    }

    handleCancel() {
        this.props.handleCancel('ComMessageVidible')
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    }


    render() {

        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        return (
            <div>
                {this.state.initDone && (
                    <Modal
                        className={style.main}
                        width="950px"
                        title={this.state.modalInfo.title}
                        forceRender={true} centered={true}
                        visible={this.props.modalVisible}
                        onCancel={this.handleCancel.bind(this)}
                        footer={
                            <div className='modalbtn'>
                            <Button key="b" type="submit" >保存</Button>
                            <Button key="saveAndSubmit" type="primary">保存并继续</Button>
                            </div>
                        }
                    >

                        <div className={style.content}>


                            <Table
                                components={components}
                                rowClassName={() => 'editable-row'}
                                bordered
                                dataSource={dataSource}
                                columns={columns}
                                pagination={false}
                            />

                        </div>


                    </Modal>
                )}
            </div>
        )
    }

}


export default CompleteMessage





