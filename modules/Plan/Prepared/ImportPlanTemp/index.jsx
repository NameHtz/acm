import React, { Component } from 'react'
import style from './style.less'
import { Modal, Table, Upload, Button, Icon } from 'antd';
import intl from 'react-intl-universal'
import Search from '../../../../components/public/Search'
import emitter from '../../../../api/ev'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

export class PlanPreparedRelease extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            columns: [],
            data: [
                {
                    id: 1,
                    fileName: '产品需求计划',
                    type: 'Excel',
                },
                {
                    id: 2,
                    fileName: '产品前期用户调研与需求整合',
                    type: 'Project',
                }
            ]
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
                        title: "文件名称",
                        dataIndex: 'fileName',
                        key: 'fileName',
                    },
                    {
                        title: "类型",
                        dataIndex: 'type',
                        key: 'type',
                    },
                    {
                        title: "",
                        key: 'close',
                        dataIndex: '',
                        render: () => (
                            <Icon type="close" />
                        )
                    },
                ]
            });
        });
    }

    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    }

    getInfo = (record, index) => {
        this.setState({
            activeIndex: record.id
        })
    }

    handleOk = () => {
        alert('导入计划模板')
    }

    render() {
        const fileProps = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) { },
        };
        return (

            <Modal className={style.main} width="550px" forceRender={true} centered={true}
                title="导入计划模板" visible={this.props.modalVisible} onOk={this.handleOk} onCancel={this.props.handleCancel} bodyStyle={{ padding: 0 }} cancelText="取消" okText="确定">
                <div className={style.tableMain}>
                    <div className={style.fileName}>
                        <Upload {...fileProps}>
                            <Icon type="upload" /> 导入文件
                        </Upload>
                        <p>备注：文件支持Excel，Project格式</p>
                    </div>
                    <Table rowKey={record => record.id} pagination={false} name={this.props.name} columns={this.state.columns} dataSource={this.state.data}
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
            </Modal>

        )
    }
}


export default PlanPreparedRelease
