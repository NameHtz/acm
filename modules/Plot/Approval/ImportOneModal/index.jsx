import React, { Component } from 'react'
import style from './style.less'
import { Modal, Table, Checkbox, Button } from 'antd';
import Search from "../../../../components/public/Search"
import { connect } from 'react-redux'
import axios from '../../../../api/axios'
import { prepaProjectteamIpt, prepaProjectteamOrg, prepaProjectteamImportAdd } from '../../../../api/api'

class ImportOneModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            checkedData: [],
            userFlag: false,
            dataSource: '',
            parentId: 0,
        }
    }

    IptGetData = (val) => {
        val = val ? val : ''
        axios.get(prepaProjectteamIpt + `?searcher=${val}`).then(res => {
            // console.log(res)
            this.setState({
                data: res.data.data,
                dataSource: 'ipt'
            })
        })
    }
    OrgGetData = (val) => {
        val = val ? val : ''
        axios.get(prepaProjectteamOrg + `?searcher=${val}`).then(res => {
            // console.log(res)
            this.setState({
                data: res.data.data,
                dataSource: 'org'
            })
        })
    }

    componentDidMount() {

        this.setState({
            parentData: this.props.data,
            parentId: this.props.record ? this.props.record.id : 0
        })

        if (this.props.title == 'IPT导入') {
            this.IptGetData();
        } else if (this.props.title == '组织机构导入') {
            this.OrgGetData();
        }

    }


    handleOk = () => {

        let { parentData, parentId, userFlag, checkedData, dataSource } = this.state;
        // console.log(parentData, parentId, userFlag, checkedData, dataSource)
        let data = {
            ids: checkedData,
            userFlag: userFlag
        }
        axios.post(prepaProjectteamImportAdd(dataSource, 'prepa', parentData.id, parentId), data, true).then(res => {
            console.log(res)
            this.props.getDataList();
        })

        this.props.handleCancel()
    }
    handleCancel = (e) => {
        // console.log(e);

        this.props.handleCancel()
    }
    getInfo = (record, index) => {
        let id = record.id;
        if (this.state.activeIndex == id) {
            id = null
        }
        this.setState({
            activeIndex: id
        })

    }
    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? "tableActivty" : "";
    }

    checkboxChange = (record, e) => {
        console.log(record, e.target.checked)
        let checked = e.target.checked;
        if (checked) {
            this.setState({
                checkedData: [...this.state.checkedData, record.id]
            })
        } else {
            let index = this.state.checkedData.findIndex(val => val == record.id)
            this.setState({
                checkedData: [...this.state.checkedData.slice(0, index), ...this.state.checkedData.slice(index + 1)]
            })
        }
    }
    lead = (e) => {
        // console.log(e.target.checked)
        this.setState({
            userFlag: e.target.checked
        })
    }
    search = (val) => {
        console.log(val)
        if (this.props.title == 'IPT导入') {
            this.IptGetData(val);
        } else if (this.props.title == '组织机构导入') {
            this.OrgGetData(val);
        }
    }


    render() {
        const { intl } = this.props.currentLocale;
        let columns = []

        if (this.props.title == 'IPT导入') {
            columns = [{
                title: intl.get('wsd.i18n.pre.proreview.name'),
                dataIndex: 'iptName',
                key: 'iptName',
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.code'),
                dataIndex: 'iptCode',
                key: 'iptCode',
            },
            {
                title: "选择",
                dataIndex: 'select',
                key: 'select',
                render: (text, record) => (
                    <Checkbox onChange={this.checkboxChange.bind(this, record)}></Checkbox>
                )
            },]
        } else if (this.props.title == '组织机构导入') {
            columns = [{
                title: intl.get('wsd.i18n.pre.proreview.name'),
                dataIndex: 'orgName',
                key: 'orgName',
            },
            {
                title: intl.get('wsd.i18n.pre.proreview.code'),
                dataIndex: 'orgCode',
                key: 'orgCode',
            },
            {
                title: "选择",
                dataIndex: 'select',
                key: 'select',
                render: (text, record) => (
                    <Checkbox onChange={this.checkboxChange.bind(this, record)}></Checkbox>
                )
            },]
        }

        return (
            <div >
                <Modal className={style.main}
                    title={this.props.title} visible={this.props.visible}
                    onCancel={this.handleCancel}
                    width="850px"
                    footer={[
                        <Checkbox key={3} onChange={this.lead}>导入用户</Checkbox>,
                        <Button key={1} onClick={this.handleCancel}>关闭</Button>,
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
                                // rowSelection={rowSelection}
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
            </div >
        )
    }
}

export default connect(state => ({
    currentLocale: state.localeProviderData
}))(ImportOneModal)
