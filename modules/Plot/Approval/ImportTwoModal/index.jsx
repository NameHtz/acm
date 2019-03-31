import React, { Component } from 'react'
import style from './style.less'
import { Modal, Table, Checkbox, Button, Icon } from 'antd';
import Search from "../../../../components/public/Search"
import { connect } from 'react-redux'
import axios from '../../../../api/axios'
import { prepaProjectteamProjectList, prepaProjectteamProjectAdd } from '../../../../api/api'

class ImportOneModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible: true,
            record: null,
            activeIndex: null,
            data: []
        }
    }

    getDataList = (val) => {
        let data = {
            name: val ? val : ''
        }
        axios.post(prepaProjectteamProjectList, data).then(res => {
            // console.log(res)
            this.setState({
                data: res.data.data
            })
        })

    }

    componentDidMount() {
        this.getDataList();

    }

    handleOk = () => {
        axios.post(prepaProjectteamProjectAdd('project', this.state.record.id, 'prepa', this.props.data.id ), {}, true).then(res=>{
            console.log(res)
            this.props.getDataList();
            this.props.handleCancel();
        })
        
    }
    handleCancel = (e) => {
        // console.log(e);

        this.props.handleCancel()
    }
    getInfo = (record, index) => {
        let id = record.id;
        if (this.state.activeIndex == id) {
            this.setState({
                activeIndex: null,
                record: null
            })
        } else {
            if(record.type == 'project'){
                this.setState({
                    activeIndex: id,
                    record
                })
            } else{
                this.setState({
                    activeIndex: null,
                    record: null
                })
            }
            
        }


    }
    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? "tableActivty" : "";
    }
    search = (val) => {
        this.getDataList(val);
    }

    render() {
        const { intl } = this.props.currentLocale;
        const columns = [
            {
                title: intl.get('wsd.i18n.pre.proreview.name'),
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    record.children ? <span><Icon type="folder" style={{marginRight: '5px'}}/>{text}</span> : <span><Icon type="file-text"  style={{marginRight: '5px'}}/>{text}</span>
                )
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.code'),
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.starttime'),
                dataIndex: 'planStartTime',
                key: 'planStartTime',
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.endtime'),
                dataIndex: 'planEndTime',
                key: 'planEndTime',
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.iptname'),
                dataIndex: 'org',
                key: 'org',
                render: text => <span>{text ? (text.name ? text.name : '') : ''}</span>
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.username'),
                dataIndex: 'user',
                key: 'user',
                render: text => <span>{text ? (text.name ? text.name : '') : ''}</span>
            },
            {
                title: intl.get("wsd.i18n.plan.prepa.projectstate"),//项目状态
                dataIndex: 'status',
                key: 'status',
                render: text => <span>{text ? text.id : ''}</span>

            },
        ]
        return (
            <div >
                <Modal className={style.main}
                    title={this.props.title} visible={this.props.visible}
                    onCancel={this.props.handleCancel}
                    width="950px"
                    footer={[
                        <Button key={1} onClick={this.props.handleCancel} >关闭</Button>,
                        <Button key={2} type="primary" onClick={this.handleOk}>保存</Button>
                    ]}

                >
                    <div className={style.context}>
                        <section className={style.search}>
                            <Search search={this.search}></Search>
                        </section>

                        <div>
                            <Table columns={columns} dataSource={this.state.data} pagination={false}
                                rowKey={record => record.id}
                                bordered={true}
                                size='small'
                                rowClassName={this.setClassName}
                                onRow={(record, index) => {
                                    return {
                                        onClick: (event) => {
                                            this.getInfo(record, index)
                                        }
                                    }
                                }
                                } />
                        </div>
                    </div>
                </Modal>

            </div>
        )
    }
}

export default connect(state => ({
    currentLocale: state.localeProviderData
}))(ImportOneModal)
// {
//             "wsd.i18n.pre.epsInfo.projectname":"名称",
//             "wsd.i18n.pre.epsInfo.projectcode":"代码",
//             "wsd.i18n.pre.epsInfo.creattime":"创建时间",
//             "wsd.i18n.pre.epsInfo.creator":"创建人",
//             "wsd.i18n.pre.epsInfo.iptname":"责任主体",
//             "wsd.i18n.pre.epsInfo.categorycode":"分类码",
//             "wsd.i18n.pre.epsInfo.calnid":"日历",
//             "wsd.i18n.pre.epsInfo.remark":"备注",
//     }