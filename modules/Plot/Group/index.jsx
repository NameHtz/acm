import React, { Component } from 'react'
import { Table, Icon, Spin, Modal } from 'antd'
import style from './style.less'
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as util from '../../../utils/util'
import axios from '../../../api/axios'
import { epsTreeList } from '../../../api/api'



const confirm = Modal.confirm

class TableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,

            activeIndex: "",
            rightData: null,
            rightTags: [
                { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Plot/Group/BasicInfo' },
                { icon: 'iconwenjian', title: '文件信息', fielUrl: 'Components/FileInfo' },
                { icon: 'icontuandui', title: '协作团队', fielUrl: 'Plot/Group/TeamInfo' },
            ],

            data: [],
            dataMap: [],

        }

    }

    //获取列表信息
    getDataList = () => {
        axios.get(epsTreeList).then(res => {
            // console.log(res)
            if (res.data.data) {
                let dataMap = util.dataMap(res.data.data)
                this.setState({
                    data: res.data.data,
                    dataMap
                })
            }

        })
    }

    componentDidMount() {
        this.getDataList()
    }

    //table表格单行点击回调
    getInfo = (record, index) => {

        let id = record.id, records = record
        if (this.state.activeIndex == id) {

            this.setState({
                activeIndex: null,
                rightData: null
            })
        } else {
            this.setState({
                activeIndex: id,
                rightData: record
            })
        }

    }

    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? "tableActivty" : "";
    }

    //增加函数
    addData = (val) => {
        let { data, dataMap, rightData } = this.state
        util.create(data, dataMap, rightData, val);
        this.setState({
            data,
            dataMap
        })
    }

    //删除函数
    delData = () => {
        let { data, dataMap, rightData } = this.state
        util.deleted(data, dataMap, rightData);
        this.setState({
            data
        })
    }
    //更新函数
    updata = (val) => {
        let { data, dataMap, rightData } = this.state
        util.modify(data, dataMap, rightData, val);
        this.setState({
            data,
            dataMap
        })
    }



    render() {
        const { intl } = this.props.currentLocale;
        const columns = [
            {
                title: intl.get('wsd.i18n.pre.eps.projectname'),
                dataIndex: 'name',
                width: 280,
                key: 'name',
                render: (text, record) => (
                    record.children ? <span><span className='iconfont' style={{ marginRight: '5px' }}>&#xe631;</span>{text}</span> : <span><span className='iconfont' style={{ marginRight: '5px' }}>&#xe620;</span>{text}</span>
                )
            },
            {
                title: intl.get('wsd.i18n.pre.eps.projectcode'),
                dataIndex: 'code',
                width: 150,
                key: 'code',
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.iptname'),
                dataIndex: 'org',
                width: 150,
                key: 'org',
                render: text => <span>{text ? (text.name ? text.name : '') : ''}</span>
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.username'),
                dataIndex: 'user',
                width: 100,
                key: 'user',
                render: text => <span>{text ? (text.name ? text.name : '') : ''}</span>
            },
            {
                title: intl.get('wsd.i18n.pre.eps.remark'),
                dataIndex: 'remark',
                width: 100,
                key: 'remark',
            },
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };

        return (
            <div>
                <TopTags data={this.state.rightData} addData={this.addData} delData={this.delData} />
                <div className={style.main}>
                    <div className={style.leftMain} style={{ height: this.props.height }}>
                        <div style={{ minWidth: 'calc(100vw - 60px)' }}>
                            <Table rowKey={record => record.id} columns={columns}
                                dataSource={this.state.data}
                                size='small'
                                pagination={false} name={this.props.name}
                                // rowSelection={rowSelection}
                                rowClassName={this.setClassName}
                                onRow={(record, index) => {
                                    return {
                                        onClick: (event) => {
                                            this.getInfo(record, index)
                                        }
                                    }
                                }
                                }
                            />

                        </div>

                    </div>
                    <div className={style.rightBox} style={{ height: this.props.height }}>
                        <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData} updata={this.updata} bizType='eps' />
                    </div>
                </div>

            </div>

        )
    }
}


/* *********** connect链接state及方法 start ************* */
export default connect(state => ({
    currentLocale: state.localeProviderData
}))(TableComponent);
/* *********** connect链接state及方法 end ************* */