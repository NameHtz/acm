import React, { Component } from 'react'
import style from './style.less'
import { Form, Input, Button, Icon, Select, Table } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';
import DownloadTopBtn from '../../../../components/public/TopTags/DownloadTopBtn'

import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const Option = Select.Option
const { TextArea } = Input;
class MenuInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,                 //国际化初始化状态
            info: [],                        //基本信息
            RightColumns: [{
                title: '文档标题',
                dataIndex: 'name',
                key: 'name',
                render: text => <span> <Icon type="fire" className={style.icon} /> <Icon type="eye" className={style.icon} />{text}</span>
            }, {
                title: '文档编号',
                dataIndex: 'num',
                key: 'num',
            }, {
                title: '版本',
                dataIndex: 'edition',
                key: 'edition',
            }, {
                title: '创建人',
                dataIndex: 'creator',
                key: 'creator',
            }, {
                title: '创建时间',
                dataIndex: 'time',
                key: 'time',
            }, {
                title: '最近更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
            }, {
                title: '上传人',
                dataIndex: 'theHeir',
                key: 'theHeir',
            }, {
                title: '文档状态',
                dataIndex: 'docState',
                key: 'docState',
            }, {
                title: '文件夹',
                dataIndex: 'file',
                key: 'file'
            }, {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark'
            }]

        }
    }
    componentDidMount() {
        this.loadLocales();
        let list = [];
        list.push(this.props.data)
        console.log(this.props.data)
        this.setState({
            info: list
        })
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            this.setState({ initDone: true });
        });
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },

    }

    render() {
        return (
            <div className={style.main}>
                {this.state.initDone && (
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>历史版本</h3>
                        <div className={style.mainScorll}>
                            <DownloadTopBtn />

                            <Table rowKey={record=>record.key} rowSelection={this.rowSelection} columns={this.state.RightColumns} dataSource={this.state.info} 
                                pagination={false}
                            />

                        </div>
                    </div>
                )}

            </div>
        )
    }
}

const MenuInfos = Form.create()(MenuInfo);
export default connect(null, {
    curdCurrentData
})(MenuInfos);